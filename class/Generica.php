<?php
require_once('Conexao.php');
Conexao::baseProducao(true);
class Generica {
  public static $tentativasAceitas = '5';
  public static $minutosBolqueio = '5'; 

  function do_html($url) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, True);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl,CURLOPT_USERAGENT,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:7.0.1) Gecko/20100101 Firefox/7.0.1');
    $return = curl_exec($curl);
    curl_close($curl);
    return $return;
  }
  
  public function verificaPreenchimentoCampo($dado, $campo){
    if (empty($dado)):
      $retorno = array('codigo' => 0, 'mensagem' => 'Preencha o campo '.$campo.' !');
      echo json_encode($retorno);
      exit();
    endif;
  }
  public function gravaLog($sucessoLogin, $senha=null){
    $email = $_SESSION['email'];
    $bloqueado = ($_SESSION['tentativas'] == self::$tentativasAceitas) ? 'SIM' : 'NAO';
    $sql = 'INSERT INTO usuario_log (ip, email, senha, origem, sucessoLogin, bloqueado) VALUES (?, ?, ?, ?, ?, ?)';
    $stm = Conexao::Inst()->prepare($sql);
    $stm->bindValue(1, $_SERVER['SERVER_ADDR']);
    $stm->bindValue(2, $email);
    $stm->bindValue(3, $senha);
    $stm->bindValue(4, $_SERVER['HTTP_REFERER']);
    $stm->bindValue(5, $sucessoLogin);
    $stm->bindValue(6, $bloqueado);
    $stm->execute();
  }
  public function verificaBloqueio(){
    if ($_SESSION['tentativas'] == self::$tentativasAceitas):
      $retorno = array('codigo' => 0, 'mensagem' => 'Você excedeu o limite de '.self::$tentativasAceitas.' tentativas, login bloqueado por '.self::$minutosBolqueio.' minutos!');
      echo json_encode($retorno);
      exit();
    else:
      $retorno = array('codigo' => '0', 'mensagem' => 'Usuário não autorizado, você tem mais '. (self::$tentativasAceitas - $_SESSION['tentativas']) .' tentativa(s) antes do bloqueio!');
      echo json_encode($retorno);
      exit();
    endif;
  }
  public function convertParaDataHoraBr($dataHora){
    if(isset($dataHora)){
      $novaDataHora = new DateTime($dataHora);
      return $novaDataHora->format('d-m-Y H:i:s');
    }
  }
  public function convertDataPrimeiroDiaMes($dataHora){
    if(isset($dataHora)){
      $pieces = explode("-", $dataHora);
      $pdm = $pieces[0]."-".$pieces[1]."-01";
      return $pdm;
    }
  }
  public function setDado($dado){
    return (isset($dado)) ? $dado : '' ;
  }
  public function validaCPF($cpf) {
    $cpf = preg_replace( '/[^0-9]/is', '', $cpf );
    if (strlen($cpf) != 11) {
        return false;
    }
    if (preg_match('/(\d)\1{10}/', $cpf)) {
        return false;
    }
    for ($t = 9; $t < 11; $t++) {
        for ($d = 0, $c = 0; $c < $t; $c++) {
            $d += $cpf[$c] * (($t + 1) - $c);
        }
        $d = ((10 * $d) % 11) % 10;
        if ($cpf[$c] != $d) {
            return false;
        }
    }
    return true;
  }
  public function trueFalse($dado){
    if($dado == "false"){
      return 0;
    }
    return 1;
  }
  public function getRest($pf, $data = null, $adress= null) {
    $gappv = 'fc86c6d3bfdfe121791b280f2d87dd49';
    $gurl = "http://10.40.10.236:8080/api/rest/";
    $chave = '18b95f8643dd18ee5f06d530937e3068';
    if($adress == null){
        $gurl;
    }else{
        global $eurl;
        $gurl = $eurl;
    }
    $curl = curl_init();
    $url = $gurl . $pf;
    foreach ($data as $campos) {
        $q = curl_escape($curl, $campos);
        $url = $url . '/' . $q;
    }
    $options = array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $url,
        CURLOPT_SSL_VERIFYPEER => false, // If You have https://
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            'app:sdgc',
            'chave:' . $chave,
            'ip:' . $_SERVER["REMOTE_ADDR"],
            'appv:'. $gappv
    ));
    curl_setopt_array($curl, $options);
    $resp = curl_exec($curl);
    if(($resp == 'Usuário com a chave enviada não encontrado')){
        session_destroy();
        header('Location: login.php');
    }
    curl_close($curl);
    $r = json_decode($resp, true);
    return $r;
}
function buscaLoginSDGC(){
  $cpf = $_SESSION['CPF'];
  $sql = "SELECT * FROM userlogin WHERE cpf = '$cpf'";
  $stm = Conexao::InstSDGC()->prepare($sql);
  $stm->execute();
  $result = (object) $stm->fetch(PDO::FETCH_ASSOC);
  return $result;
}
}
?>
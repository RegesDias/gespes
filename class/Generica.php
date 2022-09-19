<?php

class Generica {
  public static $tentativasAceitas = '5';
  public static $minutosBolqueio = '30'; 

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

}
?>
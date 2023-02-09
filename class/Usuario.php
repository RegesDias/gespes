<?php
require_once('Generica.php');

class  Usuario extends Generica{
  function isValidPassword($senha) {
    if (ctype_alpha($senha)){
      $retorno = array('codigo' => 0, 'mensagem' => 'É obrigatorio conter números!');
      echo json_encode($retorno);
      exit();
    }
    if (is_numeric($senha)){
      $retorno = array('codigo' => 0, 'mensagem' => 'É obrigatorio conter letras!');
      echo json_encode($retorno);
      exit();
    }
    if ((strlen($senha))<9){
      $retorno = array('codigo' => 0, 'mensagem' => 'Precisa ter no minimo 8 caracteres!');
      echo json_encode($retorno);
      exit();
    }
  }
  function substituirSenhaPorCPF($senha, $cpf) {
    if (empty($senha)){
      return $cpf;
    }
    $this->isValidPassword($senha);
  }
  public function verificaPreenchimentoCpf($cpf){
    if (!$this->validaCPF($cpf)){
      $retorno = array('codigo' => 0, 'mensagem' => 'CPF inválido !');
      echo json_encode($retorno);
      exit();
    }
    if ($this->verificaCPFJaCadastrado($cpf)){
      $retorno = array('codigo' => 0, 'mensagem' => 'CPF já cadastrado !');
      echo json_encode($retorno);
      exit();
    }
  }
  public function verificaPreenchimentoChave($chave){
    $this->verificaPreenchimentoCampo($chave, 'chave');
    if ($this->verificaCPFChaveJaCadastrado($chave)){
        $retorno = array('codigo' => 0, 'mensagem' => 'Chave já utilizada por outro usuário !');
        echo json_encode($retorno);
        exit();
    }
  }

  public function validaOrigemRequisicao(){
      //1 - Verifica se a origem da requisição é do mesmo domínio da aplicação
      if (isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] != "http://localhost/login/index.php"):
        $retorno = array('codigo' => 0, 'mensagem' => 'Origem da requisição não autorizada!');
        echo json_encode($retorno);
        exit();
      endif;
  }

  public function contaTentativasLoginFalhas(){
    $sql = "SELECT count(*) AS tentativas, MINUTE(TIMEDIFF(NOW(), MAX(data_hora))) AS minutos ";
    $sql .= "FROM usuario_log WHERE ip = ? and DATE_FORMAT(data_hora,'%Y-%m-%d') = ? AND bloqueado = ?";
    $stm = Conexao::Inst()->prepare($sql);
    $stm->bindValue(1, $_SERVER['SERVER_ADDR']);
    $stm->bindValue(2, date('Y-m-d'));
    $stm->bindValue(3, 'SIM');
    $stm->execute();
    return $retorno = $stm->fetch(PDO::FETCH_OBJ);
  }

  public function bloqueiaContaExcedeuTentativasLogin($retorno){
    if (!empty($retorno->tentativas) && intval($retorno->minutos) <= self::$minutosBolqueio):
      $_SESSION['tentativas'] = 0;
      $retorno = array('codigo' => 0, 'mensagem' => 'Você excedeu o limite de '.self::$tentativasAceitas.' tentativas, login bloqueado por '.self::$minutosBolqueio.' minutos!');
      echo json_encode($retorno);
      exit();
    endif;
  }
  public function verificaSeSenhaIgualCPF($cpf,$senha,$nome){
    if($cpf == $senha){
      $retorno = array('codigo' => 2, 'mensagem' => 'É necessario fazer a troca da senha!', 'nome'=> $nome);
      echo json_encode($retorno);
      exit();
    }
  }

  public function verificaCPFJaCadastrado($cpf){
    $sql = "SELECT id, cpf, nome, senha, email, status,CPF FROM usuario WHERE cpf = '$cpf' LIMIT 1";
    $stm = Conexao::Inst()->prepare($sql);
    $stm->execute();
    if($stm->rowCount()==1){
      return true;
    }else{
      return false;
    }
  }
  public function verificaCPFChaveJaCadastrado($email){
    $sql = "SELECT id, cpf, nome, senha, email, status, CPF FROM usuario WHERE email = '$email' LIMIT 1";
    $stm = Conexao::Inst()->prepare($sql);
    $stm->execute();
    if($stm->rowCount()==1){
      return true;
    }else{
      return false;
    }
  }


  public function atualizarToken($retorno){
    $token = uniqid();
    $_SESSION['id'] = $retorno->id;
    $_SESSION['idSetor'] = $retorno->idSetor;
    $_SESSION['nome'] = $retorno->nome;
    $_SESSION['email'] = $retorno->email;
    $_SESSION['CPF'] = $retorno->CPF;
    $_SESSION['token'] = $token;
    $sql = "UPDATE usuario SET token = '$token' WHERE id = ?";
    $stm = Conexao::Inst()->prepare($sql);
    $stm->bindValue(1, $retorno->id);
    $stm->execute();
  }

  public function verificaSenha($retorno, $senha){
    $senhaMd5 = md5($senha);
    if(!empty($retorno) && ($senhaMd5 == $retorno->senha)):
      $_SESSION['logado'] = 'SIM';
      $_SESSION['tentativas'] = 0;
      $this->atualizarToken($retorno);
      $this->gravaLog('login', $senhaMd5);
    else:
      $_SESSION['logado'] = 'NAO';
      $_SESSION['tentativas'] = (isset($_SESSION['tentativas'])) ? $_SESSION['tentativas'] += 1 : 1;
      $this->gravaLog('loginFalha', $senha);
    endif;
  }

  public function verificaSenhasCoincidem($senhaNovaSenha2, $senhaNovaSenha){
    if ($senhaNovaSenha2 != $senhaNovaSenha):
      $retorno = array('codigo' => 0, 'mensagem' => 'Senhas não coincidem!');
      echo json_encode($retorno);
      exit();
    endif;
  }
  public function buscaEmail($email){
    $sql = "SELECT 
                  *
              FROM 
                usuario 
              WHERE 
                email = '$email' 
                LIMIT 1";
    $stm = Conexao::Inst()->prepare($sql);
    $stm->bindValue(1, $email);
    $stm->execute();
    if($stm->rowCount()==1){
      return $retorno = $stm->fetchAll(PDO::FETCH_OBJ);
    }else{
      $retorno = array('codigo' => 0, 'mensagem' => 'Chave de Usuário não encontrada!');
      echo json_encode($retorno);
      exit();
    }
  }
  public function renovaSenha($senhaNovaSenha, $email){
    $senhaNovaSenhaMD5 = md5($senhaNovaSenha);
    $sql = "UPDATE usuario SET senha = '$senhaNovaSenhaMD5' WHERE email = '$email'";
    $stm = Conexao::Inst()->prepare($sql);
    $stm->execute();
    $retorno = $this->buscaEmail($email);
    $retorno = array('codigo' => 1, 'mensagem' =>'Senha redefinida com sucesso!', 'nome' => $retorno[0]->nome);
    echo json_encode($retorno);
    exit();
  }
  public function insereNovaSenha($senhaNovaSenha, $email){
    $token = $_SESSION['token'];
    $senhaNovaSenhaMD5 = md5($senhaNovaSenha);
    $sql = "UPDATE usuario SET senha = '$senhaNovaSenhaMD5' WHERE token = '$token'";
    $stm = Conexao::Inst()->prepare($sql);
    $stm->execute();
    $retorno = $this->buscaEmail($email);
    $retorno = array('codigo' => 1, 'mensagem' => 'Senha alterada com sucesso!', 'nome' => $retorno[0]->nome);
    echo json_encode($retorno);
    exit();
  }
  public function insereNovo($email,$senha,$cpf, $nome,$status,$protocolo,$atendimentoAgenda,$alterarSenha,$usuarios,$setor,$consultaPessoal,$idSetor,$relatFichaFuncional,$relatAtribuicoesCargo,$relatFolhaPonto,$relatContraCheque){
    $senha = md5($senha);
    $sql = "INSERT INTO usuario
                          (
                            CPF,
                            nome,
                            email,
                            senha,
                            status,
                            consultaPessoal,
                            protocolo,
                            atendimentoAgenda,
                            alterarSenha,
                            usuarios,
                            setor,
                            idSetor,
                            relatFichaFuncional,
                            relatAtribuicoesCargo,
                            relatFolhaPonto,
                            relatContraCheque,
                            dataHora
                          )VALUES(
                            '$cpf',
                            '$nome',
                            '$email',
                            '$senha',
                            '$status',
                            '$consultaPessoal',
                            '$protocolo',
                            '$atendimentoAgenda',
                            '$alterarSenha',
                            '$usuarios',
                            '$setor',
                            '$idSetor',
                            '$relatFichaFuncional',
                            '$relatAtribuicoesCargo',
                            '$relatFolhaPonto',
                            '$relatContraCheque',
                              NOW())";
      $stm = Conexao::Inst()->prepare($sql);
      $stm->execute();
      $retorno = array('codigo' => 1, 'mensagem' => 'Usuário '.$nome.' criado com sucesso!');
      echo json_encode($retorno);
      exit();
    }
  public function atualizarDados($cpf, $nome,$status,$protocolo,$atendimentoAgenda,$alterarSenha,$usuarios,$consultaPessoal,$setor,$idSetor,$relatFichaFuncional,$relatAtribuicoesCargo,$relatFolhaPonto,$relatContraCheque){
  $sql = "UPDATE usuario SET 
                        nome = '$nome',
                        status = '$status',
                        protocolo = '$protocolo',
                        atendimentoAgenda = '$atendimentoAgenda',
                        alterarSenha = '$alterarSenha',
                        usuarios = '$usuarios',
                        consultaPessoal = '$consultaPessoal',
                        setor = '$setor',
                        idSetor = '$idSetor',
                        relatFichaFuncional = '$relatFichaFuncional',
                        relatAtribuicoesCargo = '$relatAtribuicoesCargo',
                        relatFolhaPonto = '$relatFolhaPonto',
                        relatContraCheque = '$relatContraCheque'
            WHERE CPF = '$cpf'";
    $stm = Conexao::Inst()->prepare($sql);
    $stm->execute();
    $retorno = array('codigo' => 1, 'mensagem' => 'Usuário '.$nome.' alterado com sucesso!');
    echo json_encode($retorno);
    exit();
  }

  public function listarPorCodigo(){
    $call = "SELECT *  FROM usuario ORDER BY id LIMIT 1000";
    return $exec = Conexao::Inst()->prepare($call);
  }
  
  public function listarIdSetor($idSetor){
    $call = "SELECT id, nome  FROM usuario WHERE idSetor = '$idSetor' AND status = 'Ativo' ORDER BY id LIMIT 1000";
    return $exec = Conexao::Inst()->prepare($call);
  }

  public function listarPorNome(){
    $call = "SELECT * FROM usuario ORDER BY nome DESC LIMIT 1000";
    return $exec = Conexao::Inst()->prepare($call);
  }

  public function buscaCpfNome($dado){
    if(is_numeric($dado)){
      $call = "SELECT * FROM usuario WHERE cpf = '$dado'";
    }else{
      $nome = str_replace(' ', '%', $dado);
      $call = "SELECT * FROM usuario WHERE nome like '%$nome%'";
    }
    return $exec = Conexao::Inst()->prepare($call);
  }

  public function buscaCPF($cpf){
    $call = "SELECT
                  usuario.CPF,
                  usuario.nome,
                  usuario.email,
                  usuario.consultaPessoal,
                  usuario.protocolo,
                  usuario.atendimentoAgenda,
                  usuario.alterarSenha,
                  usuario.usuarios,
                  usuario.setor,
                  usuario.dataHora,
                  usuario.status,
                  usuario_log.data_hora as ultimoLogin,
                  usuario.idSetor,
                  relatFichaFuncional,
                  relatAtribuicoesCargo,
                  relatFolhaPonto,
                  relatContraCheque
              FROM 
                  usuario LEFT JOIN usuario_log
                  ON usuario.email = usuario_log.email
              WHERE
                      usuario.CPF = '$cpf' AND
                      ( usuario_log.sucessoLogin = 'login' OR
                       usuario_log.sucessoLogin IS NULL)
              ORDER BY
                      usuario_log.data_hora DESC
              LIMIT 1";
    return $exec = Conexao::Inst()->prepare($call);
  }
  public function buscaCpfSDGC($cpf){
    $call = "SELECT
                  login,
                  nome
              FROM 
                  userlogin
              WHERE
                      userlogin.CPF = '$cpf'
              LIMIT 1";
    return $exec = Conexao::InstSDGC()->prepare($call);
  }
  public function ultimoLogin($email){
    $call = "SELECT * FROM usuario_log WHERE sucessoLogin = 'login' AND email = '$email' ORDER BY data_hora LIMIT 1 ";
    return $exec = Conexao::Inst()->prepare($call);
  }
  public function ultimaAcao($email){
    $call = "SELECT sucessoLogin, data_hora FROM usuario_log WHERE email = '$email' AND senha IS NULL ORDER BY id DESC LIMIT 1";
     $exec = Conexao::Inst()->prepare($call);
     $exec->execute();
     return $exec->fetchAll(PDO::FETCH_ASSOC);
  }
}
?>
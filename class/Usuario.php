<?php
require_once('Conexao.php');

class Usuario {
  public function verificaPreenchimentoCampoEmail($email){
    if (empty($email)):
      $retorno = array('codigo' => 0, 'mensagem' => 'Preencha seu Usuário!');
      echo json_encode($retorno);
      exit();
    endif;
  }
  public function verificaPreenchimentoCampoSenha($senha){
    if (empty($senha)):
      $retorno = array('codigo' => 0, 'mensagem' => 'Preencha sua senha!');
      echo json_encode($retorno);
      exit();
    endif;
  }

  public function verificaPreenchimentoCampoNovaSenha($senhaNovaSenha){
    if (empty($senhaNovaSenha)):
      $retorno = array('codigo' => 0, 'mensagem' => 'Preencha nova Senha!');
      echo json_encode($retorno);
      exit();
    endif;
  }

  public function verificaPreenchimentoCampoNovaSenha2($senhaNovaSenha2){
    if (empty($senhaNovaSenha2)):
      $retorno = array('codigo' => 0, 'mensagem' => 'Repita a digitação da nova senha!');
      echo json_encode($retorno);
      exit();
    endif;
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
    if (!empty($retorno->tentativas) && intval($retorno->minutos) <= MINUTOS_BLOQUEIO):
      $_SESSION['tentativas'] = 0;
      $retorno = array('codigo' => 0, 'mensagem' => 'Você excedeu o limite de '.TENTATIVAS_ACEITAS.' tentativas, login bloqueado por '.MINUTOS_BLOQUEIO.' minutos!');
      echo json_encode($retorno);
      exit();
    endif;
  }
  public function verificaUsuarioAtivo($email){
    $sql = "SELECT id, nome, senha, email FROM usuario WHERE email = ? AND status = 'A' LIMIT 1";
    $stm = Conexao::Inst()->prepare($sql);
    $stm->bindValue(1, $email);
    $stm->execute();
    return $retorno = $stm->fetch(PDO::FETCH_OBJ);
  }

  public function atualizarToken($retorno){
    $token = uniqid();
    $_SESSION['id'] = $retorno->id;
    $_SESSION['nome'] = $retorno->nome;
    $_SESSION['email'] = $retorno->email;
    $_SESSION['token'] = $token;
    $sql = "UPDATE usuario SET token = '$token' WHERE id = ?";
    $stm = Conexao::Inst()->prepare($sql);
    $stm->bindValue(1, $retorno->id);
    $stm->execute();
  }
  public function gravaTentativaDeLogin($email, $senha){
    $bloqueado = ($_SESSION['tentativas'] == TENTATIVAS_ACEITAS) ? 'SIM' : 'NAO';
    $sql = 'INSERT INTO usuario_log (ip, email, senha, origem, bloqueado) VALUES (?, ?, ?, ?, ?)';
    $stm = Conexao::Inst()->prepare($sql);
    $stm->bindValue(1, $_SERVER['SERVER_ADDR']);
    $stm->bindValue(2, $email);
    $stm->bindValue(3, $senha);
    $stm->bindValue(4, $_SERVER['HTTP_REFERER']);
    $stm->bindValue(5, $bloqueado);
    $stm->execute();
  }

  public function verificaUsuarioSenha($retorno, $email, $senha){
    $senha = md5($senha);
    if(!empty($retorno) && ($senha == $retorno->senha)):
      $_SESSION['logado'] = 'SIM';
      $_SESSION['tentativas'] = 0;
      $this->atualizarToken($retorno);
    else:
      $_SESSION['logado'] = 'NAO';
      $_SESSION['tentativas'] = (isset($_SESSION['tentativas'])) ? $_SESSION['tentativas'] += 1 : 1;
      $this->gravaTentativaDeLogin($email, $senha);
    endif;
  }
  public function verificaSenhasCoincidem($senhaNovaSenha2, $senhaNovaSenha){
    if ($senhaNovaSenha2 != $senhaNovaSenha):
      $retorno = array('codigo' => 0, 'mensagem' => 'Senhas não coincidem!');
      echo json_encode($retorno);
      exit();
    endif;
  }
  public function insereNovaSenha($senhaNovaSenha){
    $token = $_SESSION['token'];
    $senhaNovaSenha = md5($senhaNovaSenha);
    $sql = "UPDATE usuario SET senha = '$senhaNovaSenha' WHERE token = '$token'";
    $stm = Conexao::Inst()->prepare($sql);
    $stm->execute();
    $retorno = array('codigo' => 1, 'mensagem' => 'Senha alterada com sucesso!');
    echo json_encode($retorno);
    exit();
  }
}
?>
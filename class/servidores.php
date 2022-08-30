<?php
//ini_set('display_errors',1);
//ini_set('display_startup_erros',1);
//error_reporting(E_ALL);
require_once('Conexao.php');

class Servidor {
  public function listarPessoal(){
    $call = "SELECT codfunc,nome,secretarias,prefixos,nome_carg,dataadmis,secoes,cpfs FROM servidor LIMIT 1000";
    $exec = Conexao::Inst()->prepare($call);
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum comentário encontrado');
    }
  }
}
$srv = new Servidor;
print_r($srv->listarPessoal());
?>
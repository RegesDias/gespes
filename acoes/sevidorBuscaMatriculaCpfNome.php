<?php
header('Content-Type: application/json');
$dado = $_GET['dado'];
require_once('../class/Conexao.php');

if(is_numeric($dado)){
    if(strlen($dado) == 11){
        $call = "SELECT codfunc,nome,secretarias,prefixos,nome_carg,dataadmis,secoes,cpfs FROM servidor WHERE cpfs = ".$dado;
    }else{
        $call = "SELECT codfunc,nome,secretarias,prefixos,nome_carg,dataadmis,secoes,cpfs FROM servidor WHERE codfunc = '$dado'";
    }
}else{
        $call = "SELECT codfunc,nome,secretarias,prefixos,nome_carg,dataadmis,secoes,cpfs FROM servidor WHERE nome like '%$dado%'";
}
$exec = Conexao::Inst()->prepare($call);
if(Conexao::verificaLogin()){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum comentário encontrado');
    }
}
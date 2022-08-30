<?php
header('Content-Type: application/json');

require_once('../class/Conexao.php');
$call = "SELECT codfunc,nome,secretarias,prefixos,nome_carg,dataadmis,secoes,cpfs FROM servidor ORDER BY nome LIMIT 1000";
$exec = Conexao::Inst()->prepare($call);
if(Conexao::verificaLogin()){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum comentário encontrado');
    }
}
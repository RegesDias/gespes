<?php
header('Content-Type: application/json');
$codfunc = $_GET['codfunc'];
require_once('../class/Conexao.php');
$call = "SELECT codfunc,nome,secretarias,prefixos,nome_carg,dataadmis,secoes,cpfs FROM servidor WHERE codfunc = $codfunc";
$exec = Conexao::Inst()->prepare($call);
$exec->execute();

if ($exec->rowCount() >= 1) {
    echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
} else {
    echo json_encode('Nenhum servidor encontrado');
}
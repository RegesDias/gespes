<?php
header('Content-Type: application/json');
require_once('../../class/CID10.php');
$s = new CID10;
$term = $s->setDado($_GET['term']);
$exec = $s->listaCategoriaSub($term);
if(strlen($term)>=4){
    if(Conexao::verificaLogin('consultaPessoal')){
        $exec->execute();
        if ($exec->rowCount() >= 1) {
            $s->gravaLog('Exibe dados do servidor matricula: '.$codfunc);
            echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
        } else {
            echo json_encode('');
        }
    }
}
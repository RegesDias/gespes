<?php

header('Content-Type: application/json');
require_once '../../class/Documentos.php';
$m = new Documentos;
$exec = $m->listaAssuntos();
//if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if (count($exec) >= 1){
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
            //echo json_encode('Nenhum servidor encontrado');
    }
//}

?>


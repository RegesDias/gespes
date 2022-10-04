<?php
header('Content-Type: application/json');
require_once '../../class/Documentos.php';
$m = new Documentos;
$result = $m->buscaAnos();
//if(Conexao::verificaLogin('consultaPessoal')){
    if (count($result) >= 1){
        $m->gravaLog('Lista Anos dos Documentos!');
        echo json_encode($result);
    } else {
            //echo json_encode('Nenhum servidor encontrado');
    }
//}

?>


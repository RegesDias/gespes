<?php
require_once '../../class/Documentos.php';
$m = new Documentos;
$dado = $m->setDado($_GET['dado']);
$order = $m->setDado($_GET['order']);
$numeroAno =str_replace('/', ' ', $dado);
$numeroAno =str_replace('-', ' ', $dado);

if($dado != ''){
    $pieces = explode(" ", $numeroAno);
    $numero = ltrim($pieces[0], '0');
    $ano = $pieces[1];
    if(is_numeric($numero)){
        $exec = $m->buscaNumeroAno($numero, $ano);
    }else{
        $exec = $m->buscaAssunto($dado,$order);
    }
}else if (!isset($_GET['dado'])){
    $ano = $m->setDado($_GET['ano']);
    $tipo = $m->setDado($_GET['tipo']);
    $status = $m->setDado($_GET['status']);
    $idSetor = $m->setDado($_GET['idSetor']);
    $idUsuario = $m->setDado($_GET['idUsuario']);
    $exec = $m->buscaNumeroAnoTipoStatusLocal($ano, $tipo, $status, $idSetor, $idUsuario,$order);
    if($idUsuario != 'tds'){
        $tipoGrafico = 'line';
        $grafico = $m->analizandoDocumentosPorData($ano, $tipo, $status, $idSetor,$idUsuario,$order);
        $grafico->execute();
        $grafico = $grafico->fetchAll(PDO::FETCH_ASSOC);
    }else{
        $tipoGrafico = 'bar';
        $grafico = $m->analizandoDocumentosPorUsuario($ano, $tipo, $status, $idSetor,$idUsuario,$order);
        $grafico->execute();
        $grafico = $grafico->fetchAll(PDO::FETCH_ASSOC);
    }
    
}else{
    $retorno = array('codigo' => 0, 'mensagem' => 'Nenhum Documento encontrado!');
    echo json_encode($retorno);
}
//if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $m->gravaLog('Busca Documentos: '.$ano.'-'.$numero);
        $exec = $exec->fetchAll(PDO::FETCH_ASSOC);
        $total = count($exec);
        if ($order != 'NAO'){
            if ($order ==''){
                $retorno = array('codigo' => 1, 'tipo'=> $tipoGrafico, 'total'=> $total, 'exec' => $exec, 'grafico' => $grafico,'mensagem' => 'Total de '.$total.' documentos encontrados');
                echo json_encode($retorno);
            }else{
                $retorno = array('codigo' => 1, 'tipo'=> $tipoGrafico, 'total'=> $total,'exec' => $exec, 'grafico' => $grafico, 'mensagem' => 'Busca ordenada por  '.$order.' !');
                echo json_encode($retorno);
            }
        }else{
            $retorno = array('codigo' => 2, 'exec' => $exec);
            echo json_encode($retorno);
        }
    } else {
        $retorno = array('codigo' => 0, 'mensagem' => 'Nenhum Documento encontrado!');
        echo json_encode($retorno);
    }
//}
?>


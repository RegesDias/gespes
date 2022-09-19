<?php
header('Content-Type: application/json');

require_once('../../class/Usuario.php');
$codFunc = $_GET['codFunc'];
$u = new Usuario;
$exec = $u->buscaCPF($codFunc);

if(Conexao::verificaLogin('usuarios')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $u->gravaLog('Visualizar Usuario com CPF: '.$codFunc);
        $dados = $exec->fetchAll(PDO::FETCH_ASSOC);
        $ultimaAcao = $u->ultimaAcao($dados[0]['email']);
        if(isset($ultimaAcao[0])){
                $ultimaAcaoDataHora = $u->convertParaDataHoraBr($ultimaAcao[0]['data_hora']);
                $dados[0]['ultimaAcao'] = $ultimaAcao[0]['sucessoLogin']." ás ".$ultimaAcaoDataHora;
        }
        echo json_encode($dados);
    } else {
        echo json_encode('Nenhum comentário encontrado');
    }
}
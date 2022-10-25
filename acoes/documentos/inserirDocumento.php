<?php
header('Content-Type: application/json');
require_once '../../class/Documentos.php';
require_once '../../class/Movimentacao.php';
$d = new Documentos;
$m = new Movimentacao;

$tipo = $d->setDado($_GET['tipo']);
$numero = $d->setDado($_GET['numero']);
$ano = $d->setDado($_GET['ano']);
$assunto = $d->setDado($_GET['assunto']);
$origem = $d->setDado($_GET['origem']);
$movimentacoesSetor = $d->setDado($_GET['idSetor']);
$encaminharResponsavel = $d->setDado($_GET['idUsuario']);

$d->verificaPreenchimentoCampo($tipo, 'Tipo');
$d->verificaPreenchimentoCampo($numero, 'Número');
$d->verificaPreenchimentoCampo($ano, 'Ano');
$d->verificaPreenchimentoCampo($assunto, 'assunto');
$d->verificaPreenchimentoCampo($origem, 'origem');
$d->verificaPreenchimentoCampo($movimentacoesSetor, 'Setor');
$d->verificaPreenchimentoCampo($encaminharResponsavel, 'Responsável');

//if(Conexao::verificaLogin('consultaPessoal')){
    $idDocumento = $d->inserirDocumento($tipo,$numero,$ano,$assunto,$origem);
    $encaminharTexto = "DOCUMENTO INSERIDO PELO USUARIO ". $_SESSION['nome'];
    $encaminharTexto = "DOCUMENTO INSERIDO PELO USUARIO ". $_SESSION['nome'];
    $idUser = $_SESSION['id'];
    $idSetor = $_SESSION['idSetor'];

    $d->movimentarExecutar($idDocumento,$idUser,$idSetor,$encaminharTexto);
    $d->movimentarExecutar($idDocumento,$encaminharResponsavel,$movimentacoesSetor,$encaminharTexto);

    /*
    $d->movimentarExecutar($idDocumento,$encaminharResponsavel,$movimentacoesSetor,$encaminharTexto);
        $m->gravaLog('Documento '.$idDocumento.' movimentado pelo usuario '.$_SESSION['id']);
        $retorno = array('codigo' => 1, 'mensagem' => 'Documento encaminhado com sucesso!');
        echo json_encode($retorno);
//}

?>


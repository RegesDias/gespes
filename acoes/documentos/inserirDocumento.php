<?php
header('Content-Type: application/json');
require_once '../../class/Documentos.php';
require_once '../../class/Movimentacao.php';
$d = new Documentos;

$tipo = $d->setDado($_GET['tipo']);
$numero = $d->setDado($_GET['numero']);
$ano = $d->setDado($_GET['ano']);
$assunto = $d->setDado($_GET['assunto']);
$origem = $d->setDado($_GET['origem']);
$movimentacoesSetor = $d->setDado($_GET['idSetor']);
$encaminharResponsavel = $d->setDado($_GET['idUsuario']);
$textoModalInserir = $d->setDado($_GET['textoModalInserir']);

$d->verificaPreenchimentoCampo($tipo, 'Tipo');
$d->verificaPreenchimentoCampo($numero, 'Número');
$d->verificaPreenchimentoCampo($ano, 'Ano');
$d->verificaPreenchimentoCampo($assunto, 'assunto');
$d->verificaPreenchimentoCampo($origem, 'origem');
$d->verificaPreenchimentoCampo($movimentacoesSetor, 'Setor');
$d->verificaPreenchimentoCampo($encaminharResponsavel, 'Responsável');


//if(Conexao::verificaLogin('consultaPessoal')){
    //INSERIR DOCUMENTO
    $idDocumento = $d->inserirDocumento($tipo,$numero,$ano,$assunto,$origem);

    //MOVIMENTACAO ENTRADA
    $idUser = $_SESSION['id'];
    $idSetor = $_SESSION['idSetor'];
    $encaminharTextoEntrada = "DOCUMENTO CADASTRADO PELO USUÁRIO ". $_SESSION['nome'];
    $d->movimentarExecutarEntrada($idDocumento,$idUser,$idSetor,$encaminharTextoEntrada);
    
    //MOVIMENTACAO ENCAMINHAMENTO
    if($textoModalInserir == '<p><br></p>'){
        $encaminharTextoEncaminhar = "ENCAMINHADO PARA ANÁLISE";
    }else{
        $encaminharTextoEncaminhar = $textoModalInserir;
    }
    $d->movimentarExecutar($idDocumento,$encaminharResponsavel,$movimentacoesSetor,$encaminharTextoEncaminhar);

    $retorno = array(
                        'codigo' => 1, 'mensagem' => 'Documento cadastrado com sucesso !'.$textoModalInserir,
                        'documento' => $numero.'/'.$ano);
    echo json_encode($retorno);

//}

?>


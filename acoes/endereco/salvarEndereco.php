<?php

header('Content-Type: application/json');
require_once('../../class/Endereco.php');
$s = new Endereco;

$obj = new stdClass();
$obj->id_info = $s->setDado($_POST['id_info']);
$obj->cep_logradouro = $s->setDado($_POST['cep_logradouro']);
$obj->id_bairro = $s->setDado($_POST['id_bairro']);
$obj->endereco = $s->setDado($_POST['endereco']);
$obj->numero = $s->setDado($_POST['numero']);
$obj->celular = $s->setDado($_POST['celular']);
$obj->telefone = $s->setDado($_POST['telefone']);
$obj->email = $s->setDado($_POST['email']);
echo json_encode($obj);
/*
$exec = $s->buscarCep($cep);
if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $s->gravaLog('Exibe dados do servidor matricula: '.$codfunc);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('');
    }
}
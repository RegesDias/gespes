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
$obj->complemento = $s->setDado($_POST['complemento']);

if(Conexao::verificaLogin('consultaPessoal')){
    $id = $s->insereEndereco($obj);
    $r = array(
        'id' => $id
    );
    echo json_encode($r);
}
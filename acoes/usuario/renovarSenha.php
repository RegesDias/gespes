<?php
session_start();
define('TENTATIVAS_ACEITAS', 5); 
define('MINUTOS_BLOQUEIO', 30); 
require_once('../../class/Usuario.php');

// Recebe os dados do formulário
$email = (isset($_POST['email'])) ? $_POST['email'] : '' ;
$cpf = (isset($_POST['cpf'])) ? $_POST['cpf'] : '' ;

//Validar dados
$u = new Usuario;
if(Conexao::verificaLogin('usuarios')){
    $u->gravaLog('Renovar senha do usuário com o cpf: '.$cpf);
    $retorno = $u->insereNovaSenha($cpf,$email);
}
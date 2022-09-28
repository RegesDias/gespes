<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    require_once('../class/Generica.php');
    $g = new Generica;

    $idpessoal = $_GET['dado'];
    $tipo='html';
    $cBusc = array($idpessoal,$tipo);
    $lista = $g->getRest('relatorio/getRelHistoricoFuncional',$cBusc);
    echo $g->do_html($lista['url']);
?>
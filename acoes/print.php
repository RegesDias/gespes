<?php
    //error_reporting(E_ALL);
    //ini_set('display_errors', 1);
    require_once('../class/Generica.php');
    $g = new Generica;

    $dado = $g->setDado($_GET['dado']);
    $link = $g->setDado($_GET['link']);
    $mesAno = $g->setDado($_GET['mesAno']);
    $tipo='html';
    $cBusc = array($dado,$tipo);
    if ($mesAno != ''){
        $cBusc = array($dado,$mesAno."-01",$tipo);
    }
    $lista = $g->getRest($link,$cBusc);
    echo $g->do_html($lista['url']);
?>



<?php
    //error_reporting(E_ALL);
    //ini_set('display_errors', 1);
    require_once('../class/Generica.php');
    $g = new Generica;

    $dado = $g->setDado($_GET['dado']);
    $link = $g->setDado($_GET['link']);
    $mesAno = $g->setDado($_GET['mesAno']);
    $mesAnoFinal = $g->setDado($_GET['mesAnoFinal']);

    $tipo='html';
    if ($mesAnoFinal != ''){
        $cBusc = array($mesAno,$mesAnoFinal,$dado,$tipo);
        $lista = $g->getRest($link,$cBusc);
        echo $g->do_html($lista['url']);
        exit;
    }
    if ($mesAno != ''){
        $cBusc = array($dado,$mesAno."-01",$tipo);
        $lista = $g->getRest($link,$cBusc);
        echo $g->do_html($lista['url']);
        exit;
    }
    $cBusc = array($dado,$tipo);
    $lista = $g->getRest($link,$cBusc);
    echo $g->do_html($lista['url']);
?>



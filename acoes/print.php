<?php
    //error_reporting(E_ALL);
    //ini_set('display_errors', 1);
    require_once('../class/Generica.php');
    $g = new Generica;
    $tipo='html';
    $link = $g->setDado($_GET['link']);
    $acesso = $g->setDado($_GET['acesso']);
    if(Conexao::verificaLogin($acesso)){
        $cBusc = $_GET;
        unset($cBusc['link']);
        unset($cBusc['acesso']);
        $cBusc[] = $tipo;
        $lista = $g->getRest($link,$cBusc);
        echo $g->do_html($lista['url']);
    }else{
        session_start();
        session_destroy();
        echo '<h1>Acesso Negado...</h1>';
    }
?>



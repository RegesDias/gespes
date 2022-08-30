<?php
    require_once('../class/Conexao.php');
    echo json_encode(Conexao::verificaLogin());
?>
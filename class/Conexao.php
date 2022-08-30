<?php

session_start();
class Conexao{
    public static $instance;

    public static function Inst() {
        //$srv = "187.45.196.218";
        $srv = "localhost";
        $usr = 'root';
        $db = 'gespes';
        $pwd = 'semad@cpd';
        $dsn = 'mysql:dbname='.$db.';host='.$srv;     
        if (!isset(self::$instance)) {
            self::$instance = new PDO($dsn, $usr, $pwd ,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        }
        return self::$instance;
    }
    public static function verificaLogin() {
        $sql = "SELECT token FROM usuario WHERE email = ?";
        $stm = Conexao::Inst()->prepare($sql);
        $stm->bindValue(1, $_SESSION['email']);
        $stm->execute();
        $retorno = $stm->fetch(PDO::FETCH_OBJ);
        if (isset($retorno->token)AND($_SESSION['token'] == $retorno->token)){
            return true;
        }else{
            return false;
        }
    }
    
}
?>
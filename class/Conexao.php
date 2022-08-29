<?php
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
    
}
?>
<?php
session_start();

class Conexao{
    public static $gespes;
    public static function Inst() {
        $srv = "10.40.10.7";
        $usr = 'setinf';
        $db = 'gespes';
        $pwd = 'semad@cpd';
        $dsn = 'mysql:dbname='.$db.';host='.$srv;     
        if (!isset(self::$gespes)) {
            self::$gespes = new PDO($dsn, $usr, $pwd ,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        }
        return self::$gespes;
    }

    public static $gestaoPessoal;
    public static function InstSDGC() {
        $srv = "10.40.10.6";
        $usr = 'root';
        $db = 'gestaoPessoal';
        $pwd = 'semad@cpd';
        $dsn = 'mysql:dbname='.$db.';host='.$srv;     
        if (!isset(self::$gestaoPessoal)) {
            self::$gestaoPessoal = new PDO($dsn, $usr, $pwd ,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        }
        return self::$gestaoPessoal;
    }

    public static $biometria;
    public static function InstBio() {
        $srv = "10.40.10.6";
        $usr = 'root';
        $db = 'biometria';
        $pwd = 'semad@cpd';
        $dsn = 'mysql:dbname='.$db.';host='.$srv;     
        if (!isset(self::$biometria)) {
            self::$biometria = new PDO($dsn, $usr, $pwd ,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        }
        return self::$biometria;
    }

    public static $biometriaExt;
    public static function InstBioExt() {
        $porta = 5438;
        $srv = "179.233.129.76";
        $usr = 'pmm';
        $db = 'neweasy';
        $pwd = 'pmm@2021#@!';
        $dsn = 'pgsql:dbname='.$db.';port='.$porta.';host='.$srv;     
        if (!isset(self::$biometriaExt)) {
            self::$biometriaExt = new PDO($dsn, $usr, $pwd);
        }
        return self::$biometriaExt;
    }
    public static $controle;
    public static function InstControle() {
        $srv = "10.40.10.7";
        $usr = 'setinf';
        $db = 'controle_docs_teste';
        $pwd = 'semad@cpd';
        $dsn = 'mysql:dbname='.$db.';host='.$srv;     
        if (!isset(self::$controle)) {
            self::$controle = new PDO($dsn, $usr, $pwd ,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        }
        return self::$controle;
    }
    public static function verificaLogin($campo) {
        $sql = "SELECT token FROM usuario WHERE email = ?";
        $stm = Conexao::Inst()->prepare($sql);
        $stm->bindValue(1, $_SESSION['email']);
        $stm->execute();
        $retorno = $stm->fetch(PDO::FETCH_OBJ);
        if (isset($retorno->token)AND($_SESSION['token'] == $retorno->token)AND Conexao::verificaNiveldeAcesso($campo)){
            return true;
        }else{
            return false;
        }
    }
    public static function verificaNiveldeAcesso($campo){
        $token = $_SESSION['token'];
        $sql = "SELECT 
                  $campo
                FROM 
                  usuario 
                WHERE 
                  token = '$token' AND
                  $campo = '1'
                LIMIT 1";
        $stm = Conexao::Inst()->prepare($sql);
        $stm->execute();
        if($stm->rowCount()==1){
            return true;
        }else{
            return false;
        }
      }
    
}
?>
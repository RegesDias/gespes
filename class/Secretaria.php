<?php
require_once('Generica.php');
class Secretaria extends Generica{
    public static $sql = "SELECT
                            *
                          FROM
                            lotacao
                        WHERE
                            ativo = '1'
                           ";

      public function Listar(){
        $call = self::$sql;
        return $exec = Conexao::InstSDGC()->prepare($call);
      }

}
?>
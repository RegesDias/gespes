<?php
require_once('Generica.php');
class TipoControle extends Generica{
    public function buscaId($id){
        $sql = "SELECT * FROM
                    tb_tipo
                WHERE 
                    id = '$id'";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
}
?>
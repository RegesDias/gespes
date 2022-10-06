<?php
require_once('Generica.php');
class DocumentosTipo extends Generica{
    public function buscaId($id){
        $sql = "SELECT * FROM
                    tb_tipo
                WHERE 
                    id = '$id'";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function listar(){
        $sql = "SELECT * FROM
                    tb_tipo";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
}
?>
<?php
require_once('Generica.php');
class CID10 extends Generica{
    public function listaCategoriaSub($nome){
        $sql = "SELECT
                    id,
                    CONCAT(id,'-', descricao) as nome
                FROM
                    categoria_sub
                WHERE
                    CONCAT(id,' ', descricao) like '%$nome%'
                ";
        return Conexao::InstCid10()->prepare($sql);   
    }
}
?>
<?php
require_once('Generica.php');
class Observacao extends Generica{
    public function buscaId($id){
        $sql = "SELECT * FROM
                    tb_observacao 
                WHERE 
                    id = '$id'";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function buscaIdDocumento($id){
        $sql = "SELECT * FROM
                    tb_observacao 
                WHERE 
                    documento_id = '$id'";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
}
?>
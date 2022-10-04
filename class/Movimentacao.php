<?php
require_once('Generica.php');
class Movimentacao extends Generica{
    public function buscaId($id){
        $sql = "SELECT * FROM
                    tb_movimentacao 
                WHERE 
                    id = '$id' AND
                    ativo = '1' ";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function buscaIdDocumento($id){
        $sql = "SELECT * FROM
                    tb_movimentacao 
                WHERE 
                    documento_id = '$id' AND
                    ativo = '1' ";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function buscaIdSetor($id){
        $sql = "SELECT * FROM
                    tb_movimentacao 
                WHERE 
                    setor_id = '$id' AND
                    ativo = '1' ";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function buscaIdUsuario($id){
        $sql = "SELECT * FROM
                    tb_movimentacao 
                WHERE 
                    usuario_id = '$id' AND
                    ativo = '1' ";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
}
?>
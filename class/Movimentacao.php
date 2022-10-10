<?php
require_once('Generica.php');
class Movimentacao extends Generica{
    public function buscaId($id){
        $sql = "SELECT 
                    tb_movimentacao.data_entrada,
                    tb_usuarios.nome as encaminhado,
                    tb_movimentacao.encaminhamento
                FROM
                    tb_movimentacao
                LEFT JOIN tb_usuarios
                ON tb_usuarios.id = log_user_id
            WHERE 
                    tb_movimentacao.id = '$id'
            ORDER BY tb_movimentacao.id";
            return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function buscaIdDocumento($id){
        $sql = "SELECT
                    tb_movimentacao.id,
                    tb_movimentacao.data_entrada,
                    tb_usuarios.nome as responsavel,
                    tb_movimentacao.encaminhamento
                FROM
                    tb_movimentacao
                LEFT JOIN tb_usuarios
                ON tb_usuarios.id = usuario_id
            WHERE 
                documento_id = '$id'
                ORDER BY tb_movimentacao.id";
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
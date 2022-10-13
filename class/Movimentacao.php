<?php
require_once('Generica.php');
class Movimentacao extends Generica{
    public function buscaId($id){
        $sql = "SELECT 
                    tb_movimentacao.data_entrada,
                    usuario.nome as encaminhado,
                    tb_movimentacao.encaminhamento
                FROM
                    controle_docs.tb_movimentacao
                LEFT JOIN gespes.usuario
                ON usuario.id = log_user_id
            WHERE 
                    tb_movimentacao.id = '$id'
            ORDER BY tb_movimentacao.id";
            return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function buscaIdDocumento($id){
        $sql = "SELECT
                    tb_movimentacao.id,
                    tb_movimentacao.data_entrada,
                    usuario.nome as responsavel,
                    tb_movimentacao.encaminhamento
                FROM
                    controle_docs.tb_movimentacao
                LEFT JOIN gespes.usuario
                ON usuario.id = usuario_id
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
    public function listarEncaminhamento($id){
        $sql = "SELECT DISTINCT encaminhamento FROM
                    tb_movimentacao 
                WHERE 
                    usuario_id = '$id' AND
                    ativo = '1' ";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
}
?>
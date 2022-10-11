<?php
require_once('Generica.php');
class Observacao extends Generica{
    public function buscaId($id){
        $sql = "SELECT 
                    tb_observacao.observacao,
                    usuario.nome
                     FROM
                     controle_docs.tb_observacao 
                LEFT JOIN gespes.usuario
                    ON usuario.id = tb_observacao.log_user_id
                WHERE 
                    tb_observacao.id = '$id'";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function buscaIdDocumento($id){
        $sql = "SELECT 
                    tb_observacao.id,
                    tb_observacao.data_cadastro,
                    tb_observacao.observacao,
                    usuario.nome
                     FROM
                     controle_docs.tb_observacao 
                LEFT JOIN gespes.usuario
                    ON usuario.id = tb_observacao.log_user_id
                WHERE 
                    documento_id = '$id'";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
}
?>
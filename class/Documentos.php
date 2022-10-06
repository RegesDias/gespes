<?php
require_once('Generica.php');
class Documentos extends Generica{
    public function listarOrigem(){
        $idSetor= $_SESSION['idSetor'];
        $sql = "SELECT
                    tb_documentos.id as id,
                    tb_documentos.numero_documento as numero_documento,
                    tb_documentos.ano_documento as ano_documento,
                    tb_documentos.origem as origem
                FROM
                    tb_documentos
                LEFT JOIN
                    tb_movimentacao
                    ON tb_documentos.id = tb_movimentacao.documento_id
                WHERE
                    ano_documento = YEAR(NOW()) AND
                    tb_movimentacao.setor_id = '$idSetor' AND
                    ativo = 1
                ORDER BY
                    origem
                LIMIT
                    1000
                ";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function listarNumero(){
        $idSetor= $_SESSION['idSetor'];
        $sql = "SELECT
                    tb_documentos.id,
                    tb_documentos.numero_documento,
                    tb_documentos.ano_documento,
                    tb_documentos.origem
                FROM
                    tb_documentos
                LEFT JOIN
                    tb_movimentacao
                    ON tb_documentos.id = tb_movimentacao.documento_id
                WHERE
                    ano_documento = YEAR(NOW()) AND
                    tb_movimentacao.setor_id = '$idSetor'AND
                    ativo = 1
                ORDER BY
                    tb_documentos.numero_documento
                LIMIT
                    1000
                ";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function buscaId($id){
        $sql = "SELECT * FROM
                    tb_documentos 
                WHERE 
                    id = '$id'";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function buscaNumeroAnoTipoStatusLocal($ano,$tipo, $status,$idSetor){
        $sql = "SELECT
                    tb_documentos.id,
                    tb_documentos.numero_documento,
                    tb_documentos.ano_documento,
                    tb_documentos.origem
                FROM
                    tb_documentos
                LEFT JOIN
                    tb_movimentacao
                    ON tb_documentos.id = tb_movimentacao.documento_id
                WHERE 
                tb_documentos.ano_documento = '$ano'";
    if($status != ''){}
              $sql .= "tb_documentos.status = '$status' AND";

              $sql .= "tb_documentos.tipo = '$tipo' AND";

        echo $sql;
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function buscaNumeroAnoStatus($numero,$ano, $status){
        $sql = "SELECT
                    tb_documentos.id,
                    tb_documentos.numero_documento,
                    tb_documentos.ano_documento,
                    tb_documentos.origem
                FROM
                    tb_documentos
                LEFT JOIN
                    tb_movimentacao
                    ON tb_documentos.id = tb_movimentacao.documento_id 
                WHERE ";
        if($numero != ''){
            $sql .= " numero_documento = '$numero' ";
        }
        if($ano != ''){
            if($numero != ''){
                $sql .= " AND "; 
            }
            $sql .= " ano_documento = '$ano' ";
        }
        if($status != ''){
            if(($numero != '') OR ($ano != '')){
                $sql .= " AND "; 
            }
            $sql .= " status = '$status' ";
        }
        return $exec = Conexao::InstControle()->prepare($sql);
    }

    public function buscaAnos(){
        $sql = "SELECT DISTINCT ano_documento FROM tb_documentos ORDER BY ano_documento ASC";
        $exec = Conexao::InstControle()->prepare($sql);
        $exec->execute();
        $result = $exec->fetchAll(PDO::FETCH_ASSOC);
        $maiorAnoAtual = $result[0]['ano_documento'];
        $anoAtual = date("Y");
        if($maiorAnoAtual < $anoAtual){
            $novo['ano_documento'] = $anoAtual;
            array_unshift($result, $novo);
        }
        return $result;
    }


    
}
?>
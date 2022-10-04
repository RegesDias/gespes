<?php
require_once('Generica.php');
class Documentos extends Generica{
    public function buscaId($id){
        $sql = "SELECT * FROM
                    tb_documentos 
                WHERE 
                    id = '$id'";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function buscaNumeroAnoStatus($numero,$ano, $status){
        $sql = "SELECT * FROM
                    tb_documentos 
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
        $sql = "SELECT DISTINCT ano_documento FROM tb_documentos ORDER BY ano_documento DESC";
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
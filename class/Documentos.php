<?php
require_once('Generica.php');
class Documentos extends Generica{
    public static $sql = "SELECT DISTINCT
                                tb_documentos.id,
                                tb_documentos.ano_documento,
                                tb_documentos.numero_documento,
                                tb_documentos.assunto,
                                tb_documentos.origem,
                                tb_documentos.data_inclusao,
                                tb_documentos.status,
                                tb_tipo.sigla as sigla
                            FROM
                                tb_documentos
                            LEFT JOIN
                                tb_movimentacao
                                ON tb_documentos.id = tb_movimentacao.documento_id
                            LEFT JOIN
                                tb_tipo
                                ON tb_tipo.id = tb_documentos.tipo
                                WHERE ";

    public function buscaId($id){
        $sql = "SELECT DISTINCT
                                tb_documentos.id,
                                tb_documentos.ano_documento,
                                tb_documentos.numero_documento,
                                tb_documentos.assunto,
                                tb_documentos.origem,
                                tb_documentos.data_inclusao,
                                tb_status.nome as status,
                                tb_usuarios.nome as resposavel,
                                tb_tipo.sigla as sigla,
                                tb_tipo.nome as tipo,
                                tb_movimentacao.data_entrada
                            FROM
                                tb_documentos
                            LEFT JOIN
                                tb_movimentacao
                                ON tb_documentos.id = tb_movimentacao.documento_id
                            LEFT JOIN
                                tb_status
                                ON tb_status.id = tb_documentos.status
                            LEFT JOIN
                                tb_usuarios
                                ON tb_usuarios.id = tb_movimentacao.usuario_id
                            LEFT JOIN
                                tb_tipo
                                ON tb_tipo.id = tb_documentos.tipo
                            WHERE 
                                tb_documentos.id = '$id' AND tb_movimentacao.ativo = 1";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function buscaNumeroAnoTipoStatusLocal($ano,$tipo, $status,$idSetor,$order){
        $sql = self::$sql." tb_movimentacao.ativo = '1' ";
        if(($ano != '') AND ($ano !='tds')){
            $sql .= " AND tb_documentos.ano_documento = '$ano' ";
        }
        if(($status != '') AND ($status !='tds')){
            $sql .= " AND tb_documentos.status = '$status' ";
        }
        if(($tipo != '') AND ($tipo !='tds')){
            $sql .= " AND tb_documentos.tipo = '$tipo'";
        }
        if(($idSetor != '') AND ($idSetor !='tds')){
            if($idSetor =='user'){
                $usuario_id = $_SESSION['id'];
                $sql .= " AND tb_movimentacao.usuario_id = '$usuario_id'";
            }else{
                $sql .= " AND tb_movimentacao.setor_id = '$idSetor'";
            }
        }
        if($order != ''){
            $sql .= " ORDER BY ".$order." DESC ";
        }
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function buscaNumeroAno($numero,$ano){
        if($numero != ''){
            $sql = self::$sql .= " numero_documento = '$numero' ";
        }
        if($ano != ''){
            if($numero != ''){
                $sql = self::$sql .= " AND "; 
            }
            $sql = self::$sql .= " ano_documento = '$ano' ";
        }
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function buscaAssunto($assunto, $order){
        if($assunto != ''){
            $sql = self::$sql .= " assunto like '%$assunto%' 
                ORDER BY $order DESC";
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
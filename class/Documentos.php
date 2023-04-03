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
                                        tb_movimentacao.id as idMovimentacao,
                                        tb_movimentacao.setor_id,
                                        tb_movimentacao.usuario_id,
                                        tb_documentos.ano_documento,
                                        tb_documentos.numero_documento,
                                        tb_documentos.assunto,
                                        tb_documentos.origem,
                                        tb_documentos.data_inclusao,
                                        tb_movimentacao.data_entrada,
                                        tb_movimentacao.data_recebido,
                                        tb_status.nome as status,
                                        tb_status.id as idStatus,
                                        usuario.nome as resposavel,
                                        tb_tipo.sigla as sigla,
                                        tb_tipo.nome as tipo
                                    FROM
                                        controle_docs.tb_movimentacao
                                    LEFT JOIN
                                        controle_docs.tb_documentos
                                        ON tb_documentos.id = tb_movimentacao.documento_id
                                    LEFT JOIN
                                        controle_docs.tb_status
                                        ON tb_status.id = tb_documentos.status
                                    LEFT JOIN
                                        gespes.usuario
                                        ON gespes.usuario.id = tb_movimentacao.usuario_id
                                    LEFT JOIN
                                    controle_docs.tb_tipo
                                        ON tb_tipo.id = tb_documentos.tipo
                                    WHERE 
                                        tb_movimentacao.documento_id = '$id'
                                    ORDER BY 
                                        tb_movimentacao.id DESC
                                        LIMIT 1";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function buscaNumeroAnoTipoStatusLocal($ano,$tipo, $status,$idSetor,$idUsuario,$order){
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
        if(($idUsuario != '') AND ($idUsuario !='tds')){
            $sql .= " AND tb_movimentacao.usuario_id = '$idUsuario'";
        }
        if(($order != '')AND ($order != 'NAO')){
            $sql .= " ORDER BY ".$order." DESC";
        }
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function buscaNumeroAno($numero,$ano,$order=''){
        if($numero != ''){
            $sql = self::$sql .= " numero_documento = '$numero' ";
        }
        if($ano != ''){
            if($numero != ''){
                $sql = self::$sql .= " AND "; 
            }
            $sql = self::$sql .= " ano_documento = '$ano' ";
        }
        if($order != ''){
            $sql .= " ORDER BY ".$order;
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
    public function listaAssuntos(){
        $sql = "SELECT DISTINCT assunto FROM tb_documentos";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function recebe($idMovimentacao){
        $idUser = $_SESSION['id'];
        $sql = "UPDATE tb_movimentacao SET 
                        usuario_id = '$idUser', 
                        data_recebido = NOW() 
                WHERE 
                    id = '$idMovimentacao'";
        $stm = Conexao::InstControle()->prepare($sql);
        $stm->execute();
        $retorno = array('codigo' => 1, 'mensagem' => 'Documento recebido com sucesso!');
        echo json_encode($retorno);
        exit();
    }
    public function movimentarExecutar($idDocumento,$encaminharResponsavel,$movimentacoesSetor,$encaminharTexto){
        $idUser = $_SESSION['id'];
        $sql = "INSERT INTO tb_movimentacao(
                                    documento_id,
                                    usuario_id,
                                    setor_id,
                                    encaminhamento,
                                    ativo,
                                    log_user_id,
                                    data_entrada
                                )VALUES(
                                    '$idDocumento',
                                    '$encaminharResponsavel',
                                    '$movimentacoesSetor',
                                    '$encaminharTexto',
                                    '1',
                                    '$idUser',
                                    NOW())";
                $stm = Conexao::InstControle()->prepare($sql);
                $stm->execute();
    }
    public function movimentarExecutarEntrada($idDocumento,$encaminharResponsavel,$movimentacoesSetor,$encaminharTexto){
        $idUser = $_SESSION['id'];
        $sql = "INSERT INTO tb_movimentacao(
                                    documento_id,
                                    usuario_id,
                                    setor_id,
                                    encaminhamento,
                                    ativo,
                                    log_user_id,
                                    data_entrada,
                                    data_recebido,
                                    data_saida
                                )VALUES(
                                    '$idDocumento',
                                    '$encaminharResponsavel',
                                    '$movimentacoesSetor',
                                    '$encaminharTexto',
                                    '0',
                                    '$idUser',
                                    NOW(),
                                    NOW(),
                                    NOW())";
                $stm = Conexao::InstControle()->prepare($sql);
                $stm->execute();
    }
    public function saidaExecutar($idDocumento,$destino,$encaminharTexto){
        $idUser = $_SESSION['id'];
        $idSetor = $_SESSION['idSetor'];
        $sql = "INSERT INTO tb_movimentacao(
                                    documento_id,
                                    usuario_id,
                                    setor_id,
                                    encaminhamento,
                                    ativo,
                                    log_user_id,
                                    data_entrada,
                                    data_recebido,
                                    destino,
                                    data_saida
                                )VALUES(
                                    '$idDocumento',
                                    '$idUser',
                                    '$idSetor',
                                    '$encaminharTexto',
                                    '0',
                                    '$idUser',
                                    NOW(),
                                    NOW(),
                                    '$destino',
                                    NOW())";
                $stm = Conexao::InstControle()->prepare($sql);
                $stm->execute();
    }
    public function inserirDocumento($tipo,$numero_documento,$ano_documento,$assunto,$origem){
        $sql = "INSERT INTO tb_documentos(
                                        tipo,
                                        numero_documento,
                                        ano_documento,
                                        assunto,
                                        origem,
                                        status, 
                                        data_inclusao
                                    )VALUES(
                                        '$tipo',
                                        '$numero_documento',
                                        '$ano_documento',
                                        '$assunto',
                                        '$origem',
                                        '1',
                                        NOW()
                                    )";
                $stm = Conexao::InstControle()->prepare($sql);
                $stm->execute();
                $id = Conexao::InstControle()->lastInsertId();
                return $id;
    }
    public function entradaExecutar($idDocumento,$encaminharTexto){
        $idUser = $_SESSION['id'];
        $idSetor = $_SESSION['idSetor'];
        $sql = "INSERT INTO tb_movimentacao(
                                    documento_id,
                                    usuario_id,
                                    setor_id,
                                    encaminhamento,
                                    ativo,
                                    log_user_id,
                                    data_entrada,
                                    data_recebido
                                )VALUES(
                                    '$idDocumento',
                                    '$idUser',
                                    '$idSetor',
                                    '$encaminharTexto',
                                    '1',
                                    '$idUser',
                                    NOW(),
                                    NOW()
                                    )";
                $stm = Conexao::InstControle()->prepare($sql);
                $stm->execute();
    }
    public function finalizarMovimento($idDocumento){
        $sql = "UPDATE tb_movimentacao SET
                        ativo = 0,
                        data_saida = NOW()
                WHERE 
                    id = '$idDocumento'";
        $stm = Conexao::InstControle()->prepare($sql);
        $stm->execute();
    }
    public function arquivarDocumento($idDocumento){
        $sql = "UPDATE tb_documentos SET
                        status = 2,
                        data_baixa = NOW()
                WHERE 
                    id = '$idDocumento'";
        $stm = Conexao::InstControle()->prepare($sql);
        $stm->execute();
    }
    public function desarquivarDocumento($idDocumento){
        $sql = "UPDATE tb_documentos SET
                        status = 1,
                        data_baixa = NULL
                WHERE 
                    id = '$idDocumento'";
        $stm = Conexao::InstControle()->prepare($sql);
        $stm->execute();
    }
    public function analizandoDocumentosPorData($ano,$tipo, $status,$idSetor,$idUsuario,$order){
        $sql = "SELECT DISTINCT
        data_inclusao ,COUNT(data_inclusao) as total 
    FROM
        tb_documentos
    LEFT JOIN
        tb_movimentacao
        ON tb_documentos.id = tb_movimentacao.documento_id
    LEFT JOIN
        tb_tipo
        ON tb_tipo.id = tb_documentos.tipo
        WHERE tb_movimentacao.ativo = '1'";
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
        if(($idUsuario != '') AND ($idUsuario !='tds')){
            $sql .= " AND tb_movimentacao.usuario_id = '$idUsuario'";
        }
        $sql .="GROUP BY data_inclusao";
        if(($order != '')AND ($order != 'NAO')){
            $sql .= " ORDER BY ".$order." DESC ";
        }
        return $exec = Conexao::InstControle()->prepare($sql);
    }
    public function analizandoDocumentosPorUsuario($ano,$tipo, $status,$idSetor,$idUsuario,$order){
        $sql = "SELECT DISTINCT
        CONCAT(SUBSTRING_INDEX(gespes.usuario.nome, ' ', 1),' ', SUBSTRING_INDEX(gespes.usuario.nome, ' ', -1) ) as data_inclusao,
        COUNT(data_inclusao) as total 
    FROM
        controle_docs.tb_documentos
    LEFT JOIN controle_docs.tb_movimentacao
        ON tb_documentos.id = tb_movimentacao.documento_id
    LEFT JOIN controle_docs.tb_tipo
        ON tb_tipo.id = tb_documentos.tipo
    LEFT JOIN
        gespes.usuario
        ON gespes.usuario.id = tb_movimentacao.usuario_id
        WHERE tb_movimentacao.ativo = '1'";
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
        if(($idUsuario != '') AND ($idUsuario !='tds')){
            $sql .= " AND tb_movimentacao.usuario_id = '$idUsuario'";
        }
        $sql .="GROUP BY gespes.usuario.nome";
        if(($order != '')AND ($order != 'NAO')){
            $sql .= " ORDER BY ".$order." DESC ";
        }
        return $exec = Conexao::InstControle()->prepare($sql);
    }
}
?>

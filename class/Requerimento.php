<?php
require_once('Generica.php');
class Requerimentos extends Generica{

  //Listas----------------------------------------
  public function listaRSolicitacoes(){
    $sql = "SELECT * FROM requerimento_solicitacao WHERE compativel_sesmit = '1' ORDER BY item";
    return $stm = Conexao::InstSDGC()->prepare($sql);
  }
  public function listaRequerimentoIdInfo($id){
    $sql = "SELECT 
            requerimento.id,
            requerimento_status.nome as status,
            requerimento_solicitacao.item as solicitacao
          FROM 
                requerimento 
                LEFT JOIN requerimento_status
                ON requerimento_status.id = requerimento.id_requerimento_status
                LEFT JOIN requerimento_solicitacao
                ON requerimento.id_requerimento_solicitacao = requerimento_solicitacao.id
          WHERE 
              requerimento.id_info = '$id'";
    return $stm = Conexao::InstSDGC()->prepare($sql);
  }
  //salvar
  public function inserir($obj){
    $login = $this->buscaLoginSDGC();
    $obj->userLogin = $login->id; 
    $sql = "INSERT INTO requerimento(
                                id_requerimento_status,
                                id_requerimento_solicitacao,
                                id_info,
                                userLogin
                        )VALUES(
                                '$obj->id_requerimento_status',
                                '$obj->id_requerimento_solicitacao',
                                '$obj->id_info',
                                '$obj->userLogin')";
            $stm = Conexao::InstSDGC()->prepare($sql);
            $stm->execute();
            $obj->id_requerimento = Conexao::InstSDGC()->lastInsertId();
            $this->atualizaRequerimentoHistorico($obj);
            return $obj->id_requerimento;}

public function atualizaRequerimentoHistorico ($obj){
  if($obj->id_requerimento_status == ''){
      $sql = "INSERT INTO requerimento_historico(
              id_requerimento,
              id_requerimento_medico,
              id_requerimento_status,
              userLogin,
              ativo
        )VALUES( 
              '$obj->id_requerimento',
              '$obj->id_requerimento_medico',
              '$obj->id_requerimento_status',
              '$obj->userLogin',
              '1'
        )";
  }else{
        $sql = "INSERT INTO requerimento_historico(
              id_requerimento,
              id_requerimento_status,
              id_requerimento_medico,
              userLogin,
              ativo
        )VALUES( 
              '$obj->id_requerimento',
              '$obj->id_requerimento_status',
              NULL,
              '$obj->userLogin',
              '1'
        )";
  }
    $stm = Conexao::InstSDGC()->prepare($sql);
    $stm->execute();
  return $sql;
}
  //atualizar
  public function inserirNumeroDeProtocolo($obj){
    $sql = "UPDATE requerimento SET 
                    protocolo = '$obj->protocolo'
            WHERE 
                id = '$obj->id_requerimento'";
    $stm = Conexao::InstSDGC()->prepare($sql);
    $stm->execute();
    return $sql;
  }
  public function atualizarStatus($obj){
    $sql = "UPDATE requerimento SET 
                    id_requerimento_status = '$obj->id_requerimento_status'
            WHERE 
                id = '$obj->id_requerimento'";
    $stm = Conexao::InstSDGC()->prepare($sql);
    $stm->execute();
    return $sql;
  }



}

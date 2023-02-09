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
    $sql = "INSERT INTO requerimento(
                                id_requerimento_status,
                                id_requerimento_solicitacao,
                                id_info,
                                userLogin
                        )VALUES(
                                '$obj->id_requerimento_status',
                                '$obj->id_requerimento_solicitacao',
                                '$obj->id_info',
                                '$login->id')";
            $stm = Conexao::InstSDGC()->prepare($sql);
            $stm->execute();
            return Conexao::InstSDGC()->lastInsertId();
}
  //atualizar
  public function atualizarProtocolo($obj){
    $sql = "UPDATE requerimento SET 
                    protocolo = '$obj->protocolo'
            WHERE 
                id = '$obj->id'";
    $stm = Conexao::InstSDGC()->prepare($sql);
    $stm->execute();
    return $sql;
  }
  public function atualizarStatus($obj){
    $sql = "UPDATE requerimento SET 
                    id_requerimento_status = '$obj->id_info'
            WHERE 
                id = '$obj->id'";
    $stm = Conexao::InstSDGC()->prepare($sql);
    $stm->execute();
    return $sql;
  }



}

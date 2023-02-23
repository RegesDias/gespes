<?php
require_once('Generica.php');
class Endereco extends Generica
{
  //Buscas-----------------------------------
  public function buscarCep($cep){
    $sql = "SELECT
          logradouro.nome as logradouro,
          bairros.id as idBairro,
          bairros.nome as nomeBairro,
          cidades.id as idCidade,
          cidades.nome as nomeCidade,
          estados.id as idEstado,
          estados.nome as nomeEstado
      FROM 
          logradouro
          LEFT JOIN bairros
          ON bairros.id = logradouro.idBairro
          LEFT JOIN cidades
          ON cidades.id = bairros.idCidade
          LEFT JOIN estados
          ON estados.id = cidades.idEstado
      WHERE 
          logradouro.CEP = '$cep'";
    return $stm = Conexao::InstEndereco()->prepare($sql);
  }
  public function buscaEnderecoIdInfo($id){
    $sql = "SELECT * FROM requerimento_info WHERE id_info = '$id'";
    //echo $sql;
    return $stm = Conexao::InstSDGC()->prepare($sql);
  }
//Listas----------------------------------------
public function listaSolicitacoes(){
  $sql = "SELECT * FROM requerimento_solicitacao WHERE compativel_sesmit = '1' ORDER BY item";
  return $stm = Conexao::InstSDGC()->prepare($sql);
}
  public function listaEstados(){
    $sql = "SELECT * FROM estados ORDER BY nome";
    return $stm = Conexao::InstEndereco()->prepare($sql);
  }
  public function listaEstadoId($id){
    $sql = "SELECT * FROM estados WHERE id = '$id' ORDER BY nome";
    return $stm = Conexao::InstEndereco()->prepare($sql);
  }
  public function listaCidadeIdEstado($idEstado){
    $sql = "SELECT * FROM cidades WHERE idEstado = '$idEstado' ORDER BY nome";
    return $stm = Conexao::InstEndereco()->prepare($sql);
  }
  public function listaCidadeId($id){
    $sql = "SELECT * FROM cidades WHERE id = '$id' ORDER BY nome";
    return $stm = Conexao::InstEndereco()->prepare($sql);
  }
  public function listaBairroId($id){
    $sql = "SELECT * FROM bairros WHERE id = '$id' ORDER BY nome";
    return $stm = Conexao::InstEndereco()->prepare($sql);
  }
  public function listaBairroIdCidade($idCidade){
    $sql = "SELECT * FROM bairros WHERE idCidade = '$idCidade' ORDER BY nome";
    return $stm = Conexao::InstEndereco()->prepare($sql);
  }
//Inserções----------------------------------------
  public function insereEnderecoOLD($obj){
      $sql = "INSERT INTO requerimento_info(
                                  id_info,
                                  cep_logradouro,
                                  id_bairro,
                                  endereco,
                                  numero, 
                                  complemento, 
                                  celular,
                                  telefone,
                                  email
                          )VALUES(
                                  '$obj->id_info',
                                  '$obj->cep_logradouro',
                                  '$obj->id_bairro',
                                  '$obj->endereco',
                                  '$obj->numero',
                                  '$obj->complemento',
                                  '$obj->celular',
                                  '$obj->telefone',
                                  '$obj->email')";
              $stm = Conexao::InstSDGC()->prepare($sql);
              $stm->execute();
              return Conexao::InstSDGC()->lastInsertId();
  }
  public function insereEndereco($obj){
    $sql = "INSERT INTO requerimento_info(
                                id_info,
                                cep_logradouro,
                                id_bairro,
                                endereco,
                                numero, 
                                complemento, 
                                celular,
                                telefone,
                                email
                        )VALUES(
                                '$obj->id_info',
                                NULL,
                                NULL,
                                NULL,
                                NULL,
                                NULL,
                                '$obj->celular',
                                '$obj->telefone',
                                '$obj->email')";
            $stm = Conexao::InstSDGC()->prepare($sql);
            $stm->execute();
            return Conexao::InstSDGC()->lastInsertId();
}
  public function atualizaEndereco($obj){
    $sql = "UPDATE requerimento_info SET 
                    id_info = '$obj->id_info',
                    cep_logradouro = '$obj->cep_logradouro', 
                    id_bairro = '$obj->id_bairro', 
                    endereco = '$obj->endereco', 
                    numero = '$obj->numero', 
                    complemento = '$obj->complemento', 
                    celular = '$obj->celular', 
                    telefone = '$obj->telefone', 
                    email = '$obj->email'
            WHERE 
                id = '$obj->id'";
    $stm = Conexao::InstSDGC()->prepare($sql);
    $stm->execute();
    return $sql;
  }
}

<?php
require_once('Generica.php');
class Endereco extends Generica
{

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

  public function insereEndereco($obs){
    echo $obs;
  }
}

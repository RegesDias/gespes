<?php
require_once('Conexao.php');

class Servidor {
  public function listarPorCodigo(){
    $call = "SELECT codfunc,nome,secretarias,prefixos,nome_carg,dataadmis,secoes,cpfs FROM servidor ORDER BY codfunc LIMIT 1000";
    return $exec = Conexao::Inst()->prepare($call);
  }
  public function listarPorNome(){
    $call = "SELECT codfunc,nome,secretarias,prefixos,nome_carg,dataadmis,secoes,cpfs FROM servidor ORDER BY nome LIMIT 1000";
    return $exec = Conexao::Inst()->prepare($call);
  }
  public function buscaCodFunc($codfunc){
    $call = "SELECT codfunc,nome,secretarias,prefixos,nome_carg,dataadmis,secoes,cpfs FROM servidor WHERE codfunc = $codfunc";
    return $exec = Conexao::Inst()->prepare($call);
  }
  public function buscaMatriculaCpfNome($dado){
    if(is_numeric($dado)){
        if(strlen($dado) == 11){
          $call = "SELECT codfunc,nome,secretarias,prefixos,nome_carg,dataadmis,secoes,cpfs FROM servidor WHERE cpfs = ".$dado;
        }else{
          $call = "SELECT codfunc,nome,secretarias,prefixos,nome_carg,dataadmis,secoes,cpfs FROM servidor WHERE codfunc = '$dado'";
        }
    }else{
      $call = "SELECT codfunc,nome,secretarias,prefixos,nome_carg,dataadmis,secoes,cpfs FROM servidor WHERE nome like '%$dado%'";
    }
    return $exec = Conexao::Inst()->prepare($call);
  }
}
?>
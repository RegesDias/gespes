<?php
require_once('Conexao.php');
require_once('Generica.php');
class Servidor extends Generica{
  public static $sql = "SELECT
                            historico_funcional.matricula as codfunc,
                            info_pessoal.nome,
                            lotacao.nome_lotacao as secretarias,
                            cargos.nome as nome_carg,
                            historico_funcional.data_admissao as dataadmis,
                            info_pessoal.cpf as cpfs,
                            situacao.nome_situacao as secoes,
                            info_pessoal.id as idInfo
                          FROM
                            info_pessoal
                          INNER JOIN historico_funcional
                            ON info_pessoal.id = historico_funcional.id_info
                          INNER JOIN solicitacao
                            ON solicitacao.id_hist_func = historico_funcional.id
                          INNER JOIN lotacao
                            ON lotacao.id_lotacao = solicitacao.id_lotacao
                          INNER JOIN cargos
                            ON cargos.id = historico_funcional.id_cargo
                            INNER JOIN situacao
                            ON situacao.id_situacao = historico_funcional.id_situacao
                          WHERE
                              solicitacao.ativo = 1 ";
  
  public function listarPorCodigo(){
    $call = self::$sql."ORDER BY 
    historico_funcional.matricula LIMIT 1000";

    return $exec = Conexao::InstSDGC()->prepare($call);
  }

  public function listarPorNome(){
    $call = self::$sql."ORDER BY 
                        info_pessoal.nome LIMIT 1000";

    return $exec = Conexao::InstSDGC()->prepare($call);
  }

  public function buscaCodFunc($codfunc){
      $codfunc = str_pad($codfunc , 6 , '0' , STR_PAD_LEFT);
      $call = self::$sql."AND 
                              historico_funcional.matricula = '$codfunc'";
    return $exec = Conexao::InstSDGC()->prepare($call);  
  }
  public function buscaMatricula($dado,$order){
    $dado = str_pad($dado , 6 , '0' , STR_PAD_LEFT);
    $call = self::$sql."AND 
                            historico_funcional.matricula = '$dado'";
    return $call;
}
  public function buscaNome($nome,$order){
    $nome = str_replace(' ', '%', $nome);
    $call = self::$sql."AND 
                            info_pessoal.nome Like '%$nome%'";
    if($order!=''){
      $call = $call." ORDER BY ".$order." DESC";
    }
    return $call;  
  }

  public function buscaCPF($cpf,$order){
    $call = self::$sql."AND 
                            info_pessoal.cpf = '$cpf'";
    return $call;                   
    
  }

  public function buscaMatriculaCpfNome($dado, $order){
    if(is_numeric($dado)){
        if(strlen($dado) == 11){
          return $call  = $this->buscaCPF($dado, $order);
        }else{

          return $call = $this->buscaMatricula($dado,$order);
        }
    }
    return $call = $this->buscaNome($dado, $order);
  }

}
?>
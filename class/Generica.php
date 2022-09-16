<?php

class Generica {
  public function verificaPreenchimentoCampo($dado, $campo){
    if (empty($dado)):
      $retorno = array('codigo' => 0, 'mensagem' => 'Preencha o campo '.$campo.' !');
      echo json_encode($retorno);
      exit();
    endif;
  }
}
?>
<?php
require_once('Generica.php');
class Setor extends Generica{
    public static $sql = "SELECT
                            *
                          FROM
                            setor
                           ";
      public function listarPorCodigo(){
        $call = self::$sql."ORDER BY 
        setor.id DESC LIMIT 1000";
        return $exec = Conexao::Inst()->prepare($call);
      }
    
      public function listarPorNome(){
        $call = self::$sql."ORDER BY 
                            setor.nome LIMIT 1000";
        return $exec = Conexao::Inst()->prepare($call);
      }

      public function ListarAtivos(){
        $call = self::$sql."WHERE status = 'Ativo' ORDER BY 
        setor.id DESC LIMIT 1000";
        return $exec = Conexao::Inst()->prepare($call);
      }
      public function buscaNome($nome){
        $nome = str_replace(' ', '%', $nome);
        $call = self::$sql."WHERE
                                setor.nome Like '%$nome%'
                            ORDER BY 
                                setor.nome LIMIT 1000";
    
        return $exec = Conexao::Inst()->prepare($call);
      }
      public function buscaID($id){
        $call = self::$sql."WHERE
                                setor.id = '$id'
                            LIMIT 1";
        return $exec = Conexao::Inst()->prepare($call);
      }
      public function insereNovo($nome, $status){
        $sql = "INSERT INTO setor
                              (
                                nome,
                                status
                              )VALUES(
                                '$nome',
                                '$status')";
          $stm = Conexao::Inst()->prepare($sql);
          $stm->execute();
          $retorno = array('codigo' => 1, 'mensagem' => 'Setor '.$nome.' criado com sucesso!');
          echo json_encode($retorno);
          exit();
        }
        public function atualizarDados($id,$nome,$status){
          $sql = "UPDATE setor SET 
                                nome = '$nome',
                                status = '$status'
                    WHERE id = '$id'";
            $stm = Conexao::Inst()->prepare($sql);
            $stm->execute();
            $retorno = array('codigo' => 1, 'mensagem' => 'Setor '.$nome.' alterado com sucesso!');
            echo json_encode($retorno);
            exit();
          }
}
?>
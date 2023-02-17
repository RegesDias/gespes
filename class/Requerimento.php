<?php
require_once('Generica.php');
class Requerimentos extends Generica{

  //Listas----------------------------------------
  public function listaRSolicitacoes(){
    $sql = "SELECT * FROM requerimento_solicitacao WHERE compativel_sesmit = '1' ORDER BY item";
    return $stm = Conexao::InstSDGC()->prepare($sql);
  }
  public function listarMedicosAtivos(){
    $sql = "SELECT 
                requerimento_medico.id,
                requerimento_medico.CRM,
                info_pessoal.nome,
                info_pessoal.CPF
              FROM 
                  requerimento_medico
                              LEFT JOIN historico_funcional
                              ON historico_funcional.id = requerimento_medico.idHistFunc
                              LEFT JOIN info_pessoal
                              ON info_pessoal.id = historico_funcional.id_info
              WHERE
                requerimento_medico.ativo = 1";
      return $stm = Conexao::InstSDGC()->prepare($sql);
  }
  public function listaRequerimentoIdInfo($id){
    $sql = "SELECT 
            requerimento.id,
            requerimento_status.classifica,
            requerimento_status.btnIcone,
            requerimento_status.id as idStatus,
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
  public function listaRequerimentoIdAgenda($id){
    $sql = "SELECT
                requerimento.id, 
                requerimento.protocolo,
                requerimento.matricula,
                requerimento_status.btnIcone,
                requerimento_status.classifica,
                requerimento_status.nome as status,
                requerimento_solicitacao.item as solicitacao,
                agenda.periodo,
                agenda.start as data,
                agenda.id as id_agenda,
                info_pessoal.nome as paciente
            FROM requerimento
                LEFT JOIN requerimento_status
                ON requerimento_status.id = requerimento.id_requerimento_status
                LEFT JOIN requerimento_solicitacao
                ON requerimento_solicitacao.id = requerimento.id_requerimento_solicitacao
                LEFT JOIN agenda
                ON agenda.id = requerimento.id_agenda
                LEFT JOIN info_pessoal
                ON info_pessoal.id = requerimento.id_info
            WHERE
              requerimento.id_agenda = '$id' AND
              requerimento_status.id = '4'
    ";
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
                                matricula,
                                userLogin
                        )VALUES(
                                '$obj->id_requerimento_status',
                                '$obj->id_requerimento_solicitacao',
                                '$obj->id_info',
                                '$obj->matricula',
                                '$obj->userLogin')";
            $stm = Conexao::InstSDGC()->prepare($sql);
            $stm->execute();
            $obj->id_requerimento = Conexao::InstSDGC()->lastInsertId();
            $this->atualizaRequerimentoHistorico($obj);
            return $sql;
            //return $obj->id_requerimento;
    }
  public function buscarRAtendimentoCid($HPP,$id_requerimento_atendimento){
        $sql = "SELECT * FROM 
                    requerimento_atendimento_cid 
              WHERE 
                    requerimento_atendimento_cid.HPP = '$HPP' AND
                    requerimento_atendimento_cid.id_requerimento_atendimento = '$id_requerimento_atendimento'";
        return $stm = Conexao::InstSDGC()->prepare($sql);
  }
  public function buscarRAtendimento($idRequerimento,$idAgenda){
    $sql = "SELECT * FROM 
                requerimento_atendimento 
          WHERE 
            requerimento_atendimento.idRequerimento = '$idRequerimento' AND
            requerimento_atendimento.idAgenda = '$idAgenda'";
    return $stm = Conexao::InstSDGC()->prepare($sql);
}
public function atualizarRAtendimento($obj){
  $sql = "UPDATE requerimento_atendimento SET 
                          medicamentosFichaMedica='$obj->medicamentosFichaMedica', 
                          CRMFichaMedica='$obj->CRMFichaMedica', 
                          nomeMedicoAtestado='$obj->nomeMedicoAtestado', 
                          obsFichaMedica='$obj->obsFichaMedica', 
                          diasAfastamentoFichaMedica='$obj->diasAfastamentoFichaMedica', 
                          dataHoraAtendimento=NOW()
                      WHERE
                          id='$obj->id_requerimento_atendimento'
                      ";
    $rtn = new stdClass();
    $rtn->exec = Conexao::InstSDGC()->exec($sql);
    $rtn->sql = $sql; 
    return $rtn;
}
  public function inserirRAtendimento($obj){
    $login = $this->buscaLoginSDGC();
    $obj->userLogin = $login->id; 
    $sql = "INSERT INTO requerimento_atendimento (
                          idRequerimento,
                          idAgenda,
                          idRequerimentoMedico, 
                          medicamentosFichaMedica, 
                          CRMFichaMedica, 
                          nomeMedicoAtestado, 
                          obsFichaMedica, 
                          diasAfastamentoFichaMedica, 
                          dataHoraAtendimento,
                          ativo
                        )VALUES(
                          '$obj->id_requerimento', 
                          '$obj->idAgenda', 
                          '$obj->id_requerimento_medico', 
                          '$obj->medicamentosFichaMedica', 
                          '$obj->CRMFichaMedica', 
                          '$obj->nomeMedicoAtestado', 
                          '$obj->obsFichaMedica', 
                          '$obj->diasAfastamentoFichaMedica', 
                          NOW(),
                          '1'
                        )";
            $stm = Conexao::InstSDGC()->prepare($sql);
            $stm->execute();
            $obj->id_requerimento_atendimento = Conexao::InstSDGC()->lastInsertId();
            $this->atualizaRequerimentoHistorico($obj);
            $retorno = new stdClass();
            $retorno->sql= $sql;
            $retorno->id_requerimento_atendimento= $obj->id_requerimento_atendimento;
            return $retorno;
    }
    public function limparRAtendimentoCid($id_requerimento_atendimento){
      $sql = "DELETE FROM `requerimento_atendimento_cid` WHERE id_requerimento_atendimento = '$id_requerimento_atendimento'";
      $stm = Conexao::InstSDGC()->prepare($sql);
      $stm->execute();
    }
    public function inserirRAtendimentoCid($id_atendimento,$CID10,$ativo){
      $sql = "INSERT INTO requerimento_atendimento_cid(
                  id_requerimento_atendimento,
                  CID10,
                  HPP,
                  ativo,
                  dataHora
            )VALUES(
                  '$id_atendimento', 
                  '$CID10',
                  '$ativo',
                  '1', 
                  NOW()
            )";
              $stm = Conexao::InstSDGC()->prepare($sql);
              $stm->execute();
              return $sql;
      }
  public function atualizaRequerimentoHistorico ($obj){
    if($obj->id_requerimento_medico != ''){
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
      $tei = Conexao::InstSDGC()->lastInsertId();
      $stm->execute();
      return $sql;
  }
  //atualizar
  public function inserirNumeroDeProtocolo($obj){
    $sql = "UPDATE requerimento SET 
                    protocolo = '$obj->protocolo'
            WHERE 
                id = '$obj->id_requerimento' AND
                id_requerimento_status = '1'";
    $stm = Conexao::InstSDGC()->exec($sql);
    return $stm;
  }
  public function atualizarStatus($obj){
    $sql = "UPDATE requerimento SET 
                  id_requerimento_status = '$obj->id_requerimento_status'
            WHERE 
                id = '$obj->id_requerimento'";
    $stm = Conexao::InstSDGC()->exec($sql);
    return $stm;
  }
  public function cancelarAgendamento($obj){
    $sql = "UPDATE requerimento SET 
                  id_agenda = null
            WHERE 
                id = '$obj->id_requerimento'";
    $stm = Conexao::InstSDGC()->exec($sql);
    return $sql;
  }
  public function atualizarAgenda($obj){
    $sql = "UPDATE requerimento SET 
                  id_agenda = '$obj->id_agenda'
            WHERE 
                id = '$obj->id_requerimento'";
    $stm = Conexao::InstSDGC()->exec($sql);
    return $sql;
  }
  public function vagasOcupadas($id_agenda){
    $sql = "SELECT COUNT(id_agenda) as total FROM requerimento WHERE requerimento.id_agenda = '$id_agenda' GROUP BY id_agenda";
    return Conexao::InstSDGC()->prepare($sql);  
  }
  public function vagasDisponibilizadas($id_agenda){
    $sql = "SELECT numeroAtendimentos as total FROM agenda WHERE id = '$id_agenda'";
    return Conexao::InstSDGC()->prepare($sql);  
  }
  public function atualizarIdAgenda($obj){
    $sql = "UPDATE requerimento SET 
                  id_agenda = '$obj->id_agenda'
            WHERE 
                id = '$obj->id_requerimento'";
    $stm = Conexao::InstSDGC()->exec($sql);
    return $stm;
  }
  public function resumoAgendamento($id_requerimento){
    $sql = "SELECT 
                requerimento.protocolo,
                requerimento_status.nome as status,
                requerimento_solicitacao.item as solicitacao,
                agenda.periodo,
                agenda.start as data,
                info_pessoal.nome as medico
            FROM requerimento
                LEFT JOIN requerimento_status
                ON requerimento_status.id = requerimento.id_requerimento_status
                LEFT JOIN requerimento_solicitacao
                ON requerimento_solicitacao.id = requerimento.id_requerimento_solicitacao
                LEFT JOIN agenda
                ON agenda.id = requerimento.id_agenda
                LEFT JOIN info_pessoal
                ON info_pessoal.cpf = agenda.usuario
            WHERE
              requerimento.id = '$id_requerimento'
    ";
    return Conexao::InstSDGC()->prepare($sql);  
  }
  public function requerimentosStatusReAgenda(){
    $sql = "SELECT 
                requerimento_status.id,
                requerimento_status.nome
            FROM 
                requerimento_status
            WHERE
                ativo = '1' AND
                reAgenda = '1'

    ";
    return Conexao::InstSDGC()->prepare($sql); 
  }
  
}
?>

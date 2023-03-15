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
  public function listaRequerimentoIdInfo($id,$finalizado,$impresso){
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
              requerimento.impresso = '$impresso' AND
              requerimento.finalizado = '$finalizado' AND
              requerimento.id_info = '$id'";
    return $stm = Conexao::InstSDGC()->prepare($sql);
  }
  public function listaRequerimentoIdRequerimento($id,$finalizado,$impresso){
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
              requerimento.impresso = '$impresso' AND
              requerimento.finalizado = '$finalizado' AND
              requerimento.id = '$id'";
    return $stm = Conexao::InstSDGC()->prepare($sql);
  }
  public function listaRequerimentoIdInfoIdAgenda($id,$id_agenda,$finalizado,$impresso){
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
              requerimento.impresso = '$impresso' AND
              requerimento.impresso = '$impresso' AND
              requerimento.finalizado = '$finalizado' AND
              id_agenda = '$id_agenda' AND
              requerimento.id_info = '$id'";
    return $stm = Conexao::InstSDGC()->prepare($sql);
  }
  public function listaLocaldaPericia(){
    $sql = "SELECT * FROM requerimentoLocaisPericia";
    return $stm = Conexao::InstSDGC()->prepare($sql);
  }
  
  public function listaRequerimentoTiposExameFisicoAtivos(){
    $sql = "SELECT * FROM `requerimento_tipos_exame_fisico` WHERE ativo = '1'";
          return $stm = Conexao::InstSDGC()->prepare($sql);
  }
  public function listaRequerimentoTiposExameFisicoAtivosId($id){
    $sql = "SELECT * FROM `requerimento_tipos_exame_fisico` WHERE ativo = '1' AND id = '$id'";
      return $stm = Conexao::InstSDGC()->prepare($sql);
  }
  public function listaTiposResultadosPericiaMedica(){
    $sql = "SELECT
                rrpm.id,
                rrpm.nome,
                rrpm.descricao,
                rrpm.dias,
                rrpm.retorno,
                od.diasMim,
                od.diasMax
              FROM	
                  requerimento_tipos_resultados_pericia_medica as rrpm
                  LEFT JOIN ocorrencia_desc as od
                  ON od.id = rrpm.id_oco_desc
              WHERE
                 rrpm.ativo = 1";
          return $stm = Conexao::InstSDGC()->prepare($sql);
  }

  public function listaTiposResultadosPericiaMedicaId($id){
    $sql = "SELECT
                rrpm.id,
                rrpm.nome,
                rrpm.descricao,
                rrpm.dias,
                rrpm.retorno,
                od.diasMim,
                od.diasMax
              FROM	
                  requerimento_tipos_resultados_pericia_medica as rrpm
                  LEFT JOIN ocorrencia_desc as od
                  ON od.id = rrpm.id_oco_desc
              WHERE
                 rrpm.ativo = '1' AND
                 rrpm.id = '$id'
                 ";
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
              (requerimento_status.id = '4' OR
              requerimento_status.id = '8')
    ";
    return $stm = Conexao::InstSDGC()->prepare($sql);
  }
  public function listaRequerimentoIdAgendaTodos($id){
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
              requerimento.id_agenda = '$id'
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

    public function buscarRAtendimentoExameFisico($idAtendimento){
      $sql = "SELECT
                  rtef.id,
                  rtef.nome,
                  raef.descricao
                FROM
                    requerimento_atendimento_exame_fisico as raef
                    LEFT JOIN requerimento_tipos_exame_fisico as rtef
                    ON raef.idTiposExameFisico = rtef.id
                WHERE 
                  raef.idAtendimento = '$idAtendimento'";
      return $stm = Conexao::InstSDGC()->prepare($sql);
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
  $login = $this->buscaLoginSDGC();
  $obj->userLogin = $login->id; 
  $sql = "UPDATE requerimento_atendimento SET
                          idLocaldoExame='$obj->idLocaldoExame',
                          dadosAtestadoCRM='$obj->dadosAtestadoCRM', 
                          dadosAtestadoNome='$obj->dadosAtestadoNome', 
                          dadosAtestadoDiasAfastamento='$obj->dadosAtestadoDiasAfastamento', 
                          resultadoPericiaHistorico='$obj->resultadoPericiaHistorico',
                          resultadoPericiaTipo='$obj->resultadoPericiaTipo', 
                          resultadoPericiaDias='$obj->resultadoPericiaDias',
                          resultadoPericiaPrimeiroDia='$obj->resultadoPericiaPrimeiroDia',
                          resultadoPericiaUltimoDia='$obj->resultadoPericiaUltimoDia',
                          observacao='$obj->observacao',
                          userLogin='$obj->userLogin',
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
                          idLocaldoExame,
                          dadosAtestadoCRM, 
                          dadosAtestadoNome, 
                          dadosAtestadoDiasAfastamento, 
                          resultadoPericiaHistorico, 
                          resultadoPericiaTipo, 
                          resultadoPericiaDias,
                          resultadoPericiaPrimeiroDia,
                          resultadoPericiaUltimoDia,
                          observacao,
                          userLogin,
                          dataHoraAtendimento,
                          ativo
                        )VALUES(
                          '$obj->id_requerimento', 
                          '$obj->idAgenda', 
                          '$obj->id_requerimento_medico',
                          '$obj->idLocaldoExame', 
                          '$obj->dadosAtestadoCRM', 
                          '$obj->dadosAtestadoNome', 
                          '$obj->dadosAtestadoDiasAfastamento', 
                          '$obj->resultadoPericiaHistorico', 
                          '$obj->resultadoPericiaTipo', 
                          '$obj->resultadoPericiaDias', 
                          '$obj->resultadoPericiaPrimeiroDia', 
                          '$obj->resultadoPericiaUltimoDia', 
                          '$obj->observacao', 
                          '$obj->userLogin',
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
    public function limparRAtendimentoExameFisico($id_requerimento_atendimento){
      $sql = "DELETE FROM `requerimento_atendimento_exame_fisico` WHERE idAtendimento = '$id_requerimento_atendimento'";
      $stm = Conexao::InstSDGC()->prepare($sql);
      $stm->execute();
    }
    public function inserirRAtendimentoExameFisico($idAtendimento,$idTiposExameFisico,$descricao){
      $sql = "INSERT INTO requerimento_atendimento_exame_fisico(
                  idAtendimento,
                  idTiposExameFisico,
                  descricao,
                  ativo,
                  dataHora
            )VALUES(
                  '$idAtendimento', 
                  '$idTiposExameFisico',
                  '$descricao',
                  '1', 
                  NOW()
            )";
              $stm = Conexao::InstSDGC()->prepare($sql);
              $stm->execute();
              return $sql;
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
  public function atualizarImpresso($obj){
    $sql = "UPDATE requerimento SET 
                  impresso = '$obj->impresso'
            WHERE 
                id = '$obj->id_requerimento'";
    $stm = Conexao::InstSDGC()->exec($sql);
    return $stm;
  }
  public function finalizaRAtendimento($obj){
    $sql = "UPDATE requerimento_atendimento SET 
                  finalizado = '1'
            WHERE 
                id = '$obj->id_requerimento_atendimento'";
    $stm = Conexao::InstSDGC()->exec($sql);
    return $stm;
  }
  public function finalizaRequerimento($obj){
    //Verifica se o Status Finaliza o requerimento
    $exec = $this->requerimentosStatusId($obj->id_requerimento_status);
    $exec->execute();
    $dados = $exec->fetchAll(PDO::FETCH_ASSOC);
    $finalizado = $dados[0]['finalizar'];
    //Executa a finalizacao de acordo com o status
      $sql = "UPDATE requerimento SET 
                    finalizado = '$finalizado'
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
  public function resumoAgendamentoAtendimento($id_requerimento){
    $sql = "SELECT 
                requerimento_atendimento.id as idRatendimento
            FROM requerimento
                LEFT JOIN requerimento_atendimento
                ON requerimento.id = requerimento_atendimento.idRequerimento
            WHERE
              requerimento_atendimento.idAgenda = requerimento.id_agenda AND
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
  public function requerimentosStatusId($id){
    $sql = "SELECT *
            FROM 
                requerimento_status
            WHERE
                id = '$id'
            LIMIT 1

    ";
    return Conexao::InstSDGC()->prepare($sql); 
  }
  
}
?>

<?php
require_once('Generica.php');
class Agenda extends Generica{
    public function ListaAgendamentosCPF($cpf){
        $sql = "SELECT
                    id,
                    title,
                    start, 
                    end,
                    backgroundColor,
                    borderColor,
                    allDay,
                    periodo
                FROM
                    agenda
                WHERE 
                    usuario	 = '$cpf' AND
                    ativo =  '1' AND
                    allDay = '1' AND
                    periodo != '' AND
                    start >= CURRENT_DATE()
                ORDER BY
                    start ASC
                ";
        return Conexao::InstSDGC()->prepare($sql);   
    }
    public function agendamentosMes($mes){
        $sql = "SELECT
                    id,
                    title,
                    start, 
                    end,
                    backgroundColor,
                    borderColor,
                    allDay
                FROM
                    agenda
                WHERE 
                    mes = '$mes' AND
                    ativo =  '1'
                ";
        return $exec = Conexao::Inst()->prepare($sql);
    }
    public function agendamentosMesStartEnd($start, $end, $usuario){
        $sql = "SELECT
                    id,
                    title,
                    start, 
                    end,
                    backgroundColor,
                    borderColor,
                    allDay
                FROM
                    agenda
                WHERE 
                    start >= '$start' AND
                    end <= '$end' AND
                    usuario = '$usuario' AND
                    ativo =  '1'
                ";
        return $exec = Conexao::InstSDGC()->prepare($sql);
    }
    public function buscaEventoId($id){
        $sql = "SELECT * FROM agenda WHERE  id = '$id' ";
        $exec = Conexao::InstSDGC()->prepare($sql);
        $resp = new stdClass();
        $resp->exec = $exec;
        $resp->sql = $sql;
        return $resp;
    }
    public function insereEvento($dados){
        $d = (object) $dados;
        $sql = "INSERT INTO agenda(
                                    mes,
                                    title,
                                    start,
                                    end,
                                    backgroundColor, 
                                    borderColor, 
                                    allDay,
                                    usuario,
                                    ativo
                            )VALUES(
                                    '$d->mes',
                                    '$d->title',
                                    '$d->start',
                                    '$d->end',
                                    '$d->backgroundColor',
                                    '$d->borderColor',
                                    '$d->allDay',
                                    '$d->usuario',
                                    '1')";
                $stm = Conexao::InstSDGC()->prepare($sql);
                $stm->execute();
                return Conexao::InstSDGC()->lastInsertId();
    }
    public function redefinirEvento($dados){
        $d = (object) $dados;
        $sql = "UPDATE agenda SET 
                        mes= '$d->mes',
                        start= '$d->start',
                        end= '$d->end'
                    WHERE 
                        id='$d->id'";
                $stm = Conexao::InstSDGC()->prepare($sql);
                $stm->execute();
        return $sql;
    }
    public function removeEvento($id){
        $sql = "UPDATE agenda SET 
                        ativo = 0
                    WHERE 
                        id='$id'";
                $stm = Conexao::InstSDGC()->prepare($sql);
                $stm->execute();
    }

    public function AtualizaEvento($dados){
        $d = (object) $dados;
        $sql = "UPDATE agenda SET 
                        title= '$d->title',
                        start= '$d->start',
                        end= '$d->end',
                        backgroundColor= '$d->color',
                        borderColor= '$d->color',
                        allDay= '$d->allDay',
                        mes= '$d->mes',
                        usuario= '$d->usuario',
                        periodo= '$d->periodo',
                        numeroAtendimentos= '$d->numeroAtendimentos'
                    WHERE 
                        id='$d->id'";
                $stm = Conexao::InstSDGC()->prepare($sql);
                $stm->execute();
                return $sql;
    }
}
?>
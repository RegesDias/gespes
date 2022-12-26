<?php
require_once('Generica.php');
class Agenda extends Generica{
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
    public function agendamentosMesStartEnd($start, $end){
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
                    ativo =  '1'
                ";
        return $exec = Conexao::Inst()->prepare($sql);
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
                $stm = Conexao::Inst()->prepare($sql);
                $stm->execute();
                return Conexao::Inst()->lastInsertId();
    }
    public function redefinirEvento($dados){
        $d = (object) $dados;
        $sql = "UPDATE agenda SET 
                        mes= '$d->mes',
                        start= '$d->start',
                        end= '$d->end'
                    WHERE 
                        id='$d->id'";
                $stm = Conexao::Inst()->prepare($sql);
                $stm->execute();
        return $sql;
    }
    public function removeEvento($id){
        $sql = "UPDATE agenda SET 
                        ativo = 0
                    WHERE 
                        id='$id'";
                $stm = Conexao::Inst()->prepare($sql);
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
                        usuario= '$d->usuario'
                    WHERE 
                        id='$d->id'";
                $stm = Conexao::Inst()->prepare($sql);
                $stm->execute();
                return $sql;
    }
}
?>
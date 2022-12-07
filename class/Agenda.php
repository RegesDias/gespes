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
                                    usuario
                            )VALUES(
                                    '$d->mes',
                                    '$d->title',
                                    '$d->start',
                                    '$d->end',
                                    '$d->backgroundColor',
                                    '$d->borderColor',
                                    '$d->allDay',
                                    '$d->usuario')";
                $stm = Conexao::Inst()->prepare($sql);
                $stm->execute();
                return Conexao::Inst()->lastInsertId();
    }
    public function modificaEvento($dados){
        $sql = "UPDATE agenda SET 
                        mes= '$dados->mes',
                        start= '$dados->start',
                        end= '$dados->end'
                    WHERE 
                        id='$dados->id'";
                $stm = Conexao::Inst()->prepare($sql);
                $stm->execute();
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
                        mes= '$d->mes',
                        title= '$d->title',
                        start= '$d->start',
                        end= '$d->end',
                        backgroundColor= '$d->backgroundColor',
                        borderColor= '$d->borderColor',
                        allDay= '$d->allDay',
                        url= '$d->url',
                        usuario= '$d->usuario',
                    WHERE 
                        id='$d->id'";
                $stm = Conexao::Inst()->prepare($sql);
                $stm->execute();
    }
    public function atualizarEvento($id,$mes,$title,$start,$end,$color,$allDay,$url,$usuario){
        $sql = "UPDATE agenda SET
                                mes=$mes,
                                title=$title,
                                start=$start,
                                end=$end,
                                backgroundColor=$color,
                                borderColor=$color,
                                allDay=$allDay,
                                url=$url,
                                usuario=$usuario
                            WHERE 
                                id = '$id')";
                $stm = Conexao::Inst()->prepare($sql);
                 $stm->execute();
    }
}
?>
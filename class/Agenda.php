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
                    mes = '$mes'
                ";
        return $exec = Conexao::Inst()->prepare($sql);
    }

}
?>
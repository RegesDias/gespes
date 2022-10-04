<?php
require_once('Generica.php');
class Biometria extends Generica{
    public function marcacoes($cpf, $dataInicio, $dataFim){
        $sql = "SELECT data, hora, nomeEquipamento FROM
                    pontoMarcacoes 
                WHERE 
                    pontoMarcacoes.cpf = '$cpf' 
                    AND data 
                    BETWEEN '$dataInicio' AND '$dataFim'";
        return $exec = Conexao::InstBio()->prepare($sql);
    }

}
?>
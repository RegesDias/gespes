<?php
require_once('Generica.php');
class DocumentosStatus extends Generica{
    public function listar(){
        $sql = "SELECT * FROM
                    tb_status ";
        return $exec = Conexao::InstControle()->prepare($sql);
    }
}
?>
<?php
require_once('Generica.php');
class BiometriaExterno extends Generica{
    public function grupoRepExterno($cpf){
        $sql = "SELECT 
                    gr.ds_grupo_rep, 
                    gr.id_grupo_rep,
                    p.nm_pessoa
                FROM 
                    gruporep AS gr,
                    com_pessoa_grupo_rep AS pgr,
                    gen_pessoa AS p
                WHERE
                    p.nr_cpf_pessoa = '$cpf' AND 
                    pgr.id_pessoa = p.id_pessoa AND pgr.id_grupo_rep = gr.id_grupo_rep";
        return $exec = Conexao::InstBioExt()->prepare($sql);
    }
    public function marcacoesExterno($cpf, $dataInicio, $dataFim){
        $sql = "SELECT dt_registro, eqpt FROM
                    public.pto_pessoa 
                WHERE 
                    public.pto_pessoa.cpf = '$cpf' 
                    AND dt_registro 
                    BETWEEN '$dataInicio' AND '$dataFim'";

        return $exec = Conexao::InstBioExt()->prepare($sql);
    }

}
?>
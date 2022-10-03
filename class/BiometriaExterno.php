<?php
require_once('Generica.php');
class BiometriaExterno extends Generica{
    public function buscaGrupoRepPorCPF($cpf){
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
        $exec = Conexao::InstBio()->prepare($sql);
        return $exec;
    }

}
?>
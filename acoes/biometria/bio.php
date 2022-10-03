<?php




    //=====================
    //PEGA PONTO DO SDGC
    //=====================

    //$dados = array($_SESSION["funcionalBusca"]['pessoa']['cpf'], $respGet['dataInicio'], $respGet['dataFim']);
   // $ponto = getRest('ponto/getServidorPontoMarcacao', $dados);

   header('Content-Type: application/json');
   require_once '../../class/Generica.php';
   $g = new Generica;
   $cpf = $g->setDado($_GET['cpf']);
   $dataInicio = $g->setDado($_GET['dataInicio']." 00:00:00");
   $dataFim = $g->setDado($_GET['dataFim']." 23:59:59");
   $sql = "SELECT dt_registro, eqpt FROM
                        public.pto_pessoa 
                    WHERE 
                        public.pto_pessoa.cpf = '$cpf' 
                        AND dt_registro 
                        BETWEEN '$dataInicio' AND '$dataFim'";
   
   $exec = Conexao::InstBio()->prepare($sql);
   //if(Conexao::verificaLogin('consultaPessoal')){
        $exec->execute();
       if ($exec->rowCount() >= 1) {
           $g->gravaLog('Verificar Marcacoes!');
           echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
       } else {
           echo json_encode('Nenhum servidor encontrado');
       }
   //}
?>


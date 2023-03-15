//###############################Funções###########################################
function getPessoalCodigo() {
    $('#carregando').show();
    $.ajax({
        url: 'acoes/servidor/listarCodigo.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        var total = result.length+1;
        $('#listaPessoal').attr("size", total);
        $('#listaPessoalNome').attr("size", total);
        msn('success','Servidores ordenados por codigo!');
        preenchimentoSelect(result);
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
};
function getPessoalNome() {
    $('#carregando').show();
    $.ajax({
        url: 'acoes/servidor/listarNome.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        var size = result.length+2;
        $('#listaPessoal').attr("size", size);
        $('#listaPessoalNome').attr("size", size);
        msn('success','Servidores ordenados por nome!');
        preenchimentoSelect(result);
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
};
function getPessoalMatriculaCpfNome(dado,order){
    $('#carregando').show();
    $.ajax({
        url: 'acoes/servidor/buscaMatriculaCpfNome.php?dado='+dado+'&order='+order,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        if (result.codigo==0){
            msn('error',result.mensagem);
        }else{
            var size = result.exec.length+1;
            msn('success',result.mensagem);
            $("#listaPessoal").empty();
            $("#listaPessoalNome").empty();
            $('#listaPessoal').attr("size", size);
            $('#listaPessoalNome').attr("size", size);
            preenchimentoSelect(result.exec);
        }
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
};
function getPessoaDadosFuncionais(codfunc){
    $('#carregando').show();
    $.ajax({
        url: 'acoes/servidor/buscarCodFunc.php?codfunc='+codfunc,
        method: 'GET',
        dataType: 'json'
    }).done(function(dadosPessoal){
        $('#gestaoClick').trigger('click');
        $('#imgFoto').attr('src', 'https://www.sdgc.com.br/sdgc/img/fotos/'+dadosPessoal[0].cpfs+'.bmp');
        $('#pessoalNome').val(dadosPessoal[0].nome);
        $('#pessoalNomeFoto').html(primeiroUltimoNome(dadosPessoal[0].nome));
        $('#pessoalCodFunc').val(dadosPessoal[0].codfunc);
        $('#pessoalCpfs').val(dadosPessoal[0].cpfs);
        $('#pessoalDataAdmis').val(converteDataBr(dadosPessoal[0].dataadmis));
        $('#pessoalNomeCarg').val(dadosPessoal[0].nome_carg);
        $('#pessoalPrefixos').val(dadosPessoal[0].prefixos);
        $('#pessoalSecoes').val(dadosPessoal[0].secoes);
        $('#pessoalSecretarias').val(dadosPessoal[0].secretarias);
        $('#pessoalRegime').val(dadosPessoal[0].regime);
        $('#idInfo').val(dadosPessoal[0].idInfo);
        $('#idHistFunc').val(dadosPessoal[0].idHistFunc);
        let atendimentoSesmit = dadosPessoal[0].atendimentoSesmit;
        $('#modal-pessoal').modal('show');
        console.log(dadosPessoal[0]);

        if(atendimentoSesmit == '1'){
            $('#atendimentoBloqueado').addClass('d-none');
            $('#atendimentoLiberado').removeClass('d-none');
        }else{
            $('#atendimentoBloqueado').removeClass('d-none');
            $('#atendimentoLiberado').addClass('d-none');
        }
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
};
function preenchimentoSelect(result){
    for (var i = 0; i < result.length; i++) {
        $( '#barraCarregamento' ).css( "width", (100*i)/result.length+"%");
        $('#listaPessoal').prepend('<option value='+ result[i].codfunc +'> '+result[i].codfunc+'</option>');
        $('#listaPessoalNome').prepend('<option value='+ result[i].codfunc +'> '+result[i].nome+'</option>');    }
    $( '#barraCarregamento' ).css( "width", "100%");
    setTimeout(() => { $( '#barraCarregamento' ).css( "width", "0%"); }, 2000);
    if(result.length == 1){
        setTimeout(() => { getPessoaDadosFuncionais(result[0].codfunc); }, 1000);
    }
};
function fechaTodosModais(){
    $('#modal-data').modal('hide');
    $('#modal-pessoal').modal('hide');
    $('#modal-ponto').modal('hide');
}

//###############################Ações###########################################

$("#btnLimpar").on("click", function() {
    getPessoalNome();
    $('#textMatriculaCpfNome').val('');
    $('#textMatriculaCpfNomeOrder').val('');
});

$("#visualizarServidor").on("click", function() {
    var codfunc =  $('#listaPessoal option:selected').val();
    $('#listaSolicitacoesCadastradas').html("");
    $('#listaSolicitacoesHomologadas').html("");
    getPessoaDadosFuncionais(codfunc);
});

$('#btnMatriculaCpfNome').on("click", function(){
    var dado = $('#textMatriculaCpfNome').val();
    $('#textMatriculaCpfNomeOrder').val(dado);
    getPessoalMatriculaCpfNome(dado,'');
    $('#visualizarServidor').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});
$("#textMatriculaCpfNome").keypress(function(event) {
    if (event.keyCode === 13) {
        $("#btnMatriculaCpfNome").click();
    }
    if (event.keyCode === 32) {
        fechaTodosModais();
    }

});
$('#textMatriculaCpfNome').keyup(function(){
    $('#btnMatriculaCpfNome').removeAttr('disabled');
    $('#visualizarServidor').attr("disabled","disabled");
});
$('#optionPessoalCodigo').on("click", function(){
    var dado = $('#textMatriculaCpfNomeOrder').val();
    if(dado){
        getPessoalMatriculaCpfNome(dado, 'matricula');
    }else{
        getPessoalCodigo();
    }
    $('#visualizarServidor').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});
$('#optionPessoalNome').on("click", function(){
    var dado = $('#textMatriculaCpfNomeOrder').val();
    if(dado){
        getPessoalMatriculaCpfNome(dado, 'nome');
    }else{
        getPessoalNome();
    }
    $('#visualizarServidor').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});
$('#listaPessoal').click(function(){
    $('#visualizarServidor').removeAttr('disabled');
    $('#btnMatriculaCpfNome').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});
$('#listaPessoalNome').click(function(){
    $('#visualizarServidor').removeAttr('disabled');
    $('#btnMatriculaCpfNome').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');

});
$('#fichaFuncional').click(function(){
    idInfo = $('#idInfo').val();
    link = 'relatorio/getRelHistoricoFuncional';
    $('#carregandoModal').show();
    $('#print-iframe').attr('src', 'acoes/print.php?0='+idInfo+'&link='+link+'&acesso=relatFichaFuncional');
    $('#print-iframe').attr('src', $('#print-iframe').attr('src'));

    setTimeout(() => { $("#print-iframe").get(0).contentWindow.print() }, 2000);
    setTimeout(() => { $('#carregandoModal').hide() }, 2000);
});

$('#atribuicaoDeCargo').click(function(){
    idHistFunc = $('#idHistFunc').val();
    link = 'relatorio/getRelAtribuicoesCargoPorFuncional';
    $('#carregandoModal').show();
    $('#print-iframe').attr('src', 'acoes/print.php?0='+idHistFunc+'&link='+link+'&acesso=relatAtribuicoesCargo');
    $('#print-iframe').attr('src', $('#print-iframe').attr('src'));

    setTimeout(() => { $("#print-iframe").get(0).contentWindow.print() }, 2000);
    setTimeout(() => { $('#carregandoModal').hide() }, 2000);
});

$('#contraChequeImprimir').click(function(){
    $('#modal-data').modal('hide');
    pessoalCodFunc = $('#pessoalCodFunc').val();
    mesAno = $('#mesAno').val();
    if (!mesAno){
        msn('error','Preencha o campo data');
    }else{
        link = 'relatorio/getRelContraCheque';
        $('#carregandoModal').show();
        $('#print-iframe').attr('src', 'acoes/print.php?0='+pessoalCodFunc+'&1='+mesAno+'-01&link='+link+'&acesso=relatContraCheque');
        $('#print-iframe').attr('src', $('#print-iframe').attr('src'));

        setTimeout(() => { $("#print-iframe").get(0).contentWindow.print() }, 2000);
        setTimeout(() => { $('#carregandoModal').hide() }, 2000);
    }
});
$('#folhaDePontoImprimir').click(function(){
    $('#modal-ponto').modal('hide');
    pessoalCodFunc = $('#pessoalCodFunc').val();
    mesAnoInicial = $('#mesAnoInicial').val();
    mesAnoFinal = $('#mesAnoFinal').val();
    if (!mesAnoInicial){
        msn('error','Preencha o campo data inicial');
    }else{
        if (!mesAnoFinal){
            msn('error','Preencha o campo data final');
        }else{
            link = 'relatorio/getRelMarcacaoServidorEmLote';
            $('#carregandoModal').show();
            $('#print-iframe').attr('src', 'acoes/print.php?0='+mesAnoInicial+'&1='+mesAnoFinal+'&2='+pessoalCodFunc+'&link='+link+'&acesso=relatFolhaPonto');
            $('#print-iframe').attr('src', $('#print-iframe').attr('src'));

            setTimeout(() => { $("#print-iframe").get(0).contentWindow.print() }, 2000);
            setTimeout(() => { $('#carregandoModal').hide() }, 2000);
        }
    }
});

$('#folhaDePonto').click(function(){
    $('#modal-ponto').modal('show');
});
$('#contraCheque').click(function(){
    $('#modal-data').modal('show');
});
$('#fechaModalData').click(function(){
    $('#modal-data').modal('hide');
});
$('#fechaModalPonto').click(function(){
    $('#modal-ponto').modal('hide');
});
$('#fechaModalPessoal').click(function(){
    fechaTodosModais();
});


$(document).ready(function(){
    $('#carregandoModal').hide();
    getPessoalNome();
    var login = JSON.parse(sessionStorage.getItem('login'));
    if(login.relatFichaFuncional == 0){
        $('#fichaFuncional').hide();
    }
    if(login.relatAtribuicoesCargo == 0){
        $('#atribuicaoDeCargo').hide();
    }
    if(login.relatFolhaPonto == 0){
        $('#folhaDePonto').hide();
    }
    if(login.relatContraCheque == 0){
        $('#contraCheque').hide();
    }
    if(login.relatContraCheque == 0){
        $('#contraCheque').hide();
    }
    if(login.atendimentoAgenda == 0){
        $('#atendimentoBtn').hide();
    }
});
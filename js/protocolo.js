//###############################Funções###########################################
function formFiltroStatus(){
    $.ajax({
        url: 'acoes/documentosStatus/listar.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        preenchimentoSelectStatus(result);
    }).fail(function() {
       //$(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
}
function formFiltroAno(){
    $.ajax({
        url: 'acoes/documentos/buscaAnos.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        preenchimentoSelectAno(result);
    }).fail(function() {
       //$(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
}
function formFiltroTipo(){
    $.ajax({
        url: 'acoes/documentosTipo/listar.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        preenchimentoSelectTipo(result);
    }).fail(function() {
       //$(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });

}
function getProtocoloOrigem() {
    $('#carregando').show();
    $.ajax({
        url: 'acoes/documentos/listarOrigem.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        var size = result.length+2;
        $('#listaPessoal').attr("size", size);
        $('#listaPessoalNome').attr("size", size);
        if(result.length == 0){
            msn('success','Caixa de entrada está vazia');
        }else{
            msn('success','Ordenado por Origem!');
            preenchimentoSelect(result);
        }
    }).fail(function() {
       $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function getProtocoloNumero() {
    $('#carregando').show();
    $.ajax({
        url: 'acoes/documentos/listarNumero.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        var size = result.length+2;
        $('#listaPessoal').attr("size", size);
        $('#listaPessoalNome').attr("size", size);
        if(result.length == 0){
            msn('success','Caixa de entrada está vazia');
        }else{
            msn('success','Ordenado por número!');
            preenchimentoSelect(result);
        }
    }).fail(function() {
        $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function getDocumentoNumeroAno(dado,order){
    $('#carregando').show();
    $.ajax({
        url: 'acoes/documentos/buscaNumeroAnoStatus.php?dado='+dado+'&order='+order,
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
        $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function getDocumentoAnoTipoStatusLocal(data){
    $.ajax({
        type : 'GET',
        url  : 'acoes/documentos/buscaNumeroAnoStatus.php',
        data : data,
        dataType: 'json',
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
                //$(location).attr('href', 'index.html');
            }).always(function() {
                $('#carregando').hide();
            });
};
/*
function getDocumentoAnoTipoStatusLocal(ano,tipo,status,local,order){
    $('#carregando').show();
    $.ajax({
        url: 'acoes/documentos/buscaNumeroAnoStatus.php?ano='+ano+'tipo='+tipo+'&status='+status+'&local='+local+'&order='+order,
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
        $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
*/
function getPessoaDadosFuncionais(codfunc){
    $('#carregando').show();
    $.ajax({
        url: 'acoes/servidor/buscarCodFunc.php?codfunc='+codfunc,
        method: 'GET',
        dataType: 'json'
    }).done(function(dadosPessoal){
        $('#imgFoto').attr('src', 'http://10.40.10.233/sdgc/img/fotos/'+dadosPessoal[0].cpfs+'.bmp');
        $('#pessoalNome').val(dadosPessoal[0].nome);
        $('#pessoalCodFunc').val(dadosPessoal[0].codfunc);
        $('#pessoalCpfs').val(dadosPessoal[0].cpfs);
        $('#pessoalDataAdmis').val(converteDataBr(dadosPessoal[0].dataadmis));
        $('#pessoalNomeCarg').val(dadosPessoal[0].nome_carg);
        $('#pessoalPrefixos').val(dadosPessoal[0].prefixos);
        $('#pessoalSecoes').val(dadosPessoal[0].secoes);
        $('#pessoalSecretarias').val(dadosPessoal[0].secretarias);
        $('#idInfo').val(dadosPessoal[0].idInfo);
        $('#idHistFunc').val(dadosPessoal[0].idHistFunc);
        $('#modal-pessoal').modal('show');
    }).fail(function() {
        $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function getListaSetoresAtivos() {
    $('#carregando').show();
    $.ajax({
        url: 'acoes/usuario/listarSetoresAtivos.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        var size = result.length+1;
        preenchimentoSelectSetor(result);
    }).fail(function() {
        $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function preenchimentoSelect(result){
    for (var i = 0; i < result.length; i++) {
        numeroDocumento = addZero(result[i].numero_documento, 6);
        if (result[i].origem == ''){
            origem = 'NÃO INFORMADO';
        }else{
            origem = result[i].origem.substr(0,70);
        }
        $('#listaPessoal').prepend('<option value='+ result[i].id +'> '+numeroDocumento+'/'+result[i].ano_documento+'</option>');
        $('#listaPessoalNome').prepend('<option value='+ result[i].id +'> '+origem+'</option>');    }
    $( '#barraCarregamento' ).css( "width", "100%");
    setTimeout(() => { $( '#barraCarregamento' ).css( "width", "0%"); }, 2000);
    if(result.length == 1){
        //setTimeout(() => { getPessoaDadosFuncionais(result[0].codfunc); }, 1000);
    }
};

function preenchimentoSelectStatus(result){
    for (var i = 0; i < result.length; i++) {
        $('#formFiltroSelectStatus').prepend('<option value='+ result[i].id +'> '+result[i].nome+'</option>');    
    }
    $('#formFiltroSelectStatus').val(1).change()
};
function preenchimentoSelectAno(result){
    for (var i = 0; i < result.length; i++) {
        $('#formFiltroSelectAno').prepend('<option value='+ result[i].ano_documento +'> '+result[i].ano_documento+'</option>');    
    }
};
function preenchimentoSelectTipo(result){
    for (var i = 0; i < result.length; i++) {
        $('#formFiltroSelectTipo').prepend('<option value='+ result[i].id +'> '+result[i].nome+'</option>');    
    }
};
function preenchimentoSelectSetor(result){
    for (var i = 0; i < result.length; i++) {
        $('#formFiltroSelectSetor').prepend('<option value='+result[i].id+'>'+result[i].nome+'</option>');
    }
    var login = JSON.parse(sessionStorage.getItem('login'));
    $('#formFiltroSelectSetor').val(login.idSetor).change()
};
function fechaTodosModais(){
    $('#modal-data').modal('hide');
    $('#modal-pessoal').modal('hide');
    $('#modal-pesspontooal').modal('hide');
}

//###############################Ações###########################################

$("#btnLimpar").on("click", function() {
    getProtocoloNumero();
    $('#textMatriculaCpfNome').val('');
    $('#textMatriculaCpfNomeOrder').val('');
});
$('#formFiltroBtn').on("click", function(){
    let anoVal = $('#formFiltroSelectAno option:selected').val();
    let tipoVal = $('#formFiltroSelectTipo option:selected').val();
    let statusVal = $('#formFiltroSelectStatus option:selected').val();
    let idSetorVal = $('#formFiltroSelectSetor option:selected').val();
    var data = {
        ano:anoVal,
        tipo:tipoVal, 
        status:statusVal, 
        idSetor:idSetorVal
    }
    console.log(data);
    getDocumentoAnoTipoStatusLocal(data);
    
//salvarAlteracoesUsuario(data);
});
$("#visualizarServidor").on("click", function() {
    var codfunc =  $('#listaPessoal option:selected').val();
    getPessoaDadosFuncionais(codfunc);
});

$('#btnMatriculaCpfNome').on("click", function(){
    var dado = $('#textMatriculaCpfNome').val();
    $('#textMatriculaCpfNomeOrder').val(dado);
    getDocumentoNumeroAno(dado,'');
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
        getDocumentoNumeroAno(dado, 'matricula');
    }else{
        getProtocoloNumero();
    }
    $('#visualizarServidor').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});
$('#optionPessoalNome').on("click", function(){
    var dado = $('#textMatriculaCpfNomeOrder').val();
    if(dado){
        getDocumentoNumeroAno(dado, 'nome');
    }else{
        getProtocoloOrigem();
    }
    $('#visualizarServidor').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});
$('#listaPessoal').change(function(){
    $('#visualizarServidor').removeAttr('disabled');
    $('#btnMatriculaCpfNome').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});
$('#listaPessoalNome').change(function(){
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
    formFiltroAno();
    formFiltroTipo();
    formFiltroStatus();
    getProtocoloNumero();
    getListaSetoresAtivos();
    carregarSelect2();

});
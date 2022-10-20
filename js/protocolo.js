//###############################Funções###########################################
function formFiltroStatus(){
    $.ajax({
        url: 'acoes/documentosStatus/listar.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        preenchimentoSelectStatus(result);
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
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
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
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
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });

}
function getDocumentoNumeroAno(dado,order){
    $('#carregando').show();
    $.ajax({
        url: 'acoes/documentos/buscaNumeroAnoStatus.php?dado='+dado+'&order='+order,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        if (result.codigo==0){
            msn('error',result.mensagem);
            $('#listaPessoal').attr("size", 2);
            $('#listaPessoalNome').attr("size", 2);
        }else{
            var size = result.exec.length+1;
            if (result.codigo!=2){
                msn('success',result.mensagem);
            }
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
function getDocumentoMovimentacaoId(id,order){
    $.ajax({
        url: 'acoes/documentos/movimentacao.php?id='+id+'&order='+order,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        if (result.codigo==0){
            msn('error',result.mensagem);
        }else{
            var size = result.length+1;
            $("#listaResponsavel").empty();
            $("#listaDataEntrega").empty();
            $('#listaResponsavel').attr("size", size);
            $('#listaDataEntrega').attr("size", size);
            preenchimentoSelectMovimentacao(result);
        }
    }).fail(function() {
        $('#listaResponsavel').attr("size", '2');
        $('#listaDataEntrega').attr("size", '2');
    }).always(function() {
    });
};
function getDocumentoObservacaoIdDocumento(id,order){
    $.ajax({
        url: 'acoes/documentos/observacao.php?id='+id+'&order='+order,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        if (result.codigo==0){
            msn('error',result.mensagem);
        }else{
            var size = result.length+1;
            $("#listaObservacaoData").empty();
            $("#listaObservacao").empty();
            $('#listaObservacaoData').attr("size", size);
            $('#listaObservacao').attr("size", size);
            preenchimentoSelectObservacao(result);
        }
    }).fail(function() {
        $('#listaObservacaoData').attr("size", 2);
        $('#listaObservacao').attr("size", 2);
    }).always(function() {
    });
};
function geMovimentacaoId(id){
    $.ajax({
        url: 'acoes/documentos/movimentacaoDetalhamento.php?id='+id,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        if (result.codigo==0){
            msn('error',result.mensagem);
        }else{  
            $('#detalhamentoModalTitulo').html('Detalhe da Movimentação');
            $('#detalhamentoModalLabel1').html('Encaminhado Por:');
            $('#detalhamentoModalLabel2').html('Dados do encaminhamento');
            $('#verEncaminhamento').val(result[0].encaminhamento);
            $('#verEncaminhado').val(result[0].encaminhado);
        }
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
    });
};
function geObservacaoId(id){
    $.ajax({
        url: 'acoes/documentos/observacaoDetalhamento.php?id='+id,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        if (result.codigo==0){
            msn('error',result.mensagem);
        }else{
            $('#detalhamentoModalTitulo').html('Detalhe das Observações');
            $('#detalhamentoModalLabel1').html('Inserido Por:');
            $('#detalhamentoModalLabel2').html('Descrição:');
            $('#verEncaminhamento').val(result[0].observacao);
            $('#verEncaminhado').val(result[0].nome);
        }
    }).fail(function() {
        msn('error','Sua sessão expirou');
        //setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
    });
};
function getDocumentoAnoTipoStatusLocal(data, order){
    $('#carregando').show();
    $.ajax({
        type : 'GET',
        url  : 'acoes/documentos/buscaNumeroAnoStatus.php?order='+order,
        data : data,
        dataType: 'json',
        }).done(function(result){				
            if (result.codigo==0){
                msn('error',result.mensagem);
                $("#listaPessoal").empty();
                $("#listaPessoalNome").empty();
                $('#listaPessoal').attr("size", 2);
                $('#listaPessoalNome').attr("size", 2);
            }else{
                var size = result.exec.length+1;
                if (result.codigo==1){
                    msn('success',result.mensagem);
                }
                $("#listaPessoal").empty();
                $("#listaPessoalNome").empty();
                $('#listaPessoal').attr("size", size);
                $('#listaPessoalNome').attr("size", size);
                $("#totalEncontrados").html(result.total);
                var label = geraLabel(result.grafico);
                var data = geraData(result.grafico);
                //var nome = geraNome(result.grafico);
                geraGraficoArea(label,data,result.tipo);
                preenchimentoSelect(result.exec);
            }
            }).fail(function() {
                msn('error','Sua sessão expirou');
               // setTimeout(() => {  window.location.href = "index.html" }, 1000);
            }).always(function() {
                $('#carregando').hide();
            });
};
function getDocumentoId(codfunc){
    $('#carregando').show();
    $.ajax({
        url: 'acoes/documentos/buscaId.php?id='+codfunc,
        method: 'GET',
        dataType: 'json'
    }).done(function(documento){
        $('#ano_documento').val(documento[0].ano_documento);
        $('#numero_documento').val(documento[0].numero_documento+'/'+documento[0].ano_documento);
        $('#assunto').val(documento[0].assunto);
        $('#origem').val(documento[0].origem);
        $('#data_inclusao').val(converteDataBr(documento[0].data_inclusao));
        $('#status').val(documento[0].status);
        $('#resposavel').val(documento[0].resposavel);
        $('#tipo').val(documento[0].tipo);
        $('#data_entrada').val(converteDataBr(documento[0].data_entrada));
        $('#idDocumento').val(documento[0].id);
        $('#idMovimentacao').val(documento[0].idMovimentacao);
        var login = JSON.parse(sessionStorage.getItem('login'));
        if(documento[0].setor_id != login.idSetor){
            $('#movimentarDocumento').addClass('d-none');
            $('#criarObservacao').addClass('d-none');
        }else{
            $('#movimentarDocumento').removeClass('d-none');
            $('#criarObservacao').removeClass('d-none');

        }
        if (documento[0].idStatus == 2){
            $('#movimentarDocumento').addClass('d-none');
            $('#criarObservacao').addClass('d-none');
            $('#status').addClass('is-invalid');
            $('#arquivarDocumento').addClass('d-none');
            $('#desarquivarDocumento').removeClass('d-none');
            
        }
        if (documento[0].idStatus == 1){
            $('#status').removeClass('is-invalid');
            $('#status').addClass('is-valid');
            $('#arquivarDocumento').removeClass('d-none');
            $('#desarquivarDocumento').addClass('d-none');
        }
        $('#modal-pessoal').modal('show');
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
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
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
};
function getListaSecretarias() {
    $('#carregando').show();
    $.ajax({
        url: 'acoes/secretaria/listar.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        var size = result.length+1;
        preenchimentoAutoCompleteSecretaria(result);
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
};
function getUsuarioIdSetor(dado){
    $('#carregando').show();
    $.ajax({
        url: 'acoes/usuario/listarIdSetor.php?dado='+dado,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        if (result.codigo==0){
            msn('error',result.mensagem);
        }else{
            preenchimentoSelectUsuarioIdSetor(result);
        }
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
};
function preenchimentoSelectUsuarioIdSetor(result){
    $("#encaminharResponsavel").empty();
    for (var i = 0; i < result.length; i++) {
        $('#encaminharResponsavel').prepend('<option value='+ result[i].id +'> '+result[i].nome+'</option>');    
    }
};
function getUsuarios(){
    $.ajax({
        url: 'acoes/usuario/listarNome.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        if (result.codigo==0){
            msn('error',result.mensagem);
        }else{
            preenchimentoSelectUsuario(result);
        }
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
};
function preenchimentoSelectUsuario(result){
    $("#encaminharResponsavel").empty();
    for (var i = 0; i < result.length; i++) {
        $('#formFiltroSelectUsuario').prepend('<option value='+ result[i].id +'> '+result[i].nome+'</option>');    
    }
};
function preenchimentoSelect(result){
    for (var i = 0; i < result.length; i++) {
        numeroDocumento = addZero(result[i].numero_documento, 6);
        if (result[i].assunto == ''){
            origem = '*NÃO INFORMADO';
        }else{
            origem = result[i].assunto.substr(0,70);
        }
        $('#listaPessoal').prepend('<option value='+ result[i].id +'> '+result[i].sigla+'-'+numeroDocumento+'/'+result[i].ano_documento+'</option>');
        $('#listaPessoalNome').prepend('<option value='+ result[i].id+'> '+origem+'</option>');   
    }
    $( '#barraCarregamento' ).css( "width", "100%");
    setTimeout(() => { $( '#barraCarregamento' ).css( "width", "0%"); }, 2000);
    if(result.length == 1){
        $('#visualizarDocumento').prop('disabled', true);
        $('#visualizarObservacao').prop('disabled', true);
        var login = JSON.parse(sessionStorage.getItem('login'));
        if((result[0].data_recebido === 'null')&&(result[0].setor_id[1]  == login.idSetor)){
            setTimeout(() => { getDocumentoId(result[0].id); }, 1000);
        }
    }
};


$("#visualizarServidor").on("click", function() {
    var codfunc =  $('#listaPessoal option:selected').val();
    $('#documentoClick').trigger('click');
    var acao = $('#visualizarServidorTipoAcao').val();
    if(acao == 'visualizar'){
        getDocumentoId(codfunc);
    }else{
        $('#visualizarServidor').html('<i class="nav-icon fas fa-search"></i> Visualizar');
        $('#visualizarServidorTipoAcao').val('visualizar');
        getRecebeDocumento(acao);
    }
});
function getRecebeDocumento(dado){
    $('#carregando').show();
    $.ajax({
        url: 'acoes/documentos/recebe.php?dado='+dado,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        if (result.codigo==0){
            msn('error',result.mensagem);
        }else{
            msn('success',result.mensagem);
            data = carregaDadosFiltro();
            getDocumentoAnoTipoStatusLocal(data, 'NAO');
        }
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
};

$("#criarObservacao").on("click", function() {
    $('#modal-observacao').modal('show');
    $('#observacaoTexto').removeAttr('disabled');
    $('#observacaoTexto').val('');
});
$('#fechaModalObservacao').click(function(){
    $('#modal-observacao').modal('hide');
});
$('#salvarObservacao').click(function(){
    idDocumento = $('#idDocumento').val();
    observacaoTexto = $('#observacaoTexto').val();
    var data = {
        documento_id:idDocumento,
        observacao:observacaoTexto
    }
    salvarObservacaoDocumento(data);
    setTimeout(() => { getDocumentoObservacaoIdDocumento(idDocumento, '')},1000);
});
function salvarObservacaoDocumento(data) {
    $.ajax({
        url: 'acoes/documentos/escreverObservacao.php',
        method: 'GET',
        data: data, 
        dataType: 'json'
    }).done(function(data){
        $('#modal-observacao').modal('hide');
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
    });
};

function arquivarDocumento(data) {
    $.ajax({
        url: 'acoes/documentos/arquivar.php',
        method: 'GET',
        data: data, 
        dataType: 'json'
    }).done(function(result){
        getDocumentoId(data.idDocumento);
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
    });
};
$("#arquivarDocumento").on("click", function() {
    vidDocumento = $('#idDocumento').val();
    vidMovimentacao = $('#idMovimentacao').val();
    var data = {
        idDocumento:vidDocumento,
        idMovimentacao:vidMovimentacao
    }
    arquivarDocumento(data);
    setTimeout(() => { getDocumentoMovimentacaoId(vidDocumento, '')},1000);
    
});
function desarquivarDocumento(data) {
    $.ajax({
        url: 'acoes/documentos/desarquivar.php',
        method: 'GET',
        data: data, 
        dataType: 'json'
    }).done(function(result){
        getDocumentoId(data.idDocumento);
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
    });
};
$("#desarquivarDocumento").on("click", function() {
    vidDocumento = $('#idDocumento').val();
    vidMovimentacao = $('#idMovimentacao').val();
    var data = {
        idDocumento:vidDocumento,
        idMovimentacao:vidMovimentacao
    }
    desarquivarDocumento(data);
    setTimeout(() => { getDocumentoMovimentacaoId(vidDocumento,'')},1000);
    
});
function preenchimentoSelectObservacao(result){
    for (var i = 0; i < result.length; i++) {
        $('#listaObservacao').prepend('<option value='+ result[i].id +'> '+result[i].observacao.substr(0,70)+'</option>');
        $('#listaObservacaoData').prepend('<option value='+ result[i].id +'> '+converteDataBr(result[i].data_cadastro)+'</option>');    }
    $( '#barraCarregamento' ).css( "width", "100%");
    setTimeout(() => { $( '#barraCarregamento' ).css( "width", "0%"); }, 2000);
};
function preenchimentoSelectMovimentacao(result){
    for (var i = 0; i < result.length; i++) {
        $('#listaResponsavel').prepend('<option value='+ result[i].id +'> '+result[i].responsavel+'</option>');
        $('#listaDataEntrega').prepend('<option value='+ result[i].id +'> '+converteDataBr(result[i].data_entrada)+'</option>');    }
    $( '#barraCarregamento' ).css( "width", "100%");
    setTimeout(() => { $( '#barraCarregamento' ).css( "width", "0%"); }, 2000);
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
        $('#movimentacoesSetor').prepend('<option value='+result[i].id+'>'+result[i].nome+'</option>');
    }
    var login = JSON.parse(sessionStorage.getItem('login'));
    $('#formFiltroSelectSetor').val(login.idSetor).change()
};
function preenchimentoAutoCompleteSecretaria(result){
    var keys = [];
    for (var i = 0; i < result.length; i++) {
        keys.push(result[i].nome_lotacao);
    }
    autocompleteEncaminharDestino(keys);
};

function fechaTodosModais(){
    $('#modal-data').modal('hide');
    $('#modal-pessoal').modal('hide');
    $('#modal-ponto').modal('hide');
    $('#modal-movimentar').modal('hide');
    $('#modal-observacao').modal('hide');

}
function carregaDadosFiltro(){
    let anoVal = $('#formFiltroSelectAno option:selected').val();
    let tipoVal = $('#formFiltroSelectTipo option:selected').val();
    let statusVal = $('#formFiltroSelectStatus option:selected').val();
    let idSetorVal = $('#formFiltroSelectSetor option:selected').val();
    let idUsuarioVal = $('#formFiltroSelectUsuario option:selected').val();
    var data = {
        ano:anoVal,
        tipo:tipoVal, 
        status:statusVal, 
        idSetor:idSetorVal,
        idUsuario:idUsuarioVal
    }
    return data;
}
function limparFormularioEncaminhamentoSaida(){
    $('#divMovimentacao').addClass("col-12").removeClass("col-6");
    $('#divDataEntrada').addClass('d-none');
    $('#divSetor').addClass('d-none');
    $('#divSetor').addClass('d-none');
    $('#divResponsavel').addClass('d-none');
    $('#divEncaminhamento').addClass('d-none');
    $('#divDataSaida').addClass('d-none');
    $('#divDestino').addClass('d-none');
    $('#divEncaminhamento').addClass('d-none');
    $('#executarSaida').addClass('d-none');
    $('#executarMovimentacao').addClass('d-none');
}
function limparFormularioEncaminhamento(){
    $('#divMovimentacao').addClass("col-12").removeClass("col-6");
    $('#divDataEntrada').addClass('d-none');
    $('#divSetor').addClass('d-none');
    $('#divSetor').addClass('d-none');
    $('#divResponsavel').addClass('d-none');
    $('#divEncaminhamento').addClass('d-none');
    $('#executarMovimentacao').addClass('d-none');
}
function limparFormularioSaida(){
    $('#divMovimentacao').addClass("col-12").removeClass("col-6");
    $('#divDataSaida').addClass('d-none');
    $('#divDestino').addClass('d-none');
    $('#divEncaminhamento').addClass('d-none');
    $('#executarSaida').addClass('d-none');
}
function autocompleteEncaminharDestino(availableTags) {
    $("#encaminharDestino").autocomplete({
        source: availableTags
    });
};

function movimentarDocumentoExecutar(data) {
    $('#carregando').show();
    $.ajax({
        url: 'acoes/documentos/movimentarDocumentoExecutar.php',
        method: 'GET',
        data: data, 
        dataType: 'json'
    }).done(function(result){
        if (result.codigo==0){
            msn('error',result.mensagem);
        }else{
            msn('success',result.mensagem);
            data = carregaDadosFiltro();
            getDocumentoAnoTipoStatusLocal(data, 'NAO');
            fechaTodosModais();
        }
    }).fail(function() {
        msn('error','Sua sessão expirou');
        //setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
};
$("#executarMovimentacao").on("click", function() {
    vidDocumento = $('#idDocumento').val();
    vidMovimentacao = $('#idMovimentacao').val();
    vencaminharResponsavel = $('#encaminharResponsavel option:selected').val();
    vmovimentacoesSetor = $('#movimentacoesSetor option:selected').val();
    vencaminharTexto = $('#encaminharTexto').val();
    var data = {
        idDocumento:vidDocumento,
        idMovimentacao:vidMovimentacao,
        encaminharResponsavel:vencaminharResponsavel,
        movimentacoesSetor:vmovimentacoesSetor,
        encaminharTexto:vencaminharTexto
    }

    movimentarDocumentoExecutar(data);
    
});
function saidaDocumentoExecutar(data) {
    $('#carregando').show();
    $.ajax({
        url: 'acoes/documentos/saidaDocumentoExecutar.php',
        method: 'GET',
        data: data, 
        dataType: 'json'
    }).done(function(result){
        if (result.codigo==0){
            msn('error',result.mensagem);
        }else{
            msn('success',result.mensagem);
            data = carregaDadosFiltro();
            getDocumentoAnoTipoStatusLocal(data, 'NAO');
            fechaTodosModais();
        }
    }).fail(function() {
        msn('error','Sua sessão expirou');
        //setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
};
$("#executarSaida").on("click", function() {
    vDestino = $('#encaminharDestino').val();
    vencaminharTexto = $('#encaminharTexto').val();
    vidDocumento = $('#idDocumento').val();
    vidMovimentacao = $('#idMovimentacao').val();
    var data = {
        destino:vDestino,
        idDocumento:vidDocumento,
        idMovimentacao:vidMovimentacao,
        encaminharTexto:vencaminharTexto
    }
    saidaDocumentoExecutar(data);
    
});


$("#movimentarDocumento").on("click", function() {
    $('#modal-movimentar').modal('show');
    $('#movimentacoesTipo').val("").change();
    $('#movimentacoesSetor').val("").change();
    $('#encaminharResponsavel').val("").change();
    $('#encaminharTexto').val("");
    $('#encaminharDestino').val("");
    let date = dataAtual('us','-');
    $('#encaminharDataEntrada').val(date);
    $('#encaminharDataSaida').val(date);
});
$('#movimentacoesSetor').change(function(){
    dado = $('#movimentacoesSetor option:selected').val();
    console.log(dado);
    getUsuarioIdSetor(dado);
});


$('#movimentacoesTipo').change(function(){
    mudar = $('#movimentacoesTipo option:selected').val();
    if(mudar == 'encaminhamento'){
        limparFormularioSaida();
        $('#divMovimentacao').removeClass("col-12").addClass("col-6");
        $('#divDataEntrada').removeClass('d-none');
        $('#divSetor').removeClass('d-none');
        $('#divSetor').removeClass('d-none');
        $('#divResponsavel').removeClass('d-none');
        $('#divEncaminhamento').removeClass('d-none');
        $('#executarMovimentacao').removeClass('d-none');
        
    }
    if(mudar == 'saida'){
        limparFormularioEncaminhamento();
        $('#divMovimentacao').removeClass("col-12").addClass("col-6");
        $('#divDataSaida').removeClass('d-none');
        $('#divDestino').removeClass('d-none');
        $('#divEncaminhamento').removeClass('d-none');
        $('#executarSaida').removeClass('d-none');
    }
    if(mudar == ''){
        limparFormularioEncaminhamentoSaida()
    }

});

$("#visualizarDocumento").on("click", function() {
    var id =  $('#listaDataEntrega option:selected').val();
    geMovimentacaoId(id);
    $('#modal-ponto').modal('show');
});

$("#visualizarObservacao").on("click", function() {
    var id =  $('#listaObservacaoData option:selected').val();
    geObservacaoId(id);
    $('#modal-ponto').modal('show');
});

$("#movimentacaoTab").on("click", function() {
    let id = $('#idDocumento').val();    
    $('#visualizarDocumento').prop('disabled', true);
    $('#visualizarObservacao').prop('disabled', true);
    getDocumentoMovimentacaoId(id,'');
    
});
$("#observacaoTab").on("click", function() {
    let id = $('#idDocumento').val();    
    $('#visualizarObservacao').prop('disabled', true);
    getDocumentoObservacaoIdDocumento(id,'');
    
});
$('#listaDataEntrega').click(function(){
    $('#visualizarDocumento').removeAttr('disabled');
});
$('#listaObservacaoData').click(function(){
    $('#visualizarObservacao').removeAttr('disabled');
});

$("#btnLimpar").on("click", function() {
    data = carregaDadosFiltro();
    getDocumentoAnoTipoStatusLocal(data, 'data_entrada');
    $('#textMatriculaCpfNome').val('');
    $('#textMatriculaCpfNomeOrder').val('');
});
$('#formFiltroBtn').on("click", function(){
    data = carregaDadosFiltro();
    $('#textMatriculaCpfNomeOrder').val('');
    getDocumentoAnoTipoStatusLocal(data, '');
    
//salvarAlteracoesUsuario(data);
});


$('#btnMatriculaCpfNome').on("click", function(){
    var dado = $('#textMatriculaCpfNome').val();
    $('#textMatriculaCpfNomeOrder').val(dado);
    getDocumentoNumeroAno(dado,'data_entrada');
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
        getDocumentoNumeroAno(dado, 'numero_documento');
    }else{
        data = carregaDadosFiltro();
        getDocumentoAnoTipoStatusLocal(data, 'numero_documento');
    }
    $('#visualizarServidor').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});
$('#optionPessoalNome').on("click", function(){
    var dado = $('#textMatriculaCpfNomeOrder').val();
    if(dado){
        getDocumentoNumeroAno(dado, 'assunto');
    }else{
        data = carregaDadosFiltro();
        getDocumentoAnoTipoStatusLocal(data,'assunto');
    }
    $('#visualizarServidor').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});
function verificaSeDeveSerRecebido(dado){
    $.ajax({
        url: 'acoes/documentos/buscaId.php?id='+dado,
        method: 'GET',
        dataType: 'json'
    }).done(function(documento){
        var login = JSON.parse(sessionStorage.getItem('login'));
        if((documento[0].data_recebido == null)&&(documento[0].setor_id  == login.idSetor)){
            $('#visualizarServidor').html('<i class="nav-icon fas fa-check"></i> Receber');
            $('#visualizarServidorTipoAcao').val(documento[0].idMovimentacao);
        }else{
            $('#visualizarServidor').html('<i class="nav-icon fas fa-search"></i> Visualizar');
            $('#visualizarServidorTipoAcao').val('visualizar');
        }
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
};
$('#listaPessoal').click(function(){
    $('#visualizarServidor').removeAttr('disabled');
    $('#btnMatriculaCpfNome').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
    dado = $('#listaPessoal option:selected').val();
    verificaSeDeveSerRecebido(dado);

});
$('#listaPessoalNome').click(function(){
    $('#visualizarServidor').removeAttr('disabled');
    $('#btnMatriculaCpfNome').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
    dado = $('#listaPessoalNome option:selected').val();
    verificaSeDeveSerRecebido(dado);

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
$('#fechaModalMovimenta').click(function(){
    $('#modal-movimentar').modal('hide');
});
$('#fechaModalPessoal').click(function(){
    fechaTodosModais();
});


$(document).ready(function(){
    $('#carregandoModal').hide();
    formFiltroAno();
    formFiltroTipo();
    formFiltroStatus();
    getListaSetoresAtivos();
    carregarSelect2();
    getListaSecretarias();
    getUsuarios();
    setTimeout(() => { 
        data = carregaDadosFiltro();
        getDocumentoAnoTipoStatusLocal(data, 'data_entrada');
     }, 100);
});

function geraLabel(result){
    var keys = [];
    for (var i = 0; i < result.length; i++) {
        keys.push(result[i].data_inclusao);
    }
    return keys;
};
function geraData(result){
    var keys = [];
    for (var i = 0; i < result.length; i++) {
        keys.push(result[i].total);
    }
    return keys;
};
function geraNome(result){
    var keys = [];
    for (var i = 0; i < result.length; i++) {
        keys.push(result[i].nome+' '+result[i].sobrenome);
    }
    return keys;
};



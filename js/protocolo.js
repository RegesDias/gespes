//###############################Funções###########################################
function successFunction(){
    return 'teste';
}
function formFiltroAno(){
    $.ajax({
        url: 'acoes/documentos/buscaAnos.php',
        method: 'GET',
        dataType: 'json',
        async: false
    }).done(function(result){
        preenchimentoSelectAno(result)
        validar = new Promise(function(resolve, reject) {resolve(1);});
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        //codigo...
    });
    return validar;
}
function formFiltroTipo(){
    $.ajax({
        url: 'acoes/documentosTipo/listar.php',
        method: 'GET',
        dataType: 'json',
        async: false
    }).done(function(result){
        preenchimentoSelectTipo(result);
        validar = new Promise(function(resolve, reject) {resolve(1);});
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
    return validar;
}
function formFiltroStatus(){
    $.ajax({
        url: 'acoes/documentosStatus/listar.php',
        method: 'GET',
        dataType: 'json',
        async: false
    }).done(function(result){
        preenchimentoSelectStatus(result);
        validar = new Promise(function(resolve, reject) {resolve(1);});
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
    return validar;
}
function formFiltroAssuntos(){
    $.ajax({
        url: 'acoes/documentos/listaAssuntos.php',
        method: 'GET',
        dataType: 'json',
        async: false
    }).done(function(result){
        preenchimentoAutoCompleteAssunto(result);
        validar = new Promise(function(resolve, reject) {resolve(1);});
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
    return validar;
}
function preenchimentoAutoCompleteAssunto(result){
    var keys = [];
    for (var i = 0; i < result.length; i++) {
        keys.push(result[i].assunto);
    }
    autocompleteEncaminharAssunto(keys);
};
function autocompleteEncaminharAssunto(availableTags) {
    $("#assuntoModalInserir").autocomplete({
        source: availableTags
    });

};
function getListaSetoresAtivos() {
    $.ajax({
        url: 'acoes/usuario/listarSetoresAtivos.php',
        method: 'GET',
        dataType: 'json',
        async: false
    }).done(function(result){
        var size = result.length+1;
        preenchimentoSelectSetor(result);
        validar = new Promise(function(resolve, reject) {resolve(1);});
        return true;
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
    });
    return validar;
};
function getListaSecretarias() {
    $.ajax({
        url: 'acoes/secretaria/listar.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        var size = result.length+1;
        preenchimentoAutoCompleteSecretaria(result);
        validar = new Promise(function(resolve, reject) {resolve(1);});
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
    });
    return validar;
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
            validar = new Promise(function(resolve, reject) {resolve(1);});
        }
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
    return validar;
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
            $('#MovDataEntrada').val('');
            $('#MovDataRecebido').val('');
            $('#MovDataSaida').val('');
            $('#MovResponsavel').val('');
            $('#verEncaminhamento').val('');
            $('#verEncaminhado').val('');

            $('#detalhamentoModalTitulo').html('Detalhe da Movimentação');
            $('#detalhamentoModalLabel1').html('Encaminhado Por:');
            $('#detalhamentoModalLabel2').html('Dados do encaminhamento');
            $('#verEncaminhamento').html(result[0].encaminhamento);
            $('#verEncaminhado').val(result[0].encaminhado);

            $('#divDetalhamentoMovimentacao').removeClass('d-none');
            $('#MovDataEntrada').val(converteDataBr(result[0].data_entrada));
            $('#MovDataRecebido').val(converteDataBr(result[0].data_recebido));
            $('#MovDataSaida').val(converteDataBr(result[0].data_saida));
            $('#MovResponsavel').val(result[0].responsavel);
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

            $('#MovDataEntrada').val('');
            $('#MovDataRecebido').val('');
            $('#MovDataSaida').val('');
            $('#MovResponsavel').val('');
            $('#verEncaminhamento').val('');
            $('#verEncaminhado').val('');


            $('#detalhamentoModalTitulo').html('Detalhe das Observações');
            $('#detalhamentoModalLabel1').html('Inserido Por:');
            $('#detalhamentoModalLabel2').html('Descrição:');
            $('#verEncaminhamento').html(result[0].observacao);
            $('#verEncaminhado').val(result[0].nome);
            $('#divDetalhamentoMovimentacao').addClass('d-none');
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
                $('#divCanvas').html('asdasdasdasd;');
                $('#divCanvas').html('<canvas id="areaChart" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>'); 
                var size = result.exec.length+1;
                if (result.codigo==1){
                    msn('success',result.mensagem);
                }
                $("#listaPessoal").empty();
                $("#listaPessoalNome").empty();
                $('#listaPessoal').attr("size", size);
                $('#listaPessoalNome').attr("size", size);
                $("#totalEncontrados").html(result.total);
                $("#areaChart").removeClass('d-none');
                $("#barraGraficoExibir").removeClass('d-none');
                $("#barraGraficoBotao").addClass('fas fa-plus');
                var label = geraLabel(result.grafico);
                var data = geraData(result.grafico);
                setTimeout(() => {  geraGraficoArea(label,data,result.tipo) }, 1000);
                preenchimentoSelect(result.exec);
            }
            }).fail(function() {
                msn('error','Sua sessão expirou');
               // setTimeout(() => {  window.location.href = "index.html" }, 1000);
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
            $("#totalEncontrados").html(result.total);
            $("#areaChart").addClass('d-none');
            $("#barraGraficoCorpo").css({ display: "none" });
            $("#barraGraficoExibir").addClass('d-none');
            $("#barraGrafico").addClass('collapsed-card');
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
            $('#arquivarDesarquivar').addClass('d-none');
        }else{
            $('#movimentarDocumento').removeClass('d-none');
            $('#criarObservacao').removeClass('d-none');
            $('#arquivarDesarquivar').removeClass('d-none');
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
function preenchimentoSelectUsuarioIdSetorCadastra(result){
    $("#responsavelModalInserir").empty();
    for (var i = 0; i < result.length; i++) {
        $('#responsavelModalInserir').prepend('<option value='+ result[i].id +'> '+result[i].nome+'</option>');    
    }
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
            getDocumentoAnoTipoStatusLocal(data, ' tb_documentos.id ');
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
    $('#observacaoTexto').summernote('reset');
});
$('#fechaModalObservacao').click(function(){
    $('#modal-observacao').modal('hide');
});
$('#fecharModalInserir').click(function(){
    $('#modal-inserir').modal('hide');
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
        method: 'POST',
        data: data, 
        dataType: 'json'
    }).done(function(data){
        $('#modal-observacao').modal('hide');
    }).fail(function() {
        msn('error','Sua sessão expirou');
        //setTimeout(() => {  window.location.href = "index.html" }, 1000);
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
        $('#listaDataEntrega').prepend('<option value='+ result[i].id +'> '+converteDataBr(result[i].data_entrada)+'</option>');    
        $('#listaResponsavel').prepend('<option value='+ result[i].id +'> '+result[i].encaminhamento+'</option>');
    }
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
        $('#filtroModalInserir').prepend('<option value='+ result[i].id +'> '+result[i].nome+'</option>');    
    }
};
function preenchimentoSelectSetor(result){
    for (var i = 0; i < result.length; i++) {
        $('#formFiltroSelectSetor').prepend('<option value='+result[i].id+'>'+result[i].nome+'</option>');
        $('#setorModalInserir').prepend('<option value='+result[i].id+'>'+result[i].nome+'</option>');
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
    $('#modal-inserir').modal('hide');
}
//INSERIR DOCUMENTO---------------------------------------------------------------------------------------------
function inserirDocumento(data) {
    $.ajax({
        url: 'acoes/documentos/inserirDocumento.php',
        method: 'GET',
        data: data, 
        dataType: 'json'
    }).done(function(result){
        if (result.codigo==0){
            msn('error',result.mensagem);
        }else{
            msn('success',result.mensagem);
            getDocumentoNumeroAno(result.documento,' tb_documentos.id DESC LIMIT 1');
            $('#modal-inserir').modal('hide');
        }
    }).fail(function() {
        msn('error','Sua sessão expirou');
        //setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
    });
};
$('#salvarModalInserir').on("click", function(){
    data = carregaDadosInserirDocumentos();
    inserirDocumento(data);
    
});
function anoCadastroDocumento(tipo){
    $("#anoModalInserir").empty();
    const dataAtual = new Date();
    if(tipo == 2){
        const anoAtual = dataAtual.getFullYear();
        const anoAnteriror = dataAtual.getFullYear()-1;
        $('#anoModalInserir').prepend('<option value='+ anoAtual +'> '+anoAtual+'</option>');
        $('#anoModalInserir').prepend('<option value='+ anoAnteriror +'> '+anoAnteriror+'</option>');   
    }else{
        const anoAtual = dataAtual.getFullYear();
        $('#anoModalInserir').prepend('<option value='+ anoAtual +'> '+anoAtual+'</option>');
        for (var i = 0; i < 20; i++) {
            const ano = dataAtual.getFullYear()-i;
            $('#anoModalInserir').prepend('<option value='+ ano +'> '+ano+'</option>');
         }
    }
};

$("#filtroModalInserir").on("change", function() {
    let tipo = $('#filtroModalInserir option:selected').val();
    anoCadastroDocumento(tipo);
});

$("#btnInserir").on("click", function() {
    $('#filtroModalInserir').val("").change();
    $('#numeroModalInserir').val("");
    $('#assuntoModalInserir').val("");
    $('#origemModalInserir').val("");
    $('#setorModalInserir').val("").change();
    $('#responsavelModalInserir').val("").change();
    $('#textoModalInserir').summernote('reset');
    $('#modal-inserir').modal('show');
});

function carregaDadosInserirDocumentos(){
    let tipoVal = $('#filtroModalInserir option:selected').val();
    let numeroVal = $('#numeroModalInserir').val();
    let anoVal = $('#anoModalInserir option:selected').val();
    let assuntoVal = $('#assuntoModalInserir').val();
    let origemVal = $('#origemModalInserir').val();
    let idSetorVal = $('#setorModalInserir option:selected').val();
    let idUsuarioVal = $('#responsavelModalInserir option:selected').val();
    let textoModalInserirVal = $('#textoModalInserir').val();
    var data = {
        tipo:tipoVal, 
        numero:numeroVal, 
        ano:anoVal,
        assunto:assuntoVal,
        origem:origemVal,
        idSetor:idSetorVal,
        idUsuario:idUsuarioVal,
        textoModalInserir:textoModalInserirVal
    }
    return data;
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
    $("#origemModalInserir").autocomplete({
        source: availableTags
    });
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
            getDocumentoAnoTipoStatusLocal(data, 'data_entrada');
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
            getDocumentoAnoTipoStatusLocal(data, 'data_entrada');
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
    $('#encaminharTexto').summernote('reset');
    $('#encaminharDestino').val("");
    let date = dataAtual('us','-');
    $('#encaminharDataEntrada').val(date);
    $('#encaminharDataSaida').val(date);
});
$('#movimentacoesSetor').change(function(){
    dado = $('#movimentacoesSetor option:selected').val();
    getUsuarioIdSetor(dado);
});
function getUsuarioIdSetorCadastra(dado){
    $('#carregando').show();
    $.ajax({
        url: 'acoes/usuario/listarIdSetor.php?dado='+dado,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        if (result.codigo==0){
            msn('error',result.mensagem);
        }else{
            preenchimentoSelectUsuarioIdSetorCadastra(result);
        }
    }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
    });
};
$('#setorModalInserir').change(function(){
    dado = $('#setorModalInserir option:selected').val();
    getUsuarioIdSetorCadastra(dado);
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
    getDocumentoAnoTipoStatusLocal(data, 'data_entrada');
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


$(document).ready(function(){
    var login = JSON.parse(sessionStorage.getItem('login'));
console.log(login);
    if(login.protFiltroUsuarios == 0){
        $('#protFiltroUsuarios').addClass('d-none');
        console.log('protFiltroUsuarios')
    }
    if(login.protFiltroSetor == 0){
        $('#protFiltroSetor').addClass('d-none');
    }
    if(login.protBTNArquivar == 0){
        $('#protBTNArquivar').addClass('d-none');
    }
    if(login.protBTNMovimentar == 0){
        $('#protBTNMovimentar').addClass('d-none');
    }
    if(login.protBTNInserir == 0){
        $('#protBTNInserir').addClass('d-none');
    }
    $('#carregandoModal').hide();
    $("#encaminharTexto").summernote({
        lang: 'pt-BR'
    });
    $("#observacaoTexto").summernote({
        lang: 'pt-BR'
    });
    $("#textoModalInserir").summernote({
        lang: 'pt-BR'
    });
    //função para carregamento do select com busca interativa 
    carregarSelect2()
    formFiltroAssuntos()
    getListaSecretarias()

    //carregamento encadeado das funcoes do formulario
    formFiltroAno().then(
        formFiltroTipo().then(
            formFiltroStatus().then(
                getListaSetoresAtivos().then(
                    getUsuarios().then(function(){
                        data = carregaDadosFiltro();
                        getDocumentoAnoTipoStatusLocal(data, 'data_entrada');
                    })
                )
            )
        )
    )
});
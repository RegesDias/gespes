//###############################Funções##########################################
function getOndenaCodigo() {
    $('#carregando').show();
    $.ajax({
        url: 'acoes/setor/listarCodigo.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        var size = result.length+1;
        $("#lista").empty();
        $("#listaNome").empty();
        $('#lista').attr("size", size);
        $('#listaNome').attr("size", size);
        msn('success','Servidores ordenados por codigo!');
        preenchimentoSelect(result);
    }).fail(function() {
       $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function getOrdenaNome() {
    $('#carregando').show();
    $.ajax({
        url: 'acoes/setor/listarNome.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        var size = result.length+1;
        $("#lista").empty();
        $("#listaNome").empty();
        $('#lista').attr("size", size);
        $('#listaNome').attr("size", size);
        msn('success','Servidores ordenados por nome!');
        preenchimentoSelect(result);
    }).fail(function() {
        $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function getNome(dado){
    $('#carregando').show();
    $.ajax({
        url: 'acoes/setor/buscaNome.php?dado='+dado,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        var total = result.length;
        var size = result.length+1;
        if(result.codigo == 0){
            msn('error', result.mensagem);
        }else{
            if (total>0){
                msn('success','Total de '+total+' encontrado(s)!');
                $("#lista").empty();
                $("#listaNome").empty();
                $('#lista').attr("size", size);
                $('#listaNome').attr("size", size);
                preenchimentoSelect(result);
            }
        }
    }).fail(function() {
        $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function getDados(codFunc){
    $('#carregando').show();
    $.ajax({
        url: 'acoes/setor/buscarID.php?codFunc='+codFunc,
        method: 'GET',
        dataType: 'json'
    }).done(function(dados){
        $('#Nome').val(dados[0].nome);
        $('#Cpfs').val(dados[0].id);
        $('#Status').val(dados[0].status);
        $('#dataCriacaoLabel').html(converteDataHoraBr(dados[0].dataHora));
        $('#modal').modal('show');
        
    }).fail(function() {
        $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function preenchimentoSelect(result){
    for (var i = 0; i < result.length; i++) {
        $( '#barraCarregamento' ).css( "width", (100*i)/result.length+"%");
        $('#lista').prepend('<option value='+ result[i].id +'> '+addZero(result[i].id, 6)+'</option>');
        $('#listaNome').prepend('<option value='+ result[i].id +'> '+result[i].nome+'</option>');
    }
    $( '#barraCarregamento' ).css( "width", "100%");
    setTimeout(() => { $( '#barraCarregamento' ).css( "width", "0%"); }, 2000);
};

function salvarAlteracoes(data){
    $.ajax({
        type : 'POST',
        url  : 'acoes/setor/atualizarDados.php',
        data : data,
        dataType: 'json',
        success :  function(response){						
            if(response.codigo == "1"){
                msn('success',response.mensagem);
                getOndenaCodigo();
                $('#modal').modal('hide');
            }
            else{		
                msn('error',response.mensagem);
            }
        }
    });
};
function inserir(data){
    $.ajax({
        type : 'POST',
        url  : 'acoes/setor/inserirNovo.php',
        data : data,
        dataType: 'json',
        success :  function(response){						
            if(response.codigo == "1"){
                msn('success',response.mensagem);
                $('#modal').modal('hide');
                getOndenaCodigo();
            }
            else{			
                msn('error',response.mensagem);
            }
        }
    });
};
function renovarSenha(data){
    $.ajax({
        type : 'POST',
        url  : 'acoes/setor/renovarSenha.php',
        data : data,
        dataType: 'json',
        success :  function(response){						
            if(response.codigo == "1"){
                msn('success',response.mensagem);
                $('#modal').modal('hide');
            }
            else{			
                msn('error',response.mensagem);
            }
        }
    });
};

//###############################Ações###########################################
$("#btnLimpar").on("click", function() {
    getOrdenaNome();
    $('#textMatriculaCpfNome').val('');
});
$('#renovarSenha').on("click", function(){
    var Cpf = $('#Cpfs').val();
    var chave = $('#chaveLabel').html();
    var data = {
        cpf:Cpf,
        email:chave
    }
    renovarSenha(data);
});

$('#salvarAlteracoes').on("click", function(){
    var id = $('#Cpfs').val();
    var Nome = $('#Nome').val();
    var Status = $("#Status option:selected").val();
    var data = {
                id:id,
                nome:Nome, 
                status:Status
            }
    salvarAlteracoes(data);
});
$('#inserir').on("click", function(){
    var nome = $('#Nome').val();
    var Status = $("#Status option:selected").val();
    var data = {
                nome:nome,
                status:Status
            }
        inserir(data);
});
$("#visualizarServidor").on("click", function() {
    var codfunc =  $('#lista option:selected').val();
    $("#Status option[value='']").remove();
    $('#dadosDaConta').show();
    $('#camposCriar').hide();
    $('#salvarAlteracoes').show();
    $('#inserir').hide();
    $("#dadosGeral").trigger('click');
    $('#renovarSenha').show();
    $('#Cpfs').attr('disabled', 'disabled');
    $('#dataCriacaoLabel').html('');
    $('#dataUltimoLoginLabel').html('');
    $('#ultimaAcaoLabel').html('');
    getDados(codfunc);
});
$("#btnInserir").on("click", function() {
    $('#Cpfs').removeAttr('disabled');
    $('#modal').modal('show');
    $('#salvarAlteracoes').hide();
    $("#Status option[value='']").remove();
    $('#Status').prepend('<option value="" selected> </option>');
    $('#inserir').show();
    $('#dadosDaConta').hide();
    $('#camposCriar').show();
    $('#consultaPessoalheckbox').prop("checked", false);
    $('#atendimentoEntradaCheckbox').prop("checked", false);
    $('#atendimentoAgendaCheckbox').prop("checked", false);
    $('#alterarSenhaCheckbox').prop("checked", false);
    $('#sCheckbox').prop("checked", false);
    $('#Nome').val('');
    $('#Cpfs').val('');
    $("#dadosGeral").trigger('click');
    $('#renovarSenha').hide();
    $('#Cpfs').attr('disabled', 'disabled');
    
});

$('#btnMatriculaCpfNome').on("click", function(){
    var textMatriculaCpfNome = $('#textMatriculaCpfNome').val();
    getNome(textMatriculaCpfNome);
    $('#textMatriculaCpfNome').val('');
    $('#visualizarServidor').attr("disabled","disabled");
});
$('#textMatriculaCpfNome').keyup(function(){
    $('#btnMatriculaCpfNome').removeAttr('disabled');
    $('#visualizarServidor').attr("disabled","disabled");
});
$('#optionCodigo').on("click", function(){
    getOndenaCodigo();
    $('#visualizarServidor').attr("disabled","disabled");
    $('#btnMatriculaCpfNome').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});
$('#optionNome').on("click", function(){
    getOrdenaNome();
    $('#visualizarServidor').attr("disabled","disabled");
    $('#btnMatriculaCpfNome').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});
$('#lista').change(function(){
    $('#visualizarServidor').removeAttr('disabled');
    $('#btnMatriculaCpfNome').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});
$('#listaNome').change(function(){
    $('#visualizarServidor').removeAttr('disabled');
    $('#btnMatriculaCpfNome').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});

$(document).ready(function(){
    data = new Date();
    $('#dataAgenda').val(converteDataUS(data));
    getOndenaCodigo();
});
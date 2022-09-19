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
       $(location).attr('href', 'index.html');
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
        var size = result.length+1;
        $('#listaPessoal').attr("size", size);
        $('#listaPessoalNome').attr("size", size);
        msn('success','Servidores ordenados por nome!');
        preenchimentoSelect(result);
    }).fail(function() {
        $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function getPessoalMatriculaCpfNome(dado){
    $('#carregando').show();
    $.ajax({
        url: 'acoes/servidor/buscaMatriculaCpfNome.php?dado='+dado,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        var total = result.length;
        var size = result.length+1;
        if (total>0 && result!='erro'){
            msn('success','Total de '+total+' encontrado(s)!');
            $("#listaPessoal").empty();
            $("#listaPessoalNome").empty();
            $('#listaPessoal').attr("size", size);
            $('#listaPessoalNome').attr("size", size);
            preenchimentoSelect(result);
        }else{
            msn('error',result.mensagem);
        }
    }).fail(function() {
        $(location).attr('href', 'index.html');
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
        $('#pessoalNome').val(dadosPessoal[0].nome);
        $('#pessoalCodFunc').val(dadosPessoal[0].codfunc);
        $('#pessoalCpfs').val(dadosPessoal[0].cpfs);
        $('#pessoalDataAdmis').val(dadosPessoal[0].dataadmis);
        $('#pessoalNomeCarg').val(dadosPessoal[0].nome_carg);
        $('#pessoalPrefixos').val(dadosPessoal[0].prefixos);
        $('#pessoalSecoes').val(dadosPessoal[0].secoes);
        $('#pessoalSecretarias').val(dadosPessoal[0].secretarias);
        $('#textMatriculaCpfNome').val('');
        $('#modal-pessoal').modal('show');
    }).fail(function() {
        $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function preenchimentoSelect(result){
    for (var i = 0; i < result.length; i++) {
        $('#listaPessoal').prepend('<option value='+ result[i].codfunc +'> '+result[i].codfunc+'</option>');
        $('#listaPessoalNome').prepend('<option value='+ result[i].codfunc +'> '+result[i].nome+'</option>');
    }
};

//###############################Ações###########################################

$("#visualizarServidor").on("click", function() {
    var codfunc =  $('#listaPessoal option:selected').val();
    getPessoaDadosFuncionais(codfunc);
});

$('#btnMatriculaCpfNome').on("click", function(){
    var textMatriculaCpfNome = $('#textMatriculaCpfNome').val();
    getPessoalMatriculaCpfNome(textMatriculaCpfNome);
    $('#textMatriculaCpfNome').val('');
    $('#visualizarServidor').attr("disabled","disabled");
});
$('#textMatriculaCpfNome').keyup(function(){
    $('#btnMatriculaCpfNome').removeAttr('disabled');
    $('#visualizarServidor').attr("disabled","disabled");
});
$('#optionPessoalCodigo').on("click", function(){
    getPessoalCodigo();
    $('#visualizarServidor').attr("disabled","disabled");
    $('#btnMatriculaCpfNome').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});
$('#optionPessoalNome').on("click", function(){
    getPessoalNome();
    $('#visualizarServidor').attr("disabled","disabled");
    $('#btnMatriculaCpfNome').attr("disabled","disabled");
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
$(document).ready(function(){
    getPessoalCodigo();
});
//###############################Funções###########################################
function getListaSetoresAtivos() {
    $('#carregando').show();
    $.ajax({
        url: 'acoes/setor/listarAtivos.php',
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
function getUsuarioCodigo() {
    $('#carregando').show();
    $.ajax({
        url: 'acoes/usuario/listarCodigo.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        var size = result.length+1;
        $("#listaUsuario").empty();
        $("#listaUsuarioNome").empty();
        $('#listaUsuario').attr("size", size);
        $('#listaUsuarioNome').attr("size", size);
        msn('success','Servidores ordenados por codigo!');
        preenchimentoSelect(result);
    }).fail(function() {
       $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function getUsuarioNome() {
    $('#carregando').show();
    $.ajax({
        url: 'acoes/usuario/listarNome.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        var size = result.length+1;
        $("#listaUsuario").empty();
        $("#listaUsuarioNome").empty();
        $('#listaUsuario').attr("size", size);
        $('#listaUsuarioNome').attr("size", size);
        msn('success','Servidores ordenados por nome!');
        preenchimentoSelect(result);
    }).fail(function() {
        $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function getUsuarioCpfNome(dado){
    $('#carregando').show();
    $.ajax({
        url: 'acoes/usuario/buscaCpfNome.php?dado='+dado,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
        var total = result.length;
        var size = result.length+1;
        if (total>0){
            msn('success','Total de '+total+' encontrado(s)!');
            $("#listaUsuario").empty();
            $("#listaUsuarioNome").empty();
            $('#listaUsuario').attr("size", size);
            $('#listaUsuarioNome').attr("size", size);
            preenchimentoSelect(result);
        }else{
            msn('error','Nenhum servidor encontrado!');
        }
    }).fail(function() {
        $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function getUsuarioDados(codFunc){
    $('#carregando').show();
    $.ajax({
        url: 'acoes/usuario/buscarCpf.php?codFunc='+codFunc,
        method: 'GET',
        dataType: 'json'
    }).done(function(dadosUsuario){
        $('#imgFoto').attr('src', 'http://10.40.10.233/sdgc/img/fotos/'+dadosUsuario[0].CPF+'.bmp');
        $('#UsuarioNome').val(dadosUsuario[0].nome);
        $('#UsuarioCpfs').val(dadosUsuario[0].CPF);
        $('#UsuarioStatus').val(dadosUsuario[0].status);
        $('#UsuarioDataCriacao').val(converteDataHoraBr(dadosUsuario[0].dataHora));
        $('#consultaPessoalheckbox').prop("checked", converteNumeroEmBoolean(dadosUsuario[0].consultaPessoal));
        $('#atendimentoEntradaCheckbox').prop("checked", converteNumeroEmBoolean(dadosUsuario[0].atendimentoEntrada));
        $('#atendimentoAgendaCheckbox').prop("checked", converteNumeroEmBoolean(dadosUsuario[0].atendimentoAgenda));
        $('#alterarSenhaCheckbox').prop("checked", converteNumeroEmBoolean(dadosUsuario[0].alterarSenha));
        $('#usuariosCheckbox').prop("checked", converteNumeroEmBoolean(dadosUsuario[0].usuarios));
        $('#setorCheckbox').prop("checked", converteNumeroEmBoolean(dadosUsuario[0].setor));
        $('#modal-Usuario').modal('show');
        $('#chaveLabel').html(dadosUsuario[0].email);
        $('#dataCriacaoLabel').html(converteDataHoraBr(dadosUsuario[0].dataHora));
        $('#dataUltimoLoginLabel').html(converteDataHoraBr(dadosUsuario[0].ultimoLogin));
        $('#ultimaAcaoLabel').html(dadosUsuario[0].ultimaAcao);
        getListaSetoresAtivos();
        
    }).fail(function() {
        $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function preenchimentoSelectSetor(result){
    for (var i = 0; i < result.length; i++) {
        $('#setorSelect').prepend('<option value='+ result[i].id +'> '+result[i].nome+'</option>');
    }
};

function preenchimentoSelect(result){
    for (var i = 0; i < result.length; i++) {
        $( '#barraCarregamento' ).css( "width", (100*i)/result.length+"%");
        $('#listaUsuario').prepend('<option value='+ result[i].CPF +'> '+result[i].CPF+'</option>');
        $('#listaUsuarioNome').prepend('<option value='+ result[i].CPF +'> '+result[i].nome+'</option>');
    }
    $( '#barraCarregamento' ).css( "width", "100%");
    setTimeout(() => { $( '#barraCarregamento' ).css( "width", "0%"); }, 2000);
};

function salvarAlteracoesUsuario(data){
    $.ajax({
        type : 'POST',
        url  : 'acoes/usuario/salvarAlteracoes.php',
        data : data,
        dataType: 'json',
        success :  function(response){						
            if(response.codigo == "1"){
                msn('success',response.mensagem);
                $('#modal-Usuario').modal('hide');
                getUsuarioCodigo();
            }
            else{		
                msn('error',response.mensagem);
            }
        }
    });
};
function inserirUsuario(data){
    $.ajax({
        type : 'POST',
        url  : 'acoes/usuario/inserirNovo.php',
        data : data,
        dataType: 'json',
        success :  function(response){						
            if(response.codigo == "1"){
                msn('success',response.mensagem);
                $('#modal-Usuario').modal('hide');
                getUsuarioCodigo();
            }
            else{			
                msn('error',response.mensagem);
            }
        }
    });
};
function renovarSenhaUsuario(data){
    $.ajax({
        type : 'POST',
        url  : 'acoes/usuario/renovarSenha.php',
        data : data,
        dataType: 'json',
        success :  function(response){						
            if(response.codigo == "1"){
                msn('success',response.mensagem);
                $('#modal-Usuario').modal('hide');
            }
            else{			
                msn('error',response.mensagem);
            }
        }
    });
};

//###############################Ações###########################################
$('#renovarSenha').on("click", function(){
    var UsuarioCpf = $('#UsuarioCpfs').val();
    var chave = $('#chaveLabel').html();
    var data = {
        cpf:UsuarioCpf,
        email:chave
    }
    renovarSenhaUsuario(data);
});

$('#salvarAlteracoesUsuario').on("click", function(){
    var UsuarioCpf = $('#UsuarioCpfs').val();
    var usuarioNome = $('#UsuarioNome').val();
    var usuarioStatus = $("#UsuarioStatus option:selected").val();
    var consultaPessoalheckbox = converteBooleanEmNumero($('#consultaPessoalheckbox').is(':checked'));
    var atendimentoEntradaCheckbox = converteBooleanEmNumero($('#atendimentoEntradaCheckbox').is(':checked'));
    var atendimentoAgendaCheckbox = converteBooleanEmNumero($('#atendimentoAgendaCheckbox').is(':checked'));
    var alterarSenhaCheckbox = converteBooleanEmNumero($('#alterarSenhaCheckbox').is(':checked'));
    var usuariosCheckbox = converteBooleanEmNumero($('#usuariosCheckbox').is(':checked'));
    var setorCheckbox = converteBooleanEmNumero($('#setorCheckbox').is(':checked'));
    var data = {
                cpf:UsuarioCpf,
                nome:usuarioNome, 
                status:usuarioStatus, 
                consultaPessoal:consultaPessoalheckbox, 
                atendimentoEntrada:atendimentoEntradaCheckbox,
                atendimentoAgenda:atendimentoAgendaCheckbox, 
                alterarSenha:alterarSenhaCheckbox, 
                usuarios:usuariosCheckbox, 
                setor:setorCheckbox, 
            }
    salvarAlteracoesUsuario(data);
});
$('#inserirUsuario').on("click", function(){
    var UsuarioCpf = $('#UsuarioCpfs').val();
    var usuarioNome = $('#UsuarioNome').val();
    var usuarioStatus = $("#UsuarioStatus option:selected").val();
    var consultaPessoalheckbox = converteBooleanEmNumero($('#consultaPessoalheckbox').is(':checked'));
    var atendimentoEntradaCheckbox = converteBooleanEmNumero($('#atendimentoEntradaCheckbox').is(':checked'));
    var atendimentoAgendaCheckbox = converteBooleanEmNumero($('#atendimentoAgendaCheckbox').is(':checked'));
    var alterarSenhaCheckbox = converteBooleanEmNumero($('#alterarSenhaCheckbox').is(':checked'));
    var usuariosCheckbox = converteBooleanEmNumero($('#usuariosCheckbox').is(':checked'));
    var setorCheckbox = converteBooleanEmNumero($('#setorCheckbox').is(':checked'));
    var emailUsuario = $('#emailUsuario').val();
    var senhaUsuario = $('#senhaUsuario').val();
    var senha2Usuario = $('#senha2Usuario').val();
    var data = {
                cpf:UsuarioCpf,
                nome:usuarioNome, 
                status:usuarioStatus, 
                consultaPessoal:consultaPessoalheckbox, 
                atendimentoEntrada:atendimentoEntradaCheckbox,
                atendimentoAgenda:atendimentoAgendaCheckbox, 
                alterarSenha:alterarSenhaCheckbox, 
                usuarios:usuariosCheckbox, 
                setor:setorCheckbox, 
                email:emailUsuario,
                senha:senhaUsuario,
                senha2:senha2Usuario
            }
        inserirUsuario(data);
});
$("#visualizarServidor").on("click", function() {
    var codfunc =  $('#listaUsuario option:selected').val();
    $("#UsuarioStatus option[value='']").remove();
    $('#dadosDaConta').show();
    $('#camposCriarUsuario').hide();
    $('#salvarAlteracoesUsuario').show();
    $('#inserirUsuario').hide();
    $("#dadosGeral").trigger('click');
    $('#renovarSenha').show();
    $('#UsuarioCpfs').attr('disabled', 'disabled');
    $('#dataCriacaoLabel').html('');
    $('#dataUltimoLoginLabel').html('');
    $('#ultimaAcaoLabel').html('');
    getUsuarioDados(codfunc);
});
$("#btnInserir").on("click", function() {
    $('#UsuarioCpfs').removeAttr('disabled');
    $('#modal-Usuario').modal('show');
    $('#salvarAlteracoesUsuario').hide();
    $("#UsuarioStatus option[value='']").remove();
    $('#UsuarioStatus').prepend('<option value="" selected> </option>');
    $('#inserirUsuario').show();
    $('#dadosDaConta').hide();
    $('#camposCriarUsuario').show();
    $('#consultaPessoalheckbox').prop("checked", false);
    $('#atendimentoEntradaCheckbox').prop("checked", false);
    $('#atendimentoAgendaCheckbox').prop("checked", false);
    $('#alterarSenhaCheckbox').prop("checked", false);
    $('#usuariosCheckbox').prop("checked", false);
    $('#setorCheckbox').prop("checked", false);
    $('#UsuarioNome').val('');
    $('#UsuarioCpfs').val('');
    $("#dadosGeral").trigger('click');
    $('#renovarSenha').hide();
    
});

$('#btnMatriculaCpfNome').on("click", function(){
    var textMatriculaCpfNome = $('#textMatriculaCpfNome').val();
    getUsuarioCpfNome(textMatriculaCpfNome);
    $('#textMatriculaCpfNome').val('');
    $('#visualizarServidor').attr("disabled","disabled");
});
$('#textMatriculaCpfNome').keyup(function(){
    $('#btnMatriculaCpfNome').removeAttr('disabled');
    $('#visualizarServidor').attr("disabled","disabled");
});
$('#optionUsuarioCodigo').on("click", function(){
    getUsuarioCodigo();
    $('#visualizarServidor').attr("disabled","disabled");
    $('#btnMatriculaCpfNome').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});
$('#optionUsuarioNome').on("click", function(){
    getUsuarioNome();
    $('#visualizarServidor').attr("disabled","disabled");
    $('#btnMatriculaCpfNome').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});
$('#listaUsuario').change(function(){
    $('#visualizarServidor').removeAttr('disabled');
    $('#btnMatriculaCpfNome').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});
$('#listaUsuarioNome').change(function(){
    $('#visualizarServidor').removeAttr('disabled');
    $('#btnMatriculaCpfNome').attr("disabled","disabled");
    $('#textMatriculaCpfNome').val('');
});

$(document).ready(function(){
    data = new Date();
    $('#dataAgenda').val(converteDataUS(data));
    getUsuarioCodigo();
});
$(document).ready(function(){
    preenchimentoSelectEstado();
    $("#idCep").blur(function(){
        var cep = $(this).val().replace(/[^0-9]/, '');
        if(cep){
            $.ajax({
                url: 'acoes/endereco/buscaCEP.php?cep='+cep,
                method: 'GET',
                dataType: 'json'
            }).done(function(result){
                var total = result.length;
                if (total>0){
                    console.log(result);
                    limpaSelect(idEstado)
                    limpaSelect(idCidade)
                    limpaSelect(idBairro)
                    buscapreenchimentoSelectEstado(result[0].idEstado)
                    preenchimentoSelectCidadeId(result[0].idCidade)
                    preenchimentoSelectBairroId(result[0].idBairro)
                    $('#idLogradouro').val(result[0].logradouro)
                }
            }).fail(function() {
                //$(location).attr('href', 'index.html');
            }).always(function() {
                $('#carregando').hide();
            });
        }else{
            preenchimentoSelectEstado()
            limpaSelect(idEstado)
            limpaSelect(idCidade)
            limpaSelect(idBairro)
            $('#idLogradouro').val('')

        }               
    }); 
});
$("#idEstado").change(function() {
    limpaSelect(idCidade)
    preenchimentoSelectCidadeIdBairro($("#idEstado").val())
});
$("#idCidade").change(function() {
    limpaSelect(idBairro)
    preenchimentoSelectBairroIdCidade($("#idCidade").val())
});
$("#idBairro").change(function() {
    console.log('idBairro')    
});
function preenchimentoSelectBairroIdCidade(id){
    $.ajax({
        url:  'acoes/endereco/listaBairrosIdCidade.php?id='+id,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                $('#idBairro').prepend('<option value='+ result[i].id +'> '+result[i].nome+'</option>');
            }
    }).fail(function() {
        //$(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function buscapreenchimentoSelectEstado(id){
    $.ajax({
        url:  'acoes/endereco/listaEstados.php?id='+id,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                $('#idEstado').prepend('<option value='+ result[i].id +'> '+result[i].nome+'</option>');
            }
    }).fail(function() {
        $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function preenchimentoSelectEstado(){
    $.ajax({
        url:  'acoes/endereco/listaEstados.php',
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                $('#idEstado').prepend('<option value='+ result[i].id +'> '+result[i].nome+'</option>');
            }
    }).fail(function() {
        $(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function preenchimentoSelectCidadeId(id){
    $.ajax({
        url:  'acoes/endereco/listaCidadesId.php?id='+id,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                $('#idCidade').prepend('<option value='+ result[i].id +'> '+result[i].nome+'</option>');
            }
    }).fail(function() {
        //$(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function preenchimentoSelectCidadeIdBairro(id){
    $.ajax({
        url:  'acoes/endereco/listaCidadesIdEstado.php?id='+id,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                $('#idCidade').prepend('<option value='+ result[i].id +'> '+result[i].nome+'</option>');
            }
    }).fail(function() {
        //$(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
function preenchimentoSelectBairroId(id){
    $.ajax({
        url:  'acoes/endereco/listaBairrosId.php?id='+id,
        method: 'GET',
        dataType: 'json'
    }).done(function(result){
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                $('#idBairro').prepend('<option value='+ result[i].id +'> '+result[i].nome+'</option>');
            }
    }).fail(function() {
        //$(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
};
$('#enderecoSalvar').on("click", function(){
    var end = new Object();
    end.id_info = $('#idInfo').val()
    end.cep_logradouro = $('#idCep').val()
    end.id_bairro = $('#idBairro').val()
    end.endereco =  $('#idLogradouro').val()
    end.numero =  $('#idNumero').val()
    end.celular =  $('#idCelular').val()
    end.telefone =  $('#idTelefone').val()
    end.email =  $('#idEmail').val()
    $.ajax({
        url:  'acoes/endereco/salvarEndereco.php',
        method: 'POST',
        dataType: 'json',
        data: end
    }).done(function(result){
        console.log(result);
    }).fail(function() {
        //$(location).attr('href', 'index.html');
    }).always(function() {
        $('#carregando').hide();
    });
})
function limpaSelect(objSelect){
    //console.log("LIPA SELECT");
    //console.log(objSelect);
    while (objSelect.options.length > 0){
        objSelect.options[0] = null;		
    }	 
}
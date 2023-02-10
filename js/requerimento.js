
$("#modalInserirProtocoloCadastrar").on("click", function () {
  var end = new Object()
  end.id_requerimento_status = '2';
  end.id = $("#idrequerimentoSelectLi").val()
  end.protocolo = $("#numeroProtocolo").val()
  end.id_info = $("#idInfo").val();
  end.id_requerimento_solicitacao = $("#idRequerimentoSolicitacao").val()
  $.ajax({
    url: "acoes/requerimento/inserirNumeroDeProtocolo.php",
    method: "POST",
    dataType: "json",
    data: end,
  }).done(function (result) {
        if(result.codigo == 0){
          result.acao = 'error'
        }
        msn(result.acao,result.mensagem);
        $('#modalInserirProtocolo').modal('hide');
        $('#numeroProtocolo').val('');
        listaRequerimentoIdInfo();
    }).fail(function () {
      //$(location).attr('href', 'index.html');
    })
    .always(function () {
      $("#carregando").hide();
    });
})
$("#solicitacaoSalvar").on("click", function () {
    var end = new Object()
    end.id_requerimento_status = '1';
    end.id_requerimento_solicitacao = $("#idRequerimentoSolicitacao").val()
    end.id_info = $("#idInfo").val();
    $.ajax({
      url: "acoes/requerimento/salvar.php",
      method: "POST",
      dataType: "json",
      data: end,
    })
      .done(function (result) {
        if(result.id == 0){
          msn('error','Servidor já possue endereço salvo!');
        }else{
          msn('success','Solicitacao salva com sucesso!');
          console.log(result);
          listaRequerimentoIdInfo();
        }
      })
      .fail(function () {
        //$(location).attr('href', 'index.html');
      })
      .always(function () {
        $("#carregando").hide();
      });
  });
  function listaRequerimentoIdInfo() {
    id = $("#idInfo").val();
    $.ajax({
      url: "acoes/requerimento/listaRequerimentoIdInfo.php?id="+id,
      method: "GET",
      dataType: "json",
    })
      .done(function (result) {
        $('#listaSolicitacoesCadastradas').html("");
        for (var i = 0; i < result.length; i++) {
          console.log (result[i]);
            $("#listaSolicitacoesCadastradas").prepend(
                "<li value="+result[i].id+">"+
                  "<span class='text'>"+result[i].solicitacao+" - </span>"+
                  "<small class='badge badge-"+result[i].classifica+"'>"+result[i].status+"</small>"+
                  "<div class='tools'>"+
                      "<i class='fas fa-"+result[i].btnIcone+"'></i>"+
                  "</div>"+
                "</li>"
            )
        }
      })
      .fail(function () {
        //$(location).attr('href', 'index.html');
      })
      .always(function () {
        $("#carregando").hide();
      });
  }
$('#modalInserirProtocoloImprimir').click(function(){
  $('#modal-data').modal('hide');
  var end = new Object()

  end.endereco = $("#idLogradouro").val()
  end.cidade = $("#idCidade").text()
  end.bairro = $("#idBairro").text()
  end.telefone = $("#idTelefone").val()
  end.email = $("#idEmail").val()
  end.cpf = $("#pessoalCpfs").val().replace(/[^0-9]/g,'')
  link = 'relatorio/getRelRequerimentoProtocoloGeral';
      $('#carregandoModal').show();
      $('#print-iframe').attr('src', 'acoes/print.php?0='+end.endereco+'&1='+end.cidade+'&2='+end.bairro+'&3='+end.telefone+'&4='+end.email+'&5='+end.cpf+'&link='+link+'&acesso=relatContraCheque');
      $('#print-iframe').attr('src', $('#print-iframe').attr('src'));

      setTimeout(() => { $("#print-iframe").get(0).contentWindow.print() }, 2000);
      setTimeout(() => { $('#carregandoModal').hide() }, 2000);
});
$("#atendimentoBtn").on("click", function () {
    preenchimentoSelectEstado()
    buscaEnderecoIdInfo()
    listaRequerimentoIdInfo()
    preenchimentoSelectSolicitacao()
});
function limpaLista(objSelect) {
    while (objSelect.lu.length > 0) {
      objSelect.lu[0] = null;
    }
  }
  $('#listaSolicitacoesCadastradas').on("click", "li", function() {
    tarefa = $(this).text();
    acao = tarefa.split(' - ')
    $('#idrequerimentoSelectLi').val($(this).val())
    if (acao[1] == 'Aguardando Protocolo'){
        $('#modalInserirProtocolo').modal('show')
    }else if(acao[1] == 'Protocolo Entregue'){
        $('#modalAgendamento').modal('show')
    }
  });
  $('#fechaInserirProtocolo').click(function(){
    $('#modalInserirProtocolo').modal('hide');
  });
  $('#fechaAgendamento').click(function(){
    $('#modalAgendamento').modal('hide');
  });
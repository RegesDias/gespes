$("#reagendarModalDadosDoAgendamento").on("click", function () {
  var end = new Object()
  end.id_requerimento_status = $("#selectRequerimentosStatusReAgenda").val()
  end.id = $("#idrequerimentoSelectLi").val()
  end.id_agenda = null
  end.id_info = $("#idInfo").val();
  end.id_requerimento_solicitacao = $("#idRequerimentoSolicitacao").val()
  $.ajax({
    url: "acoes/requerimento/alterarStatus.php",
    method: "POST",
    dataType: "json",
    data: end,
  }).done(function (result) {
    if (result.codigo == 0) {
      result.acao = 'error'
    }
    console.log(result.exec);
    msn(result.acao, result.mensagem);
    $('#modalDadosDoAgendamento').modal('hide');
    $('#medicosAtivosDataNaAgenda').html('');
    listaRequerimentoIdInfo();
  }).fail(function () {
    //$(location).attr('href', 'index.html');
  })
    .always(function () {
      $("#carregando").hide();
    });
})
$("#modalAgendamentoCadastrar").on("click", function () {
  var end = new Object()
  end.id_requerimento_status = '4';
  end.id = $("#idrequerimentoSelectLi").val()
  end.id_agenda = $("#medicosAtivosDataNaAgenda").val()
  end.id_info = $("#idInfo").val();
  end.id_requerimento_solicitacao = $("#idRequerimentoSolicitacao").val()
  end.id_requerimento_medico = $("#medicosAtivos").val()
  console.log(end.id_requerimento_medico);
  $.ajax({
    url: "acoes/requerimento/inserirAtendimento.php",
    method: "POST",
    dataType: "json",
    data: end,
  }).done(function (result) {
    if (result.codigo == 0) {
      result.acao = 'error'
    }
    console.log(result.exec);
    msn(result.acao, result.mensagem);
    $('#modalAgendamento').modal('hide');
    $('#medicosAtivosDataNaAgenda').html('');
    listaRequerimentoIdInfo();
  }).fail(function () {
    //$(location).attr('href', 'index.html');
  })
    .always(function () {
      $("#carregando").hide();
    });
})
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
    if (result.codigo == 0) {
      result.acao = 'error'
    }
    msn(result.acao, result.mensagem);
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
  end.matricula = $("#pessoalCodFunc").val();
  $.ajax({
    url: "acoes/requerimento/salvar.php",
    method: "POST",
    dataType: "json",
    data: end,
  })
    .done(function (result) {
      console.log(result);
      if (result.id == 0) {
        msn('error', 'Servidor já possue endereço salvo!');
      } else {
        msn('success', 'Solicitacao salva com sucesso!');
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
    url: "acoes/requerimento/listaRequerimentoIdInfo.php?id=" + id,
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      $('#listaSolicitacoesCadastradas').html("");
      for (var i = 0; i < result.length; i++) {
        $("#listaSolicitacoesCadastradas").prepend(
          "<li value=" + result[i].id + ">" +
          "<span class='text'>" + result[i].solicitacao + " - </span>" +
          "<small class='badge badge-" + result[i].classifica + "'>" + result[i].status + "</small>" +
          "<div class='tools'>" +
          "<i class='fas fa-" + result[i].btnIcone + "'></i>" +
          "</div>" +
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
function listaRequerimentoHomologadoIdInfo() {
  id = $("#idInfo").val();
  $.ajax({
    url: "acoes/requerimento/listaRequerimentoIdHomologadoInfo.php?id=" + id,
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      console.log(id);
      $('#listaSolicitacoesHomologadas').html("");
      for (var i = 0; i < result.length; i++) {
        $("#listaSolicitacoesHomologadas").prepend(
          "<li value=" + result[i].id + ">" +
          "<span class='text'>" + result[i].solicitacao + " - </span>" +
          "<small class='badge badge-" + result[i].classifica + "'>" + result[i].status + "</small>" +
          "<div class='tools'>" +
          "<i class='fas fa-" + result[i].btnIcone + "'></i>" +
          "</div>" +
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
$('#modalAgendamentoImprimir').click(function () {
  $('#modal-data').modal('hide');
  var end = new Object()
  end.matricula = $("#pessoalCodFunc").val()
  link = 'relatorio/getRelTodosSesmt';
  $('#carregandoModal').show();
  $('#print-iframe').attr('src', 'acoes/print.php?0=' + end.matricula + '&1=' + end.matricula + '&link=' + link + '&acesso=relatContraCheque');
  $('#print-iframe').attr('src', $('#print-iframe').attr('src'));

  setTimeout(() => { $("#print-iframe").get(0).contentWindow.print() }, 2000);
  setTimeout(() => { $('#carregandoModal').hide() }, 2000);
});
$("#medicosAtivos").on("click", function () {
  let cpf = $("#medicosAtivos").val()
  console.log(cpf)
  $("#medicosAtivosDataNaAgenda").html('');
  preenchimentoMedicosAtivosDataNaAgenda(cpf)
});
function preenchimentoMedicosAtivosDataNaAgenda(cpf) {
  $.ajax({
    url: "acoes/requerimento/listarMedicosAtivosDataNaAgenda.php?cpf=" + cpf,
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      $("#medicosAtivosDataNaAgenda").prepend(
        "<option></option>"
      );
      for (var i = 0; i < result.length; i++) {
        let date = converteDataBr(result[i].start)
        $("#medicosAtivosDataNaAgenda").prepend(
          "<option value=" + result[i].id + ">" + result[i].title + " dia " + date + " - " + result[i].periodo + "</option>"
        );
      }
    })
    .fail(function () {
      //$(location).attr('href', 'index.html');
    })
    .always(function () {
      $("#carregando").hide();
    });
}
function preenchimentoMedicosAtivosCpf() {
  $.ajax({
    url: "acoes/requerimento/listarMedicosAtivos.php",
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      $("#medicosAtivos").html('')
      $("#medicosAtivos").prepend(
        "<option></option>"
      );
      for (var i = 0; i < result.length; i++) {
        $("#medicosAtivos").prepend(
          "<option value=" + result[i].CPF + "> " + result[i].nome + "</option>"
        );
      }
    })
    .fail(function () {
      //$(location).attr('href', 'index.html');
    })
    .always(function () {
      $("#carregando").hide();
    });
}

function preenchimentoMedicosAtivos() {
  $.ajax({
    url: "acoes/requerimento/listarMedicosAtivos.php",
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      $("#medicosAtivos").prepend(
        "<option></option>"
      );
      for (var i = 0; i < result.length; i++) {
        $("#medicosAtivos").prepend(
          "<option value=" + result[i].id + "> " + result[i].nome + "</option>"
        );
      }
    })
    .fail(function () {
      //$(location).attr('href', 'index.html');
    })
    .always(function () {
      $("#carregando").hide();
    });
}

function limpaLista(objSelect) {
  while (objSelect.lu.length > 0) {
    objSelect.lu[0] = null;
  }
}
$('#listaSolicitacoesHomologadas').on("click", "li", function () {
  tarefa = $(this).text();
  acao = tarefa.split(' - ')
  $('#idrequerimentoSelectLi').val($(this).val())
  if (acao[1] == 'Não Homologado') {
    $('#modalInserirProtocolo').modal('show')
  } else if (acao[1] == 'Homologado') {
    $('#modalDadosDoAgendamento').modal('show')
    $('#botoesParaRegendamento').addClass('d-none')
    $('#botoesParaImpressao').removeClass('d-none')
    resumoAgendamento()
    requerimentosStatusReAgenda()
  } else {
    $('#medicosAtivosDataNaAgenda').html('')
    $('#vagasDisponibilizadas').val('')
    $('#vagasOcupadas').val('')
    $('#modalAgendamento').modal('show')
    preenchimentoMedicosAtivosCpf()
  }
});
$('#listaSolicitacoesCadastradas').on("click", "li", function () {
  tarefa = $(this).text();
  acao = tarefa.split(' - ')
  $('#idrequerimentoSelectLi').val($(this).val())
  if (acao[1] == 'Aguardando Protocolo') {
    $('#numeroProtocolo').val('');
    $('#modalInserirProtocolo').modal('show')
  } else if (acao[1] == 'Perícia Agendada') {
    $('#modalDadosDoAgendamento').modal('show')
    $('#botoesParaRegendamento').removeClass('d-none')
    $('#botoesParaImpressao').addClass('d-none')

    resumoAgendamento()
    requerimentosStatusReAgenda()
  } else if (acao[1] == 'Perícia Preenchida') {
  } else {
    $('#medicosAtivosDataNaAgenda').html('')
    $('#vagasDisponibilizadas').val('')
    $('#vagasOcupadas').val('')
    $('#modalAgendamento').modal('show')
    preenchimentoMedicosAtivosCpf()
  }
});
$('#fechaModalDadosDoAgendamento').click(function () {
  $('#modalDadosDoAgendamento').modal('hide');
});
$('#fechaInserirProtocolo').click(function () {
  $('#modalInserirProtocolo').modal('hide');
});
$('#fechaAgendamento').click(function () {
  $('#modalAgendamento').modal('hide');
});
function resumoAgendamento() {
  id_requerimento = $("#idrequerimentoSelectLi").val()
  console.log('id_requerimento');

  console.log(id_requerimento);
  $.ajax({
    url: "acoes/requerimento/resumoAgendamento.php?id_requerimento=" + id_requerimento,
    method: "GET",
    dataType: "json"
  }).done(function (result) {
    console.log(result);
    let data = converteDataBr(result[0].data);
    let diaSemana = diaDaSemana(data);
    $('#idRatendimento').val(result[0].idRatendimento)
    $('#protocoloModalDadosDoAgendamento').text('Protocolo  ' + result[0].protocolo)
    $('#solicitacaoModalDadosDoAgendamento').text(result[0].solicitacao)
    $('#medicoModalDadosDoAgendamento').text(result[0].medico)
    $('#statusModalDadosDoAgendamento').text(result[0].status)
    $('#dataModalDadosDoAgendamento').text(data + "- " + diaSemana + " no período da " + result[0].periodo)
  }).fail(function () {
    console.log('result');
  })
}
function requerimentosStatusReAgenda() {
  $.ajax({
    url: "acoes/requerimento/requerimentosStatusReAgenda.php",
    method: "GET",
    dataType: "json"
  }).done(function (result) {
    $("#selectRequerimentosStatusReAgenda").html('')
    $("#selectRequerimentosStatusReAgenda").prepend(
      "<option></option>"
    );
    for (var i = 0; i < result.length; i++) {
      $("#selectRequerimentosStatusReAgenda").prepend(
        "<option value=" + result[i].id + "> " + result[i].nome.toUpperCase() + "</option>"
      );
    }
  });
}
function vagasOcupadas(id_agenda) {
  $.ajax({
    url: "acoes/requerimento/vagasOcupadas.php?id_agenda=" + id_agenda,
    method: "GET",
    dataType: "json"
  }).done(function (result) {
    if (result[0] != undefined) {
      $('#vagasOcupadas').val(result[0].total);
    } else {
      $('#vagasOcupadas').val(0);

    }
  });
}
function vagasDisponibilizadas(id_agenda) {
  $.ajax({
    url: "acoes/requerimento/vagasDisponibilizadas.php?id_agenda=" + id_agenda,
    method: "GET",
    dataType: "json"
  }).done(function (result) {
    if (result.length > 0) {
      $('#vagasDisponibilizadas').val(result[0].total);
    } else {
      $('#vagasDisponibilizadas').val('0');

    }
  });
}
$('#medicosAtivosDataNaAgenda').change(function () {
  id_agenda = $("#medicosAtivosDataNaAgenda").val();
  vagasOcupadas(id_agenda)
  vagasDisponibilizadas(id_agenda)
  setTimeout(() => {
    vd = $('#vagasDisponibilizadas').val();
    vo = $('#vagasOcupadas').val();
    vagasD = parseInt(vd);
    vagasO = parseInt(vo);
    console.log(vagasD + '>' + vagasO);
    if (vagasD > vagasO) {
      $('#modalAgendamentoCadastrar').prop('disabled', false);
    } else {
      $('#modalAgendamentoCadastrar').prop('disabled', true);
    }
  }, 250);

})
$('#finalizarHomologado').click(function () {
  var end = new Object()
  end.id = $("#idrequerimentoSelectLi").val()
  end.impresso = '1';
  console.log(end);
  console.log('finalizarHomologado');
  $.ajax({
    url: "acoes/requerimento/atualizarImpresso.php",
    method: "POST",
    dataType: "json",
    data: end,
  }).done(function (result) {
    if (result.codigo == 0) {
      result.acao = 'error'
    }
    msn(result.acao, result.mensagem);
    $('#modalDadosDoAgendamento').modal('hide');
    $('#medicosAtivosDataNaAgenda').html('');
    listaRequerimentoHomologadoIdInfo();
  }).fail(function () {
    //$(location).attr('href', 'index.html');
  })
    .always(function () {
      $("#carregando").hide();
    });
});
$('#imprimirHomolodadoResultado').click(function () {
  idRatendimento = $('#idRatendimento').val();
  link = 'relatorio/getRelSESMTResultadoExame';
  $('#carregandoModal').show();
  $('#print-iframe').attr('src', 'acoes/print.php?0=' + idRatendimento + '&link=' + link + '&acesso=relatHomolodadoResultado');
  $('#print-iframe').attr('src', $('#print-iframe').attr('src'));

  setTimeout(() => { $("#print-iframe").get(0).contentWindow.print() }, 2000);
  setTimeout(() => { $('#carregandoModal').hide() }, 2000);
});

$('#imprimirHomolodadoSolicitacao').click(function () {
  idRatendimento = $('#idRatendimento').val();
  link = 'relatorio/getRelSesmtSolicitaLicenca';
  $('#carregandoModal').show();
  $('#print-iframe').attr('src', 'acoes/print.php?0=' + idRatendimento + '&link=' + link + '&acesso=relatHomolodadoSolicitacao');
  $('#print-iframe').attr('src', $('#print-iframe').attr('src'));

  setTimeout(() => { $("#print-iframe").get(0).contentWindow.print() }, 2000);
  setTimeout(() => { $('#carregandoModal').hide() }, 2000);
});
$('#modalInserirProtocoloImprimir').click(function () {
  $('#modal-data').modal('hide');
  matricula = $("#pessoalCodFunc").val()
  link = 'relatorio/getRelRequerimentoProtocoloGeralAtual';
  $('#carregandoModal').show();
  $('#print-iframe').attr('src', 'acoes/print.php?0=' + matricula + '&link=' + link + '&acesso=relatPedidoProtocoloGeral');
  $('#print-iframe').attr('src', $('#print-iframe').attr('src'));

  setTimeout(() => { $("#print-iframe").get(0).contentWindow.print() }, 2000);
  setTimeout(() => { $('#carregandoModal').hide() }, 2000);
});
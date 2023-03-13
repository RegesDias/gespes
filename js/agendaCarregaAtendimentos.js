$(document).ready(function () {
    $('#carregandoModal').hide();
    var login = JSON.parse(sessionStorage.getItem('login'));
    if (login.relatFichaFuncional == 0) {
        $('#fichaFuncional').hide();
    }
    if (login.relatAtribuicoesCargo == 0) {
        $('#atribuicaoDeCargo').hide();
    }
    if (login.relatFolhaPonto == 0) {
        $('#folhaDePonto').hide();
    }
    if (login.relatContraCheque == 0) {
        $('#contraCheque').hide();
    }
    if (login.relatContraCheque == 0) {
        $('#contraCheque').hide();
    }
    if (login.atendimentoAgenda == 0) {
        $('#atendimentoBtn').hide();
    }
});
function getPessoalIdEvento() {
    let id = $("#idEvento").val();
    $.ajax({
        url: "acoes/requerimento/listaRequerimentoIdAgendaTodos.php?id=" + id,
        method: 'GET',
        dataType: 'json'
    }).done(function (result) {
        var size = result.length + 1;
        $('#listaPessoal').attr("size", size);
        $('#listaPessoalNome').attr("size", size);
        preenchimentoSelect(result);
    }).fail(function () {
        msn('error', 'Sua sessão expirou');
        setTimeout(() => { window.location.href = "index.html" }, 1000);
    }).always(function () {
        $('#carregando').hide();
    });
};
function preenchimentoSelect(result) {
    $('#listaPessoal').html('');
    $('#listaPessoalNome').html('');
    for (var i = 0; i < result.length; i++) {
        $('#barraCarregamento').css("width", (100 * i) / result.length + "%");
        $('#listaPessoal').prepend('<option value=' + result[i].matricula + '> ' + result[i].matricula + '</option>');
        $('#listaPessoalNome').prepend('<option value=' + result[i].matricula + '> ' + result[i].paciente + '</option>');
    }
    $('#barraCarregamento').css("width", "100%");
    setTimeout(() => { $('#barraCarregamento').css("width", "0%"); }, 2000);
};
function getPessoaDadosFuncionais(codfunc) {
    $('#carregando').show();
    $.ajax({
        url: 'acoes/servidor/buscarCodFunc.php?codfunc=' + codfunc,
        method: 'GET',
        dataType: 'json'
    }).done(function (dadosPessoal) {
        $('#gestaoClick').trigger('click');
        $('#imgFoto').attr('src', 'https://www.sdgc.com.br/sdgc/img/fotos/' + dadosPessoal[0].cpfs + '.bmp');
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

        if (atendimentoSesmit == '1') {
            $('#atendimentoBloqueado').addClass('d-none');
            $('#atendimentoLiberado').removeClass('d-none');
        } else {
            $('#atendimentoBloqueado').removeClass('d-none');
            $('#atendimentoLiberado').addClass('d-none');
        }
    }).fail(function () {
        msn('error', 'Sua sessão expirou');
        setTimeout(() => { window.location.href = "index.html" }, 1000);
    }).always(function () {
        $('#carregando').hide();
    });
};
function fechaTodosModais() {
    $('#modal-data').modal('hide');
    $('#modal-pessoal').modal('hide');
    $('#modal-ponto').modal('hide');
}
$('#folhaDePonto').click(function () {
    $('#modal-ponto').modal('show');
});
$('#contraCheque').click(function () {
    $('#modal-data').modal('show');
});
$('#fechaModalData').click(function () {
    $('#modal-data').modal('hide');
});
$('#fechaModalPonto').click(function () {
    $('#modal-ponto').modal('hide');
});
$('#fechaModalPessoal').click(function () {
  console.log('fechaModalPessoal');
    let id = $("#idEvento").val();
    vagasOcupadas(id);
    fechaTodosModais();
    getPessoalIdEvento();
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
$("#visualizarServidor").on("click", function () {
    var codfunc = $('#listaPessoal option:selected').val();
    $('#listaSolicitacoesCadastradas').html("");
    $('#listaSolicitacoesHomologadas').html("");
    getPessoaDadosFuncionais(codfunc);
});
$('#listaPessoal').click(function () {
    $('#visualizarServidor').removeAttr('disabled');
    $('#btnMatriculaCpfNome').attr("disabled", "disabled");
    $('#textMatriculaCpfNome').val('');
});
$('#listaPessoalNome').click(function () {
    $('#visualizarServidor').removeAttr('disabled');
    $('#btnMatriculaCpfNome').attr("disabled", "disabled");
    $('#textMatriculaCpfNome').val('');

});
$('#fichaFuncional').click(function () {
    idInfo = $('#idInfo').val();
    link = 'relatorio/getRelHistoricoFuncional';
    $('#carregandoModal').show();
    $('#print-iframe').attr('src', 'acoes/print.php?0=' + idInfo + '&link=' + link + '&acesso=relatFichaFuncional');
    $('#print-iframe').attr('src', $('#print-iframe').attr('src'));

    setTimeout(() => { $("#print-iframe").get(0).contentWindow.print() }, 2000);
    setTimeout(() => { $('#carregandoModal').hide() }, 2000);
});

$('#atribuicaoDeCargo').click(function () {
    idHistFunc = $('#idHistFunc').val();
    link = 'relatorio/getRelAtribuicoesCargoPorFuncional';
    $('#carregandoModal').show();
    $('#print-iframe').attr('src', 'acoes/print.php?0=' + idHistFunc + '&link=' + link + '&acesso=relatAtribuicoesCargo');
    $('#print-iframe').attr('src', $('#print-iframe').attr('src'));

    setTimeout(() => { $("#print-iframe").get(0).contentWindow.print() }, 2000);
    setTimeout(() => { $('#carregandoModal').hide() }, 2000);
});

$('#contraChequeImprimir').click(function () {
    $('#modal-data').modal('hide');
    pessoalCodFunc = $('#pessoalCodFunc').val();
    mesAno = $('#mesAno').val();
    if (!mesAno) {
        msn('error', 'Preencha o campo data');
    } else {
        link = 'relatorio/getRelContraCheque';
        $('#carregandoModal').show();
        $('#print-iframe').attr('src', 'acoes/print.php?0=' + pessoalCodFunc + '&1=' + mesAno + '-01&link=' + link + '&acesso=relatContraCheque');
        $('#print-iframe').attr('src', $('#print-iframe').attr('src'));

        setTimeout(() => { $("#print-iframe").get(0).contentWindow.print() }, 2000);
        setTimeout(() => { $('#carregandoModal').hide() }, 2000);
    }
});
$('#folhaDePontoImprimir').click(function () {
    $('#modal-ponto').modal('hide');
    pessoalCodFunc = $('#pessoalCodFunc').val();
    mesAnoInicial = $('#mesAnoInicial').val();
    mesAnoFinal = $('#mesAnoFinal').val();
    if (!mesAnoInicial) {
        msn('error', 'Preencha o campo data inicial');
    } else {
        if (!mesAnoFinal) {
            msn('error', 'Preencha o campo data final');
        } else {
            link = 'relatorio/getRelMarcacaoServidorEmLote';
            $('#carregandoModal').show();
            $('#print-iframe').attr('src', 'acoes/print.php?0=' + mesAnoInicial + '&1=' + mesAnoFinal + '&2=' + pessoalCodFunc + '&link=' + link + '&acesso=relatFolhaPonto');
            $('#print-iframe').attr('src', $('#print-iframe').attr('src'));

            setTimeout(() => { $("#print-iframe").get(0).contentWindow.print() }, 2000);
            setTimeout(() => { $('#carregandoModal').hide() }, 2000);
        }
    }
});
$("#atendimentoBtn").on("click", function () {
    buscaEnderecoIdInfo();
    listaRequerimentoIdInfo();
});
$("#homologadoBtn").on("click", function () {
    listaRequerimentoHomologadoIdInfo();
  });
function buscaEnderecoIdInfo() {
    let id = $("#idInfo").val();
    $.ajax({
        url: "acoes/endereco/buscaEnderecoIdInfo.php?id=" + id,
        method: "GET",
        dataType: "json",
    })
        .done(function (result) {
            var total = result.length;
            if (total > 0) {
                $("#idCelular").val(result[0].celular)
                $("#idTelefone").val(result[0].telefone)
                $("#idEmail").val(result[0].email)
                $('#cardEndereco').attr("class", "card collapsed-card card-success")
                $('#cardEnderecoTitulo').text("Endereço - Cadastrado")
            }
        })
        .fail(function () {
            //$(location).attr("href", "index.html");
        })
        .always(function () {
            $("#carregando").hide();
        });
}
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
    }else if(acao[1] == 'Perícia Preenchida'){
    }else{
        $('#medicosAtivosDataNaAgenda').html('')
        $('#vagasDisponibilizadas').val('')
        $('#vagasOcupadas').val('')
        $('#modalAgendamento').modal('show')
        preenchimentoMedicosAtivosCpf()
    }
});
function resumoAgendamento() {
    id_requerimento = $("#idrequerimentoSelectLi").val()
    $.ajax({
        url: "acoes/requerimento/resumoAgendamento.php?id_requerimento=" + id_requerimento,
        method: "GET",
        dataType: "json"
    }).done(function (result) {
        let data = converteDataBr(result[0].data);
        let diaSemana = diaDaSemana(data);
        $('#protocoloModalDadosDoAgendamento').text('Protocolo  ' + result[0].protocolo)
        $('#solicitacaoModalDadosDoAgendamento').text(result[0].solicitacao)
        $('#medicoModalDadosDoAgendamento').text(result[0].medico)
        $('#statusModalDadosDoAgendamento').text(result[0].status)
        $('#dataModalDadosDoAgendamento').text(data + "- " + diaSemana + " no período da " + result[0].periodo)
    });
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
function listaRequerimentoHomologadoIdInfo() {
    id = $("#idInfo").val();
    $.ajax({
      url: "acoes/requerimento/listaRequerimentoIdHomologadoInfo.php?id="+id,
      method: "GET",
      dataType: "json",
    })
      .done(function (result) {
        $('#listaSolicitacoesHomologadas').html("");
        for (var i = 0; i < result.length; i++) {
            $("#listaSolicitacoesHomologadas").prepend(
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
  $('#listaSolicitacoesHomologadas').on("click", "li", function() {
    tarefa = $(this).text();
    acao = tarefa.split(' - ')
    $('#idrequerimentoSelectLi').val($(this).val())
    if (acao[1] == 'Não Homologado'){
        $('#modalInserirProtocolo').modal('show')
    }else if(acao[1] == 'Homologado'){
      $('#modalDadosDoAgendamento').modal('show')
      $('#botoesParaRegendamento').addClass('d-none')
      $('#botoesParaImpressao').removeClass('d-none')
      resumoAgendamento()
      requerimentosStatusReAgenda()
    }else{
      $('#medicosAtivosDataNaAgenda').html('')
      $('#vagasDisponibilizadas').val('')
      $('#vagasOcupadas').val('')
      $('#modalAgendamento').modal('show')
      preenchimentoMedicosAtivosCpf()
    }
  });
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
          if(result.codigo == 0){
            result.acao = 'error'
          }
          msn(result.acao,result.mensagem);
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
  $('#medicosAtivos').change(function(){
    let cpf = $("#medicosAtivos").val()
    $("#medicosAtivosDataNaAgenda").html('');
    preenchimentoMedicosAtivosDataNaAgenda(cpf)
  });
  function preenchimentoMedicosAtivosDataNaAgenda(cpf) {
    $.ajax({
      url: "acoes/requerimento/listarMedicosAtivosDataNaAgenda.php?cpf="+cpf,
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
            "<option value=" + result[i].id + ">"+result[i].title+" dia "+ date +" - "+ result[i].periodo + "</option>"
          );
        }
      })
      .fail(function () {
        $(location).attr('href', 'index.html');
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
  $('#medicosAtivosDataNaAgenda').change(function(){
    id_agenda = $("#medicosAtivosDataNaAgenda").val();
    vagasOcupadas(id_agenda)
    vagasDisponibilizadas(id_agenda)
    setTimeout(() => {
      vd = $('#vagasDisponibilizadas').val();
      vo = $('#vagasOcupadas').val();
      vagasD = parseInt(vd);
      vagasO = parseInt(vo);
      if(vagasD > vagasO){
        $('#modalAgendamentoCadastrar').prop('disabled', false);
      }else{
        $('#modalAgendamentoCadastrar').prop('disabled', true);
      }
    }, 250);

  })
  function vagasDisponibilizadas(id_agenda) {
    $.ajax({
      url: "acoes/requerimento/vagasDisponibilizadas.php?id_agenda="+id_agenda,
      method: "GET",
      dataType: "json"
    }).done(function (result) {
      if(result.length > 0){
        $('#vagasDisponibilizadas').val(result[0].total);
      }else{
        $('#vagasDisponibilizadas').val('0');

      }
    });
  }
  $("#modalAgendamentoCadastrar").on("click", function () {
    var end = new Object()
    end.id_requerimento_status = '4';
    end.id = $("#idrequerimentoSelectLi").val()
    end.id_agenda = $("#medicosAtivosDataNaAgenda").val()
    end.id_info = $("#idInfo").val();
    end.id_requerimento_solicitacao = $("#idRequerimentoSolicitacao").val()
    end.id_requerimento_medico = $("#medicosAtivos").val()
    console.log( end.id_requerimento_medico);
    $.ajax({
      url: "acoes/requerimento/inserirAtendimento.php",
      method: "POST",
      dataType: "json",
      data: end,
    }).done(function (result) {
          if(result.codigo == 0){
            result.acao = 'error'
          }
          console.log(result.exec);
          msn(result.acao,result.mensagem);
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
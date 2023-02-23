
$(document).ready(function () {
    carregarSelect2();
    getFormFiltroSelectMedicoAgenda();

    $('#carregandoModal').hide();
    var login = JSON.parse(sessionStorage.getItem('login'));
    if(login.relatFichaFuncional == 0){
        $('#fichaFuncional').hide();
    }
    if(login.relatAtribuicoesCargo == 0){
        $('#atribuicaoDeCargo').hide();
    }
    if(login.relatFolhaPonto == 0){
        $('#folhaDePonto').hide();
    }
    if(login.relatContraCheque == 0){
        $('#contraCheque').hide();
    }
});
$(document).on("keydown", "#obsFichaMedica", function () {
  var caracteresRestantes = 499;
  var caracteresDigitados = parseInt($(this).val().length);
  var caracteresRestantes = caracteresRestantes - caracteresDigitados;

  $(".caracteres").text(caracteresRestantes);
});
function getFormFiltroSelectMedicoAgenda() {
    $.ajax({
      url: "acoes/usuario/listarNomeAtendimento.php",
      method: "GET",
      dataType: "json",
    })
      .done(function (result) {
        if (result.codigo == 0) {
          msn("error", result.mensagem);
        } else {
          $("#formFiltroSelectMedicoAgenda").prepend("<option></option>");
          for (var i = 0; i < result.length; i++) {
            $("#formFiltroSelectMedicoAgenda").prepend(
              "<option value=" + result[i].CPF + "> " + result[i].nome + "</option>"
            );
          }
        }
      }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    })
  }
  function preenchimentoMedicosAtivosDataNaAgenda(cpf) {
    $.ajax({
      url: "acoes/requerimento/listarMedicosAtivosDataNaAgenda.php?cpf="+cpf,
      method: "GET",
      dataType: "json",
    })
      .done(function (result) {
        $("#formFiltroSelectMedicoAgendaDia").html('')
        $("#formFiltroSelectMedicoAgendaDia").prepend("<option></option>");
        for (var i = 0; i < result.length; i++) {
          let date = converteDataBr(result[i].start)
          $("#formFiltroSelectMedicoAgendaDia").prepend(
            "<option value=" + result[i].id + ">"+result[i].title+" dia "+ date +" - "+ result[i].periodo + "</option>"
          );
        }
      }).fail(function() {
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    });
  }
  $('#formFiltroSelectMedicoAgenda').change(function(){
    let cpf = $('#formFiltroSelectMedicoAgenda').val();
    $('#listaAtendimentosDia').html('');
    preenchimentoMedicosAtivosDataNaAgenda(cpf);
  })
  $('#formFiltroSelectMedicoAgendaDia').change(function(){
    let id_agenda = $('#formFiltroSelectMedicoAgendaDia').val();
    preenchimentoAtendimentosDoDia(id_agenda);
  })
  function getPessoaDadosFuncionais(codfunc){
    $('#carregando').show();
    $.ajax({
        url: 'acoes/servidor/buscarCodFunc.php?codfunc='+codfunc,
        method: 'GET',
        dataType: 'json'
    }).done(function(dadosPessoal){
        $('#imgFoto').attr('src', 'http://10.40.10.233/sdgc/img/fotos/'+dadosPessoal[0].cpfs+'.bmp');
        $('#pessoalNome').val(dadosPessoal[0].nome);
        $('#pessoalNomeFoto').html(dadosPessoal[0].nome);
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
        msn('error','Sua sessão expirou');
        setTimeout(() => {  window.location.href = "index.html" }, 1000);
    }).always(function() {
        $('#carregando').hide();
        $('#carregandoModal').hide();
    });
};
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
function fechaTodosModais(){
  $('#modal-data').modal('hide');
  $('#modal-pessoal').modal('hide');
  $('#modal-ponto').modal('hide');
  $('#modalFinalizar').modal('hide');
}
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
$('#idCid10Busca').on('keyup', function() {
    var term = $(this).val();
    var url ='acoes/CID10/listaCategoriaSub.php?term='+term;
    if(term.length >= 4){
          $.ajax({
            url:url,
            type: 'POST',
            dataType: "json",
          }).done(function(result){
            var options = '';
            $.each(result, function(index, value) {
              options += '<option value="' + value.id + '">' + value.nome + '</option>';
            });
            $('#idCid10').html(options);
            $("#idCid10").prepend("<option value='' selected></option>");
            if(result.length >0){
              $('#idCid10').prop('disabled', false);
            }
          }).fail(function() {
            msn('error','Sua sessão expirou');
            setTimeout(() => {  window.location.href = "index.html" }, 1000);
          }).always(function() {
              $('#carregando').hide();
          });
      }else{
        $('#idCid10').html('');
        $('#idCid10').prop('disabled', true);
      }
  });
  
  $('#idCid10').on('change', function() {
    var values = $(this).val();
    var options = '';
    if(values != ''){
      $("#idCid10Selecionados").prepend(
        "<option selected value=" + values + "> "+values+ "</option>"
      );
      $('idCid10Selecionados option').each(function() {
        $('idCid10Selecionados option[value="' + values + '"]').not(this).remove();
      });
    }
  });
  $('#idCid10BuscaHPP').on('keyup', function() {
    var term = $(this).val();
    var url ='acoes/CID10/listaCategoriaSub.php?term='+term;
    if(term.length >= 4){
          $.ajax({
            url:url,
            type: 'POST',
            dataType: "json",
          }).done(function(result){
            var options = '';
            $.each(result, function(index, value) {
              options += '<option value="' + value.id + '">' + value.nome + '</option>';
            });
            $('#idCid10HPP').html(options);
            $("#idCid10HPP").prepend("<option value='' selected></option>");
            if(result.length >0){
              $('#idCid10HPP').prop('disabled', false);
            }
          }).fail(function() {
            msn('error','Sua sessão expirou');
            setTimeout(() => {  window.location.href = "index.html" }, 1000);
          }).always(function() {
              $('#carregando').hide();
          });
      }else{
        $('#idCid10HPP').html('');
        $('#idCid10HPP').prop('disabled', true);
      }
  });
  
  $('#idCid10HPP').on('change', function() {
    var values = $(this).val();
    var options = '';
    if(values != ''){
      $("#idCid10SelecionadosHPP").prepend(
        "<option selected value=" + values + "> "+values+ "</option>"
      );
      $('idCid10SelecionadosHPP option').each(function() {
        $('idCid10Selecionados option[value="' + values + '"]').not(this).remove();
      });
    }
  });
  $('#atualizarPericiaMedica').on("click", function() {
    console.log('teste')
    var fichaMedica = new Object()
    fichaMedica.medicamentosFichaMedica = $('#medicamentosFichaMedica').val()
    fichaMedica.CRMFichaMedica = $('#CRMFichaMedica').val()
    fichaMedica.diasAfastamentoFichaMedica = $('#diasAfastamentoFichaMedica').val()
    fichaMedica.nomeMedicoAtestado = $('#nomeMedicoAtestado').val()
    fichaMedica.obsFichaMedica = $('#obsFichaMedica').val()
    fichaMedica.id_requerimento_atendimento = $('#idRequerimentoAtendimento').val()
    fichaMedica.idCid10Selecionados = $('#idCid10Selecionados').val()
    fichaMedica.idCid10SelecionadosHPP = $('#idCid10SelecionadosHPP').val()
    $.ajax({
      url: "acoes/requerimento/atualizarRAtendimento.php",
      method: "POST",
      dataType: "json",
      data: fichaMedica
    }).done(function (result) {
          console.log(result);
          console.log('done')
          msn(result.acao,result.mensagem);
      }).fail(function () {
        console.log('fail')
      })
      .always(function () {
        $("#carregando").hide();
      });
    
  })
  $('#salvarPericiaMedica').on("click", function() {
    var fichaMedica = new Object()
    fichaMedica.idrequerimento = $('#idRequerimento').val()
    fichaMedica.idAgenda = $('#idAgenda').val()
    fichaMedica.idRequerimentoMedico = $('#formFiltroSelectMedicoAgenda').val()
    fichaMedica.medicamentosFichaMedica = $('#medicamentosFichaMedica').val()
    fichaMedica.CRMFichaMedica = $('#CRMFichaMedica').val()
    fichaMedica.diasAfastamentoFichaMedica = $('#diasAfastamentoFichaMedica').val()
    fichaMedica.nomeMedicoAtestado = $('#nomeMedicoAtestado').val()
    fichaMedica.obsFichaMedica = $('#obsFichaMedica').val()
    fichaMedica.idCid10Selecionados = $('#idCid10Selecionados').val()
    fichaMedica.idCid10SelecionadosHPP = $('#idCid10SelecionadosHPP').val()
    console.log(fichaMedica);
    $.ajax({
      url: "acoes/requerimento/inserirRAtendimento.php",
      method: "POST",
      dataType: "json",
      data: fichaMedica
    }).done(function (result) {
      console.log(result);
          //Verifica preenchimento de campo
         // if(result.codigo == 0){
         //   result.acao = 'error'
         // }
         $('#idRequerimentoAtendimento').val(result.exec.id_requerimento_atendimento);
         $('#salvarPericiaMedica').addClass('d-none')
         $('#atualizarPericiaMedica').removeClass('d-none')
         $('#abrirModalFinalizar').removeClass('d-none')
          msn(result.acao,result.mensagem);
      }).fail(function () {
        $(location).attr('href', 'index.html');
      })
      .always(function () {
        $("#carregando").hide();
      });
    
  })
  function buscarRAtendimento(idRequerimento,idAgenda) {
    var data = new Object()
    data.idRequerimento = idRequerimento;
    data.idAgenda = idAgenda;
    $.ajax({
      url: "acoes/requerimento/buscarRAtendimento.php",
      method: "GET",
      dataType: "json",
      data: data
    }).done(function (result) {
      if(result.length>0){
        $('#medicamentosFichaMedica').val(result[0].medicamentosFichaMedica)
        $('#CRMFichaMedica').val(result[0].CRMFichaMedica)
        $('#diasAfastamentoFichaMedica').val(result[0].diasAfastamentoFichaMedica)
        $('#nomeMedicoAtestado').val(result[0].nomeMedicoAtestado)
        $('#obsFichaMedica').val(result[0].obsFichaMedica)
        $('#idRequerimentoAtendimento').val(result[0].id)
        $('#salvarPericiaMedica').addClass('d-none')
        $('#atualizarPericiaMedica').removeClass('d-none')
        $('#abrirModalFinalizar').removeClass('d-none')
        buscarRAtendimentoCid(result[0].id)
        buscarRAtendimentoCidHPP(result[0].id)
      }else{
        $('#salvarPericiaMedica').removeClass('d-none')
        $('#atualizarPericiaMedica').addClass('d-none')
        $('#abrirModalFinalizar').addClass('d-none')   
      }
    });
  }
  function buscarRAtendimentoCidHPP(id_requerimento_atendimento) {
    var data = new Object()
    data.id_requerimento_atendimento = id_requerimento_atendimento;
    data.HPP = 1;
    $.ajax({
      url: "acoes/requerimento/buscarRAtendimentoCid.php",
      method: "GET",
      dataType: "json",
      data: data
    }).done(function (result) {
      if(result.length>0){
        console.log(result)
        var options = '';
        $.each(result, function(index, value) {
          options += '<option selected value="' + value.CID10 + '">' + value.CID10 + '</option>';
        });
        $('#idCid10SelecionadosHPP').html(options);
      }
    });
  }
  function buscarRAtendimentoCid(id_requerimento_atendimento) {
    var data = new Object()
    data.id_requerimento_atendimento = id_requerimento_atendimento;
    data.HPP = 0;
    $.ajax({
      url: "acoes/requerimento/buscarRAtendimentoCid.php",
      method: "GET",
      dataType: "json",
      data: data
    }).done(function (result) {
      if(result.length>0){
        console.log(result)
        var options = '';
        $.each(result, function(index, value) {
          options += '<option selected value="' + value.CID10 + '">' + value.CID10 + '</option>';
        });
        $('#idCid10Selecionados').html(options);
      }
    });
  }
  
  $('#abrirModalFinalizar').on("click", function() {
    console.log('abrirModalFinalizar');
    $('#modalFinalizar').modal('show');
  });

  $('#modalFinalizarCancelar').on("click", function() {
    console.log('modalFinalizarCancelar');
    $('#modalFinalizar').modal('hide');
  });
  $('#modalFinalizarConfirmar').on("click", function() {
      var fichaMedica = new Object()
      fichaMedica.idrequerimento = $('#idRequerimento').val()
      fichaMedica.id_requerimento_status = $('#idRequerimentoStatus').val()
      fichaMedica.idAgenda = $('#idAgenda').val()
      fichaMedica.idRequerimentoMedico = $('#formFiltroSelectMedicoAgenda').val()
      fichaMedica.medicamentosFichaMedica = $('#medicamentosFichaMedica').val()
      fichaMedica.CRMFichaMedica = $('#CRMFichaMedica').val()
      fichaMedica.diasAfastamentoFichaMedica = $('#diasAfastamentoFichaMedica').val()
      fichaMedica.nomeMedicoAtestado = $('#nomeMedicoAtestado').val()
      fichaMedica.obsFichaMedica = $('#obsFichaMedica').val()
      fichaMedica.idCid10Selecionados = $('#idCid10Selecionados').val()
      fichaMedica.idCid10SelecionadosHPP = $('#idCid10SelecionadosHPP').val()
      fichaMedica.idRequerimentoAtendimento = $('#idRequerimentoAtendimento').val()
      console.log(fichaMedica);
      $.ajax({
        url: "acoes/requerimento/finalizarRAtendimento.php",
        method: "POST",
        dataType: "json",
        data: fichaMedica
      }).done(function (result) {
            console.log(result);
            fechaTodosModais();
            preenchimentoAtendimentosDoDia($('#idAgenda').val());
            msn(result.acao,result.mensagem);
        }).fail(function () {
          console.log('fail');
          //$(location).attr('href', 'index.html');
        })
        .always(function () {
          $("#carregando").hide();
        });
  })

  
  $('#listaAtendimentosDia').on("click", "tr", function() {
    //Limpa campos do formulario
    $('#idrequerimento').val('')
    $('#idAgenda').val('')
    $('#medicamentosFichaMedica').val('')
    $('#CRMFichaMedica').val('')
    $('#diasAfastamentoFichaMedica').val('')
    $('#nomeMedicoAtestado').val('')
    $('#obsFichaMedica').val('')
    $('#idCid10Selecionados').html('')
    $('#idCid10SelecionadosHPP').html('')

    //Capturando dados
    var requerimento = new Object()
    requerimento.idrequerimento = $(this).find("td:first").text();
    requerimento.id_historico_funcional = $(this).find("td:eq(1)").text();
    requerimento.nome = $(this).find("td:eq(3)").text();
    requerimento.solicitacao = $(this).find("td:eq(4)").text();
    requerimento.id_agenda = $(this).find("td:eq(5)").text();
    
    //Aplicando os dados
    $('#idRequerimento').val(requerimento.idrequerimento);
    $('#idAgenda').val(requerimento.id_agenda);
    buscarRAtendimento(requerimento.idrequerimento, requerimento.id_agenda)
    getPessoaDadosFuncionais(requerimento.id_historico_funcional);
    
  });
  function preenchimentoAtendimentosDoDia(id) {
    let url = "acoes/requerimento/listaRequerimentoIdAgenda.php?id="+id;
    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
    })
      .done(function (result) {
        $("#listaAtendimentosDia").html('');
        for (var i = 0; i < result.length; i++) {
          let data = converteDataBr(result[i].data);
          $("#listaAtendimentosDia").prepend(
            "<tr style='cursor: pointer;'>"+
              "<td>"+
                "<div class='icheck-primary d-none'>"+
                  "<label for='check1'>"+result[i].id+"</label>"+
                "</div>"+
              "</td>"+
              "<td>"+
                "<label for='check1'>"+result[i].matricula+"</label>"+
              "</td>"+
              "<td class='mailbox-star'>"+
                "<a><i class='fas fa-"+result[i].btnIcone+" text-"+result[i].classifica+"'></i></a>"+
              "</td>"+
              "<td class='mailbox-name'>"+
                "<a>"+result[i].paciente+"</a>"+
              "</td>"+
              "<td class='mailbox-subject'>"+
                "<b>"+result[i].solicitacao+"</b>"+
              "</td>"+
              "<td class='mailbox-subject d-none'>"+
                "<b>"+result[i].id_agenda+"</b>"+
              "</td>"+
              "<td class='mailbox-attachment'></td>"+
              "<td class='mailbox-date'>"+data+"</td>"+
            "</tr>"
          )
      }
    }).fail(function() {
      msn('error','Sua sessão expirou');
      setTimeout(() => {  window.location.href = "index.html" }, 1000);
    });
  }
  
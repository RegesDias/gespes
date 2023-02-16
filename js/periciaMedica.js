
$(document).ready(function () {
    carregarSelect2();
    getFormFiltroSelectMedicoAgenda();
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
      });
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
    });
  }
  function preenchimentoAtendimentosDoDia(id) {
    let url = "acoes/requerimento/listaRequerimentoIdAgenda.php?id="+id;
    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
    })
      .done(function (result) {
        $("#listaAtendimentosDia").html('');
        console.log(url);
        for (var i = 0; i < result.length; i++) {
          console.log(result);
          let data = converteDataBr(result[i].data);
          $("#listaAtendimentosDia").prepend(
            "<tr style='cursor: pointer;'>"+
              "<td>"+
                "<div class='icheck-primary d-none'>"+
                  "<label for='check1'>"+result[i].id+"</label>"+
                "</div>"+
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
              "<td class='mailbox-attachment'></td>"+
              "<td class='mailbox-date'>"+data+"</td>"+
            "</tr>"
          )
      }
    });
  }
  $('#formFiltroSelectMedicoAgenda').change(function(){
    let cpf = $('#formFiltroSelectMedicoAgenda').val();
    console.log(cpf)
    preenchimentoMedicosAtivosDataNaAgenda(cpf);
  })
  $('#formFiltroSelectMedicoAgendaDia').change(function(){
    let id_agenda = $('#formFiltroSelectMedicoAgendaDia').val();
    console.log(id_agenda)
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
$(document).ready(function(){
  $('#carregandoModal').hide();
  getPessoalNome();
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
  $('#listaAtendimentosDia').on("click", "tr", function() {
    var paciente = new Object()
    paciente.id = $(this).find("td:first").text();
    paciente.nome = $(this).find("td:eq(2)").text();
    paciente.solicitacao = $(this).find("td:eq(3)").text();
    console.log(paciente);
    getPessoaDadosFuncionais()
    
    //if (valor == 'Aguardando Protocolo'){
//
  //  }else if(valor == 'Perícia Agendada'){
    //}else{

    //}
  });
  
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
        console.log(result);
        if(result.id == 0){
          msn('error','Servidor já possue endereço salvo!');
        }else{
          msn('success','Solicitacao salva com sucesso!');
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
            "<li>"+
            "<span class='text'>"+result[i].solicitacao+"</span>"+
            "<small class='badge badge-danger'><i class='far fa-clock'></i> "+result[i].status+"</small>"+
                "<div class='tools'>"+
                    "<i class='fas fa-edit'></i>"+
                    "<i class='fas fa-trash-o'></i>"+
                "</div>"+
            "</li>"
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
  $(document).on("click", "li", function() {
    alert($(this).text());
   });
  $("#atendimentoBtn").on("click", function () {
    listaRequerimentoIdInfo()
    preenchimentoSelectEstado()
    buscaEnderecoIdInfo()
    preenchimentoSelectSolicitacao()
});
function limpaLista(objSelect) {
    while (objSelect.lu.length > 0) {
      objSelect.lu[0] = null;
    }
  }
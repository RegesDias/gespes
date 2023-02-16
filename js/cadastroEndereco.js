$("#atendimentoBtn").on("click", function () {
  buscapreenchimentoSelectEstadoTodos()
  buscaEnderecoIdInfo()
  listaRequerimentoIdInfo()
  preenchimentoSelectSolicitacao()
});
$(document).ready(function () {
  $("#idCep").blur(function () {
    var cep = $(this)
      .val()
      .replace(/[^0-9]/, "");
    if (cep) {
      buscarCEP(cep);
    } else {
      preenchimentoSelectEstado();
      limpaSelect(idEstado);
      limpaSelect(idCidade);
      limpaSelect(idBairro);
      $("#idLogradouro").val("");
    }
  });
});
$("#idEstado").change(function () {
  limpaSelect(idCidade);
  preenchimentoSelectCidadeIdBairro($("#idEstado").val());
});
$("#idCidade").change(function () {
  limpaSelect(idBairro);
  preenchimentoSelectBairroIdCidade($("#idCidade").val());
});

$("#enderecoSalvar").on("click", function () {
  var end = new Object()
  end.id_info = $("#idInfo").val()
  end.cep_logradouro = $("#idCep").val().replace(/[^0-9]/g, "")
  end.id_bairro = $("#idBairro").val()
  end.endereco = $("#idLogradouro").val()
  end.numero = $("#idNumero").val().replace(/[^0-9]/g,'')
  end.celular = $("#idCelular").val().replace(/[^0-9]/g,'')
  end.telefone = $("#idTelefone").val().replace(/[^0-9]/g,'')
  end.email = $("#idEmail").val()
  end.complemento = $("#idComplemento").val()
  $.ajax({
    url: "acoes/endereco/salvarEndereco.php",
    method: "POST",
    dataType: "json",
    data: end,
  })
    .done(function (result) {
      if(result.id == 0){
        msn('error','Servidor já possue endereço salvo!');
      }else{
        $('#idEndereco').val(result.id);
        msn('success','Endereço salvo com sucesso!');
        $('#enderecoSalvar').addClass("d-none");
        $('#enderecoAtualizar').removeClass("d-none");
        $('#cardEndereco').attr("class", "card collapsed-card card-success")
        $('#cardEnderecoTitulo').text("Endereço - Cadastrado")
        $('#exibeTipoRequerimento').removeClass("d-none");
      }
    })
    .fail(function () {
      //$(location).attr('href', 'index.html');
    })
    .always(function () {
      $("#carregando").hide();
    });
});
$("#enderecoAtualizar").on("click", function () {
  var end = new Object()
  end.id = $("#idEndereco").val()
  end.id_info = $("#idInfo").val()
  end.cep_logradouro = $("#idCep").val().replace(/[^0-9]/g, "")
  end.id_bairro = $("#idBairro").val()
  end.endereco = $("#idLogradouro").val()
  end.numero = $("#idNumero").val().replace(/[^0-9]/g,'')
  end.celular = $("#idCelular").val().replace(/[^0-9]/g,'')
  end.telefone = $("#idTelefone").val().replace(/[^0-9]/g,'')
  end.email = $("#idEmail").val()
  end.complemento = $("#idComplemento").val()
  $.ajax({
    url: "acoes/endereco/atualizarEndereco.php",
    method: "POST",
    dataType: "json",
    data: end,
  })
    .done(function (result) {
      if(result.id == 0){
        msn('error','Servidor já possue endereço salvo!');
      }else{
        msn('success','Endereço salvo com sucesso!');
      }
    })
    .fail(function () {
      //$(location).attr('href', 'index.html');
    })
    .always(function () {
      $("#carregando").hide();
    });
});
function buscaEnderecoIdInfo() {
  let id = $("#idInfo").val();
  $.ajax({
    url: "acoes/endereco/buscaEnderecoIdInfo.php?id="+id,
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      var total = result.length;
      if (total > 0) {
        $('#idCep').val(result[0].cep_logradouro)
        $("#idLogradouro").val(result[0].endereco)
        $("#idNumero").val(result[0].numero)
        $("#idCelular").val(result[0].celular)
        $("#idTelefone").val(result[0].telefone)
        $("#idEmail").val(result[0].email)
        $("#idComplemento").val(result[0].complemento)
        $('#idEndereco').val(result[0].id);
        buscarCEP(result[0].cep_logradouro)
        $('#enderecoSalvar').addClass("d-none");
        $('#enderecoAtualizar').removeClass("d-none");
        $('#exibeTipoRequerimento').removeClass("d-none");
        $('#cardEndereco').attr("class", "card collapsed-card card-success")
        $('#cardEnderecoTitulo').text("Endereço - Cadastrado")

      }else{
        $('#idCep').val('')
        $("#idLogradouro").val('')
        $("#idNumero").val('')
        $("#idCelular").val('')
        $("#idTelefone").val('')
        $("#idEmail").val('')
        $("#idComplemento").val('')
        $('#idEndereco').val('');
        buscapreenchimentoSelectEstadoTodos();
        limpaSelect(idCidade);
        limpaSelect(idBairro);
        $('#enderecoSalvar').removeClass("d-none");
        $('#enderecoAtualizar').addClass("d-none");
        $('#cardEndereco').attr("class", "card card-primary")
        $('#cardEnderecoTitulo').text("Endereço")
        $('#exibeTipoRequerimento').addClass("d-none")
      }
    })
    .fail(function () {
      //$(location).attr("href", "index.html");
    })
    .always(function () {
      $("#carregando").hide();
    });
}
function buscarCEP(cep){
  $.ajax({
    url: "acoes/endereco/buscaCEP.php?cep=" + cep,
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      var total = result.length;
      if (total > 0) {
        limpaSelect(idEstado);
        limpaSelect(idCidade);
        limpaSelect(idBairro);
        buscapreenchimentoSelectEstado(result[0].idEstado);
        preenchimentoSelectCidadeId(result[0].idCidade);
        preenchimentoSelectBairroId(result[0].idBairro);
        $("#idLogradouro").val(result[0].logradouro);
      }
    })
    .fail(function () {
      //$(location).attr('href', 'index.html');
    })
    .always(function () {
      $("#carregando").hide();
    });
}
function preenchimentoSelectBairroIdCidade(id) {
  $.ajax({
    url: "acoes/endereco/listaBairrosIdCidade.php?id=" + id,
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      for (var i = 0; i < result.length; i++) {
        $("#idBairro").prepend(
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
function buscapreenchimentoSelectEstadoTodos() {
  $.ajax({
    url: "acoes/endereco/listaEstadosTodos.php?",
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      for (var i = 0; i < result.length; i++) {
        $("#idEstado").prepend(
          "<option value=" + result[i].id + "> " + result[i].UF + "</option>"
        );
      }
    })
    .fail(function () {
      $(location).attr("href", "index.html");
    })
    .always(function () {
      $("#carregando").hide();
    });
}
function buscapreenchimentoSelectEstado(id) {
  $.ajax({
    url: "acoes/endereco/listaEstados.php?id=" + id,
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      for (var i = 0; i < result.length; i++) {
        $("#idEstado").prepend(
          "<option value=" + result[i].id + "> " + result[i].UF + "</option>"
        );
      }
    })
    .fail(function () {
      $(location).attr("href", "index.html");
    })
    .always(function () {
      $("#carregando").hide();
    });
}
function preenchimentoSelectSolicitacao() {
  $.ajax({
    url: "acoes/requerimento/listaRSolicitacoes.php",
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      $("#idRequerimentoSolicitacao").html('')
      for (var i = 0; i < result.length; i++) {
        $("#idRequerimentoSolicitacao").prepend(
          "<option value=" + result[i].id + "> " + result[i].item + "</option>"
        );
      }
    })
    .fail(function () {
      $(location).attr("href", "index.html");
    })
    .always(function () {
      $("#carregando").hide();
    });
}
function preenchimentoSelectEstado() {
  $.ajax({
    url: "acoes/endereco/listaEstados.php",
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      for (var i = 0; i < result.length; i++) {
        $("#idEstado").prepend(
          "<option value=" + result[i].id + "> " + result[i].UF+ "</option>"
        );
      }
    })
    .fail(function () {
      $(location).attr("href", "index.html");
    })
    .always(function () {
      $("#carregando").hide();
    });
}
function preenchimentoSelectCidadeId(id) {
  $.ajax({
    url: "acoes/endereco/listaCidadesId.php?id=" + id,
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      for (var i = 0; i < result.length; i++) {
        $("#idCidade").prepend(
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
function preenchimentoSelectCidadeIdBairro(id) {
  $.ajax({
    url: "acoes/endereco/listaCidadesIdEstado.php?id=" + id,
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      for (var i = 0; i < result.length; i++) {
        $("#idCidade").prepend(
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
function preenchimentoSelectBairroId(id) {
  $.ajax({
    url: "acoes/endereco/listaBairrosId.php?id=" + id,
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      for (var i = 0; i < result.length; i++) {
        $("#idBairro").prepend(
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
function limpaSelect(objSelect) {
  while (objSelect.options.length > 0) {
    objSelect.options[0] = null;
  }
}

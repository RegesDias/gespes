
$(document).ready(function () {
    carregarSelect2();
    getFormFiltroSelectMedicoAgenda();
    });
$('#formFiltroSelectMedicoAgenda').change(function(){
    $('#testeCarrega').load( 'html/agenda/controleEventos.html' );
    setTimeout(() => {
        var formFiltroSelectMedicoAgenda = $('#formFiltroSelectMedicoAgenda').val();
        $("#formFiltroSelectUsuario").val(formFiltroSelectMedicoAgenda).change();
    }, 250); 

})
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
          preenchimentoSelectUsuario(result);
        }
      })
      .fail(function () {
        msn("error", "Sua sessão expirou");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      })
      .always(function () {
        $("#carregando").hide();
      });
  }
  function preenchimentoSelectUsuario(result) {
    $("#encaminharResponsavel").empty();
    $("#formFiltroSelectMedicoAgenda").prepend("<option></option>");
  
    for (var i = 0; i < result.length; i++) {
      $("#formFiltroSelectMedicoAgenda").prepend(
        "<option value=" + result[i].CPF + "> " + result[i].nome + "</option>"
      );
    }
  }

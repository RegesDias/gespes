function msn(icon, title) {
  var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  Toast.fire({
      icon: icon,
      title: title
    });
};
function selectDouble(a,b){
  for (var i=0,j=a.options.length; i<j; i++){
      b.options[i].selected=a.options[i].selected;
  }
}
function converteDataUS(codfunc){
  dia = String(data.getDate()).padStart(2, '0');
  mes = String(data.getMonth() + 1).padStart(2, '0');
  ano = data.getFullYear();
  dataConvertida = ano + '-' + mes + '-' + dia;
  return dataConvertida;
}
function sair() {
  $('#carregando').show();
  $.ajax({
      url: 'acoes/logoff.php',
      method: 'GET',
      dataType: 'json'
  }).done(function(result){
      $(location).attr('href', 'index.html');
  }).fail(function() {
      $(location).attr('href', 'index.html');
  }).always(function() {
      $('#carregando').hide();
  });
};
$(document).ready(function(){
  var log = JSON.parse(sessionStorage.getItem('nome'));
  $('#carregando').hide();
  $('#logoDireita').hide();
  $('#nomeUsuarioLogado').html(log.nome);
});
$("#consultaPessoal").on("click", function() {
    $('#principal').load( 'pessoal/consultar.html' );
    $('#logoDireita').show();
});
$("#atendimentoAgenda").on("click", function() {
  $('#principal').load( 'atendimento/agenda.html' );
  $('#logoDireita').show();
});

$("#sairSistema").on("click", function() {
  sair()
});
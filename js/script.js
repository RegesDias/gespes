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
function converteDataUS(data){
  dia = String(data.getDate()).padStart(2, '0');
  mes = String(data.getMonth() + 1).padStart(2, '0');
  ano = data.getFullYear();
  dataConvertida = ano + '-' + mes + '-' + dia;
  return dataConvertida;
}
function converteDataHoraBr(d) {
  var data = new Date(d),
      dia = data.getDate(),
      mes = data.getMonth() + 1,
      ano = data.getFullYear(),
      hora = data.getHours(),
      minutos = data.getMinutes(),
      segundos = data.getSeconds();
  return [dia, mes, ano].join('/') + ' ' + [hora, minutos, segundos].join(':');
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
    $('#principal').load( 'html/pessoal/consultar.html' );
    $('#logoDireita').show();
});
$("#consultausuario").on("click", function() {
  $('#principal').load( 'html/usuario/consultar.html' );
  $('#logoDireita').show();
});
$("#atendimentoAgenda").on("click", function() {
  $('#principal').load( 'html/atendimento/agenda.html' );
  $('#logoDireita').show();
});
$("#atendimentoEntrada").on("click", function() {
  $('#principal').load( 'html/atendimento/entrada.html' );
  $('#logoDireita').show();
});
$("#alterarSenha").on("click", function() {
  $('#principal').load( 'html/usuario/alterarSenha.html' );
  $('#logoDireita').show();
});

$("#sairSistema").on("click", function() {
  sair()
});
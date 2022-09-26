function msn(icon, title) {
  var Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 3000
  });
  Toast.fire({
      icon: icon,
      title: title
    });
};
function addZero(num, len) {
    var numberWithZeroes = String(num);
    var counter = numberWithZeroes.length;
    while(counter < len) {
        numberWithZeroes = "0" + numberWithZeroes;
        counter++;
    }
    return numberWithZeroes;
}
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
    if(d != undefined) {
      let split = d.split(' '); //separa a data da hora
      let date = split[0].split('-');
      dataHoraBr = date[2]+'-'+date[1]+'-'+date[0]+' '+split[1];
      return dataHoraBr;
    }else{
      return d;
    }
}
function converteBooleanEmNumero(dado) {
  if (dado == true){
    return '1';
  }else{
    return '0';
  }
}
function converteNumeroEmBoolean(dado) {
  if (dado == '1'){
    return true;
  }else{
    return false;
  }
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
$("#consultaPessoal").on("click", function() {
    $('#principal').load( 'html/pessoal/consultar.html' );
    $('#logoDireita').show();
});
$("#consultausuario").on("click", function() {
  $('#principal').load( 'html/usuario/consultar.html' );
  $('#logoDireita').show();
});
$("#consultaSetores").on("click", function() {
  $('#principal').load( 'html/setores/consultar.html' );
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
$(document).ready(function(){
  var login = JSON.parse(sessionStorage.getItem('login'));
  $('#carregando').hide();
  $('#logoDireita').hide();
  $('#fotoUsuarioLogado').attr('src', 'http://10.40.10.233/sdgc/img/fotos/'+login.CPF+'.bmp');
  $('#nomeUsuarioLogado').html(login.nome);
  $('#versao').html(login.versao);
  if(login.consultaPessoal == 0){
    $('#consultaPessoal').hide();
  }
  if(login.usuarios == 0){
    $('#consultausuario').hide();
  }
  if(login.atendimentoEntrada == 0){
    $('#atendimentoEntrada').hide();
  }
  if(login.atendimentoAgenda == 0){
    $('#atendimentoAgenda').hide();
  }
  if(login.alterarSenha == 0){
    $('#alterarSenha').hide();
  }
  if(login.usuarios == 0){
    $('#consultausuario').hide();
  }
  if(login.setor == 0){
    $('#consultaSetores').hide();
  }
  if((login.atendimentoEntrada == 0)&(login.atendimentoAgenda == 0)){
    $('#dropdownSubMenuAtendimento').hide();
  }
  if((login.usuarios == 0)&(login.setor == 0)){
    $('#dropdownSubMenuAdministrar').hide();
  }
});
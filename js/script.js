function validarCPF(cpf){

  if( cpf.length == 11 ){
      var v = [];

      //Calcula o primeiro dígito de verificação.
      v[0] = 1 * cpf[0] + 2 * cpf[1] + 3 * cpf[2];
      v[0] += 4 * cpf[3] + 5 * cpf[4] + 6 * cpf[5];
      v[0] += 7 * cpf[6] + 8 * cpf[7] + 9 * cpf[8];
      v[0] = v[0] % 11;
      v[0] = v[0] % 10;

      //Calcula o segundo dígito de verificação.
      v[1] = 1 * cpf[1] + 2 * cpf[2] + 3 * cpf[3];
      v[1] += 4 * cpf[4] + 5 * cpf[5] + 6 * cpf[6];
      v[1] += 7 * cpf[7] + 8 * cpf[8] + 9 * v[0];
      v[1] = v[1] % 11;
      v[1] = v[1] % 10;

      //Retorna Verdadeiro se os dígitos de verificação são os esperados.
      if ( (v[0] != cpf[9]) || (v[1] != cpf[10]) ){
          return false;
      }
  }else{
      return false
  }
  return true;
};
function rgb2hex(rgb){
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" +
   ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
 }
 function hex2rgb (hex){
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 'rgb('+r+','+g+','+b+')';
  //return { r, g, b };
}
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
$(function(){
   $(".limit").each(function (i) {
       var text = $(this).text();
       var len = text.length;
       if (len > 80) {
           var query = text.split(" ", 10);
           query.push('...');
           res = query.join(' ');
           $(this).text(res);
       }
    });
});
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
function dataAtual(tipo,tag) {
  var data = new Date(),
      dia  = data.getDate(),
      mes  = data.getMonth() + 1,
      ano  = data.getFullYear();
      if (tipo == 'br'){
        return [dia, mes, ano].join(tag);
      }
      if (tipo == 'us'){
        return [ano, mes, dia].join(tag);
      }
}
function dataPrimeiroDiaDoMes(tipo,tag) {
  var data = new Date(),
      dia  = '01',
      mes  = data.getMonth() + 1,
      ano  = data.getFullYear();
      if (tipo == 'br'){
        return [dia, mes, ano].join(tag);
      }
      if (tipo == 'us'){
        return [ano, mes, dia].join(tag);
      }
}
function conversaoDataString(data) {
  return data.replace('T',' ').substr(0, data.length - 6);
}
function conversaoDataStringSemHora(data) {
  return data.replace('T',' ').substr(0, data.length - 15);
}

function converteDataUS(d){
  let date = d.toString().split('-');
  dataUS = date[0]+'-'+date[1]+'-'+date[2];
  return dataUS;
}
function converteDataBr(d){
  if(d == null){return d;}
  let removeHora = d.toString().split(' ');
  let date = removeHora[0].toString().split('-');
  dataHoraBr = date[2]+'-'+date[1]+'-'+date[0];
  return dataHoraBr;
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
function carregarSelect2() {
  //Initialize Select2 Elements
  $('.select2').select2()

  //Initialize Select2 Elements
  $('.select2bs4').select2({
    theme: 'bootstrap4'
  })
}
$("#atendimentoAgenda").on("click", function() {
  $('#principal').load( 'html/agenda/consultar.html' );
  $('#logoDireita').show();
});

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
$("#protocolo").on("click", function() {
  $('#principal').load( 'html/protocolo/consultar.html' );
  $('#logoDireita').show();
});
$("#atendimentoEntrada").on("click", function() {
  $('#principal').load( 'html/atendimento/entrada.html' );
  $('#logoDireita').show();
});
$("#alterarSenha").on("click", function() {
  $('#principal').load( 'html/usuario/alterarSenha.html');
  $('#logoDireita').show();
});

$("#sairSistema").on("click", function() {
  sair()
});

$(document).ready(function(){
  var login = JSON.parse(sessionStorage.getItem('login'));
  $('#fotoUsuarioLogado').attr('src', 'http://10.40.10.233/sdgc/img/fotos/'+login.CPF+'.bmp');
  $('#carregando').hide();
  $('#logoDireita').hide();
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
  if(login.protocolo == 0){
    $('#protocolo').hide();
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
  if((login.protocolo == 0)&(login.atendimentoAgenda == 0)){
    $('#dropdownSubMenuAtendimento').hide();
  }
  if((login.usuarios == 0)&(login.setor == 0)){
    $('#dropdownSubMenuAdministrar').hide();
  }
});
function geraGraficoArea(label,data, tipo) {
  var areaChartCanvas = $('#areaChart').get(0).getContext('2d');
  var areaChartData = {
    labels  : label,
    datasets: [
      {
        label               : 'Documentos',
        backgroundColor     : 'rgba(60,141,188,0.9)',
        borderColor         : 'rgba(60,141,188,0.8)',
        pointRadius          : false,
        pointColor          : '#3b8bba',
        pointStrokeColor    : 'rgba(60,141,188,1)',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data                : data
      }
    ]
  }

  var areaChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines : {
          display : false,
        }
      }],
      yAxes: [{
        gridLines : {
          display : false,
        }
      }]
    }
  }

  // This will get the first returned node in the jQuery collection.
  new Chart(areaChartCanvas, {
    type: tipo,
    data: areaChartData,
    options: areaChartOptions
  })

}


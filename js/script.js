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
$(document).ready(function(){
 $('#carregando').hide();
 $('#logoDireita').hide();
});
$("#consultaPessoal").on("click", function() {
    $('#principal').load( 'pessoal/consultar.html' );
    $('#logoDireita').show();
});
$("#sairSistema").on("click", function() {
  $(location).attr('href', 'index.html');
});
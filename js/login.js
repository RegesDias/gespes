
	$('#btn-login').on("click", function(){
        var vemail = $('#email').val();
        var vsenha = $('#senha').val();
        var data = {email:vemail, senha:vsenha }
        login(data);
    });
	$(document).keypress(function(event) {
		if (event.keyCode === 13) {
		  event.preventDefault();
		  $('#btn-login').click(); 
		}
	});
	$('#btn-alterar-senha').on("click", function(){
        var vemail = $('#email').val();
        var vsenha = $('#senha').val();
		var vsenhaNovaSenha = $('#senhaNovaSenha').val();
		var vsenhaNovaSenha2 = $('#senhaNovaSenha2').val();
		var data = {email:vemail, senha:vsenha, senhaNovaSenha:vsenhaNovaSenha, senhaNovaSenha2:vsenhaNovaSenha2 }
        alterarSenha(data);
    });
    function login(data){
		$.ajax({
			type : 'POST',
			url  : 'acoes/login.php',
			data : data,
			dataType: 'json',
		}).done(function(response){				
				if(response.codigo == "1"){
                    msn('success',response.mensagem);
					var log = {
								'id': response.id,
								'nome': response.nome,
								'CPF': response.CPF,
								'idSetor': response.idSetor,
								'adm': response.adm,
								'pessoal': response.pessoal,
								'consultaPessoal': response.consultaPessoal,
								'protocolo': response.protocolo,
								'protFiltroUsuarios': response.protFiltroUsuarios,
								'protFiltroSetor': response.protFiltroSetor,
								'protBTNArquivar': response.protBTNArquivar,
								'protBTNMovimentar': response.protBTNMovimentar,
								'protBTNInserir': response.protBTNInserir,
								'protSelectTodosUsuarios': response.protSelectTodosUsuarios,
								'atendimentoAgenda': response.atendimentoAgenda,
								'agenda': response.agenda,
								'periciaMedica': response.periciaMedica,
								'alterarSenha': response.alterarSenha,
								'usuarios': response.usuarios,
								'setor': response.setor,
								'versao': versao,
								'relatFichaFuncional':response.relatFichaFuncional,
								'relatAtribuicoesCargo':response.relatAtribuicoesCargo,
								'relatFolhaPonto': response.relatFolhaPonto,
								'relatContraCheque': response.relatContraCheque,
								'atendimento': response.atendimento,
								'medico': response.medico,
								'periciaMedica': response.periciaMedica
							};
					log = JSON.stringify(log);
					sessionStorage.setItem('login', log);
					setTimeout(() => {  window.location.href = "home.html" }, 1000);
				}
				else if (response.codigo == "0"){			
                    msn('error',response.mensagem);
				}else if (response.codigo == "2"){
					$('#exibeNovaSenha').show();
					$('#exibeNovaSenha2').show();
					$('#btn-login').hide();
					$('#btn-alterar-senha').removeClass('invisible');
					msn('error',response.mensagem);
				}	
			}).fail(function() {
				msn('error', 'Falha Geral! error#999');
			});
	};
	function alterarSenha(data){
		$.ajax({
			type : 'POST',
			url  : 'acoes/trocarSenha.php',
			data : data,
			dataType: 'json',
			}).done(function(response){
				if(response.codigo == "1"){
					var log = {'nome': response.nome};
					log = JSON.stringify(log);
					sessionStorage.setItem('nome', log);
                    msn('success',response.mensagem);
					setTimeout(() => {  window.location.href = "index.html" }, 1000);
				}else{
					msn('error',response.mensagem);
				}
			}).fail(function() {
				msn('error', 'Falha Geral! error#999');
			});
	};
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
	$(document).ready(function(){
		$('#exibeNovaSenha').hide();
		$('#exibeNovaSenha2').hide();
		versao= '1.0';
		$('#versao').html(versao);
	});
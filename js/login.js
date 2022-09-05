
	$('#btn-login').on("click", function(){
        var vemail = $('#email').val();
        var vsenha = $('#senha').val();
        var data = {email:vemail, senha:vsenha }
        login(data);
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
			success :  function(response){						
				if(response.codigo == "1"){
                    msn('success',response.mensagem);
					var log = {'nome': response.nome};
					log = JSON.stringify(log);
					sessionStorage.setItem('nome', log);
					setTimeout(() => {  window.location.href = "home.html" }, 1000);
				}
				else{			
                    msn('error',response.mensagem);
				}
		    }
		});
	};
	function alterarSenha(data){
		$.ajax({
			type : 'POST',
			url  : 'acoes/trocarSenha.php',
			data : data,
			dataType: 'json',
			success :  function(response){						
				if(response.codigo == "1"){
                    msn('success',response.mensagem);
					setTimeout(() => {  window.location.href = "home.html" }, 1000);
				}
				else{			
                    msn('error',response.mensagem);
				}
		    }
		});
	};
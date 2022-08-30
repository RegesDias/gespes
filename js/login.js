
	$('#btn-login').on("click", function(){
        var vemail = $('#email').val();
        var vsenha = $('#senha').val();
        var data = {email:vemail, senha:vsenha }
        login(data);
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
					window.location.href = "home.html";
				}
				else{			
                    msn('error',response.mensagem);
				}
		    }
		});
	};
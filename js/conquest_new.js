function trim(t) {
    t = t.replace(/^\s*/, '');
    t = t.replace(/\s*$/, '');
    return t;
}

conquest = {
	init:function(){
		us91.us91Header();
	},
	opencloseNews:function(){
		//wallpapers slide
		$("#picbox").MakeItSlide({btnLeft:$("#btn_wall_left"),btnRight:$("#btn_wall_right")});
		$("#allState").click(function(){
			if($(this).html()=="+ Abrir Todos"){
				$(this).html("- Fechar");
				$("#tab_con div.title_on").attr("class","title");
				$("#tab_con div.textbox").fadeIn();
			}else{
				$(this).html("+ Abrir Todos");
				$("#tab_con div.title").attr("class","title_on");
				$("#tab_con div.textbox").fadeOut();
			}
			return false;
		});
		$("#tab_con > div > div > a.openClose").click(function(){
			var $this=$(this).parent(),countClosed=0;
			if($this.attr("class")=="title"){
				$this.next().fadeOut();
				$this.attr("class","title_on");
				$("#tab_con div.textbox").each(function(){
					if($(this).css('display')=='none'){
						countClosed++;
						if (countClosed == $("#tab_con div.textbox").length-1){
							$("#allState").html("+ Abrir Todos");
						}
					}
				})
			}else{
				$this.next().fadeIn();
				$this.attr("class","title");
				$("#allState").html("- Fechar");
			}
			return false;
		});
		(function(){
			$("#tabHnadle1 > li").UE_Tab({tabBind:"hover",tabHandleOn:"",tabBody:"#tabBody1 > div",tabClickReturn:true});
		})();
			
	},
	opencloseEvents:function(){
		//wallpapers slide
		$("#allState2").click(function(){
			if($(this).html()=="+ Abrir Todos"){
				$(this).html("- Fechar");
				$("#tab_con2 div.title_on").attr("class","title");
				$("#tab_con2 div.textbox").fadeIn();
			}else{
				$(this).html("+ Abrir Todos");
				$("#tab_con2 div.title").attr("class","title_on");
				$("#tab_con2 div.textbox").fadeOut();
			}
			return false;
		});
		$("#tab_con2 > div > div > a.openClose").click(function(){
			var $this=$(this).parent(),countClosed=0;
			if($this.attr("class")=="title"){
				$this.next().fadeOut();
				$this.attr("class","title_on");
				$("#tab_con2 div.textbox").each(function(){
					if($(this).css('display')=='none'){
						countClosed++;
						if (countClosed == $("#tab_con2 div.textbox").length-1){
							$("#allState2").html("+ Abrir Todos");
						}
					}
				})
			}else{
				$this.next().fadeIn();
				$this.attr("class","title");
				$("#allState2").html("- Fechar");
			}
			return false;
		});
		(function(){
			$("#tabHnadle1 > li").UE_Tab({tabBind:"hover",tabHandleOn:"",tabBody:"#tabBody1 > div",tabClickReturn:true});
		})();
			
	}

}

conquest.register = {
	logged: false,
	step:function(obj){
		$('div.sequencias').hide();
		conquest.register.logged = GLOBAL_LOGGED;
		if ((conquest.register.logged == true) && (obj == 1 || obj == 2)) {
			// se estiver logado vai para 3
			obj = 3; // ou 4
		} else if ((conquest.register.logged == false) && (obj == 3 || obj == 4)) {
			alert('Realize o login ou cadastre-se primeiro.');
			obj = 2;
		}
		$('#abas_sequencia li').attr('class', '');
		$('#step-'+obj).attr('class', 'selected');
		switch (obj) {
			case 1:
				$('#register_title').text('Login');
				$('#sequencia_login').show();
				break;
			case 2:
				$('#register_title').text('Cadastro');
				$('#register_content').show();
                insert_captcha('captcha_global');
				break;
			case 3:
				$('#register_title').text('Conta no Conquest');
				$('#sequencia_conta').show();
		                insert_captcha('captcha_conquest');
				setTimeout(function(){
					if($('#sequencia_conta').css('display') == 'none'){
						$('#sequencia_conta').show();
					}	
				},3000);
				break;
			case 4:
				$('#register_title').text('Download');
				$('#sequencia_download').show('fast',function(){
					if(location.search == '?step=jogo') return false;
					if($('#nofollow')[0]) return false;
					_gaq.push(['_trackPageview', '/signup/?step=3']);
				});
				break;
            case 5:
				$('#register_title').text('Conta Criada');
				$('#sequencia_success').show();
				break;
			default:
				break;
		}
	},
	do_login:function(path){
	 var dt = new Date();
         dt = dt.getTime();
		$('p.error').hide();
		data = {'dt': dt, 'action': 'login', 'login': $('#login').val(), 'password': $('#password').val()};
		if(path){
			data = {'dt': dt,'action': 'login','login': $('#login_int').val(),'password': $('#password_int').val()};
		}else{
			data = {'dt': dt,'action': 'login','login': $('#login').val(),'password': $('#password').val()};
		}
		$.post('/signup/', data, function(res){
			if (res && res.ok) {
                if(res.enquete) conquest.enquete.voted = 1;
                $('#enquete_notlogged').remove();
                if($('#poll').is('form')){
                    $('#poll').show();
                }
                GLOBAL_LOGGED = true;
		if(path){
			location.href = '/signup/?step=jogo';
			return false;
                }
                conquest.register.logged = GLOBAL_LOGGED;
		if(conquest.register.home && conquest.register.home == 1){
		    // res.short_name
			$('.infoBoxHeading').html('Bem vindo ' + res.short_name);
			$('.boxText').html('<p align="center"><a href="/my_account/">Minha conta</a></p><p align="center"><a href="/signup/?step=jogo">Criar conta no jogo</a></p><p align="center"><a href="/signup/?action=logout">[x] Sair</a></p>');
              			$.get('/ajax/enquete.php?action=get_home_poll_html', {}, function(data){
					$('#home_poll_box').html(data);
				}, 'html');
			$(document).trigger("login");
			return false;
		}
                $('#last_login').text(res.last_login);
                $('#short_name').text(res.short_name);
                $('#logged_box').show();
				$('#rg_id').val(res.id);
				patt=/\?dest=my_account/g;
				if(patt.test(location.search)){
					location.href = '/my_account/';
					return false;
				}
			} else {
				alert(res.error_msg);
			}
		}, 'json');
		return false;
	},
	check_login:function(){
return false;	
	    if (GLOBAL_LOGGED) { return; }
	    data = {'action': 'is_logged'};
	
	    $.post('/signup/', data, function(res){
			if (res.ok) {
                if(res.enquete){
		    conquest.enquete.voted = 1;	 
                }
		$('#enquete_notlogged').remove();
                GLOBAL_LOGGED = true;
                conquest.register.logged = GLOBAL_LOGGED;
		$('.infoBoxHeading').html('Bem vindo ' + res.short_name);
		$('.boxText').html('<p align="center"><a href="/my_account/">Minha conta</a></p><p align="center"><a href="/signup/?step=jogo">Criar conta no jogo</a></p><p align="center"><a href="/signup/?action=logout">[x] Sair</a></p>');
                $('#logged_box').show();
                $('#short_name').text(res.short_name);
                $('#last_login').text(res.last_login);
                conquest.register.login = res.login;
                conquest.register.step(3);
			}
		}, 'json');
		return false;
	},
	create:function(){
        if (!$('#user_terms_global')[0].checked) {
            alert('Para continuar você deve marca a opção "Eu Aceito"');
            return false;
        }
		nome = $('#nome').val();
		login = $('#login_reg').val();
		email = $('#email').val();
		confirm_email = $('#confirm_email').val();
		senha = $('#senha').val();
		confirm_senha = $('#confirm_senha').val();
		sexo = $('#sexo').val();
		data_nas_dia = $('#data_nas_dia').val();
		data_nas_mes = $('#data_nas_mes').val();
		data_nas_ano = $('#data_nas_ano').val();
		tel1 = $('#tel1').val();
		tel1_ddd = $('#tel1_ddd').val();
		tel2 = $('#tel2').val();
		tel2_ddd = $('#tel2_ddd').val();
		security_question = $('#security_question').val();
        security_answer = $('#security_answer').val();
        security_code = $('#security_code').val();
        recaptcha_challenge_field = $('#recaptcha_challenge_field').val();
        recaptcha_response_field = $('#recaptcha_response_field').val();
        
		$('p.error').hide();
		
		obrigatorios = [['nome', 'Nome'], ['login_reg', 'Login'], ['email', 'Email'], ['confirm_email', 'Confirmar Email'], ['senha', 'Senha'], ['confirm_senha', 'Confirmar Senha'], ['sexo', 'Sexo'], ['security_question', 'Pergunta secreta'], ['security_answer', 'Resposta secreta'], ['security_code', 'Número secreto']];
		for (var i = 0;i < obrigatorios.length; i++) {
			if ($('#' + obrigatorios[i][0]).val() == '') {
				$('#error_' + obrigatorios[i][0]).text('O campo "' + obrigatorios[i][1] + '" deve ser preenchido.');
				$('#error_' + obrigatorios[i][0]).show();
				$('#' + obrigatorios[i][0]).focus();
				return false;
			}
		}

		if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
			$('#error_email').text('O email não é válido.');
			$('#error_email').show();
			$('#email').focus();
            return false;
		}
		
		if (email != confirm_email) {
			$('#error_confirm_email').text('Os emails não conferem');
			$('#error_confirm_email').show();
			$('#confirm_email').focus();
            		return false;
		}
		
        if (senha != confirm_senha) {
			$('#error_confirm_senha').text('As senhas não conferem');
			$('#error_confirm_senha').show();
			$('#confirm_senha').focus();
            return false;
		}
		
		data = {'action':'create',
			'nome':nome, 'login':login, 'email':email, 'senha':senha, 'sexo':sexo,
			'data_nas_dia':data_nas_dia, 'data_nas_mes':data_nas_mes, 'data_nas_ano':data_nas_ano,
			'tel1':tel1, 'tel1_ddd':tel1_ddd, 'tel2':tel2, 'tel2_ddd':tel2_ddd,
            'security_question':security_question, 'security_answer':security_answer, 'security_code':security_code,
            'recaptcha_challenge_field': recaptcha_challenge_field, 'recaptcha_response_field': recaptcha_response_field}
		$.post('/signup/', data, function(res){
			if (res.ok) {
				$('#dados_essenciais').fadeOut(1000, function(){$('#dados_opcionais').fadeIn(1000);if(location.search != '?step=jogo' && !$('#nofollow')[0]){_gaq.push(['_trackPageview', '/signup/?step=1']);}});
				GLOBAL_LOGGED = true;
				conquest.register.logged = true;
				$('#rg_id').val(res.id);
			} else {
				if (!res.html_id) {
					alert(res.error_msg);
				} else {
                    if (res.html_id == 'captcha_global') {
                        reload_captcha();
                    }
					$('#error_' + res.html_id).text(res.error_msg);
					$('#error_' + res.html_id).show();
                    $('#' + res.html_id).focus();
				}
			}
		}, 'json');
        return false;
	},
	create_game:function(){
		login	= $('#login_game').val();
		senha	= $('#password_conquer').val();
		senha_confirm	= $('#password_conquer_confirm').val();
		betakey	= $('#betakey').val();
		rg_id	= $('#rg_id').val();
		betakey_senha	= $('#senha_betakey').val();
        recaptcha_challenge_field = $('#recaptcha_challenge_field').val();
        recaptcha_response_field = $('#recaptcha_response_field').val();
		$('p.error').hide();
		
		obrigatorios = [['login_game', 'Login'], ['password_conquer', 'Senha'], ['password_conquer_confirm', 'Confirmar senha'], ['betakey', 'Betakey'], ['betakey_senha', 'Senha do Betakey']];
		for (var i = 0;i < obrigatorios.length; i++) {
			if ($('#' + obrigatorios[i][0]).val() == '') {
				$('#error_' + obrigatorios[i][0]).text('O campo "' + obrigatorios[i][1] + '" deve ser preenchido.');
				$('#error_' + obrigatorios[i][0]).show();
				$('#' + obrigatorios[i][0]).focus();
				return false;
			}
		}
		if (senha != senha_confirm) {
			$('#error_password_conquer').text('As senhas não conferem');
			$('#error_password_conquer').show();
			$('#password_conquer').focus();
			return false;
		}
		if (login.length < 10){
			$('#error_login_game').text('O Login deve ter de 10 à 32 caracteres.');
			$('#error_login_game').show();
			$('#login_game').focus();
			return false;
		}
		var regexp = /[^0-9A-Z]/i;
		if(regexp.test($('#password_conquer').val())){
			$('#error_password_conquer').text('A Senha só pode conter letras e números');
			$('#error_password_conquer').show();
			$('#password_conquer').focus();
			return false;
		}
		if(regexp.test($('#login_game').val())){
			$('#error_login_game').text('O Login só pode conter letras e números');
			$('#error_login_game').show();
			$('#login_game').focus();
			return false;
		}
		
		data = {'action':'create_game','login':login, 'senha':senha, 'betakey':betakey, 'betakey_senha':betakey_senha,'rg_id':rg_id,
            'recaptcha_challenge_field': recaptcha_challenge_field, 'recaptcha_response_field': recaptcha_response_field}
        
        $('#load').show();
		$.post('/signup/', data, function(res){
			if (res.ok) {
				conquest.register.step(4);
                $('.show_after_create').show();
		if(location.search != '?step=jogo' && !$('#nofollow')[0]){_gaq.push(['_trackPageview', '/signup/?step=2']);}
			} else {
                if (!res.html_id) {
					alert(res.error_msg);
				} else {
                    if (res.html_id == 'captcha_conquest') {
                        reload_captcha();
                    }
					$('#error_' + res.html_id).text(res.error_msg);
					$('#error_' + res.html_id).show();
				}
			}
            $('#load').hide();
		}, 'json');
        return false;
	},
	add_optional_data:function(){
		rg = $('#rg').val();
		cpf = $('#cpf').val();
		cep = $('#cep').val();
		rua = $('#rua').val();
		numero = $('#numero').val();
		comp = $('#comp').val();
		bairro = $('#bairro').val();
		cidade = $('#cidade').val();
		estado = $('#estado').val();
		pais = $('#pais').val();
		newsletter = $('#newsletter')[0].checked;
		$('p.error').hide();
		if (rua || numero || comp || bairro || cidade || estado) {
			obrigatorios = [['rua', 'Endereço'], ['numero', 'Número'], ['bairro', 'Bairro'], ['cidade', 'Cidade'], ['estado', 'Estado']];
			for (var i = 0;i < obrigatorios.length; i++) {
				if ($('#' + obrigatorios[i][0]).val() == '') {
					$('#error_' + obrigatorios[i][0]).text('O campo "' + obrigatorios[i][1] + '" deve ser preenchido.');
					$('#error_' + obrigatorios[i][0]).show();
					$('#' + obrigatorios[i][0]).focus();
					return false;
				}
			}
		}
		data = {'action':'add_optional_data',
					'rg':rg, 'cpf':cpf, 'cep':cep, 'rua':rua, 'numero':numero,
					'comp':comp, 'bairro':bairro, 'cidade':cidade,
					'estado':estado, 'pais':pais, 'newsletter':newsletter}
		$.post('/signup/', data, function(res){
			if (res.ok) {
				conquest.register.step(3);
                $('#last_login').text(res.last_login);
                $('#short_name').text(res.short_name);
                $('#logged_box').show();
		if(location.search != '?step=jogo' && !$('#nofollow')[0]){_gaq.push(['_trackPageview', '/signup/?step=10']);}
			} else {
				if (!res.html_id) {
					alert(res.error_msg);
				} else {
					$('#error_' + res.html_id).text(res.error_msg);
					$('#error_' + res.html_id).show();
				}
			}
		}, 'json');
		return false;
	},
	do_logout:function(){
		dt = new Date();
		t = dt.getTime();
		$.get('/signup/', {'action': 'logout', 't': t});
		conquest.register.logged = false;
		conquest.register.step(1);
	}
}

conquest.rank = {
	interv : '',
	load:function(){
		var that = this;
		$('#general,#tgeneral').show();
	}
}



conquest.my_account = {
    forgot_global_data: function () {
        login	= $('#login_forgot').val();
        recaptcha_challenge_field = $('#recaptcha_challenge_field').val();
        recaptcha_response_field = $('#recaptcha_response_field').val();
		$('p.error').hide();
		if (login == '') {
			$('#error_login').text('O campo "Login ou email" deve ser preenchido.');
			$('#error_login').show();
			$('#login_forgot').focus();
			return false;
		}
		data = {'action':'forgot_global_data','login':login,
		    'recaptcha_challenge_field': recaptcha_challenge_field,
		    'recaptcha_response_field': recaptcha_response_field}
        $('#load').show();
		$.post('/forgot/', data, function(res){
			if (res.ok) {
                $('.hide_on_sent').hide();
                $('.show_on_sent').show();
			} else {
                if (!res.html_id) {
					alert(res.error_msg);
				} else {
					$('#error_' + res.html_id).text(res.error_msg);
					$('#error_' + res.html_id).show();
				}
				reload_captcha();
			}
            $('#load').hide();
		}, 'json');
        return false;
    },
    forgot_change_global_password: function () {
        validation_code = $('#validation_code').val();
        password = $('#password_forgot').val();
		confirm_password = $('#confirm_password').val();
        
		$('p.error').hide();
        
        data = {'action':'forgot_change_global_password', 'validation_code': validation_code};
        
        obrigatorios = [['password_forgot', 'Nova Senha'], ['confirm_password', 'Confirmar Senha']];

		for (var i = 0;i < obrigatorios.length; i++) {
			if ($('#' + obrigatorios[i][0]).val() == '') {
				$('#error_' + obrigatorios[i][0]).text('O campo "' + obrigatorios[i][1] + '" deve ser preenchido.');
				$('#error_' + obrigatorios[i][0]).show();
				$('#' + obrigatorios[i][0]).focus();
				return false;
			}
		}
		
        if (password != confirm_password) {
            $('#error_confirm_password').text('As senhas não conferem.');
            $('#error_confirm_password').show();
            return false;
        }
        data['password'] = password;
        
        $('#load').show();
		$.post('/forgot/', data, function(res){
			if (res.ok) {
                $('.hide_on_change_global_password').hide();
                $('.show_on_change_global_password').show();
			} else {
				if (!res.html_id) {
					alert(res.error_msg);
				} else {
					$('#error_' + res.html_id).text(res.error_msg);
					$('#error_' + res.html_id).show();
                    $('#' + res.html_id).focus();
				}
			}
			$('#load').hide();
		}, 'json');
        return false;
    },
    forgot_change_conquest_password: function () {
        validation_code = $('#validation_code').val();
        password = $('#password_forgot').val();
		confirm_password = $('#confirm_password').val();
        
		$('p.error').hide();
        
        data = {'action':'forgot_change_conquest_password', 'validation_code': validation_code};
        
        obrigatorios = [['password_forgot', 'Nova Senha'], ['confirm_password', 'Confirmar Senha']];
        
		for (var i = 0;i < obrigatorios.length; i++) {
			if ($('#' + obrigatorios[i][0]).val() == '') {
				$('#error_' + obrigatorios[i][0]).text('O campo "' + obrigatorios[i][1] + '" deve ser preenchido.');
				$('#error_' + obrigatorios[i][0]).show();
				$('#' + obrigatorios[i][0]).focus();
				return false;
			}
		}
		
        if (password != confirm_password) {
            $('#error_confirm_password').text('As senhas não conferem.');
            $('#error_confirm_password').show();
            return false;
        }
        data['password'] = password;
        
        $('#load').show();
		$.post('/forgot/', data, function(res){
			if (res.ok) {
                $('.hide_on_change_conquest_password').hide();
                $('.show_on_change_conquest_password').show();
			} else {
				if (!res.html_id) {
					alert(res.error_msg);
				} else {
					$('#error_' + res.html_id).text(res.error_msg);
					$('#error_' + res.html_id).show();
                    $('#' + res.html_id).focus();
				}
			}
			$('#load').hide();
		}, 'json');
        return false;
    },
    save_global_data: function () {
        nome = $('#nome').val();
		sexo = $('#sexo').val();
		data_nas_dia = $('#data_nas_dia').val();
		data_nas_mes = $('#data_nas_mes').val();
		data_nas_ano = $('#data_nas_ano').val();
		tel1 = $('#tel1').val();
		tel1_ddd = $('#tel1_ddd').val();
		tel2 = $('#tel2').val();
		tel2_ddd = $('#tel2_ddd').val();
		rg = $('#rg').val();
		cpf = $('#cpf').val();
		cep = $('#cep').val();
		rua = $('#rua').val();
		numero = $('#numero').val();
		comp = $('#comp').val();
		bairro = $('#bairro').val();
		cidade = $('#cidade').val();
		estado = $('#estado').val();
		pais = $('#pais').val();
		newsletter = $('#newsletter')[0].checked;
        
		$('p.error').hide();
        
        obrigatorios = [['nome', 'Nome'], ['sexo', 'Sexo']];
		for (var i = 0;i < obrigatorios.length; i++) {
			if ($('#' + obrigatorios[i][0]).val() == '') {
				$('#error_' + obrigatorios[i][0]).text('O campo "' + obrigatorios[i][1] + '" deve ser preenchido.');
				$('#error_' + obrigatorios[i][0]).show();
				$('#' + obrigatorios[i][0]).focus();
				return false;
			}
		}
        
        if (rua || numero || comp || bairro || cidade || estado) {
			obrigatorios = [['rua', 'Endereço'], ['numero', 'Número'], ['bairro', 'Bairro'], ['cidade', 'Cidade'], ['estado', 'Estado']];
			for (var i = 0;i < obrigatorios.length; i++) {
				if ($('#' + obrigatorios[i][0]).val() == '') {
					$('#error_' + obrigatorios[i][0]).text('O campo "' + obrigatorios[i][1] + '" deve ser preenchido.');
					$('#error_' + obrigatorios[i][0]).show();
					$('#' + obrigatorios[i][0]).focus();
					return false;
				}
			}
		}
        data = {'action':'save_global_data',
			'nome':nome, 'sexo':sexo, 'data_nas_dia':data_nas_dia,
            'data_nas_mes':data_nas_mes, 'data_nas_ano':data_nas_ano,'tel1':tel1,
            'tel1_ddd':tel1_ddd, 'tel2':tel2, 'tel2_ddd':tel2_ddd, 'rg':rg,
            'cpf':cpf, 'cep':cep, 'rua':rua, 'numero':numero, 'comp':comp,
            'bairro':bairro, 'cidade':cidade, 'estado':estado, 'pais':pais,
            'newsletter':newsletter}
            
		$.post('/my_account/', data, function(res){
			if (res.ok) {
				alert('Dados alterados com sucesso');
			} else {
				if (!res.html_id) {
					alert(res.error_msg);
				} else {
					$('#error_' + res.html_id).text(res.error_msg);
					$('#error_' + res.html_id).show();
                    $('#' + res.html_id).focus();
				}
			}
		}, 'json');
        return false;
    },
    change_global_password: function () {
        current_password = $('#current_password').val();
        password = $('#password').val();
		password_confirm = $('#password_confirm').val();
        
		$('p.error').hide();
        
        obrigatorios = [['current_password', 'Senha Atual'], ['password', 'Nova Senha'], ['password_confirm', 'Confirmar Senha']];
		for (var i = 0;i < obrigatorios.length; i++) {
			if ($('#' + obrigatorios[i][0]).val() == '') {
				$('#error_' + obrigatorios[i][0]).text('O campo "' + obrigatorios[i][1] + '" deve ser preenchido.');
				$('#error_' + obrigatorios[i][0]).show();
				$('#' + obrigatorios[i][0]).focus();
				return false;
			}
		}
		
        if (password != password_confirm) {
            $('#error_password_confirm').text('As senhas não conferem.');
            $('#error_password_confirm').show();
            return false;
        }
        
        data = {'action':'change_global_password', 'current_password':current_password, 'password':password}
            
		$.post('/my_account/', data, function(res){
			if (res.ok) {
				alert('Senha alterada com sucesso');
                $('#subarea_content_change_password').hide();
			} else {
				if (!res.html_id) {
					alert(res.error_msg);
				} else {
					$('#error_' + res.html_id).text(res.error_msg);
					$('#error_' + res.html_id).show();
                    $('#' + res.html_id).focus();
				}
			}
		}, 'json');
        return false;
    },

    change_conquest_password: function(elem){
        account_id = $('#account_id-'+elem).val();
        conquest_password = $('#conquest_password-'+elem).val();
        password = $('#conquest_newpassword-'+elem).val();
        password_confirm = $('#conquest_password_confirm-'+elem).val();
        
        $('p.error').hide();
        
        obrigatorios = [['conquest_password-'+elem, 'Senha Atual'], ['conquest_newpassword-'+elem, 'Nova Senha'], ['conquest_password_confirm-'+elem, 'Confirmar Senha']];
		for (var i = 0;i < obrigatorios.length; i++) {
			if ($('#' + obrigatorios[i][0]).val() == '') {
				$('#error_' + obrigatorios[i][0]).text('O campo "' + obrigatorios[i][1] + '" deve ser preenchido.');
				$('#error_' + obrigatorios[i][0]).show();
				$('#' + obrigatorios[i][0]).focus();
				return false;
			}
		}
        if (password != password_confirm) {
            $('#error_conquest_password_confirm-'+elem).text('As senhas não conferem.');
            $('#error_conquest_password_confirm-'+elem).show();
            return false;
        }
	var regexp = /[*ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑ ñ&<>\|@!+-\/´`#~'"¨$%=\[\]\(\)]/;
	if(regexp.test($('#conquest_newpassword-'+elem).val())){
		$('#error_conquest_password_confirm-'+elem).text('A senha só pode conter letras e números');
		$('#error_conquest_password_confirm-'+elem).show();
		return false;
	}

        data = {'action':'change_conquest_password', 'conquest_password':conquest_password, 'conquest_newpassword':password, 'account_id': account_id, 'elem':elem};
        $('#load').show();
        $.post('/my_account/', data, function(res){
			if (res.ok) {
				alert('Senha alterada com sucesso');
                $('#subarea_content_change_password-'+elem).hide();
                $('#conquest_password-'+elem).val('');
                $('#conquest_newpassword-'+elem).val('');
                $('#conquest_password_confirm-'+elem).val('');
                $('#security_answer-'+elem).val('');
                $('#security_code-'+elem).val('');
			} else {
				if (!res.html_id) {
					alert(res.error_msg);
				} else {
					$('#error_' + res.html_id + '-' + elem).text(res.error_msg);
					$('#error_' + res.html_id + '-' + elem).show();
                    $('#' + res.html_id + '-' + elem).focus();
				}
			}
            $('#load').hide();
		}, 'json');
        return false;
    },

    change_global_email: function () {
        change_email = $('#change_email').val();
        security_answer = $('#security_answer').val();
		security_code = $('#security_code').val();
        
		$('p.error').hide();
        
        obrigatorios = [['change_email', 'Email'], ['security_answer', 'Resposta'], ['security_code', 'Número secreto']];
		for (var i = 0;i < obrigatorios.length; i++) {
			if ($('#' + obrigatorios[i][0]).val() == '') {
				$('#error_' + obrigatorios[i][0]).text('O campo "' + obrigatorios[i][1] + '" deve ser preenchido.');
				$('#error_' + obrigatorios[i][0]).show();
				$('#' + obrigatorios[i][0]).focus();
				return false;
			}
		}
        
        data = {'action':'change_global_email', 'change_email':change_email, 'security_answer':security_answer, 'security_code':security_code};
            
		$.post('/my_account/', data, function(res){
			if (res.ok) {
				alert('Email alterado com sucesso');
                $('#subarea_content_change_email').hide();
                $('#change_email').val('');
                $('#security_answer').val('');
                $('#security_code').val('');
			} else {
				if (!res.html_id) {
					alert(res.error_msg);
				} else {
					$('#error_' + res.html_id).text(res.error_msg);
					$('#error_' + res.html_id).show();
                    $('#' + res.html_id).focus();
				}
			}
		}, 'json');
        return false;
    },
    create_global_security: function () {
        current_password_security = $('#current_password_security').val();
        security_question = $('#security_question').val();
        security_answer = $('#security_answer').val();
		security_code = $('#security_code').val();

		$('p.error').hide();

        obrigatorios = [['current_password_security', 'Senha atual'], ['security_question', 'Pergunta secreta'], ['security_answer', 'Resposta'], ['security_code', 'Número secreto']];
		for (var i = 0;i < obrigatorios.length; i++) {
			if ($('#' + obrigatorios[i][0]).val() == '') {
				$('#error_' + obrigatorios[i][0]).text('O campo "' + obrigatorios[i][1] + '" deve ser preenchido.');
				$('#error_' + obrigatorios[i][0]).show();
				$('#' + obrigatorios[i][0]).focus();
				return false;
			}
		}

        data = {'action':'create_global_security', 'current_password_security':current_password_security,
            'security_question':security_question, 'security_answer':security_answer,
            'security_code':security_code}

        $.post('/my_account/', data, function(res){
			if (res.ok) {
				alert('Pergunta e número secreto criados com sucesso');
                $('#subarea_content_create_security').hide();
                $('#current_password_security').val('');
                $('#security_question').val('');
                $('#security_answer').val('');
                $('#security_code').val('');
                window.location = '/my_account/';
			} else {
				if (!res.html_id) {
					alert(res.error_msg);
				} else {
					$('#error_' + res.html_id).text(res.error_msg);
					$('#error_' + res.html_id).show();
                    $('#' + res.html_id).focus();
				}
			}
		}, 'json');
        return false;
    },
    save_conquer_correction_data: function() {
        $('p.error').hide();
        accounts_count = $('.account_count_ids').length;
        data = {'action':'save_conquer_correction_data', 'accounts_count': accounts_count};

        for (var i=0; i < accounts_count; i++){
            data['account_name-'+i] = $('#account_name-'+i).val();
            data['account_password-'+i] = $('#account_password-'+i).val();
            data['account_password_confirm-'+i] = $('#account_password_confirm-'+i).val();
            data['account_id2-'+i] = $('#account_id2-'+i).val();
            if (data['account_name-'+i] == '') {
                $('#error_account_name-'+i).text('Preencha o campo "Login"');
                $('#error_account_name-'+i).show();
                $('#account_name-'+i).focus();
                return false;
            }
            if (data['account_password-'+i] == '') {
                $('#error_account_password-'+i).text('Preencha o campo "Senha"');
                $('#error_account_password-'+i).show();
                $('#account_password-'+i).focus();
                return false;
            }
            if (data['account_password_confirm-'+i] == '') {
                $('#error_account_password_confirm-'+i).text('Preencha o campo "Confirmar Senha"');
                $('#error_account_password_confirm-'+i).show();
                $('#account_password_confirm-'+i).focus();
                return false;
            }
            if (data['account_password-'+i] != data['account_password_confirm-'+i]) {
                $('#error_account_password_confirm-'+i).text('As senhas não conferem');
                $('#error_account_password_confirm-'+i).show();
                $('#account_password_confirm-'+i).focus();
                return false;
            }
        }

        if ($('#account_realname').length != 0) {
            data['account_realname'] = $('#account_realname').val();
            if (data['account_realname'] == '') {
                $('#error_account_realname').text('Preencha o campo "Nome Real"');
                $('#error_account_realname').show();
                $('#account_realname').focus();
                return false;
            }
        }
        if ($('#account_email').length != 0) {
            data['account_email'] = $('#account_email').val();
            if (data['account_email'] == '') {
                $('#error_account_email').text('Preencha o campo "Email"');
                $('#error_account_email').show();
                $('#account_email').focus();
                return false;
            }
        }
        if ($('#account_security_question').length != 0) {
            data['account_security_question'] = $('#account_security_question').val();
            data['account_security_answer'] = $('#account_security_answer').val();
            data['account_security_code'] = $('#account_security_code').val();
            if (data['account_security_question'] == '') {
                $('#error_account_security_question').text('Preencha o campo "Pergunta de segurança"');
                $('#error_account_security_question').show();
                $('#account_security_question').focus();
                return false;
            }
            if (data['account_security_answer'] == '') {
                $('#error_account_security_answer').text('Preencha o campo "Resposta"');
                $('#error_account_security_answer').show();
                $('#account_security_answer').focus();
                return false;
            }
            if (data['account_security_code'] == '') {
                $('#error_account_security_code').text('Preencha o campo "Número secreto"');
                $('#error_account_security_code').show();
                $('#account_security_code').focus();
                return false;
            }
        }
        dt = new Date();
        dt = dt.getTime();
	    $('#load').show();
        $.post('/my_account/?dt='+dt, data, function(res){
			if (res.ok) {
				alert('Dados alterados com sucesso');
	               // window.location = '/my_account/';
			} else {
				if (!res.html_id) {
					alert(res.error_msg);
				} else {
					$('#error_' + res.html_id).text(res.error_msg);
					$('#error_' + res.html_id).show();
                    $('#' + res.html_id).focus();
				}
			}
            $('#load').hide();
		}, 'json');
        return false;
    }
}

conquest.enquete = {
	submit:function(){
		if($('#form_poll input:checked').val()){
            var params = {'action': 'vote', 'id_poll': $('#id_poll').val(), 'id_option':$('#form_poll input:checked').val(), 'poll_comment': $('#poll_comment').val()};
            $.post('/ajax/enquete.php', params, function(data){
                if (data.ok) {
                    alert('Obrigado pelo seu voto!');
                    $('#p_comment').remove();
                    $('#poll_buttons_box').remove();
                    $('.poll label').fadeOut('slow',function(){
                        $('.result_enquete1, .grafic_enquete, .result_enquete2').fadeIn();
                    });
                } else {
                    alert(data.error_msg);
                }
            }, 'json');
		}else{
			alert('Escolha uma das opções');
		}
	},
	show:function(){
		$('.poll label').fadeOut('slow',function(){
            $('#vote_submit').css('visibility', 'hidden');
            $('#btn_view_result').hide();
            $('#btn_show_options').show();
            $('#p_comment').hide();
			$('.result_enquete1, .grafic_enquete, .result_enquete2').fadeIn();
		});
	},
    show_options: function(){
        $('#vote_submit').css('visibility', 'visible');
        $('#btn_show_options').hide();
        $('#btn_view_result').show();
        $('.result_enquete1, .grafic_enquete, .result_enquete2').fadeOut('slow',function(){
            $('.poll label').fadeIn();
            $('#p_comment').fadeIn();
        });
    }
};

conquest.comments = {
    add_news_comment: function () {
        var params = {'action': 'add_comment_news'};
        params['id_news'] = $('#id_news').val();
        params['name'] = $('#name').val();
        params['email'] = $('#email').val();
        params['comment'] = $('#comment_area').val();
        params['recaptcha_challenge_field'] = $('#recaptcha_challenge_field').val();
        params['recaptcha_response_field'] = $('#recaptcha_response_field').val();
        
        if (params['name'] == 'Nome (obrigatório)') {
            alert('Preencha o nome');
            return false;
        }
        if (params['email'] == 'Email (obrigatório)') {
            alert('Preencha o email');
            return false;
        }
        $.post('/ajax/comments.php', params, function(res) {
            if (res.ok) {
                alert(res.error_msg);
                $('#comment_area').val('');
                window.location.reload(true);
            } else {
                alert(res.error_msg);
                reload_captcha();
            }
        }, 'json');
        return false;
    }
};

conquest.ajax = {
	login:function(){
		if($("#login_reg")[0]){
			$("#login_reg")[0].onkeyup = function(){
				var data = {'action': 'vrflogin', 'login': $("#login_reg").val()};
				setTimeout(function(){
					if(!$('.ajax_login').is('span')) $("#login_reg").after('<span class="ajax_login"></span>');

					if ($("#login_reg").val().length < 4 ||  $("#login_reg").val().length > 25){ $('.ajax_login').html(' <b style="color:#ff0000">Login de tamanho inv&aacute;lido</b>');return false;}; 

					$.post('/ajax/register.php', data, function(res){
						$('.ajax_login').html(res && res=='existente' ?'  <b style="color:#ff0000">Login j&aacute; existente</b>' : ' <b style="color:green">Login dispon&iacute;vel</b>');
					}, 'json');
				},2000)
			}
		}
	},
	login_conquest:function(){
		if($("#login_game")){
			$("#login_game")[0].onkeyup = function(){
				setTimeout(function(){
					if(!$('.ajax_loginGame').is('span')) $("#login_game").after('<span class="ajax_loginGame"></span>');
					if ($("#login_game").val().length < 4 ||  $("#login_game").val().length > 32){ 
						$('.ajax_loginGame').html(' <b style="color:#ff0000">Em minúsculo e dentro do limite de 4 - 32 carateres</b>');
						$('.button_').hide();
						return false;
					} else {
						$('.ajax_loginGame').html('');
						$('.button_').show();
					}
				},2000)
			}
		}	
	},
	pass_conquest:function(){
		if($("#password_conquer")){
			$("#password_conquer")[0].onkeyup = function(){
				setTimeout(function(){
					if(!$('.ajax_passGame').is('span')) $("#password_conquer").after('<span class="ajax_passGame"></span>');

					if ($("#password_conquer").val().length < 10 || $("#password_conquer").val().length > 14){ 
						$('.ajax_passGame').html(' <b style="color:#ff0000">Senha de tamanho inv&aacute;lido - Deve estar dentro do limite 10 - 14</b>');
						return false;
					} else {
						$('.ajax_passGame').html('');
					}
				},2000)
			}
		}	
		if($("#password_conquer_confirm")){
			$("#password_conquer_confirm")[0].onkeyup = function(){
				setTimeout(function(){
					if(!$('.ajax_passGame2').is('span')) $("#password_conquer_confirm").after('<span class="ajax_passGame2"></span>');

					if ($("#password_conquer_confirm").val().length < 10 || $("#password_conquer_confirm").val().length > 14){ 
						$('.ajax_passGame2').html(' <b style="color:#ff0000">Senha de tamanho inv&aacute;lido - Deve estar dentro do limite 10 - 14</b>');
						return false;
					} else {
						$('.ajax_passGame2').html('');
					}

				},2000)
			}
		}
	},
	security_conquest:function(){
		if($("#security_answer")){
			$("#security_answer")[0].onkeyup = function(){
				setTimeout(function(){
					if(!$('.ajax_security_answer').is('span')) $("#security_answer").after('<span class="ajax_security_answer"></span>');

					if ($("#security_answer").val().length < 4){ 
						$('.ajax_security_answer').html(' <b style="color:#ff0000;display:block">Resposta de tamanho inv&aacute;lido - Dever ter mais de 4 letras</b>');
						$('.button_').hide();
						return false;
					} else {
						$('.ajax_security_answer').html('');
						$('.button_').show();
					}
				},2000)
			}
		}	
	},
	init:function(){
		patt=/register\.php/g;
		if(patt.test(location.pathname)){
			conquest.ajax.login();
			conquest.ajax.login_conquest();
			conquest.ajax.pass_conquest();
			conquest.ajax.security_conquest();
		}
	}
}
conquest.wallpapers = {
    load:function(){
        $(".wallpapers.wall_holder").mouseenter(function(){
            $(".wall_main",$(this)).show();
            $(this).mouseleave(function(){
                $(".wall_main",$(this)).hide();
            });
        })
        $(window).scroll(function(e){
            if($(window).scrollTop() >= ($(".index-block").offset().top - $(window).scrollTop() + 200)){

                if($("#wallpapers-table").attr("status") != "loading"){
                    $("#wallpapers-table").attr("status","loading")
                    $(".no-display:first").fadeIn(1000,function(){
                        var that = this
                        if($("img[u]",this)[0]){
                            $("img[u]",this).attr("src",$("img[u]",this).attr("u")).show(function(){
                                $("#wallpapers-table").attr("status","");
                                $(that).removeClass("no-display");
                                if($(window).scrollTop() >= ($(".index-block").offset().top - $(window).scrollTop() + 200)){
                                    $(window).trigger("scroll");
                                }
                            })
                        }
                    });
                }
            }
        })
    }
}

conquest.init();
$(document).ready(function() {
    setTimeout(function(){
        LC_InitializeClocks();
        //noticias abre e fecha
        conquest.opencloseNews();
        conquest.opencloseEvents();
    },1000);

    // FAQ
	$('.question').click(function() {
		$(this).next().slideToggle('fast');
	});
    conquest.ajax.init();
	if($('#password_conquer')[0]){
		$('#password_conquer').keyup(function(){
			var regexp = /[^0-9A-Z]/i;
			if(regexp.test($('#password_conquer').val())){
				$('#error_password_conquer').text("A senha só pode conter letras e números").show();
			}else{
				$('#error_password_conquer').hide();
			}
		});
		$('#login_game').keyup(function(){
			var regexp = /[^0-9A-Z]/i;
			if(regexp.test($('#login_game').val())){
				$('#error_login_game').text("O login só pode conter letras e números").show();
			}else{
				$('#error_login_game').hide();
			}
		});
	}
       if($("#wallpapers-page")[0]){
                conquest.wallpapers.load();
        }
        if($("#guild")[0]) conquest.rank.load();
        $(".lang").hover(function(){
                $(this).find("ul").show();
        },function(){
                $(this).find("ul").hide();
        });
        $("#navbox > ul > li").hover(function(){
                $(this).children("a").addClass("on");
                $(this).children("div").show();
                if($(this).children("div").children('a')[0]) $(this).children("div").children("div").show();
        },function(){
                $(this).children("a").removeClass("on");
                $(this).children("div").hide();
                $(this).children("div").children("div").hide();
        });

});

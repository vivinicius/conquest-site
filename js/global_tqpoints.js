var site = {us:0,co:1,eo:2,	ct:3,zo:4,wl:5,wotf:6}
function UE_US91(){
	
	function $E( id ){ return document.getElementById( id ); }
//start configs da barra 91.com do topo	
	this.us91Header = function(){
		var cs = [];
		//css
		cs[0] = "";
//end configs da barra 91.com do topo

	//start Conteudo barra 91.com do topo	
		//top menu document
		cs[1] = "<div class=\"us91_top\"><div class=\"us91_top_logo\"><a href=\"http:\/\/www.globalgames.com.br\" title=\"Global Games\">Global Games<\/a><\/div><div class=\"us91_top_nav\"><ul>";
		
		cs[2] = "<li class=\"us91_top_submenu_off\" onMouseOver=\"this.className=\'us91_top_submenu\'\" onMouseOut=\"this.className=\'us91_top_submenu_off\'\"><a href=\"#\" class=\"us91_top_icon4\"><span>Jogos GG<\/span><\/a><div class=\"us91_top_sublist\"  >";
		//lista de sites begin
		cs[3] = "<a href=\"http:\/\/conquest.91.com\/\">Conquest Online<\/a><\/div><\/li>";
		//lista de sites end

 		
		cs[4] = "<li class=\"us91_top_submenu_off\" onMouseOver=\"this.className=\'us91_top_submenu2\'\" onMouseOut=\"this.className=\'us91_top_submenu_off\'\"><a href=\"http://forum.globalgames.com.br/\" class=\"us91_top_icon5\"><span>FÓRUM<\/span><\/a><div class=\"us91_top_sublist us91_top_sublist2\" >";
		//community list begin
		cs[5] = "<a href=\"http://forum.globalgames.com.br/\">Fórum Global Games</a>"+
			"<a href=\"http:\/\/bbs.tqpoints.com.br\/\">Fórum TQ Brasil<\/a>";
//			"<a href=\"http://www.conquerbrasil.com.br/forum/\">Fórum Conquer Brasil</a>" --> comentado dia 02/02/2011
		//community list end
		
		cs[6] = "<\/div><\/li>";
        cs[7] = "<li class=\"us91_top_submenu_off\" onMouseOver=\"this.className=\'us91_top_submenu\'\" onMouseOut=\"this.className=\'us91_top_submenu_off\'\"><a href=\"http://painel.globalgames.com.br\" class=\"us91_top_icon3\"><span>AUTOATENDIMENTO<\/span><\/a><div class=\"us91_top_sublist us91_top_sublist3\"  >";//                cs[7] = "<li class=\"us91_top_submenu_off\" onMouseOver=\"this.className=\'us91_top_submenu\'\" onMouseOut=\"this.className=\'us91_top_submenu_off\'\"><a href=\"#" class=\"us91_top_icon3\"><span>ATENDIMENTO AO CLIENTE<\/span><\/a><div class=\"us91_top_sublist\"  >";
		cs[8] = "<a href=\"javascript:void(window.open('livehelp/livezilla.php','','width=600,height=550,left=0,top=0,resizable=yes,menubar=no,location=no,status=yes,scrollbars=yes'))\">Atendimento Online<\/a><a href=\"http://painel.globalgames.com.br\">Painel de Autoatendimento<\/a><a href=\"#\">SAC: 4004-0435 Ramal: 5445<\/a><\/div><\/li>";
		cs[9] = "<\/ul><\/div><\/div>"; //fecha div geral da barra
		//Customer Service begin
        //cs[7] = "<li><a href=\"https:\/\/account.91.com\/common\/index.aspx\" class=\"us91_top_icon3\"><span>SERVIÃ‡O AO CLIENTE<\/span><\/a><\/li><\/ul><\/div></div>";
		//Customer Service end
		
		//cs[8] = "<\/ul><\/div><a href=\"http:\/\/news.us.91.com\/contest\/201004easter\/\"><img src=\"img\/barra91\/aprilfool.gif\" title=\"Feliz PÃ¡scoa\" border=\"0\"/><\/a><\/div>";



        //end Conteudo barra 91.com do topo	
	
//		document.writeln(cs.join(""));
	}

	//Register Return
	function setPageLinksToReg(){
		var temp = window.location.search.substr(1).match(new RegExp("(^|&)campaignid=([^&]*)(&|$)"));
		var urlPara = null;
		if(temp != null){ urlPara = unescape(temp[2]); }
		if(urlPara != null && urlPara != ""){
			var links = document.getElementsByTagName("a");
			for(var i = 0; i < links.length; i++){
				temp = links[i].href;
				links[i].href = (temp.indexOf("?") > -1) ? temp + "&campaignid=" + urlPara : temp + "?campaignid=" + urlPara;
			}
		}
	}
	
	this.us91Footer = function( siteType,tbWidth,target ){
		var bmContext = null,years= new Date();
		target = (target == "_blank" || target == "_self" || target == "_top" || target == "_parent") ? target : "_self";
		//global value
		var about91 = "<a target=\"_blank\" href=\"http://www.tqpoints.com.br/empresa.php\">Empresa</a>";
		var useragreement="<a target=\"_blank\" href=\"https://account.91.com/common/read.htm\">Contrato de Uso</a>";
		var copyright = "Copyright &copy; 2005-"+years.getFullYear()+" <b>Global Games Entretenimento & NetDragon Websoft Inc<\/b>. Todos os Direitos Reservados.";
		var bug = "<a href='javascript:us91.us91Bug();'>Web Error & Suggestions</a>";
	
		//child site value*/
		var top = "<a href=\"" + window.location.href + "#Top\" target=\"_self\">Topo</a>";
		var coproductfaq = "<a target=\"_blank\" href=\"/conquest-points-cps/\">Sobre o Produto</a>";
		// var ussitemap = "<a target=\"_blank\" href=\"http://us.91.com/tq/sitemap.shtml\">Mapa do Site</a>";
			
		var cocontactus = "<a target=\"_blank\" href=\"http://www.tqpoints.com.br/contact_us.php\">Fale Conosco</a>";
		var cosignup = "<a target=\"" + target + "\" href=\"/signup/\">Registre-se</a>";
		var usproductfaq = "<a target=\"" + target + "\" href=\"/faq/\">FAQ</a>";
		var hometq = "<a target=\"" + target + "\" href=\"/\">Home</a>";
		var forum = "<a target=\"_blank\" href=\"http://forum.globalgames.com.br/\">Fórum</a>";
		var pais = "<a target=\"_blank\" href=\"/informacoes-aos-pais/\">Informações aos Pais</a>";
        var termos_uso = "<a target=\"_blank\" href=\"/termos-de-uso/\">Termos de Uso</a>";
		// var cositemap = "<a target=\"" + target + "\" href=\"http://co.91.com/guide/sitemap.shtml\">Mapa do Site</a>";
		
		

		function getValue(txt){
			var value = "";
			var items = txt.split("<br>");
			var sitem = null;
			var part = null;
			var parttxt = null;
			for(var i = 0; i < items.length; i++){
				sitem = items[i].split(',');
				part = (i == 1) ? "|" : " ";
				parttxt = "";
				for(var k = 0; k < sitem.length; k++)
					parttxt += eval(sitem[k].valueOf()) + part;
				value += parttxt.substring(0,parttxt.length - 1) + "<br />";
			}
			return value;
		}
		document.writeln("<table cellSpacing=\"0\" cellPadding=\"0\" width=\"" + tbWidth + "\" height=\"50\" border=\"0\" class=\"public_bm_table\"><tbody><tr>");
		if($.browser.msie && $.browser.version == "6.0"){
			document.writeln("<tr>"+
						"<td><a href='http://www.globalgames.com.br' style='width:250px;height:200px;display:block;background:url(/img/ie6/logos.gif) transparent 0 0 no-repeat;margin-top:-14px;height:58px;'><\/a><\/td>"+
						"<td><a href='http://netdragon.com' target='_blank' style='width:250px;height:200px;display:block;background:url(/img/ie6/logos.gif) transparent 0 -60px no-repeat;margin-top:-14px;height:58px;'><\/a><\/td>"+
						"<td><a href='http://us.tqdigital.com/en/' target='_blank' style='width:250px;height:200px;display:block;background:url(/img/ie6/logos.gif) transparent 0 -115px no-repeat;margin-top:-14px;height:58px;'><\/a><\/td>"+
						"<\/tr><tr><td colspan='3' align=\"center\" class=\"public_bm_td2\" id=\"public_bottom_context\"> <\/td><\/tr><\/tbody><\/table>");
		}else{
			document.writeln("<tr>"+
					"<td><a href='http://www.globalgames.com.br' style='width:250px;height:200px;display:block;background:url(/img/logo/logos.png) transparent 0 0 no-repeat;margin-top:-14px;height:58px;'><\/a><\/td>"+
					"<td><a href='http://netdragon.com' target='_blank' style='width:250px;height:200px;display:block;background:url(/img/logo/logos.png) transparent 0 -60px no-repeat;margin-top:-14px;height:58px;'><\/a><\/td>"+
					"<td><a href='http://us.tqdigital.com/en/' target='_blank' style='width:250px;height:200px;display:block;background:url(/img/logo/logos.png) transparent 0 -115px no-repeat;margin-top:-14px;height:58px;'><\/a><\/td>"+
					"<\/tr><tr><td colspan='3' align=\"center\" class=\"public_bm_td2\" id=\"public_bottom_context\"> <\/td><\/tr><\/tbody><\/table>");
		}
		
		document.getElementById("public_bottom_context").innerHTML = " ";
	
		bmContext = document.getElementById("public_bottom_context");
		
		switch(siteType){
//			case site.us: bmContext = getValue("copyright<br>about91,useragreement,usproductfaq,ad,bug"); break;
//			case site.co: bmContext = getValue("copyright<br>hometq,forum,cosignup,about91,coproductfaq,pais,cocontactus"); break;
//			default:bmContext = getValue("copyright<br>about91,eu91,uscontactus,ussignup,usproductfaq,useragreement,bug"); break;
			case site.us: bmContext = getValue("copyright<br>useragreement,usproductfaq,ad,bug"); break;
			case site.co: bmContext = getValue("copyright<br>hometq,forum,cosignup,pais,cocontactus"); break;
			default:bmContext = getValue("copyright<br>eu91,uscontactus,ussignup,usproductfaq,useragreement,bug"); break;
		}
		document.getElementById("public_bottom_context").innerHTML = bmContext;
		   try{setPageLinksToReg();}catch(err){}
	}
	
	this.us91Bookmark = function(){
		var title=document.title
		var url=document.location.href
		if (window.sidebar) window.sidebar.addPanel(title, url,"");
		else if( window.opera && window.print ){
			var mbm = document.createElement('a');
			mbm.setAttribute('rel','sidebar');
			mbm.setAttribute('href',url);
			mbm.setAttribute('title',title);
			mbm.click();
		}
		else if( document.all ) window.external.AddFavorite( url, title);
	}
	
	this.us91Flash = function(iUrl,iWidth,iHeight){
		var flash = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="'+ iWidth +'" height="' + iHeight +'" />';
		flash = flash + '<param name="movie" value="'+ iUrl +'" />';
		flash = flash + '<param name="quality" value="high" />';
		flash = flash + '<param name="menu" value="false" />';
		flash = flash + '<param name="wmode" value="transparent" />';
		
		flash = flash + '<embed src="' + iUrl + '" width="'+ iWidth +'" height="'+ iHeight +'" menu="false" quality="high" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" mwode="transparent"></embed>';
		
		flash = flash + '</object>';
		
		document.writeln(flash);
	}

	
	this.us91Bug = function(){
		var toUrl = "http://report.us.91.com/bug_report.htm?url="+escape(top.window.location.href);
		 window.open(toUrl, null, "height=450, width=400, status=no, toolbar=no, menubar=no, location=no");
	}
	
	this.us91Tab = function( pSelf,pCnt,pOn,pOff ){
		if( pSelf == null || pCnt == null ) return;
		
		if( $E( pCnt ) != null ){
			$pSelf.className = pSelf.className==pOff?pOn:pOff;	
			$E( pCnt ).style.display = $E( pCnt ).style.display =='none'?'':'none';
		}
	}
	
}
var us91 = new UE_US91();

/******************************
 *Effect:        see big image
 *Version:       1.0.0(2009-11)
 *Author:        S.S.L
 *Modify:        2009-07-17
*******************************/

function UE_Pic(){	
	function $ID( id ){ return document.getElementById( id ); }
	function showPic( pPic ){
		$ID( "ue_pic" ).innerHTML = '<img src="' + pPic + '" onclick="document.getElementById(\'ue_pic\').style.display=\'none\'" title="close" />';
		$ID( "ue_pic" ).style.display = "block";
	}
	
	function doDiv(){
		var str = '';
		
		str += '<style type="text/css">';
		str += '.ue_pic {left:50%;margin-left:-501px;max-width:1000px;position:absolute;text-align:center;top:5%;width:1002px;z-index:1000;}';
		str += '.ue_pic img {background-color:#FFFFFF;border:1px solid #CCCCCC;cursor:pointer;/*max-height:1000px;*/max-width:1000px;padding:5px;}';
		str += 'a.zoom {position:relative;}';
		str += 'a.zoom span {display:none;}';
		str += 'a.zoom:hover span {display:block;}';
		str += 'a.zoom img {max-width:590px;_width:expression(this.width > 560 ? 560: true);}';
		str += '.tozoom {background:transparent url(http:\/\/conquestonline.com.br/img/sei_la/fullsizes.png) no-repeat scroll 0 0;bottom:15px;cursor:pointer;display:block;height:58px;position:absolute;top:0; left:50%; margin-left:-30px;text-indent:-10000em;width:57px;}';
		str += '</style>';
		
		str += '<div id="ue_pic" class="ue_pic"></div>';
		
		document.write( str );
	}
	
	this.doPic = function( pPic ){
		if( pPic == null ) return;
		showPic( pPic );
	}
	
	this.init = function(){
		doDiv();
	}

}
var uepic = new UE_Pic();

/******************************
 *Effect:        ue_tab.js
 *Version:       1.0.0(2009-03-02)
 *Author:        S.S.L
 *Modify:        2009-07-17
*******************************/
function UE_Tab( tab_menu,tab_main,cur_tab,mouse,time ){
	var pre_no;
	var timer,autoplay_timer;
	var tab;
	
	function $( id ){ return document.getElementById( id );}
	
	function run( no ){
		if( no != null ){
			if( timer != null )clearInterval( timer );
			timer = setInterval( function(){
				doChange(no);
			},200 );
		}
	}
	
	function addEvent(){
		for( var i = 0; i < tab.length; i++ ){
			tab[i].cur_no = i;
			if( mouse == null ){
				tab[i].onclick = function(){ 
					run( this.cur_no );
					return false;
				}
			} else {
				tab[i].onmouseover = tab[i].onmouseout= function(){
					run( this.cur_no );
					return false;
				}
			}
		}
	}
	
	function doChange( k ){
		if( tab[pre_no] != null && $(tab_main+(pre_no+1)) != null ){
			tab[pre_no].className = "off";
			$(tab_main+(pre_no+1)).style.display = "none";
		}
		
		if( tab[k] != null && $(tab_main+(k+1)) != null ){
			tab[k].className = "on";
			$(tab_main+(k+1)).style.display = "block";
		}
		
		pre_no = k;
		
		if( timer != null )clearInterval( timer );
	}
	
	function autoplay(){
		if( pre_no < tab.length ){
			doChange( pre_no+1 );
		} else {
			pre_no = tab.length-1;
			doChange( 0 );
		}
	}
	
	function init(){
		if( tab_menu == null || tab_main == null ) return;
		
		var tabs = tab_menu.split(" ");
		
		if( tabs[0] == null || tabs[1] == null || $( tabs[0] ) == null ) return;
		
		tab = $( tabs[0] ).getElementsByTagName( tabs[1] );

		pre_no = ( cur_tab == null ) ? 0:(cur_tab-1);
		
		doChange( pre_no );
		addEvent();
		
		if( time != null && time > 0 )
			autoplay_timer = setInterval( autoplay,time );
	}
	
	init();

}

/******************************
 *Effect:        input tip 
 *Version:       1.0.0(2009-11-22)
 *Author:        S.S.L
*******************************/

function UE_Input(){
	var self = this;
	var o,pre_v,first_v,btn;
	var methodname;
	
	function $( id ){ return document.getElementById( id );}
	function doFocus(){
		if( o.value == pre_v ){
			o.value = "";
		}
	}
	function doBlur(){
		if( o.value == "" ){
			o.value = pre_v;
		}	
	}
	function appendEvent(){
		if( o.value == pre_v ){
			alert( pre_v );
			return false;
		} else {
			addNewEvent( methodname );
		}
	}
	
	function addNewEvent( newmethodname ){
		if( document.all ){
			btn.attachEvent( "onclick", function(){ eval(newmethodname + "()");} );
		} else {
			btn.addEventListener( "click", function(){ eval(newmethodname + "()");}, false);
		}
	}
	
	this.newMethod = function( newmethodname ){
		methodname = newmethodname;
		appendEvent();	
	}
	
	this.init = function( inputid,txt_v,input_btnid ){
		o = $( inputid );
		pre_v = txt_v;
		o.value = txt_v;
		
		o.onfocus = doFocus;
		o.onblur = doBlur;
		
		btn = $( input_btnid );
		addNewEvent( "appendEvent" );
	}
}
var ue_ipt = new UE_Input();

/******************************
 *Effect:        jump to top 
 *Version:       1.0.0(2009-12-08)
 *Author:        S.S.L
*******************************/

function jumpToTop(){
	document.writeln("<style type=\"text\/css\">.totop {position: fixed;top: 85%;left: 94%;padding-top: 0px;padding-right: 0px;z-index:1001;}");
	document.writeln("* html .totop {position: absolute;top: expression((document.documentElement.scrollTop || document.body.scrollTop) + Math.round(85 * (document.documentElement.offsetHeight || document.body.clientHeight) \/ 100) + \'px\');}<\/style>");
	document.writeln("<div class=\"totop\"><img src=\"http:\/\/conquestonline.com.br\/img\/sei_la\/totop_tq1.gif\" width=\"25\" height=\"66\" border=\"0\" usemap=\"#Map\"><map name=\"Map\"><area shape=\"rect\" title=\"Set Bookmark\" coords=\"4,18,22,30\" href=\"javascript:us91.us91Bookmark()\"><area shape=\"rect\" title=\"Home\" coords=\"4,35,22,47\" href=\"http:\/\/us.91.com\/\"><area shape=\"rect\" coords=\"4,54,22,66\" onclick=scroll(0,0) href=\"#\"><\/map><\/div>");
}


/******************************
 *Effect:        en91uc_profilecomplete.js
 *Version:       1.0.0(2009-9-24)
 *Author:        Blaze
*******************************/

var gCurPageUrl = window.location.href;
var gUcSiteUrl  = getUCDomain();					
var gSvcUrl     = gUcSiteUrl + 'port/js_svc.php?1';

// check user's profile
function en91CheckProfileComplete() {
	try{
		var backUrl = encodeURIComponent(gCurPageUrl);
		var backTitle = encodeURIComponent(gReferTitle);
		
		url = gSvcUrl + '&action=en91_check_profile_complete&' 
		+ 'backurl=' + backUrl + '&backtitle=' + backTitle + '&s=' + (new Date()).getTime();
		
		requestSvc('bookmarkJs', url, 'callbackCheckProfileComplete');
	}catch( err ){
		alert( "bookmark.js:addToBookmark" + " | " + err.description );
	}

}

// callbakc func of showMmoUserInfo
// - if logged in, then show loged user's info div; else show login url
function callbackCheckProfileComplete(s) {
	var sJson = s.toString();
	eval("var oJson = " + sJson + ";");
	var res = oJson.result.trim();
	if ('unfilled' == res) {
		showConfirm();
		return;
	}
}

function showConfirm() {
	try{
		var inner = '';
		var doc = ( document.compatMode.toLowerCase()=="css1compat" ) ? document.documentElement : document.body;		
		var _oDiv = document.getElementById('en91__profileDiv');
		var _signInUrl = gUcSiteUrl + '?controller=member_userinfo&action=profile';
		var left = (doc.clientWidth - 480 ) / 2;
		var top = (doc.clientHeight - 170 ) / 2;
					 
		inner += '';
		inner += '<div id="alert_mask" style="height:'+doc.scrollHeight + 'px"></div>';
		inner += '<div class="compInfoAlert_1" style="left:'+left + 'px; top:'+top + 'px"></div>';
		inner += '<div class="compInfoAlert_2" style="left:'+(left+5) + 'px; top:'+(top+5) + 'px">';
		inner += '<div class="compInfoAlert_top" id="compInfoAlert_top">Notice</div>';
		inner += '	<div class="compInfoAlert_cnt" id="compInfoAlert_cnt">If you have a character satisfied our reward condition, you will have a chance to win 1 shell by complete your information in User Center. That\'s too easy, so would you like to go to get your 1 shell right now?</div>';
		inner += '<div class="compInfoAlert_btm">';
		inner += '	<input type="button" onclick="location.href=\'' + _signInUrl + '\'" value="Yes, of course!" /> ';
		inner += '	<input type="button" onclick="document.getElementById(\'en91__profileDiv\').style.display = \'none\';"  value="No, later" /> ';
		inner += '	</div>';
		inner += '</div>';
		
		if (!_oDiv) {
			_oDiv = document.createElement("div");
			_oDiv.id = "en91__profileDiv";
			_oDiv.style.width = Math.max( doc.scrollWidth,doc.clientWidth ) + 'px';

			document.body.appendChild(_oDiv);
			_oDiv.innerHTML = inner;
		} else {

			_oDiv.style.display = 'block';	
		}

	}catch( err ){
		alert( "bookmark.js:showCatsDiv" + " | " + err.description );
	}
}


//----------------------------------------------------------------------
//    3. common functions
//----------------------------------------------------------------------

//defautl callback function
function callbackFunc(s) { }

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, '');
}

function requestSvc(id, url, funcName) {
	if (typeof(funcName) == 'undefined') { funcName = 'callbackFunc'; } 
	url += (url.indexOf('?') == -1) ? '?func_name=' + funcName : '&func_name=' + funcName;
	oScript = document.getElementById(id);
	var head = document.getElementsByTagName("head").item(0);
	if (oScript) {
		head.removeChild(oScript);
	}
	oScript = document.createElement("script");
	oScript.setAttribute("src", url);
	oScript.setAttribute("id",id);
	oScript.setAttribute("type","text/javascript");
	oScript.setAttribute("language","javascript");

	head.appendChild(oScript);
	return oScript;
}

function getUCDomain() {
	var host = window.location.host;
	var tmp = host.split('.');
	var suffix = tmp[tmp.length - 1];
	if(suffix == 'com') {
		return 'http://my.account.91.com/';
	} else {
		if(suffix == 'tmc') {
			return 'http://my2.account.91.tmc/';
		} else {
			return 'http://my2.account.91.nnd/';
		}
	}
}

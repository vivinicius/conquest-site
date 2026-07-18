//author    ：  jin
//function  ：  gapSlide-v1.0
//first time：  2009-7-26
//last time ：  2009-7-26
(function($) {
	$.fn.MakeItSlide=function(options){
		var defaults = { 
			btnLeft : null,
			btnRight : null,
			imgWidth : 160}; 
		var options = $.extend({}, defaults, options),that = $("ul",this),imgLen = $("li",that).length,maxWidth = imgLen*options.imgWidth;
		options.btnRight.addClass("no-select");
		options.btnLeft.addClass("no-select");
		that.addClass("no-select");
		that.width(maxWidth);
		$(options.btnRight).click(function(){
			var marginLeft = that.css("margin-left").replace("px","")*1 
			if(!that.is(":animated")){
				if(marginLeft > -(maxWidth-options.imgWidth)){
					that.animate({"margin-left":"-="+options.imgWidth+"px"});		  
				}else{
					that.prepend($("li",that).last().clone())
					that.css({width:maxWidth+options.imgWidth,"margin-left":"0px"}).animate({"margin-left":-(options.imgWidth)+"px"},500,function(){$("li:first",that).remove();that.css({"margin-left":"0px","width":maxWidth})})
				}
			}
			return false;
			})
		$(options.btnLeft).click(function(){
 				var marginLeft = that.css("margin-left").replace("px","")*1 
			if(!that.is(":animated")){
				if(marginLeft  < 0){
					that.animate({"margin-left":"+="+options.imgWidth+"px"});		  
				}else{
					that.append($("li",that).first().clone())
					that.css({width:maxWidth+options.imgWidth,"margin-left":-(maxWidth)+"px"}).animate({"margin-left":-(maxWidth-options.imgWidth)+"px"},500,function(){$("li:last",that).remove();that.css({"margin-left":-(maxWidth-options.imgWidth)+"px","width":maxWidth})})
				}
			}
			return false;
		})
		return false;
	};
})(jQuery);

/*
function:   tab-v3.0
author:     jin
depends:    jquery-1.3.js
			
firstTime:  2009-8-13
lastTime:   2009-11-19
*/
(function($){
	$.fn.UE_Tab=function(opt){
		//settings
		var settings=jQuery.extend(
			{
				tabAutoPlay:false,//自动播放(false:禁用播放；数值：对应播放间隔毫秒数)
				tabAutoEvent:function($this,autoPlay,autoStop){
				//old
				//{
					var settings=$this.data("settings");
					var $tabBody=settings.tabBody;
					$this.hover(autoStop,autoPlay);
					$tabBody.hover(autoStop,autoPlay);
				//}
				//new
				//{
					
				//}
				},//自动播放事件外接口
				tabBind:"click",//标签绑定事件
				tabIndex:0,//默认选中标签下标
				tabHandleOn:"on",//选择标签样式
				tabBody:"#tabBody > div",//标签内容体序列
				//tabBodyUrl:[{url:"tabl.html"},{url:"tab2.html"},{url:"tab3.html"},{url:"tab4.html"}]//异步内容
				tabClickReturn:false,
				tabBodyUrl:false,//异步内容
				tabFinish:function($this,_Index){
				//old
				//{
					var settings=$this.data("settings");
					var $tabBody=settings.tabBody,
						tabBodyUrl=settings.tabBodyUrl,
						tabIndex=settings.tabIndex,
						tabFlag=settings.tabFlag,
						tabHandleOn=settings.tabHandleOn;
					if(tabFlag==0){
						$this.eq(tabIndex).removeClass(tabHandleOn);
						$this.eq(_Index).addClass(tabHandleOn);
					}
					if(tabBodyUrl){
						$tabBody.load(tabBodyUrl[_Index].url);
						$tabBody.show();
					}else{
						$tabBody.eq(tabIndex).hide();
						$tabBody.eq(_Index).show();
					}
				//}
				//new
				//{
					
				//}
				}//回调
			},
			opt,
			{tabFlag:0}
		);
		var $this=$(this);
	//setting
	//{ tabFlag  是否存在标签头
		if(!$this.context){
			settings.tabFlag=1;
		}
	//}
	//{ tabBody
		var tabBody=settings.tabBody;
		var $tabBody=$(settings.tabBody);
		settings.tabBody=$tabBody;
	//}
	//{ size
		var tabBodyUrl=settings.tabBodyUrl;
		var _size=$tabBody.size();
		if(tabBodyUrl){
			_size=tabBodyUrl.length;
		}
		settings.tabSize=_size;
	//}
	//{ tabIndex
		var tabIndex=settings.tabIndex;
		if(tabIndex<0)tabIndex=0;
		if(tabIndex>=_size)tabIndex=_size-1;
	//}
		$this.data("settings",settings);
		//main
		main($this,settings);
		//return
		return $this;
    };
    //autoplay
	var main=function($this,settings){
		//settings
		var tabAutoPlay=settings.tabAutoPlay,
			tabAutoEvent=settings.tabAutoEvent,
			tabBind=settings.tabBind,
			tabIndex=settings.tabIndex,
			tabHandleOn=settings.tabHandleOn,
			$tabBody=settings.tabBody,
			tabClickReturn=settings.tabClickReturn,
			tabBodyUrl=settings.tabBodyUrl,
			tabSize=settings.tabSize,
			tabFlag=settings.tabFlag;
		//switch bind
		if(tabFlag==0){
			var Tab=function(){
				$this.UE_TabGo($this.index($(this)));
				if(!tabClickReturn){
					return false;
				}
			};
			switch(tabBind){
				case "hover":
					$this.mouseover(Tab);
					if(!tabClickReturn){
						$this.click(function(){return false;});
					}
					break;
				case "click":
					$this.click(Tab);
					break;
				default:
					break;
			}
		}
		//init
		$tabBody.hide();
		$this.removeClass(tabHandleOn);
		$tabBody.eq(tabIndex).show();
		$this.eq(tabIndex).addClass(tabHandleOn);
		//$this.UE_TabGo(tabIndex);
		//#############################################################################
		var Pre=function(){
			$this.UE_TabPre();
		};
		var Next=function(){
			$this.UE_TabNext();
		};
		//#############################################################################
		//auto play
		if(tabAutoPlay){
			var __timerID;
			var autoPlay=function(){
				__timerID = window.setInterval(Next,tabAutoPlay);
				return false;
			};
			var autoStop = function(){
				window.clearInterval(__timerID);
				return false;
			};
			//init
			autoPlay();
			//on
			settings.tabAutoEvent($this,autoPlay,autoStop);
		}
		//return main
		return false;
	};
	$.fn.UE_TabGo=function(_index){
		var $this=$(this);
		//settings
		var settings=$this.data("settings");
		settings.tabFinish($this,_index);
		settings.tabIndex=_index;
		return false;
    };
	$.fn.UE_TabPre=function(){
		var $this=$(this);
		//settings
		var settings=$this.data("settings");
		var tabIndex=settings.tabIndex,
			tabSize=settings.tabSize;
		tabIndex=tabIndex-1;
		if(tabIndex<0){
			tabIndex=tabSize-1;
		}
		$this.UE_TabGo(tabIndex);
	};
	$.fn.UE_TabNext=function(){
		var $this=$(this);
		//settings
		var settings=$this.data("settings");
		var tabIndex=settings.tabIndex,
			tabSize=settings.tabSize;
		tabIndex=tabIndex+1;
		if(tabIndex>=tabSize){
			tabIndex=0;
		}
		$this.UE_TabGo(tabIndex);
	};
})(jQuery);

/**
 *Filename:      main.js
 *Version:       1.0.0(2009-03-02)
 *Website:       http://
 *Author:        S.S.L
 *Modify:        2009-05-21
**/
function o_input(){
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

///////////////////////////////////////////////////////////
// "Live Clock" script (3.0)
// By Mark Plachetta (astroboy@zip.com.au)
// http://www.zip.com.au/~astroboy/liveclock/
///////////////////////////////////////////////////////////

var LC_Style=[
	"Arial",			// clock font
	"5",				// font size
	"black",			// font colour
	"white",			// background colour
	"The time is: ",	// html before time
	"",					// html after time
	300,				// clock width
	1,					// 12(1) or 24(0) hour?
	1,					// update never(0) secondly(1) minutely(2)
	3,					// no date(0) dd/mm/yy(1) mm/dd/yy(2) DDDD MMMM(3) DDDD MMMM YYYY(4)
	0,					// abbreviate days/months yes(1) no(0)
	null				// gmt offset (null to disable)
];

///////////////////////////////////////////////////////////

var LC_IE=(document.all);
var LC_NS=(document.layers);
var LC_N6=(window.sidebar);
var LC_Old=(!LC_IE && !LC_NS && !LC_N6);

var LC_Clocks=new Array();

var LC_DaysOfWeek=[
	["Sunday","Sun"],
	["Monday","Mon"],
	["Tuesday","Tue"],
	["Wednesday","Wed"],
	["Thursday","Thu"],
	["Friday","Fri"],
	["Saturday","Sat"]
];

var LC_MonthsOfYear=[
	["January","Jan"],
	["February","Feb"],
	["March","Mar"],
	["April","Apr"],
	["May","May"],
	["June","Jun"],
	["July","Jul"],
	["August","Aug"],
	["September","Sep"],
	["October","Oct"],
	["November","Nov"],
	["December","Dec"]
];

var LC_ClockUpdate=[0,1000,60000];

///////////////////////////////////////////////////////////

function LC_CreateClock(c) {
	if(LC_IE||LC_N6){clockTags='<span id="'+c.Name+'" style="width:'+c.Width+'px;background-color:'+c.BackColor+'"></span>'}
	else if(LC_NS){clockTags='<ilayer width="'+c.Width+'" bgColor="'+c.BackColor+'" id="'+c.Name+'Pos"><layer id="'+c.Name+'"></layer></ilayer>'}

	if(!LC_Old){document.write(clockTags)}
	else{LC_UpdateClock(LC_Clocks.length-1)}
}
function LC_InitializeClocks(){
	//LC_OtherOnloads();
	if(LC_Old){return}
	for(i=0;i<LC_Clocks.length;i++){
		LC_UpdateClock(i);
		if (LC_Clocks[i].Update) {
			eval('var '+LC_Clocks[i].Name+'=setInterval("LC_UpdateClock("+'+i+'+")",'+LC_ClockUpdate[LC_Clocks[i].Update]+')');
		}
	}
}

function LC_UpdateClock(Clock){
	var c=LC_Clocks[Clock];

	var t=new Date();
	if(!isNaN(c.GMT)){
	var offset=t.getTimezoneOffset();
	if(navigator.appVersion.indexOf('MSIE 3') != -1){offset=offset*(-1)}
		t.setTime(t.getTime()+offset*60000);
		t.setTime(t.getTime()+c.GMT*3600000);
	}
	var day=t.getDay();
	var md=t.getDate();
	var mnth=t.getMonth();
	var hrs=t.getHours();
	var mins=t.getMinutes();
	var secs=t.getSeconds();
	var yr=t.getYear();

	if(yr<1900){yr+=1900}

	if(c.DisplayDate>=3){
		md+="";
		abbrev="th";
		if(md.charAt(md.length-2)!=1){
			var tmp=md.charAt(md.length-1);
			if(tmp==1){abbrev="st"}
			else if(tmp==2){abbrev="nd"}
			else if(tmp==3){abbrev="rd"}
		}
		md+=abbrev;
	}

	var ampm="";
	if(c.Hour12==1){
		ampm="AM";
		if(hrs>=12){ampm="PM"; hrs-=12}
		if(hrs==0){hrs=12}
	}
	if(mins<=9){mins="0"+mins}
	if(secs<=9){secs="0"+secs}

	var html = '<font color="'+c.FntColor+'" face="'+c.FntFace+'" size="'+c.FntSize+'">';
	html+=c.OpenTags;
	html+=hrs+':'+mins;
	if(c.Update==1){html+=':'+secs}
	if(c.Hour12){html+=' '+ampm}
	if(c.DisplayDate==1){html+=' '+md+'/'+(mnth+1)+'/'+yr}
	if(c.DisplayDate==2){html+=' '+(mnth+1)+'/'+md+'/'+yr}
	if(c.DisplayDate>=3){html+=' on '+LC_DaysOfWeek[day][c.Abbreviate]+', '+md+' '+LC_MonthsOfYear[mnth][c.Abbreviate]}
	if(c.DisplayDate>=4){html+=' '+yr}
	html+=c.CloseTags;
	html+='</font>';

	if(LC_NS){
		var l=document.layers[c.Name+"Pos"].document.layers[c.Name].document;
		l.open();
		l.write(html);
		l.close();
	}else if(LC_N6||LC_IE){
		document.getElementById(c.Name).innerHTML=html;
	}else{
		document.write(html);
	}
}

function LiveClock(a,b,c,d,e,f,g,h,i,j,k,l){
	this.Name='LiveClock'+LC_Clocks.length;
	this.FntFace=a||LC_Style[0];
	this.FntSize=b||LC_Style[1];
	this.FntColor=c||LC_Style[2];
	this.BackColor=d||LC_Style[3];
	this.OpenTags=e||LC_Style[4];
	this.CloseTags=f||LC_Style[5];
	this.Width=g||LC_Style[6];
	this.Hour12=h||LC_Style[7];
	this.Update=i||LC_Style[8];
	this.Abbreviate=j||LC_Style[10];
	this.DisplayDate=k||LC_Style[9];
	this.GMT=l||LC_Style[11];
	LC_Clocks[LC_Clocks.length]=this;
	LC_CreateClock(this);
}

///////////////////////////////////////////////////////////

//LC_OtherOnloads=(window.onload)?window.onload:new Function;
//window.onload=LC_InitializeClocks;

/*
 title:首页幻灯
 date:2010-01-13
 editor:soon 
*/
function playFlash_v2(flashid,width,height){
 var fpic =document.getElementById(flashid).getElementsByTagName("img");
 var flink =document.getElementById(flashid).getElementsByTagName("a");
 var ftitle =document.getElementById(flashid).getElementsByTagName("b");
 var fdetail =document.getElementById(flashid).getElementsByTagName("span");

 var uid = "mc_" + flashid;
 var slidesHtml = "";
 var dotsHtml = "";
 for (var i = 0; i < fpic.length; i++) {
     slidesHtml += '<div class="slide' + (i === 0 ? ' active' : '') + '">' +
         '<a href="' + flink[i].href + '" target="_blank">' +
         '<img src="' + fpic[i].src + '" alt="" onerror="this.style.display=\'none\';this.parentNode.parentNode.className+=\' noimg\';">' +
         '<div class="slide-caption"><b>' + ftitle[i].innerHTML + '</b><span>' + fdetail[i].innerHTML + '</span></div>' +
         '</a></div>';
     dotsHtml += '<span class="dot' + (i === 0 ? ' active' : '') + '" data-i="' + i + '"></span>';
 }

 var code = '<div class="modern-carousel" id="' + uid + '" style="width:' + width + 'px;height:' + height + 'px;">' +
     '<div class="carousel-track">' + slidesHtml + '</div>' +
     '<div class="carousel-dots">' + dotsHtml + '</div>' +
     '</div>';

 document.write(code);

 var el = document.getElementById(uid);
 var slides = el.getElementsByClassName("slide");
 var dots = el.getElementsByClassName("dot");
 var current = 0;
 var timer = null;

 function goTo(i) {
     slides[current].className = slides[current].className.replace(" active", "");
     dots[current].className = dots[current].className.replace(" active", "");
     current = (i + slides.length) % slides.length;
     slides[current].className += " active";
     dots[current].className += " active";
 }
 function next() { goTo(current + 1); }
 function restart() {
     if (timer) clearInterval(timer);
     timer = setInterval(next, 5000);
 }
 for (var d = 0; d < dots.length; d++) {
     dots[d].addEventListener("click", function () {
         goTo(parseInt(this.getAttribute("data-i"), 10));
         restart();
     });
 }
 restart();
}

/*
 title:二级页配图和分类截图
 date:2010-01-21
 editor:soon 
*/
//输出资料配图
	function creatPic(useful){
		var para = document.getElementById(useful).innerHTML.split(",");	
		var img = document.getElementById("pic");
				
		if ( para[1] == undefined )
		 { 
         var str1='<img height="90" width="700" alt="" src="img/ads/ad_700x90.jpg"/>'
		 document.write(str1);
         }
		else
		 { 
		  var str2='<img height="90" width="700" alt="" src="'+para[1]+'"/>'
		  document.write(str2);
		 }
	}
				
//输出分类截图
function outputSS(useful){  
		var para = document.getElementById(useful).innerHTML.split(",");
	 //  var jsurl = "http://p.images.91.com/fondo91_js/special/GD_";
	 var jsurl = "_";
       var jstag ="<script language=\"JavaScript\" type=\"text\/javascript\""
       var ss = jstag+" src=\""+jsurl + para[0] +"_ss.js"+"\"><\/script>"
  document.writeln(ss);
  }

/*
title:标题截断输出
*/
var cmsTruncate = function (obj, limit){
	$("."+obj+" a:not(':has(font,strong)')").each(function(){//无样式的链接
		$(this).text(strLimit($(this).text(),limit));
		});
	$("."+obj+" a font:not(':has(strong)')").each(function(){//加红的链接
		$(this).text(strLimit($(this).text(),limit));
		});
	$("."+obj+" a font strong").each(function(){//加红加粗的链接
		$(this).text(strLimit($(this).text(),limit));
		});
	$("."+obj+" a strong").each(function(){//加粗的链接
		$(this).text(strLimit($(this).text(),limit));
		});	
	};
var strLimit = function (str, limit) {
	var temp, i;
	temp = str.split('');
	if (temp.length > limit) {
		for (i = temp.length - 1; i > -1; --i) {
			if (i > limit) {
				temp.length = i;
			}
			else if (' ' === temp[i]) {
				temp.length = i;
				break;
			}
		}
		temp.push('...');
	}
	return temp.join('');//组合起来，不然被切成一块块的- -!
};
//浮动TOP按钮 start

var persistclose=0 

var startX = 10 

var startY = 400 

var verticalpos="fromtop" 



function iecompattest(){

return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body

}



function get_cookie(Name) {

var search = Name + "="

var returnvalue = "";

if (document.cookie.length > 0) {

offset = document.cookie.indexOf(search)

if (offset != -1) {

offset += search.length

end = document.cookie.indexOf(";", offset);

if (end == -1) end = document.cookie.length;

returnvalue=unescape(document.cookie.substring(offset, end))

}

}

return returnvalue;

}



function staticbar(){

	barheight=document.getElementById("floatbar").offsetHeight

	var ns = (navigator.appName.indexOf("Netscape") != -1) || window.opera;

	var d = document;

	function ml(id){

		var el=d.getElementById(id);

		if (!persistclose || persistclose && get_cookie("remainclosed")=="")

		el.style.visibility="visible"

		if(d.layers)el.style=el;

		el.sP=function(x,y){this.style.right=x+"px";this.style.top=y+"px";};

		el.x = startX;

		if (verticalpos=="fromtop")

		el.y = startY;

		else{

		el.y = ns ? pageYOffset + innerHeight : iecompattest().scrollTop + iecompattest().clientHeight;

		el.y -= startY;

		}

		return el;

	}

	window.stayTopLeft=function(){

		if (verticalpos=="fromtop"){

		var pY = ns ? pageYOffset : iecompattest().scrollTop;

		ftlObj.y += (pY + startY - ftlObj.y)/5;

		}

		else{

		var pY = ns ? pageYOffset + innerHeight - barheight: iecompattest().scrollTop + iecompattest().clientHeight - barheight;

		ftlObj.y += (pY - startY - ftlObj.y)/5;

		}

		ftlObj.sP(ftlObj.x, ftlObj.y);

		setTimeout("stayTopLeft()", 5);

	}

	ftlObj = ml("floatbar");

	stayTopLeft();

}



function backToTop() {

	 var x1 = x2 = x3 = 0; var y1 = y2 = y3 = 0;

	 if (document.documentElement) { x1 = document.documentElement.scrollLeft || 0; y1 = document.documentElement.scrollTop || 0;}

	 if (document.body) { x2 = document.body.scrollLeft || 0; y2 = document.body.scrollTop || 0;}

	 x3 = window.scrollX || 0;

	 y3 = window.scrollY || 0;

	 var x = Math.max(x1, Math.max(x2, x3));

	 var y = Math.max(y1, Math.max(y2, y3));

	 window.scrollTo(Math.floor(x / 2), Math.floor(y / 2));

	 if (x > 0 || y > 0) { window.setTimeout("backToTop()", 5);}

}

	

	function dhmenuchg(obj,n){

		var dhdiv = obj.getElementsByTagName("div")[0];

		var dhul = obj.getElementsByTagName("ul")[0];

		dhdiv.className = n==1?"dh_topdiv_on":"dh_topdiv";

		dhul.style.display = n==1?"block":"none";

	}

	function dhmenuchg2(obj,n){

		

		var dhul = obj.getElementsByTagName("ul")[0];

		var dha = obj.getElementsByTagName("a")[0];

		obj.style.position = n==1?"relative":"";

		dhul.style.display = n==1?"block":"none";

		dha.className = n==1?"dh_a_on":"";

	}

//浮动TOP按钮 end

//flv播放器
function flvPlayer( src, width, height)
{
var swf_width = width;
var swf_height = height;
var texts = 'video'
var files = src;

document.write('<p align="center"');
document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="'+ swf_width +'" height="'+ swf_height +'">');
//document.write('<param name="movie" value="http://images.91.com/co/flash/flvplayer.swf?IsShowTime=0&IsAutoPlay=0"><param name="quality" value="high">');
document.write('<param name="menu" value="false"><param name="allowFullScreen" value="true" />');
document.write('<param name="FlashVars" value="vcastr_file='+files+'&vcastr_title='+texts+'">');
//document.write('<embed src="http://images.91.com/co/flash/flvplayer.swf?IsShowTime=0&IsAutoPlay=0" allowFullScreen="true" FlashVars="vcastr_file='+files+'&vcastr_title='+texts+'" menu="false" quality="high" width="'+ swf_width +'" height="'+ swf_height +'" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'); document.write('</object></p>');
}

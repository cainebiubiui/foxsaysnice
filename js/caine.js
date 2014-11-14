
(function(window){

    'use strict';

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function(elem, c){
            return elem.classList.contains(c);
        };
        addClass = function(elem, c){
            elem.classList.add(c);
        };
        removeClass = function(elem, c) {
            elem.classList.remove(c);
        };
    }
    else {
        hasClass = function(elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function(elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function( elem, c ) {
            elem.className = elem.className.replace( classReg( c ), ' ' );
        };
    }

    function toggleClass( elem, c ) {
        var fn = hasClass( elem, c ) ? removeClass : addClass;
        fn( elem, c );
    }

    var clearAllElements=function(elements){
        while(elements.firstChild){
            var clear=elements.removeChild(elements.firstChild);
            clear = null;
        }
    }

    function setCookie(key,value){
        var Days = 10;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = key + "="+ escape(value) + ";expires=" + exp.toGMTString();
    }

    function getCookie(key){
        var arr = document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
        if(arr != null) return unescape(arr[2]); return null;
    }

    function delCookie(key){
        var exp = new Date();
        exp.setTime(exp.getTime()-1000);
        var cval=getCookie(key);
        if(cval!=null) document.cookie= key + "="+cval+";expires="+exp.toGMTString();
    }

    var right_userinput=function(input,type){
        if(type==1){
            var right=new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$");
            if(right.test(input)){
                return 1;
            }else if(!right.test(input)){
                return 0;
            }
        }else if(type==2){

        }
    }

    var imagepost = function(form, url, code, timeout_code){
        if(window.FormData){
            var formdata = new FormData(form);

            var xhr = getxmlhttpobj();

            xhr.open('POST', url, true);

            xhr.timeout = 10000;

            xhr.ontimeout = function(){
                timeout_code || alert('-10');
            }

            xhr.onload = function(){
                if(xhr.status == 200){
                    code(xhr.responseText);
                }
            }

            if(document.querySelector('.uploadprogress')){
                xhr.upload.onprogress = function(event){
                    if(event.lengthComputable){
                        var conplete = (event.loaded / event.total*100 | 0);

                        var progress = document.querySelector('.uploadprogress');

                        progress.value = progress.innerHTML = conplete;
                    }
                }
            }

            xhr.send(formdata);
        }
    }

    var post=function(postData,url,code){

        var code=code || null;

        var xmlHttp=getXmlHttpObj();

        xmlHttp.open("POST",url,true);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xmlHttp.onreadystatechange=function(){
            if(xmlHttp.readyState==4 && xmlHttp.status==200){
                if(code!=null){
                    code(xmlHttp.responseText);
                }
            }
        }

        xmlHttp.send(postData);
    }

    var getxmlhttpobj = function(){
        try{
            var xhr = new XMLHttpRequest();
        }catch (e){
            try{
                var xhr = new ActiveXObject("Msxml2.XMLHTTP");
            }catch (e){
                var xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
    }

    var add_listener=function(obj, event, code){
        if(browser_info()==1){
            obj.attachEvent("on" +event, code);
        }else{
            obj.addEventListener(event, code, false);
        }
    }

    var caine = {
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass,

        clear_all_elements:clearAllElements,
        setcookie:setCookie,
        getcookie:getCookie,
        delcookie:delCookie,

        imagepost:imagepost,
        post:post,

        add_listener:add_listener

    }

    if (typeof define === 'function' && define.amd) {
        define( caine );
    } else {
        window.caine = caine;
    }

})( window );

var $ = function (obj) {
    return document.querySelector(obj);
}

var $n=function(obj){
    return [].slice.call(document.querySelectorAll(obj));
}

var io=function(obj){
    console.log(obj);
}

//***********************************************************************
var browser_info=function(){

    var iUserAgent = navigator.userAgent;
    var iAppVersion = parseFloat(navigator.appVersion);
    var isOpera = iUserAgent.indexOf("Opera") > -1;
    var isKHTML = iUserAgent.indexOf("KHTML") > -1 || iUserAgent.indexOf("Konqueror") > -1 || iUserAgent.indexOf("AppleWebKit") > -1;
    if(isKHTML){
        var isChrome = iUserAgent.indexOf("Chrome") > -1;
        var isSafari = iUserAgent.indexOf("AppleWebKit") > -1 && !isChrome;
        var isKonq = iUserAgent.indexOf("Konqueror") > -1;
    }
    var isIE = iUserAgent.indexOf("compatible") > -1 && iUserAgent.indexOf("MSIE") > -1 && !isOpera;
    var isMoz = iUserAgent.indexOf("Gecko") > -1 && !isKHTML;
    var isNS4 = !isOpera && !isMoz && !isKHTML && !isIE && (iUserAgent.indexOf("Mozilla") ==0) && (navigator.appName == "Netscape") && (fAppVersion >=4.0 && fAppVersion <= 5.0);
//此处为检测平台
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh");
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if(isIE) {
        //此处没用userAgent来检测，主要是考虑IE9浏览器按F12可以切换到IE7，IE8;用userAgent会检测不出来
        if (parseInt($.browser.version, 10) <= 6) {
            alert("ohps，请更换更现代的浏览器来获得好的体验;)");
        }else{

        }

        return 1;
    }else{
        return 0;
    }

}





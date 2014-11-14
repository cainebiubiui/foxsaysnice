(function(window){

    var imagepost = function(form, url, code){
        if(window.FormData){

            var f = document.querySelector(form);

            var formdata = new FormData(f);

            var xhr = getXmlHttpObj();

            xhr.open('POST', url, true);

            xhr.timeout = 10000;

            xhr.ontimeout = function(){
                alert('-10');
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

    var post=function(data, url, code){

        var data=data || null;

        var xmlHttp=getXmlHttpObj();
        if(!xmlHttp){
        }

        xmlHttp.open("POST",url,true);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xmlHttp.onreadystatechange=function(){
            if(xmlHttp.readyState==4 && xmlHttp.status==200){
                if(code!=null){
                    code(xmlHttp.responseText);
                }
            }
        }

        xmlHttp.send(data);
    }

    var get=function(url, code){

        var xmlHttp=getXmlHttpObj();
        if(!xmlHttp){
        }

        xmlHttp.open("GET",url,true);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xmlHttp.onreadystatechange=function(){
            if(xmlHttp.readyState==4 && xmlHttp.status==200){
                if(code!=null){
                    code(xmlHttp.responseText);
                }
            }
        }

        xmlHttp.send();
    }

    var getXmlHttpObj=function() {
        try{
            xmlHttp = new XMLHttpRequest();
        }catch (e){
            try{
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            }catch (e){
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        return xmlHttp;
    }

    var ajax={
        imagepost:imagepost,
        post:post,
        get:get
    }

    if ( typeof define === 'function' && define.amd ) {
        define( ajax );
    } else {
        window.ajax = ajax;
    }

})(window)
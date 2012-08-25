	var ifpeople_url=location.href.slice(0,29)=="http://www.douban.com/people/";
	var url_array=location.href.split("/");
	var ifpeople_statuses=false;
	var ifone_status=false;	
	if(url_array[url_array.length-3]==="status"){
		ifone_status=true;
	}else{
		ifone_status=false;
	}
	if(/statuses/.test(url_array[url_array.length-1])){
		ifpeople_statuses=true;
	}else{
		ifpeople_statuses=false;
	}
	var getUserName=function(){
		var name=$(".info h1").html();
		var temp=name.split('\n');
		return  $.trim(temp[1]);
	},
	getUserFollowing=function(options){
		var deferred = $.Deferred(); 
		var promise = deferred.promise();
        var xhr = new XMLHttpRequest(),
            method = options.method || 'get';
        xhr.responseType = options.responseType ||'text';   

		xhr.onload = function() {
			deferred.resolve(xhr);
		};

        xhr.onerror = function(e) {
			deferred.reject(xhr, e);
        }
    
        xhr.open(method, options.uri);
        xhr.send();
    
        //xhr.send((options.data) ? urlstringify(options.data) : null);

		return promise;
	}
	init_seeAlso=function(){
		var div="<div id='common' class='obssin clearfix'>";

		var title="<h2>我和"+getUserName()+"共同关注的友邻(42)"+
            		"&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·"+
    				"</h2>";
    	var prev="<span class='prev'>"+
            "<a id='b_p' class='dis' href='javascript:void(0)' title='后退' hidefocus='true'>&lt;</a>"+
            "</span>";
        var next="<span class='next'>"+
            "<a id='b_n' class='' href='javascript:void(0)' title='前进' hidefocus='true'>&gt;</a>"+
            "</span>";
        var end_div="</div>";
        var li="<li class='aob'>fasdfasdf</li>";
        var lis="";
        for(var i=0;i<50;i++){
        	lis=lis+li;
        }
        var content_div="<div><ul id='win'>"+
        					lis+
        			    "</ul></div>";
    	var view=div+title+prev+content_div+next+end_div;
		
		$(".obssin:first").after(view);

		getUserFollowing({uri:"http://www.douban.com/people/tulala810/contacts",method:"get"}).then(function(res){
				
				var obss=$(res.responseText).find(".obss dt a");
				obss.each(function(index, Element){
			
				});
		});

	};
	var router = function (){
		if(urlParams["renderTagView"]==="true"){
				renderTagView();
		}
		if(ifpeople_url&&ifpeople_statuses===false&&ifone_status===false){
			init_seeAlso();
		}//ifpeople_url end
		//我的广播	
		if(ifpeople_url&&ifpeople_statuses===true){
			init_timezone();
		}//ifpeople_url end
		//进入某一条广播之后	
		if(ifpeople_url&&ifone_status===true){
			init_onestatus_timezone();
		}//ifpeople_url end	
	}
	router();
(function(global){
	
	global.myAjax = function(config){
		
		//提取选项参数.
		let {type,url,success,data,dataType,error,headers} = config;
		
		let xhr = new XMLHttpRequest();
		
		//如果参数是一个对象.则转换成序列化字符串.
		if(Object.prototype.toString.call(data) == '[object Object]'){
			var params = toParams(data);
		}
		
		//如果是GET请求,并且传递了data参数.
		if(type == 'GET' && data){
			url += '?' + params
		}
		
		xhr.open(type,url);
		
		//遍历header选项进行请求头设置。
		if(headers){
			for(let key in headers){
				xhr.setRequestHeader(key,headers[key]);
			}
		}
		
		//如果是post，需要修改send
		if(type == 'POST' && data){
			xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
			xhr.send(params);
		}else{
			xhr.send();
		}
		
		//监听响应。
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					if(dataType=='json'){
						success && success(JSON.parse(xhr.responseText));
					}else{
						success && success(xhr.responseText);
					}					
				}else{
					error && error({status:xhr.status});
				}
			}
		}
		
		//序列化处理。
		function toParams(data){
			let arr = [];			
			for(let key in data){
				arr.push(key+'='+data[key])
			}			
			return arr.join('&')
		}
		
	}
	
})(window)

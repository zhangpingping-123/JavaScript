# ajax

## ajax 是做什么的

- 请求数据
- 数据交互
- 网页通过使用ajax访问服务器获取渲染页面的数据
- 网页问服务器要数据或者服务器问网页要数据这个过程就是数据交互
- ajax请求需要一个工具,这个工具实际就是一个js对象

## form发送数据

- ajax出现之前,都是通过form表单进行数据交互的
- action-->填写服务器url
- method-->请求方式
- 一个input一个数据,数据名用name属性,数据值用value
- 其他不需要用户,用hidden表单传递
- form 数据是同步的, 页面会默认跳转

- 什么时候用ajax,什么时候用form
  - 1. 如果需要用户输入参数，并且默认请求数据成功会跳转，应该用form
    2. 参数不需要用户输入，也没有默认跳转，应该用ajax(js逻辑)进行数据请求

## ajax的基本概念

- 请求方式,发送参数,监听进程=>[用一个事件**(onreadystatechange)**监听],状态码,响应结果

  - readyState表示通信的过程,值是0-4
    - 0:还没有open
    - 1:open()方法已调用
    - 2:send()方法已经被调用
    - 3:等待响应,响应体下载中,可能已被下载部分数据
    - 4:请求完成
  - status => HTTP状态码
    - 值为3位数字,开头是1-5
    - 1XX: 请求需要进一步执行
    - 2XX: 请求成功
    - 3XX: 重定向(URL不对)=> 303; 301
    - 4XX: 客户端错误=>404; 403; 401
    - 5XX: 服务端错误
  - 服务器的响应怎么获取
    - E.responseText
  - 请求的过程
    - let E = new XMLHttpRequest( );

- ajax的异步问题

  - ajax的请求是异步的
    - ajax在调用send之后,后台就会进入等待服务器响应的阶段. 这个等待的过程是异步的.
    - 异步, 就意味着send后面的代码在服务器没有响应前, 也能运行.
    - 同步, 就意味着send后面的代码在服务器响应前, 不能运行
  - ajax请求为什么默认是异步的
    - 在2005年以前的数据交互是同步的.
    - 如果数据交互是同步的话,在数据请求成功之前页面是假死状态(空白).
    - 只有异步请求,在请求成功之前, 页面可用
  - ajax异步带来的编程问题
    - 因为是异步的,所以需要一个事件去监听这个异步操作
    - 如果是同步就不需要监听; 一般工作中都不需要同步.
    - 请求的过程是异步的,因此请求数据之后的所有操作都是发生在数据请求发生之前的. 会拿不到请求的数据.因为这个时候数据还没有请求成功.

- ajax的参数发送

  - ajax请求数据的过程中,很多时候需要发送数据给服务器,这个发送的数据就叫"参数"
  - **注意:GET和POST都可以发送参数**
  - GET发送参数
    - 参数需要拼接在url后面,并且用?连接. URL + ? +参数
    - 参数的写法: 参数名 = 参数值.多个参数用&连接. 参数1 &参数2...... =>(序列化字符串)
    - 参数的类型
      - 参数的值只能是字符串,如果是别的数据类型,需要先转换字符串类型再传递
      - 如果传递的是一个对象, 需要JSON.stringify转换成字符串之后再传递
  - POST发送参数
    - 修改请求头=>setRequestHeader( )
    - post发送数据需要卸载send()中
    - 一定要在open和send中间设置请求头
    - 设置请求头的目的,是为了让我们的数据以表单形式呈现
  - 后台语言:
    - node.js (运行在服务端的js)

- 序列化操作

  ```js
  	<script type="text/javascript">
  		
  		let oYm = {
  			username:'杨幂',
  			age:33
  		}
  		
  //		通过以上对象得到序列化字符串:'username=杨幂&age=33'		
  //		['username=杨幂','age=33'].join('&');		
  		
  		function getStr(data){			
  			let arr = [];			
  			for(let key in data){
  				arr.push(key + '=' + data[key])
  			}			
  			return arr.join('&')
  		}
  		
  		let xhr = new XMLHttpRequest();				
  		xhr.open('POST','js/1.post.php');		
  		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');		
  		xhr.send(getStr(oYm));		
  		xhr.onreadystatechange = function(){
  			if(xhr.readyState == 4){
  				if(xhr.status == 200){
  					console.log(xhr.responseText)
  				}
  			}
  		}
  		
  		
  	</script>
  ```

  

- 怎么样处理响应

  - 服务器返回的数据一定是字符串,如果需要当成对象来处理,需要JSON.parse()
  - 服务器返回的是"对象字符串","数组字符串"都应该用JSON.parse()来转换

- 接口文档要解决的问题

  - 应该写GET还是POST
  - 要不要写参数,写多少个
  - 参数的名字
  - 服务器返回什么数据类型
  - 返回的数据的键表示什么意思
  - 服务器地址是什么

## ajax的封装工具的使用

- 封装的ajax工具,都会有全写和简写

  - $ajax({选项一,选项二,选项三}) =>全写
  - $get(url, data,success,type)=>简写
  - $post(url,data).then(success)
  - 配置,config,settings =>{选项一,选项二,选项三}

- axios

  - axios: 是一个插件,工作中用来请求数据的

  - axios请求数据成功的回调要写在then内

  - then的回调函数的形参就是axios的响应结构

  - catch就是请求失败的回调

  - axios的响应结构的date属性才是服务器返回的结果

  - axios的post传递参数,这个参数在浏览器环境下不能直接填写json对象. **可以填写序列化字符串作为参数**

  - ```js
    		axios({
      			method:'get',
      			url:'js/1.get.php'
      		}).then(function(res){
      			console.log(res.data)
      		}).catch(function (error) {
      		    console.log(error);
      		})
      
    //		get请求的简写。
    		axios.get('js/1.get.php').then(function(res){
    			console.log(res.data)
    		})
    
    ```

  - ```js
    //		第二个参数是get发送参数的写法.
    		axios.get('js/1.get.php',{params:{
    			username:'幂幂',
    			age:33
    		}}).then(function(res){
    			console.log(res.data)
    		})
    ```

  - axios的post发送参数,可以填写序列化字符串作为参数.

  - 如何把json对象转换成字符串?

    - 方法一:可以自己封装
    - 方法二:在vue中需要下载一个qs插件来进行序列化字符串的转换

  - 并发请求(axis.all)

    - 同时开启多个请求,当所有的请求都完成后触发then回调

  - axios的拦截

    - **请求拦截**

      - 请求发起之前做的一些事情

      - 全局拦截请求

        - 对所有的请求都生效
        - 就是ajax请求的配置config.可以获取各种选项.
        - *如果不return config,本次请求会被中断.*

        ```js
        <script type="text/javascript">
        		
        		//全局的请求拦截(对所有的请求都生效)
        		axios.interceptors.request.use(function (config) {
        			//就是ajax请求的配置config.可以获取各种选项.
        			//console.log('config',config);
        			console.log('url',config.url);
        			
        	    	// 在发送请求之前做些什么
        	    	// 如果不return config,本次请求会被中断.
        	    	return config;
        	  	}, function (error) {
        	    	// 对请求错误做些什么
        	    	return Promise.reject(error);
        	  	});
        	
        		//全局的响应拦截器(对所有的响应都生效)
        		axios.interceptors.response.use(function (response) {
        	    	// 对响应数据做点什么
        	    	// 如果不return response,则then内拿不到结果.
        	    	return response;
        	 	}, function (error) {
        	    	// 对响应错误做点什么
        	    	return Promise.reject(error);
        	  	});
        		
        		//请求1
        		axios({
        			method:'get',
        			url:'js/1.get.php',
        			params:{username:8888,age:77777}
        		}).then(function(res){
        			console.log(res.data)
        		})
        		
        		//请求2
        		axios({
        			method:'get',
        			url:'js/getList.php',
        			params:{username:8888,age:77777}
        		}).then(function(res){
        			console.log(res.data)
        		})
        		
        	</script>
        ```

        

    - **响应拦截**

      - 拿到数据之前做的一些事情

      - 局部拦截请求

        - 对所有的**响应**都能生效

        - 对 data 进行任意转换处理

        - 如果数据**没问题**,就return 发送.

        - 如果数据**有问题**,可以不return发送.

        - 对 data 进行任意转换处理

        - 如果不return data，在then内是接收不到服务器响应结果的。

        - ```js
          	<script type="text/javascript">
            		
          //		axios的拦截
          //			1:请求拦截. -> 请求发起之前做一些事情.
          //			2:响应拦截. -> 拿到数据之前做一些事情.
          		
          //		请求发起前,应该进行表单验证的判断,如果表单验证不合格,不能进行请求
          		
          //		let xhr = new XMLHttpRequest();
          
          //		通过xhr.readyState的值进行验证判断。
          //		xhr.onreadystatechange = function(){
          //			if(xhr.readyState == 1){
          //				//判断表单验证的问题
          //				xhr.send();
          //			}
          //		}
          		
          		axios({
          			url:'js/1.post.php',
          			method:'post',
          			data:'username=mimi&age=34',
          			
          			//局部的请求拦截
          			transformRequest: [function (data) {
          			   // 对 data 进行任意转换处理
          			   console.log(data);
          			   //如果数据没问题,就return 发送.
          			   //如果数据有问题,可以不return发送.
          			   return data;
          			}],
          			
          			//局部的响应拦截。
          			transformResponse: [function (data) {
          			    // 对 data 进行任意转换处理
          				console.log('响应拦截',data);
          				
          				//如果不return data，在then内是接收不到服务器响应结果的。
          			    return data;
          			}],
          						 
          			 
          		}).then(function(res){
          			console.log(res)
          		})
          		
          		
          	</script>
          ```

          

  - adios全局设置

    - 配置的默认值

    - baseURL

      - 设置content-type默认是表单格式。

      - ```js
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
        ```

        

  - 什么是Token

    - 如果项目内有登录功能,就一定会用到token
    - 它就是一个字符串
    - token有什么用=>用于用户验证=>通过账号密码得到用户的个人数据(不完整)
    - token内包含了用户的个人数据,权限,登录状态等等信息....
    - token发送给后端,后端会根据token得到根据token相对应的用户信息.
    - HTTP协议是一种无状态的协议=>无记忆
      - 前后端交互式无状态的.因此,相同的前后端每次交互都相当于是第一次交互
    - 前端需要做什么来处理token
      - 每次请求数据都必须发送token
      - 如何做到每次发送都携带token=>必须通过本地存储或者cookie存储token
      - 如何发送token=>在请求头内发送token,token的键名一般叫："Authorization"
      - token会有过期时间,如果在规定时间内每天发送过token,则会过期.需要重新登录和更新token
      - 如何知道token过期
        - 用后端判断,如果token过期,会发送一个字段给前端,前端根据字段判断渲染页面.
      - 错误时出现的错误码
        - 401,  没有认证或者认证失败
        - 403,   没有权限
    - 配置全局拦截实现给所有的请求都默认带token。

- **jq请求ajax(不重要)**

  - 使用jq进行ajax请求,最大的意义在于,我们要学习其中ajax封装工具的普遍写法
  - 当一个封装的方法，参数是一个json对象时,这个对象叫config(配置). 这个对象的属性叫，配置项或者选项或者参数
  - $.ajax的其中一个选项叫timeout,用于设置请求的超时时间.

- ajax的封装

  - ```js
    <script src="js/ajax.js" type="text/javascript" charset="utf-8"></script>
    	<script type="text/javascript">
    
    //		c++的函数：
    //		函数调用 -> 函数声明(先写怎么用这个函数)(经理)
    //		函数声明 -> 函数的实现(写怎么实现这个函数)(码农)
    
    //		通过以下调用实现,请求1.get.php,请求成功后触发success方法,参数是data.
    
    		myAjax({
    			type:'GET',
    			url:'js/getList.php',
    			data:{
    				username:10,
    				age:20
    			},
    			dataType:'json',
    			headers:{'aaa':999,'bbb':10000},
    			
    			error:function(err){
    				console.log(err.status)
    			}
    		})
    		
    	</script>
    ```

    

## 跨域怎么解决

- 同源策略
  - 本地存储的数据,可以页面间共享.
  - 什么样的页面可以共享数据?
    - 同源的页面可以访问共享数据.
  - 什么是源?
    - Origin 指的就是url最前面的部分
    - 一个源包含3个部分: 协议(http); 域名(ip); 端口(8080)
  - 同源: url的这3个部分都一至,就可以是同源的url.
  - 同源策略: 不同源页面间不能共享数据,不能请求数据.为了安全.
- 跨域:
  - 访问不同源页面间的数据
  - ajax遵循同源策略,永远不支持跨域
- **跨域报错(已经要认识)**
  - 如果两个url页面的Origin不同,就形成跨域,ajax默认不能跨域,造成报错
- 解决跨域:
  - 代理:
    - a服务器访问b服务器是跨域,但是c可以访问b,因此可以通过a访问c来间接访问b.(ng反向代理)
  - cors:
    - 后端文件配置可以访问该后端文件的源的列表
    - header("Access-Control-Allow-Origin:*");
    - 所有的源:
      * Access-Control-Allow-Origin:* -> 允许所有的源来访问本后端文件
      * Access-Control-Allow-Origin:http://localhost:8080 -> 允许http://localhost:8080来访问本后端文件
  - jsonp(过时了):不是标准方法,是广大人员自己总结出来的方法,这个方法名字就是jsonp
    - 原理:通过script的src可以跨域访问文件的原理来实现
    - 前端发送一个函数名字给后端，后端调用这个函数，并且传入跨域数据
    - jsonp的实现过程
      - 前端需要封装一个函数来使用跨域数据
      - 通过src把这个函数名传递给后端,这个函数名一般叫callback
      - 因为我们需要传递函数名到后端,而且只能通过url拼接参数,因此jsonp只支持get的跨域请求. post请求无法发送函数名给后端
      - jq的jsonp只需要配置dataType:'jsonp'。
    - jsonp只支持GET请求

## 数组的循环方法

- 方法一：使用for循环进行遍历

  通常遍历数组都是使用for循环来实现的。

  ```js
  <script type="text/javascript">
    let arr=["A","B","C","D","E","F","G"];
    let text = "";
    for(let i = 0;i<arr.length;i++){
      text += arr[i];
    }
    console.log(text)//ABCDEFG
  </script>
  ```

- 方法二：使用forEach对数组进行遍历

  这种循环遍历数组和集合更加简洁。使用foreach循环遍历数组时，无须获得数组和集合长度，无须根据索引来访问数组元素，foreach循环自动遍历数组和集合的每一个元素。

  **注意：使用foreach循环迭代数组元素时，并不能改变数组元素的值，因此不要对foreach的循环变量赋值**

  ```JS
      <script type="text/javascript">
          let arr2=["张三","李四","王五"];
          let text2 = "";
          
          arr2.forEach(function(item,index){
              text2 +=  item
          })
          console.log(text2)//张三李四王五
       </script>
  ```

  

## Promise 对象

#### promise 的含义

- **Promise 是异步编程的一种解决方案，或者说为了封装异步操作**. 比传统的解决方案——回调函数和事件——更合理和更强大。
- 简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
- **解决了回调地狱的问题**
- **解决了信任的问题**

#### Promise对象有以下两个特点

- **对象的状态不受外界影响。**`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`resolved`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
- **一旦状态改变，就不会再变，任何时候都可以得到这个结果。**`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

#### 异步编程的问题:

- ​	**async和await可以完美解决一下问题**

- 1  因为异步是落后于同步,因此会导致某些代码可读性差
- 2  传统的异步编程都是通过回调函数来监听完成,这些传统的方式会带来一种叫'回调地狱的问题'
  - 什么是回调地狱?=>可以想象一下10个定时器嵌套
- 3  传统的异步编程监听异步完成，有时候是回调函数；有时候是事件；事件名不一样，不统一

#### 基本用法:

- ES6 规定，`Promise`对象是一个构造函数，用来生成`Promise`实例。

- ```js
  const promise = new Promise(function(resolve, reject) {
    // ... some code
  
    if (/* 异步操作成功 */){
      resolve(value);
    } else {
      reject(error);
    }
  });
  ```

- `Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。

- `resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

- `Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。

  ```js
  promise.then(function(value) {
    // success
  }, function(error) {
    // failure
  });
  ```

- `then`方法可以接受两个回调函数作为参数。

  - 第一个回调函数是`Promise`对象的状态变为`resolved`时调用
  - 第二个回调函数是`Promise`对象的状态变为`rejected`时调用

#### Promise.prototype.then()

- Promise 实例具有`then`方法，也就是说，`then`方法是定义在原型对象`Promise.prototype`上的。

- 作用是为 Promise 实例添加状态改变时的回调函数。

- ```js
  <script type="text/javascript">
  //		回调地狱
  //		setTimeout(function(){
  //			console.log(500);
  //			setTimeout(function(){
  //				console.log(1000);
  //				setTimeout(function(){
  //					console.log(1500);					
  //				},1500)
  //			},1000)
  //		},500)
  
  //		第三个异步
  		let p3 = new Promise(function(resolve,reject){
  			setTimeout(function(){
  				resolve();
  			},1500)
  		})
  //		第二个异步
  		let p2 = new Promise(function(resolve,reject){
  			setTimeout(function(){
  				resolve();
  			},1000)
  		})
  //		第一个异步。
  		let p1 = new Promise(function(resolve,reject){
  			setTimeout(function(){
  				resolve();
  			},500)
  		}).then(function(){
  			console.log(1500);
  			return p2
  		}).then(function(){
  			console.log(2500);
  			return p3
  		}).then(function(){
  			console.log(3000);
  		})
  	</script>
  ```

  

- 返回值:    

  - **then方法返回的是一个新Promise实例**（注意，不是原来那个`Promise`实例）。也可以通过then中显示的return来指定返回某个promise对象.

  - 因此可以采用**链式写法**，即`then`方法后面再调用另一个`then`方法。

  - 如果采用箭头函数，上面的代码可以写得更简洁。

  - ```js
    getJSON("/post/1.json").then(
      post => getJSON(post.commentURL)
    ).then(
      comments => console.log("resolved: ", comments),
      err => console.log("rejected: ", err)
    );
    ```

#### Promise.prototype.catch()

- `Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，**用于指定发生错误时的回调函数**。

- ```js
  //getJSON()方法返回一个 Promise 对象
  //如果他状态变为resolved,则会调用then()方法指定的回调函数.
  //如果异步操作抛出错误,状态就会变为rejected,就会调用catch()方法指定的回调函数.处理这个错误.
  getJSON('/posts.json').then(function(posts) {
    // then()方法指定的回调函数,如果运行中抛出错误也会被catch()方法捕获.
  }).catch(function(error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log('发生错误！', error);
  });
  ```

- 如果 Promise 状态已经变成`resolved`，再抛出错误是无效的

-  Promise是一个类.

  它的参数是一个回调函数.

  这个回调函数的参数是两个,分别表示异步成功的回调和异步失败的回调。

  实例方法then的参数也是一个回调函数，这个回调函数就是Promise的回调函数的第一个参数*

  实例方法then的参数也是一个回调函数，这个回调函数就是Promise的回调函数的第二个参数

#### Promise.prototype.finally()

- `finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

- `finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`。

- `finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

- ```js
  promise
  .finally(() => {
    // 语句
  });
  
  // 等同于
  promise
  .then(
    result => {
      // 语句
      return result;
    },
    error => {
      // 语句
      throw error;
    }
  );
  
  //如果不使用finally方法,同样的语句需要为成功和失败两种情况各写一次.而有了finally方法,则只需要写一次.
  ```

- finally方法的实现例子

- ```js
  Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
      value  => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason })
    );
  };
  
  //不管前面的Promise是fulfilled还是rejected，都会执行回调函数callback。
  ```

- **finally方法总是会返回原来的值**

#### Promise.all()

- `Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

- ```js
  const p = Promise.all([p1, p2, p3]);
  ```

- `Promise.all()`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 Promise 实例

- 如果不是就会调用`Promise.resolve`方法,将参数转为实例.

- `Promise.all()`方法的参数也可以不是数组,但是必须要有**Iterator**接口,且返回的每一个成员都是Promise实例.

#### Promise.race() 

- `Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

- ```js
  const p = Promise.race([p1, p2, p3]);
  ```

- `Promise.race()`方法的参数与`Promise.all()`方法一样，如果不是 Promise 实例，就会先调用下面讲到的`Promise.resolve()`方法，将参数转为 Promise 实例，再进一步处理。

- ```js
  const p = Promise.race([
    fetch('/resource-that-may-take-a-while'),
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error('request timeout')), 5000)
    })
  ]);
  
  p
  .then(console.log)
  .catch(console.error);
  
  //上面代码中，如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数
  ```

#### Promise.allSettled() 

- `Promise.allSettled()`方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
- 只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束。

#### Promise.any()

- `Promise.any()`方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
- 只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；
- 如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。
- `Promise.any()`跟`Promise.race()`方法的区别
  - `Promise.any()`跟`Promise.race()`方法很像，只有一点不同，就是不会因为某个 Promise 变成`rejected`状态而结束。

```js
const promises = [
  fetch('/endpoint-a').then(() => 'a'),
  fetch('/endpoint-b').then(() => 'b'),
  fetch('/endpoint-c').then(() => 'c'),
];

try {
  const first = await Promise.any(promises);
  //Promise.any()方法的参数数组包含三个 Promise 操作
  //只要有一个变成fulfilled，Promise.any()返回的 Promise 对象就变成fulfilled。
  //如果所有三个操作都变成rejected，那么await命令就会抛出错误。
  console.log(first);
} catch (error) {
  console.log(error);
}

//Promise.any()抛出的错误，不是一个一般的错误，而是一个 AggregateError 实例。
```

- 捕捉错误时，如果不用`try...catch`结构和 await 命令，可以像下面这样写。

```js
Promise.any(promises).then(
  (first) => {
    // Any of the promises was fulfilled.
  },
  (error) => {
    // All of the promises were rejected.
  }
);
```

#### Promise.resolve()

- `Promise.resolve()`方法的作用:  将现有对象转为 Promise 对象

- ```js
  //将 jQuery 生成的deferred对象，转为一个新的 Promise 对象。
  const jsPromise = Promise.resolve($.ajax('/whatever.json'));
  ```

- `Promise.resolve`方法的参数分成四种情况。

  - **参数是一个 Promise 实例**
  - **参数是一个thenable对象**
  - **参数不是具有then方法的对象，或根本就不是对象**
  - **不带有任何参数**

#### Promise.reject()

- `Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。
- **注意 ! `Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。**

```js
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable)
})
// true

//上面代码中，Promise.reject方法的参数是一个thenable对象，执行以后，后面catch方法的参数不是reject抛出的“出错了”这个字符串，而是thenable对象。
```

#### 应用

##### 加载图片

- 我们可以将图片的加载写成一个`Promise`，一旦加载完成，`Promise`的状态就发生变化。

##### Generator 函数与 Promise 的结合

- 使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个`Promise`对象。

- ```js
  function getFoo () {
    return new Promise(function (resolve, reject){
      resolve('foo');
    });
  }
  
  const g = function* () {
    try {
      const foo = yield getFoo();
      console.log(foo);
    } catch (e) {
      console.log(e);
    }
  };
  
  function run (generator) {
    const it = generator();
  
    function go(result) {
      if (result.done) return result.value;
  
      return result.value.then(function (value) {
        return go(it.next(value));
      }, function (error) {
        return go(it.throw(error));
      });
    }
  
    go(it.next());
  }
  
  run(g);
  
  
  //上面代码的 Generator 函数g之中，有一个异步操作getFoo，它返回的就是一个Promise对象。函数run用来处理这个Promise对象，并调用下一个next方法。
  ```

#### peomise封装ajax

```js
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<div id='app'>'hello AJAX'</div>
	</body>
	<script type="text/javascript">
		
		let oDiv = document.getElementById("app");
		let msg = '';
		
		new Promise(function(success,error){
			let xhr = new XMLHttpRequest();
			xhr.open('GET','data.txt',true);
			xhr.send();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						//请求成功做的事情
						success(xhr.responseText);
					}else{
						//请求失败做的事情
						error(xhr.status);
					}
				}
			}
		}).then(function(res){
			msg = res;
			oDiv.innerText = msg;
		}).catch(function(err){
			alert('信息错误'+err);
		})
			
	</script>
</html>

```

- axios这个插件是封装了promise的。

- 以后看到某某某插件是封装了promise这句话，就能知道，一定是通过then来触发成功的回调，catch触发失败的回调。

- 封装了promise在接链式调用then的写法。

- ```js
  	<script type="text/javascript">
    		
    		//封装了promise在接链式调用then的写法。
    		
    		getData(500).then(function(num){
    			console.log(num);
    			return getData(1500)
    		}).then(function(num){
    			console.log(num);
    			return getData(2500)
    		}).then(function(num){
    			console.log(num);
    		})
    			
    		function getData(num){
    			return new Promise(function(resolve,reject){
    				setTimeout(function(){
    					resolve(num);
    				},num)
    			})
    		}
    		
    	</script>
  ```

  

#### async和await

- async和await    是终极的异步编程解决方案
- async是什么?
  - 在异步处理上，async 函数就是 Generator 函数的语法糖。
- await是什么?
  - 
- 可以把异步操作写起来当同步操作书写
- 必须用在函数上,写在function前面. 目的是告诉浏览器,函数内可能有异步操作
- await必须写在async函数内, await后面应该接一个promise对象, 这样做了,则await后面的代码会自动等待这个promise结束才触发.
- await只能让promise等待,不能让其他异步操作等待
- 所有的异步操作都应该用promise书写,因此await只认为promise是异步. (标准,为了统一)
- 如果await后面接定时器,定时器后面的打印不会等待定时器结束.因为定时器不是promise

#### async和await的返回值

- async
  - 默认返回一个promise对象
  - async函数return的值需要通过then接收
- await
  - await后面接promise才有意义,但实际上它可以接任意表达式.   await 表达式
  - await 的返回值就是,表达式后面表达式的值; 
  - 如果await后面的表达式是promise对象,则await表达式的返回值是promise内部resolve的实参
  - await实际上会把await后面的代码变成异步.(微任务)



#### 事件循环(面试题)

异步和同步,异步落后于同步

- 异步还分为两种类别,一种是宏任务,一种是微任务,微任务要先于宏任务
- promise是微任务,其他都是宏任务
- 事件循环:
  1. 先执行完所有的同步
  2. 执行微任务
  3. 执行宏任务

- 如果宏任务产生了微任务,则转而执行微任务

- ```js
  <script type="text/javascript">		
  		setTimeout(function(){
  			//宏任务
  			console.log(1)
  		},0)
  		
  		//同步
  		console.log(2);
  		
  		new Promise(function(resolve,reject){
  			resolve()
  		}).then(function(){
  			//微任务
  			console.log(3);
  		})
  		
  	</script>
  ```

- 面试题:

- ```js
  <script type="text/javascript">
  		
  		//Promise的回调函数是同步的。
  		//then的回调函数是微任务
  		//定时器的回调函数是宏任务
  		
  		setTimeout(function(){
  			console.log(1);
  			new Promise(function(resolve,reject){
  				resolve()
  			}).then(function(){
  				//微任务
  				console.log(2);
  			})
  		},0)
  		
  		//同步
  		console.log(3);
  		
  		new Promise(function(resolve,reject){
  			resolve();
  			setTimeout(function(){
  				console.log(4);
  			},0)
  			console.log(5)
  		}).then(function(){
  			//微任务
  			console.log(6);
  			setTimeout(function(){
  				console.log(7);
  			},0)
  		})
  // 3 5 6 1 4 7
  ```

  

#### 闭包:

1. 父函数里面有子函数
2. 子函数使用了父函数的局部变量
3. **子函数还可以通过别的方式来调用**

- 闭包题口诀:
  1. 确定是不是闭包题
  2. 父函数调用了多少次,如果是1次,那答案都是一样的;如果多次,答案就是不一样的

闭包面试题

```js
function fn(){
			let arr = [];		
			for(var i=0;i<5;i++){
				arr.push(function(){
					console.log(i)
				})
			}
			return arr
		}
		
		let arr = fn();
		
		//循环调用这个数组内的所有函数。
		for(let i=0;i<arr.length;i++){
			arr[i]();//5 5 5 5 5
		}
```

```js
	
		let arr = [];
		
		for(var i=0;i<5;i++){
			fn(i);
		}
		
		for(var i=0;i<arr.length;i++){
			arr[i]();//0,1,2,3,4
		}
		
		function fn(i){
			arr.push(function(){
				console.log(i)
			})
		}
```

- 为什么要有闭包
  - 如果把作用域想象成一个对象,那么这个闭包变量就是这个对象的私有属性.
  - 那如何访问这个对象的这个属性呢？ -> 通过调用子函数来访问。

#### eval脚本注入攻击

- xss攻击
- 前端的脚本就是js,前端就是js的注入攻击
- eval也不安全,使用eval是必须保证参数字符串是安全的
- 如何检测一个字符串内有没有可能存在危险脚本
  - 用正则表达式找出script标签内以及标签内的内容,然后全部删除(替换成空字符串)
- 网络的七层协议
  - 它把一个网络抽象成了7个部份
  - 应用层--表示层--会话层--传输层--网络层--数据链路层--物理层
- 三次握手和四次挥手
  - 三次握手相当于3次通信
  - 四次挥手相当于4次结束通信

### 复习JS

#### 解构赋值

- 更简单的赋值的写法

  1. 用解构赋值声明新的变量并且赋值

  2. 用解构赋值给已经存在的变量进行赋值

  3. ```js
     //例如:交换两个变量的值
     let x = 10;
     let y = 20;
     [x,y] = [y,x]
     ```

- 数组解构赋值

  - 按照下标来赋值

  - ```js
    let [x,y] = [100,200]
    ```

  - 

- 对象解构赋值

  - 按键名(key)来匹配赋值

  - ```js
    let {y,x} = {x:10,y:20}
    
    let {y:y,x:x} = {x:10,y:20}
    ```

- 口诀:
  - 左边是什么右边就是什么
  - 左边是数组,右边是100不是数组,没办法进行解构赋值,因此这个写法会报错
  - 左边是数组,右边是字符串,可以当成数组处理
  - 把对象转换成数组的3个方法
    - object.keys( ); 数组内的元素是对象的键名
    - object.values( ); 数组内的元素是对象的键值
    - object.entries( ); 二位数组,每个二维数组内的元素是键名和键值

#### 变量查找

- ​	作用域连-->变量查找
- ![image-20200516154231751](/Users/zelin/Library/Application Support/typora-user-images/image-20200516154231751.png)

#### 词法作用域

- ​	js的作用域是词法作用域(静态作用域)-->作用域链跟你再哪里调用没有关系

#### 原型链

- 属性查找(一个对象的属性是什么):

  - ![image-20200516164526839](/Users/zelin/Library/Application Support/typora-user-images/image-20200516164526839.png)

- 数组的缓存方法

  - ![image-20200516165252148](/Users/zelin/Library/Application Support/typora-user-images/image-20200516165252148.png)

    

- s

### 面试题

#### 面试题一

![image-20200516141700881](/Users/zelin/Library/Application Support/typora-user-images/image-20200516141700881.png)



### 面试题二

![image-20200516143342623](/Users/zelin/Library/Application Support/typora-user-images/image-20200516143342623.png)

![image-20200516152643832](/Users/zelin/Library/Application Support/typora-user-images/image-20200516152643832.png)

 

#### 面试题三

- ![image-20200516154206734](/Users/zelin/Library/Application Support/typora-user-images/image-20200516154206734.png)



#### 面试题四

![image-20200516160647804](/Users/zelin/Library/Application Support/typora-user-images/image-20200516160647804.png)
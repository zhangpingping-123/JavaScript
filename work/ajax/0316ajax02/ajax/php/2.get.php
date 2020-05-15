<?php
	header('content-text:text/html; charset="utf-8"');
	error_reporting(0);
	header("Access-Control-Allow-Origin:*");
		
	$name = $_GET['name'];
	$egg  = $_GET['age'];
	
	$username = '飞哥';
	$age	  = 1000;
	
//	把$username->存入数据库
//	把$age->存入数据库

//	echo "欢迎。。。名字:{$username} , 年龄: {$age}";
	
	if($name=='f'){
		echo "欢迎。。。名字:{$username}";
	}else{
		echo "哇塞。。。年龄:{$age}";
	} 

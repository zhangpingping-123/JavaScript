### 变量(常量)

+ (ES3) **var**
+ (ES6) **let**
+ (ES6) **const**
+ (ES6) class
+ function

```
class Person{

}
var fun = function() {

}
function fun() {

}
```

### var和let的区别

1. var可以重复定义,let不可以重复定义
3. var有变量声明提升,let没有变量声明提升.(var在同页面还没声明时,可以使用,let在同页面还没声明时候,不可以使用)
3. var不存在暂时性死区TDZ,let存在暂时性死区TDZ(temporal dead zone)
4. var没有块级作用域的概念,但是let有块级作用域

### const和var|let的区别

1. const的变量值不可变,let和var可变(const其他的特性和let一模一样)

### 函数

为什么要使用函数?

1. **封装**
   1. 屏蔽掉一些用户不需要知道的一些细节.只关心入口和出口
2. **复用**
   1. 函数可以重复使用,大大增加了程序的便利性

### 函数的写法

+ 函数声明

```javascript
function 函数的名字() {

}
```

+ 函数表达式

```javascript
let 函数的名字 = function() {

}
var 函数的名字 = function() {

}
```

### 作用域

+ 全局作用域
+ 函数作用域 必须是函数的那个大括号才会形成一个新的作用域
+ ES6新增 块级作用域 只要是个大括号,就是一个新的作用域

### 基本数据类型

+ Number
+ String
+ Boolean
+ Null
+ Undefined
+ Symbol

### 合成数据类型

+ Object

### 对象

什么是对象数据类型?

```javascript
let obj = {};		//空对象
let obj2 = new Object();	//空对象

let person = {}
person.name = "张三";
person.age = 20;
person.sex = "男";

//每当我需要表达一个一对多关系 甚至多对多关系的时候我必须使用 对象

let menu = {}
menu.apple = 10;
menu.banana = 2;
```

### 内存结构

#### 栈

+ 空间小
  + 栈内存比较重要(所以内存小)
+ 速度快
+ 有序

#### 堆

+ 空间大
  + 堆内存没那么重要(所以内存大)
+ 速度慢
+ 无序

### 类

类中一般分为两个内容

+ 静态的属性(描述你这个变量一些特征的东西,比如姓名,年龄,身高,体重,品牌,材料)
+ 动态的方法(走路,跑步,弹琴,唱歌,跳舞,思考,冰箱会制冷,空调会制冷制热)

### Math(数学类)

Math 是一个工具类,每当我想要做数学运算的时候我就可以调用Math.xxx的形式使用

#### Math.abs(value: any);

返回value的绝对值(非负数)

```javascript
console.log(Math.abs(10))		//10
console.log(Math.abs(-10))		//10
console.log(Math.abs(0))		//0
console.log(Math.abs(2.5))		//2.5
console.log(Math.abs(-2.5))		//2.5

// 如果没有提供数字类型 那么先调用Number()进行强制转换 转换成数字类型之后在返回绝对值
console.log(Math.abs("100"))		//
console.log(Math.abs("深圳"))		//
console.log(Math.abs(true))		//
console.log(Math.abs(null))		//
console.log(Math.abs(undefined))		//
```

#### Math.floor(value: Any)

向下取整

#### Math.ceil(value: Any)

向上取整

#### Math.round(value: Any)

四舍五入

#### Math.max([x: Any[, y: Any[, …]]])

在x,y,z这样一堆数字中取最大的数字

#### Math.min([x: Any[, y: Any[, …]]])

在x,y,z这样一堆数字中取最小的数字

#### Math.pow(x: Any, y: Any)

返回Number x的y次方

```
//静态属性
const PI = Math.PI;
```

### 复习和预习
**小彩旗** -> 必须要会
**选项卡** -> 必须要会

1. 函数 -> **函数参数**

+ 入参
+ 出参
+ 形参
+ 实参

2. 与或非
3. 三目运算符
5. 选项卡 -> 左右各有一个箭头,如何实现点击箭头跳到下一个div
### Window

"天大地大" window 最大

- window.onload
- window.document
- window.document.documentElement
- window.document.head
- window.document.body

### Node 抽象类

- childNodes
- nodeType
- nodeName
- nodeValue

## Element\*\*

- 增
  - 创造节点
  - 拼接元素
- 删
- 改
- 查
- 属性操作

## this\*\*

谁调用就指向谁

- 普通函数中 -> window
- 事件函数中 -> 触发器/调用者
- 全局作用域 -> window
- 定时器 -> window
- 箭头函数 -> 父作用域
- 对象/数组 -> 对象/数组

### 总结

谁调用就指向谁 -> 谁.函数() 就指向那个谁/ 函数() -> window.函数()

事件中 this 指向都是指向调用者

对象中 this 指向都是指向对象

箭头函数 没有 this 指向 它的指向继承自父作用域的指向

其他情况通通都是指向 window 的

### call/apply/bind

可以改变 this 指向

### 事件

1. 事件分类: 普通事件/绑定事件
2. 事件流
3. 事件冒泡&事件捕获
4. 事件对象 event
5. 事件源 target
6. 事件委托 \*\*\*

#### 事件名称

- load 读取(文档/图片)
- scroll 页面/元素滑动事件
- resize 当浏览器大小发生变化的时间
- contextmenu 菜单事件
- focus/blur 聚焦/失焦事件
- change 改变
- input 输入

#### 鼠标事件

- click 单击
- dblclick 双击
- mousemove 鼠标移动
- mouseenter&mouseleave 鼠标进入/鼠标离开
- mouseover&mouseout 鼠标进入/鼠标离开
- mousedown 鼠标按下
- mouseup 鼠标抬起

#### 键盘事件

- keydown 键盘按下
- keyup 键盘抬起
- keypress 键盘按压

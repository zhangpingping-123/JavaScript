(function () {
  //创建一个Validate工厂 同时传入所有的静态属性 那么该模块 静态属性就都在这里了
  let Validate = function (options, regex) {
    //默认值
    this.options = {
      parent: "formDiv",
      btn: "btn"
    }
    this.parent = document.querySelector(`#${options.parent}`)
    this.inputs = document.querySelectorAll(`#${options.parent} input`)
    this.btn = document.querySelector(`#${options.btn}`)
    //默认值
    this.regex = this.extend({
      username: {
        type: /^\w{6,16}$/,
        successMsg: "用户名是正确的",
        errorMsg: "用户名是错误的"
      },
      pwd: {
        type: /^\w{10,18}$/,
        successMsg: "密码是正确的",
        errorMsg: "密码是错误的"
      },
      phone: {
        type: /^\d{11}$/,
        successMsg: "手机是正确的",
        errorMsg: "手机是错误的"
      },
      email: {
        type: /^\w+@\w+([.]\w{2,4}){1,2}$/,
        successMsg: "邮箱是正确的",
        errorMsg: "邮箱是错误的"
      }
    }, regex)
    console.log(this.regex)
    this.init()
  }

  //利用原型,提供动态的方法
  Validate.prototype = {
    constructor: Validate,
    init() {
      console.log(this) // Validate.prototype
      //1.点击按钮的时候 验证表单
      this.btn.addEventListener("click", () => {
        this.validateForm()
      })
      //2.为所有的文本框 绑定一个输入事件
      for (let i = 0; i < this.inputs.length; i++) {
        this.inputs[i].addEventListener("input", () => {
          this.validateInput(this.inputs[i])
        })
        //3.失去某个文本框焦点的时候 也想要验证文本框
        this.inputs[i].addEventListener("blur", () => {
          this.validateInput(this.inputs[i])
        })
      }
    },
    extend(target, object) {
      for (let key in object) {
        if (Object.prototype.toString.call(object[key]) === "[object Object]") {
          target[key] = this.extend(target[key], object[key])
        } else if (Object.prototype.toString.call(object[key]) === "[object Array]") {
          target[key] = this.extend(target[key], object[key])
        } else {
          target[key] = object[key]
        }
      }
      return target
    },
    validateForm() {
      for (let i = 0; i < this.inputs.length; i++) {
        this.validateInput(this.inputs[i])
      }
    },
    validateInput(input) {
      let regexObj = this.regex[input.getAttribute("id")]
      //根据该文本框的id 和 regex对象 来找到对应的 验证规则
      let reg = regexObj.type;
      //该文本此时的文本内容
      let str = input.value;
      //该文本框的父元素
      let parent = input.parentElement;

      let resultDiv = this.createResultDiv(parent)
      //验证该文本框满足不满足规则
      if (reg.test(str)) {
        this.showSuccessMessage(resultDiv, regexObj.successMsg)
      } else {
        this.showErrorMessage(resultDiv, regexObj.errorMsg)
      }
    },
    createResultDiv(parent) {
      //遍历所有的元素
      for (let i = 0; i < parent.children.length; i++) {
        //查找这个div中有没有结果div
        if (parent.children[i].classList.contains("validate-result")) {
          //就直接return 不需要重新创建
          return parent.children[i]
        }
      }
      //这是一个结果的div
      let resultDiv = document.createElement("div");
      resultDiv.classList.add("validate-result")
      parent.appendChild(resultDiv)
      return resultDiv
    },
    showSuccessMessage(ele, str) {
      ele.classList.add("validate-success")
      ele.classList.remove("validate-error")
      ele.innerHTML = str
    },
    showErrorMessage(ele, str) {
      ele.classList.add("validate-error")
      ele.classList.remove("validate-success")
      ele.innerHTML = str
    }
  }

  //将整个工厂暴露给window作用域
  window.Validate = Validate

}())
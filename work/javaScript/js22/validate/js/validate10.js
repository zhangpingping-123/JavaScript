(function () {
  //创建一个Validate工厂 同时传入所有的静态属性 那么该模块 静态属性就都在这里了
  let Validate = function (options, regex, message) {
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
      },
      pwd: {
        type: /^\w{10,18}$/,
      },
      phone: {
        type: /^\d{11}$/,
      },
      email: {}
    }, regex)
    this.message = this.extend({
      default: {
        requiredErrorMsg: "不能为空",
        minlengthErrorMsg: "不能太短",
        maxlengthErrorMsg: "不能太长",
        wordErrorMsg: "请输入纯单词",
        numberErrorMsg: "请输出纯数字",
        emailErrorMsg: "请输入正确的邮箱"
      },
      username: {
        successMsg: "用户名是正确的",
        errorMsg: "用户名是错误的"
      },
      pwd: {
        successMsg: "密码是正确的",
        errorMsg: "密码是错误的"
      },
      phone: {
        successMsg: "手机是正确的",
        errorMsg: "手机是错误的"
      },
      email: {
        successMsg: "邮箱是正确的",
        errorMsg: "邮箱是错误的"
      }
    }, message)
    this.init()
  }

  //利用原型,提供动态的方法
  Validate.prototype = {
    constructor: Validate,
    init() {
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
      //你传入的(或预设的)的规则对象
      let regexObj = this.regex[input.getAttribute("id")]
      //你传入的(或预设的)的信息对象
      let msgObj = this.message[input.getAttribute("id")]
      //根据该文本框的id 和 regex对象 来找到对应的 验证规则
      let reg = regexObj.type;
      //该文本此时的文本内容
      let str = input.value;
      //该文本框的父元素
      let parent = input.parentElement;
      //如果有就改变类名 如果没有就创建一个validate-result的一个div
      let resultDiv = this.createResultDiv(parent)
      //该对象要不要非空验证
      if (regexObj.required && str === "") {
        this.validateRequired(resultDiv, str)
        return
      }
      //该对象要不要最短验证
      if (regexObj.minlength && str.length < regexObj.minlength) {
        this.validateMinLength(resultDiv, str, regexObj)
        return
      }
      //该对象要不要最长验证
      if (regexObj.maxlength && str.length > regexObj.maxlength) {
        this.validateMaxLength(resultDiv, str, regexObj)
        return
      }
      //该对象的验证形式
      switch (regexObj.type) {
        case "word":
          this.validateType(resultDiv, str, /^\w+$/, this.message.default.wordErrorMsg, msgObj.successMsg)
          return
        case "number":
          this.validateType(resultDiv, str, /^\d+$/, this.message.default.numberErrorMsg, msgObj.successMsg)
          return
        case "email":
          this.validateType(resultDiv, str, /^\w+@\w+([.]\w{2,4}){1,2}$/, this.message.default.emailErrorMsg, msgObj.successMsg)
          return
      }
      //验证该文本框满足不满足规则
      // if (reg.test(str)) {
      //   this.showSuccessMessage(resultDiv, regexObj.successMsg)
      // } else {
      //   this.showErrorMessage(resultDiv, regexObj.errorMsg)
      // }
    },
    validateRequired(parent) {
      this.showErrorMessage(parent, this.message.default.requiredErrorMsg)
    },
    validateMinLength(parent) {
      this.showErrorMessage(parent, this.message.default.minlengthErrorMsg)
    },
    validateMaxLength(parent) {
      this.showErrorMessage(parent, this.message.default.maxlengthErrorMsg)
    },
    validateType(parent, str, reg, error, success) {
      if (reg.test(str)) {
        this.showSuccessMessage(parent, success)
      } else {
        this.showErrorMessage(parent, error)
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
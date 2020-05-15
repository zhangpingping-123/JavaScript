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
        type: /^\w{6,16}$/
      },
      pwd: {
        type: /^\w{10,18}$/
      },
      phone: {
        type: /^\d{11}$/
      },
      email: {
        type: /^\w+@\w+([.]\w{2,4}){1,2}$/
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
      //复制target 长得的target
      let newObj = {}
      for (let key in target) {
        newObj[key] = target[key]
      }
      for (let key in object) {
        newObj[key] = object[key]
      }
      //返回这个新修改的对象
      return newObj
    },
    validateForm() {
      for (let i = 0; i < this.inputs.length; i++) {
        this.validateInput(this.inputs[i])
      }
    },
    validateInput(input) {
      //根据该文本框的id 和 regex对象 来找到对应的 验证规则
      let reg = this.regex[input.getAttribute("id")].type;
      //该文本此时的文本内容
      let str = input.value;
      //该文本框的父元素
      let parent = input.parentElement;

      let resultDiv = this.createResultDiv(parent)
      //验证该文本框满足不满足规则
      if (reg.test(str)) {
        this.showSuccessMessage(resultDiv)
      } else {
        this.showErrorMessage(resultDiv)
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
    showSuccessMessage(ele) {
      ele.classList.add("validate-success")
      ele.classList.remove("validate-error")
      ele.innerHTML = "成功"
    },
    showErrorMessage(ele) {
      ele.classList.add("validate-error")
      ele.classList.remove("validate-success")
      ele.innerHTML = "失败"
    }
  }

  //将整个工厂暴露给window作用域
  window.Validate = Validate

}())
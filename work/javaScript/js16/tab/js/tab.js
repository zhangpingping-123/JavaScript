let json = [{
  "title": "标题一",
  "content": "“中国创新能力不断提升”"
}, {
  "title": "标题二",
  "content": "“必须竭尽所能避免和减少污名化”"
}, {
  "title": "标题三",
  "content": "海关总署：健康申明卡网上申报超380万票"
}]
class Tab {
  constructor(parent, data) {
    this.parent = parent;
    this.data = data
    this.init()
  }
  //初始化一个选项卡
  init() {
    let oParent = document.querySelector(`#${this.parent}`);
    oParent.innerHTML =
      `<ul class="tab_title" id="tab_title"></ul><ul class="tab_content" id="tab_content"></ul>`
    let titleUl = this.initTitle()
    this.titleClick(titleUl)
    this.initContent()
  }

  initTitle() {
    let oTitle = document.querySelector("#tab_title")
    this.data.map((e, i) => {
      //做一个自定义属性
      if (i !== 0) {
        oTitle.innerHTML += `<li index="${i}">${e.title}</li>`
      } else {
        oTitle.innerHTML += `<li class="clicked" index="${i}">${e.title}</li>`
      }
    })
    return oTitle
  }
  //为title的ul绑定一个点击事件
  titleClick(ul) {
    ul.addEventListener("click", (e) => {
      this.reset(this.parent)
      this.change(e.target)
    })
  }

  //洗掉所有的样式
  reset() {
    let aTitle = document.querySelectorAll(`#tab_title li`)
    let aContent = document.querySelectorAll(`#tab_content li`)
    for (let i = 0; i < aTitle.length; i++) {
      aTitle[i].className = ""
      aContent[i].className = ""
    }
  }
  //修改对应的li的样式
  change(li) {
    if (li.nodeName === "LI") {
      let aTitle = document.querySelectorAll(`#tab_title li`)
      let aContent = document.querySelectorAll(`#tab_content li`)
      aTitle[li.getAttribute("index")].className = "clicked"
      aContent[li.getAttribute("index")].className = "active"
    }
  }

  initContent() {
    let oContent = document.querySelector("#tab_content")
    this.data.map((e, i) => {
      if (i !== 0) {
        oContent.innerHTML += `<li>${e.content}</li>`
      } else {
        oContent.innerHTML += `<li class="active">${e.content}</li>`
      }
    })
  }
}
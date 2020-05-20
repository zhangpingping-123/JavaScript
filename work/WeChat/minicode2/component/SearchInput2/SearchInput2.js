// component/SearchInput2/SearchInput2.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick:function(){
      console.log("点击了,开始给父组件传值");
      this.triggerEvent("myEvent",["深圳","广州"])
    }
  }
})

// component/SearchInput/SearchInput.js
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
      console.log("点击事件发生了，开始向父组件传值");
      this.triggerEvent("myEvent",[123,456])
    }
  }
})

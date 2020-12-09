/*
 * 仿微信小程序Loading 及 弹出组件
 * created by maoeye
 */

import wxsComponent from '@/components/wxs' //引入组件

const baseWxs = {
  install: function(Vue, options) {

    //Vue.extend 属于 Vue 的全局 API 他是Vue构造函数的一个基础构造器（或者数是简约版的Vue构造函数）
    //extend创建的是一个组件构造器(构造函数)，而不是一个具体的组件实例
  	
  	// 创建构造器
  	const vueComponent = Vue.extend(wxsComponent) //返回的是组件构造函数,文档https://cn.vuejs.org/v2/api/#Vue-extend

    /* 上面相当于下面的
    var MyVue = Vue.extend({
      template: '<div id="wxs-popup"><div class="loading"><span></span></div></div>',
      data: function () {
        return {
          class: "loading"
  	    }
      }
    })
    Vue.extend 和 Vue.component区别：
    Vue.extend 是直接把组件代码挂到页面里
    Vue.component 是创建一个组件，然后在页面里使用组件名来引入组件
    */
    /*
    let wxsComponent
    const initmyComponent = function() {
   	  // 创建 MyVue 实例
   	  wxsComponent = new MyVue()
   	  var _dom = document.createElement("div")
      document.body.appendChild(_dom);
   	  wxsComponent.$mount(_dom) //把实例挂在一个元素上$mount 跟 在实例化时里的el是一样的
    }
    */
    
  	let wxsPopup
  	const initmyComponent = function() { // 定义不可改变类型的对象
      wxsPopup = new vueComponent({  // 创建组件构造器实例
      	el: document.createElement("div") // el对象会被替换成组件的模板内容
      })
      document.body.appendChild(wxsPopup.$el);
  	}
    
    Vue.prototype.$wxs = {
      options: {
        status: false,  //true表示已有样式再可执行,
        show: ""    //表示执行的哪个样式
      },
      init: function(params, options) {
        const self = this;
        if(!wxsPopup) {

          //初始化
      	  initmyComponent() 
          
          //通过$on来接收子组件的传值
          wxsPopup.$on("status", function(data) {
        	  self.options.status = data //更新是否已有样式在运行状态
          })
        }
        for(var i in options){
          params[i] = options[i];
        }
        return params;
      },
      showToast: function(options){
      	this.options.status = true
      	this.options.show = "toast"
        let params = {
          show: this.options.show,
          title: '加载中',
          icon: 'loading',
          duration: 1500,
          //success: function (res) {},
          //fail: function (res) {},
          //complete: function (res) {}
        }
        this.init(params, options)
        wxsPopup.params = params //这里的wxsComponent.params 等于设置父组件属性然后我们在子组件里去props来接收
        wxsPopup.showPopup = true
      },
      hideToast: function(options) {
        if(!this.options.status || this.options.show!="toast") return;
        wxsPopup.showPopup = false
      },
      showWindow: function(options) {
        if(this.options.status) return
        this.options.status = true
      	this.options.show = "window"
        let params = {
          show: this.options.show,
          showClose: true,
          innerHtml: "",
          //success: function (res) {},
          //fail: function (res) {},
          //complete: function (res) {}
        }
        this.init(params, options)
        //document.getElementsByTagName("body")[0].style.overflow = "hidden"
        wxsPopup.params = params
        wxsPopup.showPopup = true
      },
      /*hideWindow: function(options) {console.log()
        if(!this.options.status || this.options.show!="window") return;
        wxsPopup.showPopup = false
      },*/
      showLoading: function(options) {
        if(options && options.icon){
          options.icon = "loading"
        }
        this.showToast(options)
      },
      hideLoading: function(options) {
      	this.hideToast(options);
      },
      showModal: function(options){
        if(this.options.status) return
        this.options.status = true
      	this.options.show = "modal"
        let params = {    
          show: this.options.show,
          title: '提示',
          content: '',
          showCancel: true,        
          cancelText: '取消',
          confirmText: '确认',
          //success: function (res) {},
          //fail: function (res) {},
          //complete: function (res) {}
        }
        this.init(params, options);
        wxsPopup.params = params
        wxsPopup.showPopup = true
      },
      redirect: function(options){
        //跳转....
      }
    }
  }
}

export default baseWxs

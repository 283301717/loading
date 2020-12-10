<template>
  <div class="wrap flex-column flex-item">
  	<div class="wpBox">
  	  <div class="comBtn" @click="showLoading">显示 loading 提示框</div>
  	  <div class="comBtn" @click="showToast('success')">显示消息提示框 - success</div>
  	  <div class="comBtn" @click="showToast('fail')">显示消息提示框 - fail</div>
  	  <div class="comBtn" @click="showToast('none')">显示消息提示框 - none</div>
  	  <div class="comBtn" @click="showModal">显示模拟对话框</div>
  	  <div class="comBtn" @click="showWindow">显示模拟弹窗</div>
  	</div>
  </div>
</template>
<style lang="scss">
@import '@/scss/base/mixins';
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
  .wpBox {
  	width: 80%;
  	text-align: center;
  	.comBtn {
  	  background: #DDDDDD;
  	  @include radius(4px);
  	  padding: 12px 0;
  	  margin:20px auto;
  	}
  	.hideLoading {
  	  position: fixed;
  	  bottom: 20px;
  	  z-index: 1000;
  	  width: 80%;
  	}
  }
}
#user {
  width: 82vw;
  max-width: 360px;
  .login {
  	width: 100%;
  	padding: 12px 0 10px;
  	div {
  	  margin:20px 0px;
  	}
  	input, button {
  	  @include border(null, 1px, solid, #eee);
  	  padding: 12px;
  	  width: 84%;
  	  font-size: 14px;
  	  @include box-sizing(border-box);
  	}
  	button { 
  	  background: #1BAD1A;
  	  color: #fff;
  	  font-size: 16px;
  	  &:active {
  	  	background: #189E18;
  	  };
  	}
  }
}
</style>
<script>
export default {
  methods: {
    showLoading: function() {
      this.$wxs.showLoading({
        title: "加载中"
      })
      setTimeout(this.hideLoading, 2000)
    },
    hideLoading: function() {
      this.$wxs.hideLoading();
    },
    showToast: function($type) {
      switch($type) {
        case "success":
          console.log(this.a)
          this.$wxs.showToast({
          	title: "加载成功",
          	icon: "success",
          	duration: 1500, 
            success: function(res) { console.log("success") },
            fail: function(res) { console.log("fail") },
            complete: function(res) { console.log("complete") }
          }) 
        break; 
        case "fail":
          this.$wxs.showToast({
          	title: "加载失败",
          	icon: "fail",
          	duration: 1500,
          	success: function(res) { console.log("success") },
          	fail: function(res) { console.log("fail") },
          	complete: function(res) { console.log("complete") }
          })
        break;
        case "none":
          this.$wxs.showToast({
          	title: "表单填写完整",
          	icon: "none",
          	duration: 1500,
          	success: function(res) { console.log("success") },
          	fail: function(res) { console.log("fail") },
          	complete: function(res) { console.log("complete") }
          })
        break;
      }
    },
    showModal: function() {
      this.$wxs.showModal({
      	title: "提示",
      	content: "你充值的金额为￥200，是否继续？",
      	showCancel: true,
        cancelText: "取消",
        confirmText: "确定",
        success: function(res) { console.log(res) },
        fail: function(res) { console.log("fail") },
        complete: function(res) { console.log("complete") }
      })
    },
    showWindow: function() {
      this.$wxs.showWindow({
      	showClose: true,
      	innerHtml: '<div id="user"><div class="login"><div class="username"><input type="text" name="username" placeholder="用户名" v-model="username"></div><div class="password"><input type="password" name="password" placeholder="密码" v-modle="password"></div><div class="sbtn"><button type="submit" name="sbtn">登录</button></div></div></div>'
      })
    }
  }
}
</script>
<template>
  <div class="register-wrap" v-show="showRegister">
    <h3>注册</h3>
    <p v-show="showTishi">{{tishi}}</p>
    <input type="text" placeholder="请输入用户名" v-model="newUsername">
    <input type="text" placeholder="请输入用户年龄" v-model="newUserage">
    <input type="password" placeholder="请输入密码" v-model="newPassword">
    <input type="password" placeholder="请确认密码" v-model="renewPassword">
    <button v-on:click="register">注册</button>
    <span v-on:click="ToLogin">已有账号？马上登录</span>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data() {
      return {
        showLogin: false,
        showRegister: true,
        showTishi: false,
        tishi: '',
        newUsername: '',
        newUserage: '',
        newPassword: '',
        renewPassword: ''
      }
    },
    methods: {
      register() {
        if (this.newUsername === '' || this.newPassword === '') {
          this.tishi = '请输入用户名或密码'
          this.showTishi = true
        } else {
          const registerUrl = '/api/register'
          var params = new URLSearchParams()
          params.append('username', this.newUsername)
          params.append('userage', this.newUserage)
          params.append('password', this.newPassword)
          params.append('repassword', this.renewPassword)
          this.axios({
            method: 'post',
            url: registerUrl,
            data: params
          })
            .then(res => {
              console.log(res)
              if (res.status === 200) {
                // 注册成功,1s后跳转到登录
                if (res.data.code === 1 || res.data.code === 2) {
                  this.tishi = '用户名或密码不能为空'
                  this.showTishi = true
                } else if (res.data.code === 3) {
                  this.tishi = '两次输入密码不一致'
                  this.showTishi = true
                } else if (res.data.code === 4) {
                  this.tishi = '该用户已被注册'
                  this.showTishi = true
                  this.username = ''
                  this.password = ''
                  setTimeout(
                    function() {
                      this.showRegister = false
                      this.showLogin = true
                      this.showTishi = false
                    }.bind(this),
                    1000
                  ) // 这是1秒延迟跳转
                } else {
                  this.tishi = '注册成功'
                  this.showTishi = true
                  this.username = ''
                  this.userage = ''
                  this.password = ''
                  setTimeout(
                    function() {
                      this.showRegister = false
                      this.showLogin = true
                      this.showTishi = false
                    }.bind(this),
                    1000
                  ) // 这是1秒延迟跳转
                }
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        }
      },
      ToLogin() {
        this.showRegister = false
        this.showLogin = true
      },
      ToRegister() {
        this.showRegister = true
        this.showLogin = false
      }
    }
  }
</script>
<style>
  .login-wrap {
    text-align: center;
  }
  input {
    display: block;
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    margin-bottom: 10px;
    outline: none;
    border: 1px solid #888;
    padding: 10px;
    box-sizing: border-box;
  }
  p {
    color: red;
  }
  button {
    display: block;
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    border: none;
    background-color: #41b883;
    color: #fff;
    font-size: 16px;
    margin-bottom: 5px;
  }
  span {
    cursor: pointer;
  }
  span:hover {
    color: #41b883;
  }
</style>

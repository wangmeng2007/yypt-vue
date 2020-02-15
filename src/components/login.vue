<template>
  <div>
    <div class="login-wrap" v-show="showLogin">
      <h3>登录</h3>
      <p v-show="showTishi">{{tishi}}</p>
      <input type="text" placeholder="请输入用户名" v-model="username">
      <input type="password" placeholder="请输入密码" v-model="password">
      <button v-on:click="login">登录</button>
      <span v-on:click="ToRegister">没有账号？马上注册</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        showLogin: true,
        showRegister: false,
        showTishi: false,
        tishi: '',
        username: '',
        password: '',
        newUsername: '',
        newPassword: '',
        renewPassword: ''
      }
    },
    methods: {
      login() {
        if (this.username === '' || this.password === '') {
          alert('请输入用户名或密码')
        } else {
          localStorage.setItem('password', this.password)
          localStorage.setItem('username', this.username) // JSON.stringify 将JSON转为字符串存到变量里

          const loginUrl = '/api/login'
          var params = new URLSearchParams()
          params.append('username', this.username)
          params.append('password', this.password)
          this.axios({
            method: 'post',
            url: loginUrl,
            data: params
          })
            .then(res => {
              console.log(res)
              if (res.status === 200) {
                // console.log(res.code)
                alert(res.data.userInfo.username)
                if (res.data.code === 2) {
                  this.tishi = '用户名或密码错误'
                  this.showTishi = true
                  this.username = ''
                  this.password = ''
                } else if (res.data.userInfo.username === 'admin') {
                  this.$router.push('/main')
                } else {
                  this.tishi = '登录成功'
                  this.showTishi = true
                  setTimeout(
                    function() {
                      this.$router.push({ path: 'login', query: { id: 1 } })
                    }.bind(this),
                    500
                  ) // 这是1秒延迟跳转
                }
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        }
      },
      register() {
        if (this.newUsername === '' || this.newPassword === '') {
          this.tishi = '请输入用户名或密码'
          this.showTishi = true
        } else {
          const registerUrl = '/api/register'
          var params = new URLSearchParams()
          params.append('username', this.newUsername)
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
                  this.password = ''
                  setTimeout(
                    function() {
                      this.showRegister = true
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

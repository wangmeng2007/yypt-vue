<template>
  <div>
    <!--<el-dialog-->
    <!--title="提示"-->
    <!--:visible.sync="dialogVisible"-->
    <!--width="30%"-->
    <!--:before-close="handleClose">-->
    <!--<span>这是一段信息</span>-->
    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="getData">确 定</el-button>-->
    <!--</span>-->
    <!--</el-dialog>-->
    <!--<el-button type="primary" @click="getData">确 定</el-button>-->
    <h1>User Manager</h1>
    <el-form :inline="true" :model="user" style="width: 100%" class="demo-form-inline">
      <el-form-item label="用户名称" :inline="true">
        <el-input v-model="user.Sname" placeholder="用户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="findUser">用户查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="users"
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="password"
        label="用户密码">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="user" >
          <el-button @click="deleteMusic(user.row)" size="small" type="text" style="background: aquamarine" aria-label="shanchu">删除</el-button>
          <el-button @click="dialogVisible=true" type="text" size="small"  style="background: aquamarine">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--<h2>总价格： {{priceTotal}}</h2>-->
  </div>
</template>

<script>
  export default {
    name: 'users',
    created() {
      //   fetch(this.url, { type: 'GET' })
      //     .then(res => res.json())
      //     .then(bks => this.books = bks)
      this.axios({
        url: '/api/users',
        method: 'get'
      }).then(res => {
        this.users.splice(0, this.users.length)
        this.users = res.data.reverse()
      })
    },
    data() {
      return {
        users: [],
        user: { Sname: '' },
        maxId: 2
      }
    },
    methods: {
      findUser() {
        this.axios({
          url: '/api/users/find',
          method: 'post',
          data: this.user
        }).then(res => {
          this.users.splice(0, this.users.length)
          this.users = res.data.reverse()
        })
      },
      deleteMusic(user) {
        var params = new URLSearchParams()
        params = user
        alert(params)
        this.axios({
          url: '/api/users/remove',
          method: 'post',
          data: params
        })
        // .then(res => res.json())
          .then(() => {
            let index = this.users.findIndex(item => item._id === user._id)
            this.users.splice(index, 1)
          })
      }
    }
    // computed: {
    //   priceTotal() {
    //     return this.musics.reduce((prev, book) => prev + book.price, 0)
    //   }
    // }
  }
</script>

<style scoped>
</style>

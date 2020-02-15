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
    <h1>Music Manager</h1>
    <el-form :inline="true" :model="music" class="demo-form-inline" style="width: 100%">
      <el-form-item label="歌曲名称" size='small' maxlength="10">
        <el-input v-model="music.Sname" placeholder="歌曲名称" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="演唱者">
        <el-input v-model="music.Songer"  placeholder="演唱者"></el-input>
      </el-form-item>
      <el-form-item label="上传者">
        <el-input v-model="music.Uploader" placeholder="上传者"></el-input>
      </el-form-item>
      <el-form-item label="歌曲类型">
        <el-input v-model="music.Stype" placeholder="歌曲类型"></el-input>
      </el-form-item>
      <el-form-item label="上传时间">
        <el-input v-model="music.uploadertime" type="date" placeholder="上传时间"></el-input>
      </el-form-item>
      <el-form-item label="歌曲简介">
        <el-input v-model="music.Note"  placeholder="歌曲简介"></el-input>
      </el-form-item>
      <el-form-item label="歌曲文件">
        <el-input v-model="music.Surl" placeholder="歌曲文件"></el-input>
      </el-form-item>
      <el-form-item label="所属专辑">
        <el-input v-model="music.special"  placeholder="所属专辑"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addMusic">添加音乐</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="musics"
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Sname"
        label="歌曲名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="Songer"
        label="演唱者">
      </el-table-column>
      <el-table-column
        prop="Uploader"
        label="上传者">
      </el-table-column>
      <el-table-column
        prop="Stype"
        label="歌曲类型">
      </el-table-column>
      <el-table-column
        prop="uplodertime"
        label="上传时间">
      </el-table-column>
      <el-table-column
        prop="Note"
        label="歌曲简介">
      </el-table-column>
      <el-table-column
        prop="Surl"
        label="歌曲文件">
      </el-table-column>
      <el-table-column
        prop="clickcount"
        label="点击次数">
      </el-table-column>
      <el-table-column
        prop="special"
        label="所属专辑">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="music">
          <el-button @click="deleteMusic(music.row)" size="small" type="text">删除</el-button>
          <el-button @click="dialogVisible=true" type="text" size="small" >编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--<h2>总价格： {{priceTotal}}</h2>-->
  </div>
</template>

<script>
  export default {
    name: 'musics',
    created() {
    //   fetch(this.url, { type: 'GET' })
    //     .then(res => res.json())
    //     .then(bks => this.books = bks)
      this.axios({
        url: '/api/musics',
        method: 'get'
      }).then(res => {
        this.musics.splice(0, this.musics.length)
        this.musics = res.data.reverse()
      })
    },
    data() {
      return {
        musics: [],
        music: { Sname: '', Songer: '', Uploader: '', Stype: '', uploadertime: '', Note: '', Surl: '', special: '' },
        maxId: 2
        // book: { name: '', price: '' },
        // dialogVisible: false,
        // books: []
      }
    },
    methods: {
      // getData() {
      //   this.axios({
      //     url: '/api/musics',
      //     method: 'get'
      //   }).then(res => {
      //     this.musics.splice(0, this.musics.length)
      //     this.musics = res.data.reverse()
      //   })
      // },
      deleteMusic(music) {
        // fetch(this.url + '/api/musics/remove' + music._id, { method: 'DELETE' })
        let params = new URLSearchParams()
        params = music
        alert(params)
        this.axios({
          url: '/api/musics/remove',
          method: 'post',
          data: params
        })
        // .then(res => res.json())
        .then(() => {
          let index = this.musics.findIndex(item => item._id === music._id)
          this.musics.splice(index, 1)
        })
      },
      addMusic() {
        this.axios({
          url: '/api/musics/add',
          method: 'post',
          data: this.music
        })
        // .then(res => res.json())
          .then(nm => this.musics.push(nm))
      }
    }
    // methods: {
    //   deleteBook(book) {
    //     fetch(this.url+"/"+book._id,{method:"DELETE"})
    //       .then(res=>res.json())
    //       .then(()=>{
    //         let index = this.books.findIndex(item => item._id == book._id)
    //         this.books.splice(index, 1)
    //       })
    //   },
    //   addBook() {
    //     fetch(this.url, {
    //       method: "POST", headers: {'Content-Type': 'application/json'},
    //       body: JSON.stringify(this.book)
    //     }).then(res=>res.json())
    //       .then(nb=>this.books.push(nb))
    //   }
    // },
    // computed: {
    //   priceTotal() {
    //     return this.musics.reduce((prev, book) => prev + book.price, 0)
    //   }
    // }
  }
</script>

<style scoped>
</style>

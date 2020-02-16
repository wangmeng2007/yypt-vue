<template>
  <div>
  <h1 class="title">Music Manager</h1>
    <el-form  :inline="true" :model="music" style="width: 100%" class="demo-form-inline">
      <el-form-item  :inline="true">
        <el-input v-model="music.Sname" placeholder="歌曲查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="findMusic" style="width: 90px;height: 40px;">歌曲查询</el-button>
      </el-form-item>
    </el-form>
    <el-form  :inline="true" :model="Special" style="width: 100%" class="demo-form-inline">
        <el-form-item  :inline="true">
          <el-input v-model="Special.special" placeholder="专辑查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="findspecial" style="width: 90px;height: 40px;">专辑查询</el-button>
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
    name: 'music-find',
    created() {
      //   fetch(this.url, { type: 'GET' })
      //     .then(res => res.json())
      //     .then(bks => this.books = bks)
      this.axios({
        url: '/api/musics'
      }).then(res => {
        this.musics.splice(0, this.musics.length)
        this.musics = res.data.reverse()
      })
    },
    data() {
      return {
        musics: [],
        music: { Sname: '' },
        Special: { special: '' },
        maxId: 2
        // book: { name: '', price: '' },
        // dialogVisible: false,
        // books: []
      }
    },
    methods: {
      findMusic () {
        this.axios({
          url: '/api/musics/find1',
          method: 'post',
          data: this.music
        }).then(res => {
          this.musics.splice(0, this.musics.length)
          this.musics = res.data.reverse()
        })
      },
      findspecial () {
        this.axios({
          url: '/api/musics/find2',
          method: 'post',
          data: this.Special
        }).then(res => {
          this.musics.splice(0, this.musics.length)
          this.musics = res.data.reverse()
        })
      }
    }
  }
</script>

<style scoped>
  .title{
    line-height: 60px;
    margin-top: 1px;
  }
  .el-form-item{
    line-height: 45px;
    margin-bottom: 10px;
  }
  .demo-form-inline{
    line-height: 50px;
  }
  .el-button{
    line-height: 10px;
    width: 30px;
    height: 25px;
  }
</style>

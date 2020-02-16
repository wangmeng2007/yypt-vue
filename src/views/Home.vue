<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png" />-->
    <div>
      <mt-header></mt-header>
    </div>
    <!--<div style="position: relative;float: left;display:inline;background-color: blue">-->
      <!--<img src="./xh_logo.png" alt="" >-->
    <!--</div>-->
      <!--<el-row >-->
        <!--<el-col :span="4">-->
          <!--<img src="./xh_logo.png" alt="" style="width:100%;height:72px;position: relative;float: left;display:inline;background-color: blue;">-->
        <!--</el-col>-->
        <!--<el-col :span="20" >-->
          <!--<Header></Header>-->
        <!--</el-col>-->
      <!--</el-row>-->
    <div>
      <el-container>
        <el-header style="width: 100%;height: 72px; position: relative;float: left;display:inline;padding: 0px;margin: 0px;">
          <Header></Header>
        </el-header>
        <el-container style="margin-top: 3px">
          <el-aside style="width: 207px;height: 700px">
            <m-aside0></m-aside0>
          </el-aside>
          <el-main style="height: 700px">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import mtHeader from '../components/mt-header/mt-header.vue'
// import msystem from "../components/m-system/m-system.vue";
import Header from '../components/header.vue'
import mAside0 from '../components/m-aside0.vue'
export default {
  name: 'home',
  components: {
    mtHeader,
    Header,
    mAside0
    // msystem
  }
}
</script>
<style scoped>
.el-header{}
.el-footer {
  background-color: #b3c0d1;
  /*color: #333;*/
  text-align: center;
  line-height: 60px;
  height: 200px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
  width: 207px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

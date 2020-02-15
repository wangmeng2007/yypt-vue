<template>
  <div class="mt-head">
    <!--<img src="./xh_logo.png" alt="">-->
    <h2>{{ title }}</h2>
    <div class="time">{{ msg }}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '',
      title: '音乐平台'
    }
  },
  mounted: function () {
    var seft = this
    setInterval(getFultime, 1000)
    function getFultime () {
      let newTime = new Date()
      let t = newTime.getSeconds() <= 9 ? '0' + newTime.getSeconds() : newTime.getSeconds()
      let m = newTime.getMinutes() <= 9 ? '0' + newTime.getMinutes() : newTime.getMinutes()
      let h = newTime.getHours() <= 9 ? '0' + newTime.getHours() : newTime.getHours()
      let d = newTime.getDate() <= 9 ? '0' + newTime.getDate() : newTime.getDate()
      let y = newTime.getMonth() + 1 <= 9 ? '0' + (newTime.getMonth() + 1) : newTime.getMonth() + 1
      let n = newTime.getFullYear()
      let time = n + '-' + y + '-' + d + ' ' + h + ':' + m + ':' + t
      seft.msg = time
    }
  },
  name: 'mtHeader'
}
</script>

<style scoped lang="less">
.mt-head{
  position: relative;
  height: 95px;
  text-align: center;
  background: url("./sh-skin-xiaoman.png") no-repeat left center;
  img{
    width: 187px;
    height: 72px;
    position: absolute;
    left: 0;
    top: 20px;
  }
  h2{
    color: rgba(147, 19, 8, 0.65);
    font-size:30px;
    line-height: 1.5;
    margin: 0 8px;
  }
  .time{
    line-height: 1;
    color: rgba(25, 25, 50, 0.92);
    font-size: 20px;
    float: right;
  }
}
</style>

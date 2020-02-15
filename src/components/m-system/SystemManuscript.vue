<template>
  <div id="game-scene" :class="{'scene in': show,
              'scene out': !show}">
    <Row :gutter="16">
      <Col :span="rowArg.sysSpan" v-for="item in sysData" :key="item.docid" :style="{'width':colWidth}">
      <h1>{{item.name}}</h1>
      <div class="card a" :class="{'flipped':item.isFalse }">
        <div class="front face" :class="{'bg':!item.status,'bg1':item.status?item.status.issueStatus === '1' ? false : true:false}">
          <h2>{{item.status? item.headline: ''}}</h2>
          <span>{{item.status?item.status.issueStatus === '2' ? '超时' : '':''}}</span>
          <p>{{item.status? item.status.issueDatetime: ''}}</p>
        </div>
        <div class="back face" :class="{'bg':!item.status,'bg1':item.status?item.status.issueStatus === '1' ? false : true:false}">
          <h2>{{item.status? item.headline: ''}}</h2>
          <span>{{item.status?item.status.issueStatus === '2' ? '超时' : '':''}}</span>
          <p>{{item.status? item.status.issueDatetime: ''}}</p>
        </div>
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import axios from 'axios'
import api from '../../api/all.interfaces'
import common from '../../common/js/common'
export default {
  props: ['delData'],
  data: function () {
    return {
      show: true,
      isFalse: false,
      bg: {
        bg: false
      },
      rowArg: {
        sysSpan: '4'
      },
      colWidth: false,
      sysData: [
      ]
    }
  },
  methods: {
    getWritingSystem: function () {
      axios.get(api.writingSystem.getSystemList)
        .then(res => {
          let ws = res.data.data
          if (ws.length < 6) {
            this.colWidth = 100 / ws.length + '%'
          } else {
            this.rowArg.sysSpan = 4
          }
          this.getNewManuscript(ws)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getNewManuscript: function (system) {
      let newMan = this.delData
      system.map(item => {
        item.docId = newMan.docId
        item.headline = newMan.headLine
        item.isFalse = false
        newMan.status.map(item1 => {
          if (item.code === item1.systemCode) {
            item.status = item1
            // console.log(item.status.issueDateTimeStr)
            item.status.issueDatetime = common.time(item.status.issueDateTimeStr)
          }
        })
      })
      this.sysData = system
      let len = this.sysData.length
      let self = this
      for (let i = 0; i < len; i++) {
        (function (i) {
          setTimeout(() => {
            self.sysData[i].isFalse = true
          }, i * 1000)
        })(i)
      }
    },
    getProp: function () {
      // console.log(this.delData.status)
      this.delData.status.map(item => {
        item.isFalse = false
        item.name = item.systemName
        item.issueDatetime = common.time(item.issueDatetime)
      })
      // this.sysData = this.delData.status
    }
  },
  mounted: function () {
    this.getWritingSystem()
    this.getProp()
  }
}
</script>
<style scoped lang="less">
  #game-scene{
    background-color: rgba(114, 177, 255, 0.25);
    box-shadow: 0px 10px 30px 10px rgba(34, 48, 109, 0.45);
    border-radius: 12px;
    padding-bottom: 15px;
    margin-bottom: 20px;
    position: relative;
    h1{
      width: 100%;
      line-height: 2;
      text-align: center;
    }
    .card {
      width: 100%;
      height: 100%;
      min-height: 230px;
      display: inline-block;
      perspective: 700;
      transition: all .5s ease-out;
      margin: 0 auto;
      position: relative;
      .face {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        background: rgba(64, 196, 158, 0.6);
        transition: all 0.5s ease-out;
        h2{
          text-align: center;
          padding: 10px 10px;
        }
        p{
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          box-sizing: border-box;
          padding: 10px 20px;
          text-align: center;
        }
        span{
          display: block;
          width: 100%;
          line-height: 1.5;
          text-align: center;
        }
      }
      .face.front {
        transform: rotate3d(0, 1, 0, 0deg);
      }
      .face.back {
        transform: rotate3d(0, 1, 0, 180deg);
      }
      .face.bg {
        background: #7f7f7f;
      }
      .face.bg1 {
        background: #C21F39;
      }
    }
    .card.flipped {
      .face.front {
        transform: rotate3d(0, 1, 0, -180deg);
      }
      .face.back {
        transform: rotate3d(0, 1, 0, 0deg);
      }
    }
  }
</style>

<template>
  <div id="game-scene" :class="{'scene in': show, 'scene out': !show}">
    <div class="arrowShow" @click="arrowShow" :class="{'arrowHide': arrowHide}"></div>
    <Row :gutter="16">
      <Col span="4" v-for="item in sysData" :key="item.docid" :style="{'width':colWidth}">
         <div style="position: relative">
           <span :class="{'Serial-number':item.isRed? item.isRed: false,'Serial-number-red':item.isRed? !item.isRed: false}" v-if="item.isRed? true: false">{{item.heardLine}}</span>
           <h1>{{item.name}}</h1>
         </div>
        <div class="card a" :class="{'flipped':item.isFalse ,'hidden': whetherHide }">
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
import qs from 'qs'
import bus from '../../common/js/bus'
export default {
  data: function () {
    return {
      show: true,
      whetherHide: false,
      arrowHide: true,
      isFalse: false,
      bg: {
        bg: false
      },
      rowArg: {
        sysSpan: '4'
      },
      sysData: [],
      colWidth: false
    }
  },
  methods: {
    // 是否显示翻牌
    arrowShow () {
      this.arrowHide = !this.arrowHide
      this.whetherHide = !this.whetherHide
      if (this.arrowHide) {
        this.$store.state.bottomHeight = 400
      } else {
        this.$store.state.bottomHeight = 600
      }
    },
    getNewManuscript: function (system) {
      let params = {
        templateId: this.$store.state.templateId
      }
      axios.get(api.manuscript.newManuscript + '?' + qs.stringify(params))
        .then(res => {
          if (res.status === 200 && res.data.data) {
            let newMan = res.data.data
            let newManuScript = this.$store.state.newManuScript
            system.map((item) => {
              item.docId = newMan.docId
              item.headline = newMan.headline
              item.isFalse = false
              newMan.status.map(item1 => {
                if (item.code === item1.systemCode) {
                  item.status = item1
                  item.status.issueDatetime = common.time(item.status.issueDateTimeStr)
                }
              })
              if (newManuScript.status) {
                newManuScript.status.map(item2 => {
                  if (item.code === item2.systemCode) {
                    item.isRed = item2.issueStatus === '1' ? true : ''
                  }
                })
                item.heardLine = newManuScript.headline.match(/\d+/g)[0].slice(newManuScript.headline.match(/\d+/g)[0].length - 2)
              }
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
            this.setTimeSystem = setTimeout(() => { self.getWritingSystem() }, 1000 * 10)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
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
    }
  },
  mounted: function () {
    this.getWritingSystem()
    let self = this
    bus.$on('isUser', function () {
      clearInterval(self.setTimeSystem)
      self.getWritingSystem()
    })
  },
  beforeDestroy: function () {
    clearInterval(this.setTimeSystem)
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
    .arrowShow{
      width: 15px;
      height: 24px;
      position: absolute;
      right: 20px;
      top: 6px;
      background: url(../../../static/img/arrow.png) no-repeat center;
      background-size: 100%;
      z-index: 100;
      cursor: pointer;
      transition: 1s ease-in-out;
      transform:rotate(90deg);
    }
    .arrowHide{
      transform:rotate(270deg);
    }
    h1{
      width: 100%;
      line-height: 2;
      text-align: center;
    }
    .Serial-number{
      padding: 5px;
      position: absolute;
      top: 2px;
      left: 50px;
      border-radius: 100%;
      background-color: rgba(64, 196, 158, 0.6);
    }
    .Serial-number-red{
      padding: 5px;
      position: absolute;
      top: 2px;
      left: 50px;
      border-radius: 100%;
      background-color: rgba(255, 0, 0, 0.6);
    }
    .card.hidden{
      display: none;
    }
    .card {
      width: 100%;
      height: 100%;
      min-height: 230px;
      display: inline-block;
      perspective: 700;
      -webkit-perspective: 700;
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
        border-radius: 5px;
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

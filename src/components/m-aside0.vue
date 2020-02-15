<template>
  <div class="aside">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @onclick="alert"
      background-color="#344058"
      text-color="#D0D0D0"
      active-text-color="#fff"
      unique-opened
      router
    >
      <!--存在子菜单-->
      <ul v-once v-if="staticId === 0">
        <div v-for="(item) in mymenu" :key="item.id">
          <el-submenu v-if="item.children" :index="item.id">
            <template slot="title">
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="(subitem) in item.children"
              :key="subitem.id"
              :index="subitem.uri"
              style="min-width: 166px;padding: 0"
            >
              <template slot="title">
                {{ subitem.name }}
              </template>
            </el-menu-item>
          </el-submenu>
          <!--不存在子菜单-->
          <el-menu-item v-else :index="item.uri">
            <template slot="title">
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </div>
      </ul>
      <ul v-once v-else-if="staticId === 1">
        <div v-for="(item) in sys" :key="item.id">
          <el-submenu v-if="item.children" :index="item.id">
            <template slot="title">
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="(subitem) in item.children"
              :key="subitem.id"
              :index="subitem.uri"
            >
              {{ subitem.name }}
            </el-menu-item>
          </el-submenu>
          <!--不存在子菜单-->
          <el-menu-item v-else :index="item.uri">
            <!--<i class="el-icon-menu"></i>-->
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </div>
      </ul>
      <ul v-once v-else-if="staticId === 2">
        <div v-for="(item) in cam" :key="item.id">
          <el-submenu v-if="item.children" :index="item.id">
            <template slot="title">
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="(subitem) in item.children"
              :key="subitem.id"
              :index="subitem.uri"
              @click="dalert(subitem.id)"
            >
              {{ subitem.name }}
            </el-menu-item>
          </el-submenu>
          <!--不存在子菜单-->
          <el-menu-item v-else :index="item.uri">
            <!--<i class="el-icon-menu"></i>-->
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </div>
      </ul>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'aside',
  data () {
    return {
      defaultUrl: '/Home',
      staticId: 0,
      mymenu: [
        {
          id: '01',
          name: '首页',
          uri: '/'
        },
        {
          id: '02',
          name: '登录/注册',
          children: [
            {
              id: '02-1',
              name: '用户登录',
              uri: '/login'
            },
            {
              id: '02-2',
              name: '用户注册',
              uri: '/register'
            },
            {
              id: '02-3',
              name: '登录日志',
              uri: '/log'
            }
          ]
        }
      ],
      // index0: [
      //   {
      //     id: 0,
      //     name: '首页',
      //     uri:''
      //   }],
      sys: [
        {
          id: 11,
          name: '用户列表',
          uri: '/users'
        },
        {
          id: 12,
          name: '用户查询',
          uri: '/controller/find'
        },
        {
          id: 13,
          name: '系统日志',
          uri: '/controller/syslog'
        }
      ],
      cam: [
        {
          id: 21,
          name: '歌曲列表',
          uri: '/musics'
        },
        {
          id: 22,
          name: '歌曲、专辑查询',
          uri: '/musicFind'
        },
        {
          id: 23,
          name: '专辑收藏',
          uri: '/controller/storage'
        }
      ]
    }
  },
  created: function () {
    this.bbtn()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
      // alert(key)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    dalert (key) {
      alert(key)
    },
    bbtn: function () {
      this.bus.$on('sendId', id => {
        this.staticId = id
      })
    }
  }
}
</script>

<style scoped lang="less">
.el-menu-item.is-active {
  background-color: blue !important;
}
</style>

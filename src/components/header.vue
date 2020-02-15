<template>
    <div class="m-header">
        <el-menu
                :default-active="1"
                 class="el-menu-demo"
                 mode="horizontal"
                 @open="handleOpen"
                 @close="handleClose"
                 @onclick="alert"
                 background-color="#344058"
                 text-color="#D0D0D0"
                 active-text-color="#fff"
                 unique-opened
                 router>
            <!--存在子菜单-->
            <el-menu-item v-for="(item) in list" :key="item.id" @click="Click(item.id)">
                <el-submenu v-if="item.children" :index="item.id">
                    <el-menu-item >
                        {{item.text}}
                    </el-menu-item>
                    <el-menu-item v-for="(subitem,subindex) in item.children" :key="subindex" :index="subitem.uri">
                        {{subitem.text}}
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="item.href">
                    {{item.text}}
                </el-menu-item>
            </el-menu-item>
        </el-menu>
    </div>
    <!--<ul>-->
        <!--<li v-for="items of list" :key="items.id" @click="Click(items.id)">-->
            <!--<a href="javascript:void(0);">{{items.text}}</a>-->
        <!--</li>-->
    <!--</ul>-->
</template>

<script>
export default {
  name: 'header.vue',
  data: function () {
    return {
      list: [
        { id: 0,
          name: 'index',
          text: '首页',
          href: '/components/0'
        },
        { id: 1,
          name: 'sys',
          text: '用户管理',
          href: '/components/1'
        },
        { id: 2,
          name: 'cam',
          text: '音乐管理',
          href: '/components/2'
        }]
    }
  },
  methods: {
    Click: function (id) {
      this.bus.$emit('sendId', id)
      // alert(id)
    }
  }
}
</script>

<style scoped lang="less">
    .m-header{
        position: relative;
        height: 75px;
        text-align: center;
    img{
        width: 187px;
        height: 72px;
        position: absolute;
        left: 0;
    }
    }
    .el-menu-demo{
        height: 72px;
    }
    .el-menu-item.is-active{
        background-color: blue !important;
    }
</style>

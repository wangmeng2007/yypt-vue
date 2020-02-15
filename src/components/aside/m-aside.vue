<template>
  <div class="aside-a">
    <el-tree :data="treedata" :props="defaultProps" :default-expanded-keys="[1,11]" node-key="id" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
export default {
  name: 'aside-a',
  data () {
    return {
      treedata: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 11,
          label: '二级 1-1',
          children: [{
            id: 111,
            label: '三级 1-1-1'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 21,
          label: '二级 2-1',
          children: [{
            id: 211,
            label: '三级 2-1-1'
          }]
        }, {
          id: 22,
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 31,
          label: '二级 3-1',
          children: [{
            id: 311,
            label: '三级 3-1-1'
          }]
        }, {
          id: 32,
          label: '二级 3-2',
          children: [{
            id: 321,
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick (treedata) {
      console.log(treedata)
    }
  }
}
</script>

<style scoped>

</style>

<template>
    <div><p2><span v-on:click="tologin">用户登录/注册</span></p2></div>
</template>

<script>
  export default {
    name: 'main',
    method: {
      tologin() {
        this.$router.push({ path: '/login/' })
      }
    }
  }
</script>

<style scoped>

</style>

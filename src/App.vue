<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!--<hello-world msg="Welcome to Yoursdsfsf.js App"></hello-world>-->
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
    // HelloWorld
  },
  created() {
    this.$Message.info({
      message: '这是一条提示信息，10s 后自动关闭',
      duration: 1000000
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

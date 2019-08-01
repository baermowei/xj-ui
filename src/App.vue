<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <xj-modal v-model="modal1" title="这里是标题">
      <p>这里是模态框的文本内容!</p>
      <p>这里是模态框的文本内容!</p>
    </xj-modal>
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!--<hello-world msg="Welcome to Yoursdsfsf.js App"></hello-world>-->
    <xj-menu mode="horizontal" active-name="1">
      <xj-menu-item name="1"><i class="icon icon-home"></i>导航菜单一</xj-menu-item>
      <xj-menu-item name="2"><i class="icon icon-layers"></i>导航菜单二</xj-menu-item>
      <xj-submenu>
        <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单三</template>
        <xj-menu-item name="3-1"><i class="icon icon-settings"></i>导航菜单四</xj-menu-item>
        <xj-menu-item name="3-2"><i class="icon icon-settings"></i>导航菜单五</xj-menu-item>
        <xj-submenu>
          <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单六</template>
          <xj-menu-item name="3-3-1"><i class="icon icon-settings"></i>导航菜单七</xj-menu-item>
          <xj-menu-item name="3-3-2"><i class="icon icon-settings"></i>导航菜单八</xj-menu-item>
        </xj-submenu>
      </xj-submenu>
      <xj-menu-item name="4"><i class="icon icon-settings"></i>导航菜单四</xj-menu-item>
    </xj-menu>
  </div>
</template>

<script>
  import XjModal from './components/modal'
import XjMenu from './components/menu'
import XjMenuItem from './components/menu/src/menu-item'
import XjSubmenu from './components/menu/src/submenu'
export default {
  name: 'app',
  components: {
    // HelloWorld
    XjMenu,
    XjMenuItem,
    XjSubmenu,
    XjModal
  },
  data(){
    return{
      modal1:true
    }
  },
  created() {
    this.$Message.error({
      vnode:'<em>sdfsjk</em>',
      message: '这是一条提示信息，10s 后自动关闭',
      duration: 100000
    })
  }
}
</script>

<style lang="scss">
@import "assets/index";
</style>

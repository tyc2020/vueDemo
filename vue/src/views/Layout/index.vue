<template>
  <div id="layout" :class="menuStatus ? 'close' : 'open'">
  <div>首页</div>
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
import LayoutHeader from "./Components/Header";
import LayoutNav from "./Components/Nav";
import LayoutMain from "./Components/Main";
export default {
  name: "layout",
  components: { LayoutMain, LayoutHeader, LayoutNav },
  setup(props, { root }) {
    //监听菜单收缩
    const menuStatus = computed(()=> root.$store.state.app.isCollapse)
    return {
      menuStatus
    }
  }
};
</script>
<style lang="scss" scoped></style>

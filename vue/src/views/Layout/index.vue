<template>
  <div id="layout">
  <div>首页</div>
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>
import LayoutHeader from "./Components/Header";
import LayoutNav from "./Components/Nav";
import LayoutMain from "./Components/Main";
export default {
  name: "layout",
  components: { LayoutMain, LayoutHeader, LayoutNav },
  setup() {
    console.log(1)
  }
};
</script>
<style lang="scss" scoped></style>

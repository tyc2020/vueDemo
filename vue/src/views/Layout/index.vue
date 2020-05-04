<template>
  <div id="layout">
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
  setup() {}
};
</script>
<style lang="scss" scoped>
#layout {
  background-color: #eceaea;
}
</style>

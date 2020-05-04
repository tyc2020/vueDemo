<template>
  <div id="main-wrap">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 75px;
  left: $navMenu;
  border: 30px solid #eceaea;
  border-bottom: none;
  -webkit-box-sizing: border;
}
</style>

<template>
  <div id="main-wrap">
  <div class="main-content">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
    
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  // position: fixed;
  // width: 100%;
  height: 100vh;
  // top: 75px;
  // left: $navMenu;
  // border: 30px solid #eceaea;
  // border-bottom: none;
  // -webkit-box-sizing: border;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30px;
  padding-left: $navMenu + 30px;
  padding-right: 30px;
  -webkit-box-sizing: border-box; 
  box-sizing: border-box;
}
.content {
  width: 100%;
  height:100%;
  padding: 30px 30px 0 30px;
  -webkit-box-sizing: border-box; 
  box-sizing: border-box;
  background-color: #fff;
}
</style>

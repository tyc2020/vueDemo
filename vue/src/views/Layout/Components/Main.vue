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
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "layoutMain",
  setup(){
    const str = ref('{"name": "星月","title": "alk"}')
    const json = reactive(JSON.parse(str.value))
    console.log(json)

  }
};
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
  @include webkit(box-sizing, border-box );
  @include webkit(transition, all 0.3s ease 0s);
}

.open {
  .main-content { padding-left: $navMenu + 30px; }
}

.close {
  .main-content { padding-left: $navMenuMin + 30px; }
}
.content {
  width: 100%;
  height:100%;
  padding: 30px 30px 0 30px;
  @include webkit(box-sizing, border-box );
  background-color: #fff;
}
</style>

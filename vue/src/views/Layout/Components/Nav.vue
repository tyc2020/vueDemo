<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/logo.png"></h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <!--一级菜单-->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!--二级菜单-->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
            >{{ subItem.meta.name }}</el-menu-item
          >
        </el-submenu>
        
      </template>

    </el-menu>
  </div>
  
</template>

<script>
// import { reactive, ref, onMounted } from "@vue/composition-api";
import { ref, reactive, onMounted, computed } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    //data数据
    const routers = reactive(root.$router.options.routes);

    /*监听 */
    const isCollapse = computed(()=> root.$store.state.isCollapse)

    return {
      isCollapse,
      routers
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
.logo {
  img {
    margin: auto;
    width: 92px;
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all 0.3s ease 0s);
  transition: all .3s ease 0s;
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
.el-menu {
  border-right: none;
}
.open {
  #nav-wrap { width: $navMenu;}
}

.close {
  #nav-wrap { width: $navMenuMin;}
}

</style>

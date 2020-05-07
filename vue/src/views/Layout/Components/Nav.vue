<template>
  <div id="nav-wrap">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
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
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    //data数据
    const isCollapse = ref(false);
    // console.log(root.$router.options);
    const routers = reactive(root.$router.options.routes);

    //方法
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath + "123");
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    return {
      isCollapse,
      handleClose,
      handleOpen,
      routers
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}

</style>

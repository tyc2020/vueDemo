<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12"><div class="box bc-gray"></div></el-col>
      <el-col :span="12"><div class="box"></div></el-col>

      <el-col></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "infoIndex",
  setup() {}
};
</script>
<style lang="scss" scaped>
.box{
  background-color: red;
  height: 20px;
}
.bc-gray {
  background-color: #ccc;
}
.bc-red {
  background-color: red;
}
</style>

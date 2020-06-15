<template>
  <el-dialog title="收货地址" :visible.sync="flag">
    asd
  </el-dialog>
</template>
<script>
export default{
  name: "dialogInfo",
  data(){
    return {
      dialog_info:false
    }
  },
  props:{
    flag:{
      type:Boolean,
      default:false
    }
  }
}
</script>
<style scoped>

</style>

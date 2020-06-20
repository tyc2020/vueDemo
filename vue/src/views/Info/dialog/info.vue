<template>
  <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="580px">
      <el-form :model="form">
    <el-form-item label="标题：" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="类型：" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择类型">
        <el-option label="国内" value="nation"></el-option>
        <el-option label="国外" value="internation"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="概况" :label-width="formLabelWidth">
      <el-input type="textarea" v-model="form.name" placeholder="请输入内容"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="danger" @click="dialogFormVisible = false">确 定</el-button>
  </div>
  </el-dialog>
</template>
<script>
import { reactive, ref,watchEffect } from "@vue/composition-api";
export default{
  name: "dialogInfo",
  props:{
    flag:{
      type:Boolean,
      default:false
    }
  },
  setup(props,{emit}){
    const dialog_info_flag = ref(false)
    const formLabelWidth = ref('70px')
  
    const form = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    })

    //watch
    watchEffect(()=>{
      dialog_info_flag.value = props.flag
    })

    //2.0方法
    const close = ()=>{
      dialog_info_flag = false
      emit("update:flag",false)
      // this.$emit("close",false)
    }
    return {
      //ref
      dialog_info_flag,
      formLabelWidth,
      //reactive
      form,
      //2.0 methods
      close
      
    }
  }
}
</script>
<style scoped>

</style>

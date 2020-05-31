<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row :gutter="14">
        <el-col :span="4">

          <div class="label-wrap category">
            <label for="">类型：</label>
            <div class="wrap-content">
              <el-select v-model="value" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
      </el-col>

        <el-col :span="7">
          <div class="label-wrap data">
          <label for="">日期:&nbsp;&nbsp;</label>
            <div class="wrap-content">
                  <el-date-picker
                  v-model="value1"
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00']"
                  style="width:250px;">
                </el-date-picker>
              </el-date-picker>
            </div>
          </div>
        </el-col>

        <el-col :span="3">
        <div class="label-wrap key-word">
          <label for="">关键字:</label>
            <div class="wrap-content">
            <el-select v-model="search_key" >
              <el-option v-for="item in searchOption" :key="item.value" :value="item.value" :label="item.label">
              </el-option>
            </el-select>
            </div>
          </div>
        </el-col>

        <el-col :span="3">
          <el-input v-model="search_keyWord" placeholder="请输入">
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" style="width:100%">搜索</el-button>
        </el-col>
        <el-col :span="2" class="pull-right">
          <el-button type="danger" >新增</el-button>
        </el-col>
        
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "infoIndex",
  setup() {
   const options = reactive( [{
          value: 1,
          label: '国际信息'
        }, {
          value: 2,
          label: '国内'
        }, {
          value: 3,
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }])
        //搜索关键字
        const searchOption = reactive([
          {value:'id',label:'ID'},
          {value:'title',label:'标题'},
        ])

        const search_keyWord = ref("")
        //绑定项 默认
        const search_key = ref("id")

        const value = ref('')
        const value2 = ref('')
        return {
          options,
          value,
          value2,
          searchOption,
          search_key
        }
  }
}
</script>
<style lang="scss" scaped>
@import "../../styles/config.scss";
  .label-wrap{
    &.category{
      @include labelDom(left,50,40);
    }
    &.data{
      @include labelDom(right,50,40);
      label{
        padding-right: 10px;
      }
    }
    &.key-word{
      @include labelDom(left,49,40);
    }
    .pull-right{
      float:right !important;
    }
  }
</style>

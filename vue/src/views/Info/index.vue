<template>
  <div>
      <el-row :gutter="14">
        <el-col :span="4">

          <div class="label-wrap category">
            <label for="">类型：</label>
            <div class="wrap-content">
              <el-select v-model="category_value" placeholder="请选择" style="width:100%;">
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
                  v-model="date_value"
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
              <el-option v-for="item in search_option" :key="item.value" :value="item.value" :label="item.label">
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
          <el-button type="success" style="width:100%">搜索</el-button>
        </el-col>
        <el-col :span="2" class="pull-right">
          <el-button type="danger" @click="dialog_info = true">新增</el-button>
        </el-col>
      </el-row>
      <div class="black-space-30"></div>
      <!-- 表单数据-->
      <el-table :data="table_data" border style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="450"></el-table-column>
        <el-table-column prop="category" label="类型" width="130"></el-table-column>
        <el-table-column prop="date" label="日期" width="240"></el-table-column>
        <el-table-column prop="user" label="管理员" width="115"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini">删除</el-button>
            <el-button size="mini" type="danger">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="black-space-30"></div>
      <!--底部-->
      <el-row>
        <el-col :span="12">
          <el-button size="medium">批量删除</el-button>
        </el-col>
        <el-col :span="12">
          <el-pagination
          class="pull-right"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10,20,50,100]"
            layout="total, sizes, prev, pager, next"
            :total="50">
          </el-pagination>
        </el-col>
      </el-row>

      <!--新增弹窗-->
      <dialogInfo :flag="dialog_info"></dialogInfo>

  </div>
</template>
<script>
import dialogInfo from "./dialog/info";
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "infoIndex",
  components:{ dialogInfo },
  setup(props) {
    /*
    数据
    */
    const dialog_info = ref(false)
    const search_keyWord = ref("")
    const search_key = ref("id")
    const category_value = ref('')
    const date_value = ref('')


    const options = reactive([
        {
          title:'四大皆空',
          category: '国内信息',
          date: '2020-01-01 19:31:25',
          user: '管理员'
        },{
          title:'四大皆空',
          category: '国内信息',
          date: '2020-01-01 19:31:25',
          user: '管理员'
        },{
          title:'四大皆空',
          category: '国内信息',
          date: '2020-01-01 19:31:25',
          user: '管理员'
        },{
          title:'四大皆空',
          category: '国内信息',
          date: '2020-01-01 19:31:25',
          user: '管理员'
        }])
        //搜索关键字
        const search_option = reactive([
          {value:'id',label:'ID'},
          {value:'title',label:'标题'},
        ])


        //表格数据
        const table_data = reactive([{
          title:'四大皆空',
          category: '国内信息',
          date: '2020-01-01 19:31:25',
          user: '管理员'
        },
        {
          title:'四大皆空',
          category: '国内信息',
          date: '2020-01-01 19:31:25',
          user: '管理员'
        },
        {
          title:'四大皆空',
          category: '国内信息',
          date: '2020-01-01 19:31:25',
          user: '管理员'
        },
        {
          title:'四大皆空',
          category: '国内信息',
          date: '2020-01-01 19:31:25',
          user: '管理员'
        }])

        /*
        方法
        */
        const handleSizeChange = (val) => {

        }

        const handleCurrentChange = (val) => {

        }

        return {
          //ref
          dialog_info,
          date_value,
          search_keyWord,
          search_key,
          category_value,

          //reactive
          table_data,
          options,
          search_option,

          //vue2.0 methods
          handleCurrentChange,
          handleSizeChange,

          
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

<template>
  <div class="page-search">
    <h1 class="search-title">高级检索</h1>
    <el-form
      :inline="true"
      :model="formData"
      class="demo-form-inline"
      label-width="100px"
    >
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
            <el-form-item :label="item.label">
              <!-- 输入框 -->
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.field]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <!-- 选择器 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.field]"
                  :placeholder="item.placeholder"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option
                      :label="option.title"
                      :value="option.value"
                    ></el-option>
                  </template>
                </el-select>
              </template>
              <!-- 日期选择器 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="formData[item.field]"
                  type="date"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btn-wrapper">
      <el-button type="primary" @click="onSubmit">搜索</el-button>
      <el-button type="danger" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    searchFormConfig: {
      require: true,
      type: Object
    }
  },
  setup(props) {
    // 传入的配置项
    const formItems = ref(props.searchFormConfig.formItems)
    // el-input 等组件绑定的值
    const formData = ref({})
    formItems.value.forEach(item => {
      formData[item.field] = ''
    })

    const onSubmit = () => {
      console.log('submit!')
    }
    const onReset = () => {}
    return {
      onSubmit,
      onReset,
      formItems,
      formData
    }
  }
}
</script>

<style lang="less" scoped>
.page-search {
  border-bottom: 10px solid #e9eef3;
  .search-title {
    margin-top: 0;
    color: #7a88fe;
  }
  .btn-wrapper {
    display: flex;
    justify-content: end;
    padding: 0 20px 10px 0;
  }
}
</style>

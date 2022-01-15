<template>
  <div class="page-search">
    <h1 class="search-title">高级检索</h1>
    <gull-form
      :formItems="formItems"
      :myFormData="formData"
      :isReset="isReset"
      @setIsResetFalse="
        (val1, val2) => {
          isReset = val1
          formData = val2
        }
      "
    />
    <div class="btn-wrapper">
      <el-button type="primary" @click="onSubmit">搜索</el-button>
      <el-button type="danger" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script>
import gullForm from '@/base-ui/form'
import { ref } from 'vue'
import { useSystemStore } from '@/store/system'
import { getPageListData } from '@/service/api/system'
export default {
  components: {
    gullForm
  },
  props: {
    searchFormConfig: {
      require: true,
      type: Object
    }
  },
  setup(props) {
    const systemStore = useSystemStore()
    const onSubmit = async () => {
      await getPageListData('/users/list', {
        offset: 0,
        size: 5,
        ...formData.value
      })
      systemStore.getUserListAction({
        offset: 0,
        size: 5,
        ...formData.value
      })
    }
    const isReset = ref(false)
    const onReset = () => {
      isReset.value = true
    }

    // 传入的配置项
    const formItems = ref(props.searchFormConfig.formItems)
    // el-input 等组件绑定的值
    const formOriginData = {}
    formItems.value.forEach(item => {
      formOriginData[item.field] = ''
    })
    const formData = ref(formOriginData)
    return {
      formData,
      formItems,
      onSubmit,
      onReset,
      isReset
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

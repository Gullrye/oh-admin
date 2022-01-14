<template>
  <div class="page-content">
    <el-table :data="tableData" style="width: 100%">
      <template v-for="item in propList" :key="item.label">
        <el-table-column :label="item.label" :prop="item.prop" align="center" />
      </template>
      <el-table-column align="right">
        <template #header>
          <el-button type="primary" size="small">新建</el-button>
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-block">
      <el-pagination
        v-model:currentPage="currentPage4"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="systemStore.userCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useSystemStore } from '@/store/system'
export default {
  props: {
    contentTableConfig: {
      require: true,
      type: Object
    }
  },
  setup(props) {
    // 表格数据
    const propList = ref(props.contentTableConfig.propList)
    const systemStore = useSystemStore()
    systemStore.getUserListAction()
    const tableData = computed(() => {
      return systemStore.userList
    })

    // 分页器
    const handleSizeChange = val => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = val => {
      console.log(`current page: ${val}`)
    }

    // 按钮操作
    const handleEdit = (index, row) => {
      console.log(index, row)
    }
    const handleDelete = (index, row) => {
      console.log(index, row)
    }

    return {
      tableData,
      handleEdit,
      handleDelete,
      propList,
      handleSizeChange,
      handleCurrentChange,
      systemStore
    }
  }
}
</script>

<style lang="less" scoped>
.page-content {
  padding: 0 10px 0 0;
  .pagination-block {
    height: 48px;
    margin-top: 10px;
  }
}
</style>

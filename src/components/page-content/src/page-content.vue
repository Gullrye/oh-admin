<template>
  <div class="page-content">
    <el-table :data="tableData" style="width: 100%">
      <template v-for="item in propList" :key="item.label">
        <el-table-column
          :label="item.label"
          :prop="item.prop"
          :min-width="item.minWidth"
          align="center"
        />
      </template>
      <!-- 右侧按钮 -->
      <el-table-column align="right" min-width="100px">
        <template #header>
          <el-button
            type="primary"
            size="small"
            @click="dialogFormVisible = true"
            >新建</el-button
          >
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

    <!-- 弹出框 -->
    <el-dialog v-model="dialogFormVisible" title="编辑">
      <!-- 表单 -->
      <gull-form :formItems="formItems" :myFormData="formData" />
      <!-- 按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleNewConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 分页器 -->
    <div class="pagination-block">
      <el-pagination
        v-model:currentPage="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        v-model:pageSize="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="systemStore.userCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { useSystemStore } from '@/store/system'
import { deletePageData, createPageData } from '@/service/api/system.js'
import gullForm from '@/base-ui/form'
import { dialogFormConfig } from './dialog-config'
export default {
  components: {
    gullForm
  },
  props: {
    contentTableConfig: {
      require: true,
      type: Object
    }
  },
  setup(props) {
    // 表格数据及分页器
    const currentPage = ref(1)
    const pageSize = ref(5)

    const propList = ref(props.contentTableConfig.propList)
    const systemStore = useSystemStore()
    watchEffect(() => {
      systemStore.getUserListAction({
        offset: (currentPage.value - 1) * pageSize.value,
        size: pageSize.value
      })
    })
    const tableData = computed(() => {
      return systemStore.userList
    })

    /**
     * 按钮操作
     */
    // 编辑
    const handleEdit = (index, row) => {
      console.log(index, row)
    }
    // 删除
    const handleDelete = (index, row) => {
      // eslint-disable-next-line no-undef
      ElMessageBox.confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deletePageData('users/' + row.id)
          systemStore.getUserListAction({
            offset: (currentPage.value - 1) * pageSize.value,
            size: pageSize.value
          })
          // eslint-disable-next-line no-undef
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(() => {
          // eslint-disable-next-line no-undef
          ElMessage({
            type: 'info',
            message: '取消删除'
          })
        })
    }
    // 新建
    const dialogFormVisible = ref(false)
    // 新建用户时动态添加部门和角色列表
    // systemStore.getDepartmentListAction()
    // systemStore.getRoleListAction()

    // 处理 dialogFormConfig
    const newDialogFormConfig = computed(() => {
      const departmentItem = dialogFormConfig.formItems.find(
        item => item.field === 'departmentId'
      )
      departmentItem.options = systemStore.departmentList.map(item => {
        return { title: item.name, value: item.id }
      })
      const roleItem = dialogFormConfig.formItems.find(
        item => item.field === 'roleId'
      )
      roleItem.options = systemStore.roleList.map(item => {
        return { title: item.name, value: item.id }
      })
      return dialogFormConfig
    })

    const formItems = computed(() => {
      return newDialogFormConfig.value.formItems
    })
    const formData = ref({})
    // formItems.value = dialogFormConfig.formItems
    // el-input 等组件绑定的值
    formItems.value.forEach(item => {
      formData.value[item.field] = ''
    })

    const handleNewConfirm = async () => {
      await createPageData('/users', formData.value)
      systemStore.getUserListAction({
        offset: (currentPage.value - 1) * pageSize.value,
        size: pageSize.value
      })
      dialogFormVisible.value = false
    }
    return {
      tableData,
      propList,
      handleEdit,
      handleDelete,
      handleNewConfirm,

      systemStore,
      pageSize,
      currentPage,

      dialogFormVisible,
      formItems,
      formData
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
:deep(.el-dialog) {
  width: 30%;
  .el-row {
    flex-direction: column;
  }
  .el-dialog__body {
    padding-top: 0;
  }
  .el-form-item__content {
    min-width: 180px;
  }
}
</style>

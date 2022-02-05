<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      @select="onSelect"
    >
      <el-table-column width="80" type="selection" />
      <el-table-column prop="date" label="date" sortable width="180" />
      <el-table-column prop="name" label="Name" sortable width="180" />
    </el-table>
  </div>
</template>
<script setup>
const onSelect = (selection, row) => {
  console.log(row)
  if (row.children) {
    console.log('lll')
  }
}
const tableData = [
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu'
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu'
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    children: [
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu'
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu'
      }
    ]
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu'
  }
]
</script>

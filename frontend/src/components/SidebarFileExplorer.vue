<template>
  <div class="sidebar">
    <ul>
      <TreeNode
        v-for="item in treeData"
        :key="item._id"
        :node="item"
        @toggle="handleToggle"
      />
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import TreeNode from './TreeNode.vue'

export default {
  name: 'SidebarFileExplorer',
  components: { TreeNode },
  setup() {
    const treeData = ref([])
    const fetchRoot = async () => {
      const res = await fetch('http://localhost:5000/api/files')
      treeData.value = await res.json()
    }
    const handleToggle = () => {
      // No-op, handled in TreeNode
    }
    onMounted(fetchRoot)
    return { treeData, handleToggle }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: #f8f9fa;
  border-right: 1px solid #ddd;
  height: 100vh;
  overflow-y: auto;
  text-align: left;
  padding: 1rem 0.5rem;
}
</style>

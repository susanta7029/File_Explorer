<template>
  <li>
    <div @click="toggle" :style="{ cursor: node.type === 'folder' ? 'pointer' : 'default', fontWeight: node.type === 'folder' ? 'bold' : 'normal' }">
      <span v-if="node.type === 'folder'">
        <span v-if="expanded" class="folder-icon">📂</span>
        <span v-else class="folder-icon">📁</span>
      </span>
      <span v-else class="file-icon">📄</span>
      {{ node.name }}
    </div>
    <ul v-if="expanded && children.length">
      <TreeNode
        v-for="child in children"
        :key="child._id"
        :node="child"
        @toggle="$emit('toggle', $event)"
      />
    </ul>
    <div v-if="loading" class="loading">Loading...</div>
  </li>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'TreeNode',
  props: { node: Object },
  components: { TreeNode: undefined }, // will be set in setup
  setup(props, { emit }) {
    const expanded = ref(false)
    const loading = ref(false)
    const children = ref([])
    const toggle = async () => {
      if (props.node.type !== 'folder') return
      expanded.value = !expanded.value
      if (expanded.value && children.value.length === 0) {
        loading.value = true
        const res = await fetch(`http://localhost:5000/api/files?parentId=${props.node._id}`)
        children.value = await res.json()
        loading.value = false
      }
      emit('toggle', props.node)
    }
    return { expanded, loading, children, toggle }
  },
  beforeCreate() {
    this.$options.components.TreeNode = require('./TreeNode.vue').default
  }
}
</script>

<style scoped>
 .loading {
  color: #888;
  font-size: 0.9em;
  margin-left: 1.5em;
}
.folder-icon {
  color: #FFD600;
  font-size: 1.2em;
  margin-right: 0.3em;
}
.file-icon {
  color: #888;
  font-size: 1.2em;
  margin-right: 0.3em;
}
li {
  list-style: none;
  margin: 0.2em 0;
}
</style>

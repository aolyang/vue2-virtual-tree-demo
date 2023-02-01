<template>
  <virtual-list data-key="id"
                class="list"
                :data-sources="items"
                :data-component="RowItem"
                :estimate-size="50"
                @tobottom="onToBottom">
    <div v-if="loading" slot="footer">Loading ...</div>
  </virtual-list>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list"
import Item from "./components/Item.vue"

import treeMixin from "./mixin/tree.js"

export default {
  name: "App",
  mixins: [treeMixin],
  components: {
    "virtual-list": VirtualList
  },
  provide() {
    return {
      tree: {
        getSubs: this.getSubs,
        setSelect: this.setSelect
      }
    }
  },
  data: () => ({
    loading: true,
    RowItem: Item
  }),
  watch: {
    items() {
      console.log(this.items)
    }
  },
  methods: {
    onToBottom() {
      console.log("onToBottom")
    },
    onToTop() {
      console.log("onToTOp")
    }
  },
  created() {
    this.loading = true
    setTimeout(() => {
      this.getFather()
      this.loading = false
    }, 1000)
  }
}
</script>

<style scoped>
.list {
  margin: auto;
  width: 600px;
  height: 360px;
  overflow-y: auto;
  border: 1px solid green
}
</style>

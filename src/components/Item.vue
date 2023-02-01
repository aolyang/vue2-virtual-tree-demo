<template>
  <div class="item-inner">
    <div :style="isChild ? 'padding-left: 20px': ''">
      <Button @click="onToggleExpand" style="width: 50px">
        <span v-if="!isChild">
          {{
            source.expanded ? "↓" : "→"
          }}
        </span>
      </Button>
      <Checkbox v-model="source.select"/>
      <span class="name">{{ source.name }}</span>
      <span v-if="loading">loading...</span>
    </div>
  </div>
</template>

<script>
import { Button, Checkbox } from "iview"

export default {
  name: 'infinite-loading-item',
  components: {
    Checkbox,
    Button
  },
  inject: ["tree"],
  props: {
    index: { // index of current item
      type: Number
    },
    source: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data: () => ({
    loading: false
  }),
  computed: {
    isChild() {
      return this.source.level === 1
    }
  },
  watch: {
    ["source.select"]() {
     this.tree.setSelect(this.source.id, this.source.select)
    }
  },
  methods: {
    onToggleExpand() {
      this.source.expanded = !this.source.expanded
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.tree.getSubs(this.source.id, this.index, this.source.expanded)
      }, 1000)
    }
  }
}
</script>

<style>
.head {
  font-weight: 500;
}

.index {
  margin-right: 1em;
}

.name {
  margin-left: 1em;
}

.desc {
  padding-top: .5em;
  text-align: justify;
}

</style>

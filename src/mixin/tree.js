import { father, children } from "../components/data.js";
import Vue from "vue";

const withNodeStatus = (node) => {
  Vue.set(node, "select", false)
  Vue.set(node, "expanded", false)
  return node
}

export default {
  data() {
    return {
      items: [],
      deps: new Map()
    }
  },
  methods: {
    getFather() {
      this.items = father.subGroups.map((d) => this.intoTreeNodeFromFather(d))
    },
    getSubs(id, index, expanded) {
      let subs = this.deps.get(id) || children.members.map((d) => this.intoTreeNodeFromMember(d))
      if (!this.deps.has(id)) this.deps.set(id, subs)

      if (expanded) this.items.splice(index + 1, 0, ...subs)
      else {
        this.items.splice(index + 1, subs.length)
      }
    },
    intoTreeNodeFromFather(data, level = 0) {
      return withNodeStatus({
        level,
        raw: data,
        id: data.groupId,
        name: data.name
      })
    },
    intoTreeNodeFromMember(data, level = 1) {
      return withNodeStatus({
        level,
        raw: data,
        id: data.memberId,
        name: `${data.nickName}(${data.email})`
      })
    },
    setSelect(id, sel) {
      console.log("select", sel, this.deps.get(id))
      this.deps.get(id)?.forEach(node => {
        node.select = sel
      })
    }
  }
}

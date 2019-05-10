<template>
  <el-dialog :title="title" :visible.sync="myVisible" :close-on-click-modal="modalClose" :width="width" :custom-class="customClass ? 'scroll' : ''" @close="close()">
    <slot name="content" class="dialog-content" />
    <div slot="footer" class="dialog-footer">
      <el-button v-if="title=='新增'" type="primary" size="small" @click="create">新增</el-button>
      <el-button v-else type="primary" size="small" @click="edit">编辑</el-button>
      <el-button size="small" @click="close(false)">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    modalClose: {
      type: Boolean,
      default: true
    },
    customClass: {
      type: Boolean,
      default: false
    },
    dialogStatus: {
      type: String,
      default: 'create'
    },
    cancel: {
      type: Boolean,
      default: true
    },
    confirm: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '40%'
    }
  },
  data: function() {
    return {
      // data中新增字段
      myVisible: this.visible
    }
  },
  watch: {
    visible(val) {
      // ②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
      this.myVisible = val
    }
  },
  methods: {
    close() {
      // result 确定为true
      this.$emit('close', this.form)
    },
    create(data) {
      this.$emit('create', data)
    },
    edit(data) {
      this.$emit('edit', data)
    }
  }
}
</script>
<style lang="scss">
.el-dialog__wrapper {
  overflow: hidden;
}
</style>


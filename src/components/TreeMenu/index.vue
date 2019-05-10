<template>
  <div ref="treeWrap" class="tree-container normal_height">
    <div class="title">
      <span v-html="title" />
      <i class="el-icon-refresh cursor-pointer" @click="refresh" />
    </div>
    <div class="content-wrap">
      <div class="content">
        <el-input v-model="filterText" class="filter-text" placeholder="输入关键字进行过滤" size="mini" />
      </div>
    </div>
    <el-scrollbar class="el-scrollbar">
      <div class="content-wrap">
        <div class="content">
          <el-tree
            ref="tree2"
            v-loading="loading"
            class="filter-tree"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            :data="treeList"
            :expand-on-click-node="false"
            element-loading-text="加载中"
            element-loading-spinner="el-icon-loading"
            @node-click="handleCheckChange"
          />
        </div>
      </div>
    </el-scrollbar>
  </div>

</template>
<script>
import { getMainHeight } from '@/api/variables'
export default {
  props: {
    treeList: {
      type: Array,
      default() {
        return [{}]
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    isResize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      filterText: '',
      list: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      scrollbar: {
        fade: true,
        interactive: true
      },
      mouseWheel: true,
      height: 0
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  mounted() {
    this.resize()
  },
  methods: {
    handleCheckChange(data) {
      this.$emit('refreshList', data)
    },
    refresh() {
      this.$emit('refreshTree')
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    setHeight() {
      this.height = getMainHeight()
      this.$refs.treeWrap &&
        (this.$refs.treeWrap.style.height = this.height + 'px')
    },
    resize() {
      this.setHeight()
      if (!this.isResize) return
      window.addEventListener('resize', this.setHeight)
    }
  }
}
</script>
<style>
.tree-container .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
<style lang="scss" scoped>
@import "src/styles/variables.scss";
.el-scrollbar {
  height: 85%;
  overflow-y: auto;
}
.tree-container {
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid $table-border-color;
  position: relative;
  border-radius: $table-border-radius;
  overflow: hidden;
  .content-wrap {
    position: relative;
    padding: 0 10px;
    font-size: 12px;
  }
  .title {
    padding: 0 10px;
    margin-bottom: 10px;
    position: relative;
    font-size: $title-font-size;
    line-height: $table-title-height;
    background-color: $table-title-bg;
  }
  .el-icon-refresh {
    font-size: 18px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
p {
  line-height: 5;
}
.filter-text {
  margin-bottom: 5px;
}
</style>


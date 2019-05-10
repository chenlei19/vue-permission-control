<template>
  <div ref="wrap" class="main-table-template" :class="title?'main-table-hasborder':''">
    <el-row v-if="title" class="title">
      <h5 v-html="title" />
      <div class="table-close-btn">
        <i class="cursor-pointer" :class="caretIcon" @click="toggleCloseTable" />
      </div>
    </el-row>
    <div ref="slide_wrap" class="slide-table-content">
      <div class="btn-row">
        <div class="row">
          <slot name="all-area" />
        </div>
        <el-row :gutter="10">
          <el-col :span="24-rightsize">
            <slot name="left-area" />
          </el-col>
          <el-col :span="rightsize" class="text-right">
            <slot name="right-area" />
          </el-col>
        </el-row>
      </div>
      <div class="main-table">
        <slot name="table" />
      </div>
    </div>
  </div>
</template>
<script>
import { getMainHeight } from '@/api/variables'
export default {
  name: 'MainTbale',
  props: {
    title: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: true
    },
    isResize: {
      type: Boolean,
      default: false
    },
    rightsize: {
      type: Number,
      default: 5
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      caretIcon: '',
      height: getMainHeight()
    }
  },
  mounted() {
    this.resize()
    this.getIcon()
  },
  methods: {
    getIcon() {
      if (this.show) {
        this.caretIcon = 'el-icon-caret-top'
      } else {
        this.caretIcon = 'el-icon-caret-bottom'
        this.$refs.wrap && (this.$refs.wrap.style.height = '40px')
      }
    },
    toggleCloseTable() {
      if (this.caretIcon === 'el-icon-caret-top') {
        this.caretIcon = 'el-icon-caret-bottom'
        this.$refs.wrap && (this.$refs.wrap.style.height = '40px')
      } else {
        this.caretIcon = 'el-icon-caret-top'
        this.$refs.wrap && (this.$refs.wrap.style.height = this.height + 'px')
      }
    },
    resize() {
      this._setHeight()
      if (!this.isResize) return
      window.addEventListener('resize', this._setHeight)
    },
    _setHeight() {
      this.height = getMainHeight()
      if (this.caretIcon === 'el-icon-caret-bottom') return
      this.$refs.wrap && (this.$refs.wrap.style.height = this.height + 'px')
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "src/styles/variables.scss";
  .el-table {
    font-size: 12px;
  }
  .main-table-template {
    font-size: 12px!important;
    border-radius: 3px;
    margin-bottom: 10px;
    overflow: hidden;
    &.main-table-hasborder {
      border: 1px solid $table-border-color;
      .slide-table-content {
        border-top: 1px solid $table-border-color;
      }
    }
    .title, .slide-table-content{
      padding: 0 16px;
    }
    .title {
      background-color: $table-title-bg;
      position: relative;
      h5 {
        font-size: $title-font-size;
        height: $table-title-height;
        line-height: $table-title-height;
        margin: 0;
      }
      .table-close-btn {
        position: absolute;
        top: 0;
        right: 16px;
        line-height: $table-title-height;
      }
    }
    .slide-table-content {
      .btn-row {
        overflow: hidden;
        padding: 12px 0 0;
        border-bottom: 1px solid $table-border-color;
        .row {
          &>div:not(:nth-of-type(1)) {
            margin-top: 10px;
          }
        }
      }
      .el-row {
        padding-bottom:12px;
      }
    }
  }
</style>


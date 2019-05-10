<template>
  <div>
    <main-table :title="'应用列表'">
      <template v-slot:all-area>
        <el-form ref="formInline" :inline="true" :model="formInline" class="form-inline" size="mini" label-width="80px">
          <el-form-item label="选择时间" prop="time">
            <el-date-picker
              v-model="formInline.time"
              type="daterange"
              style="width:250px"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item label="工程名称" prop="name">
            <el-input v-model="formInline.name" placeholder="工程名称" />
          </el-form-item>
          <el-form-item label="采集单位" prop="unit">
            <el-input v-model="formInline.unit" placeholder="采集单位" />
          </el-form-item>
          <el-form-item label="公司" prop="city">
            <el-select
              v-model="formInline.city"
              disabled
              placeholder="请选择"
              style="width:140px;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-model="formInline.company"
              placeholder="请选择"
              style="width:140px;"
              :title="formInline.company"
              @change="changeCompany"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:left-area>
        <label class="type">类型选择</label>
        <el-cascader
          v-model="selectedOptions"
          size="mini"
          :options="optionsWithDisabled"
          :clearable="true"
          :props="props"
          @change="handleChange"
        />
        <div class="links">
          <el-link type="primary">全部</el-link>
          <el-link type="primary">图片</el-link>
          <el-link type="primary">视频</el-link>
          <el-link type="primary">音频</el-link>
        </div>
      </template>
      <template v-slot:right-area>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="formSearch()">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetForm('formInline')">重置</el-button>
      </template>
    </main-table>
  </div>
  <!-- <div class="swiperBox">
    <label>类型选择</label>
    <el-cascader
      v-model="selectedOptions"
      size="small"
      :options="optionsWithDisabled"
      :clearable="true"
      :props="props"
      @change="handleChange"
    />
    <el-link type="primary">全部</el-link>
    <el-link type="primary">图片</el-link>
    <el-link type="primary">视频</el-link>
    <el-link type="primary">音频</el-link>
    <el-row :gutter="10">
      <viewer :images="images">
        <el-col
          v-for="(src,index) in images"
          :key="index"
          :span="4"
        >
          <img
            :src="src"
            style="width:100%;height:150px;"
            class="cover"
          >
        </el-col>
      </viewer>
    </el-row>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      selectedOptions: [],
      options: [{
        value: '选项1',
        label: '重庆市供电公司'
      }, {
        value: '选项2',
        label: '长沙市供电公司'
      }],
      options2: [{
        value: '选项1',
        label: '国网重庆市电力公司潼南区供电分公司'
      }, {
        value: '选项2',
        label: '武隆区供电分公司'
      }],
      optionsWithDisabled: [{
        value: '1',
        label: '全部'
      }, {
        value: '2',
        label: '安全',
        children: [{
          value: '20',
          label: '工作票'
        }, {
          value: '21',
          label: '班前会'
        }, {
          value: '22',
          label: '安全交底'
        }, {
          value: '23',
          label: '安全措施'
        }, {
          value: '24',
          label: '安全违章'
        }]
      }, {
        value: '3',
        label: '质量',
        children: [{
          value: '30',
          label: '工艺质量缺陷'
        }, {
          value: '31',
          label: '物资缺陷'
        }]
      }, {
        value: '4',
        label: '过程',
        children: [{
          value: '40',
          label: '隐蔽工程'
        }, {
          value: '41',
          label: '架空线路'
        }, {
          value: '42',
          label: '设备安装'
        }, {
          value: '43',
          label: '电缆工程'
        }, {
          value: '44',
          label: '工艺亮点'
        }, {
          value: '45',
          label: '土建工程'
        }, {
          value: '46',
          label: '施工全貌'
        }]
      }, {
        value: '5',
        label: '其他',
        children: [{
          value: '50',
          label: '开工报告'
        }, {
          value: '51',
          label: '竣工全貌'
        }]
      }],
      props: {
        value: 'label',
        children: 'children'
      },
      formInline: {
        time: '',
        name: '',
        unit: '',
        city: '重庆市供电公司',
        company: ''
      }, // 查询项
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }, // 时间选择器控制范围
      images: [
        'http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg',
        'https://img.52z.com/upload/news/image/20180621/20180621055754_89028.jpg',
        'http://attachments.gfan.com/forum/201608/04/2344239wi5iihbw7whxv4g.jpg',
        'http://picm.bbzhi.com/fengjingbizhi/yidalifengguangfengjinggaoqingkuan/show_fengjingou_268536_m.jpg',
        'http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg',
        'https://img.52z.com/upload/news/image/20180621/20180621055754_89028.jpg',
        'http://attachments.gfan.com/forum/201608/04/2344239wi5iihbw7whxv4g.jpg',
        'http://picm.bbzhi.com/fengjingbizhi/yidalifengguangfengjinggaoqingkuan/show_fengjingou_268536_m.jpg'
      ]
    }
  },
  created() {
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    changeCompany(value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>
.swiperBox {
  padding:20px;
}
.type {
  font-size: 14px;
  padding: 0 8px 0 0;
  font-weight: 700;
  color: #606266;
  width: 76px;
  display: inline-block;
  box-sizing: border-box;
  text-align: right;
  line-height: 28px;
}
.links {
  display: inline-block;
  vertical-align: 2px;
}
.links .el-link {
  margin-left: 5px;
}
.swiperBox .cover {
  object-fit: cover;
  cursor: pointer;
}
.swiperBox .el-col {
  margin-bottom: 5px;
}
</style>

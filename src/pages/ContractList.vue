<template>
  <div class="ContractList">
    <el-row style="margin: 20px 0 10px 0;">
      <el-col :span="6" :offset="8">
        <el-input v-model="projectCode" size="mini" clearable placeholder="请输入要查询的项目编号"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="mini" icon="el-icon-search" @click="getData">搜 索</el-button>
      </el-col>
    </el-row>
    <el-row style="margin: 20px 0;text-align: right;padding-right: 10px;">
      <el-button type="danger" size="mini" icon="el-icon-plus" @click="addContract">新 增</el-button>
    </el-row>
    <el-table
      id="FilterBlock"
      :data="tableData"
      :height="tableHieght - 180"
      @row-dblclick="toDetail"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="合同号"
        label="合同号"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="合同名称"
        label="合同名称"
        width="180"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="合同名称"
        label="合同名称"
        width="180"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="合同日期"
        label="合同日期"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="项目编号"
        label="项目编号"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="产品代码"
        label="产品代码"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="产品名称"
        label="产品名称"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="含税单价"
        label="含税单价"
        width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="数量"
        label="数量"
        width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="价税合计"
        label="价税合计"
        width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="单位"
        label="单位"
        width="80"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="规格型号"
        label="规格型号"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="备注"
        label="备注"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="业务员"
        label="业务员"
        width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="施工队"
        label="施工队"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="部门"
        label="部门"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination v-if="tableData.length > 0" style="margin: 10px 0;"
      @current-change="getData"
      :current-page.sync="curPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="sum">
    </el-pagination>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import $ from 'jquery'
export default {
  name: 'ContractList',
  data () {
    return {
      tableHieght: 0,
      projectCode: '',
      tableData: [],
      curPage: 1,
      pageSize: 20,
      sum: 0
    }
  },
  computed: {
    // ...mapState({
    // })
  },
  created () {
    setTimeout(() => {
      let height = document.documentElement.clientHeight
      document.getElementById('FilterBlock').style.height = height + 'px'
      this.tableHieght = height
    }, 0)
    this.getData()
  },
  methods: {
    ...mapActions([
      'updateContractId'
    ]),
    addContract () {
      this.$router.push({name: 'ContractAdd'})
    },
    toDetail (row) {
      this.updateContractId(row.FInterID)
      this.$router.push({name: 'ContractDetail'})
    },
    getData () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL><![CDATA[exec [Z_PAYList]  '" + this.projectCode + "'," + Number((this.curPage - 1) * this.pageSize + 1) + ',' + this.curPage * this.pageSize + ']]></FSQL>'
      tmpData += '</JA_LIST>'
      tmpData += '</soap:Body>'
      tmpData += '</soap:Envelope>'

      this.Http.post('JA_LIST', tmpData
      ).then(res => {
        let xml = res.data
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(xml, 'text/xml')
        // 提取数据
        let Result = xmlDoc.getElementsByTagName('JA_LISTResponse')[0].getElementsByTagName('JA_LISTResult')[0]
        let HtmlStr = $(Result).html()
        let Info = JSON.parse(HtmlStr)
        console.log(Info)
        this.tableData = Info
        this.sum = Info[0].fcount
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang='less' scoped>
</style>

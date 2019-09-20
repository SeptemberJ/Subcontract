<template>
  <div class="Contract">
    <h2 class="MarginT_20 MarginB_20">合同（应付）</h2>
    <el-row class="MarginT_20">
      <el-form ref="formContract" :rules="rules" label-position="left" :model="formContract" label-width="80px" size="small" style="padding: 10px;">
        <el-col :span="6">
          <el-form-item label="合同日期" prop="contractDate">
            <el-date-picker prop="contractDate" style="width: 90%;float:left"
              v-model="formContract.contractDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同名称" prop="contractName">
            <el-input v-model="formContract.contractName" clearable style="width: 90%;float:left"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="合同号" prop="contractNo">
            <el-input v-model="formContract.contractNo" clearable style="width: 90%;float:left"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="施工队" prop="constructionTeam">
            <el-select v-model="formContract.constructionTeam" filterable remote :remote-method="changeTeam" placeholder="请输入关键字" style="width: 90%;float:left">
              <el-option
                v-for="item in constructionTeamList"
                :key="item.fitemid"
                :label="item.fname"
                :value="item.fitemid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="付款条件" prop="payTerm">
            <el-select v-model="formContract.payTerm" placeholder="请选择" style="width: 90%;float:left">
              <el-option
                v-for="item in payTermList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="部门" prop="department">
            <el-select v-model="formContract.department" filterable remote :remote-method="changeDepartment" placeholder="请输入关键字" style="width: 100%;float:left">
              <el-option
                v-for="item in departmentList"
                :key="item.fitemid"
                :label="item.fname"
                :value="item.fitemid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务员" prop="salesman">
            <el-select v-model="formContract.salesman" filterable remote :remote-method="changeSalesman" placeholder="请输入关键字" style="width: 90%;float:left">
              <el-option
                v-for="item in salesmanList"
                :key="item.fitemid"
                :label="item.fname"
                :value="item.fitemid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目编号" prop="productionCode">
            <el-select v-model="formContract.projectCode" filterable remote :remote-method="changeProject" placeholder="请输入关键字" style="width: 100%;float:left">
              <el-option
                v-for="item in projectList"
                :key="item.fitemid"
                :label="item.fname"
                :value="item.fitemid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <!-- list -->
    <el-table
      ref="singleTable"
      :data="formAdd.list"
      style="width: 100%">
      <el-table-column
        label="行号"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="产品代码"
        width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.fnumber" filterable remote :filter-method="(value) => filterMethodPCode(value, scope.$index)" @change="(value) => changePCode(value, scope.$index)" size="mini" placeholder="请输入关键字" style="width: 95%;margin: 0 auto;">
            <el-option
              v-for="item in scope.row.productionCodeList"
              :key="item.fitemid"
              :label="item.fnumber"
              :value="item.fitemid">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        property="fname"
        label="产品名称"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="fmodel"
        label="规格型号"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="数量"
        width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.pamount" size="mini" clearable></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="含税单价"
        width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.pprice" size="mini" clearable></el-input>
        </template>
      </el-table-column>
      <el-table-column
        property="psum"
        label="价税合计"
        width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.psum" size="mini" clearable></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.pnote" size="mini" clearable></el-input>
        </template>
      </el-table-column>
      <el-table-column
        property="funit"
        label="计量单位"
        width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="删除"
          width="80">
          <template slot-scope="scope">
            <span class="CursorPointer" @click="remove(scope.$index)"><i class="el-icon-delete"></i></span>
          </template>
      </el-table-column>
    </el-table>
    <section class="MarginT_20">
      <el-button icon="el-icon-plus" size="mini" @click="addLine">新增一行</el-button>
    </section>
    <section class="MarginT_20 MarginB_20">
      <el-button type="info" size="mini" @click="back">返 回</el-button>
      <el-button type="danger" size="mini" @click="save">保 存</el-button>
    </section>
    <!-- 导入Excel -->
    <!-- <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="changeFile"
      :multiple="false"
      :auto-upload="false"
      :show-file-list="false">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload> -->
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
import $ from 'jquery'
import {formatToString} from '../util/utils'
import XLSX from 'xlsx'
export default {
  name: 'Contract',
  data () {
    return {
      formContract: {
        contractDate: '',
        contractName: '',
        constructionTeam: '',
        department: '',
        // payTerm: '',
        salesman: '',
        // contractNo: '',
        projectCode: ''
      },
      rules: {
        contractDate: [
          { required: true, message: '请选择合同日期', trigger: 'change' }
        ]
      },
      curFItemID: null, // 当前选择的产品代码项
      formAdd: {
        list: [
          {fnumber: '', fname: '', fmodel: '', pamount: '', pprice: '', psum: '', pnote: '', funit: '', productionCodeList: []}
        ]
      },
      constructionTeamList: [],
      departmentList: [],
      salesmanList: [],
      projectList: []
      // productionCodeList: [],
    }
  },
  computed: {
    // ...mapState({
    // })
  },
  created () {
    this.formContract.contractDate = formatToString(new Date(), 'Simple', '-')
  },
  methods: {
    back () {
      this.$router.push({name: 'ContractList'})
    },
    addLine () {
      this.formAdd.list.push({fnumber: '', fname: '', fmodel: '', pamount: '', pprice: '', psum: '', pnote: '', funit: '', productionCodeList: []})
    },
    remove (idx) {
      this.formAdd.list.splice(idx, 1)
    },
    changeFile (file, fileList) {
      let files = {0: file.raw}
      this.readExcel1(files)
    },
    // 获取下拉
    changeTeam (val) {
      if (val !== '') {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL>select top 50 fitemid,fname from t_supplier where fname like '%" + val + "%' order by fnumber</FSQL>"
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
          this.constructionTeamList = JSON.parse(HtmlStr)
        }).catch((error) => {
          this.$message({
            message: '接口报错!',
            type: 'error'
          })
          console.log(error)
        })
      } else {
        this.constructionTeamList = []
      }
    },
    changeDepartment (val) {
      if (val !== '') {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL>select top 50 fitemid,fname from t_department where fname like '%" + val + "%' order by fnumber</FSQL>"
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
          this.departmentList = JSON.parse(HtmlStr)
        }).catch((error) => {
          this.$message({
            message: '接口报错!',
            type: 'error'
          })
          console.log(error)
        })
      } else {
        this.departmentList = []
      }
    },
    changeSalesman (val) {
      if (val !== '') {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL>select top 50 fitemid,fname from t_emp where fname like '%" + val + "%' order by fnumber</FSQL>"
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
          this.salesmanList = JSON.parse(HtmlStr)
        }).catch((error) => {
          this.$message({
            message: '接口报错!',
            type: 'error'
          })
          console.log(error)
        })
      } else {
        this.salesmanList = []
      }
    },
    changeProject (val) {
      if (val !== '') {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL>select top 50 fitemid,fname from t_Item where fitemclassid=3001 and fname like '%" + val + "%' order by fnumber</FSQL>"
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
          this.projectList = JSON.parse(HtmlStr)
        }).catch((error) => {
          this.$message({
            message: '接口报错!',
            type: 'error'
          })
          console.log(error)
        })
      } else {
        this.projectList = []
      }
    },
    filterMethodPCode (val, idx) {
      if (val !== '') {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL>select top 50 a.fitemid,a.fnumber,a.fname,a.fmodel,b.fname funit from t_icitem a inner join t_MeasureUnit b on a.funitid=b.fitemid  where a.fnumber like '%" + val + "%' order by a.fnumber</FSQL>"
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
          this.formAdd.list[idx].productionCodeList = JSON.parse(HtmlStr)
        }).catch((error) => {
          this.$message({
            message: '接口报错!',
            type: 'error'
          })
          console.log(error)
        })
      } else {
        this.formAdd.list[idx].productionCodeList = []
      }
    },
    // 返回选中选项
    checkPCode (item) {
      return item.fitemid === this.curFItemID
    },
    changePCode (val, idx) {
      this.curFItemID = val
      let options = this.formAdd.list[idx].productionCodeList
      let resultItem = (options.filter(this.checkPCode))[0]
      this.formAdd.list[idx].fname = resultItem.fname
      this.formAdd.list[idx].fmodel = resultItem.fmodel
      this.formAdd.list[idx].funit = resultItem.funit
    },
    save () {
      // 为空校验
      let botData = {'items': []}
      let listData = this.formAdd.list
      if (listData.length === 0) {
        this.$message({
          message: '请至少添加一行记录!',
          type: 'warning'
        })
        return false
      }
      for (let i = 0; i < listData.length; i++) {
        if (!listData[i].fnumber || !listData[i].pamount || !listData[i].pprice || !listData[i].psum) {
          this.$message({
            message: '请将信息填写完整!',
            type: 'warning'
          })
          return false
        } else {
          botData.items.push({
            'FItemID': listData[i].fnumber,
            'FQty': listData[i].pamount,
            'FPrice': listData[i].pprice,
            'FAmount': listData[i].psum,
            'FNote': listData[i].pnote
          })
        }
      }
      let topData = {
        'items': [{
          'FDate': this.formContract.contractDate,
          'FExplanation': this.formContract.contractName ? this.formContract.contractName : 0,
          'FSupplyID': this.formContract.constructionTeam ? this.formContract.constructionTeam : 0,
          'FDeptID': this.formContract.department ? this.formContract.department : 0,
          'FEmpID': this.formContract.salesman ? this.formContract.salesman : 0,
          'FProjectID': this.formContract.projectCode ? this.formContract.projectCode : 0
        }]
      }
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<PayContract xmlns="http://tempuri.org/">'
      tmpData += '<FJSONBtou>' + JSON.stringify(topData) + '</FJSONBtou>'
      tmpData += '<FJSONBti>' + JSON.stringify(botData) + '</FJSONBti>'
      tmpData += '<ID>0</ID>'
      tmpData += '</PayContract>'
      tmpData += '</soap:Body>'
      tmpData += '</soap:Envelope>'
      this.Http.post('PayContract', tmpData
      ).then(res => {
        let xml = res.data
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(xml, 'text/xml')
        // 提取数据
        let Result = xmlDoc.getElementsByTagName('PayContractResponse')[0].getElementsByTagName('PayContractResult')[0]
        let HtmlStr = $(Result).html()
        let Info = (JSON.parse(HtmlStr))[0]
        if (Info.code === '1') {
          this.$message({
            message: '新增成功!',
            type: 'success'
          })
          // 初始化界面
          this.formContract = {
            contractDate: '',
            contractName: '',
            constructionTeam: '',
            department: '',
            salesman: '',
            projectCode: ''
          }
          this.formAdd = {
            list: [
              {fnumber: '', fname: '', fmodel: '', pamount: '', pprice: '', psum: '', pnote: '', funit: '', productionCodeList: []}
            ]
          }
        } else {
          this.$message({
            message: '新增失败!',
            type: 'error'
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    readExcel1 (files) { // 表格导入
      // var that = this
      console.log(files)
      if (files.length <= 0) { // 如果没有文件名
        return false
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$Message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          const wsname = workbook.SheetNames[0] // 取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成json表格内容
          console.log(ws)
          // that.peopleArr = [] // 清空接收数据
          // if(that.peopleArr.length == 1 && that.peopleArr[0].roleName == '' && that.peopleArr[0].enLine == ''){
          //   that.peopleArr = []
          // }
          // 重写数据
          try {
          } catch (err) {
            console.log(err)
          }
          this.$refs.upload.value = ''
        } catch (e) {
          return false
        }
      }
      fileReader.readAsBinaryString(files[0])
    }
  }
}
</script>

<style lang='less' scoped>
  .listColumnTit{
    background:lightsteelblue;
    border-bottom: 1px solid #eee;
    .el-col{
      &:not(:last-child){
        border-right: 1px solid #eee;
      }
       span{
        height: 42px;
        line-height: 42px;
        display: block;
      }
    }
  }
  .listTable{
    border-bottom: 1px solid #eee;
    .el-col{
      height: 42px;
      line-height: 42px;
      &:not(:last-child){
        border-right: 1px solid #eee;
      }
      span{
        font-size: 14px;
      }
    }
  }
</style>

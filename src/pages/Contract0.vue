<template>
  <div class="Contract">
    <h2 class="MarginT_20 MarginB_20">合同（应付）</h2>
    <el-row class="MarginT_20">
      <el-form ref="formContract" :model="formContract" label-width="90px" size="small" style="padding-right: 20px;">
        <el-col :span="6">
          <el-form-item label="合同日期">
            <el-date-picker prop="contractDate"
              v-model="formContract.contractDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同名称" prop="contractName">
            <el-input v-model="formContract.contractName" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同号" prop="contractNo">
            <el-input v-model="formContract.contractNo" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="施工队" prop="constructionTeam">
            <el-select v-model="formContract.constructionTeam" filterable remote :remote-method="changeTeam" placeholder="请输入关键字" style="width: 100%;">
              <el-option
                v-for="item in constructionTeamList"
                :key="item.fitemid"
                :label="item.fname"
                :value="item.fitemid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="付款条件" prop="payTerm">
            <el-select v-model="formContract.payTerm" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in payTermList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="部门" prop="department">
            <el-select v-model="formContract.department" filterable remote :remote-method="changeDepartment" placeholder="请输入关键字" style="width: 100%;">
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
            <el-select v-model="formContract.salesman" filterable remote :remote-method="changeSalesman" placeholder="请输入关键字" style="width: 100%;">
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
            <el-select v-model="formContract.projectCode" filterable remote :remote-method="changeProject" placeholder="请输入关键字" style="width: 100%;">
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
    <el-row class="listColumnTit">
      <el-col :span="1"><span>行号</span></el-col>
      <el-col :span="3"><span>产品代码</span></el-col>
      <el-col :span="3"><span>产品名称</span></el-col>
      <el-col :span="3"><span>规格型号</span></el-col>
      <el-col :span="2"><span>数量</span></el-col>
      <el-col :span="3"><span>含税单价</span></el-col>
      <el-col :span="3"><span>价税合计</span></el-col>
      <el-col :span="3"><span>备注</span></el-col>
      <el-col :span="3"><span>计量单位</span></el-col>
    </el-row>
    <!-- list -->
    <el-row class="listTable" v-for="(Record, idx) in formAdd.list" :key="idx">
      <el-col :span="1" style="background:lightsteelblue;"><span>{{idx + 1}}</span></el-col>
      <el-col :span="3">
        <el-select v-model="Record.fnumber"  filterable remote :filter-method="(value) => filterMethodPCode(value, idx)" @change="(value) => changePCode(value, idx)" size="mini" placeholder="请选择" style="width: 95%;margin: 0 auto;">
          <el-option
            v-for="item in Record.productionCodeList"
            :key="item.fitemid"
            :label="item.fnumber"
            :value="item.fnumber">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3"><span>{{Record.fname}}</span></el-col>
      <el-col :span="3"><span>{{Record.fmodel}}</span></el-col>
      <el-col :span="2"><el-input v-model="Record.pamount" size="mini" clearable style="width: 95%;margin: 0 auto;"></el-input></el-col>
      <el-col :span="3"><el-input v-model="Record.pprice" size="mini" clearable style="width: 95%;margin: 0 auto;"></el-input></el-col>
      <el-col :span="3"><el-input v-model="Record.psum" size="mini" clearable style="width: 95%;margin: 0 auto;"></el-input></el-col>
      <el-col :span="3"><el-input v-model="Record.pnote" size="mini" clearable style="width: 95%;margin: 0 auto;"></el-input></el-col>
      <el-col :span="3"><span>{{Record.funit}}</span></el-col>
    </el-row>
    <section class="MarginT_20">
      <el-button icon="el-icon-plus" @click="addLine">新增一行</el-button>
      <el-button icon="el-icon-plus" @click="save">保存</el-button>
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
import XLSX from 'xlsx'
export default {
  name: 'Contract',
  data () {
    return {
      formContract: {
        constructionTeam: '',
        department: '',
        payTerm: '',
        salesman: '',
        contractDate: '',
        contractName: '',
        contractNo: '',
        productionCode: '',
        curFnumber: null // 当前选择的产品代码项
      },
      formAdd: {
        list: [
          {fnumber: '', fname: '', fmodel: '', pamount: '', pprice: '', psum: '', pnote: '', funit: '', productionCodeList: []}
        ]
      },
      constructionTeamList: [],
      departmentList: [],
      salesmanList: [],
      projectList: [],
      // productionCodeList: [],
      payTermList: [
        {
          value: '付款条件1',
          label: '付款条件1'
        }
      ]
    }
  },
  computed: {
    // ...mapState({
    // })
  },
  created () {
  },
  methods: {
    addLine () {
      this.formAdd.list.push({fnumber: '', fname: '', fmodel: '', pamount: '', pprice: '', psum: '', pnote: '', funit: '', productionCodeList: []})
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
        tmpData += "<FSQL>select fitemid,fname from t_supplier where fname like '%" + val + "%' order by fnumber</FSQL>"
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
        tmpData += "<FSQL>select fitemid,fname from t_department where fname like '%" + val + "%' order by fnumber</FSQL>"
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
        tmpData += "<FSQL>select fitemid,fname from t_emp where fname like '%" + val + "%' order by fnumber</FSQL>"
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
        tmpData += "<FSQL>select fitemid,fname from t_Item where fitemclassid=3001 and fname like '%" + val + "%' order by fnumber</FSQL>"
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
        tmpData += "<FSQL>select a.fitemid,a.fnumber,a.fname,a.fmodel,b.fname funit from t_icitem a inner join t_MeasureUnit b on a.funitid=b.fitemid  where a.fnumber like '%" + val + "%' order by a.fnumber</FSQL>"
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
      return item.fnumber === this.curFnumber
    },
    changePCode (val, idx) {
      this.curFnumber = val
      let options = this.formAdd.list[idx].productionCodeList
      let resultItem = (options.filter(this.checkPCode))[0]
      this.formAdd.list[idx].fname = resultItem.fname
      this.formAdd.list[idx].fmodel = resultItem.fmodel
      this.formAdd.list[idx].funit = resultItem.funit
    },
    save () {
      console.log(this.formAdd.list)
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

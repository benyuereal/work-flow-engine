<template>
  <div id="app">
    <!--<div class="layout">-->
    <!--<Layout>-->
    <!--<Header>Header</Header>-->
    <!--<Content>Content</Content>-->
    <!--<Footer>Footer</Footer>-->
    <!--</Layout>-->
    <!--</div>-->
    <Row style="height: 20px">
      <Col span="24">&nbsp;</Col>

    </Row>

    <Row style="">
      <Col span="2">&nbsp;</Col>

      <Col span="20">&nbsp;

        <Row style="">
          <Col span="4" id="select-column" style="width:200px">
            <p> 模板类型：</p><Select v-model="searchData.type" style="width:100px">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="4" id="select-column-name" style="width:200px">
            <p> 状态：</p><Select v-model="searchData.state" style="width:100px">
            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="6" id="select-column-signature-type" style="width:280px">
            <p style="float: left;text-align: center;font-size: 14px;margin-top: 6px">
              模板ID：
            </p>
            <Input v-model="searchData.nodeId" placeholder="请输入模板ID" clearable
                                  style="width: 180px;height: 30px"/>
          </Col>
          <Col span="6" id="select-column-state" style="width:280px">
            <p> 模板名称：</p><Input v-model="searchData.nodeName" placeholder="请输入模板名称" clearable
                                  style="width: 180px;height: 30px"/>
          </Col>
          <Col span="2">
            <Button type="primary" icon="ios-search" id="search" style="float: left">查询</Button>
          </Col>
          <!--<Col span="4" id="select-column-search">-->
          <!--<Button type="primary" icon="ios-search" id="search">Search</Button>-->
          <!--</Col>-->
        </Row>
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="1">&nbsp;</Col>
      <Col span="6">
        <Button type="primary" style="width: 90px" @click="showBind">新增</Button>
        <Button type="primary" style="width: 90px">批量新增</Button>
      </Col>
      <Col span="">&nbsp;</Col>
    </Row>
    <br>
    <Row>
      <Col span="2">&nbsp;</Col>
      <Col span="20">
        <Table border :columns="columns2" :data="data1"></Table>
      </Col>
      <Col span="2">&nbsp;</Col>

    </Row>
    <br>
    <Row style="margin-top: 90px">
      <Col span="24">&nbsp;</Col>

    </Row>
    <br>
    <Row style="margin-top: 10px">
      <Col span="24">
        <Page :page-size="nodeData.pageSize" :current="nodeData.currentPage" :total="nodeData.totalElements"
              @on-change="transferPage" show-total></Page>
        <!--<Page :current="2" :total="50"  show-elevator show-sizer></Page>-->
      </Col>
    </Row>
    <!--<Row style="height: 30px">-->
    <!--<Col span="2">&nbsp;</Col>-->
    <!--&lt;!&ndash;<Col span="24" style="height: 50px">&nbsp;</Col>&ndash;&gt;-->
    <!--<Col span="10"><p>流程配置管理</p></Col>-->
    <!--<Col span="7">&nbsp;</Col>-->

    <!--</Row>-->
    <br>
    <!--查看弹框-->
    <Modal
      title="查看节点"
      v-model="modalCheck"
      :styles="{top: '70px'}">
      <Form :model="formItem" :label-width="80" label-position="left">
        <FormItem label="模板ID">
          <Input v-model="formItem.nodeId" disabled placeholder="请输入ID" clearable/>
        </FormItem>
        <FormItem label="模板名称">
          <Input v-model="formItem.nodeName" disabled placeholder="请输入模板名称" clearable/>
        </FormItem>
        <FormItem label="模板描述">
          <Input v-model="formItem.nodeDesc" disabled placeholder="请输入模板描述" clearable/>
        </FormItem>
        <FormItem label="模板类型">
          <Select v-model="formItem.type" disabled>
            <Option v-for="item in typeList" :value="formItem.type" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="模板实现类">
          <Input v-model="formItem.nodeClass" disabled placeholder="请输入模板实现类" clearable/>
        </FormItem>
        <FormItem label="模板实现方法">
          <Input v-model="formItem.nodeMethod" disabled placeholder="请输入模板实现方法" clearable/>
        </FormItem>
        <FormItem label="模板TCP/URL">
          <Input v-model="formItem.nodeTcpUrl" disabled placeholder="请输入模板TCP/URL" clearable/>
        </FormItem>
      </Form>
    </Modal>
    <!-- 保存和修改弹框 -->
    <Modal
      :title="title"
      v-model="modalSave" @on-ok="saveNode('formItem')" :loading="saveLoading"
      :styles="{top: '70px'}">
      <Form :model="formItem" ref="formItem" :label-width="80" :rules="dataRule" label-position="left">
        <FormItem label="模板ID" prop="nodeId">
          <Input v-model="formItem.nodeId" placeholder="请输入模板ID" number clearable/>
        </FormItem>
        <FormItem label="模板名称" prop="nodeName">
          <Input v-model="formItem.nodeName" placeholder="请输入模板名称" clearable/>
        </FormItem>
        <FormItem label="模板描述" prop="nodeDesc">
          <Input v-model="formItem.nodeDesc" placeholder="请输入模板描述" clearable/>
        </FormItem>
        <FormItem label="模板类型" prop="type">
          <Select v-model="formItem.type" placeholder="请选择模板类型" clearable>
            <Option value="1">节点</Option>
            <Option value="2">规则</Option>
          </Select>
          <!-- <Select v-model="formItem.type">
          </Select> -->
        </FormItem>
        <FormItem label="模板实现类" prop="nodeClass">
          <Input v-model="formItem.nodeClass" placeholder="请输入模板实现类" clearable/>
        </FormItem>
        <FormItem label="模板实现方法" prop="nodeMethod">
          <Input v-model="formItem.nodeMethod" placeholder="请输入模板实现方法" clearable/>
        </FormItem>
        <FormItem label="模板TCP/URL" prop="nodeTcpUrl">
          <Input v-model="formItem.nodeTcpUrl" placeholder="请输入模板TCP/URL" clearable/>
        </FormItem>
      </Form>
    </Modal>
    <!-- 删除弹框 -->
    <Modal
        v-model="modalDelete"
        title="删除节点"
        :loading="loading"
        @on-ok="removeNode">
        <p>确定删除此节点吗？</p>
    </Modal>
  </div>
</template>


<script>

import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css'
import { fetchNodeList } from '@/js/node.js'
import thisisjsonp from 'jsonp'

export default {
  data () {
    return {
      loading: true,
      nodeData: {},
      searchData: {
        type: '',
        state: '',
        nodeId: '', // 模板id
        nodeName: '', // 搜索组织名称
        currentPage: 1,
        pageSize:10
      },
      title: '新增节点',
      removeId: 0,
      modalSave: false, // 保存修改弹框
      saveLoading: true,
      modalCheck: false, // 查看弹框
      modalDelete: false, // 删除弹框
      dataRule: {
        nodeId: [{ required: true, type: 'number', message: '请输入节点Id且为数字', trigger: 'blur' }],
        nodeName: [{ required: true, message: '请输入节点名称', trigger: 'blur' }],
        nodeDesc: [{ required: true, message: '请输入节点描述', trigger: 'blur' }],
        type: [{ required: true, message: '请选择模板类型', trigger: 'change' }],
        nodeClass: [{ required: true, message: '请输入节点类', trigger: 'blur' }],
        nodeMethod: [{ required: true, message: '请输入节点方法', trigger: 'blur' }],
        nodeTcpUrl: [{ required: true, message: '请输入模板TCP/URL', trigger: 'blur' }]
      },
      typeList: [
        {
          value: 1,
          label: '节点'
        },
        {
          value: 2,
          label: '规则'
        }
      ],
      statusList: [
        {
          value: 1,
          label: '全部'
        },
        {
          value: 2,
          label: '有效'
        },
        {
          value: 3,
          label: '无效'
        }
      ],
      data1: [
      ],
      columns2: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '模板ID',
          key: 'nodeId',
          width: 100,
          align: 'center'
        },
        {
          title: '模板名称',
          key: 'nodeName',
          width: 100,
          align: 'center'
        },
        {
          title: '模板实现类',
          key: 'nodeClass',
          width: 100,
          align: 'center'
        },
        {
          title: '模板实现方法',
          key: 'nodeMethod',
          width: 120,
          align: 'center'
        },
        {
          title: '模板TCP/URL',
          key: 'nodeTcpUrl',
          width: 120,
          align: 'center'
        },
        {
          title: '状态',
          key: 'stateStr',
          width: 80,
          align: 'center'
        },
        {
          title: '创建人',
          key: 'creatorId',
          width: 100,
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createTimeStr',
          width: 100,
          align: 'center'
        },
        {
          title: '更新人',
          key: 'modifierId',
          width: 100,
          align: 'center'
        },
        {
          title: '更新时间',
          key: 'modifyTimeStr',
          width: 100,
          align: 'center'
        },
        {
          title: '操作',
          align: 'center',
          fixed: 'right',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.show(params.row)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showEdit(params.row)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      // 下面是form表单
      formItem: {
        nodeId: '',
        nodeName: '',
        nodeClass: '',
        nodeMethod: '',
        nodeDesc: '',
        nodeTcpUrl: '',
        type: 0
      }
    }
  },
  methods: {
    changeLoading() {
      this.saveLoading = false;
      this.$nextTick(() => {
        this.saveLoading = true;
      });
    },
    // 弹出绑定界面
    showBind () { // 添加弹框
      this.$refs.formItem.resetFields();
      this.modalSave = true;
    },
    showEdit (row) { // 现实修改节点弹框
      this.$refs.formItem.resetFields();
      this.$jsonp('http://localhost:8080/nodeManager/getNodeDetail',{
        callback: 'callback', 
        id: row.id
      }).then((response) => {
      　　// 返回数据 json， 返回的数据就是json格式
        this.title = '修改节点';
        this.formItem = response;
        console.log(this.formItem)
        // this.data1 = response.elements;
        this.modalSave = true
      }).catch(err => {
        this.$Message.info('查询失败');
      　　console.log(err)
      })
    },
    // 点击显示选框
    show (row) { // 节点详情弹框
      console.log(row.id)
      this.modalCheck = true;
      this.getNode(row);
    },
    getNode (row) { // 获取单一节点信息
      console.log(row)
      this.$jsonp('http://localhost:8080/nodeManager/getNodeDetail',{
        callback: 'callback', 
        id: row.id
      }).then((response) => {
      　　// 返回数据 json， 返回的数据就是json格式
        console.log(response)
        this.formItem = response;
        // this.data1 = response.elements;
        this.$Message.info('查询成功');
      }).catch(err => {
        this.$Message.info('查询失败');
      　　console.log(err)
      })
    },
    remove (row) { // 打开删除弹框
      this.modalDelete = true;
      this.removeId = row.id;
    },
    removeNode () { // 删除节点
      this.$jsonp('http://localhost:8080/nodeManager/deleteNode',{
        callback: 'callback', 
        id: this.removeId
      }).then((response) => {
      　　// 返回数据 json， 返回的数据就是json格式
        console.log(response)
        this.formItem = response;
        // this.data1 = response.elements;
        this.$Message.info('删除成功');
      }).catch(err => {
        this.$Message.info('删除失败');
      　　console.log(err)
      })
    },
    saveNode (name) { // 保存和修改共同使用的方法
      this.saveLoading = false;
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.changeLoading();
          this.$jsonp('http://localhost:8080/nodeManager/nodeSave',{
            callback: 'callback', 
            nodeId: this.formItem.nodeId,
            type: this.formItem.type,
            nodeName: this.formItem.nodeName,
            nodeClass: this.formItem.nodeClass,
            nodeMethod: this.formItem.nodeMethod,
            nodeTcpUrl: this.formItem.nodeTcpUrl,
            nodeDesc: this.formItem.nodeDesc
          }).then((response) => {
          　　// 返回数据 json， 返回的数据就是json格式
            if (response.resCode === 200) {
              this.$Message.info('保存成功'); 
              this.modalSave = false;
              this.saveLoading = true;
              this.refreshView ();
            } else {
              this.$Message.info(response.resMsg); 
            }
          }).catch(err => {
            this.$Message.info('保存失败');
          　　console.log(err)
          })
        } else {
          return this.changeLoading();
          this.$Message.error('验证失败!');
        }
      })
    },
    transferPage (page) { // 分页
      console.log(page);
      this.searchData.currentPage = page;
      this.refreshView();
    },
    refreshView () { // 列表展示
      this.$jsonp('http://localhost:8080/nodeManager/nodeList', 
      {
      　callback: 'callback', 
        type: this.searchData.type,
        state: this.searchData.state,
        nodeId: this.searchData.nodeId,
        nodeName: this.searchData.nodeName,
        currentPage: this.searchData.currentPage, 
        pageSize: this.searchData.pageSize
      }).then((response) => {
      　　// 返回数据 json， 返回的数据就是json格式
        console.log(response)
        this.nodeData = response;
        this.data1 = response.elements;
      }).catch(err => {
      　　console.log(err)
      })
    }
  },
  created () {
      this.refreshView();
  },
  name: 'app'
}
</script>
<style>
  #fuckThis td, #fuckThis th {
    background: white;
  }

  .ivu-table-header {
    background: white;
  }

  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ivu-modal {
    top: 0;
  }

  <!--
  查询按钮的布局-- >
  #select-column-search {
    margin-top: 40px;
  }

  .ivu-row {
    height: 84px;
  }

  <!--
  这是上面搜索栏里面的三个-- >
  #select-column, #select-column-name, #select-column-state {
    height: 100px;
    width: 190px;
  }

  #select-column p, #select-column-name p, #select-column-state p {
    float: left;
    text-align: center;
    font-size: 14px;
    margin-left: 5px;
  }

  #select-column p, #select-column-name p, #select-column-state p {
    margin-top: 5px;

  }

  .fuck, .el-input {
    width: 100px;
    height: 30px;
    margin-left: 0px;
    margin-top: 0px;
  }

  .layout {
    height: 900px;
  }

  .ivu-layout-header, ivu-layout-content, .Content {
    height: 90px;
  }

  .ivu-layout-content {
    height: 60%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

  }

  h1, h2 {
    font-weight: normal;
    font-size: 18px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>

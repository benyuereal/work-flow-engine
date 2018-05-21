<template>
  <div class="dashboard-container">
    <Row style="height: 40px">
      <Col span="24">&nbsp;</Col>

    </Row>

    <Row style="">
      <Col span="2">&nbsp;</Col>

      <Col span="20">&nbsp;

        <Row style="">
          <Col span="5">
            <Select v-model="searchData.type" style="width:100%" placeholder="模板类型：">
              <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="5">
            <Select v-model="searchData.state" placeholder="状态：" style="width:100%">
              <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="5">
            <Input v-model="searchData.nodeId" placeholder="请输入模板ID" clearable/>
          </Col>
          <Col span="5">
            <Input v-model="searchData.nodeName" placeholder="请输入模板名称" clearable/>
          </Col>
          <Col span="4">
            <Button type="primary" icon="ios-search" id="search" style="float: right" @click="refreshView">Search
            </Button>
          </Col>
          <!--<Col span="4" id="select-column-search">-->
          <!--<Button type="primary" icon="ios-search" id="search">Search</Button>-->
          <!--</Col>-->
        </Row>
      </Col>
      <Col span="2">&nbsp;</Col>
    </Row>
    <br>
    <Row style="height: 33px">
      <Col span="2"></Col>
      <Col span="16">
        &nbsp;
      </Col>
      <Col span="4">
        &nbsp;
      </Col>
      <Col span="2">
        <!--<Button type="primary" icon="ios-search" id="search" style="float: left" @click="findProcedure">Search</Button>-->
      </Col>

    </Row>
    <Row>
      <Col span="2">&nbsp;</Col>
      <Col span="6">
        <Button type="primary" style="width: 90px" @click="showBind">add</Button>
      </Col>
      <Col span="">&nbsp;</Col>
    </Row>
    <br>
    <Row>
      <Col span="2">&nbsp;</Col>
      <Col span="20">
        <Table :columns="columns2" :data="data1"></Table>
      </Col>
      <Col span="2">&nbsp;</Col>

    </Row>
    <br>
    <br>
    <Row style="margin-top: 10px">
      <Col span="2">&nbsp;</Col>
      <Col span="20">
        <Page :page-size="nodeData.pageSize" :current="nodeData.currentPage" :total="nodeData.totalElements"
              @on-change="transferPage" show-total simple></Page>
        <!--<Page :current="2" :total="50"  show-elevator show-sizer></Page>-->
      </Col>
      <Col span="2">&nbsp;</Col>
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
      <Form :model="formItem" label-position="left">
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
      <Form :model="formItem" ref="formItem" :rules="dataRule" label-position="left">
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
  import thisisjsonp from 'jsonp'
  import expandRow from '../expand/node-expande'
  import Vue from 'vue'
  import renderU from '../../utils/render'

  export default {
    components: {expandRow},

    data() {
      return {
        loading: true,
        nodeData: {},
        searchData: {
          type: '',
          state: '',
          nodeId: '', // 模板id
          nodeName: '', // 搜索组织名称
          currentPage: 1,
          pageSize: 10
        },
        title: '新增节点',
        removeId: 0,
        modalSave: false, // 保存修改弹框
        saveLoading: true,
        modalCheck: false, // 查看弹框
        modalDelete: false, // 删除弹框
        dataRule: {
          nodeId: [{required: true, type: 'number', message: '请输入节点Id且为数字', trigger: 'blur'}],
          nodeName: [{required: true, message: '请输入节点名称', trigger: 'blur'}],
          nodeDesc: [{required: true, message: '请输入节点描述', trigger: 'blur'}],
          type: [{required: true, message: '请选择模板类型', trigger: 'change'}],
          nodeClass: [{required: true, message: '请输入节点类', trigger: 'blur'}],
          nodeMethod: [{required: true, message: '请输入节点方法', trigger: 'blur'}],
          nodeTcpUrl: [{required: true, message: '请输入模板TCP/URL', trigger: 'blur'}]
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
            value: 0,
            label: '全部'
          },
          {
            value: 1,
            label: '有效'
          },
          // {
          //   value: 2,
          //   label: '无效'
          // },
          {
            value: 3,
            label: '删除'
          }
        ],
        data1: [],
        columns2: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            title: '模板ID',
            key: 'nodeId',
          },
          {
            title: '模板名称',
            key: 'nodeName',
          },
          {
            title: '模板实现类',
            key: 'nodeClass',
          },
          {
            title: '模板实现方法',
            key: 'nodeMethod',
          },
          {
            title: '模板TCP/URL',
            key: 'nodeTcpUrl',
          },
          {
            title: '状态',
            key: 'stateStr',
          },
          {
            title: 'Action',
            align: 'center',
            // fixed: 'right',
            width: 180,
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
                      this.removeClick(params.row)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        // 下面是form表单
        formItem: {
          id: 0,
          nodeId: '',
          nodeName: '',
          nodeClass: '',
          nodeMethod: '',
          nodeDesc: '',
          nodeTcpUrl: '',
          type: 0
        },
        removeEntity: {},
        updateEntity: {},
      }
    },
    methods: {
      removeClick(row) {
        this.removeId = row.id;
        this.removeEntity = row;
        renderU.removeTip(this, row.id);
      },
      remove(index) {
        this.removeNode();
      },

      changeLoading() {
        this.saveLoading = false;
        this.$nextTick(() => {
          this.saveLoading = true;
        });
      },
      // 弹出绑定界面
      showBind() { // 添加弹框
        this.$refs.formItem.resetFields();
        this.modalSave = true;
      },
      showEdit(row) { // 现实修改节点弹框

        this.$refs.formItem.resetFields();
        var request = {
          id: row.id,
        };
        this.$api.nodeDetail(request).then((response) => {
          // 返回数据 json， 返回的数据就是json格式
          this.title = '修改节点';
          this.formItem = response.data.businessFlowNode;
          //解决节点规则展示不出来的问题
          var type = this.formItem.type;
          type === 1 ? this.formItem.type = '1' : this.formItem.type = '2';
          //将现在的
          this.updateEntity = response.data.businessFlowNode;
          console.log(this.formItem)
          this.modalSave = true
        });
      },
      // 点击显示选框
      show(row) { // 节点详情弹框
        console.log(row.id)
        this.modalCheck = true;
        this.getNode(row);
      },
      getNode(row) { // 获取单一节点信息
        console.log(row)
        var request = {
          id: row.id,
        };
        this.$api.nodeDetail(request).then((response) => {
          // 返回数据 json， 返回的数据就是json格式
          this.title = '修改节点';
          this.formItem = response.data.businessFlowNode;
          console.log(this.formItem)
        });
      },

      removeNode() { // 删除节点
        var req = this.removeEntity;
        req.state = 3;//3是删除
        var requestStr = {
          request: JSON.stringify(req),
        }
        this.$api.nodeRemove(requestStr).then((response) => {
          // 返回数据 json， 返回的数据就是json格式
          if (response.code === 0) {
            this.$Message.success('Success!');

          }
          console.log(response)
          this.modalDelete = false;
          //刷新表格
          this.refreshView();
        })
      },
      updateNode() { // 删除节点
        var req = this.updateEntity;
        var requestStr = {
          request: JSON.stringify(req),
        }
        this.$api.nodeRemove(requestStr).then((response) => {
          // 返回数据 json， 返回的数据就是json格式
          if (response.code === 0) {
            this.$Message.success('Success!');

          }
          //刷新表格
          this.refreshView();
        })
      },
      saveNode(name) { // 保存和修改共同使用的方法
        this.saveLoading = false;
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.changeLoading();
            var req = {
              nodeId: this.formItem.nodeId,
              type: this.formItem.type,
              nodeName: this.formItem.nodeName,
              nodeClass: this.formItem.nodeClass,
              nodeMethod: this.formItem.nodeMethod,
              nodeTcpUrl: this.formItem.nodeTcpUrl,
              nodeDesc: this.formItem.nodeDesc,
              id: this.formItem.id,
            }
            var requestStr = {
              request: JSON.stringify(req),
            }

            this.$api.nodeSave(requestStr).then((response) => {
              // 返回数据 json， 返回的数据就是json格式
              if (response.code === 0) {
                this.$Message.success('Success!');
                this.modalSave = false;
                this.saveLoading = true;
                this.refreshView();
              }
            })
          } else {
            return this.changeLoading();

          }
        })
      },
      transferPage(page) { // 分页
        console.log(page);
        this.searchData.currentPage = page;
        this.refreshView();
      },
      refreshView() { // 列表展示
        var request = {
          callback: 'callback',
          type: this.searchData.type,
          state: this.searchData.state,
          nodeId: this.searchData.nodeId,
          nodeName: this.searchData.nodeName,
          currentPage: this.searchData.currentPage,
          pageSize: this.searchData.pageSize
        }
        this.$api.nodeList(request).then((response) => {
          // 返回数据 json， 返回的数据就是json格式
          console.log(response)
          this.nodeData = response.data;
          this.data1 = response.data.elements;
        }).catch(err => {
          console.log(err)
        })
      }
    },
    created() {
      this.refreshView();
    },
    name: 'dashboard',
    computed: {
      name() {
        return this.$route.path
      }
    },
  }
</script>

<style rel="stylesheet/less" lang="less">
</style>

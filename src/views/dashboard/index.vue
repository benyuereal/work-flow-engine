<template>
  <div class="dashboard-container">
    <Row style="height: 40px">
      <Col span="24">&nbsp;</Col>

    </Row>

    <Row style="">
      <Col span="2">&nbsp;</Col>

      <Col span="20">&nbsp;

        <Row style="">
          <Col span="5" id="select-column">
            <Input v-model="procedureConfigId" placeholder="流程配置ID" clearable
                   style="width: 100%;height: 30px"></Input>
          </Col>
          <Col span="5" id="select-column-name">
            <Input v-model="procedureName" placeholder="流程名称：" clearable
                   style="width: 100%"></Input>
          </Col>
          <Col span="5" id="select-column-state">
            <Select v-model="state" placeholder="状态：" style="width:100%" >
              <Option v-for="item in stateType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="5">&nbsp;</Col>
          <Col span="4" id="select-column-search">
            &nbsp;
            <Button type="primary" icon="ios-search" id="search" style="float: right" @click="findProcedure">Search
            </Button>
          </Col>
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
        <Button type="primary" style="width: 90px" @click="addProcedure">add</Button>
      </Col>
      <Col span="">&nbsp;</Col>
    </Row>
    <br>
    <Row>
      <Col span="2">&nbsp;</Col>
      <Col span="20">
        <Table :columns="columns2" :data="procedureConfigData"></Table>
      </Col>
      <Col span="2">&nbsp;</Col>

    </Row>

    <br>


    <Row style="margin-top: 1px">
      <Col span="2">&nbsp;</Col>

      <Col span="20">
        <Page :page-size="pageRequest.pageSize" :current="pageRequest.currentPage" :total="pageRequest.count"
              @on-change="transferPage"
              @on-page-size-change="handlePageSize" show-total simple></Page>
        <!--<Page :current="2" :total="50"  show-elevator show-sizer></Page>-->

      </Col>
      <Col span="2">&nbsp;</Col>

    </Row>

    <br>
    <br>

    <!--下面是表单域-->
    <Row style="height: 500px">
      <Col span="2">&nbsp;</Col>
      <Col span="10">
      </Col>
      <!--<Col span="7">col-6</Col>-->
    </Row>

    <!--弹出的表单域-->
    <Modal
      @on-ok="validateProcedureData"
      title="流程配置管理"
      v-model="procedureFormDisplayFlag"
      :styles="{top: '20px'}">
      <Form ref="formItem" :model="formItem" label-position="left" :rules="ruleValidate">
        <FormItem label="流程名称" prop="procedureName">
          <Input v-model="formItem.procedureName" placeholder="Enter something..." clearable
                 :disabled="disableFlag"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import expandRow from './table-expand'
  import Vue from 'vue'
  import renderU from '../../utils/render'

  export default {
    components: {expandRow},
    name: 'dashboard',
    computed: {
      name() {
        return this.$route.path
      }
    },
    created() {
      this.findProcedure();
    },

    methods: {

      //点击删除 出现弹框
      removeClick(index) {
        renderU.removeTip(this, index);
      },
      remove(index) {
        var request = {
          id: this.procedureConfigData[index].id,
        }
        var params = {
          request: JSON.stringify(request)
        };
        this.$api.procedureRemove(params).then((response) => {
          var code = response.code;
          if (code === 0 || code == 0) {
            this.$Message.success('Success!');
            //刷新状态
            this.findProcedure();
          }
        });
      },
      validateProcedureData() {
        this.procedureLoading = true;
        //如果是查看的时候显示的面板 就直接隐藏面板
        if (this.disableFlag) {
          this.procedureFormDisplayFlag = false;
        } else {
          //点击增加验证
          this.$refs.formItem.validate((valid) => {
            if (valid) {
              //校验通过 首先保存数据
              this.saveProcedures();
              this.procedureLoading = false;
            } else {
              //关闭下面的按钮
              this.procedureLoading = false;
              this.$Message.error('缺少信息!');
            }
          });
        }
      },


      //根据流程配置ID和节点来查询
      viewProcedureDetail(index, viewFlag) {
        var entity = this.procedureConfigData[index];
        //然后将整个form表单清空一下
        this.$refs.formItem.resetFields();
        //将表单置灰色
        this.disableFlag = viewFlag;
        //然后把数据打上去
        var form = this.formItem;
        this.formItem.procedureName = entity.procedureName;
        //选择节点的东西
        this.formItem.id = entity.id;
        this.formItem.procedureConfigId = entity.procedureConfigId;

      },
      //校验通过之后 要发送后台保存的请求
      saveProcedures() {
        var flag = this.procedureSaveFlag;
        var url;
        var requestMo = this.formItem;
        var params = {
          request: JSON.stringify(requestMo),
          type: flag ? 1 : 2,
        };
        this.$api.procedureSaveOrUpdate(params).then((response) => {
          var code = response.code;
          if (code === 0) {
            //关闭表单
            this.procedureFormDisplayFlag = false;
            //如果不是展示操作 就不提示，也不刷新表格

            this.$Message.success('Success!');
            //刷新列表
            this.findProcedure();


          }

        });
      },


      //
      handlePageSize() {
        alert(11);
      },
      //转换页码
      transferPage(index) {
        //
        //index是要往第几页
        //那么currentPage需要改变
        this.pageRequest.currentPage = index;
        //而且下一页和上一页都需要改变
        // this.pageRequest.prevPage=
        this.findProcedure();
      }
      ,
      //寻找流程 根据条件
      findProcedure() {
        var pageRequest = this.pageRequest;
        var params = {
          prevPage: pageRequest.prevPage,
          nextPage: pageRequest.nextPage,
          pageSize: pageRequest.pageSize,
          count: pageRequest.count,
          currentPage: pageRequest.currentPage,
          procedureName: this.procedureName,
          procedureConfigId: this.procedureConfigId,
          state: this.state,

        };
        this.$api.procedureList(params).then((response) => {
          var data = response.data;
          var code = response.code;
          //如果是成功的返回,就会有关于分页的处理
          if (code === 0) {
            this.pageRequest.count = data.count;
            this.procedureConfigData = data.procedures;
          }
        });


      }
      ,



      //点击显示选框
      showProcedure(index, viewFlag) {
        this.procedureFormDisplayFlag = true;
        this.viewProcedureDetail(index, viewFlag);
      }
      ,
      editProcedure(index) {
        this.procedureSaveFlag = false;
        this.showProcedure(index, false);
      }
      ,


      addProcedure() {
        this.procedureSaveFlag = true;
        this.procedureFormDisplayFlag = true;
        this.$refs.formItem.resetFields();
        //将表单置灰色
        this.disableFlag = false;
      }

      ,
    },

    data() {
      return {
        state: 0,//默认选出全部状态

        //流程保存标志位
        //1保存 2 更新
        procedureSaveFlag: true,
        procedureLoading: false,
        //校验数组

        //formDisable来控制是否可以操作
        disableFlag:
          false,
        //loading

        pageRequest:
          {
            prevPage: 0,
            nextPage:
              0,
            pageSize:
              5,
            count:
              0,
            currentPage:
              1,

          }
        ,
        //流程配置ID
        procedureConfigId: "",
        //流程名称
        procedureName:
          "",
        //状态
        stateType:
          [
            {
              value: '0',
              label: '全部'
            },
            {
              value: '1',
              label: '有效'
            },
            {
              value: '2',
              label: '无效'
            },
            {
              value: '3',
              label: '删除'
            },
          ],
        //默认状态
        defaultState:
          '全部',

        procedureFormDisplayFlag:
          false,
        ruleText:
          '',
        nodeModelList:
          [
            {
              value: '1',
              label: '提单'
            },
            {
              value: '2',
              label: '审核'
            },
          ],


        columns2:
          [
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
            // {
            //   title: '序号',
            //   key: 'id',
            // },
            {
              title: '流程名称',
              key: 'procedureName',
            },
            {
              title: '流程配置ID',
              key: 'procedureConfigId',
            },

            {
              title: '流程执行过程',
              key: 'ruleText',
            },
            {
              title: '状态',
              key: 'state',
            },
            {
              title: '操作',
              key: 'action',
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
                        this.showProcedure(params.index, true)
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
                        this.editProcedure(params.index)
                      }
                    }
                  }, '编辑'),
                  h('Button', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.removeClick(params.index)
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
        procedureConfigData:
          [],
        //下面是form表单
        formItem:
          {
            procedureName: '',
            id: 0,
            procedureConfigId: 0,

          }
        ,
        //数据校验
        ruleValidate: {
          procedureName: [
            {required: true, message: '请填写流程名称', trigger: 'blur'}
          ],

        }

      }

    }
  }
</script>

<style rel="stylesheet/less" lang="less">
</style>

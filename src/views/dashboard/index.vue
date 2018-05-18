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
            <Select v-model="state" style="width:100%" placeholder="状态：">
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
    <!--<Row style="height: 30px">-->
    <!--<Col span="2">&nbsp;</Col>-->
    <!--&lt;!&ndash;<Col span="24" style="height: 50px">&nbsp;</Col>&ndash;&gt;-->
    <!--<Col span="10"><p>流程配置管理</p></Col>-->
    <!--<Col span="7">&nbsp;</Col>-->

    <!--</Row>-->
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
        <FormItem label="节点模板选择" prop="select">
          <Select v-model="formItem.select" style="float: top" :disabled="disableFlag">
            <!--<Option value="1">提单</Option>-->
            <!--<Option value="2">审核</Option>-->
            <Option v-for="item in nodeModelList" :value="item.value" :key="item.value" style="width: 100%">{{
              item.label }}
            </Option>

          </Select>
        </FormItem>

        <FormItem label="规则模板选择:">
          <Row style="height: 20px">
            <Col span="11">
            </Col>
            <Col span="2" style="text-align: center">&nbsp;</Col>
            <Col span="11">
            </Col>
          </Row>
        </FormItem>
        <!--<FormItem style="border-left: black;border-bottom:1px solid black;border-top:1px solid black;">-->
        <Row style="height: 29px;">
          <Col span="1" style="border-top: 1px solid gainsboro;border-bottom: 1px solid gainsboro;height: 100%">&nbsp;
          </Col>
          <Col span="6"
               style="border-top: 1px solid gainsboro;border-bottom: 1px solid gainsboro;text-align: center;border-right: 1px solid gainsboro;border-left: gainsboro; margin-top: 0px;height: 100%">
            <p>模板名称</p>
          </Col>
          <Col span="5"
               style="border-top: 1px solid gainsboro;border-bottom: 1px solid gainsboro;text-align: center;border-right: 1px solid gainsboro;border-left: gainsboro;height: 100%">
            <p>模板关系选择</p>
          </Col>
          <Col span="12"
               style="border-top: 1px solid gainsboro;border-bottom: 1px solid gainsboro;text-align: center;border-left: gainsboro;height: 100%">
            <p>包含规则</p>
          </Col>
        </Row>
        <!--</FormItem>-->
        <!--<FormItem style="border-bottom:1px solid black;">-->
        <Row style="height: 120px">
          <Col span="1" style="border-bottom: 1px solid gainsboro;height: 100%">
            <!--<Icon type="refresh" style="margin-top: 40px;size: 90px"></Icon>-->
          </Col>
          <Col span="6" style="border-bottom: 1px solid gainsboro;border-right: 1px solid gainsboro;height: 100%">

            <CheckboxGroup v-model="formItem.checkArraySelected"
                           style="text-align: left; margin-left: 20px;margin-top: 20px"
                           prop="checkArraySelected" @on-change="changeCheckOrLogic">
              <Checkbox v-for="item in checkArray" :label="item" :disabled="disableFlag">{{ item }}</Checkbox>
            </CheckboxGroup>
          </Col>
          <Col span="5" style="border-bottom: 1px solid gainsboro;border-right: 1px solid gainsboro;height: 100%">

            <CheckboxGroup v-model="formItem.logicArraySelected"
                           style="text-align: left;margin-left: 30px;margin-top: 20px"
                           @on-change="changeCheckOrLogic" prop="logicArraySelected" disabled="disableFlag">
              <Checkbox v-for="item in logicArray" :label="item" :disabled="disableFlag">{{ item }}</Checkbox>


            </CheckboxGroup>
          </Col>
          <Col span="12" id="resultDisplayArea"
               style="border-bottom: 1px solid gainsboro;height: 100%;text-align: center;
                 ">
            <div style="width: 100%;height: 30%;float: top;margin-top: 20px" :disabled="disableFlag">
              {{ruleText}}
            </div>
            <div style="width: 100%;height: 50%;float: top;margin-top:20px">
              <Button type="dashed" shape="circle" icon="refresh"
                      @click="refreshText" style="" :disabled="disableFlag"></Button>
              <!--<Icon type="chevron-down"></Icon>-->
              <Button type="dashed" shape="circle" icon="checkmark" @click="addNode" :disabled="disableFlag"></Button>
            </div>

          </Col>
        </Row>
        <Row style="height: 30px">
          <Col span="4">&nbsp;<p>流程配置管理</p></Col>
          <!--<Col span="24" style="height: 50px">&nbsp;</Col>-->
          <Col span="10"></Col>
          <Col span="7">&nbsp;</Col>

        </Row>
        <Row>
          <Col span="24">
            <Table id="fuckThis" style="background: white" border :columns="columnsProcedure"
                   :data="procedureDetails" :disabled="disableFlag"></Table>&nbsp;
          </Col>


        </Row>
      </Form>
      <!--<div slot="footer">-->
      <!--<Button type="primary" size="small" style="width: 60px" @click="procedureFormDisplayFlag = false">取消</Button>-->

      <!--<Button type="primary" size="small" style="width: 60px"-->
      <!--@click="validateProcedureData">确定-->
      <!--</Button>-->
      <!--&lt;!&ndash;<Button type="error" size="large" long :loading="" @click="del">Delete</Button>&ndash;&gt;-->
      <!--</div>-->
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
      //列表页获取数据
      this.getdata();
      //查询流程配置
      this.findProcedure();
      this.initLatestArray();
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
            Vue.prototype.$Message.success('Success!');
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

      //初始化最新数组大小
      initLatestArray() {
        //初始化的时候,需要初始化上次的大小
        this.latestCheckSelected = JSON.parse(JSON.stringify(this.formItem.checkArraySelected));
        this.latestLogicSelected = JSON.parse(JSON.stringify(this.formItem.logicArraySelected));
      },

      getNodeModel(selected) {
        var nodeList = this.nodeModelList;
        nodeList.forEach(value => {
          if (value.label === selected) {
            this.formItem.select = value.value;

          }
        })
      }
      ,
      //本方法用来处理展示规则
      getRulesText(entity) {


        var ruleArray = [];
        //按照
        ruleArray = entity.ruleText.split(' ');
        var logicArray = entity.procedureModel[0].logicArray;
        var checkArray = entity.procedureModel[0].checkArray;
        //上面两个数组用来承载
        //首先是从 规则校验中筛选出被选中的内容
        checkArray.forEach(value => {
          var checkModel = value;
          ruleArray.forEach(rule => {
            if (rule === checkModel) {
              //如果满足入参数组和校验数组中的元素匹配，就打在选中的校验数组中
              this.formItem.checkArraySelected.push(checkModel);

            }
          })
        });
        //类似的 再从逻辑规则中筛选出被选中的部分
        logicArray.forEach(value => {
          var logicModel = value;
          ruleArray.forEach(rule => {
            if (rule === logicModel) {
              //如果满足入参数组和校验数组中的元素匹配，就打在选中的校验数组中
              this.formItem.logicArraySelected.push(logicModel);
            }
          })
        });
        //然后将所有内容展示到面板上面
        this.ruleText = entity.ruleText;
        this.initLatestArray();


      },
      displayTableData(entity) {

        this.procedureDetails.push({
          nodeSequence: entity.procedureModel[0].nodeSequence,
          procedureConfigId: entity.procedureConfigId,
          modelType: entity.procedureModel[0].nodeName,
          ruleText: entity.ruleText,
          procedureName: entity.procedureName,
          dataVersion: entity.dataVersion,
          nodeName: entity.procedureModel[0].nodeName,
          nodeId: entity.procedureModel[0].nodeId,
          nodeType: entity.procedureModel[0].nodeType,
          id: entity.id,
          procedureId: entity.procedureConfigId
        })
        ;
        //然后分析逻辑多选和
        this.getRulesText(entity);
      },
      //根据流程配置ID和节点来查询
      viewProcedureDetail(index, viewFlag) {
        var entity = this.procedureConfigData[index];
        //然后将整个form表单清空一下
        this.$refs.formItem.resetFields();
        //表格也清空
        this.procedureDetails = [];
        //将表单置灰色
        this.disableFlag = viewFlag;
        //然后把数据打上去
        var form = this.formItem;
        this.formItem.procedureName = entity.procedureName;
        //现在改变一下
        this.formItem.checkArraySelected = entity.procedureModel[0].checkArray;

        this.formItem.logicArraySelected = entity.procedureModel[0].logicArray;
        this.ruleText = entity.ruleText;
        //展示表格
        this.displayTableData(entity);
        //选择节点的东西
        var nodeValue = entity.procedureModel[0].nodeType === 1 ? '1' : '2';
        this.formItem.select = nodeValue;
        this.formItem.id = entity.id;
        this.formItem.procedureConfigId = entity.procedureConfigId;

      },
      //确定校验,检验form表单里面的数据
      validateData(name) {
        if (valid) {
          //校验通过 首先保存数据
          this.saveProcedures();
          //验证返回状态
          var status = this.responseStatus;
          if (status) {
            //关闭表单
            this.procedureFormDisplayFlag = false;
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
            this.loading = false;

          }

        } else {
          //关闭下面的按钮
          this.loading = false;
          // this.$Message.error('Fail!');
        }

        //进行校验

      },
      //校验通过之后 要发送后台保存的请求
      saveProcedures() {
        var flag = this.procedureSaveFlag;
        var url;

        var request = JSON.parse(JSON.stringify(this.procedureDetails));
        var nodeMap = new Map();
        this.nodeModelList.forEach(value => {
          nodeMap.set(value.label, value.value);
        });
        var nodeMapForValue = new Map();
        this.nodeModelList.forEach(value => {
          nodeMap.set(value.value, value.label);
        });
        var procedureConfigId = this.formItem.procedureConfigId;
        var id = this.formItem.id;
        var procedureName;
        var dataVersion;
        request.forEach(val => {
          val.nodeName = val.nodeName == null ? val.modelType : val.nodeName;

          val.modelType = nodeMap.get(val.modelType);
          val.nodeType = val.nodeType == null ? val.modelType : nodeMap.get(val.nodeName);

          procedureName = val.procedureName;
          dataVersion = val.dataVersion;
        });
        var requestMo = {
          id: id,
          procedureName: procedureName,
          procedureConfigId: procedureConfigId == null ? 0 : procedureConfigId,
          //流程之外的其他信息 节点信息
          procedureModel: request,
          dataVersion: dataVersion,

        };
        var params = {
          request: JSON.stringify(requestMo),
          type: flag ? 1 : 2,
        };
        this.$api.procedureSaveOrUpdate(params).then((response) => {
          var data = response.data;
          var code = response.code;
          if (code === 0 || code == 0) {
            //关闭表单
            this.procedureFormDisplayFlag = false;
            //如果不是展示操作 就不提示，也不刷新表格

            Vue.prototype.$Message.success('Success!');
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
      getdata() {


      },
      getUrlKey: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
      },
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

      //增加某个值到弹出框
      addNode() {

        setTimeout(() => {
          this.$refs.formItem.validate((valid) => {
            if (valid) {
              //对象赋值做好
              var form = this.formItem;
              //最后的结果就是将这个对象放到顺序表里面去
              var nodeType = form.select;
              this.getNodeType(nodeType)
              //刷新表格
              this.procedureDetails.push({
                id: 0,
                modelType: this.currentNodeName,
                ruleText: this.ruleText,
                procedureName: form.procedureName,
                procedureConfigId: 0,
              });

            } else {
              //关闭下面的按钮
            }
          });
        }, 1000);


      }
      ,
      getNodeType(nodeType) {
        this.nodeModelList.forEach(value => {
          if (value.value === nodeType) {
            this.currentNodeName = value.label;
          }
        });

      }
      ,
      getNodeTypeByLabel(nodeType) {
        this.nodeModelList.forEach(value => {
          if (value.label === nodeType) {
            this.currentNodeName = value.value;
          }
        });

      }
      ,

      //删除弹出框中的某一个值
      removeNode(index) {
        var procedureDetails = this.procedureDetails;
        //删除一个数组
        procedureDetails.splice(index, 1);
      }
      ,

      //点击显示选框
      showProcedure(index, viewFlag) {
        // this.refreshText();
        this.procedureFormDisplayFlag = true;
        this.viewProcedureDetail(index, viewFlag);
      }
      ,
      editProcedure(index) {
        this.procedureSaveFlag = false;
        this.showProcedure(index, false);
      }
      ,
      showRemoveModal(index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>删除此条记录,是否继续?</p>',
          onOk: () => {
            this.removeProcedure(index);
          },
          onCancel: () => {
          }
        });
      }
      ,


      addProcedure() {
        this.procedureSaveFlag = true;
        this.refreshText();
        this.procedureFormDisplayFlag = true;
        this.$refs.formItem.resetFields();
        this.procedureDetails = [];
        //将表单置灰色
        this.disableFlag = false;
      }
      ,
      refreshText() {
        var checkArraySelected = this.formItem.checkArraySelected;
        var logicArraySelected = this.formItem.logicArraySelected;
        checkArraySelected.splice(0, 4);
        logicArraySelected.splice(0, 4);
        //删除规则内容
        this.ruleText = '';
        this.initLatestArray();
      }
      ,
      changeCheckOrLogic() {


        //按照长度来判断是否被选中，首先要保存一个长度，如果长度增加了 说明是应该追加上去的；
        //如果长度减少了，说明应该是减去的
        var checkArraySelected = this.formItem.checkArraySelected;
        var logicArraySelected = this.formItem.logicArraySelected;


        //首先判断 长度，然后再考虑追加还是 减少
        //如果长度变短了，就说明是减少了，要减少
        if (this.formItem.checkArraySelected.length < this.latestCheckSelected.length
          || this.formItem.logicArraySelected.length < this.latestLogicSelected.length) {
          //减少不顶用，用便利的方法重新再来一遍
          var rules = this.ruleText.split(' ');
          var rule = '';
          var hashMap = new Map();
          //保证已经有的还有，但是少了的就没有了
          rules.forEach(value => {
            this.formItem.checkArraySelected.forEach(target => {
              if (value === target) {
                hashMap.set(value, true);
              }
            });
            this.formItem.logicArraySelected.forEach(target => {
              if (value === target) {
                hashMap.set(value, true);
              }
            });
            if (hashMap.get(value)) {

            } else {
              hashMap.set(value, false);
            }
          });
          //便利map
          hashMap.forEach((value, key) => {
            if (value) {
              rule += key + ' ';
            }
          });
          this.ruleText = rule;
        }
        //校验增加的时候 对应的处理
        if (this.formItem.checkArraySelected.length > this.latestCheckSelected.length) {
          //check增长
          this.ruleText += JSON.parse(JSON.stringify(this.formItem.checkArraySelected)).pop() + ' ';

        }
        //和校验增加的处理一样
        if (this.formItem.logicArraySelected.length > this.latestLogicSelected.length) {
          this.ruleText += JSON.parse(JSON.stringify(this.formItem.logicArraySelected)).pop() + ' ';

        }

        //方法最后要保留当前的数组更新
        this.latestCheckSelected = JSON.parse(JSON.stringify(checkArraySelected));
        this.latestLogicSelected = JSON.parse(JSON.stringify(logicArraySelected));

      }
    },

    data() {
      return {
        state: 0,//默认选出全部状态

        //流程保存标志位
        procedureSaveFlag: true,
        procedureLoading: false,

        centerDialogVisible:
          false,
        currentNodeName:
          '',
        //新增流程配置的标志位
        addingProcedureFlag:
          false,
        latestCheckSelected:
          [],
        latestLogicSelected:
          [],
        //校验数组
        checkArray:
          ['城市校验', '余额校验', '类别校验'],
        logicArray:
          ['并', '或', '(', ')'],
        //formDisable来控制是否可以操作
        disableFlag:
          false,
        //控制结果返回状态
        responseStatus:
          false,
        //loading
        loading:
          true,
        //绑定表格的属性值
        formItemData:
          '',
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
        model1:
          '',
        columnsProcedure:
          [
            {
              title: '序号',
              key: 'nodeSequence',
              width: 72.33,
            },

            {
              title: '流程名称',
              key: 'procedureName',
              width: 142.33,

            },
            {
              title: '节点',
              key: 'modelType',
              width: 101.66,

            },
            {
              title: '规则',
              key: 'ruleText'
            },
            {
              title: '操作',
              key: 'action',
              fixed: 'right',
              width: 70,
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      size: 'small',
                      type: 'text',
                      'disabled': this.disableFlag,

                    },
                    on: {
                      click: () => {
                        this.removeNode(params.index)
                      }
                    }

                  }, 'Rem'),
                  h('Button', {
                    props: {
                      size: 'small',
                      type: 'text',
                      /**
                       * 这个位置真是难死了  @TODO 这个位置需要记笔记
                       * */
                      'disabled': this.disableFlag,
                    },
                    on: {
                      click: () => {
                        this.removeNode(params.index)
                      }
                    }

                  }, 'View'),

                ]);
              }
            }
          ],
        procedureDetails:
          [],
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
            select:
              '',
            radio:
              'male',
            checkArraySelected:
              [],
            logicArraySelected:
              [],
            id: 0,
            procedureConfigId: 0,

          }
        ,
        //数据校验
        ruleValidate: {
          procedureName: [
            {required: true, message: '请填写流程名称', trigger: 'blur'}
          ],
          select:
            [
              {required: true, message: '请填写节点模板', trigger: 'change'}
            ],

          checkArraySelected:
            [
              {required: true, type: 'array', min: 1, message: '请选择至少一个模板名称', trigger: 'change'},
              {type: 'array', max: 4, message: 'Choose two hobbies at best', trigger: 'change'}
            ],
          logicArraySelected:
            [
              {required: true, type: 'array', min: 1, message: '请选择至少一个模板关系', trigger: 'change'},
              {type: 'array', max: 4, message: '请选择至少一种逻辑', trigger: 'change'}
            ],

        }

      }

    }
  }
</script>

<style rel="stylesheet/less" lang="less">
</style>

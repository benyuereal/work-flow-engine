<style scoped>
  .expand-row {
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">创建人: </span>
        <span class="expand-value">{{ row.createdBy }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">创建时间: </span>
        <span class="expand-value">{{ row.gmtCreated }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">更新人: </span>
        <span class="expand-value">{{ row.modifyBy }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <span class="expand-key">更新时间: </span>
        <span class="expand-value">{{ row.gmtModify }}</span>
      </Col>

    </Row>
    <Row>
      <Col span="24">
        &nbsp;
      </Col>

    </Row>
    <Row>
      <!--<Col span="8">-->
      <!--&nbsp;-->
      <!--</Col>-->
      <Col span="24">
        <span class="expand-key">节点规则: </span>
        <Button type="primary" @click="addNodeFlag=!addNodeFlag" style="float: right;width: 56px">add</Button>

        <div style="margin-top: 20px"></div>

        <!--<Timeline pending style="float: left">-->
        <!--<TimelineItem>余额校验 || 版本校验</TimelineItem>-->
        <!--<TimelineItem>城市校验</TimelineItem>-->
        <!--</Timeline>-->

        <div id="tuozhuai_view">
          <!--  -->


          <draggable v-for="people in processes" :options="{group:people.nodeType}">
            <span type="dashed">{{people.nodeType===1?'提单:':'审核:'}}</span>
            <Button v-for="element in people.rule" :type="element.type" :icon="element.icon"
                    style="margin-left: 4px;margin-right: 4px">
              {{element.name}}
            </Button>
            <Button style="float: right" @click="removeRule(people)">删除</Button>
          </draggable>

          <br>
          <br>
        </div>

      </Col>
      <!--<Col span="8">-->
      <!--&nbsp;-->
      <!--</Col>-->
    </Row>
    <Modal
      v-model="addNodeFlag"
      title="节点规则管理" @on-ok="saveRule(girl)" :style="width='600px'" :loading="editingLoading">
      <Form :label-width="0" label-position="left">

        <div>
          <FormItem label="节点选择" :rules="{required: true, message: '请选择节点', trigger: 'change'}">
            <Select v-model="nodeType" style="float: top">
              <!--<Option value="1">提单</Option>-->
              <!--<Option value="2">审核</Option>-->
              <Option v-for="item in nodeModelList" :value="item.value" :key="item.value" style="width: 100%">{{
                item.label }}
              </Option>

            </Select>
          </FormItem>
          <Tooltip content="点击按钮 增加逻辑区域按钮" placement="right">
            <Button v-for="element in logicSet" @click="fuck(element)" :type="element.type" :icon="element.icon"
                    style="margin-left: 4px;margin-right: 4px">
              {{element.name}}
            </Button>
          </Tooltip>
        </div>
        <div style="margin-top: 40px">

        </div>
        <div>

          <!--  -->
          <draggable v-model="fruit" :options="{group:'people'}">
            <Button v-for="element in fruit" :type="element.type" :icon="element.icon"
                    style="margin-left: 4px;margin-right: 4px">
              {{element.name}}
            </Button>
          </draggable>

          <br>
          <br>
          <draggable v-model="girl" :options="{group:'people'}">
            <Button v-for="element in girl" @click="removeLogic(element)" :type="element.type" :icon="element.icon"
                    style="margin-left: 4px;margin-right: 4px;border-radius: 0px">
              {{element.name}}
            </Button>
          </draggable>
          <br>
          <!--<draggable  v-model="logicSet" :options="{group:['human']}">-->
          <!--<Button v-for="element in logicSet" >{{element}}</Button>-->
          <!--</draggable>-->
          <!--{{logicSet}}-->
        </div>
      </Form>
    </Modal>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'

  export default {
    props: {
      row: Object
    },
    created() {
      // var data = ['(', '&&', ')',];
      this.girl.forEach(value => {
        this.logicMap.set(value.id, value);
      });
      this.fruit.forEach(value => {
        this.logicMap.set(value.id, value);
      });

      var procedureModel = this.row.procedureModel;
      procedureModel.forEach(value => {
        var ruleEntity = {
          rule: [],
          nodeType: '',
        };
        var rules = [];
        var ruleText = value.ruleRelation;
        rules = ruleText.split(" ");
        rules.forEach(value1 => {
          var entity = this.logicMap.get(value1);
          if (entity != null) {
            ruleEntity.rule.push(entity);
            ruleEntity.nodeType = value.nodeType;
          }
        });
        this.processes.push(ruleEntity);
      });
    },
    components: {
      draggable,
    },

    data() {
      return {
        value2: '1',
        processes: [],
        addNodeFlag: false,
        doubleCount: 0,
        logicMap: new Map(),
        ruleMap: new Map(),
        fruit: [
          {name: '余额校验', id: '1', icon: 'social-yen', type: 'ghost', notLogic: true},
          {name: '城市校验', id: '2', icon: 'location', type: 'ghost', notLogic: true},
          {name: '类别校验', id: '3', icon: 'navicon-round', type: 'ghost', notLogic: true},
        ],
        girl: [
          {name: '(', id: '(', icon: 'primary', type: 'ghost', remove: false},
          {name: ')', id: ')', icon: 'primary', type: 'ghost', remove: false},
          {name: '或', id: '||', icon: 'ios-pause', type: 'ghost', remove: false},
          {name: '并', id: '&&', icon: 'arrow-right-a', type: 'ghost', remove: false},
        ],
        people: [],
        logicSet: [
          {name: '(', id: '(', icon: 'primary', type: 'ghost', remove: false},
          {name: ')', id: ')', icon: 'primary', type: 'ghost', remove: false},
          {name: '或', id: '||', icon: 'ios-pause', type: 'ghost', remove: false},
          {name: '并', id: '&&', icon: 'arrow-right-a', type: 'ghost', remove: false},
        ],
        nodeType: '',
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
        editingLoading: false,
      }
    }
    ,
    methods: {
      fuck(element) {
        this.girl.push(element);
      },
      removeLogic(element) {


        this.doubleCount++;
        setTimeout(function () {
          this.doubleCount = 0;
        }, 500);
        if (this.doubleCount > 1) {
          // alert('这是双击');
          element.remove = true;
          //TODO 这个过滤不错
          this.girl = this.girl.filter(function (i) {
            return !i.remove || i.notLogic;
          })
          this.doubleCount = 0;
        }
      },
      saveRule(entity) {
        var validate = this.nodeType !== '';
        if (validate) {
          var rule = {
            rule: [],
            nodeType: '',
          };
          rule.nodeType = this.nodeType;
          rule.rule = entity;
          this.processes.push(rule);
          this.updateRule(false);
          this.editingLoading = false;
        } else {
          this.$Message.warning('缺少节点信息，请选择节点后再点击确定!');
        }


      },
      changeLoading() {
        this.editingLoading = false;
        this.$nextTick(() => {
          this.editingLoading = true;
        });
      },
      removeRule(entity) {
        entity.removeFlag = true;
        this.processes = this.processes.filter(function (i) {
          return !i.removeFlag;
        });
        //然后传入后台。根据id来更新
        this.updateRule(false);
      },

      updateRule(flag) {
        var id = this.row.id;
        var processModels = [];
        this.processes.forEach(value => {
          //规则和内容
          var ruleRelation = '';
          var ruleText = '';
          var processModel = {};
          processModel.nodeType = value.nodeType === null ? 1 : value.nodeType;
          processModel.nodeName = value.nodeType === '1' ? '提单' : '审核';
          value.rule.forEach(value1 => {
            ruleRelation += value1.id + ' ';
            ruleText += value1.name + ' ';
          })
          processModel.ruleText = ruleText;
          processModel.ruleRelation = ruleRelation;
          processModels.push(processModel);
        });
        var request = {
          id: id,
          procedureModel: processModels,
        };
        var params = {
          request: JSON.stringify(request),
          //1保存 2更新
          type: flag ? 1 : 2,
        };
        this.$api.ruleSaveOrUpdate(params).then((response) => {
          var code = response.code;
          if (code === 0) {
            this.editingLoading = false;
            this.$Message.success('Success!');
          }

        });
      },
    }
    ,
  };
</script>
<style scoped>
  .expand-row {
    margin-bottom: 16px;
  }
</style>

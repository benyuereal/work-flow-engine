<template>
  <div class="dashboard-container">
    <Row>
      <Row style="height: 40px">
        <Col span="24">&nbsp;</Col>

      </Row>

      <Row style="">
        <Col span="2">&nbsp;</Col>

        <Col span="20">&nbsp;

          <Row style="">
            <Col span="5" id="select-column">
              <Select v-model="brandTypeModal" style="width:100%" placeholder="品牌：">
                <Option v-for="item in brandType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="5" id="select-column-name">
              <Select v-model="sourceTypeModal" style="width:100%" placeholder="订单来源：">
                <Option v-for="item in sourceType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select></Col>
            <Col span="5" id="select-column-signature-type">
              <Select
                v-model="writtenTypeModal"
                style="width:100%" placeholder="签单类型：">
                <Option v-for="item in writtenType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>

            <Col span="5" id="select-column-state">
              <Input v-model="entranceProcedureConfigId" placeholder="流程配置ID：" clearable
                     style="width: 100%;height: 30px"></Input>
            </Col>
            <Col span="4">
              <Button type="primary" icon="ios-search" id="search" style="float: right;"
                      @click="getTableData">Search
              </Button>
            </Col>
            <!--<Col span="4" id="select-column-search">-->
            <!--<Button type="primary" icon="ios-search" id="search">Search</Button>-->
            <!--</Col>-->
          </Row>
        </Col>
        <Col span="2">&nbsp;</Col>
      </Row>
      <Row style="height: 33px">
        <Col span="2"></Col>
        <Col span="16">
          &nbsp;
        </Col>
        <Col span="4">
          &nbsp;
        </Col>
        <Col span="2">
          <!--<Button type="primary" icon="ios-search" id="search" style="float: left" @click="getTableData">Search</Button>-->
        </Col>

      </Row>

      <Row>
        <Col span="2">&nbsp;</Col>
        <Col span="6">
          <Button type="primary" style="width: 90px" @click="addEntrance">add</Button>
        </Col>
        <Col span="">&nbsp;</Col>
      </Row>
      <br>
    </Row>
    <Row>
      <Col span="2">&nbsp;</Col>
      <Col span="6">
      </Col>
      <Col span="">&nbsp;</Col>
    </Row>
    <Row>
      <Col span="2">&nbsp;</Col>
      <Col span="20">
        <!--<Table  :columns="entranceColumn" :data="entranceData"></Table>-->
        <Table :columns="entranceColumn" :data="entranceData"></Table>

      </Col>
      <Col span="2">&nbsp;</Col>

    </Row>
    <br>


    <br>
    <Row style="margin-top: 1px">
      <Col span="2">&nbsp;</Col>
      <Col span="20">
        <Page :page-size="page.pageSize" :current="page.currentPage" :total="page.count"
              @on-change="transferPage"
              @on-page-size-change="handlePageSize" show-total simple></Page>
        <!--<Page :current="2" :total="50"  show-elevator show-sizer></Page>-->

      </Col>
      <Col span="2">&nbsp;</Col>
    </Row>


    <!--</Row>-->
    <br>

    <!--下面是表单域-->
    <Row style="height: 500px">
      <Col span="2">&nbsp;
      </Col>
      <Col span="10">
      </Col>
      <!--<Col span="7">col-6</Col>-->
    </Row>

    <!--弹出的表单域-->
    <Modal
      title="入口信息配置"
      v-model="addEntranceModal"
      :styles="{top: '20px'}">
      <Form ref="saveEntranceForm" :model="saveEntranceForm" :label-width="0" label-position="left"
            :rules="validateEntranceForm">
        <FormItem label="入口名称" prop="entranceName">
          <Input v-model="saveEntranceForm.entranceName" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="品牌" prop="brand">
          <Select v-model="saveEntranceForm.brand">
            <Option v-for="item in brandType" :value="item.value" :key="item.value"
                    style="width: 100%">{{ item.label
              }}
            </Option>

          </Select>
        </FormItem>
        <FormItem label="适用城市" prop="applicableCity">
          <Select v-model="saveEntranceForm.applicableCity" filterable>
            <Option v-for="item in addApplicableCity" :value="item.value" :key="item.label"
                    style="width: 100%">
              {{ item.label
              }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="签单类型" prop="written">
          <CheckboxGroup v-model="saveEntranceForm.written">
            <Checkbox v-for="item in writtenType" :label="item.value">{{ item.label
              }}
            </Checkbox>

          </CheckboxGroup>
        </FormItem>
        <FormItem label="提单入口" prop="bill">
          <CheckboxGroup v-model="saveEntranceForm.bill">
            <Checkbox v-for="item in billType" :label="item.value">{{ item.label
              }}
            </Checkbox>

          </CheckboxGroup>
        </FormItem>
        <FormItem label="商品类型" prop="goodsType">
          <Select v-model="saveEntranceForm.goodsType" @on-change="findGoodsLine(1)">
            <Option v-for="item in goodsType" :value="item.value" :key="item.value">{{ item.label }}
            </Option>

          </Select>
        </FormItem>
        <FormItem label="商品线" prop="goodsLine">
          <Select v-model="saveEntranceForm.goodsLine" @on-change="findGoodsLine(2)">
            <Option v-for="item in goodsLine" :value="item.value" :key="item.value">{{ item.label }}
            </Option>

          </Select>
        </FormItem>
        <FormItem label="商品单元" prop="goodsUnit">
          <Select v-model="saveEntranceForm.goodsUnit">
            <Option v-for="item in goodsUnit" :value="item.value" :key="item.value">{{ item.label }}
            </Option>

          </Select>
        </FormItem>


      </Form>
      <div slot="footer">
        <Button type="primary" size="small" style="width: 60px" @click="cancelEdit">取消</Button>

        <Button type="primary" size="small" style="width: 60px" :loading="entranceLoading"
                @click="validateEntranceData">确定
        </Button>
        <!--<Button type="error" size="large" long :loading="" @click="del">Delete</Button>-->
      </div>
    </Modal>
    <Modal
      title="入口信息绑定流程"
      v-model="bindEntranceModal"
      :styles="{top: '150px'}">
      <Form :model="bindForm" :label-width="0" label-position="left">

        <FormItem label="入口选择">
          <Input v-model="bindForm.entranceName" disabled placeholder="Enter something..."></Input>

        </FormItem>
        <FormItem label="流程选择">
          <Select v-model="bindForm.procedureConfigId" filterable clearable style="text-align: center">
            <Option v-for="item in proceduresByEntrance" :value="item.procedureConfigId" :key="item.procedureConfigId"
            >
              {{ item.procedureName
              }}
            </Option>
          </Select>
        </FormItem>


      </Form>
      <div slot="footer">
        <Button type="primary" size="small" style="width: 60px" @click="bindEntranceModal = false">取消</Button>

        <Button type="primary" size="small" style="width: 60px" :loading="entranceLoading"
                @click="entranceBindProcedure">确定
        </Button>
        <!--<Button type="error" size="large" long :loading="" @click="del">Delete</Button>-->
      </div>
    </Modal>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import expandRow from './table-expand';
  import city from '../../utils/city'

  export default {
    components: {expandRow},
    name: 'dashboard',
    computed: {
      name() {
        return this.$route.path
      }
    },
    created() {
      //初始 获取表格中 数据
      this.getEntranceData();
      //初始化商品类型 刚开始是0,类型是0
      this.getGoodsType(0, 0);
      this.validateEntranceFormAlive = JSON.parse(JSON.stringify(this.validateEntranceForm))

    },

    methods: {
      cancelEdit: function () {
        this.addEntranceModal = false;
        this.$refs.saveEntranceForm.resetFields();

      },
      showRemoveModal(index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>删除此条记录,是否继续?</p>',
          onOk: () => {
            this.removeEntrance(index);
          },
          onCancel: () => {
          }
        });
      },

      //删除流程
      removeEntrance(index) {
        var id = this.entranceData[index].id;
        var url = 'http://localhost:9501/entrance/remove'
        var request = {
          id: id,
        }
        this.$http.post(
          url,//请求地址
          {
            params: JSON.stringify(request)//参数
          },
          {
            emulateJSON: true,//是否是json
          }
        ).then(function (res) {
          var data = res.data;
          var code = data.code;
          this.warningMessage = data.message;
          if (code === 0 || code == 0) {
            this.$Message.success('Success!');
            //刷新表格
            this.getEntranceData();
          } else {
            this.$Message.warning(this.warningMessage);

          }

        }, function (res) {
          this.$Message.warning("fail");

        });
      },
      entranceBindProcedure() {
        var url = 'http://localhost:9501/entrance/bind';

        var params = this.bindForm;
        var request = JSON.stringify(params);
        this.$http.post(url
          ,//请求地址，有条件查询流程配置数据
          {
            params: request//参数
          },
          {
            emulateJSON: true//是否是json
          }).then(function (response) {
          //首先根据返回

          var result = response.data;
          var code = result.code;
          var message = result.message;

          //如果是成功的返回,就会有关于分页的处理
          if (code === 0) {
            this.$Message.success(message);
            //刷新列表页
            this.getEntranceData();
            //隐藏
            this.bindEntranceModal = false;

          } else {
            //否则弹出警告，并且在警告上打印出后台返回的信息
            this.$Message.warning(message);


          }


        })
      },
      //获取全部procedure
      getProcedureByEntranceId() {
        var url = 'http://localhost:9501/procedure/getProcedureByEntrance';

        this.$http.get(url
          ,//请求地址，有条件查询流程配置数据

          {
            emulateJSON: true//是否是json
          }).then(function (response) {
          //首先根据返回

          var result = response.data;
          var data = result.data;
          var code = result.code;
          var message = result.message;

          //如果是成功的返回,就会有关于分页的处理
          if (code === 0) {
            //如果没有任何信息
            var type = data.type;
            //如果是有提示，先打印提示
            if (type === 2) {

              this.$Message.warning(message);
            } else {
              //否则 就讲数据打印到页面上

              this.proceduresByEntrance = data.procedures;
            }

          } else {
            //否则弹出警告，并且在警告上打印出后台返回的信息
            this.$Message.warning(message);


          }


        })
      },
      //获取商品单元的名称
      getGoodsUnitName() {
        var list = this.goodsUnit;
        var index = this.saveEntranceForm.goodsUnit;
        var goodsUnitName = '';
        list.forEach(value => {
          if (value.value === index) {
            goodsUnitName = value.label;
          }
        })
        this.saveEntranceForm.goodsUnitName = goodsUnitName;

      },
      //公共方法，通过
      //@property=传入的属性名字，需要改变的值
      //@list=传入的要查询的列表
      //@param 传入的要查的参数
      getGoodsCode: function (property, list, param) {

        alert(property);
        alert(JSON.stringify(this.goods));
        list.forEach(value => {
          if (value.label === param) {
            property = value.value;
          }
        });
      },

      getCityCode(name) {
        var cityCode = 0;
        var cities = city.city;
        cities.forEach(value => {
          if (value.label === name) {
            cityCode = value.value;
          }
        });
        //最后将城市名字赋值

        this.saveEntranceForm.applicableCity = cityCode;
      },

      getCityName() {
        var index = this.saveEntranceForm.applicableCity;
        var cityName = '北京';
        var cities = city.city;
        cities.forEach(value => {
          if (value.value === index) {
            cityName = value.label;
          }
        });
        //最后将城市名字赋值
        this.saveEntranceForm.applicableCityName = cityName;
      },
      getBrand(label) {
        var list = this.brandType;
        var brandCode = 0;
        list.forEach(value => {
          if (value.label === label) {
            brandCode = value.value;
          }
        });
        return this.saveEntranceForm.brand = brandCode;
      },
      //1寻找商品线，2寻找商品单元
      findGoodsLine: function (type) {

        var code = 0;
        //根据类型来取发送请求的数据
        if (type === 1) {
          //如果类型是1，就表示是查看商品线，需要拿到选中的商品类型
          code = this.saveEntranceForm.goodsType;
          //然后调用方法，获取下级类目
          this.getGoodsType(code, type);

          //如果类型是2，就表示查看商品单元，需要拿到选中的商品线
        } else if (type === 2) {
          code = this.saveEntranceForm.goodsLine;
          //然后调用方法，获取下级类目
          this.getGoodsType(code, type);
        }
      },
      //处理页码
      handlePageSize() {
        alert(11);
      },
      //页码转换,点击页码
      transferPage(index) {
        //
        //index是要往第几页
        //那么currentPage需要改变
        this.page.currentPage = index;
        //而且下一页和上一页都需要改变
        // this.pageRequest.prevPage=
        this.getEntranceData();
      },

      validateEntranceData() {

        //点击增加验证
        this.$refs.saveEntranceForm.validate((valid) => {
          if (valid) {
            //校验通过 首先保存数据
            this.saveEntrance();
          } else {
            //关闭下面的按钮
            this.entranceLoading = false;

            this.$Message.error('缺少信息!');
          }
        });

      },

      //保存入口信息
      saveEntrance() {
        //首先将城市名字找到
        this.getCityName();
        //商品单元名字找到
        this.getGoodsUnitName();
        var request = JSON.parse(JSON.stringify(this.saveEntranceForm));
        request.bill = request.bill[0];
        request.written = request.written[0];

        //去除""
        var reqStr = JSON.stringify(request);
        //保存入库
        var url = this.adding ? 'http://127.0.0.1:9501/entrance/save' : 'http://127.0.0.1:9501/entrance/update';
        this.$http.post(
          url,
          {
            request: reqStr,
          },
          {
            emulateJSON: true,//是否是json
          }
        ).then(function (response) {
          var data = response.data;
          var code = data.code;
          var message = data.message;
          if (code === 0) {

            //关闭表单
            this.addEntranceModal = false;
            this.$Message.success('Success!');
            //刷新表格
            this.getEntranceData();

          } else {
            this.warningMessage = data.message;
            this.$Message.warning(this.warningMessage);
          }
          this.entranceLoading = false;

        }, function (res) {
          this.validateStatus = false;
        });
      },
      //初始化表格
      getEntranceData() {

        //请求数据，有两个 一个是分页的请求对象，一个是搜索条件的对象，由于wf不支持大对象
        //直接就放一个里面了
        var request = {
          //请求的搜索条件

          //品牌
          brand: this.brandTypeModal,
          //来源
          source: this.sourceTypeModal,
          //签单类型
          written: this.writtenTypeModal,
          //流程配置id
          procedureConfigId: this.entranceProcedureConfigId,
          //分页条件
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
          count: this.page.count,


        };

        //获取入口表格数据
        var data;
        this.$http.get(
          "http://127.0.0.1:9501/entrance/find",
          {
            params: request,
          },
          {
            emulateJSON: true,//是否是json
          }
        ).then(function (response) {


          var result = response.data;
          var data = result.data;
          var code = result.code;
          var message = result.message;

          //如果是成功的返回,就会有关于分页的处理
          if (code === 0) {
            //如果没有任何信息
            var type = data.type;
            //如果是有提示，先打印提示
            if (type === 2) {

              this.$Message.warning(message);
            } else {
              //如果状态是0 就展示 否则展示默认的
              var count = data.count;
              var entranceData = data.entrances;
              var page = this.page;
              this.entranceData = entranceData;
              //页数赋值
              page.count = count;
              //判断当前的数据个数 以及当前页码大小
              //如果当前数据的个数 比每页显示的个数还要小的话，就显示一页
              //反之，就显示前十个
              if (page.pageSize < entranceData.length) {
                //如果数量小于当前页面，那么就在第一页将数据打上去
                this.entranceData = entranceData.slice(0, page.pageSize);
              }
            }

          } else {
            //否则弹出警告，并且在警告上打印出后台返回的信息
            this.$Message.warning(message);


          }


        })
      },

      //初始化 获取商品类型等数据
      getGoodsType(code, type) {
        var request = {
            code: code,//初始的时候传的是0
          }
        ;
        this.$http.get(
          "http://127.0.0.1:9501/init/getProduct",
          {
            params: request
          },
          {
            emulateJSON: true,//是否是json
          }
        ).then(function (response) {
          var data = response.data;
          var code = data.code;
          //code===0的时候是成功
          if (code === 0) {

            var results = data.data;
            //返回的结果封装在data里面
            //如果是类型1,就是商品类型;2商品线;3商品单元
            if (type === 0) {
              //商品类型
              this.goodsType = results;
              //商品线
            } else if (type === 1) {
              this.goodsLine = results;

              //商品单元
            } else {
              this.goodsUnit = results;

            }
          } else {
            //其他情况就是失败
          }
        });
      },

      //获取后台的json数据
      getTableData() {
        this.getEntranceData(1);
      },

      //弹出绑定界面
      showBind(index) {
        var entity = this.entranceData[index];
        this.bindForm.entranceName = entity.entranceName;
        this.bindForm.entranceId = entity.entranceId;
        this.bindForm.id = entity.id;
        //同时将绑定的打上
        this.bindForm.procedureConfigId = entity.procedureConfigId;
        this.bindForm.procedureName = entity.procedureName;
        //然后获取流程
        this.getProcedureByEntranceId();
        this.bindEntranceModal = true;
        //展示数据
      },


      getWritten(writtenName) {
        var list = this.writtenType;
        var written = 0;
        list.forEach(value => {
          if (value.label === writtenName) {
            written = value.value;
          }
        });
        this.saveEntranceForm.written = [written];
      },
      getBill(billName) {
        var list = this.billType;
        var bill = 0;
        list.forEach(value => {
          if (value.label === billName) {
            bill = value.value;
          }
        });
        this.saveEntranceForm.bill = [bill];
      },
      //编辑第几个
      //去除验证
      editEntrance(index) {

        this.clearEntranceForm();
        this.$refs.saveEntranceForm.resetFields();

        var entity = this.entranceData[index];
        //先看品牌
        this.saveEntranceForm.entranceName = entity.entranceName;
        this.getBrand(entity.brand);
        this.getCityCode(entity.applicableCityName);
        this.getWritten(entity.written);
        //然后是对应的商品线信息
        this.getGoodsType(entity.goodsType, 1);
        this.getGoodsType(entity.goodsLine, 2);
        this.saveEntranceForm.goodsLine = entity.goodsLine;
        this.saveEntranceForm.goodsType = entity.goodsType;
        this.saveEntranceForm.goodsUnit = entity.goodsUnit;
        this.saveEntranceForm.id = entity.id;
        this.saveEntranceForm.entranceId = entity.entranceId;

        //去除验证


        this.addEntranceModal = true;
        this.editing = true;
        this.adding = false;
      },


      clearEntranceForm() {
        this.saveEntranceForm = {
          //入口名称
          entranceName: '',

          //提单类型
          bill: [],

          goodsType: '',
          //商品单元
          goodsUnit: '',
          //商品线
          goodsLine: '',
          goodsUnitName: '',
          //新增城市绑定
          applicableCity: '',
          applicableCityName: '',
          //品牌
          brand: '',
          //签单类型
          written: [],
          //更新用
          id: '',

        }
      },
      //点击显示选框
      addEntrance() {

        if (!this.adding) {
          // this.clearEntranceForm();
          this.$refs.saveEntranceForm.resetFields();
        }
        this.adding = true;
        this.editing = false;

        // if (this.addEntranceModal) {
        //   this.addEntranceModal = false;
        // }


        this.addEntranceModal = true;
      },


    },
    name: 'app',
    data() {
      return {
        columns10: [
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
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          }
        ]
        ,
        //
        goods: {
          type: 0,
          line: 0,
          unit: 0
        },
        //overAllCode全局查询code
        overAllCode: 0,
        //根据entranceId获得的流程
        proceduresByEntrance: [],
        centerDialogVisible: false,
        adding: false,
        //表单是否被编辑中
        editing: false,
        warningMessage: '',
        entranceLoading: false,
        //控制结果返回状态
        validateStatus: false,
        validateEntranceFormAlive: null,
        //验证表单的规则
        validateEntranceForm: {

          brand: [
            {required: true, message: '请选择品牌', trigger: 'change'}
          ],
          goodsType: [
            {required: true, message: '请选择商品类型', trigger: 'change'}
          ],
          goodsLine: [
            {required: true, message: '请选择商品线', trigger: 'change'}
          ],
          goodsUnit: [
            {required: true, message: '请选择商品单元', trigger: 'change'}
          ],
          entranceName: [
            {required: true, message: '请填写入口名称', trigger: 'change'}
          ],
          applicableCity: [
            {required: true, message: '请选择至少一个城市', trigger: 'change'},
          ],
          bill: [
            {required: true, type: 'array', min: 1, message: '请选择签约类型', trigger: 'change'},
            {type: 'array', max: 4, message: '请选择至少一种逻辑', trigger: 'change'}
          ],
          written: [
            {required: true, type: 'array', min: 1, message: '请选择签约类型', trigger: 'change'},
            {type: 'array', max: 4, message: '请选择至少一种逻辑', trigger: 'change'}
          ],

        },
        //绑定按钮点击后出现的form
        bindForm: {
          //入口
          entranceId: '',
          //流程
          procedureConfigId: '',
          procedureName: '',

          id: '',
          entranceName: ''
        },


        //流程配置id
        entranceProcedureConfigId: '',
        //初始化的时候是false，表示该modal是隐藏的
        addEntranceModal: false,
        //cityAfter
        cityAfter: [],
        //page 分页对象
        page: {
          prevPage: 0,
          nextPage: 0,
          //页面显示的数据个数
          pageSize: 10,
          count: 0,
          //初始化当前页是1
          currentPage: 1,

        },


        //品牌
        brandType: [
          {
            label: "58",
            value: "1",
          },
          {
            label: "赶集",
            value: "2",
          },
          {
            label: "安居客",
            value: "3",
          },
          {
            label: "英才",
            value: "4",
          },


        ],
        brandTypeModal: '',
        //签单类型
        writtenType: [
          {
            label: "全部",
            value: 0,
          },
          {
            label: "新签",
            value: 1,
          },
          {
            label: "续签",
            value: 2,
          },],
        writtenTypeModal: '',
        //订单来源类型
        sourceType: [{
          label: "58直线在线",
          value: 1,
        },
          {
            label: "AJK在线提单",
            value: 2,
          }, {
            label: "电子合同",
            value: 3,
          },
          {
            label: "AJK电子合同",
            value: 4,
          },],
        sourceTypeModal: '',

        bindEntranceModal: false,//控制绑定

        entranceColumn: [
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
          //   width: 60,
          //   fixed: 'left'
          // },
          {
            title: '入口名称',
            key: 'entranceName',
          },
          {
            title: '入口ID',
            key: 'entranceId',
          },
          {
            title: '品牌',
            key: 'brand',
            fixed: 'center'

          },
          {
            title: '适用城市',
            key: 'applicableCityName',
          },
          {
            title: '订单来源',
            key: 'source',
          },
          {
            title: '签单类型',
            key: 'written',
          },
          {
            title: '流程配置ID',
            key: 'procedureConfigId',
          },
          {
            title: '状态',
            key: 'state',
          },
          {
            title: 'Action',
            key: 'action',
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
                      this.showBind(params.index)
                    }
                  }
                }, '绑定'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.editEntrance(params.index)
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
                      this.showRemoveModal(params.index)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        entranceData: [],
        //下面是form表单
        saveEntranceForm: {
          //入口名称
          entranceName: '',

          //提单类型
          bill: [],

          goodsType: '',
          //商品单元
          goodsUnit: '',
          //商品线
          goodsLine: '',
          goodsUnitName: '',
          //新增城市绑定
          applicableCity: '',
          applicableCityName: '',
          //品牌
          brand: '',
          //签单类型
          written: [],

        },
        //新增适用城市
        addApplicableCity: city.city,
        goodsType: [],
        //商品单元
        goodsUnit: [],
        //商品线
        goodsLine: [],
        //提单入口
        billType: [
          {
            label: "全部",
            value: 1,
          },
          {
            label: "在线提单",
            value: 2,
          },
          {
            label: "BC提单",
            value: 3,
          },
        ],

      }

    },


  }

</script>

<style rel="stylesheet/less" lang="less">
</style>


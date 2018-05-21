<template>
  <div>
    <div>
      <div style="margin-top: 40px">

      </div>
      <br>
      <Tooltip content="点击按钮 增加逻辑区域按钮" placement="right">
      <Button v-for="element in logicSet" @click="fuck(element)" :type="element.type" :icon="element.icon"
              style="margin-left: 4px;margin-right: 4px">
        {{element.name}}
      </Button>
      </Tooltip>
    </div>
    <div style="margin-top: 40px">

    </div>
    <div id="tuozhuai_view">
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
                style="margin-left: 4px;margin-right: 4px">
          {{element.name}}
        </Button>
      </draggable>
      <br>
      <!--<draggable  v-model="logicSet" :options="{group:['human']}">-->
      <!--<Button v-for="element in logicSet" >{{element}}</Button>-->
      <!--</draggable>-->
      <!--{{logicSet}}-->
    </div>

  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    components: {
      draggable,
    },
    name: 'drag',
    data() {
      return {
        doubleCount: 0,
        fruit: [
          {name: '余额校验', id: '1', icon: 'social-yen', type: 'warning',notLogic:true},
          {name: '城市校验', id: '2', icon: 'location', type: 'warning',notLogic:true},
          {name: '类别校验', id: '3', icon: 'navicon-round', type: 'warning',notLogic:true},
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
      }
    },
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
            return !i.remove||i.notLogic;
          })
          this.doubleCount = 0;
        }
      }
    }
  }
</script>

<style>
  .vddl-list, .vddl-draggable {
    position: relative;
  }

  .vddl-list {
    min-height: 44px;
  }

  .vddl-dragging {
    opacity: 0.7;
  }

  .vddl-dragging-source {
    display: none;
  }
</style>

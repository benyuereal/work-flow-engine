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
      <Col span="16">
        &nbsp;
      </Col>
      <Col span="8">
        <span class="expand-key">节点规则: </span>
        <div style="margin-top: 20px"></div>

        <!--<Timeline pending style="float: left">-->
        <!--<TimelineItem>余额校验 || 版本校验</TimelineItem>-->
        <!--<TimelineItem>城市校验</TimelineItem>-->
        <!--</Timeline>-->

        <Timeline pending style="float: left">
        <TimelineItem>城市校验</TimelineItem>
        <TimelineItem>版本校验</TimelineItem>
        </Timeline>

      </Col>
      <!--<Col span="8">-->
      <!--&nbsp;-->
      <!--</Col>-->
    </Row>
  </div>
</template>
<script>
  export default {
    props: {
      row: Object
    }
    ,
    data() {
      return {
        value2: '1',


      }
    }
    ,
    methods: {
    }
  };
</script>
<style scoped>
  .expand-row {
    margin-bottom: 16px;
  }
</style>

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
        <span class="expand-value">{{ row.creatorId }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">创建时间: </span>
        <span class="expand-value">{{ row.createTimeStr }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">更新人: </span>
        <span class="expand-value">{{ row.modifierId }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <span class="expand-key">更新时间: </span>
        <span class="expand-value">{{ row.modifyTimeStr }}</span>
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
        &nbsp;

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

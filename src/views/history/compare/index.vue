<template>
  <PageWrapper title="同比环比分析">
    <a-card>
      <a-row>
        <a-col :md="18">
          <a-descriptions
            title="工艺参数超限次数同比环比分析"
            layout="vertical"
            :column="12"
            bordered
          >
            <template #extra>
              <a-select
                v-model:value="point"
                style="width: 400px"
                @change="onPointChange"
                :options="pointData.map((point) => ({ value: point['id'], label: point['name'] }))"
              />
            </template>
            <a-descriptions-item label="当日超限次数" :span="3">待统计</a-descriptions-item>
            <a-descriptions-item label="昨日超限次数" :span="3">待统计</a-descriptions-item>
            <a-descriptions-item label="上个月今日超限次数" :span="3">待统计</a-descriptions-item>
            <a-descriptions-item label="去年今日超限次数" :span="3">待统计</a-descriptions-item>
            <a-descriptions-item label="当月超限次数" :span="4">待统计</a-descriptions-item>
            <a-descriptions-item label="上个月超限次数" :span="4">待统计</a-descriptions-item>
            <a-descriptions-item label="去年当月超限次数" :span="4">待统计</a-descriptions-item>
            <a-descriptions-item label="今年超限次数" :span="6">待统计</a-descriptions-item>
            <a-descriptions-item label="去年超限次数" :span="6">待统计</a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :md="6">
          <Alert style="width: 80%; height: 88%; margin-top: 40px; margin-left: 20px" type="info">
            <template #message>
              <span style="font-size: 18px; font-weight: bold"
                >对于<span style="color: red; font-size: 22px">{{ '所有参数' }}</span
                >超限次数:<br />
                日同比<span style="color: red; font-size: 22px">{{ '上升1%' }}</span
                >,日环比<span style="color: red; font-size: 22px">{{ '下降1%' }}</span
                ><br />
                月同比<span style="color: red; font-size: 22px">{{ '上升1%' }}</span
                >,月环比<span style="color: red; font-size: 22px">{{ '下降1%' }}</span
                ><br />
                年同比<span style="color: red; font-size: 22px">{{ '上升1%' }}</span
                >。
              </span>
            </template></Alert
          ></a-col
        >
      </a-row>
      <Divider />
      <a-row>
        <a-col :md="18">
          <a-descriptions title="生产工序超员同比环比分析" layout="vertical" :column="12" bordered>
            <template #extra>
              <a-select placeholder="工序选择" size="large" style="width: 400px" label="工序选择" />
            </template>
            <a-descriptions-item label="当日超限次数" :span="3">待统计</a-descriptions-item>
            <a-descriptions-item label="昨日超限次数" :span="3">待统计</a-descriptions-item>
            <a-descriptions-item label="上个月今日超限次数" :span="3">待统计</a-descriptions-item>
            <a-descriptions-item label="去年今日超限次数" :span="3">待统计</a-descriptions-item>
            <a-descriptions-item label="当月超限次数" :span="4">待统计</a-descriptions-item>
            <a-descriptions-item label="上个月超限次数" :span="4">待统计</a-descriptions-item>
            <a-descriptions-item label="去年当月超限次数" :span="4">待统计</a-descriptions-item>
            <a-descriptions-item label="今年超限次数" :span="6">待统计</a-descriptions-item>
            <a-descriptions-item label="去年超限次数" :span="6">待统计</a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :md="6">
          <Alert style="width: 80%; height: 88%; margin-top: 40px; margin-left: 20px" type="info">
            <template #message>
              <span style="font-size: 18px; font-weight: bold"
                >对于<span style="color: red; font-size: 22px">{{ '所有工序' }}</span
                >超限次数:<br />
                日同比<span style="color: red; font-size: 22px">{{ '上升1%' }}</span
                >,日环比<span style="color: red; font-size: 22px">{{ '下降1%' }}</span
                ><br />
                月同比<span style="color: red; font-size: 22px">{{ '上升1%' }}</span
                >,月环比<span style="color: red; font-size: 22px">{{ '下降1%' }}</span
                ><br />
                年同比<span style="color: red; font-size: 22px">{{ '上升1%' }}</span
                >。
              </span>
            </template></Alert
          ></a-col
        >
      </a-row>
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { Form, Select, Descriptions, Card, Row, Col, Alert, Divider } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { ref, onMounted } from 'vue';
  import { pointOptionListApi } from '/@/api/warn/select';

  export default {
    components: {
      AFormItem: Form.Item,
      AForm: Form,
      ASelect: Select,
      ASelectOption: Select.SelectOption,
      [Card.name]: Card,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
      PageWrapper,
      ARow: Row,
      ACol: Col,
      Alert,
      Divider,
    },
    setup() {
      const pointData = ref([]);

      const point = ref(-1);

      onMounted(() => {
        getPoints();
      });

      const getPoints = async () => {
        pointData.value = await pointOptionListApi();
      };

      const onPointChange = () => {
        console.log(point.value);
      };

      return { pointData, point, onPointChange };
    },
  };
</script>

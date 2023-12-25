<template>
  <PageWrapper title="同比环比分析">
    <a-card>
      <a-row>
        <a-col :md="18">
          <a-descriptions
            :title="`工艺${indexName}次数同比环比分析`"
            layout="vertical"
            :column="12"
            bordered
          >
            <template #extra>
              <a-select
                v-model:value="point"
                size="large"
                style="width: 400px"
                @change="onPointChange"
                :options="pointData.map((point) => ({ value: point['id'], label: point['name'] }))"
              />
            </template>
            <a-descriptions-item :label="`当月${indexName}次数`" :span="4">{{
              paramBenchmark.month !== null ? paramBenchmark.month : '暂无数据'
            }}</a-descriptions-item>
            <a-descriptions-item :label="`上个月${indexName}次数`" :span="4">{{
              paramBenchmark.lastMonth !== null ? paramBenchmark.lastMonth : '暂无数据'
            }}</a-descriptions-item>
            <a-descriptions-item :label="`去年当月${indexName}次数`" :span="4">{{
              paramBenchmark.lastYearMonth !== null ? paramBenchmark.lastYearMonth : '暂无数据'
            }}</a-descriptions-item>
            <a-descriptions-item :label="`当季${indexName}次数`" :span="4">{{
              paramBenchmark.quarter !== null ? paramBenchmark.quarter : '暂无数据'
            }}</a-descriptions-item>
            <a-descriptions-item :label="`上季${indexName}次数`" :span="4">{{
              paramBenchmark.lastQuarter !== null ? paramBenchmark.lastQuarter : '暂无数据'
            }}</a-descriptions-item>
            <a-descriptions-item :label="`去年当季${indexName}次数`" :span="4">{{
              paramBenchmark.lastYearQuarter !== null ? paramBenchmark.lastYearQuarter : '暂无数据'
            }}</a-descriptions-item>
            <a-descriptions-item :label="`今年${indexName}次数`" :span="6">{{
              paramBenchmark.year !== null ? paramBenchmark.year : '暂无数据'
            }}</a-descriptions-item>
            <a-descriptions-item :label="`去年${indexName}次数`" :span="6">{{
              paramBenchmark.lastYear !== null ? paramBenchmark.lastYear : '暂无数据'
            }}</a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :md="6">
          <Alert style="width: 80%; height: 88%; margin-top: 40px; margin-left: 20px" type="info">
            <template #message>
              <span style="font-size: 18px; font-weight: bold"
                >对于<span style="color: red; font-size: 22px">{{ pointName }}</span
                >{{ indexName }}次数:<br />
                月同比<span style="color: red; font-size: 22px"
                  >{{ paramBenchmark.month > paramBenchmark.lastMonth ? '上升' : '下降'
                  }}{{ paramBenchmark.monthOverMonth.toFixed(2) }}%</span
                >
                <!-- ,月环比<span style="color: red; font-size: 22px"
                  >{{ paramBenchmark.month > paramBenchmark.lastYearMonth ? '上升' : '下降'
                  }}{{ paramBenchmark.monthOnMonth.toFixed(2) }}%</span
                > -->
                <br />
                季同比<span style="color: red; font-size: 22px"
                  >{{ paramBenchmark.quarter > paramBenchmark.lastQuarter ? '上升' : '下降'
                  }}{{ paramBenchmark.quarterOverQuarter.toFixed(2) }}%</span
                >
                <!-- ,季环比<span style="color: red; font-size: 22px"
                  >{{ paramBenchmark.quarter > paramBenchmark.lastYearQuarter ? '上升' : '下降'
                  }}{{ paramBenchmark.quarterOnQuarter.toFixed(2) }}%</span
                ><br /> -->
                <!-- 年同比<span style="color: red; font-size: 22px"
                  >{{ paramBenchmark.year > paramBenchmark.lastYear ? '上升' : '下降'
                  }}{{ paramBenchmark.yearOverYear.toFixed(2) }}%</span
                >。 -->
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
              <a-select
                placeholder="工序选择"
                size="large"
                v-model:value="camera"
                style="width: 400px"
                @change="onCameraChange"
                :options="
                  cameraData.map((camera) => ({
                    value: camera['id'],
                    label: camera['name'],
                  }))
                "
              />
            </template>
            <a-descriptions-item label="当月超限次数" :span="4">{{
              inspectionBenchmark.month !== null ? inspectionBenchmark.month : '暂无数据'
            }}</a-descriptions-item>
            <a-descriptions-item label="上个月超限次数" :span="4">{{
              inspectionBenchmark.lastMonth !== null ? inspectionBenchmark.lastMonth : '暂无数据'
            }}</a-descriptions-item>
            <a-descriptions-item label="去年当月超限次数" :span="4">{{
              inspectionBenchmark.lastYearMonth !== null
                ? inspectionBenchmark.lastYearMonth
                : '暂无数据'
            }}</a-descriptions-item>
            <a-descriptions-item label="当季超限次数" :span="4">{{
              inspectionBenchmark.quarter !== null ? inspectionBenchmark.quarter : '暂无数据'
            }}</a-descriptions-item>
            <a-descriptions-item label="上季超限次数" :span="4">{{
              inspectionBenchmark.lastQuarter !== null ? inspectionBenchmark.lastQuarter : 0
            }}</a-descriptions-item>
            <a-descriptions-item label="去年当季超限次数" :span="4">{{
              inspectionBenchmark.lastYearQuarter !== null
                ? inspectionBenchmark.lastYearQuarter
                : '暂无数据'
            }}</a-descriptions-item>
            <a-descriptions-item label="今年超限次数" :span="6">{{
              inspectionBenchmark.year !== null ? inspectionBenchmark.year : '暂无数据'
            }}</a-descriptions-item>
            <a-descriptions-item label="去年超限次数" :span="6">{{
              inspectionBenchmark.lastYear !== null ? inspectionBenchmark.lastYear : '暂无数据'
            }}</a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :md="6">
          <Alert style="width: 80%; height: 88%; margin-top: 40px; margin-left: 20px" type="info">
            <template #message>
              <span style="font-size: 18px; font-weight: bold"
                >对于<span style="color: red; font-size: 22px">{{ cameraName }}</span
                >超限次数:<br />
                月同比<span style="color: red; font-size: 22px"
                  >{{ inspectionBenchmark.month > inspectionBenchmark.lastMonth ? '上升' : '下降'
                  }}{{ inspectionBenchmark.monthOverMonth.toFixed(2) }}%</span
                >
                <!-- ,月环比<span style="color: red; font-size: 22px"
                  >{{
                    inspectionBenchmark.month > inspectionBenchmark.lastYearMonth ? '上升' : '下降'
                  }}{{ inspectionBenchmark.monthOnMonth.toFixed(2) }}%</span
                > -->
                <br />
                季同比<span style="color: red; font-size: 22px"
                  >{{
                    inspectionBenchmark.quarter > inspectionBenchmark.lastQuarter ? '上升' : '下降'
                  }}{{ inspectionBenchmark.quarterOverQuarter.toFixed(2) }}%</span
                >
                <!-- ,季环比<span style="color: red; font-size: 22px"
                  >{{
                    inspectionBenchmark.quarter > inspectionBenchmark.lastYearQuarter
                      ? '上升'
                      : '下降'
                  }}{{ inspectionBenchmark.quarterOnQuarter.toFixed(2) }}%</span
                ><br /> -->
                <!-- 年同比<span style="color: red; font-size: 22px"
                  >{{ inspectionBenchmark.year > inspectionBenchmark.lastYear ? '上升' : '下降'
                  }}{{ inspectionBenchmark.yearOverYear.toFixed(2) }}%</span
                >。 -->
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
  import { pointOptionListApi, cameraListApi } from '/@/api/warn/select';
  import { getParamBenchmark, getInspectionBenchmark } from '/@/api/warn/statistic';

  export default {
    components: {
      ASelect: Select,
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
      const cameraData = ref([]);
      const indexName = ref('');
      indexName.value = parseInt(localStorage.getItem('plantId')) === 3 ? '故障停机' : '参数超限';

      const point = ref(-1);
      const camera = ref(-1);

      const pointName = ref<string | undefined>('所有参数');
      const cameraName = ref<string | undefined>('所有工序');

      const paramBenchmark = ref({
        month: 0,
        quarter: 0,
        year: 0,
        lastMonth: 0,
        lastQuarter: 0,
        lastYearMonth: 0,
        lastYearQuarter: 0,
        lastYear: 0,
        monthOverMonth: 0,
        monthOnMonth: 0,
        quarterOverQuarter: 0,
        quarterOnQuarter: 0,
        yearOverYear: 0,
      });
      const inspectionBenchmark = ref({
        month: 0,
        quarter: 0,
        year: 0,
        lastMonth: 0,
        lastQuarter: 0,
        lastYearMonth: 0,
        lastYearQuarter: 0,
        lastYear: 0,
        monthOverMonth: 0,
        monthOnMonth: 0,
        quarterOverQuarter: 0,
        quarterOnQuarter: 0,
        yearOverYear: 0,
      });

      onMounted(() => {
        getPoints();
        getCameras();
      });

      const getPoints = async () => {
        pointData.value = await pointOptionListApi();
        getParamData();
      };
      async function getCameras() {
        cameraData.value = await cameraListApi(1);
        getInspectionData();
      }

      async function getParamData() {
        const data = await getParamBenchmark(point.value);
        console.log(data);
        paramBenchmark.value = data;
      }
      async function getInspectionData() {
        const data = await getInspectionBenchmark(camera.value);
        console.log(data);
        inspectionBenchmark.value = data;
      }

      const onPointChange = () => {
        console.log(point.value);
        pointName.value = pointData.value.find((item) => item['id'] == point.value)?.name;
        getParamData();
      };
      const onCameraChange = () => {
        console.log(camera.value);
        cameraName.value = cameraData.value.find((item) => item['id'] == camera.value)?.name;

        getInspectionData();
      };

      return {
        pointData,
        cameraData,
        point,
        camera,
        onPointChange,
        onCameraChange,
        paramBenchmark,
        inspectionBenchmark,
        pointName,
        cameraName,
        indexName,
      };
    },
  };
</script>

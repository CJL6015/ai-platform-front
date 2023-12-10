<template>
  <PageWrapper title="设备超限相关性分析">
    <a-card>
      <div class="border border-gray-400" style="padding: 5px">
        <a-row>
          <a-col :span="12"
            ><Alert type="info">
              <template #message>
                <span style="color: blue; font-size: 18px; font-weight: bold"
                  >支持度:A、B两个设备(或测点)同时发生超限的概率
                </span>
              </template>
            </Alert>
            <Alert type="error" style="margin-top: 10px">
              <template #message>
                <span style="color: red; font-size: 18px; font-weight: bold"
                  >置信度:A设备(测点)发生超限的情况下,B设备(测点)发生超限的概率
                </span>
              </template>
            </Alert>
            <Alert type="success" style="margin-top: 10px">
              <template #message>
                <span style="color: green; font-size: 18px; font-weight: bold"
                  >提升度:A设备(测点)发生超限,对B设备(测点)的概率提升了多少
                </span>
              </template>
            </Alert>
          </a-col>
          <a-col :span="1" />
          <a-col :span="11">
            <h2 style="margin-top: 10px; margin-left: 20px"><b>阈值选择:</b></h2>
            <a-row>
              <a-col :span="3" />
              <a-col :span="10">
                <a-slider
                  v-model:value="inputValue1"
                  :min="0"
                  :max="1"
                  :step="0.01"
                  :marks="{
                    0.5: '0.5',
                    1.0: '1.0',
                  }"
                >
                  <template #mark="{ label, point }">
                    <strong>{{ label }}</strong>
                  </template></a-slider
                >
              </a-col>
              <a-col :span="4">
                <a-input-number
                  v-model:value="inputValue1"
                  :min="0"
                  :max="1"
                  :step="0.01"
                  style="margin-left: 16px"
                />
              </a-col>
              <a-col :span="4">
                <a-button type="primary" @click="getChartData">确定</a-button>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>

      <div
        class="grid md:grid-cols-1 gap-1 border border-gray-400"
        style="margin-top: 10px; padding: 10px"
      >
        <div>
          <Alert type="warning" style="width: 100%">
            <template #message>
              <span style="font-size: 18px; font-weight: bold"
                >同时出现超限概率较大的设备组合包括:<br />
                <span v-for="(item, index) in group" :key="index">
                  {{ index + 1 }}.<span style="color: red; font-size: 22px">{{ item[0] }}</span
                  >,支持度为<span style="color: red; font-size: 22px">{{ item[1] }}</span
                  ><br
                /></span>
              </span>
            </template> </Alert
        ></div>
      </div>
      <BasicTable @register="registerTable" />
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { ref, onMounted } from 'vue';
  import { Button, Card, Alert, Row, Col, Slider, InputNumber } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getPointRule } from '/@/api/risk/score';
  import { columns } from './point.data';

  export default {
    components: {
      ARow: Row,
      ACol: Col,
      PageWrapper,
      ACard: Card,
      Alert,
      ASlider: Slider,
      AInputNumber: InputNumber,
      BasicTable,
      AButton: Button,
    },
    setup() {
      const inputValue1 = ref(0.1);
      const group = ref([]);

      const [registerTable, methods] = useTable({
        columns,
        formConfig: {
          labelWidth: 120,
        },
        pagination: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
      });

      async function getChartData() {
        const id = 1;
        const params = {
          limit: inputValue1.value,
        };
        const result = await getPointRule(id, params);
        console.log(result);
        methods.setTableData(result['table']);
        group.value = result['groupData'];
      }

      onMounted(() => {
        getChartData();
      });

      return {
        inputValue1,
        registerTable,
        getChartData,
        group,
      };
    },
  };
</script>
./point.data

import { on } from 'codemirror';
<template>
  <div
    ><h1 style="text-align: center"><b>集团安全性综合监控</b></h1
    ><a-row>
      <a-col :md="16"> <div ref="chartRef1" style="height: 870px; widows: 100%"></div></a-col
      ><a-col :md="8">
        <a-row>
          <a-col :md="12">
            <div style="border: 1px solid #ccc; text-align: center"><h3>集团安全评分</h3></div>

            <div ref="chartRef2" style="widows: 100%; height: 200px; border: 1px solid #ccc"></div>
          </a-col>
          <a-col :md="12">
            <div style="border: 1px solid #ccc; text-align: center"><h3>集团产线投运比</h3></div>

            <div ref="chartRef3" style="widows: 100%; height: 200px; border: 1px solid #ccc"></div>
          </a-col>
        </a-row>
        <h3 style="text-align: center">动态标杆产线及公司</h3>
        <a-descriptions size="middle" :column="2" bordered>
          <a-descriptions-item label="对比类目">公司</a-descriptions-item>
          <a-descriptions-item label="产线">安全分值</a-descriptions-item>
          <a-descriptions-item label="分子公司">{{ plantData.sub1 }}</a-descriptions-item>
          <a-descriptions-item label="">{{ plantData.score1 }}</a-descriptions-item>
          <a-descriptions-item label="乳化产线">{{ plantData.sub2 }}</a-descriptions-item>
          <a-descriptions-item :label="plantData.line1">{{ plantData.score2 }}</a-descriptions-item>
          <a-descriptions-item label="膨化产线">{{ plantData.sub3 }}</a-descriptions-item>
          <a-descriptions-item :label="plantData.line2">{{ plantData.score3 }}</a-descriptions-item>
          <a-descriptions-item label="雷管产线">{{ plantData.sub4 }}</a-descriptions-item>
          <a-descriptions-item :label="plantData.line3">{{ plantData.score4 }}</a-descriptions-item>
          <!-- <a-descriptions-item label="成品仓库">荆门公司</a-descriptions-item>
          <a-descriptions-item label="14号仓库">100</a-descriptions-item> -->
        </a-descriptions>
        <h3 style="text-align: center">待提升产线及公司</h3>
        <a-descriptions size="middle" :column="2" bordered>
          <a-descriptions-item label="对比类目">公司</a-descriptions-item>
          <a-descriptions-item label="产线">安全分值</a-descriptions-item>
          <a-descriptions-item label="分子公司">{{ plantData.sub5 }}</a-descriptions-item>
          <a-descriptions-item label="">{{ plantData.score5 }}</a-descriptions-item>
          <a-descriptions-item label="乳化产线">{{ plantData.sub6 }}</a-descriptions-item>
          <a-descriptions-item :label="plantData.line4">{{ plantData.score6 }}</a-descriptions-item>
          <a-descriptions-item label="膨化产线">{{ plantData.sub7 }}</a-descriptions-item>
          <a-descriptions-item :label="plantData.line5">{{ plantData.score7 }}</a-descriptions-item>
          <a-descriptions-item label="雷管产线">{{ plantData.sub8 }}</a-descriptions-item>
          <a-descriptions-item :label="plantData.line6">{{ plantData.score8 }}</a-descriptions-item>
          <!-- <a-descriptions-item label="成品仓库">荆门公司</a-descriptions-item>
          <a-descriptions-item label="14号仓库">89</a-descriptions-item> -->
        </a-descriptions></a-col
      ></a-row
    >
    <div class="grid md:grid-cols-4 gap-0">
      <a-card style="width: 99%; height: 350px" title="分子公司">
        <template #cover>
          <div ref="chartRef4" style="height: 250px; widows: 100%"></div>
        </template>
      </a-card>
      <a-card style="width: 99%; height: 350px" title="乳化产线">
        <template #cover>
          <div ref="chartRef5" style="height: 250px; widows: 100%"></div>
        </template>
      </a-card>
      <a-card style="width: 99%; height: 350px" title="膨化产线">
        <template #cover>
          <div ref="chartRef6" style="height: 250px; widows: 100%"></div>
        </template>
      </a-card>
      <a-card style="width: 99%; height: 350px" title="雷管产线">
        <template #cover>
          <div ref="chartRef7" style="height: 250px; widows: 100%"></div>
        </template>
      </a-card>
    </div>
    <a-modal v-model:visible="open" centered title="选择生产线" @ok="handleOk">
      <a-form style="margin-top: 10px" :label-col="labelCol">
        <a-form-item label="生产线" name="line">
          <a-select
            v-model:value="line"
            style="width: 90%"
            :options="lineData.map((line) => ({ value: line['id'], label: line['name'] }))"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
  import { ref, Ref, onMounted, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { Form, Select, Row, Col, Card, Descriptions, Modal } from 'ant-design-vue';
  import { registerMap } from 'echarts';
  import { useGo } from '/@/hooks/web/usePage';
  import { lineOptionListApi } from '/@/api/warn/select';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { router } from '/@/router';
  import { useUserStore } from '/@/store/modules/user';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { getMainScore, getMainRatio, getMainTrend } from '/@/api/score/score';

  export default {
    components: {
      ACard: Card,
      ARow: Row,
      ACol: Col,
      ADescriptions: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
      AFormItem: Form.Item,
      AForm: Form,
      ASelect: Select,
      AModal: Modal,
    },
    setup() {
      const { closeOther } = useTabs(router);
      closeOther();
      const open = ref<boolean>(false);
      const go = useGo();
      const chartRef1 = ref<HTMLDivElement | null>(null);
      const chartRef2 = ref<HTMLDivElement | null>(null);
      const chartRef3 = ref<HTMLDivElement | null>(null);
      const chartRef4 = ref<HTMLDivElement | null>(null);
      const chartRef5 = ref<HTMLDivElement | null>(null);
      const chartRef6 = ref<HTMLDivElement | null>(null);
      const chartRef7 = ref<HTMLDivElement | null>(null);
      const chartRef8 = ref<HTMLDivElement | null>(null);
      const { setOptions: setOptions1, getInstance } = useECharts(chartRef1 as Ref<HTMLDivElement>);
      const { setOptions: setOptions2 } = useECharts(chartRef2 as Ref<HTMLDivElement>);
      const { setOptions: setOptions3 } = useECharts(chartRef3 as Ref<HTMLDivElement>);
      const { setOptions: setOptions4 } = useECharts(chartRef4 as Ref<HTMLDivElement>);
      const { setOptions: setOptions5 } = useECharts(chartRef5 as Ref<HTMLDivElement>);
      const { setOptions: setOptions6 } = useECharts(chartRef6 as Ref<HTMLDivElement>);
      const { setOptions: setOptions7 } = useECharts(chartRef7 as Ref<HTMLDivElement>);
      const { setOptions: setOptions8 } = useECharts(chartRef8 as Ref<HTMLDivElement>);

      const plantData = ref({
        sub1: '',
        sub2: '荆门公司',
        sub3: '荆门公司',
        sub4: '凌河公司',
        sub5: '',
        sub6: '荆门公司',
        sub7: '荆门公司',
        sub8: '凌河公司',
        line1: '乳化三线',
        line2: '膨化产线',
        line3: '',
        line4: '乳化三线',
        line5: '膨化产线',
        line6: '',
        score1: 0,
        score2: 0,
        score3: 0,
        score4: 0,
        score5: 0,
        score6: 0,
        score7: 0,
        score8: 0,
      });
      onMounted(async () => {
        const json = (await (await import('./china.json')).default) as any;
        registerMap('china', json);

        getInstance().on('click', function (params) {
          openModel(params);
        });

        setMainScore();

        setMainRatio();

        serTrend();

        setOptions1({
          backgroundColor: '#1d5885',
          geo: {
            map: 'china',
            silent: true,
            itemStyle: {
              color: '#004981',
              borderColor: 'rgb(54,192,118)',
            },
            zoom: 1.8,
          },
          series: [
            {
              zlevel: 1,
              type: 'effectScatter',
              coordinateSystem: 'geo',
              itemStyle: {
                //坐标点颜色
                normal: {
                  show: true,
                  color: '#f4e925',
                  shadowBlur: 10,
                  shadowColor: '#333',
                },
                emphasis: {
                  areaColor: '#f4e925',
                },
              },
              label: {
                formatter: '{b}',
                position: 'right',
                show: true,
              },
              data: [
                {
                  name: '荆门总部',
                  value: [112.204251, 31.03542, 2],
                },
                {
                  name: '辽宁凌河',
                  value: [121.15089, 41.11496, 3],
                },
              ],
            },
            {
              type: 'lines',
              zlevel: 0,
              effect: {
                show: true,
                period: 10,
                trailLength: 0.7,
                color: '#fff',
                symbol: 'arrow',
                symbolSize: 6,
              },
              lineStyle: {
                normal: {
                  color: '#fff',
                  width: 1.5,
                  curveness: 0.2,
                  shadowColor: '#fff',
                },
              },
              data: [
                {
                  fromName: 1,
                  toName: 1,
                  coords: [
                    [112.204251, 31.03542, 100],
                    [121.15089, 41.11496],
                  ],
                },
              ],
            },
          ],
        });
      });

      const line = ref(-1);
      const lineData = ref([]);
      const userStore = useUserStore();
      const { changeRole } = usePermission();

      const handleOk = async () => {
        open.value = false;
        localStorage.setItem('lineId', line.value);
        let token = userStore.getToken;
        token = token.replace('store', '').replace('line', '');
        if (line.value === 5) {
          await changeRole(RoleEnum.STORE);
          go('/storehouse/store');
        } else if (token.includes('admin')) {
          if (parseInt(localStorage.getItem('plantId')) === 3) {
            await changeRole([RoleEnum.SUPER, RoleEnum.LEIGUAN, RoleEnum.LEVEL1]);
          } else {
            await changeRole([RoleEnum.SUPER, RoleEnum.LINE, RoleEnum.LEVEL1]);
          }
          go('/warn/history');
        } else if (parseInt(localStorage.getItem('plantId')) === 3) {
          if (token.includes('level1')) {
            await changeRole([RoleEnum.LEIGUAN, RoleEnum.LEVEL1]);
          } else if (token.includes('level2')) {
            await changeRole([RoleEnum.LEIGUAN, RoleEnum.LEVEL2]);
          } else {
            await changeRole([RoleEnum.LEIGUAN, RoleEnum.LEVEL3]);
          }

          go('/monitor/overcrowd');
        } else {
          if (token.includes('level1')) {
            await changeRole([RoleEnum.LINE, RoleEnum.LEVEL1]);
          } else if (token.includes('level2')) {
            await changeRole([RoleEnum.LINE, RoleEnum.LEVEL2]);
          } else {
            await changeRole([RoleEnum.LINE, RoleEnum.LEVEL3]);
          }
          go('/monitor/overcrowd');
        }
      };
      async function openModel(params) {
        if (params['componentSubType'] === 'effectScatter') {
          localStorage.setItem('plantId', params['data']['value'][2]);
          lineData.value = await lineOptionListApi(params['data']['value'][2]);
          open.value = true;
          line.value = lineData.value[0]['id'];
          localStorage.setItem('reload', 'true');
        }
      }

      async function setMainScore() {
        // const data = await getMainScore();
      }

      async function setMainRatio() {
        const data = await getMainRatio();
        setOptions3({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          series: [
            {
              name: '本月刷新异常比',
              type: 'pie',
              radius: [0, 80],
              center: ['50%', '50%'],
              data: [
                { value: data.run, name: '投运时间' },
                { value: data.stop, name: '停机时间' },
              ],
              label: {
                show: false,
              },
            },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        });
      }

      async function serTrend() {
        const data = await getMainTrend();

        setOptions2({
          series: [
            {
              type: 'gauge',
              progress: {
                show: true,
                width: 6,
              },
              axisLine: {
                lineStyle: {
                  width: 5,
                },
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                length: 10,
                lineStyle: {
                  width: 1,
                  color: '#999',
                },
              },
              axisLabel: {
                distance: 2,
                color: '#999',
                fontSize: 10,
              },
              anchor: {
                show: true,
                showAbove: true,
                size: 1,
                itemStyle: {
                  borderWidth: 1,
                },
              },
              title: {
                show: false,
              },
              detail: {
                valueAnimation: true,
                fontSize: 20,
                offsetCenter: [0, '50%'],
              },
              data: [
                {
                  value: ((data[0] + data[1]) / 2).toFixed(2),
                },
              ],
            },
          ],
        });

        setOptions4({
          xAxis: {
            type: 'category',
            data: [
              '荆门总部',
              '辽宁凌河分公司',
              '子公司',
              '子公司',
              '子公司',
              '子公司',
              '子公司',
              '子公司',
              '子公司',
              '子公司',
            ],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [data[0], data[1], 80, 80, 80, 80, 80, 80, 80, 80],
              type: 'bar',
            },
          ],
        });

        setOptions5({
          xAxis: {
            type: 'category',
            data: [
              '荆门乳化3线',
              '子产线',
              '子产线',
              '子产线',
              '子产线',
              '子产线',
              '子产线',
              '子产线',
              '子产线',
            ],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [data[2], 80, 80, 80, 80, 80, 80, 80, 80],
              type: 'bar',
            },
          ],
        });

        setOptions6({
          xAxis: {
            type: 'category',
            data: [
              '荆门膨化生产线',
              '子产线',
              '子产线',
              '子产线',
              '子产线',
              '子产线',
              '子产线',
              '子产线',
              '子产线',
            ],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [data[3], 80, 80, 80, 80, 80, 80, 80, 80],
              type: 'bar',
            },
          ],
        });

        setOptions7({
          xAxis: {
            type: 'category',
            data: [
              '雷管生产线A',
              '雷管生产线B',
              '子产线',
              '子产线',
              '子产线',
              '子产线',
              '子产线',
              '子产线',
              '子产线',
              '子产线',
            ],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [data[4], data[5], 80, 80, 80, 80, 80, 80, 80, 80],
              type: 'bar',
            },
          ],
        });

        if (data[0] > data[1]) {
          plantData.value.sub1 = '荆门公司';
          plantData.value.score1 = data[0];

          plantData.value.sub5 = '凌河公司';
          plantData.value.score5 = data[1];
        } else {
          plantData.value.sub1 = '凌河公司';
          plantData.value.score1 = data[1];

          plantData.value.sub5 = '荆门公司';
          plantData.value.score5 = data[0];
        }

        plantData.value.score2 = data[2];
        plantData.value.score3 = data[3];
        plantData.value.score6 = data[2];
        plantData.value.score7 = data[3];

        if (data[4] > data[5]) {
          plantData.value.line3 = '雷管3期A线';
          plantData.value.line6 = '雷管3期B线';
          plantData.value.score4 = data[4];
          plantData.value.score8 = data[5];
        } else {
          plantData.value.line3 = '雷管3期B线';
          plantData.value.line6 = '雷管3期A线';
          plantData.value.score4 = data[5];
          plantData.value.score8 = data[4];
        }
      }

      const labelCol = { style: { width: '80px' } };

      return {
        chartRef1,
        chartRef2,
        chartRef3,
        chartRef4,
        chartRef5,
        chartRef6,
        chartRef7,
        chartRef8,
        handleOk,
        line,
        lineData,
        open,
        labelCol,
        plantData,
      };
    },
  };
</script>

<template>
  <BasicModal @register="register" title="趋势详情" width="1200px">
    <div class="grid md:grid-cols-3 gap-0">
      <div v-show="show" :ref="charts[0]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[1]" :ref="charts[1]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[2]" :ref="charts[2]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[3]" :ref="charts[3]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[4]" :ref="charts[4]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[5]" :ref="charts[5]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[6]" :ref="charts[6]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[7]" :ref="charts[7]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[8]" :ref="charts[8]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[9]" :ref="charts[9]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[10]" :ref="charts[10]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[11]" :ref="charts[11]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[12]" :ref="charts[12]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[13]" :ref="charts[13]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[14]" :ref="charts[14]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[15]" :ref="charts[15]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[16]" :ref="charts[16]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[17]" :ref="charts[17]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[18]" :ref="charts[18]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[19]" :ref="charts[19]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[20]" :ref="charts[20]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[21]" :ref="charts[21]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[22]" :ref="charts[22]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[23]" :ref="charts[23]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[24]" :ref="charts[24]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[25]" :ref="charts[25]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[26]" :ref="charts[26]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[27]" :ref="charts[27]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[28]" :ref="charts[28]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[29]" :ref="charts[29]" style="width: 100%; height: 300px"></div>
      <div v-show="chartShow[30]" :ref="charts[30]" style="width: 100%; height: 300px"></div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { ref, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  export default {
    components: { BasicModal },
    props: {
      point: { type: Object },
    },
    setup() {
      let charts = [];
      let chartShow = ref([]);
      for (let i = 0; i < 31; i++) {
        charts.push(ref<HTMLDivElement | null>(null));
        chartShow.value.push(false);
      }
      const show = ref(true);

      let setOptionFunc = [];
      for (let chart of charts) {
        const { setOptions } = useECharts(chart as Ref<HTMLDivElement>);
        setOptionFunc.push(setOptions);
      }

      async function onDataReceive(data) {
        const detailData = data;
        console.log(detailData);
        const equipments = detailData.equipments;
        const values = detailData.data;
        const times = detailData.times;
        for (let i = 0; i < values.length; i++) {
          let indicator = [];
          const max = Math.max(...values[i]);
          chartShow.value[i] = true;
          for (let equipment of equipments) {
            indicator.push({
              name: equipment,
              max: max,
            });
          }
          setOptionFunc[i]({
            title: {
              text: times[i],
            },
            radar: {
              indicator: indicator,
            },
            series: [
              {
                type: 'radar',
                data: [
                  {
                    value: values[i],
                  },
                ],
              },
            ],
          });
        }

        for (let i = values.length; i < charts.length; i++) {
          chartShow.value[i] = false;
        }
      }
      const [register] = useModalInner((data) => {
        data && onDataReceive(data);
      });
      return {
        register,
        charts,
        chartShow,
        show,
      };
    },
  };
</script>

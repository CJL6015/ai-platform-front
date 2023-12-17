<template>
  <PageWrapper title="预警规则数据管理" contentFullHeight>
    <a-card>
      <a-form layout="inline" :model="formData" :label-col="labelCol" @finish="submitForm">
        <a-col :md="6">
          <a-form-item label="公司" name="plant">
            <a-select
              v-model:value="formData.plant"
              style="width: 100%"
              @change="onPlantChange"
              :options="plantData.map((plant) => ({ value: plant['id'], label: plant['name'] }))"
              disabled
            />
          </a-form-item>
        </a-col>
        <a-col :md="6">
          <a-form-item label="生产线" name="line">
            <a-select
              v-model:value="formData.line"
              style="width: 100%"
              disabled
              :options="lineData.map((line) => ({ value: line['id'], label: line['name'] }))"
            />
          </a-form-item>
        </a-col>
        <a-col :md="3">
          <a-form-item>
            <a-button type="primary" html-type="submit">确定</a-button>
            <a-button type="primary" style="margin-left: 10px" @click="updateConfig">保存</a-button>
          </a-form-item>
        </a-col>
      </a-form>
      <a-divider orientation="center"> 定员人数阈值设定 </a-divider>
      <a-form :model="ruleData" :label-col="labelCol">
        <div class="grid md:grid-cols-2 gap-4">
          <a-form-item label="制药工序人员上限">
            <a-form-item name="input-number" no-style>
              <a-input-number
                v-model:value="ruleData.pharmaceuticalProcessLimit"
                :min="1"
                :max="24"
              />
            </a-form-item> </a-form-item
          ><a-form-item label="包装工序人员上限">
            <a-form-item name="input-number" no-style>
              <a-input-number v-model:value="ruleData.packagingProcessLimit" :min="1" :max="24" />
            </a-form-item>
          </a-form-item>
          <a-form-item label="装药工序人员上限">
            <a-form-item name="input-number" no-style>
              <a-input-number v-model:value="ruleData.fillingProcessLimit" :min="1" :max="24" />
            </a-form-item>
          </a-form-item>
          <a-form-item label="装车工序人员上限">
            <a-form-item name="input-number" no-style>
              <a-input-number v-model:value="ruleData.loadingProcessLimit" :min="1" :max="24" />
            </a-form-item>
          </a-form-item>
          <a-form-item label="生产线总人员上限">
            <a-form-item name="input-number" no-style>
              <a-input-number v-model:value="ruleData.totalLimit" :min="1" :max="24" />
            </a-form-item>
          </a-form-item>
        </div>
      </a-form>
      <a-divider orientation="center"> 运行参数阈值设定 </a-divider>
      <div>
        <BasicTable @register="registerTable" @edit-end="handleEdit" />
      </div>
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, toRaw } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card, Form, FormItem, InputNumber, Divider, Col, Select } from 'ant-design-vue';
  import { getWarnRuleConfig, updateWarnRuleConfig } from '/@/api/data/config';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { optionListApi, lineOptionListApi } from '/@/api/warn/select';
  import { pointListApi, updatePoint } from '/@/api/warn/point';
  import { columns } from './point.data';
  import { BasicTable, useTable } from '/@/components/Table';

  export default defineComponent({
    components: {
      PageWrapper,
      ACard: Card,
      AForm: Form,
      AFormItem: FormItem,
      AInputNumber: InputNumber,
      ADivider: Divider,
      ASelect: Select,
      ACol: Col,
      BasicTable,
    },
    setup() {
      const labelCol = { style: { width: '120px' } };

      const { createMessage } = useMessage();
      let plantData = ref([]);
      let lineData = ref([]);
      const formData = ref({
        plant: -1,
        line: -1,
      });

      onMounted(async () => {
        const options = await optionListApi();
        plantData.value = options.plantOptions;
        lineData.value = options.linesOptions;
        formData.value.plant = localStorage.getItem('plantId')
          ? parseInt(localStorage.getItem('plantId'))
          : plantData.value[0]['id'];
        await onPlantChange(formData.value.plant);
        setConfig(formData.value.line);
        getTable(formData.value.line);
      });

      const submitForm = () => {
        setConfig(formData.value.line);
        getTable(formData.value.line);
      };

      const onPlantChange = async (value) => {
        lineData.value = await lineOptionListApi(value);
        formData.value.line = parseInt(localStorage.getItem('lineId'));
      };

      const ruleData = ref({
        pharmaceuticalProcessLimit: 1,
        packagingProcessLimit: 1,
        fillingProcessLimit: 1,
        loadingProcessLimit: 1,
        totalLimit: 4,
      });

      const setConfig = async function (id) {
        const config = await getWarnRuleConfig(id);
        ruleData.value.pharmaceuticalProcessLimit = config.pharmaceuticalProcessLimit;
        ruleData.value.packagingProcessLimit = config.packagingProcessLimit;
        ruleData.value.fillingProcessLimit = config.fillingProcessLimit;
        ruleData.value.loadingProcessLimit = config.loadingProcessLimit;
        ruleData.value.totalLimit = config.totalLimit;
      };

      const updateConfig = async () => {
        const config = toRaw(ruleData.value);
        const res = await updateWarnRuleConfig(formData.value.line, config);
        if (res) {
          createMessage.success('更新成功');
        } else {
          createMessage.error('更新失败,请重试');
        }
      };

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

      let tableData;
      const getTable = async (id) => {
        tableData = await pointListApi(id);
        for (let d of tableData) {
          if (!d.upperLimit) {
            d.upperLimit = '-';
          }
          if (!d.lowerLimit) {
            d.lowerLimit = '-';
          }
          if (!d.upperUpperLimit) {
            d.upperUpperLimit = '-';
          }
          if (!d.lowerLowerLimit) {
            d.lowerLowerLimit = '-';
          }
          if (!d.duration) {
            d.duration = '待统计';
          }
        }
        methods.setTableData(tableData);
      };

      async function handleEdit({ index, key, value }) {
        tableData[index][key] = value;
        console.log(tableData[index]);
        const params = {
          id: tableData[index].id,
        };
        params[key] = value;
        const res = await updatePoint(params);
        console.log(res);
        if (res) {
          createMessage.success('更新成功');
        } else {
          createMessage.error('更新失败,请重试');
        }
      }
      return {
        labelCol,
        ruleData,
        formData,
        onPlantChange,
        updateConfig,
        submitForm,
        plantData,
        lineData,
        registerTable,
        handleEdit,
      };
    },
  });
</script>

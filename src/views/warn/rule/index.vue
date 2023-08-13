<template>
  <PageWrapper title="预警规则数据管理" contentFullHeight>
    <a-card>
      <UnitPointSelect />
      <a-divider orientation="center"> 定员人数阈值设定 </a-divider>
      <a-form :model="ruleData" :label-col="labelCol">
        <div class="grid md:grid-cols-2 gap-4">
          <a-form-item label="制药工序人员上限">
            <a-form-item name="input-number" no-style>
              <a-input-number v-model:value="ruleData.p1" :min="1" :max="24" />
            </a-form-item> </a-form-item
          ><a-form-item label="包装工序人员上限">
            <a-form-item name="input-number" no-style>
              <a-input-number v-model:value="ruleData.p1" :min="1" :max="24" />
            </a-form-item>
          </a-form-item>
          <a-form-item label="装药工序人员上限">
            <a-form-item name="input-number" no-style>
              <a-input-number v-model:value="ruleData.p1" :min="1" :max="24" />
            </a-form-item>
          </a-form-item>
          <a-form-item label="装车工序人员上限">
            <a-form-item name="input-number" no-style>
              <a-input-number v-model:value="ruleData.p1" :min="1" :max="24" />
            </a-form-item>
          </a-form-item>
        </div>
      </a-form>
      <a-divider orientation="center"> 运行参数阈值设定 </a-divider>
      <PointTable />
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import UnitPointSelect from '../components/UnitPointSelect.vue';
  import PointTable from './PointTable.vue';
  import { Card, Form, FormItem, InputNumber, Divider } from 'ant-design-vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);

  export default defineComponent({
    components: {
      PageWrapper,
      UnitPointSelect,
      ACard: Card,
      AForm: Form,
      AFormItem: FormItem,
      AInputNumber: InputNumber,
      ADivider: Divider,
      PointTable,
    },
    setup() {
      const labelCol = { style: { width: '120px' } };

      const ruleData = reactive<Record<string, any>>({
        p1: 1,
        p2: 1,
        p3: 1,
        p4: 1,
      });

      return {
        loading,
        labelCol,
        ruleData,
      };
    },
  });
</script>

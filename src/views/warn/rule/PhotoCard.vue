<template>
  <a-divider />
  <a-row>
    <a-col :md="12">
      <a-card>
        <a-row>
          <a-col :md="12">
            <a-image
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              width="100%"
            />
          </a-col>
          <a-col :md="12">
            <a-image
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              width="100%"
            />
          </a-col>
        </a-row>
        <a-row>
          <a-col :md="12">
            <a-image
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              width="100%"
            />
          </a-col>
          <a-col :md="12">
            <a-image
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              width="100%"
            />
          </a-col>
        </a-row>
        <a-card-meta>
          <template #title>
            <a-row>
              <a-col :md="18">
                <div align="center" style="font-size: large"
                  >上次生产线定员抓拍图像<br />2023-07-23 12:00:00</div
                ></a-col
              >
              <a-col :md="4" style="display: grid; place-items: center">
                <div align="center" style="color: #55d187; font-size: 30px">未超限</div></a-col
              >
            </a-row>
          </template>
        </a-card-meta>
      </a-card>
    </a-col>
    <a-col :md="12">
      <a-card>
        <a-image
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          width="100%"
        />
        <a-card-meta>
          <template #title>
            <a-row>
              <a-col :md="18" style="display: grid; place-items: center">
                <div align="center" style="font-size: large"
                  >上次生产线定员抓拍图像<br />2023-07-23 12:00:00</div
                ></a-col
              >
              <a-col :md="4" style="display: grid; place-items: center">
                <div align="center" style="color: #55d187; font-size: 30px">未超限</div></a-col
              >
            </a-row>
          </template>
        </a-card-meta>
      </a-card></a-col
    >
  </a-row>
</template>

<script lang="ts">
  import { Card, CardMeta, Divider, Col, Row, Image } from 'ant-design-vue';
  import { h } from 'vue';
  import { CheckCircleTwoTone } from '@ant-design/icons-vue';

  export default {
    components: {
      ACard: Card,
      ACardMeta: CardMeta,
      ADivider: Divider,
      ACol: Col,
      ARow: Row,
      AImage: Image,
    },
    setup() {
      return { h, CheckCircleTwoTone };
    },
  };
</script>

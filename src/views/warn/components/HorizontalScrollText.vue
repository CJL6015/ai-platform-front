<template>
  <div class="horizontal-scroll-text">
    <div class="scroll-container" ref="scrollContainer">
      <div class="scroll-content" ref="scrollContent">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const text = 'XX公司XX生产线本月5测点出现过超限,超限时间占运行时间的20%';

  const scrollContainer = ref<HTMLElement | null>(null);
  const scrollContent = ref<HTMLElement | null>(null);

  onMounted(() => {
    if (scrollContainer.value && scrollContent.value) {
      const containerWidth = scrollContainer.value.offsetWidth;
      const contentWidth = scrollContent.value.offsetWidth;

      if (contentWidth > containerWidth) {
        const animationDuration = contentWidth * 20; // 调整滚动速度
        scrollContent.value.style.animation = `scroll ${animationDuration}ms linear infinite`;
      }
    }
  });
</script>

<style scoped>
  .horizontal-scroll-text {
    width: 100%;
    overflow: hidden;
  }

  .scroll-container {
    display: flex;
    overflow: hidden;
    white-space: nowrap;
  }

  .scroll-content {
    display: inline-block;
    padding-right: 20px;
    animation: scroll;
    animation-duration: 10s; /* 设置一个合适的滚动速度 */
    animation-play-state: running;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: normal;
    color: #333; /* 文字颜色 */
    font-size: 16px; /* 文字大小 */
  }

  @keyframes scroll {
    0% {
      transform: translateX(100%);
    }

    100% {
      transform: translateX(-100%);
    }
  }
</style>

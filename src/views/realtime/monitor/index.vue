<template>
  <div>
    <div v-html="svgHtml"></div>
    <Trend @register="registerModal" />
  </div>
</template>
<script lang="ts" setup>
  import { getPointsValues, getPointsLimits } from '/@/api/data/point';
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  import Trend from '../../warn/components/Trend.vue';
  import { useModal } from '/@/components/Modal';

  const [registerModal, { openModal }] = useModal();
  let timer = null;
  let limits = {};
  let lineId = localStorage.getItem('lineId');
  const svgHtml = ref('');

  onMounted(async () => {
    let svgPath = lineId === '2' ? '/src/assets/svg/svg2.svg' : '/src/assets/svg/svg1.svg';
    const response = await fetch(svgPath);
    if (response.ok) {
      const svgContent = await response.text();
      svgHtml.value = svgContent;
    } else {
      console.error('Failed to load SVG file');
    }
    const formattedTextElements = document.querySelectorAll('text[id^="KL"]');
    console.log(formattedTextElements);
    const formattedTextElementsArray = Array.from(formattedTextElements);
    let points: any[] = [];
    formattedTextElementsArray.forEach((element) => {
      const id = element.getAttribute('id');
      element.addEventListener('click', pointClick.bind(this, element.id));
      element.style.cursor = 'pointer';
      points.push(id);
    });
    getLimits(points);
    timer = setInterval(() => {
      getValues(points);
    }, 1000);
  });

  onBeforeUnmount(() => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  });

  const pointClick = (id) => {
    openModal(true, {
      name: id,
    });
  };

  const getLimits = async (points) => {
    const params = {
      names: points.join(','),
    };
    limits = await getPointsLimits(params);
  };

  const getValues = async (points) => {
    if (points.length === 0) {
      const formattedTextElements = document.querySelectorAll('text[id^="KL"]');
      console.log(formattedTextElements);
      const formattedTextElementsArray = Array.from(formattedTextElements);
      formattedTextElementsArray.forEach((element) => {
        const id = element.getAttribute('id');
        element.addEventListener('click', pointClick.bind(this, element.id));
        element.style.cursor = 'pointer';
        points.push(id);
      });
      getLimits(points);
    }
    const params = {
      names: points.join(','),
    };
    const values = await getPointsValues(params);
    for (let i = 0; i < points.length; i++) {
      const textElement = document.getElementById(points[i]);
      const tspanElement = textElement.querySelector('tspan');
      tspanElement.textContent = values[i].toFixed(2);
      const pointLimit = limits[points[i]];
      console.log(points[i], limits, pointLimit);
      if (
        pointLimit &&
        ((pointLimit[0] && values[i] < pointLimit[0]) ||
          (pointLimit[1] && values[i] > pointLimit[1]))
      ) {
        textElement.style.fill = 'red';
      } else {
        textElement.style.fill = 'blue';
      }
    }
  };
</script>

<style scoped>
  [id^='KL']:hover {
    cursor: pointer;
  }
</style>

<template>
  <div id="app">
    <div class="container">
      <roller-swiper ref="swiperRef">
        <template v-for="item in list" v-slot:[`slider-${item}`]>
          <div class="slider-demo">{{ item }}</div>
        </template>
      </roller-swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RollerSwiper from "../components/RollerSwiper.vue";

const list = ref([1, 2, 3, 4, 5, 6]);
const swiperRef = ref<InstanceType<typeof RollerSwiper> | null>(null);
</script>

<style scoped>
#app {
  height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 400px;
  aspect-ratio: 1;
  margin: 0 auto;
}

.slider-demo {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 72px;
  font-weight: bold;
  background: #34495e;
  color: #41b883;
  border-radius: 50%;
}
</style>

<template>
  <div id="app">
    <div class="container">
      <roller-swiper ref="swiperRef">
        <template v-for="item in list" v-slot:[`slider-${item}`]>
          <div class="slider-demo">
            {{ item }}
          </div>
        </template>
      </roller-swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RollerSwiper from "../components/RollerSwiper.vue";

const list = ref([1, 2, 3]);
const swiperRef = ref<InstanceType<typeof RollerSwiper> | null>(null);
</script>

<style scoped>
.container {
  width: 800px;
  aspect-ratio: 1;
  margin: 0 auto;
}

.slider-demo {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: #000;
}
</style>

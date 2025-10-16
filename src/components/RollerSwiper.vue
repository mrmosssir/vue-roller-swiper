<template>
  <div class="roller-swiper">
    <div class="roller-swiper__wrapper">
      <template v-for="(slot, index) in sliderSlots" :key="slot">
        <div
          class="roller-swiper__slider"
          v-if="[prevIndex, current, nextIndex].includes(index + 1)"
          :data-id="index + 1"
          :class="{
            'roller-swiper__slider--prev': index + 1 === prevIndex,
            'roller-swiper__slider--active': index + 1 === current,
            'roller-swiper__slider--next': index + 1 === nextIndex,
          }"
        >
          <div class="roller-swiper__slider--inner">
            <slot :name="slot"></slot>
          </div>
        </div>
      </template>
    </div>
    <div class="roller-swiper__control">
      <slot name="prev">
        <button class="roller-swiper__prev" @click="directMethodsMap.prev">
          PREV
        </button>
      </slot>

      <slot name="next">
        <button class="roller-swiper__next" @click="directMethodsMap.next">
          NEXT
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, useSlots } from "vue";

const props = defineProps({
  autoPlay: {
    type: Boolean,
    default: false,
  },
  delay: {
    type: Number,
    default: 3000,
  },
  ccw: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();

// test data
const list = ref(5);

const current = ref(1);
const prevIndex = ref(current.value === 1 ? list.value : current.value - 1);
const nextIndex = ref(current.value === list.value ? 1 : current.value + 1);

const controlsDebounce = ref(false);
const interval = ref<NodeJS.Timeout | null>(null);

const sliderSlots = computed(() => {
  return Object.keys(slots).filter((slot) => slot.startsWith("slider-"));
});

const directMethodsMap = computed(() => {
  return {
    prev: props.ccw ? next : prev,
    next: props.ccw ? prev : next,
  };
});

const setEnableSlider = () => {
  prevIndex.value = current.value === 1 ? list.value : current.value - 1;
  nextIndex.value = current.value === list.value ? 1 : current.value + 1;
};

const prev = async () => {
  current.value = current.value === list.value ? 1 : current.value + 1;
  setEnableSlider();
  controlsDebounce.value = true;
};

const next = () => {
  current.value = current.value === 1 ? list.value : current.value - 1;
  setEnableSlider();
  controlsDebounce.value = true;
};

const jump = async (target: number) => {
  // 計算正向距離（next 方向）
  const nextDistance =
    target > current.value
      ? target - current.value
      : list.value - current.value + target;

  // 計算反向距離（prev 方向）
  const prevDistance =
    current.value > target
      ? current.value - target
      : current.value + (list.value - target);

  // 選擇最短路徑(true: next, false: prev)
  const direct = nextDistance <= prevDistance;

  while (current.value !== target) {
    direct ? directMethodsMap.value.next() : directMethodsMap.value.prev();
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
};

onMounted(() => {
  // 有開啟 autoPlay 就啟動 interval
  if (props.autoPlay) {
    interval.value = setInterval(() => {
      if (controlsDebounce.value) {
        controlsDebounce.value = false;
        return;
      }
      next();
    }, props.delay);
  }
});

defineExpose({ prev, next, jump });
</script>

<style scoped>
.roller-swiper {
  width: inherit;
  height: 100%;
  position: relative;
}

.roller-swiper__wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.roller-swiper__slider {
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  transition: all 0.3s cubic-bezier(0.5, 1, 0.89, 1);
}

.roller-swiper__slider--inner {
  width: 100%;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.11, 0, 0.5, 0);
}

/* .roller-swiper__slider::after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.11, 0, 0.5, 0);
} */

.roller-swiper__slider--prev {
  transform: translateX(-30%);
}

.roller-swiper__slider--prev .roller-swiper__slider--inner {
  transform: translateY(-100%);
}

.roller-swiper__slider--active {
  transform: translateX(0);
  opacity: 1;
}

.roller-swiper__slider--active .roller-swiper__slider--inner {
  transform: translateY(0);
}

.roller-swiper__slider--next {
  transform: translateX(-30%);
}

.roller-swiper__slider--next .roller-swiper__slider--inner {
  transform: translateY(100%);
}

.roller-swiper__control {
  position: absolute;
  top: 0;
  right: 0;
}
</style>

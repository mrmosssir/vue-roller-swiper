<template>
  <div
    class="roller-swiper"
    :style="{
      '--roller-swiper__duration': props.duration + 'ms',
      '--roller-swiper__direction': props.ccw ? -1 : 1,
    }"
  >
    <div class="roller-swiper__wrapper">
      <template v-for="(slot, index) in sliderSlots" :key="slot">
        <div
          class="roller-swiper__slider"
          v-if="[prevIndex, current, nextIndex].includes(index)"
          :data-id="index"
          :class="{
            'roller-swiper__slider--prev': index === prevIndex,
            'roller-swiper__slider--active': index === current,
            'roller-swiper__slider--next': index === nextIndex,
          }"
        >
          <div class="roller-swiper__slider--inner">
            <slot :name="slot"></slot>
          </div>
        </div>
      </template>
    </div>
    <div
      class="roller-swiper__control"
      v-if="sliderSlots.length > 1 && props.showControls"
    >
      <slot name="prev">
        <button class="roller-swiper__prev" @click="handleChangeSlider('prev')">
          &#9650
        </button>
      </slot>

      <slot name="next">
        <button class="roller-swiper__next" @click="handleChangeSlider('next')">
          &#9660
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, onBeforeUnmount, useSlots } from "vue";

const props = defineProps({
  // Enable automatic slideshow
  autoPlay: {
    type: Boolean,
    default: true,
  },
  // Auto play delay in milliseconds
  delay: {
    type: Number,
    default: 3000,
  },
  // Swiper make ccw roller
  ccw: {
    type: Boolean,
    default: false,
  },
  // Animation duration in milliseconds
  duration: {
    type: Number,
    default: 300,
  },
  // Show controls
  showControls: {
    type: Boolean,
    default: true,
  },
});

const slots = useSlots();

const current = ref(0);
const prevIndex = ref(0);
const nextIndex = ref(0);

const animationDebounce = ref(false);
const controlsDebounce = ref(false);
const interval = ref<NodeJS.Timeout | null>(null);

const sliderSlots = computed(() => {
  return Object.keys(slots).filter((slot) => slot.startsWith("slider-"));
});

const handleChangeSlider = async (direction: "prev" | "next") => {
  // Check animation debounce
  if (animationDebounce.value) return;

  // Set animation in progress
  animationDebounce.value = true;

  // Set current index based on direction
  current.value = direction === "prev" ? prevIndex.value : nextIndex.value;
  prevIndex.value =
    (current.value - 1 + sliderSlots.value.length) % sliderSlots.value.length;
  nextIndex.value = (current.value + 1) % sliderSlots.value.length;

  // Set auto play controls debounce
  controlsDebounce.value = true;

  // Set false after animation duration
  await new Promise((resolve) => setTimeout(resolve, props.duration));
  animationDebounce.value = false;
};

const set = async (target: number) => {
  // Check animation debounce && current slider is not target
  if (animationDebounce.value || current.value === target) return;

  // Set animation in progress and auto play debounce
  animationDebounce.value = true;
  controlsDebounce.value = true;

  // Calculate forward distance (next direction)
  const nextDistance =
    target > current.value
      ? target - current.value
      : sliderSlots.value.length - current.value + target;

  // Calculate backward distance (prev direction)
  const prevDistance =
    current.value > target
      ? current.value - target
      : current.value + (sliderSlots.value.length - target);

  // Do roller while not reach target
  while (current.value !== target) {
    current.value =
      nextDistance > prevDistance ? prevIndex.value : nextIndex.value;
    prevIndex.value =
      (current.value - 1 + sliderSlots.value.length) % sliderSlots.value.length;
    nextIndex.value = (current.value + 1) % sliderSlots.value.length;
    await new Promise((resolve) => setTimeout(resolve, props.duration));
  }

  animationDebounce.value = false;
};

onBeforeMount(() => {
  prevIndex.value =
    (current.value - 1 + sliderSlots.value.length) % sliderSlots.value.length;
  nextIndex.value = (current.value + 1) % sliderSlots.value.length;

  // Start interval if autoPlay is enabled
  if (props.autoPlay) {
    interval.value = setInterval(() => {
      if (controlsDebounce.value) {
        controlsDebounce.value = false;
        return;
      }
      handleChangeSlider("next");
    }, props.delay);
  }
});

onBeforeUnmount(() => {
  // Clear interval on component unmount
  if (interval.value) {
    clearInterval(interval.value);
  }
});

defineExpose({
  prev: handleChangeSlider("prev"),
  next: handleChangeSlider("next"),
  set,
});
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
}

.roller-swiper__slider--inner {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.roller-swiper__slider--prev {
  transform: translateX(-30%);
  transition: all var(--roller-swiper__duration) cubic-bezier(0.11, 0, 0.5, 0);
}

.roller-swiper__slider--prev .roller-swiper__slider--inner {
  transform: translateY(calc(100% * var(--roller-swiper__direction)));
  transition: all var(--roller-swiper__duration) cubic-bezier(0.5, 1, 0.89, 1);
}

.roller-swiper__slider--active {
  transform: translateX(0);
  opacity: 1;
  transition: all var(--roller-swiper__duration) cubic-bezier(0.5, 1, 0.89, 1);
}

.roller-swiper__slider--active .roller-swiper__slider--inner {
  transform: translateY(0);
  transition: all var(--roller-swiper__duration) cubic-bezier(0.11, 0, 0.5, 0);
}

.roller-swiper__slider--next {
  transform: translateX(-30%);
  transition: all var(--roller-swiper__duration) cubic-bezier(0.11, 0, 0.5, 0);
}

.roller-swiper__slider--next .roller-swiper__slider--inner {
  transform: translateY(calc(-100% * var(--roller-swiper__direction)));
  transition: all var(--roller-swiper__duration) cubic-bezier(0.5, 1, 0.89, 1);
}

.roller-swiper__control {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.roller-swiper__prev,
.roller-swiper__next {
  border-radius: 50%;
  border-width: 0;
  width: 36px;
  height: 36px;
  cursor: pointer;
  color: gray;
}
</style>

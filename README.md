# Vue Roller Swiper

A modern Vue 3 carousel component with arc motion effects, touch gestures, and smooth animations.

[![NPM Version](https://img.shields.io/npm/v/vue-roller-swiper.svg?style=flat)](https://npmjs.org/package/vue-roller-swiper)
[![NPM Downloads](https://img.shields.io/npm/dm/vue-roller-swiper.svg?style=flat)](https://npmjs.org/package/vue-roller-swiper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Vue 3 Composition API** - Built with modern Vue 3 and TypeScript
- 📱 **Touch Gestures** - Full touch and swipe support for mobile devices
- 🖱️ **Mouse Wheel** - Navigate with mouse wheel
- ↔️ **Arc Motion** - Unique curved transition animations using different easing functions
- 🔄 **Auto Play** - Configurable automatic slideshow
- 🎨 **Customizable** - Flexible slot system for custom content
- 📐 **Smart Navigation** - Calculates shortest path for jumping between slides
- ⚡ **Lightweight** - Minimal bundle size with zero dependencies
- 🔧 **TypeScript** - Full TypeScript support with type definitions

## 📦 Installation

```bash
npm install vue-roller-swiper
```

## 🚀 Quick Start

### Global Registration

```javascript
import { createApp } from "vue";
import VueRollerSwiper from "vue-roller-swiper";
import "vue-roller-swiper/dist/style.css";

const app = createApp(App);
app.use(VueRollerSwiper);
```

### Usage in Components

```vue
<template>
  <RollerSwiper :auto-play="true" :delay="3000" ref="swiperRef">
    <template #slider-1>
      <div class="slide">Slide 1</div>
    </template>
    <template #slider-2>
      <div class="slide">Slide 2</div>
    </template>
    <template #slider-3>
      <div class="slide">Slide 3</div>
    </template>
  </RollerSwiper>
</template>

<script setup>
import { ref } from "vue";

const swiperRef = ref();

// Jump to specific slide
const jumpToSlide = (index) => {
  swiperRef.value?.jump(index);
};
</script>
```

## 📚 API Reference

### Props

| Prop       | Type    | Default | Description                     |
| ---------- | ------- | ------- | ------------------------------- |
| `autoPlay` | Boolean | `false` | Enable automatic slideshow      |
| `delay`    | Number  | `3000`  | Auto play delay in milliseconds |
| `ccw`      | Boolean | `false` | Swiper make ccw roller          |

### Slots

The component uses named slots for content:

```vue
<RollerSwiper>
  <template #slider-1>Your first slide content</template>
  <template #slider-2>Your second slide content</template>
  <template #slider-3>Your third slide content</template>
  <!-- Add more slides as needed -->
</RollerSwiper>
```

You can also use with v-for:

```vue
<RollerSwiper>
  <template v-for="index in num" v-slot:[`slider-${index}`]>
    Your slide content
  </template>
</RollerSwiper>
```

### Methods

Access these methods via template ref:

| Method        | Parameters      | Description                                 |
| ------------- | --------------- | ------------------------------------------- |
| `next()`      | -               | Move to next slide                          |
| `prev()`      | -               | Move to previous slide                      |
| `jump(index)` | `index: number` | Jump to specific slide (uses shortest path) |

### Example with Methods

```vue
<template>
  <div>
    <RollerSwiper ref="swiperRef">
      <template #slider-1>Slide 1</template>
      <template #slider-2>Slide 2</template>
      <template #slider-3>Slide 3</template>
    </RollerSwiper>

    <div class="controls">
      <button @click="goToPrevious">Previous</button>
      <button @click="goToNext">Next</button>
      <button @click="jumpToSlide(3)">Jump to Slide 3</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const swiperRef = ref();

const goToPrevious = () => {
  swiperRef.value?.prev();
};

const goToNext = () => {
  swiperRef.value?.next();
};

const jumpToSlide = (index) => {
  swiperRef.value?.jump(index);
};
</script>
```

## 🎨 Styling

The component comes with default styles, but you can customize them:

```css
.roller-swiper {
  /* Container styles */
  width: 100%;
  height: 400px;
}

.roller-swiper__slider {
  /* Individual slide styles */
}

.roller-swiper__slider--active {
  /* Active slide styles */
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vue 3](https://vuejs.org/)
- Bundled with [Vite](https://vitejs.dev/)
- Styled with modern CSS animations

---

Made with ❤️ for the Vue.js community

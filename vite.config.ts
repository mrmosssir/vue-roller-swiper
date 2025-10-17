import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    // Library build mode
    return {
      plugins: [
        vue(),
        dts({
          insertTypesEntry: true,
          include: ["src/**/*"],
          exclude: ["src/demo/**/*"],
          rollupTypes: true,
        }),
      ],
      build: {
        lib: {
          entry: resolve(__dirname, "src/index.ts"),
          name: "RollerSwiper",
          fileName: (format) => `vue-roller-swiper.${format}.js`,
          formats: ["es", "umd"],
        },
        rollupOptions: {
          external: ["vue"],
          output: {
            globals: {
              vue: "Vue",
            },
          },
        },
      },
      resolve: {
        alias: {
          "@": resolve(__dirname, "src"),
        },
      },
    };
  }

  // Development mode
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});

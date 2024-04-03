// vite.config.ts
import react from "file:///home/sasha/tide/keycloak/js/node_modules/.pnpm/@vitejs+plugin-react-swc@3.6.0_vite@5.2.6/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "node:path";
import peerDepsExternal from "file:///home/sasha/tide/keycloak/js/node_modules/.pnpm/rollup-plugin-peer-deps-external@2.2.4_rollup@4.13.0/node_modules/rollup-plugin-peer-deps-external/dist/rollup-plugin-peer-deps-external.js";
import { defineConfig } from "file:///home/sasha/tide/keycloak/js/node_modules/.pnpm/vite@5.2.6_@types+node@20.11.30_lightningcss@1.24.1/node_modules/vite/dist/node/index.js";
import { checker } from "file:///home/sasha/tide/keycloak/js/node_modules/.pnpm/vite-plugin-checker@0.6.4_eslint@8.57.0_typescript@5.4.3_vite@5.2.6/node_modules/vite-plugin-checker/dist/esm/main.js";
import dts from "file:///home/sasha/tide/keycloak/js/node_modules/.pnpm/vite-plugin-dts@3.7.3_@types+node@20.11.30_rollup@4.13.0_typescript@5.4.3_vite@5.2.6/node_modules/vite-plugin-dts/dist/index.mjs";
import { libInjectCss } from "file:///home/sasha/tide/keycloak/js/node_modules/.pnpm/vite-plugin-lib-inject-css@2.0.1_vite@5.2.6/node_modules/vite-plugin-lib-inject-css/dist/index.js";
var __vite_injected_original_dirname = "/home/sasha/tide/keycloak/js/libs/ui-shared";
var vite_config_default = defineConfig({
  build: {
    target: "esnext",
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/main.ts"),
      formats: ["es"]
    },
    rollupOptions: {
      plugins: [
        peerDepsExternal({
          includeDependencies: true
        })
      ]
    }
  },
  plugins: [
    react(),
    libInjectCss(),
    checker({ typescript: true }),
    dts({ insertTypesEntry: true })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9zYXNoYS90aWRlL2tleWNsb2FrL2pzL2xpYnMvdWktc2hhcmVkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9zYXNoYS90aWRlL2tleWNsb2FrL2pzL2xpYnMvdWktc2hhcmVkL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Nhc2hhL3RpZGUva2V5Y2xvYWsvanMvbGlicy91aS1zaGFyZWQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHBlZXJEZXBzRXh0ZXJuYWwgZnJvbSBcInJvbGx1cC1wbHVnaW4tcGVlci1kZXBzLWV4dGVybmFsXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgY2hlY2tlciB9IGZyb20gXCJ2aXRlLXBsdWdpbi1jaGVja2VyXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcbmltcG9ydCB7IGxpYkluamVjdENzcyB9IGZyb20gXCJ2aXRlLXBsdWdpbi1saWItaW5qZWN0LWNzc1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6IFwiZXNuZXh0XCIsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvbWFpbi50c1wiKSxcbiAgICAgIGZvcm1hdHM6IFtcImVzXCJdLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgcGx1Z2luczogW1xuICAgICAgICBwZWVyRGVwc0V4dGVybmFsKHtcbiAgICAgICAgICBpbmNsdWRlRGVwZW5kZW5jaWVzOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgbGliSW5qZWN0Q3NzKCksXG4gICAgY2hlY2tlcih7IHR5cGVzY3JpcHQ6IHRydWUgfSksXG4gICAgZHRzKHsgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSB9KSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVCxPQUFPLFdBQVc7QUFDclUsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sc0JBQXNCO0FBQzdCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFNBQVM7QUFDaEIsU0FBUyxvQkFBb0I7QUFON0IsSUFBTSxtQ0FBbUM7QUFTekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBLE1BQ0gsT0FBTyxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQzVDLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFNBQVM7QUFBQSxRQUNQLGlCQUFpQjtBQUFBLFVBQ2YscUJBQXFCO0FBQUEsUUFDdkIsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sYUFBYTtBQUFBLElBQ2IsUUFBUSxFQUFFLFlBQVksS0FBSyxDQUFDO0FBQUEsSUFDNUIsSUFBSSxFQUFFLGtCQUFrQixLQUFLLENBQUM7QUFBQSxFQUNoQztBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

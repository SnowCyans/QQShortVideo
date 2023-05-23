import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

export default {
  base: "./", //默认/配置文件的根目录为相对路径
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
};

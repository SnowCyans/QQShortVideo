import { createApp } from "vue";

import "./style.css";
import "amfe-flexible";
import App from "./App.vue";
import router from "./router/index";
import pinia from "./store/index";
import { Popup, Toast, setToastDefaultOptions } from "vant";
setToastDefaultOptions({ duration: 800 }); //修改轻提示默认配置
import "vant/es/toast/style"; //轻提示样式

const app = createApp(App);
app.use(Popup);
app.use(Toast);
app.use(router);
app.use(pinia);
app.mount("#app");

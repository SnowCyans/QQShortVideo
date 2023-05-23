import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state() {
    return {
      token: localStorage.getItem("Qy") || "",
    };
  },
  actions: {
    // 给token赋值 将其数据持久化
    dataLongTime() {
      this.token = "QQ";
      localStorage.setItem("Qy", this.token);
      location.reload();
    },
  },
});

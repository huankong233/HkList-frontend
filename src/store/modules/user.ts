import { defineStore } from "pinia";
import { store, routerArrays, storageLocal } from "../utils";
import { useMultiTagsStoreHook } from "./multiTags";
import { router, resetRouter } from "@/router";

export const useUserStore = defineStore({
  id: "pure-user",
  state: () => ({
    admin_password: storageLocal().getItem("admin_password") ?? null
  }),
  actions: {
    /** 登入 */
    async loginByPassword({ admin_password }) {
      this.admin_password = admin_password;
      // TODO: 测试有效性
      storageLocal().setItem("admin_password", admin_password);
      return true;
    },
    /** 前端登出（不调用接口） */
    logOut() {
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      storageLocal().setItem("admin_password", null);
      router.push("/login");
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}

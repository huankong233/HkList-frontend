import { defineStore } from "pinia";
import { store, routerArrays, storageLocal, type userType } from "../utils";
import { useMultiTagsStoreHook } from "./multiTags";
import { router, resetRouter } from "@/router";

export const userKey = "admin_password";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    admin_password: storageLocal().getItem(userKey) ?? null
  }),
  actions: {
    /** 登入 */
    async loginByPassword({ admin_password }) {
      this.admin_password = admin_password;
      // TODO: 测试有效性
      storageLocal().setItem(userKey, admin_password);
      return true;
    },
    /** 前端登出（不调用接口） */
    logOut() {
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      storageLocal().setItem(userKey, null);
      router.push("/login");
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}

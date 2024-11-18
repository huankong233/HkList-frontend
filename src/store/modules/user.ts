import { defineStore } from "pinia";
import { store, routerArrays, storageLocal, type userType } from "../utils";
import { useMultiTagsStoreHook } from "./multiTags";
import { router, resetRouter } from "@/router";
import { checkPassword } from "@/api/admin/check_password.js";

export const userKey = "admin_password";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    admin_password: storageLocal().getItem(userKey) ?? null
  }),
  actions: {
    /** 登入 */
    async loginByPassword({ admin_password }) {
      await checkPassword({ admin_password });
      this.admin_password = admin_password;
      storageLocal().setItem(userKey, admin_password);
    },
    /** 登出 */
    logout() {
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

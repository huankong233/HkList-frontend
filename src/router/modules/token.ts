import { $t } from "@/plugins/i18n";

export default {
  path: "/token",
  redirect: "/token/list",
  meta: {
    icon: "ep:key",
    title: $t("admin.token.name"),
    rank: 2
  },
  children: [
    {
      path: "/token/list",
      name: "token-list",
      component: () => import("@/views/token/list.vue"),
      meta: {
        title: $t("admin.token.list")
      }
    },
    {
      path: "/token/add",
      name: "token-add",
      component: () => import("@/views/token/add.vue"),
      meta: {
        title: $t("admin.token.add")
      }
    }
  ]
} satisfies RouteConfigsTable;

import { $t } from "@/plugins/i18n";

export default {
  path: "/account",
  redirect: "/account/list",
  meta: {
    icon: "mdi:account",
    title: $t("admin.account.name"),
    rank: 1
  },
  children: [
    {
      path: "/account/list",
      name: "account-list",
      component: () => import("@/views/account/list.vue"),
      meta: {
        title: $t("admin.account.list")
      }
    },
    {
      path: "/account/add",
      name: "account-add",
      component: () => import("@/views/account/add.vue"),
      meta: {
        title: $t("admin.account.add")
      }
    }
  ]
} satisfies RouteConfigsTable;

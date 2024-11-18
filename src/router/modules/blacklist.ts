import { $t } from "@/plugins/i18n";

export default {
  path: "/blackList",
  redirect: "/blackList/list",
  meta: {
    icon: "ep:list",
    title: $t("admin.blackList.name"),
    rank: 3
  },
  children: [
    {
      path: "/blackList/list",
      name: "blackList-list",
      component: () => import("@/views/blackList/list.vue"),
      meta: {
        title: $t("admin.blackList.list")
      }
    },
    {
      path: "/blackList/add",
      name: "blackList-add",
      component: () => import("@/views/blackList/add.vue"),
      meta: {
        title: $t("admin.blackList.add")
      }
    }
  ]
} satisfies RouteConfigsTable;

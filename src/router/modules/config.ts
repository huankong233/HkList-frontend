import { $t } from "@/plugins/i18n";

export default {
  path: "/config",
  redirect: "/config/general",
  meta: {
    icon: "mynaui:config",
    title: $t("admin.config.name"),
    rank: 4
  },
  children: [
    {
      path: "/config/general",
      name: "config-general",
      component: () => import("@/views/config/general.vue"),
      meta: {
        title: $t("admin.config.general.name")
      }
    },
    {
      path: "/config/limit",
      name: "config-limit",
      component: () => import("@/views/config/limit.vue"),
      meta: {
        title: $t("admin.config.limit.name")
      }
    },
    {
      path: "/config/parse",
      name: "config-parse",
      component: () => import("@/views/config/parse.vue"),
      meta: {
        title: $t("admin.config.parse.name")
      }
    },
    {
      path: "/config/mail",
      name: "config-mail",
      component: () => import("@/views/config/mail.vue"),
      meta: {
        title: $t("admin.config.mail.name")
      }
    }
  ]
} satisfies RouteConfigsTable;

export default {
  path: "/config",
  redirect: "/config/general",
  meta: {
    icon: "mynaui:config",
    title: "配置管理",
    rank: 4
  },
  children: [
    {
      path: "/config/general",
      name: "config-general",
      component: () => import("@/views/config/general.vue"),
      meta: {
        title: "基本配置"
      }
    },
    {
      path: "/config/limit",
      name: "config-limit",
      component: () => import("@/views/config/limit.vue"),
      meta: {
        title: "限制配置"
      }
    },
    {
      path: "/config/parse",
      name: "config-parse",
      component: () => import("@/views/config/parse.vue"),
      meta: {
        title: "解析配置"
      }
    },
    {
      path: "/config/mail",
      name: "config-mail",
      component: () => import("@/views/config/mail.vue"),
      meta: {
        title: "邮件配置"
      }
    }
  ]
} satisfies RouteConfigsTable;

export default {
  path: "/token",
  redirect: "/token/list",
  meta: {
    icon: "ep:key",
    title: "卡密管理",
    rank: 2
  },
  children: [
    {
      path: "/token/list",
      name: "token-list",
      component: () => import("@/views/token/list.vue"),
      meta: {
        title: "卡密列表"
      }
    },
    {
      path: "/token/add",
      name: "token-add",
      component: () => import("@/views/token/add.vue"),
      meta: {
        title: "添加卡密"
      }
    }
  ]
} satisfies RouteConfigsTable;

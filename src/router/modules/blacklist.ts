export default {
  path: "/blackList",
  redirect: "/blackList/list",
  meta: {
    icon: "ep:list",
    title: "黑名单管理",
    rank: 3
  },
  children: [
    {
      path: "/blackList/list",
      name: "blackList-list",
      component: () => import("@/views/blackList/list.vue"),
      meta: {
        title: "黑名单列表"
      }
    },
    {
      path: "/blackList/add",
      name: "blackList-add",
      component: () => import("@/views/blackList/add.vue"),
      meta: {
        title: "添加黑名单"
      }
    }
  ]
} satisfies RouteConfigsTable;

export default {
  path: "/account",
  redirect: "/account/list",
  meta: {
    icon: "mdi:account",
    title: "账号管理",
    rank: 1
  },
  children: [
    {
      path: "/account/list",
      name: "account-list",
      component: () => import("@/views/account/list.vue"),
      meta: {
        title: "账号列表"
      }
    },
    {
      path: "/account/add",
      name: "account-add",
      component: () => import("@/views/account/add.vue"),
      meta: {
        title: "添加账号"
      }
    }
  ]
} satisfies RouteConfigsTable;

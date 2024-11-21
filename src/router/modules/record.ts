export default {
  path: "/record",
  redirect: "/record/list",
  meta: {
    icon: "ep:list",
    title: "解析记录管理",
    rank: 4
  },
  children: [
    {
      path: "/record/list",
      name: "record-list",
      component: () => import("@/views/record/list.vue"),
      meta: {
        title: "解析记录列表"
      }
    }
  ]
} satisfies RouteConfigsTable;

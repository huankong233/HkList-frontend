export default {
  path: "/user",
  meta: {
    icon: "mdi:account",
    title: "用户解析",
    rank: 999
  },
  component: () => import("@/views/user/index.vue")
} satisfies RouteConfigsTable;

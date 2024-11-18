import { $t } from "@/plugins/i18n";

export default {
  path: "/user",
  meta: {
    icon: "mdi:account",
    title: $t("user.name"),
    rank: 999
  },
  component: () => import("@/views/user/index.vue")
} satisfies RouteConfigsTable;

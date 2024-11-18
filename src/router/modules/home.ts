import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/user",
  meta: {
    icon: "ep:home-filled",
    title: $t("menus.pureHome"),
    rank: 0,
    showLink: false
  }
} satisfies RouteConfigsTable;

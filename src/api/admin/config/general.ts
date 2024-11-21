import { http } from "@/utils/http";

export interface GetConfigRes {
  parse_password: string;
  show_announce: boolean;
  announce: string;
  custom_button: string;
}

/** 获取配置文件 */
export const getConfig = () => {
  return http.request<GetConfigRes>("get", "/admin/config/general");
};

export interface UpdateConfigReq {
  admin_password: string;
  parse_password: string;
  show_announce: boolean;
  announce: string;
  custom_button: string;
}

/** 更新配置文件 */
export const updateConfig = (data: UpdateConfigReq) => {
  return http.request<null>("patch", "/admin/config/general", { data });
};

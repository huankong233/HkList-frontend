import { http } from "@/utils/http";

export interface CheckPasswordReq {
  admin_password: string;
}

/** 查看密码是否正确 */
export const checkPassword = (data: CheckPasswordReq) => {
  return http.request<null>("post", "/admin/check_password", { data });
};

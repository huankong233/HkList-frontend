import { http } from "@/utils/http";

export interface SelectReq {
  column:
    | "id"
    | "ip"
    | "fingerprint"
    | "fs_id"
    | "url"
    | "ua"
    | "token_id"
    | "account_id"
    | "created_at"
    | "updated_at";
  direction: "asc" | "desc";
}

export interface SelectRes {
  id: number;
  type: "fingerprint" | "ip";
  identifier: string;
  reason: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

/** 获取 */
export const select = (data: SelectReq) => {
  return http.request<SelectRes>("get", "/admin/record", { data });
};

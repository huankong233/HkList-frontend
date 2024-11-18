import { http } from "@/utils/http";

export interface SelectReq {
  column: "id" | "type" | "identifier" | "expires_at";
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
  return http.request<SelectRes>("get", "/admin/black_list", { data });
};

export interface InsertReq {
  type: "fingerprint" | "ip";
  identifier: string;
  reason: string;
  ban_days: number;
}

/** 插入 */
export const insert = (data: InsertReq) => {
  return http.request<null>("post", "/admin/black_list", { data });
};

export interface UpdateReq {
  id: number[];
  type: "fingerprint" | "ip";
  identifier: string;
  reason: string;
  expires_at: string;
}

/** 更新 */
export const update = (data: UpdateReq) => {
  return http.request<null>("patch", "/admin/black_list", { data });
};

export interface RemoveReq {
  id: number[];
}

/** 删除 */
export const remove = (data: RemoveReq) => {
  return http.request<null>("delete", "/admin/black_list", { data });
};

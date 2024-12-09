import { http } from '@/utils/http.ts'
import type { BasePagenation, PagenationReq } from '@/api/admin/pagenation.ts'

export type SelectReq = PagenationReq & {
  column:
    | 'id'
    | 'token'
    | 'count'
    | 'size'
    | 'day'
    | 'can_use_ip_count'
    | 'ip'
    | 'expires_at'
    | 'created_at'
    | 'updated_at'
  direction: 'asc' | 'desc'
}

export interface SelectRes {
  id: number
  token: string
  count: number
  size: number
  day: number
  can_use_ip_count: number
  ip: string[]
  switch: boolean
  reason: string
  expires_at: string
  created_at: string
  updated_at: string
}

/** 获取 */
export const select = (data: SelectReq) => {
  return http.request<BasePagenation<SelectRes>>('get', '/admin/token', {
    params: data,
  })
}

export type InsertReq = {
  count: number
  size: number
  day: number
  can_use_ip_count: number
} & (
  | {
      type: 'set'
      token: string
    }
  | {
      type: 'generate'
      generate_count: number
    }
)

/** 插入 */
export const insert = (data: InsertReq) => {
  return http.request<null>('post', '/admin/token', { data })
}

export interface UpdateReq {
  count: number
  size: number
  day: number
  can_use_ip_count: number
  ip: string[]
  expires_at: string
  switch: boolean
  reason: string
  id: number[]
}

/** 更新 */
export const update = (data: UpdateReq) => {
  return http.request<null>('patch', '/admin/token', { data })
}

export interface RemoveReq {
  id: number[]
}

/** 删除 */
export const remove = (data: RemoveReq) => {
  return http.request<null>('delete', '/admin/token', { data })
}

// 用户管理-admin
export interface UserType {
    id?: string
    name?: string
    adress?: string
    createdAt?: string
    pageNo?: number
    pageSize?: number
    isPaging?: boolean
    search?: string
}
// 疾病管理-admin
export interface DiseaseType {
    id?: string
    name?: string
    pageNo?: number
    pageSize?: number
    isPaging?: boolean
    search?: string
}
// 后台人员管理-admin
export interface AdminerType {
    id?: string
    name?: string
    pageNo?: number
    pageSize?: number
    isPaging?: boolean
    search?: string
}
//医院数据管理-admin
export interface HospitalType {
    id?: string
    name?: string
    pageNo?: number
    pageSize?: number
    isPaging?: boolean
    search?: string
}
// 用户管理-admin
export interface userType {
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
export interface diseaseType {
    id?: string
    name?: string
    pageNo?: number
    pageSize?: number
    isPaging?: boolean
    search?: string
}
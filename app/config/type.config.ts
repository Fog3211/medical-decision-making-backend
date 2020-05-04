// 用户管理-admin
export interface UserType {
    id: string
    name: string
    adress: string
    createdAt: string
    password: string
}
// 疾病管理-admin
export interface DiseaseType {
    id?: string
    name?: string



}
// 后台人员管理-admin
export interface AdminerType {
    id: string
    name: string
    password: string
    email: string
    telphone: number
    auth: number
}
//医院数据管理-admin
export interface HospitalType {
    id?: string
    name?: string



}
// 获取用户列表
export const GET_USER_LIST = {
    pageSize: { type: 'number', required: false, allowEmpty: true },
    pageNo: { type: 'number', required: false, allowEmpty: true }
}
// 新建用户
export const CREATE_USER = {
    name: { type: 'string', required: true, allowEmpty: false },
    nickName: { type: 'string', required: true, allowEmpty: false },
    birthday: { type: 'string', required: true, allowEmpty: false },
    sex: { type: 'bool', required: true },
    telphone: { type: 'number', required: true, allowEmpty: false },
    password: { type: 'string', required: true, allowEmpty: false },
}
// 获取用户列表
export const GET_ADMINER_LIST = {
    pageSize: { type: 'number', required: false, allowEmpty: true },
    pageNo: { type: 'number', required: false, allowEmpty: true }
}
// 新建后台用户
export const CREATE_ADMINER = {
    name: { type: 'string', required: true, allowEmpty: false },
    email: { type: 'string', required: false, allowEmpty: true },
    telphone: { type: 'number', required: false, allowEmpty: true },
}
// 获取用户列表
export const GET_DISEASE_LIST = {
    pageSize: { type: 'number', required: false, allowEmpty: true },
    pageNo: { type: 'number', required: false, allowEmpty: true }
}
// 新建用户
export const CREATE_DISEASE = {
    name: { type: 'string', required: true, allowEmpty: false },
    age: { type: 'number', required: true, allowEmpty: false },
    id: { type: 'string?', required: false, allowEmpty: true }
}   
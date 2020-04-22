// 获取用户列表
export const GET_USER_LIST = {
    pageSize: { type: 'number', required: false, allowEmpty: true },
    pageNo: { type: 'number', required: false, allowEmpty: true }
}
// 新建用户
export const CREATE_USER = {
    name: { type: 'string', required: true, allowEmpty: false },
    age: { type: 'number', required: true, allowEmpty: false },
    id: { type: 'string?', required: false, allowEmpty: true }
}
// 删除用户
export const DELETE_USER = {
    name: { type: 'string', required: true, allowEmpty: false },
    age: { type: 'number', required: true, allowEmpty: false },
    id: { type: 'string?', required: false, allowEmpty: true }
}
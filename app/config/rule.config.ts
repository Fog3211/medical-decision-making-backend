const user_rule = {
    name: { type: 'string', required: true, allowEmpty: false },
    age: { type: 'number', required: true, allowEmpty: false },
    id: { type: 'string?', required: false, allowEmpty: true }
}

export {
    user_rule
}
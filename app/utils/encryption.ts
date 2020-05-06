const Base64 = require('js-base64').Base64

export default {
    encrypt: (value: string) => Base64.encode(Base64.encode(value)),
    decrypt: (value: string) => Base64.decode(Base64.decode(value))
}

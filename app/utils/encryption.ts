// import sha256 from 'crypto-js/sha256'

// export default {
//     encrypt: (value: string) => sha256.encrypt(value, 'medical_decision_support').toString(),
//     decrypt: (value: string) => sha256.decrypt(value, 'medical_decision_support').toString()
// }
export default {
    encrypt: (value: string) => value,
    decrypt: (value: string) => value
}

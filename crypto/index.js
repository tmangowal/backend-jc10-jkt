var crypto = require('crypto')

let passwordKu = 'password132'

function encryptMyPass (password) {
    let result = crypto.createHmac('sha256', 'jc10').update(password).digest('')
    return result
}

console.log(passwordKu + ' Berubah menjadi ' + encryptMyPass(passwordKu).length)
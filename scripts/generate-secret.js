const crypto = require('crypto')

// Gera um secret aleatório e seguro
const secret = crypto.randomBytes(32).toString('base64')

console.log('\n🔐 NextAuth Secret gerado com sucesso!\n')
console.log('Copie e cole no seu arquivo .env:\n')
console.log(`NEXTAUTH_SECRET="${secret}"`)
console.log('\n')

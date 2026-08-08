import execQuery from './database/execQuery.js'
import bcrypt from 'bcrypt'

const user = await execQuery(`SELECT * FROM usuarios WHERE nome_login = ?`, ["juliasouza"])
console.log(user.data)
const {senha} = user.data[0]
const hash = await bcrypt.hash("JuliaA45$", 12)
const resposta = await bcrypt.compare("JuliaA45$", hash)
console.log(`\n${senha}`)
console.log(resposta)

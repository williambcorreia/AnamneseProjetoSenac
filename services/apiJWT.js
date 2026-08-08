import dotenv from 'dotenv/config'
import jwt from 'jsonwebtoken'
import express from 'express'

const app = express()
app.use(express.json())

const TOKEN_KEY = process.env.TOKEN_KEY

export async function createToken() {

}

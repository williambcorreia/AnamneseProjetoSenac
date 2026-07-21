import dbPool from '../database/dbConnection.js'
import express from 'express'

const app = express()
app.use(express.json())

app.post('/query', async (req, res) => {
	const {sql, params} = req.body

	if (!sql) return res.status(400).json({error: 'O campo "sql" é obrigatório.'});

	try {
		const [results] = await dbPool.query(sql, params || [])
		return res.json({success: true, data: results})
	} catch (err) {
		return res.status(500).json({success: false, error: err.message})
	}
})

app.listen(3000, () => {
	console.log('\nServer running on port 3000')
})

export default async function execQuery(query, qparams = []) {
	try {
		const response = await fetch('http://168.138.157.72:3000/query', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'bypass-tunnel-reminder': 'true'
			},
			body: JSON.stringify({
				sql: query,
				params: qparams
			})
		})

		const text = await response.text()
		if (!text) throw new Error(response.status)

		console.log(`Status HTTP: (${response.status})`)
		console.log("Resposta bruta do servidor: ", text)

		const data = JSON.parse(text)
		return data
	} catch (err) {
		console.error(err)
	}
}

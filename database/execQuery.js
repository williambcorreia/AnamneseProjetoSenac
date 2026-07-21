export default async function execQuery(query, qparams = []) {
	try {
		const response = await fetch('https://evolueaidbsenac.loca.lt/query', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Bypass-Tunnel-Remainder': 'true'
			},
			body: JSON.stringify({
				sql: query,
				params: qparams
			})
		})

		const text = await response.text()
		if (!text) throw new Error(`Servidor retornou resposta vazia. (${response.status})`)

		const data = JSON.parse(text)
		return data
	} catch (err) {
		console.error(err)
	}
}

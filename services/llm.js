export async function executarLLM(texto){
	try {
		const resposta = await fetch("http://localhost:11434/api/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: "qwen2.5:1.5b",
				prompt: `Você é um enfermeiro especialista. Reescreva a evolução de enfermagem abaixo seguindo estas ordens:
				- Corrija erros ortográficos e use termos técnicos formais da área.
				- Mantenha estrita fidelidade aos fatos ditados, sem inventar dados.
				- Formate o texto em tópicos Markdown simples (Ex: ### Item \\n informações).
				- Responda APENAS com a evolução formatada, em português, sem introduções ou saudações.
					Texto: "${texto}"`,
				stream: false,
				options: {
					temperature: 0,
					top_p: 0.9
				}
			}),
		})

		const dados = await resposta.json()

		return dados.response

	} catch (err) {
		console.error("Erro: ", err)
	}
}

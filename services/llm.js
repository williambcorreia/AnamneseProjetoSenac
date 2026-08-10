export default async function executarLLM(texto){
	try {
		const resposta = await fetch("https://evolueai.loca.lt/api/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: "qwen2.5:1.5b",
				prompt: `Contexto: Você é um enfermeiro especialista em auditoria e registros clínicos.
Tarefa: Organize o exame físico contido no Texto fornecido, convertendo os termos para a nomenclatura técnica formal.

Regras Estritas:
1. Baseie-se exclusivamente nas informações do texto. Omitir dados não mencionados.
2. Formate a saída estruturada exatamente nos tópicos abaixo (use apenas os que se aplicarem):
   ### Aspectos Gerais
   ### Sistema Neurológico
   ### Sistema Respiratório
   ### Sistema Cardiovascular
   ### Sistema Gastrointestinal e Geniturinário
   ### Sistema Musculoesquelético
   ### Conduta de Enfermagem

3. Restrição de Saída: Inicie a resposta diretamente com o primeiro tópico do Markdown. Proibido incluir qualquer saudação, introdução ou consideração final.

Texto: "${texto}"`,
				stream: false,
				options: {
					temperature: 0.1,
					top_p: 0.9,
					stop: ["<|im_end|>", "\n\n\n"]
				}
			}),
		})

		const dados = await resposta.json()

		return dados.response

	} catch (err) {
		console.error("Erro: ", err)
	}
}

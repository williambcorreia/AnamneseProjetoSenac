export default async function executarLLM(texto){
    try {
        const resposta = await fetch("https://ripening-filtrate-squash.ngrok-free.dev/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
            },
            body: JSON.stringify({
                model: "qwen2.5:1.5b",
                prompt: `Organize o exame físico abaixo em linguagem técnica de enfermagem. Caso nenhum texto relevante seja fornecido, não retorne NADA.

Retorne APENAS estes 3 pontos organizados:
1. Avaliação e Achados Gerais
2. Sistemas Corporais
3. Conduta de Enfermagem

Não use Markdown (como ### ou **). Não inclua introduções, saudações ou explicações.

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

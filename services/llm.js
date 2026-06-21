import { initLlama } from 'llama.rn';
import * as fs from 'expo-file-system/legacy';

let motorLLM = null
const nomeModelo = 'SmolLM2-360M-Instruct-Q4_K_M.gguf'; 
const caminhoModelo = `${fs.documentDirectory}${nomeModelo}`;
const urlModelo = `https://huggingface.co/bartowski/SmolLM2-360M-Instruct-GGUF/resolve/main/${nomeModelo}`;

export async function baixarLLM() {


	try {
		const llmFile = await fs.getInfoAsync(caminhoModelo)

		if (!llmFile.exists) {

			console.log("Baixando LLM...")

			const progressoDownload = (dados) => {
					const progresso = ((dados.totalBytesWritten / dados.totalBytesExpectedToWrite) * 100).toFixed(1);
					console.log(`Progresso do download: ${progresso}%`);
			};

			const resumableDownload = fs.createDownloadResumable(urlModelo, caminhoModelo, {}, progressoDownload)
			const downloadResult = await resumableDownload.downloadAsync()
			console.log("Download concluído!");

		}

		console.log("LLM já baixada...")

		return

	} catch (err) {
		console.error("Erro: ", err)
		throw err
	}

}

export async function executarLLM(texto) {
	try {
		if (!motorLLM) {
			motorLLM = await initLlama({
				model: caminhoModelo,
				n_ctx: 2048,
				n_threads: 2
			})
		}

    const prompt = 
		`<|user|>
		Você é um assistente médico brasileiro. Corrija a ortografia, pontue e organize o seguinte texto em tópicos e negritos usando Markdown. Responda apenas em português e envie apenas o texto final.

		Texto para corrigir:
		${texto}<|end|>
		<|assistant|>`;

		let llmLogText = ""
    const resposta = await motorLLM.completion({
      prompt: prompt,
      temperature: 0,
			onToken: (token) => {
        llmLogText += token.token;
        console.log(`[Gerando...] ${llmLogText}`); 
    }
    });

    return resposta.text.trim();

  } catch (error) {
		console.error("Erro: ", error);
    throw error;
  }
}


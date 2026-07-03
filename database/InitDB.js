import * as SQLite from 'expo-sqlite';
import * as Crypt from 'expo-crypto'

export async function DeployDB() {
	
	try {
		const db = await SQLite.openDatabaseAsync('database.db')

		await db.execAsync(`PRAGMA foreign_keys = ON;`)

		await db.execAsync(`
			CREATE TABLE IF NOT EXISTS users (
				id_user INTEGER PRIMARY KEY AUTOINCREMENT,
				user VARCHAR(100) NOT NULL,
				username VARCHAR(100) NOT NULL,
				role VARCHAR(50) NOT NULL,
				email VARCHAR(50) NOT NULL UNIQUE,
				password VARCHAR(64) NOT NULL
			);
		`)

		await db.execAsync(`
			CREATE TABLE IF NOT EXISTS evolucoes (
				id_evolucao INTEGER PRIMARY KEY AUTOINCREMENT,
				feito_por VARCHAR(100) NOT NULL,
				nome_paciente VARCHAR(50) NOT NULL,
				texto_evolucao TEXT NOT NULL,
				data DATE NOT NULL
			);
		`)

		const result = await db.getFirstAsync('SELECT COUNT (*) as total FROM users;')

		if (result.total === 0) {
			const defaultUsers = [
				{ user: "defenastradorVitao", username: "Vitor Cardoso", role: "Root", email: "root@exemplo.com", password: "S3nh@R00T"},
				{ user: "juliaSouza", username: "Júlia Souza Rodrigues", role: "Enf", email: "enf@exemplo.com", password: "JuliaA45$"},
				{ user: "amandaMendes", username: "Amanda Mendes Garcia", role: "TecEnf", email: "tecenf@exemplo.com", password: "AMANd#23%"},
				{ user: "raimundoJorge", username: "Raimundo Jorge Montenegro", role: "Coord", email: "admin@exemplo.com", password: "rmndJG*09"}
			]

			for (const users of defaultUsers) {
				const passwordCrypto = await Crypt.digestStringAsync( 
					Crypt.CryptoDigestAlgorithm.SHA256, users.password
				)

				await db.runAsync('INSERT INTO users (user, username, role, email, password) VALUES (?, ?, ?, ?, ?);',
				[users.user, users.username, users.role, users.email, passwordCrypto]
				)
			}
	}

	return db

	} catch (error) {
		return "err"
	}
}

export async function seedEvolucaoDB() {
	try {
		const db = await SQLite.openDatabaseAsync('database.db')
		return db
	} catch (err) {
		return "err"
	}

}

import * as SQLite from 'expo-sqlite';
import * as Crypt from 'expo-crypto'

export default async function Deploy() {
	
	try {
		const db = await SQLite.openDatabaseAsync('users.db')

		await db.execAsync(`
			CREATE TABLE IF NOT EXISTS users (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				user TEXT NOT NULL,
				role TEXT NOT NULL,
				email TEXT NOT NULL UNIQUE,
				password TEXT NOT NULL
			);
		`)

		const result = await db.getFirstAsync('SELECT COUNT (*) as total FROM users;')

		if (result.total === 0) {
			const defaultUsers = [
				{ user: "defenastradorVitao", role: "root", email: "root@exemplo.com", password: "S3nh@R00T"},
				{ user: "juliaSouza", role: "enf", email: "enf@exemplo.com", password: "JuliaA45$"},
				{ user: "amandaMendes", role: "tecenf", email: "tecenf@exemplo.com", password: "AMANd#23%"},
				{ user: "raimundoJorge", role: "coord", email: "admin@exemplo.com", password: "rmndJG*09"}
			]

			for (const users of defaultUsers) {
				const passwordCrypto = await Crypt.digestStringAsync( 
					Crypt.CryptoDigestAlgorithm.SHA256, users.password
				)

				await db.runAsync('INSERT INTO users (user, role, email, password) VALUES (?, ?, ?, ?);',
				[users.user, users.role, users.email, passwordCrypto]
				)
			}
	}

	return db

	} catch (error) {
	return "err"
	}
}

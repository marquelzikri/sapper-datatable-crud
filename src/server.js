import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { MongoClient } from 'mongodb';
import { json } from 'body-parser';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(json())
	.use(async (req, _res, next) => {
		console.log("connecting to mongodb");

		const url = '';
		const dbName = '';

		try {
			const client = await MongoClient.connect(url, { useUnifiedTopology: true });

			console.log("connected.");

			req["db"] = client.db(dbName);
		} catch (err) {
			console.error("failed to connect.\n", err);
		}

		next();
	})
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

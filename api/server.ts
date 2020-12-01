import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { db } from './db';
export const server = new ApolloServer({
	schema,
	context: () => ({
		db,
	}),
});

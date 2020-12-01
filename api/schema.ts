import { nexusPrisma } from 'nexus-plugin-prisma';
import { makeSchema } from '@nexus/schema';
import { join } from 'path';
import * as typeDefs from './graphql';

export const schema = makeSchema({
	types: typeDefs, // Graphql 스키마를 구성하는데 사용될 Graphql 유형.
	plugins: [nexusPrisma()],
	outputs: {
		// @nexus/schema 스키마에서 파생되어 생성된 typescript 정의유형을 작성해야하는 위치의 출력경로.
		typegen: join(__dirname, '..', 'nexus-typegen.ts'),
		// @nexus/schema Graphql 스키마의 sdl 버전을 작성해야하는 위치에 대한 출력 경로.
		schema: join(__dirname, '..', 'schema.graphql'),
	},
	typegenAutoConfig: {
		sources: [
			{
				source: require.resolve('./context'), // Nexus 는 context.ts 파일을 구문분석하여 사용가능한 유형을 추출.
				alias: 'ContextModule',
			},
		],
		contextType: 'ContextModule.Context', // 위에서 만들어진 별칭을 사용하여 정의된 모든 유형을 참조.
	},
});

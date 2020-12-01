import { objectType, extendType, stringArg, intArg, nonNull } from '@nexus/schema';

export const Post = objectType({
	name: 'Post', // <- Name of your type
	definition(t) {
		// t.int('id')            // <- Field named `id` of type `Int`
		// t.string('title')      // <- Field named `title` of type `String`
		// t.string('body')       // <- Field named `body` of type `String`
		// t.boolean('published') // <- Field named `published` of type `Boolean`
		t.model.id();
		t.model.title();
		t.model.body();
		t.model.published();
	},
});

export const PostQuery = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('drafts', {
			type: 'Post',
			resolve(_root, _args, ctx) {
				return ctx.db.post.findMany({ where: { published: false } });
			},
		});
		t.list.field('posts', {
			type: 'Post',
			resolve(_root, _args, ctx) {
				return ctx.db.post.findMany({ where: { published: true } });
			},
		});
	},
});

export const PostMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createDraft', {
			type: 'Post',
			args: {
				// 1
				title: nonNull(stringArg()), // 2
				body: nonNull(stringArg()), // 2
			},
			resolve(_root, args, ctx) {
				const draft = {
					title: args.title, // 3
					body: args.body, // 3
					published: false,
				};
				return ctx.db.post.create({ data: draft });
			},
		}),
			t.field('publish', {
				type: 'Post',
				args: {
					draftId: nonNull(intArg()),
				},
				resolve(_root, args, ctx) {
					return ctx.db.post.update({
						where: { id: args.draftId },
						data: {
							published: true,
						},
					});
				},
			});
	},
});

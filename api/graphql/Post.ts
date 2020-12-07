import { objectType, extendType, stringArg, intArg, nonNull } from '@nexus/schema';

export const Post = objectType({
	name: 'Post',
	definition(t) {
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
				title: nonNull(stringArg()),
				body: nonNull(stringArg()),
			},
			resolve(_root, args, ctx) {
				const draft = {
					title: args.title,
					body: args.body,
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

const graphql = require('graphql');

const _ = require('lodash');

const Book = require('../models/book');
const Author = require('../models/author');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
} = require('graphql');

const findBooks = (id) => {
    let query = {};

    if (id) {
        query['_id'] = id;
    }

    return Book.find(query);
}

const findAuthors = (id) => {
    let query = {};

    if (id) {
        query['_id'] = id;
    }

    return Author.find(query);
}

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString, },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            async resolve(parent, args) {
                console.log(parent);
                try {
                    let result = await findAuthors(parent.authorId);

                    return result[0];
                } catch (e) {
                    console.error(e);
                }
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args) {
                try {
                    console.log(parent);

                    return await Book.find({ authorId: parent.id })

                } catch (e) {
                    console.error(e);
                }
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve: async (parent, args) => {
                /**
                 * Get data from database
                 */

                return await Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve: async (parent, args) => {
                return await Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            args: { authorId: { type: GraphQLID } },
            resolve: async (parent, args) => {
                if (args.authorId) {
                    return await Book.find({ authorId: args.authorId });
                }
                return await Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: async (parent, args) => {
                return await Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            async resolve(parent, args) {
                console.log(parent);
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                try {
                    let result = await author.save();

                    console.log(result);


                    return result;

                } catch (e) {
                    console.error(e);
                }
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                try {
                    let result = book.save();

                    return result;
                } catch (e) {
                    console.error(e);
                    return e;
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
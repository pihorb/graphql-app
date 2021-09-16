"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookType = exports.AuthorType = void 0;
const graphql_1 = require("graphql");
const db_1 = require("./db");
exports.AuthorType = new graphql_1.GraphQLObjectType({
    name: 'Author',
    description: 'Author representation',
    fields: () => ({
        id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        books: {
            type: new graphql_1.GraphQLList(exports.BookType),
            resolve: (author) => db_1.books.filter((book) => book.authorId === author.id),
        },
    }),
});
exports.BookType = new graphql_1.GraphQLObjectType({
    name: 'Book',
    description: 'Book representation',
    fields: () => ({
        id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        authorId: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        author: {
            type: exports.AuthorType,
            resolve: (book) => db_1.authors.find((author) => author.id === book.authorId),
        },
    }),
});

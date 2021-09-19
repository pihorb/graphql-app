"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const db_1 = require("./db");
const graphql_types_1 = require("./graphql-types");
const cors_1 = __importDefault(require("cors"));
const RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        book: {
            type: graphql_types_1.BookType,
            description: 'Single book',
            args: {
                id: { type: graphql_1.GraphQLInt },
            },
            resolve: (_, args) => db_1.books.find((book) => book.id === args.id),
        },
        books: {
            type: new graphql_1.GraphQLList(graphql_types_1.BookType),
            description: 'List of books',
            resolve: () => db_1.books,
        },
        author: {
            type: graphql_types_1.AuthorType,
            description: 'Single author',
            args: {
                id: { type: graphql_1.GraphQLInt },
            },
            resolve: (_, args) => db_1.authors.find((author) => author.id === args.id),
        },
        authors: {
            type: new graphql_1.GraphQLList(graphql_types_1.AuthorType),
            description: 'List of authors',
            resolve: () => db_1.authors,
        },
    }),
});
const RootMutationType = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addBook: {
            type: graphql_types_1.BookType,
            description: 'Add new book',
            args: {
                name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                authorId: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
            },
            resolve: (_, args) => {
                const book = {
                    id: db_1.books.length + 1,
                    name: args.name,
                    authorId: args.authorId,
                };
                db_1.books.push(book);
                return book;
            },
        },
        addAuthor: {
            type: graphql_types_1.AuthorType,
            description: 'Add new author',
            args: {
                name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
            },
            resolve: (_, args) => {
                const author = {
                    id: db_1.authors.length + 1,
                    name: args.name,
                };
                db_1.authors.push(author);
                return author;
            },
        },
    }),
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
PORT;
app.use((0, cors_1.default)());
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    graphiql: true,
}));
app.listen(PORT, () => console.log(`
    🚀  Server is ready at ${PORT}
    📭  Query at https://studio.apollographql.com/dev
    `));

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
const RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        books: {
            type: new graphql_1.GraphQLList(graphql_types_1.BookType),
            description: 'List of books',
            resolve: () => db_1.books,
        },
        book: {
            type: new graphql_1.GraphQLList(graphql_types_1.BookType),
            description: 'Single books',
            args: {
                id: { type: graphql_1.GraphQLInt },
            },
            resolve: (parent, args) => db_1.books.find((book) => book.id === args.id),
        },
        authors: {
            type: new graphql_1.GraphQLList(graphql_types_1.AuthorType),
            description: 'List of authors',
            resolve: () => db_1.authors,
        },
    }),
});
function a(b, c) {
    return c;
}
const schema = new graphql_1.GraphQLSchema({
    query: RootQueryType,
});
const app = (0, express_1.default)();
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

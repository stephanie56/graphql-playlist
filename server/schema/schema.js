const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

// dummy data
const books = [
  {name: 'Book 1', genre: 'Fantasy', id: '1'},
  {name: 'Book 2', genre: 'Fantasy', id: '2'},
  {name: 'Book 3', genre: 'Sci-fi', id: '3'},
];

const authors = [
  {name: 'Michael C', age: 32, id: '1'},
  {name: 'Shaun M', age: 45, id: '2'},
  {name: 'Peri S', age: 23, id: '3'},
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args) {
        // code to get data from db / other resource
        return _.find(books, {id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args) {
        return _.find(authors, {id: args.id})
      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery
})
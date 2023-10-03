const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLError, GraphQLBoolean } = require('graphql')
const { DataTypes } = require('sequelize')

const sequelize = require('../database')
const Note = require('../models/notemodel')(sequelize, DataTypes)

const NoteType = new GraphQLObjectType({
  name: 'Note',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    pinned: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  })
})

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {

    notes: {
      type: new GraphQLList(NoteType),
      resolve(parent, args) {
        return Note.findAll({order: [['createdAt', 'desc']]})
      }
    },
    note: {
      type: NoteType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Note.findByPk(args.id)
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createNote: {
      type: NoteType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
        pinned: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        return Note.create(args)
      }
    },
    deleteNote: {
      type: NoteType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const note = await Note.findByPk(args.id)
        note.destroy()
        return note
      }
    },
    updateNote: {
      type: NoteType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        pinned: { type: GraphQLBoolean }
      },
      async resolve(parent, args) {
        const note = await Note.findByPk(args.id)
        note.update(args)
        return note
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query,
  mutation,
})
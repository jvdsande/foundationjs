/* export default ({ typeComposers: { List: ListTC } }) => ({
  mutations: {
    listCreate: {
      extends: ListTC.create,
      resolve: async ({ args, composers: { List } }) => {
        const { record } = args
        record.creationDate = new Date()

        return List.create(record)
      },
    },

    listDelete: {
      extends: ListTC.delete,
      resolve: async ({ args, composers: { List, Task } }) => {
        // Get all tasks
        const tasks = await Task.list({ list: args._id })

        // Delete all tasks
        tasks.forEach(task => Task.delete(task._id))

        // Delete the List
        return List.delete(args._id)
      },
    },
  },
})
*/

import { Types } from '@harmonyjs/persistence'

export default ({
  fields: {
    numberOfTasks: {
      type: Types.Number,
      resolve: async ({ source, resolvers: { Task } }) => Task.count({ filter: { list: source._id } }),
    },

    numberOfDone: {
      type: Types.Number,
      args: {
        isDone: Types.Boolean,
        nestedArgs: {
          someInt: Types.Number,
          someString: Types.String,
          someNested: {
            nestedBoolean: Types.Boolean,
          },
        },
      },
      resolve: async ({ source, resolvers: { Task } }) => Task.count({ filter: { list: source._id, done: true } }),
    },

    nestedTransient: {
      type: {
        hello: Types.String,
      },
      resolve: () => null,
    },
  },
})

// Require ApolloGraphql
import { ApolloServer, gql } from 'apollo-server-hapi'
import { buildFederatedSchema } from '@apollo/federation'

// Require logger
import Logger from '@harmonyjs/logger'

import { ServerController } from '@harmonyjs/typedefs/server'

const logger : Logger = new Logger('GraphQLController')

/*
 * The Apollo Controller exposes a GraphQL endpoint through an Apollo Server
 */
const ControllerApollo = function (options) : ServerController {
  const {
    path,
    enablePlayground,

    schema,
    resolvers,
  } = options

  async function initialize({ server, log }) {
    logger.level = log.level
    logger.info('Registering GraphQL endpoint...')

    const typeDefs = gql(schema)

    const apolloServer = new ApolloServer({
      schema: buildFederatedSchema([{ typeDefs, resolvers }]),
      playground: !!enablePlayground,
      introspection: !!enablePlayground,
      context: ({ request }) => ({
        authentication: request.authentication,
      }),
    })

    await apolloServer.applyMiddleware({
      app: server,
      path,
      route: {
        auth: {
          strategy: 'jwt',
          mode: 'try',
        },
        cors: true,
      },
    })

    await apolloServer.installSubscriptionHandlers(server.listener)

    logger.info(`GraphQL endpoint at ${path}`)
    if (enablePlayground) {
      logger.info(`GraphQL playground at ${path}`)
    }
  }

  return {
    initialize,
    plugins: [],
  }
}

export default ControllerApollo
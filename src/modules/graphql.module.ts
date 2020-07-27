import { GraphQLModule } from '@nestjs/graphql';

export const Module = GraphQLModule.forRoot({
  installSubscriptionHandlers: true,
  autoSchemaFile: 'schema.gql',
  context: (args: any): any => {
    if (args.connection) {
      const authorization =
        args.connection.context.connectionParams.Authorization ||
        args.connection.context.connectionParams.authorization;
      return {
        req: {
          headers: { authorization },
        },
      };
    }

    // queries and mutations
    return { req: args.req };
  },
});

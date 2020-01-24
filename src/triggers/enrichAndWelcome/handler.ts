/**
 * This file was generated using 8base CLI.
 *
 * To learn more about writing custom trigger functions, visit
 * the 8base documentation at:
 *
 * https://docs.8base.com/8base-console/custom-functions/triggers
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    enrichAndWelcome:
 *      ...
 *
 * Data that is sent to the function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * To invoke this function locally, run:
 *  8base invoke-local enrichAndWelcome -p src/triggers/enrichAndWelcome/mocks/request.json
 */

import gql from 'graphql-tag';

const QUERY = gql`
  query MyQuery {
    randomUserEnrich {
      birthday
      firstName
      gender
      lastName
      mobile
    }
  }
`;

const MUTATION = gql`
  mutation MyMutation(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $gender: String!
    $mobile: String!
    $birthday: DateTime!
  ) {
    userUpdate(
      data: {
        firstName: $firstName
        lastName: $lastName
        gender: $gender
        mobile: $mobile
        birthday: $birthday
        id: $id
        posts: {
          create: {
            title: "Welcome!"
            body: "We’re so excited to have you here!"
          }
        }
      }
    ) {
      id
    }
  }
`;

export default async (event: any, ctx: any): Promise<any> => {
  const { id } = event.data;

  let errors: Error[] = [];

  const { randomUserEnrich } = await ctx.api.gqlRequest(QUERY);

  // YOLO on error handling

  await ctx.api.gqlRequest(MUTATION, { ...randomUserEnrich, id });

  return {
    data: event.data,
    /**
     * Triggers allow for errors to be specified in the response
     * as an array of user defined objects.
     *
     * Example:
     *
     * [{
     *  message: "Error message",
     *  code: "error_code"
     * }, ...]
     */
    errors
  };
};

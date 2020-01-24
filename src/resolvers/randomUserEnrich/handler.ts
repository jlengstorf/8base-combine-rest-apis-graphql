/**
 * This file was generated using 8base CLI.
 * 
 * To learn more about writing custom GraphQL resolver functions, visit
 * the 8base documentation at:
 * 
 * https://docs.8base.com/8base-console/custom-functions/resolvers
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    randomUserEnrich:
 *      ...
 * 
 * Data that is sent to this function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * To invoke this function locally, run:
 *  8base invoke-local randomUserEnrich -p src/resolvers/randomUserEnrich/mocks/request.json
 type RandomUserEnrichResult {
  mobile: String!
  gender: String!
  birthday: DateTime!
  firstName: String!
  lastName: String!
}
 */
import axios from 'axios';

export default async (event: any, ctx: any): Promise<any> => {
  const { nationality = 'GB' } = event.data;
  const result = await axios(`https://randomuser.me/api/?nat=${nationality}`);

  const formatter = item => ({
    firstName: item.name.first,
    lastName: item.name.last,
    mobile: item.cell,
    gender: item.gender,
    birthday: item.dob.date
  });

  return { data: formatter(result.data.results[0]) };
};

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
 *    giphySearch:
 *      ...
 *
 * Data that is sent to this function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * To invoke this function locally, run:
 *  8base invoke-local giphySearch -p src/resolvers/giphySearch/mocks/request.json
 * 
 type GiphyResult {
  id: ID!
  url: String!
  embed: String!
}

type GiphySearchResult {
  count: Int!
  results: [GiphyResult!]!
}
 */

import axios from 'axios';

export default async (event: any, ctx: any): Promise<any> => {
  const { query, limit = 25, offset = 0, lang = 'en' } = event.data;
  const result = await axios(
    `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${query}&limit=${limit}&offset=${offset}&rating=G&lang=${lang}`
  );

  const formatter = item => ({
    id: item.id,
    url: item.url,
    embed: item.embed_url
  });

  return {
    data: {
      count: result.data.data.length,
      results: result.data.data.map(formatter)
    }
  };
};

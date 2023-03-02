require("dotenv").config();
const fs = require("fs");
const { gql, GraphQLClient } = require("graphql-request");

const ENDPOINT = "https://api.start.gg/gql/alpha";
const TOKEN = process.env.START_GG_API_TOKEN;

const graphQLClient = new GraphQLClient(ENDPOINT, {
  headers: {
    authorization: `Bearer ${TOKEN}`,
  },
});

const query = gql`
  query PhaseSeeds($phaseId: ID!, $page: Int!, $perPage: Int!) {
    phase(id: $phaseId) {
      id
      seeds(query: { page: $page, perPage: $perPage }) {
        pageInfo {
          total
          totalPages
        }
        nodes {
          id
          seedNum
          entrant {
            id
            participants {
              id
              gamerTag
            }
          }
        }
      }
    }
  }
`;

const getSeeds = async ({ phaseId }) => {
  const data = await graphQLClient.request(query, {
    phaseId,
    page: 1,
    perPage: 500,
  });

  const seeds = data?.phase.seeds.nodes
    .sort((a, b) => a.seedNum - b.seedNum)
    .map(
      ({ entrant, seedNum }) =>
        `${seedNum}: ${entrant.participants[0].gamerTag}`
    );

  fs.writeFile("test.txt", seeds.join("\n"), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
};

getSeeds({ phaseId: 1215668 });

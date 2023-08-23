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

const getSeeds = async ({ page, phaseId }) => {
  const data = await graphQLClient.request(query, {
    phaseId,
    page,
    perPage: 499,
  });

  const seeds = data?.phase.seeds.nodes
    .sort((a, b) => a.seedNum - b.seedNum)
    .map(
      ({ entrant, seedNum }) =>
        `${seedNum}: ${entrant.participants[0].gamerTag}`
    );

  fs.writeFile("seeds.txt", seeds.join("\n"), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
};

const phaseId = process.argv[2];
const page = process.argv[3] || 1;

getSeeds({ page, phaseId: Number(phaseId) });

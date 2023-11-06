# Usage

1. Clone repo.
2. `yarn`
3. `touch .env` and enter your `START_GG_API_TOKEN` (as per `.env.example`).
    - Obtain a Start.gg API token [here](https://developer.start.gg/docs/authentication).
4. `yarn start [phaseId]`, with no brackets.
    - To get your tournament event's `phaseId`, navigate to a bracket page and observe its URL.
    - The `phaseId` will be encoded in the URL as such: `start.gg/tournament/[tournamentName]/event/[eventName]/brackets/[phaseId]/[poolId]`
    - For example, in the URL `https://www.start.gg/tournament/the-function-3-brooklan/event/melee-singles/brackets/1467733/2229338`, the `phaseId` is `1467733`.
5. Your seeding will be saved to `./seeds.txt`. From here, I like to simply `open seeds.txt`.

## Caveats

Currently does not support brackets >= 500 entrants in the most user-friendly way.

You can run the program multiple times with the optional `page` argument to chain together multiple requests for 499 entrants each; e.g.
- `yarn start [phaseId] 1`
- `yarn start [phaseId] 2`
- ...

// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const { readFileSync } = require("fs");
const { parse } = require("csv-parse/sync");
const Pizza = require("./src/lib/Pizza");

module.exports = function(api) {
  // api.loadSource(({ addCollection }) => {
  //   // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  // });

  // api.createPages(({ createPage }) => {
  //   // Use the Pages API here: https://gridsome.org/docs/pages-api/
  // });

  // Create Pizza collection
  api.loadSource((actions) => {
    const input = readFileSync("./src/content/pizza.csv", "utf8");
    const collection = actions.addCollection("Pizza");

    const list = parse(input, {
      columns: true,
      delimiter: ",",
      skipEmptyLines: true,
    });

    list.forEach((pizza) => {
      collection.addNode(JSON.parse(JSON.stringify(new Pizza(pizza))));
    });
  });
};

// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const { readFileSync } = require("fs");
const { parse } = require("csv-parse/sync");
const Dessert = require("./src/lib/Dessert");
const Pizza = require("./src/lib/Pizza");
const Date = require("./src/lib/Date");

module.exports = function(api) {
  // api.loadSource(({ addCollection }) => {
  //   // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  // });

  // api.createPages(({ createPage }) => {
  //   // Use the Pages API here: https://gridsome.org/docs/pages-api/
  // });

  // Create Pizza collection
  api.loadSource((actions) => {
    const pizzaInput = readFileSync("./src/content/pizza.csv", "utf8");
    const pizzaCollection = actions.addCollection("Pizza");

    const pizzaList = parse(pizzaInput, {
      columns: true,
      delimiter: ",",
      skipEmptyLines: true,
    });

    pizzaList.forEach((pizza) => {
      pizzaCollection.addNode(JSON.parse(JSON.stringify(new Pizza(pizza))));
    });

    const dessertInput = readFileSync("./src/content/desserts.csv", "utf8");
    const dessertCollection = actions.addCollection("Dessert");

    const dessertList = parse(dessertInput, {
      columns: true,
      delimiter: ",",
      skipEmptyLines: true,
    });

    dessertList.forEach((dessert) => {
      dessertCollection.addNode(JSON.parse(JSON.stringify(new Dessert(dessert))));
    });

    const openingDatesInput = readFileSync(
      "./src/content/openingDates.csv",
      "utf8"
    );
    const openingDatesCollection = actions.addCollection("OpeningDates");
    const openingDatesList = parse(openingDatesInput, {
      columns: true,
      delimiter: ",",
      skipEmptyLines: true,
    });
    if (openingDatesList.length) {
      openingDatesList.forEach((date) => {
        openingDatesCollection.addNode(
          JSON.parse(JSON.stringify(new Date(date)))
        );
      });
    } else {
      // Add empty date to not make app to crash
      openingDatesCollection.addNode(new Date(null));
    }
  });
};

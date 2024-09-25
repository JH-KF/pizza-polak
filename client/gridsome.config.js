// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Polak Pizza",
  siteDescription:
    "Pizza maison cuites au feu à bois. A venir cherchez à Farschviller.",
  siteUrl: "https://pizza-polak.fr",
  metadata: {
    keywords:
      "Pizza maison, Farschviller, Pizza à emporter Pâte maison Four à bois",
    ogImage: "/og-image.png",
    geoRegion: "FR-MO",
    geoPlacename: "Farschviller, Moselle",
  },
  plugins: [
    {
      use: "@gridsome/plugin-sitemap",
    },
  ],
};

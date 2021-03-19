module.exports = {
  siteMetadata: {
    title: `World countries`,
    description: `The app that allows user to find each country interesting statistics and information`,
    author: `@tobiaszmaj`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        url: `https://restcountries.eu/rest/v2/all`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
        name: `countries`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Comfortaa:300, 500`, `Montserrat:300, 500,700`],
        display: 'swap',
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        icon: `src/assets/images/favicon.png`,
      },
    },
  ],
};

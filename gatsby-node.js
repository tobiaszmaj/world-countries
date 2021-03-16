const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allInternalCountries {
        nodes {
          id
          borders
        }
      }
    }
  `);

  result.data.allInternalCountries.nodes.forEach(country => {
    createPage({
      path: `/${country.id}`,
      component: path.resolve(`./src/layouts/DetailedLayout.js`),
      context: {
        id: country.id,
        borders: country.borders,
      },
    });
  });
};
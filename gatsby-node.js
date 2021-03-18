const path = require(`path`);
const slugify = require('slugify');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const DetailedTemplate = path.resolve(`./src/layouts/DetailedLayout.js`);

  const result = await graphql(`
    query allCountries {
      allCountries(filter: { name: { ne: null } }) {
        nodes {
          id
          name
          borders
        }
      }
    }
  `);

  result.data.allCountries.nodes.forEach(country => {
    const slugifiedName = slugify(country.name, {
      lower: true,
    });

    createPage({
      path: `/${slugifiedName}`,
      component: DetailedTemplate,
      context: {
        id: country.id,
        borders: country.borders,
      },
    });
  });
};

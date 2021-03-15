const path = require(`path`);
const slugify = require('slugify');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
    query {
      allInternalCountries {
        nodes {
          name
          id
        }
      }
    }
  `);

    result.data.allInternalCountries.nodes.forEach(country => {
        const slugifiedTitle = slugify(country.name, {
            lower: true,
        });
        createPage({
            path: `/${slugifiedTitle}`,
            component: path.resolve(`./src/layouts/DetailedLayout.js`),
            context: {
                id: country.id,
            },
        });
    });
};
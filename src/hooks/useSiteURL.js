import { useStaticQuery, graphql } from 'gatsby';

const useSiteURL = () => {
    const { sitePage } = useStaticQuery(
        graphql`
      query {
        sitePage {
          path
        }
      }
    `
    );
    return sitePage.path;
};

export default useSiteURL;
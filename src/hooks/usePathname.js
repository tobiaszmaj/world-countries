import { useStaticQuery, graphql } from 'gatsby';

const usePathname = () => {
  const { sitePage } = useStaticQuery(
    graphql`
      query SocialUsernames {
        sitePage {
          path
        }
      }
    `
  );
  return sitePage.path;
};

export default usePathname;

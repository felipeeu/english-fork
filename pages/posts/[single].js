import config from "@config/config.json";
import Single from "@layouts/PostSingle";
import { getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import parseMDX from "@lib/utils/mdxParser";
const { blog_folder } = config.settings;

// post single layout
const Article = ({
  post,
  mdxContent,
  slug,
  allCategories,
  relatedPosts,
  substages,
}) => {
  const { frontmatter, content } = post;

  return (
    <PostSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
      slug={slug}
      allCategories={allCategories}
      relatedPosts={relatedPosts}
      substages={substages}
    />
  );
};

// get post single slug
export const getStaticPaths = () => {
  const allSlug = getSinglePage(`content/${blog_folder}`);
  const paths = allSlug.map((item) => ({
    params: {
      single: item.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// get post single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const substages = getSinglePage(`content/${blog_folder}`);
  const post = substages.find((p) => p.slug == single);
  const mdxContent = await parseMDX(post.content);
  // related substages
  const relatedPosts = substages.filter((p) =>
    post.frontmatter.stages.some((cate) => p.frontmatter.stages.includes(cate))
  );

  //all stages
  const stages = getTaxonomy(`content/${blog_folder}`, "stages");
  const categoriesWithPostsCount = stages.map((stage) => {
    const filteredPosts = substages.filter((post) =>
      post.frontmatter.stages.includes(stage)
    );
    return {
      name: stage,
      substages: filteredPosts.length,
    };
  });
  return {
    props: {
      post: post,
      mdxContent: mdxContent,
      slug: single,
      allCategories: categoriesWithPostsCount,
      relatedPosts: relatedPosts,
      substages: substages,
    },
  };
};

export default Article;

import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Sidebar from "@layouts/partials/Sidebar";
import { getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import { slugify } from "@lib/utils/textConverter";
import Post from "@partials/Post";
const { blog_folder } = config.settings;

// stage page
const Stage = ({ postsByCategories, stage, substages, stages }) => {
  return (
    <Base title={stage}>
      <div className="section mt-16">
        <div className="container">
          <h1 className="h2 mb-12">
            <span className="section-title ml-1 inline-block capitalize">
              {stage.replace(/-/g, " ")}
            </span>
          </h1>
          <div className="row">
            <div className="lg:col-8">
              <div className="row rounded border border-border p-4 px-3 dark:border-darkmode-border lg:p-6">
                {postsByCategories.map((post, i) => (
                  <div key={`key-${i}`} className="col-12 mb-8 sm:col-6">
                    <Post post={post} />
                  </div>
                ))}
              </div>
            </div>
            <Sidebar substages={substages} stages={stages} />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Stage;

// stage page routes
export const getStaticPaths = () => {
  const allCategories = getTaxonomy(`content/${blog_folder}`, "stages");

  const paths = allCategories.map((stage) => ({
    params: {
      stage: stage,
    },
  }));

  return { paths, fallback: false };
};

// stage page data
export const getStaticProps = ({ params }) => {
  const substages = getSinglePage(`content/${blog_folder}`);
  const filterPosts = substages.filter((post) =>
    post.frontmatter.stages.find((stage) =>
      slugify(stage).includes(params.stage)
    )
  );
  const stages = getTaxonomy(`content/${blog_folder}`, "stages");

  const categoriesWithPostsCount = stages.map((stage) => {
    const filteredPosts = substages.filter((post) =>
      post.frontmatter.stages.map((e) => slugify(e)).includes(stage)
    );
    return {
      name: stage,
      substages: filteredPosts.length,
    };
  });

  return {
    props: {
      substages,
      postsByCategories: filterPosts,
      stage: params.stage,
      stages: categoriesWithPostsCount,
    },
  };
};

import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getTaxonomy } from "@lib/taxonomyParser";
import { humanize, markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
const { blog_folder } = config.settings;
import { getSinglePage } from "@lib/contentParser";
import { FaFolder } from "react-icons/fa";
import { slugify } from "@lib/utils/textConverter";

const Stages = ({ stages }) => {
  return (
    <Base title={"stages"}>
      <section className="section pt-0">
        {markdownify(
          "Estágios da Aquisição",
          "h1",
          "h2 mb-16 bg-theme-light dark:bg-darkmode-theme-dark py-12 text-center lg:text-[55px]"
        )}
        <div className="container pt-12 text-center">
          <ul className="row">
            {stages.map((stage, i) => (
              <li key={`stage-${i}`} className="mt-4 block lg:col-4 xl:col-3">
                <Link
                  href={`/stages/${stage.name}`}
                  className="flex w-full items-center justify-center rounded-lg bg-theme-light px-4 py-4 font-bold text-dark transition hover:bg-primary hover:text-white  dark:bg-darkmode-theme-dark dark:text-darkmode-light dark:hover:bg-primary dark:hover:text-white"
                >
                  <FaFolder className="mr-1.5" />
                  {humanize(stage.name)} ({stage.substages})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Base>
  );
};

export default Stages;

export const getStaticProps = () => {
  const substages = getSinglePage(`content/${blog_folder}`);
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
      stages: categoriesWithPostsCount,
    },
  };
};

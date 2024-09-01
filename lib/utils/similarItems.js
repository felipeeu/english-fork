// similer products
const similerItems = (currentItem, allItems, slug) => {
  let stages = [];
  let tags = [];

  // set stages
  if (currentItem[0].frontmatter.stages.length > 0) {
    stages = currentItem[0].frontmatter.stages;
  }

  // set tags
  if (currentItem[0].frontmatter.tags.length > 0) {
    tags = currentItem[0].frontmatter.tags;
  }

  // filter by stages
  const filterByCategories = allItems.filter((item) =>
    stages.find((stage) => item.frontmatter.stages.includes(stage))
  );

  // filter by tags
  const filterByTags = allItems.filter((item) =>
    tags.find((tag) => item.frontmatter.tags.includes(tag))
  );

  // merged after filter
  const mergedItems = [...new Set([...filterByCategories, ...filterByTags])];

  // filter by slug
  const filterBySlug = mergedItems.filter((product) => product.slug !== slug);

  return filterBySlug;
};

export default similerItems;

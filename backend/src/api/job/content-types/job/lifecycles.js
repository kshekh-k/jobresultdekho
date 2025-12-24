module.exports = {
  async beforeCreate(event) {
    await autoAssignCategory(event);
  },
  async beforeUpdate(event) {
    await autoAssignCategory(event);
  },
};

async function autoAssignCategory(event) {
  const data = event.params.data;
  if (!data || !data.stage) return;

  const mapping = {
    "Job": "latest-job",
    "Admit Card": "admit-card",
    "Result": "result",
    "Syllabus": "syllabus",
    "Waiting List": "waiting-list",
    "Archive Job": "archive-job",
    "Admission": "admission",
    "Answer Key": "answer-key",
  };

  const slug = mapping[data.stage];
  if (!slug) return;

  const category = await strapi.db.query("api::category.category").findOne({
    where: { slug },
    select: ["id"],
  });

  if (category) {
    // ✅ Force overwrite: disconnect everything, then set new category
    data.category = category.id;
  } else {
    // ✅ If no category found, clear relation
    data.category = { set: [] };
  }
}

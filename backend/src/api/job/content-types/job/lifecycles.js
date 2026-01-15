module.exports = {
  async beforeCreate(event) {
    await autoAssignCategory(event);
    setDefaultImportantDatesValues(event);
  },
  async beforeUpdate(event) {
    await autoAssignCategory(event);
  },
};

function setDefaultImportantDatesValues(event) {
  const data = event.params.data;

  // If important_dates component exists, set default values for boolean fields
  if (data.important_dates) {
    const defaults = {
      No_Notification_date: false,
      No_Apply_date: false,
      No_Admitcard_date: false,
      No_Exam_date: false,
      No_Result_date: false
    };

    // Set defaults only if the field is undefined
    for (const [key, value] of Object.entries(defaults)) {
      if (data.important_dates[key] === undefined) {
        data.important_dates[key] = value;
      }
    }
  }
}

async function autoAssignCategory(event) {
  const data = event.params.data;
  if (!data || !data.stage) return;

  // src/api/job/content-types/job/lifecycles.js


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

"use strict";

module.exports = async function findLatestByStage(stage, limit = 10) {
  const currentDate = new Date().toISOString().split("T")[0];

  // Stages where last_date should NOT be validated
  const ignoreDateFor = ["Admit Card", "Result", "Answer Key"];

  // Base where condition
  const whereCondition = {
    publishedAt: { $notNull: true },
    stage,
  };

  // Add date validation ONLY when stage is not in ignore list
  if (!ignoreDateFor.includes(stage)) {
    whereCondition.$or = [
      { last_date: { $gte: currentDate } },
      { last_date: { $null: true } }
    ];
  }

  return await strapi.db.query("api::job.job").findMany({
    where: whereCondition,
    orderBy: [{ last_date: "asc" }],
    limit,
    select: ["id", "title", "last_date", "reference_url", "slug", "Link_not_available"],
    populate: {
      department: { select: ["title", "slug"] },
      category: { select: ["title", "slug"] },
    },
  });
};

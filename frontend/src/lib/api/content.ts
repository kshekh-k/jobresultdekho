// src/lib/api/content.ts
import type { Job } from "./job";
import type { AdmitCard } from "./admit-card";
import type { Result } from "./result";
import type { Syllabus } from "./syllabus";
import type { Admission } from "./admission";
import type { AnswerKey } from "./answer-key";

import { getJobBySlug } from "./job";
import { getAdmitCardBySlug } from "./admit-card";
import { getResultBySlug } from "./result";
import { getSyllabusBySlug } from "./syllabus";
import { getAdmissionBySlug } from "./admission";
import { getAnswerKeyBySlug } from "./answer-key";


// A union type to cover all content
export type Content =
  | Job
  | AdmitCard
  | Result
  | Syllabus
  | Admission
  | AnswerKey;

export async function getContentBySlug(
  type: string,
  slug: string,
  fetchFn?: typeof fetch
): Promise<Content | null> {
  switch (type) {
    case "jobs":
      return await getJobBySlug(slug, fetchFn);
    case "admit-cards":
      return await getJobBySlug(slug, fetchFn);
    case "results":
      return await getJobBySlug(slug, fetchFn);
    case "syllabus":
        return await getSyllabusBySlug(slug, fetchFn);
    case "admissions":
        return await getAdmissionBySlug(slug, fetchFn);
    case "answer-keys":
        return await getJobBySlug(slug, fetchFn);
    default:
      throw new Error(`Unknown content type: ${type}`);
  }
}

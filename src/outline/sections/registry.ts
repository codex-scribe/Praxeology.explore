import type { ComponentType } from 'react'
import S1ConceptOfAction from './mes-1/S1ConceptOfAction.tsx'
import S2FirstImplications from './mes-1/S2FirstImplications.tsx'
import S3Means from './mes-1/S3Means.tsx'
import S4Time from './mes-1/S4Time.tsx'
import S5aEndsAndValues from './mes-1/S5aEndsAndValues.tsx'
import S5bMarginalUtility from './mes-1/S5bMarginalUtility.tsx'

// Section content, keyed by `${chapterSlug}/${sectionSlug}` (see src/content/book.ts).
// A section listed in book.ts without an entry here shows as not yet written.
const sections: Record<string, ComponentType> = {
  'mes-1/1': S1ConceptOfAction,
  'mes-1/2': S2FirstImplications,
  'mes-1/3': S3Means,
  'mes-1/4': S4Time,
  'mes-1/5a': S5aEndsAndValues,
  'mes-1/5b': S5bMarginalUtility,
}

export function sectionContent(chapterSlug: string, sectionSlug: string) {
  return sections[`${chapterSlug}/${sectionSlug}`]
}

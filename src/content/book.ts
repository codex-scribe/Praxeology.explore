// Table of contents for the site. Mirrors the chapter divisions of the Scholar's Edition of
// Man, Economy, and State with Power and Market. Section-level entries get added as each
// chapter's explorations are built. Section titles and page numbers follow the Mises Institute's
// Scholar's Edition (2nd ed., 2009).

export type ChapterStatus = 'planned' | 'in-progress' | 'ready'

export interface Section {
  /** URL segment, e.g. '5b'. */
  slug: string
  /** Label as printed in the book, e.g. '5B' or 'App. A'. */
  label: string
  title: string
  /** Heading the section sits under in the book, e.g. '5. Further Implications'. */
  group?: string
  /** Page range in the Scholar's Edition (Mises Institute, 2nd ed., 2009). */
  pages: string
  status: ChapterStatus
}

export interface Chapter {
  slug: string
  number: number
  title: string
  status: ChapterStatus
  sections: Section[]
}

export interface Part {
  slug: string
  title: string
  chapters: Chapter[]
}

const ch = (
  part: string,
  number: number,
  title: string,
  sections: Section[] = [],
  status: ChapterStatus = 'planned',
): Chapter => ({ slug: `${part}-${number}`, number, title, status, sections })

const sec = (
  label: string,
  title: string,
  pages: string,
  status: ChapterStatus = 'planned',
  group?: string,
): Section => ({
  slug: label.toLowerCase().replace(/[^a-z0-9]/g, ''),
  label,
  title,
  pages,
  status,
  group,
})

const FURTHER = '5. Further Implications'

export const book: Part[] = [
  {
    slug: 'mes',
    title: 'Man, Economy, and State',
    chapters: [
      ch(
        'mes',
        1,
        'Fundamentals of Human Action',
        [
          sec('1', 'The Concept of Action', '1–2', 'ready'),
          sec('2', 'First Implications of the Concept', '2–8', 'ready'),
          sec('3', 'Further Implications: The Means', '8–13', 'ready'),
          sec('4', 'Further Implications: Time', '13–17', 'ready'),
          sec('5A', 'Ends and Values', '17–21', 'ready', FURTHER),
          sec('5B', 'The Law of Marginal Utility', '21–33', 'ready', FURTHER),
          sec('6', 'Factors of Production: The Law of Returns', '33–38'),
          sec('7', 'Factors of Production: Convertibility and Valuation', '38–42'),
          sec('8', 'Factors of Production: Labor versus Leisure', '42–47'),
          sec('9', 'The Formation of Capital', '47–70'),
          sec('10', 'Action as an Exchange', '70–72'),
          sec('App. A', 'Praxeology and Economics', '72–76'),
          sec('App. B', 'On Means and Ends', '76–78'),
        ],
        'in-progress',
      ),
      ch('mes', 2, 'Direct Exchange'),
      ch('mes', 3, 'The Pattern of Indirect Exchange'),
      ch('mes', 4, 'Prices and Consumption'),
      ch('mes', 5, 'Production: The Structure'),
      ch('mes', 6, 'Production: The Rate of Interest and Its Determination'),
      ch('mes', 7, 'Production: General Pricing of the Factors'),
      ch('mes', 8, 'Production: Entrepreneurship and Change'),
      ch('mes', 9, 'Production: Particular Factor Prices and Productive Incomes'),
      ch('mes', 10, 'Monopoly and Competition'),
      ch('mes', 11, 'Money and Its Purchasing Power'),
      ch('mes', 12, 'The Economics of Violent Intervention in the Market'),
    ],
  },
  {
    slug: 'pm',
    title: 'Power and Market',
    chapters: [
      ch('pm', 1, 'Defense Services on the Free Market'),
      ch('pm', 2, 'Fundamentals of Intervention'),
      ch('pm', 3, 'Triangular Intervention'),
      ch('pm', 4, 'Binary Intervention: Taxation'),
      ch('pm', 5, 'Binary Intervention: Government Expenditures'),
      ch('pm', 6, 'Antimarket Ethics: A Praxeological Critique'),
      ch('pm', 7, 'Conclusion: Economics and Public Policy'),
    ],
  },
]

export function findSection(
  chapterSlug: string,
  sectionSlug: string,
): { part: Part; chapter: Chapter; section: Section; prev?: Section; next?: Section } | undefined {
  const found = findChapter(chapterSlug)
  if (!found) return undefined
  const { sections } = found.chapter
  const i = sections.findIndex((s) => s.slug === sectionSlug)
  if (i === -1) return undefined
  return { ...found, section: sections[i], prev: sections[i - 1], next: sections[i + 1] }
}

export function findChapter(slug: string): { part: Part; chapter: Chapter } | undefined {
  for (const part of book) {
    const chapter = part.chapters.find((c) => c.slug === slug)
    if (chapter) return { part, chapter }
  }
  return undefined
}

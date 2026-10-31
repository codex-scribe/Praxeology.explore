// Table of contents for the site. Mirrors the chapter divisions of the Scholar's Edition of
// Man, Economy, and State with Power and Market. Section-level entries get added as each
// chapter's explorations are built.

export type ChapterStatus = 'planned' | 'in-progress' | 'ready'

export interface Chapter {
  slug: string
  number: number
  title: string
  status: ChapterStatus
}

export interface Part {
  slug: string
  title: string
  chapters: Chapter[]
}

const ch = (part: string, number: number, title: string): Chapter => ({
  slug: `${part}-${number}`,
  number,
  title,
  status: 'planned',
})

export const book: Part[] = [
  {
    slug: 'mes',
    title: 'Man, Economy, and State',
    chapters: [
      ch('mes', 1, 'Fundamentals of Human Action'),
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

export function findChapter(slug: string): { part: Part; chapter: Chapter } | undefined {
  for (const part of book) {
    const chapter = part.chapters.find((c) => c.slug === slug)
    if (chapter) return { part, chapter }
  }
  return undefined
}

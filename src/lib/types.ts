export type FormulaType = {
  chapter: string;
  latex: string;
  wrongAnswers: string[];
};

export type SubjectType = {
  id: string;
  name: string;
  chaptersLength?: number;
  chapters?: { id: string; name: string; comingSoon?: true }[];
};

export type ChapterType = {
  id: string;
  name: string;
  comingSoon?: true;
};

export interface Subject {
  name: string;
  chapters: string[];
}

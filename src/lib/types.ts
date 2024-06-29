export type FormulaType = {
  chapter: string;
  latex: string;
  wrongAnswers: string[];
};

export type SubjectType = {
  id: string;
  name: string;
  chaptersLength?: number;
  chapters: ChapterType[];
};

export type ChapterType = {
  id: string;
  name: string;
  comingSoon?: boolean | true;
  formulas?: FormulaType[];
};

export interface Subject {
  name: string;
  chapters: string[];
}

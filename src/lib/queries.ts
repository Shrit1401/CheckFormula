"use server";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { SubjectType, ChapterType, FormulaType } from "@/lib/types";
import { handleError } from "./utils";

export const getAllSubjects = async () => {
  noStore();
  try {
    const subjects = await prisma.subject.findMany();
    return subjects;
  } catch (error) {
    handleError(error);
  }
};

export const getFormulaLength = async () => {
  noStore();
  try {
    const formulaLength = await prisma.formula.count();
    return formulaLength;
  } catch (error) {
    handleError(error);
  }
};

export const getChapters = async (subjectId: string) => {
  noStore();
  try {
    const chapters = await prisma.chapter.findMany({
      where: {
        subjectId: Number(subjectId),
        comingSoon: false,
      },
    });
    return chapters;
  } catch (error) {
    handleError(error);
  }
};

export const getAllChapters = async (subjectId: string) => {
  noStore();
  try {
    const chapters = await prisma.chapter.findMany({
      where: {
        subjectId: Number(subjectId),
      },
    });
    return chapters;
  } catch (error) {
    handleError(error);
  }
};

export const postFormula = async ({
  chapter,
  latex,
  wrongAnswers,
}: FormulaType) => {
  try {
    const formula = await prisma.formula.create({
      data: {
        chapterId: Number(chapter),
        latex,
        wrongAnswers,
      },
    });
    return formula;
  } catch (error) {
    handleError(error);
  }
};

export const getSubjectsList = async () => {
  noStore();
  try {
    const subjects: SubjectType[] = [];

    const subjectsData = await prisma.subject.findMany();

    await Promise.all(
      subjectsData.map(async (subject) => {
        const chapters = await getAllChapters(subject.id as unknown as string);

        subjects.push({
          id: subject.id as unknown as string,
          name: subject.name,
          chaptersLength: chapters!.length,
          chapters: chapters as unknown as { id: string; name: string }[],
        });
      })
    );

    return subjects;
  } catch (error) {
    handleError(error);
  }
};

export const getSubject = async (subjectName: string) => {
  noStore();
  try {
    const res = {} as SubjectType;
    const subject = await prisma.subject.findFirst({
      where: {
        name: subjectName,
      },
    });

    if (subject) {
      const chapters = await getAllChapters(subject.id as unknown as string);

      res.id = subject.id as unknown as string;
      res.name = subject.name;
      res.chaptersLength = chapters!.length;
      res.chapters = chapters!.map((chapter) => ({
        id: chapter.id as unknown as string,
        name: chapter.name,
        comingSoon: chapter.comingSoon as true | undefined,
      }));
    }

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getAllFormulasFromChapter = async (chapterId: string) => {
  noStore();
  try {
    const formulas = await prisma.formula.findMany({
      where: {
        chapterId: Number(chapterId),
      },
    });
    return formulas;
  } catch (error) {
    handleError(error);
  }
};

export const getAllFormulasFromChapters = async (chapterIds: string[]) => {
  noStore();
  try {
    const formulas = await prisma.formula.findMany({
      where: {
        chapterId: {
          in: chapterIds.map((id) => Number(id)),
        },
      },
    });
    return formulas;
  } catch (error) {
    handleError(error);
  }
};

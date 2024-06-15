"use server";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { FormulaType } from "./types";
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

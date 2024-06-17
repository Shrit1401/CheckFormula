"use client";
import ChooseSubject from "@/components/Quiz/ChooseSubject";
import QuizHeader from "@/components/Quiz/QuizHeader";
import { Subject } from "@/lib/types";
import React, { useState } from "react";

const subjects: Subject[] = [
  {
    name: "Mathematics",
    chapters: ["Algebra", "Calculus"],
  },
  {
    name: "Physics",
    chapters: ["Kinematics", "Dynamics"],
  },
  {
    name: "Chemistry",
    chapters: ["Chemical Reactions", "Thermodynamics"],
  },
];

const QuizPage = () => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedChapters, setSelectedChapters] = useState<
    Record<string, string[]>
  >({});
  const [search, setSearch] = useState("");

  return (
    <main>
      <QuizHeader
        subjects={subjects}
        selectedSubjects={selectedSubjects}
        setSelectedSubjects={setSelectedSubjects}
        selectedChapters={selectedChapters}
        setSelectedChapters={setSelectedChapters}
        setSearch={setSearch}
      />
      <ChooseSubject
        subjects={subjects}
        selectedChapters={selectedChapters}
        setSelectedChapters={setSelectedChapters}
        search={search}
      />
    </main>
  );
};

export default QuizPage;

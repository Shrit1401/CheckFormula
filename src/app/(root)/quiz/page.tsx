"use client";
import ChooseSubject from "@/components/Quiz/ChooseSubject";
import QuizHeader from "@/components/Quiz/QuizHeader";
import { Subject } from "@/lib/types";
import React, { useEffect, useState } from "react";

const QuizPage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedChapters, setSelectedChapters] = useState<
    Record<string, string[]>
  >({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {};
    fetchSubjects();
  }, []);

  console.log("subjects", subjects);

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

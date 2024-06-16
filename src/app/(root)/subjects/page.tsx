import SubjectList from "@/components/Subjects/SubjectList";
import React from "react";

const SubjectsPage = () => {
  return (
    <main>
      <div className="flex justify-between items-center mx-10 my-5">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-bold">Subjects</h1>
          <span className="badge">IIT Syllabus</span>
        </div>
        <button className="btn btn-accent">Take Full Formula Quiz</button>
      </div>

      <SubjectList />
    </main>
  );
};

export default SubjectsPage;

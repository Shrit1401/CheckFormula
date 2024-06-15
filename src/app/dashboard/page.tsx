"use client";
import Editor from "@/components/global/Editor";
import {
  getAllSubjects,
  getChapters,
  getFormulaLength,
  postFormula,
} from "@/lib/queries";
import { handleError } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const DashboardForm = () => {
  const [subjects, setSubjects] = useState(
    [] as { id: string; name: string }[] | undefined
  );
  const [chapters, setChapters] = useState(
    [] as { id: string; name: string }[] | undefined
  );
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [latex, setLatex] = useState("");
  const [wrongAnswer1, setWrongAnswer1] = useState("");
  const [wrongAnswer2, setWrongAnswer2] = useState("");
  const [wrongAnswer3, setWrongAnswer3] = useState("");
  const [formulaLength, setFormulaLength] = useState(0);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectsData = await getAllSubjects();
        setSubjects(subjectsData as { id: string; name: string }[] | undefined);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    const fetchFormulaLength = async () => {
      try {
        const length = await getFormulaLength();
        setFormulaLength(length as number);
      } catch (error) {
        console.error("Error fetching formula length:", error);
      }
    };

    fetchSubjects();
    fetchFormulaLength();
  }, []);

  const handleSubjectChange = async (e: any) => {
    const selectedSubjectId = e.target.value;
    setSubject(selectedSubjectId);

    try {
      const chaptersData = await getChapters(selectedSubjectId);
      setChapters(chaptersData as { id: string; name: string }[] | undefined);
      setChapter(""); // Reset chapter when subject changes
    } catch (error) {
      console.error("Error fetching chapters:", error);
      setChapters([]);
    }
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !subject ||
      !chapter ||
      !latex ||
      !wrongAnswer1 ||
      !wrongAnswer2 ||
      !wrongAnswer3
    ) {
      alert("Please fill all the fields");
      return;
    }

    if (
      latex === wrongAnswer1 ||
      latex === wrongAnswer2 ||
      latex === wrongAnswer3 ||
      wrongAnswer1 === wrongAnswer2 ||
      wrongAnswer1 === wrongAnswer3 ||
      wrongAnswer2 === wrongAnswer3
    ) {
      alert("Please make sure all the answers are different");
      return;
    }

    setLoading(true);
    try {
      const wrongAnswers = [wrongAnswer1, wrongAnswer2, wrongAnswer3];
      const result = await postFormula({
        chapter,
        latex,
        wrongAnswers,
      });

      toast.success("Formula added successfully!");
      setLoading(false);
      setLatex("");
      setWrongAnswer1("");
      setWrongAnswer2("");
      setWrongAnswer3("");
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };

  return (
    <div className="my-10">
      <div className="flex flex-row justify-center gap-5 items-center">
        <h1 className="text-3xl font-bold">Formula Dashboard!</h1>
        <p className="text-gray-600">
          {formulaLength > 0 ? formulaLength : "No"} Formulas{" "}
        </p>
      </div>

      <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Subject:
          </label>
          <select
            id="subject"
            value={subject}
            onChange={handleSubjectChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Subject</option>
            {subjects!.map((subj) => (
              <option key={subj.id} value={subj.id}>
                {subj.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="chapter"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Chapter:
          </label>
          <select
            id="chapter"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Chapter</option>
            {chapters!.map((chap) => (
              <option key={chap.id} value={chap.id}>
                {chap.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="actual-answer"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Actual Answer:
          </label>
          <Editor latex={latex} setLatex={setLatex} />
        </div>
        <div className="divider" />

        <div className="mb-4">
          <label
            htmlFor="wrong-answer-1"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Wrong Answer 1:
          </label>
          <Editor latex={wrongAnswer1} setLatex={setWrongAnswer1} />
        </div>
        <div className="mb-4">
          <label
            htmlFor="wrong-answer-2"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Wrong Answer 2:
          </label>
          <Editor latex={wrongAnswer2} setLatex={setWrongAnswer2} />
        </div>
        <div className="mb-4">
          <label
            htmlFor="wrong-answer-3"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Wrong Answer 3:
          </label>
          <Editor latex={wrongAnswer3} setLatex={setWrongAnswer3} />
        </div>
        <div className="divider" />
        <button
          onClick={handleFormSubmit}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? "Adding..." : "Add Formula"}
        </button>
      </div>
    </div>
  );
};

export default DashboardForm;

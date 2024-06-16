"use client";
import { getSubjectsList } from "@/lib/queries";
import { SubjectType } from "@/lib/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SubjectList = () => {
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await getSubjectsList();
        setSubjects(res as SubjectType[]);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const toggleDropdown = (id: number) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-10 my-5">
      {subjects.map((subject) => (
        <div key={subject.id} className="flex">
          <div className="flex-1">
            <div className="bg-white border border-gray-300 hover:bg-gray-300 cursor-pointer transition-all ease-in-out duration-500 rounded-lg p-6 h-full">
              <Link
                href={`/subjects/${subject.name.toLocaleLowerCase()}`}
                className="hidden md:block w-full h-full"
              >
                <div className="flex flex-col h-full">
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-3xl font-bold">{subject.name}</h2>
                    <div className="badge">
                      {subject.chapters?.length} Chapters
                    </div>
                  </div>
                  <ul className="mt-4 flex-grow">
                    {subject.chapters?.map((chapter) => (
                      <li key={chapter.id} className="text-lg">
                        {chapter.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
              <div className="md:hidden">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-2xl font-bold">{subject.name}</h2>
                  <div className="badge">
                    {subject.chapters?.length} Chapters
                  </div>
                </div>
                <ul className="mt-4 hidden md:block">
                  {subject.chapters?.map((chapter) => (
                    <li key={chapter.id} className="text-lg">
                      {chapter.name}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col items-start mt-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/subjects/${subject.name.toLocaleLowerCase()}`}
                    >
                      <button className="btn btn-accent">Open Subject</button>
                    </Link>
                    <button
                      onClick={() => toggleDropdown(Number(subject.id))}
                      className="btn btn-outline"
                    >
                      {dropdownOpen === Number(subject.id)
                        ? "Hide Chapters"
                        : "Show Chapters"}
                    </button>
                  </div>
                  {dropdownOpen === Number(subject.id) && (
                    <ul className="mt-2">
                      {subject.chapters?.map((chapter) => (
                        <li key={chapter.id} className="text-lg">
                          {chapter.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectList;

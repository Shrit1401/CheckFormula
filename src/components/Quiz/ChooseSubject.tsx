import React from "react";
import { Subject } from "@/lib/types";

interface ChooseSubjectProps {
  subjects: Subject[];
  selectedChapters: Record<string, string[]>;
  setSelectedChapters: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  search: string;
}

const ChooseSubject: React.FC<ChooseSubjectProps> = ({
  subjects,
  selectedChapters,
  setSelectedChapters,
  search,
}) => {
  const handleChapterCheckboxChange = (subject: string, chapter: string) => {
    setSelectedChapters((prevSelected) => {
      const currentSelectedChapters = prevSelected[subject] || [];
      const updatedChapters = currentSelectedChapters.includes(chapter)
        ? currentSelectedChapters.filter((c) => c !== chapter)
        : [...currentSelectedChapters, chapter];
      return { ...prevSelected, [subject]: updatedChapters };
    });
  };

  const isChapterSelected = (subject: string, chapter: string) =>
    selectedChapters[subject]?.includes(chapter);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 md:mx-10 my-5">
      {subjects.map((subject) => {
        const filteredChapters = subject.chapters?.filter((chapter) =>
          chapter.toLowerCase().includes(search.toLowerCase())
        );

        return (
          <div key={subject.name} className="flex">
            <div className="flex-1">
              <div className="bg-white border border-gray-300 rounded-lg p-6 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-3xl font-bold">{subject.name}</h2>
                    <div className="badge">
                      {filteredChapters?.length} Chapters
                    </div>
                  </div>
                  <ul className="mt-4 flex-grow">
                    {filteredChapters?.map((chapter) => (
                      <li
                        key={chapter}
                        className="text-lg flex items-center gap-3"
                      >
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm checkbox-accent"
                            checked={isChapterSelected(subject.name, chapter)}
                            onChange={() =>
                              handleChapterCheckboxChange(subject.name, chapter)
                            }
                          />
                          {chapter}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChooseSubject;

import { Subject } from "@/lib/types";
import React, { useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

interface HeaderProps {
  subjects: Subject[];
  selectedSubjects: string[];
  setSelectedSubjects: React.Dispatch<React.SetStateAction<string[]>>;
  selectedChapters: Record<string, string[]>;
  setSelectedChapters: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const QuizHeader: React.FC<HeaderProps> = ({
  subjects,
  selectedSubjects,
  setSelectedSubjects,
  selectedChapters,
  setSelectedChapters,
  setSearch,
}) => {
  useEffect(() => {
    subjects.forEach((subject) => {
      const allChaptersSelected =
        selectedChapters[subject.name]?.length === subject.chapters.length;
      const someChaptersSelected =
        selectedChapters[subject.name]?.length > 0 && !allChaptersSelected;
      const checkbox = document.getElementById(
        `checkbox-${subject.name}`
      ) as HTMLInputElement;

      if (checkbox) {
        if (allChaptersSelected) {
          checkbox.checked = true;
          checkbox.indeterminate = false;
        } else if (someChaptersSelected) {
          checkbox.checked = false;
          checkbox.indeterminate = true;
        } else {
          checkbox.checked = false;
          checkbox.indeterminate = false;
        }
      }
    });
  }, [selectedChapters]);

  const handleSubjectCheckboxChange = (subject: string) => {
    const newSelectedSubjects = selectedSubjects.includes(subject)
      ? selectedSubjects.filter((s) => s !== subject)
      : [...selectedSubjects, subject];
    setSelectedSubjects(newSelectedSubjects);

    if (newSelectedSubjects.includes(subject)) {
      setSelectedChapters((prevSelected) => ({
        ...prevSelected,
        [subject]:
          subjects.find((subj) => subj.name === subject)?.chapters || [],
      }));
    } else {
      setSelectedChapters((prevSelected) => {
        const updatedSelected = { ...prevSelected };
        delete updatedSelected[subject];
        return updatedSelected;
      });
    }
  };

  const handleFilterCheckboxChange = () => {
    if (selectedSubjects.length !== subjects.length) {
      const allSubjects = subjects.map((subject) => subject.name);
      setSelectedSubjects(allSubjects);

      const allChapters: Record<string, string[]> = {};
      subjects.forEach((subject) => {
        allChapters[subject.name] = subject.chapters;
      });
      setSelectedChapters(allChapters);
    } else {
      setSelectedSubjects([]);
      setSelectedChapters({});

      subjects.forEach((subject) => {
        const checkbox = document.getElementById(
          `checkbox-${subject.name}`
        ) as HTMLInputElement;
        if (checkbox) {
          checkbox.checked = false;
          checkbox.indeterminate = false;
        }
      });
    }
  };

  return (
    <div className="flex justify-between items-center mx-10 my-5">
      <h1 className="text-3xl md:text-4xl font-bold">Formula Quiz</h1>
      <div className="flex lg:justify-end justify-center">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search for a chapter..."
            onChange={
              ((e) =>
                setSearch(
                  e.target.value
                ) as unknown) as React.ChangeEventHandler<HTMLInputElement>
            }
            className="input input-bordered"
          />
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-accent m-1">
              Filter <FaChevronDown />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {subjects.map((subject) => (
                <li key={subject.name}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id={`checkbox-${subject.name}`}
                      className="checkbox checkbox-sm checkbox-accent"
                      checked={selectedSubjects.includes(subject.name)}
                      onChange={() => handleSubjectCheckboxChange(subject.name)}
                    />
                    <span className="capitalize">Add {subject.name}</span>
                  </label>
                </li>
              ))}
              <li>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-accent"
                    checked={selectedSubjects.length === subjects.length}
                    onChange={handleFilterCheckboxChange}
                  />
                  <span className="capitalize">Select All</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;

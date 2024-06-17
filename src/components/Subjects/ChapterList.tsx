// ChapterList.tsx

import React, { useEffect, useState } from "react";
import { getAllFormulasFromChapters } from "@/lib/queries"; // Adjust path as per your project structure
import { handleError } from "@/lib/utils"; // Adjust path as per your project structure
import FormulaModal from "./FormulaModal"; // Assuming you have a modal component for formulas
import toast from "react-hot-toast";

type ChapterListProps = {
  chapters: { id: string; name: string; comingSoon?: boolean }[] | undefined;
};

type Formula = {
  id: number;
  latex: string;
  wrongAnswers: string[];
  chapterId: number;
};

const ChapterList: React.FC<ChapterListProps> = ({ chapters }) => {
  const [chapterFormulas, setChapterFormulas] = useState<
    Record<string, Formula[]>
  >({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFormulas, setSelectedFormulas] = useState<
    Formula[] | undefined
  >(undefined);

  useEffect(() => {
    const fetchFormulas = async () => {
      if (chapters) {
        setLoading(true);
        setError(null);
        try {
          const chapterIds = chapters.map((chapter) => chapter.id);
          const formulas = await getAllFormulasFromChapters(chapterIds);
          const formulasByChapter: Record<string, Formula[]> = {};

          formulas!.forEach((formula) => {
            const chapterIdStr = formula.chapterId.toString();
            if (!formulasByChapter[chapterIdStr]) {
              formulasByChapter[chapterIdStr] = [];
            }
            formulasByChapter[chapterIdStr].push(formula);
          });

          setChapterFormulas(formulasByChapter);
        } catch (err) {
          setError("Failed to load formulas");
          console.error(err);
          handleError(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFormulas();
  }, [chapters]);

  const handleShowFormulas = (
    formulas: Formula[] | undefined,
    comingSoon: boolean
  ) => {
    if (comingSoon) {
      toast.error("Formulas for this chapter are coming soon!");
      return;
    }
    setSelectedFormulas(formulas);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col md:grid md:grid-cols-1 lg:grid lg:grid-cols-3 gap-5 mx-10 my-5">
      {chapters?.map((chapter) => (
        <div key={chapter.id} className="flex">
          <div className="flex-1 bg-white border border-gray-300 hover:bg-gray-100 cursor-pointer transition-all ease-in-out duration-300 rounded-lg p-6 shadow-md">
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl sm:text-xl font-bold">
                  {chapter.name}
                </h2>
                <div className="badge min-w-fit">
                  {chapter.comingSoon
                    ? "Coming Soon 🚀"
                    : `${chapterFormulas[chapter.id]?.length || 0} Formulas`}
                </div>
              </div>
              <div className="flex justify-start mt-4">
                <button className="btn btn-accent mr-2">Take Quiz</button>
                <button
                  onClick={() =>
                    handleShowFormulas(
                      chapterFormulas[chapter.id],
                      chapter.comingSoon!
                    )
                  }
                  className="btn btn-outline"
                >
                  Show Formulas
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && (
        <FormulaModal formulas={selectedFormulas} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ChapterList;

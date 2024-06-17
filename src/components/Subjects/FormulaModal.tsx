// FormulaModal.tsx

import React, { useEffect } from "react";
import Viewer from "../global/Viewer";

type Formula = {
  id: number;
  latex: string;
  wrongAnswers: string[];
  chapterId: number;
};

type FormulaModalProps = {
  formulas: Formula[] | undefined;
  onClose: () => void;
};

const FormulaModal: React.FC<FormulaModalProps> = ({ formulas, onClose }) => {
  useEffect(() => {
    // Disable scrolling of background content when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"
        onClick={onClose}
      ></div>
      <div className="modal-container bg-white w-3/4 md:max-w-full mx-auto rounded shadow-lg z-50 animate-scale-in">
        <div className="modal-content text-left px-6 overflow-y-auto max-h-[90vh] py-10">
          <div className="flex justify-between items-center pb-3">
            <p className="text-4xl font-bold">Formulas</p>
            <button
              onClick={onClose}
              className="modal-close cursor-pointer z-50"
            >
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M16.06 16.06a1.5 1.5 0 0 1-2.12 0L9 11.12l-4.94 4.94a1.5 1.5 0 0 1-2.12-2.12l4.94-4.94-4.94-4.94a1.5 1.5 0 1 1 2.12-2.12L9 6.88l4.94-4.94a1.5 1.5 0 0 1 2.12 2.12L11.12 9l4.94 4.94a1.5 1.5 0 0 1 0 2.12z"></path>
              </svg>
            </button>
          </div>
          <div className="mt-2">
            {formulas?.length ? (
              formulas.map((formula, i) => (
                <div key={i + 1} className="mb-6">
                  <div className="text-lg font-semibold mb-2">
                    Formula {i + 1}
                  </div>
                  <Viewer latex={formula.latex} />
                </div>
              ))
            ) : (
              <div
                className="
                flex
                items-center
                justify-center
                text-accent
                text-lg
                font-semibold
              "
              >
                No formulas For Now
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaModal;

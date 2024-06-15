"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const EditableMathField = dynamic(
  () => import("react-mathquill").then((mod) => mod.EditableMathField),
  { ssr: false }
);

type EditorProps = {
  latex?: string;
  setLatex: (latex: string) => void;
};

const Editor = ({ latex = "", setLatex }: EditorProps) => {
  useEffect(() => {
    import("react-mathquill").then((mq) => {
      mq.addStyles();
    });
  }, []);

  const [latexValue, setLatexValue] = useState(latex);

  return (
    <div className="flex md:flex-row flex-col md:gap-2">
      <EditableMathField
        latex={latex}
        className="min-w-[300px] min-h-[50px] border border-gray-300 rounded p-2"
        onChange={(mathField) => {
          setLatex(mathField.latex());
          setLatexValue(mathField.latex());
        }}
      />
      <br />
      <input
        type="text"
        value={latexValue}
        className="input input-bordered min-w-[300px]"
        disabled
      />
    </div>
  );
};

export default Editor;

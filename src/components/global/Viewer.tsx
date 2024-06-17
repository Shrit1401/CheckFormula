"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const StaticMathField = dynamic(
  () => import("react-mathquill").then((mod) => mod.StaticMathField),
  { ssr: false }
);

type ViewerProps = {
  latex?: string;
};

const Viewer = ({ latex = "" }: ViewerProps) => {
  useEffect(() => {
    import("react-mathquill").then((mq) => {
      mq.addStyles();
    });
  }, []);

  return (
    <div className="flex md:flex-row flex-col md:gap-2">
      <StaticMathField
        style={{
          border: "none",
          outline: "none",
          padding: "0",
          backgroundColor: "transparent",
          fontSize: "1.5rem",
        }}
      >
        {latex}
      </StaticMathField>
    </div>
  );
};

export default Viewer;

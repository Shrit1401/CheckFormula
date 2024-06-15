"use client";
import Editor from "@/components/global/Editor";

import { useState } from "react";

export default function Home() {
  const [state, setState] = useState("");
  return (
    <main>
      <Editor latex={state} setLatex={setState} />
    </main>
  );
}

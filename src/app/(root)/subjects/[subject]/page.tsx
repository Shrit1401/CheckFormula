"use client";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getSubject } from "@/lib/queries";
import { SubjectType } from "@/lib/types";
import { handleError } from "@/lib/utils";

import { useUser } from "@clerk/nextjs";
import ChapterList from "@/components/Subjects/ChapterList";

const SubjectPage = () => {
  const user = useUser();
  const { subject } = useParams();
  const subjectName =
    (subject as string).charAt(0).toUpperCase() + subject.slice(1);

  const [subjectData, setSubjectData] = useState<SubjectType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const data = await getSubject(subjectName);
        setSubjectData(data as unknown as SubjectType);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjectData();
  }, [subjectName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!subjectData?.chapters) {
    const router = useRouter();
    router.push("/");
    return null;
  }

  return (
    <main>
      <div className="flex justify-between items-center mx-10 my-5">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-bold">{subjectName}</h1>
          <span className="badge">Hey {user.user?.firstName}👋 </span>
        </div>
        <button className="btn btn-accent">
          Take {subjectName} Formula Quiz
        </button>
      </div>

      <ChapterList chapters={subjectData.chapters} />
    </main>
  );
};

export default SubjectPage;

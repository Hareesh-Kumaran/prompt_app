"use client";
import Form from "@/components/Form";
import "@/styles/Create&Edit-Page.scss";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
export default function UpdatePage() {
  const [updatePrompt, setUpdatePrompt] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const fetchPostById = async () => {
    const res = await axios.get(`http://localhost:3000/api/prompt/${id}`);
    if (res.data.prompt) {
      setUpdatePrompt(res.data.prompt);
    }
  };
  useEffect(() => {
    // alert(id);
    if (id) {
      fetchPostById();
    }
    else
    {

    router.push("/profile");
    }
  }, [id]);

  const handleSubmit = async () => {
    const res = await axios.patch(`http://localhost:3000/api/prompt/${id}`, {
      prompt: updatePrompt.prompt,
      tag: updatePrompt.tag,
    });

  };
  return (
    <div className="pageWrapper">
      <section>
        <h1>Edit prompt</h1>
        <p>Edit and share your prompt with the world.</p>
        <Form
          type="Edit"
          promptObj={updatePrompt}
          setPromptObj={setUpdatePrompt}
          handleSubmit={handleSubmit}
        />
      </section>
    </div>
  );
}

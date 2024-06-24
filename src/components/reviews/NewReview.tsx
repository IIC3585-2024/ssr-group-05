"use client";

import { useRef, useState } from "react";
import ReviewForm from "./ReviewForm";

export default function NewReview({
  serieId,
  createReview,
}: {
  serieId: string;
  createReview: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (formData: any) => {
    createReview(formData);
    formRef.current?.reset();
  };

  function openForm() {
    setIsOpen(!isOpen);
  }

  return(
    <div>
      <button
        onClick={openForm}
        className="bg-blue-500 text-white rounded-lg p-2 mb-4 hover:bg-blue-600"
      >
        Escribir reseña
      </button>
      {isOpen && <ReviewForm serieId={serieId} handleSubmit={handleSubmit} formRef={formRef} />}
    </div>
  )
}

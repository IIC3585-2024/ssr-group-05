"use client";

import { useRef } from "react";

export default function NewReview({
  serieId,
  createReview,
}: {
  serieId: string;
  createReview: any;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (formData: any) => {
    createReview(formData);
    formRef.current?.reset();
  };

  return (
    <div>
      <h2>Agregar review</h2>
      <form ref={formRef} action={handleSubmit}>
        <input type="hidden" name="serieId" value={serieId} />
        <input type="text" name="title" id="title" placeholder="Título" />
        <input type="text" name="content" id="content" placeholder="Contenido" />
        <input type="number" name="stars" id="stars" placeholder="Estrellas" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

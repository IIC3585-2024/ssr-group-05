export default function ReviewForm({serieId, handleSubmit, formRef}: {serieId: string, handleSubmit: any, formRef: any}) {
    return (
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            handleSubmit(formData);
          }}
          className="flex flex-col mb-8 w-1/2"
        >
          <input
            type="hidden"
            name="serieId"
            value={serieId}
          />
          <div className="flex items-center">
            <div className="flex flex-col mr-10">
              <label htmlFor="title" className="mb-2">
                Título
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="border border-gray-300 rounded-lg p-2 mb-4"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="stars" className="mb-2">
                Calificación
              </label>
              <select
                id="stars"
                name="stars"
                className="border border-gray-300 rounded-lg p-2 mb-4"
              >
                {
                  Array.from({length: 10}, (_, i) => i + 1).map((star) => (
                    <option key={star} value={star}>{star}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <label htmlFor="content" className="mb-2">
            Contenido
          </label>
          <textarea
            id="content"
            name="content"
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full h-32"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg w-fit p-2"
          >
            Enviar
          </button>
        </form>
    )
}
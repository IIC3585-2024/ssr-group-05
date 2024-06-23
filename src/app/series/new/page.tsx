import { createSerie } from "./actions";

export default async function Series() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="w-full max-w-lg p-8 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Agregar Serie</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Título"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <input
            type="text"
            name="streamingService"
            id="streamingService"
            placeholder="Servicio de streaming"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <input
            type="number"
            name="seasons"
            id="seasons"
            placeholder="Temporadas"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <input
            type="number"
            name="episodesPerSeason"
            id="episodesPerSeason"
            placeholder="Episodios por temporada"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Descripción"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Categoría"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            name="imageUrl"
            id="imageUrl"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <button
            formAction={createSerie}
            className="px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Agregar serie
          </button>
        </div>
      </form>
    </div>
  );
}

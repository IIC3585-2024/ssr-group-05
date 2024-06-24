export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-7xl mb-4">🚧👷‍♂️🔧</div>
      <h1 className="text-9xl font-bold mb-2">404</h1>
      <p className="text-2xl mb-4">
        Ups! La página que estás buscando no existe.
      </p>
      <div className="text-7xl mb-4">🙈🛠️😕</div>
      <a href="/" className="text-lg text-blue-500 hover:underline">
        Volver al inicio
      </a>
    </div>
  );
}

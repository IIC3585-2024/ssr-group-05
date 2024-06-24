import Image from "next/image";

export default function ReviewCard({
  id,
  title,
  content,
  stars,
}: {
  id: string;
  title: string;
  content: string;
  stars: number;
}) {
  return (
    <div key={id} className="mb-6 p-4 border border-gray-200 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-2">{content}</p>
      <p>
        
        <strong>Calificación: {" "}
        <Image
          src="/tomatoe.svg"
          alt="tomatoe"
          width={30}
          height={30}
          className="inline-block self-center items-center hover:animate-spin"
        /> {" "}</strong> {stars}
      </p>
    </div>
  );
}

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
        <strong>Rating:</strong> {stars}
      </p>
    </div>
  );
}

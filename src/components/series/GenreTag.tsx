export default function GenreTag({ genre }: { genre: string }) {
    return (
        <div className="bg-gray-200 text-gray-700 text-sm font-semibold rounded-full px-3 py-1">
            {genre}
        </div>
    );
}
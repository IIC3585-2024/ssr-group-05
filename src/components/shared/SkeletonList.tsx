import SkeletonCard from "./SkeletonCard";

export default function SkeletonList() {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4">
        {[...Array(12)].map((_, index) => (
            <SkeletonCard key={index} />
        ))}
        </div>
    );
}
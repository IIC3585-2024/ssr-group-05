import PlataformItem from "./PlatformItem";

export default function PlatformList({ platforms }: { platforms: any[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map((platform) => (
                <PlataformItem key={platform.id} platform={platform} />
            ))}
        </div>
    );
}
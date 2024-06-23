export default function PlatformItem({ platform }: { platform: any }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{platform.platforms.platform}</h3>
            </div>
        </div>
    );
}
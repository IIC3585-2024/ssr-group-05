export default function PlatformItem({ platform }: { platform: any }) {
    return (
        <a href={platform.platformUrl} className="bg-white shadow-lg rounded-lg p-4 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-indigo-200">
            <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{platform.platforms.platform}</h3>
            </div>
        </a>
    );
}
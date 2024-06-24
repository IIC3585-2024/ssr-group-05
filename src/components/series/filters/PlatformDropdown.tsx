"use client"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function PlatformDropdown({platforms}: {platforms: any[] | null}){
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    function handlerChange(value: string) {
        const params = new URLSearchParams(searchParams);
        if (value && value !== 'Plataforma') {
            params.set('platform', value);
        } else {
            params.delete('platform');
        }

        replace(`${pathName}?${params.toString()}`);
    }

    return (
        <div className="flex items-center gap-2">
            <select
                className="p-2 rounded w-full text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(event) => handlerChange(event.target.value)}
                defaultValue={searchParams.get('platform') || 'Plataforma'}
            >
            <option key={1}>
                Plataforma
            </option>
                {platforms?.map((platform) => (
                    <option key={platform.platform} value={platform.platform}>
                        {platform.platform}
                    </option>
                ))}
            </select>
        </div>
    );
}
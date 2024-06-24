'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function SearchInput() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    function handleSearch(value: string) {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }

        replace(`${pathName}?${params.toString()}`);
    }

    return (
        <div className="flex items-center gap-2">
            <input
                type="text"
                placeholder="Buscar serie..."
                className="p-2 rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(event) => handleSearch(event.target.value)}
                defaultValue={searchParams.get('search')?.toString() || ''}
            />
        </div>
    );
}
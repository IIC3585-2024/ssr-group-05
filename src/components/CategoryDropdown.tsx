"use client"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function CategoryDropdown({genres}: {genres: any[] | null}){
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    function handlerChange(value: string) {
        const params = new URLSearchParams(searchParams);
        if (value && value !== 'Categoría') {
            params.set('category', value);
        } else {
            params.delete('category');
        }

        replace(`${pathName}?${params.toString()}`);
    }

    return (
        <div className="flex items-center gap-2">
            <select
                className="p-2 rounded w-full text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(event) => handlerChange(event.target.value)}
                defaultValue={searchParams.get('platform')?.toString()}
            >
            <option key={1} selected={true}>
                Categoría
            </option>
                {genres?.map((category) => (
                    <option key={category.genre} value={category.genre}>
                        {category.genre}
                    </option>
                ))}
            </select>
        </div>
    )
}
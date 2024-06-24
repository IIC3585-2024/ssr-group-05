"use client"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


export default function StarDropdown(){
    const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    function handlerChange(value: string) {
        const params = new URLSearchParams(searchParams);
        if (value && value !== 'Calificación') {
            params.set('stars', value);
        } else {
            params.delete('stars');
        }

        replace(`${pathName}?${params.toString()}`);
    }

    return (
        <div className="flex items-center gap-2">
            <select
                className="p-2 rounded text-gray-400 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(event) => handlerChange(event.target.value)}
                defaultValue={undefined}
            >
            <option key={1} selected={true}>
                Calificación
            </option>
                {stars.map((star) => (
                    <option key={star} value={star}>
                        {star}
                    </option>
                ))}
            </select>
        </div>
    );
}
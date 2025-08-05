'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

// カテゴリの型指定
type Category = {
    id: string;
    name: string;
    slug: string;
}

// Propsの型指定
type CategoryNavProps = {
    categories: Category[];
};

export default function CategoryNav({categories}: CategoryNavProps) {
    const pathname = usePathname();

    return (
        <div className="h-full flex items-center">
            {categories.map((category) => {
                const isActive = pathname === `/categories/${category.slug}`
                return (
                    <Link 
                        key={category.id} 
                        href={`/categories/${category.slug}`} 
                        className={`
                            relative px-4 py-0 text-sm transition-colors h-full flex items-center  
                            ${isActive ? 'text-black font-bold border-b-2' : 'text-gray-500 font-semibold hover:text-black'}
                        `}>
                            {category.name}
                    </Link>
                )
            })}
        </div>
    )
}
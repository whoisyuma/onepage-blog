'use client'

import Link from "next/link"
import { useState } from "react";

// タグの型指定
type Tag = {
  id: string;
  name: string;
  slug: string;
}

// Propsの型指定
type Props = {
    tags: Tag[];
}

export default function TagList({tags}: Props) {
    const [showAll, setShowAll] = useState(false);
    const visibleTags = showAll ? tags : tags.slice(0, 5);

    return (
        <div>
            <div className="flex flex-wrap mt-1">
                {visibleTags.map((tag) => (
                    <Link key={tag.id} href={`/tags/${tag.slug}`} className="inline-block bg-white hover:bg-gray-100 border mr-1 mb-1 border-gray-400 rounded-xl px-3 py-1 text-xs text-gray-600 hover:border-gray-500 transition duration-200">
                        #{tag.name}
                    </Link>
                ))}
            </div>

            {/* showAllによってボタンを変える */}
            {tags.length > 5 && (
                <div className="mt-1 text-xs">
                    <button onClick={() => setShowAll(!showAll)} className="text-gray-600 hover:text-gray-800 hover:underline transition duration-200">
                        {showAll ? '表示を減らす' : 'すべてのタグを表示'}
                    </button>
                </div>
            )}
        </div>
    )
}
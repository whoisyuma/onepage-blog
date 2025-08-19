'use client'

import { useEffect, useState } from 'react';
import style from "./BlogContent.module.css";

// Propsの型指定
type Props = {
    content: string;
    className: string;
}

export default function BlogContent({content, className}: Props) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, [])


    useEffect(() => {
        if (!isClient) return;

        const container = document.querySelector(`.${className}`);
        const iframes = container?.querySelectorAll('iframe');

        iframes?.forEach((iframe) => {
            const src = iframe.getAttribute('src') || '';

            if (src.includes('google.com/maps')) {
                const parentDiv = iframe.parentElement;
                if (parentDiv && parentDiv.tagName === 'DIV') {
                    parentDiv.classList.add(style.googlemapWrapper);
                }
            }
        })
    }, [isClient, className]);

    if (!isClient) {
        return null;
    }

    return (
        <div className={className}>
            <div dangerouslySetInnerHTML={{ __html: content}} />
        </div>
    )
}
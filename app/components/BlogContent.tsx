'use client'

import { useEffect, useState } from 'react';
import style from '../blog/[slug]/BlogDetail.module.css';

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

    if (!isClient) {
        return null;
    }

    return (
        <div className={className} dangerouslySetInnerHTML={{ __html: content}} />
    )
}
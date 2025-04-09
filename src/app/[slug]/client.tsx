'use client'
import dynamic from 'next/dynamic';
import Link from 'next/link';
const Scene = dynamic(() => import("@/components/VideoScene"), { ssr: false })
export default function Client(slug:{slug:string}) {
    return (
        <div className="main-2">
            <Scene id={slug.slug} />
            <video id='video' controls preload="none">
                <source src={`/video${slug.slug}.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <Link id='next' href={`${slug.slug}/test`}>К тесту</Link>
        </div>
    )
}
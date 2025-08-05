import { client } from "@/libs/microcms"
import Image from "next/image";
import Link from "next/link";

// アイコン画像の型指定
type IconImage = {
  url: string,
  height: number,
  width: number,
}

// プロフィールの型指定
type Profile = {
    id: string;
    name: string;
    iconImage: IconImage;
    introduction: string;
}

// プロフィールの取得
async function getProfile(): Promise<Profile | null> {
    try {
        const data = await client.getList<Profile>({
            endpoint: 'profile',
            queries: {
                limit: 3,
            }
        });
        const profile = data.contents[0];
        return profile;
    } catch (error) {
        console.error('プロフィールの取得に失敗しました：', error)
        return null;
    }
}

export default async function HomeProfile() {
    const profile = await getProfile();
    if (!profile) {
        return (
            <p>プロフィールの取得に失敗しました。</p>
        )
    }

    return (
        <div>
            <div className="relative w-15 h-15 mb-1 md:w-20 md:h-20 md:mb-3">
                <Image
                src={profile?.iconImage.url}
                alt="アイコン画像"
                fill
                className="rounded-full object-cover"
                />
            </div>
            <h2 className="text-xl text-black font-bold mb-1 md:mb-3">{profile?.name}</h2>
            <p className="text-sm text-black leading-relaxed">
                {profile?.introduction}
            </p>
            <div className="mt-2 flex gap-x-2">
                <Link href='https://github.com/whoisyuma'><img src="/github-icon.svg" alt="アイコン画像" className="w-6 h-6"/></Link>
                <Link href='mailto:whoisyuma.0913@gmail.com'><img src="/email-icon.svg" alt="アイコン画像" className="w-7 h-7"/></Link>
            </div>
        </div>
    )
}
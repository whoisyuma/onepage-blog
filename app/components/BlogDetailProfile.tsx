import { client } from "@/libs/microcms";
import Image from "next/image";

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

export default async function BlogDetailProfile() {
    const profile = await getProfile();
    if (!profile) {
        return (
            <p>プロフィールの取得に失敗しました。</p>
        )
    }

    return (
        <div className="sticky top-25">
            <div className="flex items-center">
                <Image
                    src={profile?.iconImage.url}
                    alt="アイコン画像"
                    width={60}  
                    height={60}  
                    className="mr-2 mb-1 md:mb-3 rounded-full"
                />
                <h2 className="text-xl text-black font-semibold mb-1 md:mb-3">{profile.name}</h2>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
                {profile.introduction}
            </p>
        </div>
    )
}

import { client } from "@/libs/microcms"
import Link from "next/link"

// ISR設定
export const revalidate = 300;

// カテゴリの型指定
type Category = {
    id: string;
    name: string;
    slug: string;
}

// microCMSからブログのカテゴリを取得
async function getCategories(): Promise<Category[] | null> {
  try {
    const categories = await client.getList<Category>({
      endpoint: 'categories',
      queries: {
        limit: 5,
      }
    });
    return categories.contents;
  } catch (error) {
    console.error('カテゴリの取得に失敗しました：', error)
    return null
  }
}

// タグの型指定
type Tag = {
  id: string;
  name: string;
  slug: string;
}

// microCMSからブログのタグを取得
async function getTag(): Promise<Tag[] | null> {
  try {
    const tags = await client.getList<Tag>({
      endpoint: 'tags',
      queries: {
        limit: 50,
      }
    });
    return tags.contents;
  } catch (error) {
    console.error('タグの取得に失敗しました：', error);
    return null;
  }
}

export default async function SiteMap() {
    const categories = await getCategories();
    const tags = await getTag();

    return (
        <div className='bg-white pt-18 min-h-screen pb-10'>
            <header className="py-12 border-b border-gray-200">
                <div className="container mx-auto px-4 md:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                        サイトマップ
                    </h1>
                </div>
            </header>

            <div className="container mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                <section className="p-5">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">固定ページ</h2>
                    <ul className="space-y-2 text-lg ml-5">
                        <li className="list-disc"><Link href='/' className="text-gray-600 hover:text-gray-900 hover:border-b">ホーム</Link></li>
                        {/* <li className="list-disc"><Link href='/' className="text-gray-600 hover:text-gray-900 hover:border-b">お問い合わせ</Link></li>
                        <li className="list-disc"><Link href='/' className="text-gray-600 hover:text-gray-900 hover:border-b">プライバシーポリシー</Link></li> */}
                    </ul>
                </section>

                <section className="p-5">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">カテゴリ一覧</h2>
                    {categories && categories.length > 0 && (
                        <ul className="space-y-2 text-lg ml-5">
                            {categories.map((category) => (
                                <li key={category.id} className="list-disc">
                                    <Link href={`categories/${category.slug}`} className="text-gray-600 hover:text-gray-900 hover:border-b">
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className="p-5">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">タグ一覧</h2>
                    {tags && tags.length > 0 && (
                        <ul className="flex flex-wrap mt-1">
                            {tags.map((tag) => (
                                <li key={tag.id}>
                                    <Link href={`/tags/${tag.slug}`} className="inline-flex items-center bg-white hover:bg-gray-100 border mr-1 mb-1 border-gray-400 rounded-xl px-3 py-1 text-sm text-gray-600 hover:border-gray-500 transition duration-200">
                                        #{tag.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </div>
    )
}
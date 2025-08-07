import { client } from "@/libs/microcms"
import Link from "next/link"
import HomeProfile from "../components/HomeProfile";

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
      <main className='bg-white pt-18 min-h-screen pb-10'>
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:mt-10 max-w-6xl md:mx-auto">
          <aside className="md:w-3/10 w-full md:p-0 p-4">
            <HomeProfile/>
          </aside>

          <section className="md:w-7/10 w-full md:px-4 px-2">
            <div className="mb-5">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 bg-gray-200 p-2">固定ページ</h2>
              <ul className="space-y-2 text-lg ml-10">
                <li className="list-disc"><Link href='/' className="text-gray-600 hover:text-gray-900 hover:border-b">ホーム</Link></li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 bg-gray-200 p-2">カテゴリ一覧</h2>
                {categories && categories.length > 0 && (
                  <ul className="space-y-2 text-lg ml-10">
                    {categories.map((category) => (
                      <li key={category.id} className="list-disc">
                        <Link href={`categories/${category.slug}`} className="text-gray-600 hover:text-gray-900 hover:border-b">
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
              
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800 bg-gray-200 p-2">タグ一覧</h2>
                    {tags && tags.length > 0 && (
                        <ul className="flex flex-wrap mt-1 ml-5">
                            {tags.map((tag) => (
                                <li key={tag.id}>
                                    <Link href={`/tags/${tag.slug}`} className="inline-flex items-center bg-white hover:bg-gray-100 border mr-1 mb-1 border-gray-400 rounded-xl px-3 py-1 text-sm text-gray-600 hover:border-gray-500 transition duration-200">
                                        #{tag.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
            </div>
          </section>
        </div>
      </main>
    )
}
import HomeProfile from "@/app/components/HomeProfile"
import TagList from "@/app/components/TagList";
import { client } from "@/libs/microcms";
import Image from "next/image";
import Link from "next/link";

// ISR設定
export const revalidate = 300;

// アイキャッチ画像の型指定
type Eyecatch = {
  url: string,
  height: number,
  width: number,
}

// ブログ記事の型指定
type Blog = {
  id: string,
  title: string,
  publishedAt: string,
  eyecatch?: Eyecatch,
  slug: string,
}

// タグの型指定
type Tag = {
    id: string;
    name: string;
    slug: string;
}

// Propsの型指定
type TagPageProps = {
    params: Promise<{slug: string}>
}

// 動的ルーティングのためにタグのslugリストを全部取得する
export async function generateStaticParams() {
    try {
        const tagsData = await client.getList<Tag>({
            endpoint: 'tags',
            queries: {
                limit: 100
            },
        });
        return tagsData.contents.map((tag) =>({
            slug: tag.slug,
        }));
    } catch (error) {
        console.error('generateStaticParamsに失敗しました：', error)
        return []
    }
}

// microCMSから特定のタグのブログ記事を取得
async function getPostsByTag(tagSlug: string): Promise<{dataContents: Blog[]; tagName: string} | null> {
  try {
    const tagsData = await client.getList<Tag>({
      endpoint: 'tags',
      queries: {
        limit: 100 
      }
    });
    // tagsDataの中から今のパラメーターと一致するタグを取得する
    const tag = tagsData.contents.find(data => data.slug === tagSlug);
    if (!tag) return {dataContents: [], tagName: ""};

    // 取得したカテゴリのidを使ってフィルタをかけて投稿を取得する
    const data = await client.getList<Blog>({
      endpoint: 'blogs',
      queries: {
        limit: 50,
        filters: `tags[contains]${tag.id}`
      }
    });
    return {dataContents: data.contents, tagName: tag.name};
  } catch (error) {
    console.error('ブログ記事の取得に失敗しました：', error);
    return null;
  }
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


// 日付を「〜前」に変換する関数
const formatRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}秒前`;
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分前`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}時間前`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}日前`;
  }
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}ヶ月前`;
  }
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}年前`;
};

export default async function TagsHome({params}: TagPageProps) {
    const {slug} = await params;
    const result = await getPostsByTag(slug);
    const posts = result?.dataContents ?? [];
    const tagName = result?.tagName ?? "";
    const tags = await getTag();

    return (
        <main className='bg-white pt-18 min-h-screen pb-10'>
          {/* メイン画像 */}
          <div className="relative w-full h-40 md:h-55">
            <Image
              src="/main-picture.png"
              alt="メイン画像"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:mt-10 max-w-6xl md:mx-auto">
            {/* 左のプロフィールセクション */}
            <aside className="md:w-3/10 w-full md:p-0 p-4">
              <HomeProfile/>

              {tags && tags.length > 0 && (
                <div className="mt-5 hidden md:block">
                  <h2 className="text-sm font-bold">タグ一覧</h2>
                  <TagList tags={tags}/>
                </div>
              )}

              <div className="mt-5 md:hidden">
                <Link href='/sitemap' className="block text-sm text-center w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200">
                  すべてのタグを見る
                </Link>
              </div>
            </aside>

            {/* 右のブログ一覧セクション */}
            <section className="md:w-7/10 w-full">
              <nav className="w-full border-b border-gray-400 pb-2">
                <div className="max-w-6xl md:mx-auto">
                    <p className="relative px-4 text-sm">タグ：{tagName}</p>
                </div>
              </nav>

              {posts && posts.length > 0 ? (
                <ul className="grid grid-cols-1 md:gap-3 md:grid-cols-3">
                  {posts.map((post) => (
                    <li key={post.id} className="hover:bg-gray-100 transition duration-300 md:pt-5 mb-0 md:p-2 mx-2 md:mx-0 border-b border-gray-400 md:border-none">
                      <Link href={`/blog/${post.slug}`} className="h-full md:block flex items-center justify-between py-2 md:py-0 flex-row-reverse">
                        <div className="md:mb-3">
                          <img src={post.eyecatch?.url} alt="サムネイル画像" className="md:w-full border border-gray-300 md:h-34 h-15 w-30 object-cover rounded-xl overflow-hidden"/>
                        </div>

                        <div className="w-60 md:w-full">
                          <h2 className="font-semibold md:text-base text-sm mb-3">{post.title}</h2>
                          <div className="flex items-center md:gap-x-2 gap-x-1">
                            <div className="flex items-center md:gap-x-2 gap-x-1">
                              <div className="relative border rounded-full w-4 h-4 md:w-6 md:h-6 overflow-hidden">
                                <Image
                                  src="/onepage.png"
                                  alt="アイコン画像"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <h3 className="md:text-sm text-black text-xs">Yuma</h3>
                            </div>
                            <p className="text-gray-600 md:text-xs text-[10px]">{formatRelativeTime(post.publishedAt)}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5">
                  {posts === null ? 'ブログ記事の取得に失敗しました。再度お試しください。' : '現在、記事がありません。'}
                </p>
              )}
            </section>
          </div>
        </main>
    )
}
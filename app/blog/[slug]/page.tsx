import { client } from "@/libs/microcms";
import style from "./BlogDetail.module.css"
import Link from "next/link";
import BlogContent from "@/app/components/BlogContent";
import BlogDetailProfile from "../../components/BlogDetailProfile";
import Image from "next/image";

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
  updatedAt: string,
  eyecatch?: Eyecatch,
  slug: string,
  tags: string,
  body: string,
}

// 前後の記事情報を含めた型定義
type BlogWithNav = Blog & {
    prevBlog: {title: string, slug: string} | null,
    nextBlog: {title: string, slug: string} | null,
}

// Propsの型指定
type PageProps = {
    params: Promise<{slug: string}>
}

// 動的ルーティングのためにslugのリストを全部取得する
export async function generateStaticParams() {
    try {
        const data = await client.getList<Blog>({
            endpoint: 'blogs',
        })
        return data.contents.map((blog) => ({
            slug: blog.slug,
        }))
    } catch (error) {
        console.error('generateStaticParamsに失敗しました：', error)
        return []
    }
}

// 特定の投稿とその前後の記事の取得
async function getBlogWithNavigation(slug: string): Promise<BlogWithNav | null> {
    try {
        const decodedSlug = decodeURIComponent(slug);

        // 現在の記事を取得
        const currentBlogData = await client.getList<Blog>({
            endpoint: 'blogs',
            queries: {
                filters: `slug[equals]${decodedSlug}`,
            },
        });
        
        const currentBlog = currentBlogData.contents[0];

        if (!currentBlog) {
            return null;
        }

        // 前後の記事の情報を取得
        const navData = await client.getList<{ id: string, title: string, slug: string }>({
            endpoint: 'blogs',
            queries: {
                fields: 'id,title,slug',
                orders: '-updatedAt',
                limit: 50,
            }
        });

        const currentIndex = navData.contents.findIndex((blog) => blog.slug === currentBlog.slug);

        const prevBlog = currentIndex > 0 ? {
            title: navData.contents[currentIndex - 1].title.toString(),
            slug: navData.contents[currentIndex - 1].slug,
        } : null;

        const nextBlog = currentIndex < navData.contents.length - 1 ? {
            title: navData.contents[currentIndex + 1].title.toString(),
            slug: navData.contents[currentIndex + 1].slug,
        } : null;

        return {...currentBlog, prevBlog, nextBlog};
    } catch (error) {
        console.error('ブログ記事とナビゲーションの取得に失敗しました。', error);
        return null;
    }
}

// updatedAtの表示を変更する
function formatData(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP');
}

export default async function BlogDetail({params}: PageProps) {
    const {slug} = await params;
    const post = await getBlogWithNavigation(slug)

    return (
        <main className='bg-white pt-18 min-h-screen'>
            {post === null ? (
                <p>投稿内容の取得に失敗しました。再度お試しください。</p>
            ) : (
                <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:mt-10 lg:mx-20">
                    <aside className="hidden lg:block md:w-2/10 w-full md:p-0 p-4 pb-10">
                        <BlogDetailProfile/>
                    </aside>

                    <section className="lg:w-8/10 w-full pb-10">
                        <div className="lg:ml-10 lg:mr-65 flex flex-col md:mx-20">
                            <div className="relative w-full lg:h-100 md:h-90 h-60 mb-10 overflow-hidden">
                                {post.eyecatch?.url && (
                                    <Image
                                    src={post.eyecatch.url}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    />
                                )}
                            </div>
                            <div className="px-5 md:px-0">
                                <h1 className="font-bold lg:text-4xl text-3xl mb-3">
                                    {post.title}
                                </h1>
                                <div className="flex items-center mb-15">
                                    <div className="relative border rounded-full w-10 h-10 mr-2 overflow-hidden">
                                        <Image
                                            src="/onepage.png"
                                            alt="アイコン画像"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm text-black">Yuma</p>
                                        <p className="text-xs text-gray-600">{formatData(post.updatedAt)}</p>
                                    </div>
                                </div>
                                <BlogContent className={style['blog-content']} content={post.body}/>
                                <div className="mb-15">
                                    <Link href='/' className="text-sm text-gray-600 underline hover:text-black">
                                        ← ホームに戻る
                                    </Link>
                                </div>
                                {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold">タグ：</span>
                                        <div className="flex flex-wrap mt-1">
                                            {post.tags.map((tag) => (
                                                <Link href={`/tags/${tag.slug}`} key={tag.id} className="inline-block bg-white hover:bg-gray-100 border mr-1 mb-1 border-gray-400 rounded-xl px-3 py-1 text-xs text-gray-600 hover:border-gray-500 transition duration-200">
                                                    #{tag.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between items-center mt-15 pt-5 border-t border-gray-300">
                                    <div className="w-1/2 text-left md:pr-5 pl-2 pr-2 border-r border-gray-200">
                                        {post.prevBlog && (
                                            <Link href={`/blog/${post.prevBlog.slug}`} className="flex items-center">
                                                <p className="font-extrabold text-gray-400 text-xs">＜</p>
                                                <div className="md:ml-5 ml-3">
                                                    <p className="text-xs text-gray-500">前の記事</p>
                                                    <h3 className="font-bold line-clamp-2">{post.prevBlog.title}</h3>
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                    <div className="w-1/2 text-right md:pl-5 pl-2 pr-2">
                                        {post.nextBlog && (
                                            <Link href={`/blog/${post.nextBlog.slug}`} className="flex items-center">
                                                <div className="md:mr-5 mr-3">
                                                    <p className="text-xs text-gray-500">次の記事</p>
                                                    <h3 className="font-bold line-clamp-2">{post.nextBlog.title}</h3>
                                                </div>
                                                <p className="font-extrabold text-gray-400 text-xs">＞</p>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                        </div>
                    </section>
                </div>
            )}
        </main>
    )
}
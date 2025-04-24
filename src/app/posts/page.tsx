import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Posts() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16 space-y-6">
      <h1 className="text-4xl font-bold font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Posts
      </h1>
      <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`posts/${post.id}`} className="font-semibold text-gray-400 hover:underline">{post.title}</Link>
            <span className="text-sm text-gray-600 ml-2">
              by {post.author.name}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href="posts/new"
        className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
      >
        Create Post
      </Link>
    </div>
  );
}

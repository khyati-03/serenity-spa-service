import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBlogById } from "../services/api";

export default function BlogDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    if (id) fetchBlogById(id).then(setPost);
  }, [id]);

  if (!post) {
    return (
      <section className="container-xl py-20 text-center text-gray-500">
        Loading...
      </section>
    );
  }

  return (
    <article className="container-xl pb-4 pt-10">
      <Link to="/blog" className="text-sm underline underline-offset-4">
        ← Back
      </Link>
      <h1 className="mt-2 text-2xl md:text-3xl font-semibold">{post.title}</h1>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="mt-6 w-full max-h-96 object-cover rounded-lg"
        />
      )}
      <div
        className="prose max-w-none mt-6 text-gray-700"
        dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
      />
    </article>
  );
}

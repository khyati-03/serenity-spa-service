import { useEffect, useState } from "react";
import BlogsGrid from "../components/BlogsGrid";
import { fetchBlogs } from "../services/api";

export default function Blog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  useEffect(() => {
    fetchBlogs().then(setBlogs);
  }, []);
  return (
    <>
      <section className="container-xl pt-10">
        <h1 className="text-2xl md:text-3xl font-semibold">Blog</h1>
      </section>
      <BlogsGrid items={blogs} />
    </>
  );
}

import Hero from "../components/Hero";
import ServicesGrid from "../components/ServicesGrid";
import BlogsGrid from "../components/BlogsGrid";
import { useEffect, useState } from "react";
import { fetchBlogs, fetchServices } from "../services/api";
import type { ServiceItem } from "../components/ServicesGrid";

export default function Home() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetchServices().then(setServices);
    fetchBlogs().then(setBlogs);
  }, []);

  return (
    <>
      <Hero />
      <section className="container-xl pb-4 pt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Popular Services</h2>
          <a href="/services" className="text-sm underline underline-offset-4">
            View all
          </a>
        </div>
      </section>
      <ServicesGrid items={services.slice(0, 3)} />
      <section className="container-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">From our Blog</h2>
          <a href="/blog" className="text-sm underline underline-offset-4">
            View all
          </a>
        </div>
      </section>
      <BlogsGrid items={blogs.slice(0, 3)} />
    </>
  );
}

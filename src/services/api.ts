import servicesLocal from "../data/services.json";
import blogsLocal from "../data/blogs.json";
import { getWpPosts, getWpPostById, getWpServices } from "./wp";

type Service = {
  id: number | string;
  title: string;
  description: string;
  price: string;
  image: string;
  category?: string;
};

type Blog = {
  id: number | string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
};

const USE_WP = String(import.meta.env.VITE_USE_WP).toLowerCase() === "true";
console.log(
  "[env]",
  import.meta.env.VITE_USE_WP,
  import.meta.env.VITE_WP_BASE_URL,
  "USE_WP=",
  USE_WP
);

export function fetchServices(): Promise<Service[]> {
  return USE_WP ? getWpServices() : Promise.resolve(servicesLocal as Service[]);
}

export function fetchBlogs(): Promise<Blog[]> {
  return USE_WP ? getWpPosts() : Promise.resolve(blogsLocal as Blog[]);
}

export function fetchBlogById(id: string | number): Promise<Blog | null> {
  if (USE_WP) return getWpPostById(id) as Promise<Blog>;
  const found = (blogsLocal as Blog[]).find((b) => String(b.id) === String(id));
  return Promise.resolve(found ?? null);
}

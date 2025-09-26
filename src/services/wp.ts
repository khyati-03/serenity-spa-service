import axios from "axios";

const base = import.meta.env.VITE_WP_BASE_URL;

const strip = (html?: string) => (html ?? "").replace(/<[^>]+>/g, "");

export async function getWpPosts() {
  const { data } = await axios.get(
    `${base}/wp-json/wp/v2/posts?_embed&per_page=10&orderby=date&order=desc`
  );
  return data.map((p: any) => {
    const media = p._embedded?.["wp:featuredmedia"]?.[0];
    const excerpt =
      strip(p.excerpt?.rendered) || strip(p.content?.rendered)?.slice(0, 160);
    return {
      id: p.id,
      title: p.title?.rendered ?? "",
      excerpt,
      content: p.content?.rendered ?? "",
      image: media?.source_url ?? "",
    };
  });
}

export async function getWpPostById(id: string | number) {
  const { data } = await axios.get(`${base}/wp-json/wp/v2/posts/${id}?_embed`);
  const media = data._embedded?.["wp:featuredmedia"]?.[0];
  return {
    id: data.id,
    title: data.title?.rendered ?? "",
    excerpt: strip(data.excerpt?.rendered),
    content: data.content?.rendered ?? "",
    image: media?.source_url ?? "",
  };
}

export async function getWpServices() {
  const { data } = await axios.get(`${base}/wp-json/wp/v2/services?_embed`);
  return data.map((s: any) => ({
    id: s.id,
    title: s.title?.rendered ?? "",
    description: s.acf?.description ?? s.content?.rendered ?? "",
    price: s.acf?.price ?? "",
    category: s.acf?.category ?? "General",
    image: s._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
  }));
}

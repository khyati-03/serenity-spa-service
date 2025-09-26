import type { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Blog from "../pages/Blog"
import BlogDetails from "../pages/BlogDetails";
import Contact from "../pages/Contact";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:id", element: <BlogDetails /> },
      { path: "contact", element: <Contact /> },
    ],
  },
];

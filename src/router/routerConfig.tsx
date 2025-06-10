
import { createBrowserRouter, createHashRouter, RouteObject } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

// Define the routes
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

// Determine which router to use based on deployment environment
// HashRouter works better for GitHub Pages and similar static hosts
const useHashRouter = true;

export const router = useHashRouter 
  ? createHashRouter(routes)
  : createBrowserRouter(routes);

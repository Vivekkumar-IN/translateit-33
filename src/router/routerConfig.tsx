
import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { CONFIG } from "@/config/appConfig";

// Get base URL from config, ensuring it doesn't have trailing slash for router
const basePath = CONFIG.DEPLOYMENT.BASE_PATH.endsWith('/') 
  ? CONFIG.DEPLOYMENT.BASE_PATH.slice(0, -1) 
  : CONFIG.DEPLOYMENT.BASE_PATH;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
], {
  basename: basePath === "/" ? undefined : basePath
});


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "@/config/appConfig";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the base path from config
    const basePath = CONFIG.DEPLOYMENT.BASE_PATH === "/" 
      ? "/" 
      : CONFIG.DEPLOYMENT.BASE_PATH.replace(/\/$/, "");
    
    // Redirect to home page with proper base path
    navigate(basePath, { replace: true });
  }, [navigate]);

  // This component will redirect immediately, but we return null for safety
  return null;
};

export default NotFound;

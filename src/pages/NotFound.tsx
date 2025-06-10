
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page immediately
    navigate("/", { replace: true });
  }, [navigate]);

  // This component will redirect immediately, but we return null for safety
  return null;
};

export default NotFound;

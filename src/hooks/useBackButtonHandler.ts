
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

export const useBackButtonHandler = () => {
  const [showExitDialog, setShowExitDialog] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  // Only handle back button on main page
  useEffect(() => {
    // Only enable on root path
    if (location.pathname !== '/') {
      return;
    }

    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      
      // Show popup immediately on first back press on main page
      setShowExitDialog(true);
      
      // Push state back to prevent navigation
      window.history.pushState(null, '', window.location.href);
    };

    // Push initial state to prevent immediate back navigation
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location.pathname, toast]);

  const handleExitConfirm = () => {
    window.close();
  };

  const handleExitCancel = () => {
    setShowExitDialog(false);
  };

  return {
    showExitDialog,
    setShowExitDialog,
    handleExitConfirm,
    handleExitCancel
  };
};


import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useBackButtonHandler = () => {
  const [backButtonCount, setBackButtonCount] = useState(0);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const { toast } = useToast();

  // Handle browser back button with double-tap confirmation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      
      if (backButtonCount === 0) {
        setBackButtonCount(1);
        toast({
          title: "Press back again to exit",
          description: "Tap back button once more to close the application",
        });
        
        // Reset count after 2 seconds
        setTimeout(() => setBackButtonCount(0), 2000);
        
        // Push state back to prevent navigation
        window.history.pushState(null, '', window.location.href);
      } else {
        setShowExitDialog(true);
      }
    };

    // Push initial state to prevent immediate back navigation
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [backButtonCount, toast]);

  const handleExitConfirm = () => {
    window.close();
  };

  const handleExitCancel = () => {
    setShowExitDialog(false);
    setBackButtonCount(0);
  };

  return {
    showExitDialog,
    setShowExitDialog,
    handleExitConfirm,
    handleExitCancel
  };
};

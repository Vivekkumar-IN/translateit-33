
import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onSave?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onSkip?: () => void;
  disabled?: boolean;
}

export const useKeyboardShortcuts = ({
  onSave,
  onNext,
  onPrevious,
  onSkip,
  disabled = false
}: KeyboardShortcutsProps) => {
  useEffect(() => {
    if (disabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        // Allow Enter in textarea for save action
        if (event.key === 'Enter' && event.target instanceof HTMLTextAreaElement && onSave) {
          event.preventDefault();
          onSave();
        }
        return;
      }

      switch (event.key) {
        case 'Enter':
          if (onSave) {
            event.preventDefault();
            onSave();
          }
          break;
        case 'ArrowRight':
          if (event.ctrlKey || event.metaKey) {
            if (onNext) {
              event.preventDefault();
              onNext();
            }
          }
          break;
        case 'ArrowLeft':
          if (event.ctrlKey || event.metaKey) {
            if (onPrevious) {
              event.preventDefault();
              onPrevious();
            }
          }
          break;
        case 's':
          if (event.ctrlKey || event.metaKey) {
            if (onSkip) {
              event.preventDefault();
              onSkip();
            }
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSave, onNext, onPrevious, onSkip, disabled]);
};

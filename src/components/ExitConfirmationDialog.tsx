
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ExitConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const ExitConfirmationDialog: React.FC<ExitConfirmationDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  onCancel
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Close Application?</DialogTitle>
          <DialogDescription>
            Are you sure you want to close this application? Any unsaved progress may be lost.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-2">
          <Button variant="secondary" onClick={onCancel} className="w-full">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="w-full">
            Close Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitConfirmationDialog;

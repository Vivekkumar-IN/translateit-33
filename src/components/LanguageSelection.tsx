
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';
import LanguageInput from './LanguageInput';
import ContinueTranslationDialog from './ContinueTranslationDialog';
import { TranslationData } from '@/types';

interface LanguageSelectionProps {
  loading: boolean;
  showContinueDialog: boolean;
  pendingLanguageCode: string;
  savedTranslationData: TranslationData | null;
  onStartTranslation: (data: { languageCode: string }) => void;
  onContinueTranslation: () => void;
  onRestartTranslation: () => void;
  onCancelDialog: () => void;
  setShowContinueDialog: (show: boolean) => void;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  loading,
  showContinueDialog,
  pendingLanguageCode,
  savedTranslationData,
  onStartTranslation,
  onContinueTranslation,
  onRestartTranslation,
  onCancelDialog,
  setShowContinueDialog
}) => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl">🎵 Translate YukkiMusic</CardTitle>
              <p className="text-muted-foreground text-sm">
                Translate YukkiMusic language files with ease
              </p>
            </CardHeader>
            <CardContent>
              <LanguageInput onStart={onStartTranslation} loading={loading} />
            </CardContent>
          </Card>
        </div>
      </div>

      <ContinueTranslationDialog
        open={showContinueDialog}
        onOpenChange={setShowContinueDialog}
        pendingLanguageCode={pendingLanguageCode}
        savedTranslationData={savedTranslationData}
        onContinue={onContinueTranslation}
        onRestart={onRestartTranslation}
        onCancel={onCancelDialog}
      />
    </>
  );
};

export default LanguageSelection;

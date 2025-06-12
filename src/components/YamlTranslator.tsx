import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Send, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslationState } from '@/hooks/useTranslationState';
import { useBackButtonHandler } from '@/hooks/useBackButtonHandler';
import { useTranslationFlow } from '@/hooks/useTranslationFlow';
import TranslationCard from './TranslationCard';
import ProgressIndicator from './ProgressIndicator';
import AdvancedSearch from './AdvancedSearch';
import LanguageSelection from './LanguageSelection';
import TranslationComplete from './TranslationComplete';
import ExitConfirmationDialog from './ExitConfirmationDialog';
import ContinueTranslationDialog from './ContinueTranslationDialog';
import SocialFooter from './SocialFooter';
import { yamlService } from '../services/yamlService';
import { telegramService } from '../services/telegramService';
import { storageService } from '../services/storageService';
import { CONFIG } from '../config/appConfig';
import { SearchFilters, TranslationData } from '@/types';

const YamlTranslator = () => {
  const {
    step,
    setStep,
    yamlData,
    setYamlData,
    allKeys,
    setAllKeys,
    translations,
    setTranslations,
    currentIndex,
    setCurrentIndex,
    userLang,
    setUserLang,
    loading,
    setLoading,
    existingTranslations,
    setExistingTranslations,
    lastSaved
  } = useTranslationState();

  const {
    showExitDialog,
    setShowExitDialog,
    handleExitConfirm,
    handleExitCancel
  } = useBackButtonHandler();

  const {
    handleStartTranslation,
    proceedWithTranslation
  } = useTranslationFlow({
    setLoading,
    setUserLang,
    setYamlData,
    setAllKeys,
    setTranslations,
    setCurrentIndex,
    setExistingTranslations,
    setStep
  });

  const [showContinueDialog, setShowContinueDialog] = useState(false);
  const [pendingLanguageCode, setPendingLanguageCode] = useState('');
  const [savedTranslationData, setSavedTranslationData] = useState<TranslationData | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchTerm: '',
    showOnlyUntranslated: false,
    showOnlyTranslated: false
  });

  const { toast } = useToast();

  // Handle URL parameters and check for saved translations
  const handleStartTranslationWithDialog = async (data: { languageCode: string }) => {
    const result = await handleStartTranslation(data);
    
    if (result.showDialog) {
      setPendingLanguageCode(result.languageCode);
      setSavedTranslationData(result.savedData);
      setShowContinueDialog(true);
    }
  };

  // Fixed search to only search by key and calculate filtered keys correctly
  const filteredKeys = allKeys.filter(key => {
    const keyLower = key.toLowerCase();
    
    // Search only by key name
    if (searchFilters.searchTerm) {
      const searchLower = searchFilters.searchTerm.toLowerCase();
      if (!keyLower.includes(searchLower)) {
        return false;
      }
    }

    // Translation status filters
    const isTranslated = !!translations[key];
    if (searchFilters.showOnlyUntranslated && isTranslated) return false;
    if (searchFilters.showOnlyTranslated && !isTranslated) return false;

    return true;
  });

  const currentKey = filteredKeys[currentIndex];
  const translatedCount = Object.keys(translations).length;
  const totalCount = allKeys.length;

  const handleContinueTranslation = () => {
    setShowContinueDialog(false);
    if (savedTranslationData) {
      proceedWithTranslation(pendingLanguageCode, savedTranslationData);
      toast({
        title: "Previous translations loaded successfully!",
        description: `Loaded ${Object.keys(savedTranslationData.translations).length} previous translations`,
      });
    }
  };

  const handleRestartTranslation = () => {
    setShowContinueDialog(false);
    storageService.clearTranslations(pendingLanguageCode);
    proceedWithTranslation(pendingLanguageCode);
  };

  const handleCancelDialog = () => {
    setShowContinueDialog(false);
    setLoading(false);
    setPendingLanguageCode('');
    setSavedTranslationData(null);
  };

  const handleSaveTranslation = (translation: string) => {
    if (translation.trim() && currentKey) {
      setTranslations(prev => ({
        ...prev,
        [currentKey]: translation.trim()
      }));
    }
    handleNext();
  };

  const handleNext = () => {
    // If no custom translation provided, use existing translation or default
    if (currentKey && !translations[currentKey]) {
      const defaultValue = existingTranslations[currentKey] || yamlData[currentKey];
      setTranslations(prev => ({
        ...prev,
        [currentKey]: defaultValue
      }));
    }

    if (currentIndex < filteredKeys.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (filteredKeys.length === allKeys.length) {
      setStep('complete');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleDownloadYaml = () => {
    try {
      yamlService.downloadTranslations(translations, userLang);
      toast({
        title: "Download started!",
        description: `${userLang}.yml file is being downloaded`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Unable to generate YAML file",
        variant: "destructive",
      });
    }
  };

  const handleSendToTelegram = async () => {
    setLoading(true);
    try {
      await telegramService.sendTranslations(translations, userLang);
      toast({
        title: "Sent to Telegram!",
        description: "Your translations have been sent successfully",
      });
      // Clear saved data after successful send
      storageService.clearTranslations(userLang);
    } catch (error) {
      toast({
        title: "Failed to send",
        description: error instanceof Error ? error.message : "Unable to send to Telegram",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all translations? This cannot be undone.")) {
      storageService.clearTranslations(userLang);
      setTranslations({});
      setCurrentIndex(0);
      setStep('language');
      setUserLang('');
      setSearchFilters({
        searchTerm: '',
        showOnlyUntranslated: false,
        showOnlyTranslated: false
      });
      setExistingTranslations({});
    }
  };

  if (step === 'language') {
    return (
      <LanguageSelection
        loading={loading}
        showContinueDialog={showContinueDialog}
        showExitDialog={showExitDialog}
        pendingLanguageCode={pendingLanguageCode}
        savedTranslationData={savedTranslationData}
        onStartTranslation={handleStartTranslationWithDialog}
        onContinueTranslation={handleContinueTranslation}
        onRestartTranslation={handleRestartTranslation}
        onCancelDialog={handleCancelDialog}
        onExitConfirm={handleExitConfirm}
        onExitCancel={handleExitCancel}
        setShowContinueDialog={setShowContinueDialog}
        setShowExitDialog={setShowExitDialog}
      />
    );
  }

  if (step === 'complete') {
    return (
      <TranslationComplete
        translatedCount={translatedCount}
        totalCount={totalCount}
        userLang={userLang}
        loading={loading}
        onDownloadYaml={handleDownloadYaml}
        onSendToTelegram={handleSendToTelegram}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-4xl p-4 space-y-6">
        {/* Enhanced Translation Warning */}
        {CONFIG.TRANSLATION_WARNING.enabled && (
          <Alert className="relative overflow-hidden border-0 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 dark:from-amber-950/30 dark:via-orange-950/30 dark:to-red-950/30 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-orange-400/10 to-red-400/10" />
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-500 via-orange-500 to-red-500" />
            <div className="relative flex items-start gap-3 p-4">
              <div className="flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-grow space-y-2">
                <div className="font-bold text-base text-amber-900 dark:text-amber-100">
                  {CONFIG.TRANSLATION_WARNING.title}
                </div>
                <div className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                  {CONFIG.TRANSLATION_WARNING.description}
                </div>
              </div>
            </div>
          </Alert>
        )}

        {/* Enhanced Header with Progress Indicator */}
        <ProgressIndicator
          translated={translatedCount}
          total={totalCount}
          currentIndex={currentIndex}
          language={userLang}
          lastSaved={lastSaved}
          autoSaveEnabled={true}
        />

        {/* Advanced Search */}
        <AdvancedSearch
          filters={searchFilters}
          onFiltersChange={setSearchFilters}
          totalKeys={allKeys.length}
          filteredKeys={filteredKeys.length}
          translatedKeys={translatedCount}
          allKeys={allKeys}
          yamlData={yamlData}
          translations={translations}
        />

        {/* Main translation area */}
        <div className="space-y-6">
          {/* Translation Card or No Results Message */}
          {currentKey ? (
            <TranslationCard
              keyName={currentKey}
              originalText={yamlData[currentKey]}
              currentTranslation={translations[currentKey] || ''}
              existingTranslation={existingTranslations[currentKey] || ''}
              targetLanguage={userLang}
              onSave={handleSaveTranslation}
              onPrevious={handlePrevious}
              canGoPrevious={currentIndex > 0}
              isTranslated={!!translations[currentKey]}
            />
          ) : (
            <Alert>
              <AlertDescription>
                No keys match your current filter. Try adjusting your search or filter settings.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Action buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <Button onClick={handleDownloadYaml} variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download YAML ({translatedCount} keys)
              </Button>
              <Button 
                onClick={handleSendToTelegram} 
                disabled={loading || translatedCount === 0}
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                {loading ? 'Sending...' : `Send to Telegram (${translatedCount} keys)`}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Social Footer */}
        <SocialFooter />

        {/* Exit Confirmation Dialog */}
        <ExitConfirmationDialog
          open={showExitDialog}
          onOpenChange={setShowExitDialog}
          onConfirm={handleExitConfirm}
          onCancel={handleExitCancel}
        />
      </div>
    </div>
  );
};

export default YamlTranslator;

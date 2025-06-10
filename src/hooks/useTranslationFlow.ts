
import { useToast } from '@/hooks/use-toast';
import { yamlService } from '@/services/yamlService';
import { storageService } from '@/services/storageService';
import { TranslationData } from '@/types';

interface UseTranslationFlowProps {
  setLoading: (loading: boolean) => void;
  setUserLang: (lang: string) => void;
  setYamlData: (data: any) => void;
  setAllKeys: (keys: string[]) => void;
  setTranslations: (translations: any) => void;
  setCurrentIndex: (index: number) => void;
  setExistingTranslations: (translations: any) => void;
  setStep: (step: 'language' | 'translating' | 'complete') => void;
}

export const useTranslationFlow = ({
  setLoading,
  setUserLang,
  setYamlData,
  setAllKeys,
  setTranslations,
  setCurrentIndex,
  setExistingTranslations,
  setStep
}: UseTranslationFlowProps) => {
  const { toast } = useToast();

  const handleStartTranslation = async (languageCode: string) => {
    setLoading(true);

    try {
      // Check for existing translations first - both recent and older saved progress
      const recentData = storageService.loadRecentTranslations(languageCode);
      const savedData = storageService.loadTranslations(languageCode);
      
      if (recentData && Object.keys(recentData.translations).length > 0) {
        // Always show dialog for any existing progress
        return { showDialog: true, savedData: recentData, languageCode };
      } else if (savedData && Object.keys(savedData.translations).length > 0) {
        // Show dialog for older saved progress
        return { showDialog: true, savedData, languageCode };
      } else {
        // No existing translations, start fresh
        await proceedWithTranslation(languageCode);
        return { showDialog: false };
      }
    } catch (error) {
      toast({
        title: "Error loading YAML",
        description: error instanceof Error ? error.message : "Failed to load translation data",
        variant: "destructive",
      });
      setLoading(false);
      return { showDialog: false };
    }
  };

  const proceedWithTranslation = async (languageCode: string, existingData?: TranslationData) => {
    setUserLang(languageCode);

    try {
      // Load default English YAML data
      const data = await yamlService.loadYamlFromGitHub();
      setYamlData(data);
      setAllKeys(Object.keys(data));

      // Load existing data if provided
      if (existingData) {
        setTranslations(existingData.translations);
        setCurrentIndex(existingData.index || 0);
      }

      // Try to load existing translations for the target language
      try {
        const existingData = await yamlService.loadYamlFromGitHub(languageCode);
        setExistingTranslations(existingData);
        toast({
          title: "Existing translations found!",
          description: `Found existing ${languageCode}.yml with translations to help you`,
        });
      } catch (error) {
        console.log(`No existing ${languageCode}.yml found, starting fresh`);
        setExistingTranslations({});
      }

      setStep('translating');
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error loading YAML",
        description: error instanceof Error ? error.message : "Failed to load translation data",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return {
    handleStartTranslation,
    proceedWithTranslation
  };
};

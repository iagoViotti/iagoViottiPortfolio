import { useTranslation } from 'react-i18next';

const LanguageButton = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('pt') ? 'en' : 'pt';
    i18n.changeLanguage(newLang);
  };

  return (
    <button 
      onClick={toggleLanguage} 
      style={{ fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase' }}
    >
      {i18n.language.startsWith('pt') ? 'EN' : 'PT'}
    </button>
  );
};

export default LanguageButton;
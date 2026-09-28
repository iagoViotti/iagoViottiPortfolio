import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageButton.css';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Estado para guardar os ajustes visuais do balão e do caret
  const [menuOffset, setMenuOffset] = useState({ transformX: 50, caretLeft: 50 });

  const currentLangCode = i18n.language.substring(0, 2).toLowerCase();

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Calcula a colisão com a borda direita da tela assim que o menu abre
  useLayoutEffect(() => {
    if (isOpen && menuRef.current) {
      let newTransformX = 50;
      let newCaretLeft = 50;

      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const margin = 2;

      // Se a borda direita do menu ultrapassar a largura da tela menos a margem
      if (rect.right > viewportWidth - margin) {
        const overflowAmount = rect.right - (viewportWidth - margin);
        const shiftPercentage = (overflowAmount / rect.width) * 100;

        // Com a sua correção de inversão aplicada:
        newTransformX = 50 - shiftPercentage;
        newCaretLeft = 50 + shiftPercentage;
      }

      setMenuOffset({ transformX: newTransformX, caretLeft: newCaretLeft });
    } else {
      // O SEGREDO AQUI: Reseta o balão para o centro quando for fechado!
      setMenuOffset({ transformX: 50, caretLeft: 50 });
    }
  }, [isOpen]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="language-selector-container" ref={dropdownRef}>
      <button
        className="language-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {currentLangCode} <span className="arrow-down">▾</span>
      </button>

      {isOpen && (
        <div
          className="language-dropdown"
          ref={menuRef}
          style={{ transform: `translateX(calc(${menuOffset.transformX}% - 100%))` }} // Lógica ajustada para CSS puro interpretar
        >
          <div
            className="dropdown-caret"
            style={{ left: `${menuOffset.caretLeft}%` }}
          ></div>

          <ul className="language-list">
            <li className="language-item" onClick={() => changeLanguage('en')}>
              <div className="lang-name-wrapper">
                <span className="active-dot">{currentLangCode === 'en' ? '•' : ''}</span>
                <span>{t('app.english')}</span>
              </div>
              <span className="lang-code-hint">en</span>
            </li>

            <li className="language-item" onClick={() => changeLanguage('pt')}>
              <div className="lang-name-wrapper">
                <span className="active-dot">{currentLangCode === 'pt' ? '•' : ''}</span>
                <span>{t('app.portuguese')}</span>
              </div>
              <span className="lang-code-hint">pt</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
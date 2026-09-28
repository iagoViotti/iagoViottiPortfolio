import { createContext, useContext, useState } from "react";
import { Window, IFolder, IOSWindow } from "../types/Index";

interface SelectContextType {
  // --- ESTADOS ANTIGOS RESTAURADOS PARA OS ÍCONES ---
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
  lastTimeClicked: number;
  setLastTimeClicked: (lastTimeClicked: number) => void;
  handleClick: (window: Window) => void;
  // handleDoubleClick agora aceita o parentFolder opcional para manter a navegação
  handleDoubleClick: (window: Window, parentFolder?: IFolder) => void;

  // --- NOVO WINDOW MANAGER ---
  openWindows: IOSWindow[];
  openWindow: (window: Window, parentFolder?: IFolder) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  handlePrevFile: (windowId: string) => void;
  handleNextFile: (windowId: string) => void;
  getNavigationIndexes: (windowId: string) => { prev: number | null; next: number | null };
}

const SelectContext = createContext<SelectContextType>({} as SelectContextType);

export const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) throw new Error("useSelect must be used within a SelectProvider");
  return context;
};

export const SelectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estados restaurados
  const [selected, setSelected] = useState<string | null>(null);
  const [lastTimeClicked, setLastTimeClicked] = useState(0);

  // Estados do Window Manager
  const [openWindows, setOpenWindows] = useState<IOSWindow[]>([]);
  const [highestZIndex, setHighestZIndex] = useState(100);

  // --- LÓGICA DE SELEÇÃO (CLIQUE SIMPLES) ---
  const handleClick = (window: Window) => {
    setSelected(window.name);
  };

  // --- LÓGICA DE ABERTURA (CLIQUE DUPLO) ---
  // Agora ele apenas repassa a bola para o openWindow, mantendo seus componentes antigos intactos!
  const handleDoubleClick = (window: Window, parentFolder?: IFolder) => {
    openWindow(window, parentFolder);
  };

  // --- FUNÇÕES DO WINDOW MANAGER ---
  const focusWindow = (id: string) => {
    setHighestZIndex((prev) => prev + 1);
    setOpenWindows((prevWindows) =>
      prevWindows.map((win) =>
        win.id === id ? { ...win, zIndex: highestZIndex + 1 } : win
      )
    );
  };

  const openWindow = (window: Window, parentFolder?: IFolder) => {
    const isFolder = 'Files' in window;
    const type = isFolder ? 'folder' : (window.type === 'app' ? 'app' : 'file');
    const id = window.name;

    setOpenWindows((prev) => {
      const alreadyOpen = prev.find((w) => w.id === id);
      if (alreadyOpen) {
        setTimeout(() => focusWindow(id), 0);
        return prev;
      }
      setHighestZIndex((z) => z + 1);
      return [...prev, { id, type, content: window, zIndex: highestZIndex + 1, parentFolder }];
    });
  };

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((win) => win.id !== id));
  };

  // --- NAVEGAÇÃO DE ARQUIVOS ---
  const getNavigationIndexes = (windowId: string) => {
    const win = openWindows.find((w) => w.id === windowId);
    if (!win || win.type === 'folder' || !win.parentFolder) return { prev: null, next: null };
    const filesInFolder = win.parentFolder.Files;
    const currentIndex = filesInFolder.findIndex((f) => f.name === win.content.name);
    return {
      prev: currentIndex - 1 >= 0 ? currentIndex - 1 : null,
      next: currentIndex + 1 < filesInFolder.length ? currentIndex + 1 : null,
    };
  };

  const updateWindowContent = (windowId: string, newIndex: number) => {
    setOpenWindows((prev) =>
      prev.map((win) => {
        if (win.id === windowId && win.parentFolder) {
          const newFile = win.parentFolder.Files[newIndex];
          return { ...win, content: newFile };
        }
        return win;
      })
    );
  };

  const handlePrevFile = (windowId: string) => {
    const { prev } = getNavigationIndexes(windowId);
    if (prev !== null) updateWindowContent(windowId, prev);
  };

  const handleNextFile = (windowId: string) => {
    const { next } = getNavigationIndexes(windowId);
    if (next !== null) updateWindowContent(windowId, next);
  };

  return (
    <SelectContext.Provider
      value={{
        selected, setSelected, lastTimeClicked, setLastTimeClicked, handleClick, handleDoubleClick,
        openWindows, openWindow, closeWindow, focusWindow, handlePrevFile, handleNextFile, getNavigationIndexes,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};
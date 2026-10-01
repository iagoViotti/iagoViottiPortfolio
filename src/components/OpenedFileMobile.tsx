import { useSelect } from '../context/SelectContext'
import { IOSWindow } from '../types/Index' // Importação necessária
import { BioTemplate, ProjectTemplate } from './templates'

const FileTemplates = {
  project: ProjectTemplate,
  bio: BioTemplate,
}

// O componente agora recebe a prop windowData enviada pelo App.tsx
interface OpenedFileMobileProps {
  windowData: IOSWindow;
}

const OpenedFileMobile = ({ windowData }: OpenedFileMobileProps) => {
  // Puxamos as novas funções de navegação e fechamento do Contexto
  const { closeWindow, handleNextFile, handlePrevFile, getNavigationIndexes } = useSelect()

  // Extraímos o arquivo diretamente da prop
  const file = windowData.content as any;
  const { prev, next } = getNavigationIndexes(windowData.id);

  if (!file) return null;

  const TemplateComponent = FileTemplates[file.type as keyof typeof FileTemplates];

  return (
    <div className='opened-file'>
      <div className="opened-file-header">
        <div className="opened-file-header-title">{file.name}</div>
        <div className='opened-file-header-buttons'>
          {windowData.parentFolder && (
            <>
              <button disabled={prev === null} onClick={() => handlePrevFile(windowData.id)} >&lt;</button>
              <button disabled={next === null} onClick={() => handleNextFile(windowData.id)} >&gt;</button>
            </>
          )}
          <button
            onClick={() => closeWindow(windowData.id)}
            className="opened-file-header-close"
          >
            X
          </button>
        </div>
      </div>
      <div className="opened-file-content" style={{ padding: 0 }}>
        {TemplateComponent ? (
          <TemplateComponent file={file as any} />
        ) : (
          <div style={{ padding: '20px' }}>Tipo de arquivo não suportado.</div>
        )}
      </div>
    </div>
  )
}

export default OpenedFileMobile
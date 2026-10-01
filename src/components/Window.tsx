import { Rnd } from 'react-rnd'
import { useState } from 'react'
import type { ComponentType } from 'react'
import { useSelect } from '../context/SelectContext'
import type { AppType, IApp, IFile, IFolder, IOSWindow } from '../types/Index'
import { closeIcon } from '../assets/svg/CloseIcon'
import { gridIcon } from '../assets/svg/GridIcon'
import { listIcon } from '../assets/svg/ListIcon'
import { BioTemplate, ProjectTemplate, MailerTemplate, FolderTemplate, FolderViewStyle } from './templates'
import './Window.css'


type WindowConfiguration = {
  initialSize: [number, number]
  minSize: [number, number]
  position: (size: [number, number]) => { x: number; y: number }
}


const configurations: Record<IOSWindow['type'], WindowConfiguration> = {
  app: {
    initialSize: [500, 600],
    minSize: [400, 500],
    position: ([width, height]) => ({
      x: window.innerWidth / 2 - width / 2,
      y: window.innerHeight / 2 - height / 2,
    }),
  },
  file: {
    initialSize: [1200, 600],
    minSize: [320, 400],
    position: () => ({ x: window.innerWidth / 10, y: window.innerHeight / 20 }),
  },
  folder: {
    initialSize: [800, 500],
    minSize: [500, 300],
    position: () => ({
      x: window.innerWidth / 10 + 40,
      y: window.innerHeight / 20 + 40,
    }),
  },
}

const appTemplates: Record<AppType, ComponentType> = {
  mailer: MailerTemplate,
}

const isFolderWindow = (windowData: IOSWindow): windowData is IOSWindow & { type: 'folder'; content: IFolder } =>
  windowData.type === 'folder'

const isFileWindow = (windowData: IOSWindow): windowData is IOSWindow & { type: 'file'; content: IFile } =>
  windowData.type === 'file'

const isAppWindow = (windowData: IOSWindow): windowData is IOSWindow & { type: 'app'; content: IApp } =>
  windowData.type === 'app'


const WindowContent = ({ windowData, folderViewStyle }: { windowData: IOSWindow; folderViewStyle: FolderViewStyle }) => {
  if (isAppWindow(windowData)) {
    const Template = appTemplates[windowData.content.appType]
    return Template ? <Template /> : <div className="window__message">App execution failed: Missing Template.</div>
  }

  if (isFileWindow(windowData)) {
    const file = windowData.content
    if (file.type === 'project') return <ProjectTemplate file={file} />
    if (file.type === 'bio') return <BioTemplate file={file} />
  }

  if (isFolderWindow(windowData)) {
    return <FolderTemplate folder={windowData.content} viewStyle={folderViewStyle} />
  }

  return <div className="window__message">Tipo de janela não suportado.</div>
}

const Window = ({ windowData }: { windowData: IOSWindow }) => {
  const { closeWindow, focusWindow, getNavigationIndexes, handleNextFile, handlePrevFile } = useSelect()
  const [isDragging, setIsDragging] = useState(false)
  const [folderViewStyle, setFolderViewStyle] = useState<FolderViewStyle>('icon')
  const configuration = configurations[windowData.type]
  const isMobile = window.innerWidth < 768
  const file = isFileWindow(windowData) ? windowData.content : null
  const app = isAppWindow(windowData) ? windowData.content : null
  const folder = isFolderWindow(windowData) ? windowData.content : null
  const { prev, next } = file ? getNavigationIndexes(windowData.id) : { prev: null, next: null }
  const title = app ? `${app.name}.exe` : file?.name ?? folder?.name ?? ''

  const content = (
    <div className={`window window--${windowData.type} ${isDragging ? 'is-dragging' : ''}`}>
      <header className="window__header">
        <div className="window__title">{title}</div>
        <div className="window__actions">
          {file && windowData.parentFolder && (
            <>
              <button aria-label="Arquivo anterior" disabled={prev === null} onClick={() => handlePrevFile(windowData.id)} type="button">&lt;</button>
              <button aria-label="Próximo arquivo" disabled={next === null} onClick={() => handleNextFile(windowData.id)} type="button">&gt;</button>
            </>
          )}
          {folder && !isMobile && (
            <button
              aria-label="Alternar visualização da pasta"
              onClick={() => setFolderViewStyle((viewStyle) => (viewStyle === 'icon' ? 'list' : 'icon'))}
              type="button"
            >
              {folderViewStyle === 'list' ? gridIcon : listIcon}
            </button>
          )}
          <button
            aria-label="Fechar janela"
            className="window__close"
            onClick={(event) => {
              event.stopPropagation()
              closeWindow(windowData.id)
            }}
            type="button"
          >
            {closeIcon}
          </button>
        </div>
      </header>
      <main className="window__content">
        <WindowContent folderViewStyle={folderViewStyle} windowData={windowData} />
      </main>
    </div>
  )

  if (isMobile) return content

  const { initialSize, minSize, position } = configuration
  const initialPosition = position(initialSize)

  return (
    <Rnd
      bounds="body"
      default={{ ...initialPosition, width: initialSize[0], height: initialSize[1] }}
      dragHandleClassName="window__header"
      minHeight={minSize[1]}
      minWidth={minSize[0]}
      onDragStart={() => setIsDragging(true)}
      onDragStop={() => setIsDragging(false)}
      onMouseDownCapture={() => focusWindow(windowData.id)}
      style={{ zIndex: windowData.zIndex }}
    >
      {content}
    </Rnd>
  )
}

export default Window


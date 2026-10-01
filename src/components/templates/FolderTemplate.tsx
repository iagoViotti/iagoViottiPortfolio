import { useRef, useState } from 'react'
import { useSelect } from '../../context/SelectContext'
import type { IFile, IFolder } from '../../types/Index'
import File from '../File'

export type FolderViewStyle = 'list' | 'icon'

const columns = ['Name', 'Category', 'Description', 'Year', 'External Link']

type FolderTemplateProps = {
  folder: IFolder
  viewStyle: FolderViewStyle
}

const FolderTemplate = ({ folder, viewStyle }: FolderTemplateProps) => {
  const { selected, handleClick, handleDoubleClick } = useSelect()
  const [columnWidths, setColumnWidths] = useState([200, 150, 200, 80, 200])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [sortParameter, setSortParameter] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)
  const currentColumnIndex = useRef<number | null>(null)
  const isResizing = useRef(false)
  const isMobile = window.innerWidth < 768

  const getFileProperty = (file: IFile, column: string): string | number => {
    if (column === 'Name') return file.name
    if (file.type === 'project') {
      if (column === 'Category') return file.category
      if (column === 'Description') return file.description
      if (column === 'Year') return file.year
      if (column === 'External Link') return file.externalLink || 'N/A'
    }
    return '-'
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing.current || currentColumnIndex.current === null) return

    const column = document.querySelector(`.window__column-header[data-index="${currentColumnIndex.current}"]`)
    const offsetLeft = column ? (column as HTMLElement).getBoundingClientRect().left : 0
    const newWidth = Math.max(5, event.clientX - offsetLeft)

    setColumnWidths((widths) =>
      widths.map((width, index) => (index === currentColumnIndex.current ? newWidth : width)),
    )
  }

  const handleMouseUp = () => {
    isResizing.current = false
    currentColumnIndex.current = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const handleResizeStart = (index: number) => {
    isResizing.current = true
    currentColumnIndex.current = index
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleSort = (column: string) => {
    if (sortParameter === column) {
      setSortOrder((order) => (order === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortParameter(column)
    setSortOrder('asc')
  }

  const sortedFiles = [...folder.Files].sort((first, second) => {
    if (!sortParameter) return 0

    const firstValue = getFileProperty(first, sortParameter)
    const secondValue = getFileProperty(second, sortParameter)
    const comparison = typeof firstValue === 'number' && typeof secondValue === 'number'
      ? firstValue - secondValue
      : String(firstValue).localeCompare(String(secondValue))

    return sortOrder === 'desc' ? -comparison : comparison
  })

  if (viewStyle === 'icon') {
    if (!isMobile) {
      return (
        <div className="window__folder-icons">
          {folder.Files.map((file) => <File {...file} key={file.name} parent={folder} />)}
        </div>
      )
    }

    return (
      <div className="window__folder-icons">
        {folder.Files.map((file) => (
          <button
            className="window__folder-file"
            key={file.name}
            onClick={() => handleDoubleClick(file, folder)}
            type="button"
          >
            <strong>{file.name}</strong>
            <span>{file.type === 'project' ? file.description : 'Arquivo de Sistema'}</span>
            {file.type === 'project' && <span>{file.year}</span>}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="window__folder-list">
      <div className="window__folder-grid">
        <div className="window__column-row">
          {columns.map((column, index) => (
            <div
              className={`window__column-header ${sortParameter === column ? 'is-sorted' : ''}`}
              data-index={index}
              key={column}
              style={{ width: columnWidths[index] }}
            >
              <button onClick={() => handleSort(column)} type="button">{column}</button>
              <span className="window__column-resizer" onMouseDown={() => handleResizeStart(index)} />
            </div>
          ))}
        </div>
        {sortedFiles.map((file, index) => (
          <div className="window__column-row" key={file.name}>
            {columns.map((column, columnIndex) => (
              <button
                className={`window__column-cell ${hoveredIndex === index ? 'is-hovered' : ''} ${selected === file.name ? 'is-selected' : ''}`}
                key={column}
                onClick={() => handleClick(file)}
                onDoubleClick={() => handleDoubleClick(file, folder)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ width: columnWidths[columnIndex] }}
                type="button"
              >
                {getFileProperty(file, column)}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FolderTemplate


import './OpenedFolder.css'
import { Rnd } from 'react-rnd'
import { useRef, useState } from 'react'
import { useSelect } from '../context/SelectContext'
import File from './File'
import { IFile, IProject, IFolder, IOSWindow } from '../types/Index'
import { gridIcon } from '../assets/svg/GridIcon'
import { listIcon } from '../assets/svg/ListIcon'
import { closeIcon } from '../assets/svg/CloseIcon'

type ViewStyle = 'list' | 'icon';

const columns = ['Name', 'Category', 'Description', 'Year', 'External Link'];

// 1. Definimos a interface das props
interface OpenedFolderProps {
  windowData: IOSWindow;
}

const OpenedFolder = ({ windowData }: OpenedFolderProps) => {
  const {
    selected,
    handleClick,
    handleDoubleClick,
    closeWindow,
    focusWindow
  } = useSelect()

  // 2. Extraímos o conteúdo da pasta a partir do windowData
  const folder = windowData.content as IFolder;

  const [columnWidths, setColumnWidths] = useState<number[]>([200, 150, 200, 80, 200]);
  const currentColIndex = useRef<number | null>(null);
  const isResizing = useRef(false)
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sortParameter, setSortParameter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [viewStyle, setViewStyle] = useState<ViewStyle>('icon');

  // Um estado simples para definir o tamanho inicial da pasta (um pouco menor que o arquivo ou igual)
  const [size] = useState([800, 500]);

  const toggleViewStyle = () => {
    setViewStyle(viewStyle === 'icon' ? 'list' : 'icon');
  };

  const handleMouseDown = (index: number) => {
    isResizing.current = true;
    currentColIndex.current = index
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing.current && currentColIndex.current !== null) {
      const newWidths = [...columnWidths];
      const newWidth = Math.max(0, e.clientX - getOffsetLeft(currentColIndex.current));
      newWidths[currentColIndex.current] = newWidth;
      if (newWidths[currentColIndex.current] < 5) {
        newWidths[currentColIndex.current] = 5
      }
      setColumnWidths(newWidths);
    }
  }

  const handleMouseUp = () => {
    isResizing.current = false
    currentColIndex.current = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const getOffsetLeft = (index: number): number => {
    const col = document.querySelector(`.column-header-cell[data-index="${index}"]`);
    return col ? (col as HTMLElement).getBoundingClientRect().left : 0;
  };

  const handleSort = (column: string) => {
    if (sortParameter === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortParameter(column);
      setSortOrder('asc');
    }
  };

  const getFileProperty = (file: IFile, col: string): string | number => {
    if (col === 'Name') return file.name;

    if (file.type === 'project') {
      const project = file as IProject;
      if (col == 'Category') return project.category
      if (col === 'Description') return project.description;
      if (col === 'Year') return project.year;
      if (col === 'External Link') return project.externalLink || 'N/A';
    }

    return '-';
  };

  const sortFunction = (a: IFile, b: IFile) => {
    if (!sortParameter) return 0;

    const valA = getFileProperty(a, sortParameter);
    const valB = getFileProperty(b, sortParameter);

    let comparison = 0;
    if (typeof valA === 'string' && typeof valB === 'string') {
      comparison = valA.localeCompare(valB);
    } else if (typeof valA === 'number' && typeof valB === 'number') {
      comparison = valA - valB;
    }

    return sortOrder === 'desc' ? -comparison : comparison;
  };

  return (
    <Rnd
      default={{
        x: (window.innerWidth / 10) + 40,
        y: (window.innerHeight / 20) + 40,
        width: size[0],
        height: size[1],
      }}
      minWidth={500}
      minHeight={300}
      bounds="body"
      dragHandleClassName="opened-folder-header"
      onDragStart={() => setIsDragging(true)}
      onDragStop={() => setIsDragging(false)}

      // 3. Aplica o Z-Index e a lógica de foco ao clicar
      style={{ zIndex: windowData.zIndex }}
      onMouseDownCapture={() => focusWindow(windowData.id)}
    >
      <div id='opened-folder' className={`opened-folder ${isDragging ? 'dragging' : ''}`} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className={`opened-folder-header ${isDragging ? 'dragging' : ''}`}>
          <div className="opened-folder-header-title">{folder.name}</div>
          <div className='opened-folder-header-buttons'>
            <button onClick={() => toggleViewStyle()}>{viewStyle === 'list' ? gridIcon : listIcon}</button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(windowData.id);
              }}
            >
              {closeIcon}
            </button>
          </div>
        </div>

        {viewStyle === 'list' ? (
          <div className='scrollable-content' style={{ flexGrow: 1, overflow: 'auto' }}>
            <div className='grid-container'>
              <div className="opened-folder-column-header">
                {columns.map((col, index) => (
                  <div
                    key={index}
                    className={`column-header-cell ${sortParameter === col ? 'sorted' : ''}`}
                    data-index={index}
                    style={{ width: columnWidths[index] }}
                  >
                    <p onClick={() => handleSort(col)} >{col}</p>
                    <div
                      className="resizer"
                      onMouseDown={() => handleMouseDown(index)}
                    />
                  </div>
                ))}
              </div>
              <div className="opened-folder-content-items">
                {folder.Files
                  .sort((a, b) => sortFunction(a, b))
                  .map((item, index) => (
                    <div key={item.name} className="opened-folder-content-items">
                      {columns.map((col, colIndex) => (
                        <div
                          key={colIndex}
                          className={`column-item-cell ${hoveredIndex === index ? 'hovered' : ''} ${selected === item.name ? 'selected' : ''}`}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}

                          // Lógica de seleção (click simples)
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClick(item);
                          }}

                          // 4. Passamos a pasta (folder) como segundo argumento!
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            handleDoubleClick(item, folder);
                          }}

                          style={{ width: columnWidths[colIndex] }}>
                          <p>{getFileProperty(item, col)}</p>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className='icon-content' style={{ flexGrow: 1, overflow: 'auto' }}>
            {folder.Files.map((item, index) => {
              const file = {
                ...item,
                parent: folder,
              };

              return <File {...file} key={index} />;
            })}
          </div>
        )}
      </div>
    </Rnd >
  )
}

export default OpenedFolder
import './DesktopApp.css';
import { useSelect } from '../context/SelectContext';
import Draggable from 'react-draggable'
import { IApp } from '../types/Index';

const DesktopApp = (props: IApp) => {
  const { name, icon } = props;
  const { selected, handleClick, handleDoubleClick } = useSelect();

  const isMobile = window.innerWidth < 768
  // Um ícone provisório em SVG para o Mailer (pode ser substituído depois)
  const mailIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="app-icon-svg">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );


  if (!isMobile) {
    return (
      <Draggable bounds={'body'}>
        <div
          className={`desktop-app ${selected === name ? 'selected' : ''}`}
          onClick={() => { handleClick(props) }}
          onDoubleClick={() => { handleDoubleClick(props) }}
        >
          <div className="desktop-app-icon">
            {icon || mailIcon}
          </div>
          <p className="desktop-app-name">{name}</p>
        </div>
      </Draggable>
    );
  }

  return (
    <div
      className={`desktop-app ${selected === name ? 'selected' : ''}`}
      onClick={() => {
        handleDoubleClick(props);
      }}
    >
      <div className="desktop-app-icon">
        {icon || mailIcon}
      </div>
      <p className="desktop-app-name">{name}</p>
    </div>
  )
}
export default DesktopApp;
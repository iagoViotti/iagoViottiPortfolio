import './DesktopApp.css';
import { useSelect } from '../context/SelectContext';
import { IApp } from '../types/Index';

const DesktopApp = (props: IApp) => {
  const { selected, handleClick, handleDoubleClick } = useSelect();

  // Um ícone provisório em SVG para o Mailer (pode ser substituído depois)
  const mailIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="app-icon-svg">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );

  return (
    <div
      className={`desktop-app-shortcut ${selected === props.name ? 'selected' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        handleClick(props);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        handleDoubleClick(props);
      }}
    >
      <div className="desktop-app-icon">
        {props.icon || mailIcon}
      </div>
      <span className="desktop-app-name">{props.name}</span>
    </div>
  );
};

export default DesktopApp;
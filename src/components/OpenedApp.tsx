import { Rnd } from 'react-rnd';
import { useState } from 'react';
import { useSelect } from '../context/SelectContext';
import { IOSWindow, IApp, AppType } from '../types/Index';
import './OpenedApp.css'
import { closeIcon } from '../assets/svg/CloseIcon'

// Templates for different app types
import MailerTemplate from './templates/MailerTemplate';

const AppTemplates: Record<AppType, React.FC> = {
  mailer: MailerTemplate,
  // terminal: TerminalTemplate,
  // settings: SettingsTemplate
};

interface OpenedAppProps {
  windowData: IOSWindow;
}

const OpenedApp = ({ windowData }: OpenedAppProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { closeWindow, focusWindow } = useSelect();

  const app = windowData.content as IApp;
  const TemplateComponent = AppTemplates[app.appType];
  const [size, _setSize] = useState([500, 600])

  return (
    <Rnd
      default={{
        x: window.innerWidth / 2 - size[0] / 2,
        y: window.innerHeight / 2 - size[1] / 2,
        width: size[0],
        height: size[1],
      }}
      minWidth={400}
      minHeight={500}
      bounds="body"
      dragHandleClassName="opened-app-header"
      onDragStart={() => setIsDragging(true)}
      onDragStop={() => setIsDragging(false)}
      style={{ zIndex: windowData.zIndex }}
      onMouseDownCapture={() => focusWindow(windowData.id)}
    >
      <div className={`opened-app ${isDragging ? 'dragging' : ''}`} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>

        <div className="opened-app-header">
          <div className="opened-app-header-title">{app.name}.exe</div>
          <div className='opened-app-header-buttons'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(windowData.id);
              }}
              className="opened-app-header-close"
            >
              {closeIcon}
            </button>
          </div>
        </div>

        <div className="opened-app-content" style={{ flexGrow: 1, padding: 0, overflowY: 'auto' }}>
          {TemplateComponent ? (
            <TemplateComponent />
          ) : (
            <div style={{ padding: '20px' }}>App execution failed: Missing Template.</div>
          )}
        </div>
      </div>
    </Rnd>
  );
};

export default OpenedApp;
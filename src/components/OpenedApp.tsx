import { Rnd } from 'react-rnd';
import { useState } from 'react';
import { useSelect } from '../context/SelectContext';
import { IOSWindow, IApp } from '../types/Index';

// Aqui você importará os templates dos outros apps quando criar
import MailerTemplate from './templates/MailerTemplate';

const AppTemplates = {
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

  return (
    <Rnd
      default={{
        x: window.innerWidth / 2 - 250,
        y: window.innerHeight / 2 - 300,
        width: 500, // Apps como o mailer ficam melhores mais estreitos
        height: 600,
      }}
      minWidth={400}
      minHeight={500}
      bounds="body"
      dragHandleClassName="opened-file-header"
      onDragStart={() => setIsDragging(true)}
      onDragStop={() => setIsDragging(false)}
      style={{ zIndex: windowData.zIndex }}
      onMouseDownCapture={() => focusWindow(windowData.id)}
    >
      <div className={`opened-file ${isDragging ? 'dragging' : ''}`} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>

        <div className="opened-file-header">
          {/* Você pode mudar a classe header depois para algo como opened-app-header se quiser cores diferentes para os cabeçalhos de Apps */}
          <div className="opened-file-header-title">{app.name}.exe</div>
          <div className='opened-file-header-buttons'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(windowData.id);
              }}
              className="opened-folder-header-close"
            >
              X
            </button>
          </div>
        </div>

        <div className="opened-file-content" style={{ flexGrow: 1, padding: 0, overflow: 'hidden' }}>
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
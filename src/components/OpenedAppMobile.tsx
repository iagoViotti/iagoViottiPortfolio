import { useSelect } from '../context/SelectContext';
import { IOSWindow, IApp, AppType } from '../types/Index';
import { closeIcon } from '../assets/svg/CloseIcon'
// import './OpenedApp.css'

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
  const app = windowData.content as IApp;
  const TemplateComponent = AppTemplates[app.appType];
  const { closeWindow } = useSelect()

  return (
    <div className={`opened-app`} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>

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
  );
};

export default OpenedApp;
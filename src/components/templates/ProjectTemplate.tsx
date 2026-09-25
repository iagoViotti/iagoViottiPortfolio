import './ProjectTemplate.css';
import { useTranslation } from 'react-i18next';
import { IProject } from '../../types/Index';

// interface IProject {
//   type: 'project';
//   name: string;
//   category: string;
//   shortDescription: string;
//   description: string;
//   year: number;
//   image: string;
//   externalLink: string;
//   mainStack: string;
// }

const ProjectTemplate = ({ file }: { file: IProject }) => {
  const { t } = useTranslation();

  return (
    <div className="void-template-container">

      {/* CABEÇALHO */}
      <div className="void-header">
        <div className="void-meta">
          <span>{file.category}</span> <span>| {file.year}</span>
        </div>
        <div className="void-title-row">
          <h1 className="void-title">{file.name}</h1>
          <a
            href={file.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="void-launch-btn"
          >
            {t('opened_file.button')}
          </a>
        </div>
      </div>

      <div className="void-divider"></div>

      {/* ÁREA DA IMAGEM */}
      <div className="void-image-section">
        <div className="void-image-badge">{file.shortDescription || 'BUILD_V.01'}</div>
        <img src={file.image} alt={file.name} className="void-image" />
      </div>

      <div className="void-bottom-grid">
        <div className="void-abstract-box">
          <h2 className="void-box-title">{t("opened_file.abstract")}</h2>
          <p className="void-description">
            {file.description}
          </p>
        </div>
        <div className="void-right-col">
          <div className="void-stack-box">
            <h2 className="void-box-title black-text">MAIN STACK</h2>
            <div className="void-tags">
              {file.stacks.map((stack, index) => (
                <span key={index} className="void-tag">
                  {stack}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProjectTemplate;
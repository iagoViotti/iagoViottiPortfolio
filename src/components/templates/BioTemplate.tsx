import './BioTemplate.css';
import { IBio } from '../../types/Index';

interface BioTemplateProps {
  file: IBio;
}

const BioTemplate = ({ file }: BioTemplateProps) => {
  // Função auxiliar para formatar o período (ex: 2021 — PRESENT)
  const formatPeriod = (dates: Date[]) => {
    if (!dates || dates.length === 0) return '';
    const start = dates[0].getFullYear();
    const end = dates[1] ? dates[1].getFullYear() : 'PRESENT';
    return `${start} — ${end}`;
  };

  // Cores neo-brutalistas para as tags de stack
  const tagColors = ['#FCD2C2', '#C2F0E2', '#E2C2F0', '#F2F2F2', '#FFF5BA'];

  return (
    <div className="bio-template-container">

      {/* Coluna Esquerda: Foto e Status */}
      <aside className="bio-sidebar">
        <div className="bio-avatar-container">
          {/* Substitua por uma tag <img /> quando tiver a URL da imagem no seu arquivo */}
          <div className="bio-avatar-placeholder"></div>
        </div>

        <div className="bio-sidebar-info">
          <div className="info-block">
            <span className="info-label">STATUS</span>
            <span className="info-value">{file.status}</span>
          </div>
          {/* Você pode adicionar LOCATION na interface depois, se quiser manter fiel à imagem */}
        </div>
      </aside>

      <main className="bio-main-content">

        {/* MISSION / BIO */}
        <section className="bio-section">
          <h3 className="section-title">
            <span className="icon">⌨️</span> MISSION
          </h3>
          <p className="bio-text">{file.bio}</p>
        </section>

        {/* CORE STACK */}
        <section className="bio-section">
          <h3 className="section-title">
            <span className="icon">📚</span> CORE STACK
          </h3>
          <div className="stack-container">
            {file.techStack.map((tech, index) => (
              <span
                key={index}
                className="brutalist-tag"
                style={{ backgroundColor: tagColors[index % tagColors.length] }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* EXPERIENCE (Professional) */}
        {file.professionalExperience?.length > 0 && (
          <section className="bio-section">
            <h3 className="section-title">
              <span className="icon">💼</span> EXPERIENCE
            </h3>
            <div className="timeline">
              {file.professionalExperience.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-node"></div>
                  <div className="timeline-content">
                    <h4 className="timeline-role">{exp.name}</h4>
                    <span className="timeline-period">{formatPeriod(exp.period)} / {exp.attribution}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION (opcional, seguindo a mesma lógica da experiência) */}
        {file.educationalExperience?.length > 0 && (
          <section className="bio-section">
            <h3 className="section-title">
              <span className="icon">🎓</span> EDUCATION
            </h3>
            <div className="timeline">
              {file.educationalExperience.map((edu, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-node"></div>
                  <div className="timeline-content">
                    <h4 className="timeline-role">{edu.name}</h4>
                    <span className="timeline-period">{formatPeriod(edu.period)} / {edu.attribution}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FOOTER DO ARQUIVO */}
        <div className="bio-footer">
          EOF_BIO_REPORT // 100% COMPILED
        </div>

      </main>
    </div>
  );
};

export default BioTemplate;
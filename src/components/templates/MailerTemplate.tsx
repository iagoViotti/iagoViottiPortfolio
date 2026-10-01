import { useState } from 'react';
import './MailerTemplate.css';
import { mailIcon } from '../../assets/svg/MailIcon';

const MailerTemplate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'opportunity',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending message:', formData);
    // Aqui entrará a integração futura (ex: EmailJS, Formspree ou fetch nativo)
    alert('Mensagem enviada com sucesso!');
  };

  return (
    <div className="mailer-container">
      <header className="mailer-header">
        <div className="mailer-header-internal">
          {mailIcon}
          <h2 className="mailer-title">NOVA MENSAGEM</h2>
        </div>
        <p className="mailer-subtitle">Pronto para iniciar um projeto? Envie um ping.</p>
      </header>

      <form className="mailer-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">NOME_</label>
            <input
              type="text"
              id="name"
              className="brutalist-input"
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">EMAIL_</label>
            <input
              type="email"
              id="email"
              className="brutalist-input"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subject">ASSUNTO_</label>
          <select
            id="subject"
            className="brutalist-input select-input"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          >
            <option value="opportunity">Nova Oportunidade / Projeto</option>
            <option value="freelance">Freelance</option>
            <option value="networking">Networking</option>
            <option value="feedback">Feedback</option>
            <option value="other">Outro</option>
          </select>
        </div>

        <div className="form-group form-group-grow">
          <label htmlFor="message">MENSAGEM_</label>
          <textarea
            id="message"
            className="brutalist-input textarea-input"
            placeholder="Digite sua mensagem aqui..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          ></textarea>
        </div>

        <footer className="mailer-footer">
          <button type="submit" className="brutalist-submit-btn">
            ENVIAR_MSG [ENTER]
          </button>
        </footer>
      </form>
    </div>
  );
};

export default MailerTemplate;
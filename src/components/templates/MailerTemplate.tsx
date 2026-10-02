import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './MailerTemplate.css';
import { mailIcon } from '../../assets/svg/MailIcon';

const MailerTemplate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'opportunity',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs.send(
      'gmail_js',
      'template_inims1s',
      templateParams,
      'GTXuCXrqmUAg22mQs'
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setStatus('success');
      setFormData({ name: '', email: '', subject: 'opportunity', message: '' });
      
      // Retorna o botão ao estado original
      setTimeout(() => setStatus('idle'), 3000); 
    })
    .catch((err) => {
      console.log('FAILED...', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    });
  };

  const getButtonContent = () => {
    switch (status) {
      case 'sending': return 'ENVIANDO...';
      case 'success': return 'ENVIADO COM SUCESSO ✔';
      case 'error': return 'ERRO! TENTE NOVAMENTE';
      default: return 'ENVIAR_MSG [ENTER]';
    }
  };

  const getButtonClass = () => {
    let baseClass = "brutalist-submit-btn";
    if (status === 'success') return `${baseClass} success`;
    if (status === 'error') return `${baseClass} error`;
    if (status === 'sending') return `${baseClass} sending`;
    return baseClass;
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
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              disabled={status === 'sending'}
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
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              disabled={status === 'sending'}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subject">ASSUNTO_</label>
          <select 
            id="subject" 
            className="brutalist-input select-input"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            disabled={status === 'sending'}
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
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
            disabled={status === 'sending'}
          ></textarea>
        </div>

        <footer className="mailer-footer">
          <button 
            type="submit" 
            className={getButtonClass()}
            disabled={status === 'sending'}
          >
            {getButtonContent()}
          </button>
        </footer>
      </form>
    </div>
  );
};

export default MailerTemplate;
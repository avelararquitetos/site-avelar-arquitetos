import { useState } from "react";
const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSubmitted(true);
  };
  return <section id="contact" className="py-32 bg-background">
      <div className="mx-auto px-12 md:px-20 lg:px-32">
        <div className="grid md:grid-cols-2 gap-20">
          {/* Form */}
          <div>
            <h2 className="text-minimal text-muted-foreground mb-4">CONTATO</h2>
            <h3 className="text-4xl md:text-5xl font-light text-architectural mb-14">
              Vamos conversar
            </h3>

            {submitted ? <p className="text-lg text-muted-foreground">
                Mensagem enviada — entraremos em contacto em breve.
              </p> : <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="text-minimal text-muted-foreground mb-2 block">
                    NOME
                  </label>
                  <input id="name" type="text" maxLength={100} value={form.name} onChange={e => setForm({
                ...form,
                name: e.target.value
              })} className="w-full bg-transparent border-b border-border py-3 text-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300" placeholder="O seu nome" required />
                </div>
                <div>
                  <label htmlFor="email" className="text-minimal text-muted-foreground mb-2 block">
                    EMAIL
                  </label>
                  <input id="email" type="email" maxLength={255} value={form.email} onChange={e => setForm({
                ...form,
                email: e.target.value
              })} className="w-full bg-transparent border-b border-border py-3 text-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300" placeholder="email@exemplo.com" required />
                </div>
                <div>
                  <label htmlFor="message" className="text-minimal text-muted-foreground mb-2 block">
                    MENSAGEM
                  </label>
                  <textarea id="message" maxLength={1000} rows={4} value={form.message} onChange={e => setForm({
                ...form,
                message: e.target.value
              })} className="w-full bg-transparent border-b border-border py-3 text-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300 resize-none" placeholder="Fale-nos do seu projeto" required />
                </div>
                <button type="submit" className="border border-foreground text-foreground text-minimal px-10 py-4 hover:bg-foreground hover:text-background transition-all duration-500">
                  Enviar
                </button>
              </form>}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div className="space-y-10">
              <div>
                <h4 className="text-minimal text-muted-foreground mb-2">EMAIL</h4>
                <a href="mailto:hello@archstudio.com" className="text-xl hover:text-muted-foreground transition-colors duration-300">contato@avelararquitetos.com.br</a>
              </div>
              <div>
                <h4 className="text-minimal text-muted-foreground mb-2">TELEFONE</h4>
                <a href="tel:+351912345678" className="text-xl hover:text-muted-foreground transition-colors duration-300">+55 31 3157-2813</a>
              </div>
              <div>
                <h4 className="text-minimal text-muted-foreground mb-2">INSTAGRAM</h4>
                <a href="https://instagram.com/archstudio" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-muted-foreground transition-colors duration-300">@avelar.arquitetos</a>
              </div>
            </div>

            <div className="pt-12 border-t border-border mt-12">
              <p className="text-muted-foreground leading-relaxed">
                Abordamos cada projeto com curiosidade, rigor e compromisso com a excelência.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;
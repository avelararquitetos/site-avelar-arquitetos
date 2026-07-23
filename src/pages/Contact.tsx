import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const PROJECT_TYPES = [
  "Residencial - Nova Construção",
  "Reforma Residencial",
  "Projeto de Interiores",
  "Consultoria",
  "Outro",
];

const INVESTMENT_RANGES = [
  "Até R$ 500 mil",
  "R$ 500 mil a R$ 1 milhão",
  "R$ 1 milhão a R$ 2 milhões",
  "Acima de R$ 2 milhões",
  "Prefiro não informar",
];

type Status = "idle" | "loading" | "success" | "error";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  project_type: "",
  investment_range: "",
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");

  const update = (k: keyof typeof initialForm, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(form).some((v) => !v.trim())) return;

    setStatus("loading");
    try {
      const { error: insertError } = await supabase
        .from("contact_submissions")
        .insert([form]);
      if (insertError) throw insertError;

      const { error: fnError } = await supabase.functions.invoke(
        "send-contact-notification",
        { body: form },
      );
      if (fnError) throw fnError;

      setForm(initialForm);
      setStatus("success");
    } catch (err) {
      console.error("Contact submission failed:", err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="pt-32 pb-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20">
              <div>
                <h1 className="text-minimal text-muted-foreground mb-4">ENTRE EM CONTATO</h1>
                <h2 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                  Vamos Criar Algo
                  <br />
                  Extraordinário
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">EMAIL</h3>
                    <a href="mailto:contato@avelararquitetos.com.br" className="text-xl hover:text-muted-foreground transition-colors duration-300">
                      contato@avelararquitetos.com.br
                    </a>
                  </div>

                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">WHATSAPP</h3>
                    <a href="tel:+553131572813" className="text-xl hover:text-muted-foreground transition-colors duration-300">
                      +55 31 3157-2813
                    </a>
                  </div>

                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">ESCRITÓRIO</h3>
                    <address className="text-xl not-italic">
                      Belo Horizonte
                      <br />
                      Minas Gerais, Brasil
                    </address>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-minimal text-muted-foreground mb-6">SIGA-NOS</h3>
                  <div className="space-y-4">
                    <a href="https://instagram.com/avelar.arquitetos" target="_blank" rel="noopener noreferrer" className="block text-xl hover:text-muted-foreground transition-colors duration-300">
                      Instagram
                    </a>
                    <a href="#" className="block text-xl hover:text-muted-foreground transition-colors duration-300">
                      LinkedIn
                    </a>
                  </div>
                </div>

                <div className="pt-12 border-t border-border">
                  <p className="text-muted-foreground">
                    Abordamos cada projeto com curiosidade, rigor e compromisso com a excelência.
                    Nosso processo começa com a escuta, compreendendo sua visão e traduzindo-a
                    em espaços que superam expectativas.
                  </p>
                </div>
              </div>
            </div>

            {/* Formulário de contato */}
            <div className="mt-32 pt-20 border-t border-border">
              <div className="grid md:grid-cols-2 gap-20">
                <div>
                  <h2 className="text-minimal text-muted-foreground mb-4">FORMULÁRIO</h2>
                  <h3 className="text-3xl md:text-4xl font-light text-architectural mb-6">
                    Conte-nos sobre o seu projeto
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Preencha o formulário e retornaremos em até dois dias úteis.
                    Todas as informações são tratadas com absoluta confidencialidade.
                  </p>
                </div>

                <div>
                  {status === "success" ? (
                    <div className="border border-border p-10">
                      <h4 className="text-minimal text-muted-foreground mb-4">MENSAGEM ENVIADA</h4>
                      <p className="text-2xl font-light text-architectural mb-4">
                        Recebemos sua mensagem.
                      </p>
                      <p className="text-muted-foreground mb-8">
                        Entraremos em contato em breve.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="text-minimal underline underline-offset-4 hover:text-muted-foreground transition-colors"
                      >
                        Enviar outra mensagem
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-minimal text-muted-foreground">NOME COMPLETO</Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          maxLength={120}
                          required
                          className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 text-lg focus-visible:ring-0 focus-visible:border-foreground"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-minimal text-muted-foreground">E-MAIL</Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          maxLength={255}
                          required
                          className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 text-lg focus-visible:ring-0 focus-visible:border-foreground"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-minimal text-muted-foreground">TELEFONE / WHATSAPP</Label>
                        <Input
                          id="phone"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          maxLength={40}
                          required
                          className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 text-lg focus-visible:ring-0 focus-visible:border-foreground"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-minimal text-muted-foreground">TIPO DE PROJETO</Label>
                        <Select
                          value={form.project_type}
                          onValueChange={(v) => update("project_type", v)}
                          required
                        >
                          <SelectTrigger className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 text-lg h-auto focus:ring-0 focus:border-foreground">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {PROJECT_TYPES.map((t) => (
                              <SelectItem key={t} value={t}>{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-minimal text-muted-foreground">FAIXA DE INVESTIMENTO</Label>
                        <Select
                          value={form.investment_range}
                          onValueChange={(v) => update("investment_range", v)}
                          required
                        >
                          <SelectTrigger className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 text-lg h-auto focus:ring-0 focus:border-foreground">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {INVESTMENT_RANGES.map((r) => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-minimal text-muted-foreground">MENSAGEM</Label>
                        <Textarea
                          id="message"
                          value={form.message}
                          onChange={(e) => update("message", e.target.value)}
                          rows={5}
                          maxLength={2000}
                          required
                          className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 text-lg focus-visible:ring-0 focus-visible:border-foreground resize-none"
                        />
                      </div>

                      {status === "error" && (
                        <p className="text-sm text-muted-foreground border-l-2 border-foreground pl-4">
                          Não foi possível enviar sua mensagem. Tente novamente ou
                          entre em contato pelo e-mail ou WhatsApp acima.
                        </p>
                      )}

                      <Button
                        type="submit"
                        disabled={status === "loading"}
                        variant="outline"
                        className="rounded-none border-foreground text-foreground text-minimal px-10 py-6 h-auto hover:bg-foreground hover:text-background transition-all duration-500"
                      >
                        {status === "loading" ? "Enviando..." : "Enviar mensagem"}
                      </Button>

                      <p className="text-sm text-muted-foreground">
                        Ao enviar, você concorda com nossa{" "}
                        <Link
                          to="/politica-de-privacidade"
                          className="underline underline-offset-4 hover:text-foreground transition-colors"
                        >
                          Política de Privacidade
                        </Link>
                        .
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

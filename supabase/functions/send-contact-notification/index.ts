import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

interface Payload {
  name: string;
  email: string;
  phone: string;
  project_type: string;
  investment_range: string;
  message: string;
}

const isNonEmptyString = (v: unknown): v is string =>
  typeof v === 'string' && v.trim().length > 0 && v.length <= 2000;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const body = (await req.json()) as Partial<Payload>;
    const { name, email, phone, project_type, investment_range, message } = body;

    if (
      !isNonEmptyString(name) ||
      !isNonEmptyString(email) ||
      !isNonEmptyString(phone) ||
      !isNonEmptyString(project_type) ||
      !isNonEmptyString(investment_range) ||
      !isNonEmptyString(message)
    ) {
      return new Response(
        JSON.stringify({ error: 'Todos os campos são obrigatórios.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const escape = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const html = `
      <div style="font-family: Arial, sans-serif; color: #1a1a1a; line-height: 1.6;">
        <h2 style="font-weight: 300; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
          Novo contato pelo site
        </h2>
        <p><strong>Nome:</strong> ${escape(name)}</p>
        <p><strong>E-mail:</strong> ${escape(email)}</p>
        <p><strong>Telefone / WhatsApp:</strong> ${escape(phone)}</p>
        <p><strong>Tipo de projeto:</strong> ${escape(project_type)}</p>
        <p><strong>Faixa de investimento:</strong> ${escape(investment_range)}</p>
        <p><strong>Mensagem:</strong></p>
        <p style="white-space: pre-wrap; padding: 12px; background: #f7f7f7; border-left: 3px solid #1a1a1a;">
          ${escape(message)}
        </p>
      </div>
    `;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Avelar Arquitetos <contato@avelararquitetos.com.br>',
        to: ['contato@avelararquitetos.com.br'],
        reply_to: email,
        subject: `Novo contato pelo site: ${name}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('Resend error', resendRes.status, errText);
      return new Response(
        JSON.stringify({ error: 'Falha ao enviar e-mail', details: errText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-contact-notification error', err);
    return new Response(
      JSON.stringify({ error: 'Erro interno', details: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SITE_WHATSAPP_URL, WHATSAPP_NUMBER } from '../whatsapp';

const EFFECTIVE_DATE = '26 August 2026';

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: LegalSection[];
  effectiveDate?: string;
};

const ContactDetails = () => (
  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700">
    <p className="font-semibold text-neutral-950">Local Biz (Pty) Ltd trading as Local Pros Studio</p>
    <p>Company registration number: 2015/299905/07</p>
    <p>30 Enkeldoring Draai, Arboretum, Richards Bay, 3900, South Africa</p>
    <p>
      Email:{' '}
      <a className="font-medium text-amber-700 underline" href="mailto:hello@localpros.co.za">
        hello@localpros.co.za
      </a>
    </p>
    <p>
      WhatsApp/telephone:{' '}
      <a className="font-medium text-amber-700 underline" href="tel:+27832336716">
        +27 83 233 6716
      </a>
    </p>
  </div>
);

const LegalPage = ({ eyebrow, title, introduction, sections, effectiveDate = EFFECTIVE_DATE }: LegalPageProps) => {
  return (
    <div className="bg-neutral-50">
      <header className="border-b border-neutral-800 bg-neutral-950 py-16 text-white md:py-20">
        <div className="container-sm">
          <span className="badge-dark mb-5">{eyebrow}</span>
          <h1 className="max-w-3xl text-4xl font-bold text-white md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-neutral-300">{introduction}</p>
          <p className="mt-4 text-sm text-neutral-500">Effective date: {effectiveDate}</p>
        </div>
      </header>

      <div className="container-md grid gap-10 py-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-16">
        <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-5 lg:sticky lg:top-24">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-900">Policies</p>
          <nav className="space-y-2 text-sm">
            <Link className="block text-neutral-600 hover:text-neutral-950" to="/terms">
              Terms and Conditions
            </Link>
            <Link className="block text-neutral-600 hover:text-neutral-950" to="/privacy">
              Privacy Policy
            </Link>
            <Link className="block text-neutral-600 hover:text-neutral-950" to="/refunds-cancellations">
              Refunds and Cancellations
            </Link>
            <Link className="block text-neutral-600 hover:text-neutral-950" to="/website-faq">
              Website Terms and FAQ
            </Link>
          </nav>
        </aside>

        <article className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-soft md:p-10">
          <div className="space-y-10">
            {sections.map((section, index) => (
              <section key={section.title} className={index === 0 ? '' : 'border-t border-neutral-200 pt-10'}>
                <h2 className="mb-4 text-2xl font-bold text-neutral-950">{section.title}</h2>
                <div className="space-y-4 text-neutral-700 [&_a]:text-amber-700 [&_a]:underline [&_li]:leading-relaxed [&_p]:text-neutral-700 [&_strong]:text-neutral-950 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

const termsSections: LegalSection[] = [
  {
    title: '1. Who we are',
    content: (
      <>
        <p>
          Local Pros Studio is the digital-services trading division of <strong>Local Biz (Pty) Ltd</strong>.
          We supply our own digital marketing, website, SEO, social-media and reputation-management
          services directly to customers.
        </p>
        <p>
          Payments made to Local Pros Studio are for services supplied by Local Biz (Pty) Ltd. We do not
          use this website or our payment account to collect marketplace payments on behalf of businesses
          listed in the Local Pros directory, and we do not process third-party transactions.
        </p>
        <ContactDetails />
      </>
    ),
  },
  {
    title: '2. Accepting these terms',
    content: (
      <>
        <p>
          These terms apply when you request, order, subscribe to or use a Local Pros Studio service. By
          accepting a quotation, order form or subscription, or by paying an invoice, you confirm that you
          have read and accepted these terms.
        </p>
        <p>
          Your quotation, proposal, order form or statement of work may contain service-specific scope,
          pricing, delivery dates or commitment periods. Those specific written terms take priority if they
          conflict with these general terms.
        </p>
      </>
    ),
  },
  {
    title: '3. Services and delivery',
    content: (
      <>
        <p>Our services may include:</p>
        <ul>
          <li>website design, development, hosting and maintenance;</li>
          <li>SEO, content and digital-marketing services;</li>
          <li>social-media content creation, scheduling and management;</li>
          <li>review collection and reputation-management services;</li>
          <li>Google Ads setup and management; and</li>
          <li>other services described in a quotation, proposal or on this website.</li>
        </ul>
        <p>
          The exact deliverables, start date and estimated delivery period are shown on the relevant service
          page or agreed with you in writing. Timelines depend on receiving the information, approvals,
          platform access and content we reasonably need from you.
        </p>
      </>
    ),
  },
  {
    title: '4. Prices, payment and recurring billing',
    content: (
      <>
        <p>
          Prices are stated in South African rand. Any applicable taxes, setup fees, advertising spend,
          domain charges or third-party costs will be shown on the service page, quotation or invoice before
          you pay.
        </p>
        <p>
          Payment may be made by electronic funds transfer, card or an approved payment provider such as
          PayFast. If you choose a recurring plan, you authorise the agreed subscription amount to be charged
          on each billing date until the subscription is cancelled. We will provide an electronic invoice or
          payment record.
        </p>
        <p>
          If payment fails or becomes overdue, we may pause the affected service after giving reasonable
          notice. You remain responsible for amounts already due and for approved third-party costs already
          committed on your behalf.
        </p>
      </>
    ),
  },
  {
    title: '5. Monthly and fixed-term services',
    content: (
      <>
        <p>
          A service is month-to-month unless the relevant offer, quotation or order form clearly states a
          fixed commitment period. Month-to-month services may be cancelled at any time and end at the close
          of the current paid billing period, subject to our{' '}
          <Link to="/refunds-cancellations">Refund and Cancellation Policy</Link>.
        </p>
        <p>
          Some discounted bundles or website packages include a fixed commitment because setup work or a
          website is supplied upfront. Where consumer law applies, a customer may cancel a fixed-term
          agreement on the notice required by law, subject only to a reasonable cancellation charge allowed
          by law. Business-specific ownership, hosting and handover terms will be stated in the accepted offer.
          Our standard website terms are explained in our <Link to="/website-faq">Website Terms and FAQ</Link>.
        </p>
      </>
    ),
  },
  {
    title: '6. Your responsibilities',
    content: (
      <ul>
        <li>Provide accurate, lawful and current business information, content and instructions.</li>
        <li>Confirm that you have the right to use content, images, trade marks and account access supplied to us.</li>
        <li>Review and approve material within the agreed timeframes.</li>
        <li>Keep your passwords and account credentials secure.</li>
        <li>Use our services lawfully and comply with the rules of Google, Meta and other third-party platforms.</li>
      </ul>
    ),
  },
  {
    title: '7. Third-party platforms and results',
    content: (
      <>
        <p>
          Some services rely on third-party platforms, hosting providers, payment providers, advertising
          networks and social networks. Their outages, policy changes, account reviews or suspensions may be
          outside our control.
        </p>
        <p>
          We will deliver the agreed work with reasonable care and skill, but we cannot guarantee a specific
          search ranking, number of leads, sales, reviews, advertising result or uninterrupted availability of
          a third-party service unless that guarantee is expressly included in your written offer.
        </p>
      </>
    ),
  },
  {
    title: '8. Intellectual property',
    content: (
      <>
        <p>
          You retain ownership of material you provide to us. We retain ownership of our pre-existing tools,
          templates, software, processes and know-how. Ownership or licensing of work created specifically for
          you is determined by the accepted service offer and is subject to full payment.
        </p>
        <p>
          Third-party fonts, images, software and platform features remain subject to their own licence terms.
        </p>
      </>
    ),
  },
  {
    title: '9. Privacy and confidentiality',
    content: (
      <p>
        We handle personal information as described in our <Link to="/privacy">Privacy Policy</Link>. Each
        party must protect confidential business information received from the other and may use it only to
        deliver or receive the agreed services, unless disclosure is required by law.
      </p>
    ),
  },
  {
    title: '10. Liability and complaints',
    content: (
      <>
        <p>
          Nothing in these terms removes rights or remedies that cannot lawfully be excluded. To the extent
          permitted by law, neither party is liable for indirect or consequential loss. Our total liability
          relating to a service is limited to the fees paid for that affected service during the three months
          before the event giving rise to the claim, except for fraud, gross negligence or liability that may
          not lawfully be limited.
        </p>
        <p>
          Please report a concern to <a href="mailto:hello@localpros.co.za">hello@localpros.co.za</a>. We will
          acknowledge it and try to resolve it in good faith. These terms are governed by South African law.
        </p>
      </>
    ),
  },
  {
    title: '11. Changes to these terms',
    content: (
      <p>
        We may update these terms when our services, providers or legal obligations change. The effective date
        above will be updated. Material changes affecting an active paid service will be communicated before
        they take effect where reasonably possible.
      </p>
    ),
  },
];

const privacySections: LegalSection[] = [
  {
    title: '1. Responsible party',
    content: (
      <>
        <p>
          Local Biz (Pty) Ltd, trading as Local Pros Studio, is the responsible party for personal information
          processed through this website and our direct services.
        </p>
        <ContactDetails />
      </>
    ),
  },
  {
    title: '2. Information we collect',
    content: (
      <ul>
        <li>name, business name, email address, telephone number and billing details;</li>
        <li>enquiries, quotations, instructions, approvals and support conversations;</li>
        <li>content and account information supplied so that we can perform services;</li>
        <li>subscription, invoice and payment-status information;</li>
        <li>website usage information such as pages viewed, device details and approximate location; and</li>
        <li>information you choose to provide through WhatsApp, email, forms or other service channels.</li>
      </ul>
    ),
  },
  {
    title: '3. How we use information',
    content: (
      <ul>
        <li>respond to enquiries and prepare quotations;</li>
        <li>create, administer and deliver the services you request;</li>
        <li>process payments, subscriptions, invoices and refunds;</li>
        <li>communicate about service delivery, support, billing and material policy changes;</li>
        <li>protect our customers, systems and business from fraud or misuse;</li>
        <li>improve our website, services and customer experience; and</li>
        <li>meet accounting, tax, regulatory and other legal obligations.</li>
      </ul>
    ),
  },
  {
    title: '4. Payments',
    content: (
      <p>
        Card and payment information may be collected directly by PayFast or another approved payment
        provider. We do not receive or store your complete card number or card security code. We may receive
        limited transaction information such as the payer, amount, date, payment status and provider reference
        so that we can administer your account.
      </p>
    ),
  },
  {
    title: '5. When we share information',
    content: (
      <>
        <p>We do not sell personal information. We share it only where reasonably necessary with:</p>
        <ul>
          <li>payment, banking, accounting and fraud-prevention providers;</li>
          <li>website hosting, cloud storage, analytics, email and communications providers;</li>
          <li>Google, Meta and other platforms used to deliver a service you requested;</li>
          <li>professional advisers, regulators or authorities where required by law; and</li>
          <li>a successor to our business, subject to appropriate confidentiality and legal safeguards.</li>
        </ul>
        <p>
          Some service providers may process information outside South Africa. Where this happens, we use
          providers and arrangements intended to provide an appropriate level of protection.
        </p>
      </>
    ),
  },
  {
    title: '6. Cookies and analytics',
    content: (
      <p>
        Our website may use essential cookies and limited analytics to operate the site, understand usage and
        improve performance. You can restrict cookies in your browser, although some site functions may not
        work as intended.
      </p>
    ),
  },
  {
    title: '7. Retention and security',
    content: (
      <>
        <p>
          We keep information only for as long as reasonably needed for the purpose collected, an active
          customer relationship, dispute handling, or accounting and legal retention requirements. We then
          delete, de-identify or securely archive it where appropriate.
        </p>
        <p>
          We use reasonable technical and organisational safeguards. No online system is completely secure;
          if we identify a security compromise affecting personal information, we will respond and notify as
          required by applicable law.
        </p>
      </>
    ),
  },
  {
    title: '8. Your rights',
    content: (
      <>
        <p>You may ask us to:</p>
        <ul>
          <li>confirm whether we hold personal information about you;</li>
          <li>provide access to or correct your personal information;</li>
          <li>delete information where we no longer have a lawful reason to keep it;</li>
          <li>object to certain processing or withdraw consent where processing relies on consent; and</li>
          <li>stop direct marketing communications.</li>
        </ul>
        <p>
          Send requests to <a href="mailto:hello@localpros.co.za">hello@localpros.co.za</a>. We may need to
          verify your identity. You may also lodge a POPIA complaint with the South African Information
          Regulator through{' '}
          <a href="https://inforegulator.org.za/complaints/" target="_blank" rel="noopener noreferrer">
            its complaints service
          </a>.
        </p>
      </>
    ),
  },
  {
    title: '9. Marketing and children',
    content: (
      <>
        <p>
          We send direct marketing only where permitted. You may opt out at any time by using the unsubscribe
          method provided or contacting us. Service and billing notices are not marketing communications.
        </p>
        <p>
          Our services are intended for businesses and adults authorised to act for them. We do not knowingly
          collect personal information directly from children.
        </p>
      </>
    ),
  },
  {
    title: '10. Changes to this policy',
    content: (
      <p>
        We may update this policy as our services or legal obligations change. The latest version will remain
        available on this page with its effective date.
      </p>
    ),
  },
];

const refundSections: LegalSection[] = [
  {
    title: '1. Scope of this policy',
    content: (
      <>
        <p>
          This policy applies to services supplied directly by Local Biz (Pty) Ltd trading as Local Pros
          Studio. It does not cover third-party marketplace transactions because we do not process payments on
          behalf of businesses listed in the Local Pros directory.
        </p>
        <p>
          A quotation, proposal or order form may include service-specific cancellation or refund terms. Those
          specific terms apply together with this policy, subject to rights that cannot lawfully be excluded.
        </p>
      </>
    ),
  },
  {
    title: '2. Cancelling a month-to-month service',
    content: (
      <>
        <p>
          You may cancel a month-to-month service at any time by emailing{' '}
          <a href="mailto:hello@localpros.co.za">hello@localpros.co.za</a> or sending a written WhatsApp message
          to <a href={SITE_WHATSAPP_URL}>+27 83 233 6716</a>.
        </p>
        <p>
          Cancellation takes effect at the end of the current paid billing period. To prevent the next
          recurring charge, please send your request at least five business days before the next billing date.
          If a charge has already entered processing, contact us immediately and we will review it fairly.
        </p>
      </>
    ),
  },
  {
    title: '3. Fixed-term services and bundles',
    content: (
      <p>
        If you accepted a fixed-term offer, its agreed commitment and any upfront benefit—such as discounted
        setup or an included website—will be shown before purchase. Where the Consumer Protection Act applies,
        you may cancel on 20 business days' written notice. We may charge only a reasonable cancellation amount
        permitted by law, taking into account work completed, benefits supplied, costs incurred and the value
        of the remaining agreement. Fixed-term terms may apply differently to juristic-person transactions.
      </p>
    ),
  },
  {
    title: '4. Refunds before work starts',
    content: (
      <p>
        If you cancel a once-off service before work starts and before we commit third-party costs, we will
        refund the amount paid. If discovery, setup or other work has already started, or approved costs have
        been committed, we may deduct the reasonable value of that work and those costs and refund the balance.
      </p>
    ),
  },
  {
    title: '5. Monthly fees and work already delivered',
    content: (
      <p>
        Monthly fees reserve capacity and cover work and access during that billing period. They are normally
        not refunded once the period has started and the service has been made available or work has been
        performed. This does not limit a refund or other remedy required by law or due because we materially
        failed to provide the agreed service.
      </p>
    ),
  },
  {
    title: '6. Third-party and advertising costs',
    content: (
      <p>
        Domain registrations, hosting, advertising spend, software licences, stock assets and other third-party
        costs are non-refundable once purchased or committed, unless the relevant provider refunds us. We will
        identify material third-party costs in the service offer or obtain approval before incurring them.
      </p>
    ),
  },
  {
    title: '7. Service problems and incorrect charges',
    content: (
      <>
        <p>
          If you believe a service was not supplied as agreed, contact us with the relevant details. We will
          investigate and, where appropriate, re-perform the service, correct the problem, provide a fair
          service credit, or refund the affected amount.
        </p>
        <p>
          Confirmed duplicate payments or payments taken after an effective cancellation will be refunded in
          full. This does not include a charge already due for a completed billing period or approved work.
        </p>
      </>
    ),
  },
  {
    title: '8. How and when refunds are paid',
    content: (
      <>
        <p>
          Refund requests should include the customer or business name, invoice or transaction reference, the
          payment date and the reason for the request. Do not email complete card details or passwords.
        </p>
        <p>
          Once approved, we will initiate the refund to the original payment method where possible, normally
          within seven business days. Banks and payment providers may take additional time to reflect the funds.
        </p>
        <ContactDetails />
      </>
    ),
  },
];

// Website clients' common questions after launch. Prices match the pricing on /web-design
// (web-design-light/WebDesignLight.tsx): change both together.
const CLIENT_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const Question = ({ question, children }: { question: string; children: ReactNode }) => (
  <div className="space-y-3">
    <h3 className="text-lg font-bold text-neutral-950">{question}</h3>
    {children}
  </div>
);

const websiteFaqSections: LegalSection[] = [
  {
    title: '1. Changes after your website is live',
    content: (
      <>
        <Question question="Can I still ask for changes after launch?">
          <p>
            Yes. Your hosting and management includes <strong>1 hour of changes every month</strong>. That covers
            the everyday updates most businesses need, such as:
          </p>
          <ul>
            <li>updating wording, prices, services or service areas;</li>
            <li>swapping or adding photos of your work;</li>
            <li>changing phone numbers, email addresses or business hours; and</li>
            <li>adding a new review, project or special offer.</li>
          </ul>
        </Question>
        <Question question="What counts as a bigger change?">
          <p>
            Work that goes beyond the monthly hour, such as a redesign, several new pages, or new features like
            online bookings or a shop. We always quote bigger changes first and only start once you have said
            yes, so there are no surprise invoices.
          </p>
        </Question>
        <Question question="How do I ask for a change?">
          <p>
            Send us a <a href={CLIENT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp on +27 83 233 6716</a>{' '}
            with what you would like changed and on which page. Screenshots and photos help. We will confirm when
            it is done, or send a quote first if it is a bigger job.
          </p>
        </Question>
      </>
    ),
  },
  {
    title: '2. Editing your website yourself',
    content: (
      <>
        <Question question="Can I make changes to the website myself?">
          <p>
            Yes. You can make basic changes yourself, such as wording and images. To log in, go to{' '}
            <strong>yourbusiness.co.za/admin</strong> (using your own domain name).
          </p>
          <p>
            We send your login details to you privately on WhatsApp. Keep them safe and do not share them. We
            will never ask you to send us your password by email.
          </p>
        </Question>
        <Question question="What if I make a mistake?">
          <p>
            The editor is set up for content changes such as wording and images, not the design or layout. If
            something does not look right after an edit, WhatsApp us and we will sort it out. If you would rather
            not edit it yourself, just send us the change and we will do it within your monthly hour.
          </p>
        </Question>
      </>
    ),
  },
  {
    title: '3. Ownership, your domain and Google tools',
    content: (
      <>
        <Question question="Do I own my domain name?">
          <p>
            Yes. Your domain name (for example <strong>yourbusiness.co.za</strong>) belongs to your business. We
            register and manage it for you as part of hosting and management so that it stays renewed and
            connected to your website.
          </p>
        </Question>
        <Question question="When does the website become mine?">
          <ul>
            <li>
              <strong>Bought outright (R9,900):</strong> the website is yours from launch.
            </li>
            <li>
              <strong>Rent to own (R450/month):</strong> the website is yours after your 24th monthly payment.
            </li>
            <li>
              <strong>Free with our marketing plan:</strong> the website is yours once you have completed your
              12-month commitment on Social Posting + Reviews. It stays yours even if you stop the marketing plan
              after that.
            </li>
          </ul>
          <p>The wording, photos and logo you give us always remain yours.</p>
        </Question>
        <Question question="Can I use Google Search Console, Google Analytics and similar tools?">
          <p>
            Yes. You are welcome to add your website to Google Search Console, Google Analytics or Google
            Business Profile. Send us the verification code Google gives you and we will install it, or ask us
            to set it up and add you as an owner. You keep full access to your own Google accounts.
          </p>
        </Question>
      </>
    ),
  },
  {
    title: '4. Hosting and management: what keeps your website working',
    content: (
      <>
        <Question question="Why is there a monthly hosting and management fee?">
          <p>
            Owning a website and keeping it working are two different things. A website is not a once-off
            brochure. It needs a home on the internet, a domain that never lapses, security that keeps up with new
            threats and someone who fixes things when they go wrong. Without that, websites quietly break: the
            domain expires, browsers start showing a “Not secure” warning, or the site goes offline. You usually
            only find out when the phone stops ringing.
          </p>
          <p>
            That is why <strong>every website we look after has a hosting and management fee</strong>, including
            websites that were bought outright. It is what keeps your website fast, safe and bringing in work.
          </p>
        </Question>
        <Question question="What do I get for R290/month?">
          <ul>
            <li>
              <strong>Domain renewal:</strong> we renew your domain name every year so it never lapses. A lapsed
              domain takes your website offline and someone else can register it.
            </li>
            <li>
              <strong>Fast, reliable hosting:</strong> your website loads quickly, especially on the phones most of
              your customers use.
            </li>
            <li>
              <strong>SSL certificate:</strong> the padlock in the address bar. Without it, browsers warn visitors
              that your site is not secure.
            </li>
            <li>
              <strong>Security and updates:</strong> we keep your website protected and up to date.
            </li>
            <li>
              <strong>Backups:</strong> if something goes wrong, we can restore your website.
            </li>
            <li>
              <strong>Real support:</strong> a person you can WhatsApp, not a ticket system.
            </li>
            <li>
              <strong>1 hour of changes every month:</strong> keep your prices, photos and services up to date
              without paying extra.
            </li>
          </ul>
          <p>
            That is less than R10 a day. A single job won through your website usually covers it many times over.
          </p>
        </Question>
        <Question question="When do I pay the R290/month fee?">
          <ul>
            <li>
              <strong>Bought outright:</strong> from launch.
            </li>
            <li>
              <strong>Rent to own:</strong> hosting and management is included in your R450/month. After your 24th
              payment the website is yours and you move to the lower R290/month fee.
            </li>
            <li>
              <strong>Free with our marketing plan:</strong> hosting and management is included while you are on
              Social Posting + Reviews. If you stop the marketing plan after your 12-month commitment, the website
              is yours and you move to R290/month.
            </li>
          </ul>
        </Question>
      </>
    ),
  },
  {
    title: '5. Email',
    content: (
      <Question question="Do you host my business email?">
        <p>
          No, and that is on purpose. Email is too important to your business to bundle with website hosting. We
          recommend a dedicated email provider, so your email stays reliable, backed up and working even if
          anything changes with your website. You can still use an address on your own domain, such as{' '}
          <strong>info@yourbusiness.co.za</strong>.
        </p>
        <p>We are happy to point you in the right direction and help you choose a provider that suits you.</p>
      </Question>
    ),
  },
  {
    title: '6. Moving your website or leaving',
    content: (
      <>
        <Question question="Can I host my website somewhere else?">
          <p>
            Yes. Once the website is yours, let us know and we will transfer your domain name to you and help with
            the move. Your monthly fee stops at the end of the current paid month, as explained in our{' '}
            <Link to="/refunds-cancellations">Refund and Cancellation Policy</Link>.
          </p>
        </Question>
        <Question question="What if I cancel before the website is mine?">
          <p>
            If you cancel a rent-to-own agreement or the marketing plan before the end of the term, the fixed-term
            cancellation terms in our <Link to="/refunds-cancellations">Refund and Cancellation Policy</Link>{' '}
            apply.
          </p>
        </Question>
        <Question question="I signed up under an earlier offer. Which terms apply?">
          <p>
            If your quote or agreement says something different from this page, the terms in your written
            agreement apply.
          </p>
        </Question>
      </>
    ),
  },
  {
    title: '7. The fine print',
    content: (
      <p>
        This page explains our standard website terms in plain language. It forms part of our{' '}
        <Link to="/terms">Terms and Conditions</Link> and{' '}
        <Link to="/refunds-cancellations">Refund and Cancellation Policy</Link>. If you have a question that is not
        answered here, <a href={CLIENT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp us</a> or
        email <a href="mailto:hello@localpros.co.za">hello@localpros.co.za</a>.
      </p>
    ),
  },
];

export const TermsPage = () => (
  <LegalPage
    eyebrow="Legal"
    title="Terms and Conditions"
    introduction="The general terms that apply when Local Pros Studio supplies digital services directly to your business."
    sections={termsSections}
  />
);

export const PrivacyPage = () => (
  <LegalPage
    eyebrow="Privacy"
    title="Privacy Policy"
    introduction="How Local Biz (Pty) Ltd trading as Local Pros Studio collects, uses and protects personal information."
    sections={privacySections}
  />
);

export const RefundsCancellationsPage = () => (
  <LegalPage
    eyebrow="Billing"
    title="Refund and Cancellation Policy"
    introduction="How to cancel a service, when a refund may apply, and how recurring and fixed-term billing are handled."
    sections={refundSections}
  />
);


export const WebsiteFaqPage = () => (
  <LegalPage
    eyebrow="Website clients"
    title="Website Terms and FAQ"
    introduction="Plain answers to the questions website clients ask us most: changes, editing your site, ownership, your domain, hosting and email."
    sections={websiteFaqSections}
    effectiveDate="2 October 2026"
  />
);

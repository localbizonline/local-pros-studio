import { ChevronDown } from 'lucide-react';
import { whatsAppUrlForPath } from '../../whatsapp';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
// Workshop scenes come from the approved ReachMax page. Image record:
// ReachMax/research/design/2026-11-17-car-service-reminders/IMAGES.md.
import ownerSmall from './owner-640.webp';
import ownerLarge from './owner-1024.webp';
import emptyBay from './empty-bay.webp';
import frontDesk from './front-desk.webp';
import customer from './customer.webp';

const whatsAppUrl = whatsAppUrlForPath('/car-service-reminders');

const workshopProblems = [
  {
    image: emptyBay,
    alt: 'An empty car lift in a quiet workshop',
    title: 'Quiet days in the workshop',
    body: 'Some weeks your bays are full. In quiet weeks, customers you serviced last year may already be due again.',
  },
  {
    image: frontDesk,
    alt: 'A workshop receptionist on the phone with a diary open',
    title: 'No time to phone everyone',
    body: 'Following up with past customers slips down the list when the service desk gets busy.',
  },
  {
    image: customer,
    alt: 'A driver checks a message beside her car',
    title: 'Customers forget the date',
    body: 'A reminder from your workshop gives them an easy way to come back to you.',
  },
];

const steps = [
  {
    title: 'Remind customers when their service is due',
    body: 'Your workshop sends a WhatsApp automatically, based on the service dates you give us.',
  },
  {
    title: 'Let customers book in WhatsApp',
    body: 'They tap to book and choose a day. If they have a question, it goes to your service desk.',
  },
  {
    title: 'Remind them about their booking',
    body: 'Send a message the day before so they know when to bring the car in.',
  },
];

const questions = [
  {
    question: 'Will it work with my workshop diary?',
    answer: 'With a connected diary, customers can book an available time. Your team can also confirm requests on WhatsApp.',
  },
  {
    question: 'Who replies when a customer has a question?',
    answer: 'Your service desk gets the reply. Messages go out in your workshop’s name, and customers can ask questions in the same chat.',
  },
  {
    question: 'Can I remind customers who haven’t booked yet?',
    answer: 'Yes. We can set one follow-up for customers who haven’t acted on the first reminder.',
  },
  {
    question: 'Do my customers need to agree to get reminders?',
    answer: 'Yes. We can help you ask when they book or collect their car so you know who wants reminders on WhatsApp.',
  },
  {
    question: 'What does it cost?',
    answer: 'We quote before we start. The price depends on how many customers you want to remind and how we set up bookings.',
  },
];

function WhatsAppButton() {
  return (
    <a className="dd-btn dd-btn-primary" href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
      WhatsApp us
    </a>
  );
}

export default function CarServiceReminders() {
  return (
    <>
      <SiteHeader whatsAppUrl={whatsAppUrl} />
      <div className="dd dd-a csr">
        <section className="dd-hero" aria-labelledby="car-service-title">
          <div className="dd-container dd-hero-grid">
            <div>
              <h1 className="dd-display" id="car-service-title">WhatsApp <span className="dd-hl">car service reminders</span> for workshops</h1>
              <p className="dd-lede">
                Bring past customers back for their next service. We set up automatic reminders so they can book from the message.
              </p>
              <div className="dd-actions"><WhatsAppButton /></div>
            </div>
            <div className="dd-hero-media">
              <img
                src={ownerLarge}
                srcSet={`${ownerSmall} 640w, ${ownerLarge} 1024w`}
                sizes="(max-width: 820px) calc(100vw - 40px), (max-width: 1200px) 43vw, 520px"
                alt="A workshop owner checking his phone beside the service bays"
                width={1024}
                height={768}
              />
            </div>
          </div>
        </section>

        <section className="dd-sec csr-problems" aria-labelledby="car-service-problems">
          <div className="dd-container">
            <div className="dd-head">
              <h2 className="dd-h2" id="car-service-problems">Remind customers when their cars are due</h2>
            </div>
            <ul className="csr-pain-list">
              {workshopProblems.map(({ image, alt, title, body }) => (
                <li key={title}>
                  <img src={image} alt={alt} width={560} height={420} loading="lazy" decoding="async" />
                  <h3 className="dd-h3">{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="dd-sec dd-demo" aria-labelledby="car-service-how">
          <div className="dd-container">
            <div className="dd-head">
              <h2 className="dd-h2" id="car-service-how">From a service reminder to a booking</h2>
            </div>
            <div className="dd-demo-grid csr-demo-grid">
              <figure className="csr-chat">
                <figcaption>
                  <strong>Example Workshop</strong>
                  <span>WhatsApp conversation</span>
                </figcaption>
                <ol aria-label="Example service booking">
                  <li>
                    <p><strong>Workshop</strong>Hi Sam, your Polo is due for its service. Tap to book a day.</p>
                    <span className="csr-book-option">Book my service</span>
                  </li>
                  <li className="csr-reply">
                    <p><strong>Sam</strong>Can I bring it in on Thursday morning?</p>
                  </li>
                  <li>
                    <p><strong>Workshop</strong>You’re booked for Thursday at 08:00. See you then.</p>
                  </li>
                </ol>
              </figure>
              <ol className="dd-steps" aria-label="How service reminders work">
                {steps.map(({ title, body }, index) => (
                  <li key={title} className="is-active">
                    <span className="dd-step-num" aria-hidden="true">{index + 1}</span>
                    <div><h3 className="dd-h3">{title}</h3><p>{body}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="dd-sec csr-setup" aria-labelledby="car-service-setup">
          <div className="dd-container">
            <div className="csr-narrow">
              <h2 className="dd-h2" id="car-service-setup">Start with your service records</h2>
              <p>For independent workshops, service centres and dealership service departments in South Africa. We need customer names, cell numbers and the date of each car’s last service.</p>
              <p>Use a spreadsheet, an invoice list or your workshop software. We set up the reminders with ReachMax.</p>
              <p>ReachMax is run by the team behind Local Pros.</p>
            </div>
          </div>
        </section>

        <section className="dd-sec" aria-labelledby="car-service-questions">
          <div className="dd-container">
            <div className="dd-head">
              <h2 className="dd-h2" id="car-service-questions">Questions about service reminders</h2>
            </div>
            <div className="dd-faq-list">
              {questions.map(({ question, answer }) => (
                <details key={question} className="dd-faq-item">
                  <summary className="csr-question">
                    {question}<ChevronDown size={20} aria-hidden="true" />
                  </summary>
                  <div className="dd-faq-a"><p>{answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="dd-sec dd-closing" aria-labelledby="car-service-contact">
          <div className="dd-container dd-closing-in">
            <h2 className="dd-h2" id="car-service-contact">See how it would work for your workshop</h2>
            <p className="dd-sub">Tell us how you take bookings. We’ll show you what your customers would see.</p>
            <WhatsAppButton />
          </div>
        </section>
      </div>
      <SiteFooter faqHref="#car-service-questions" whatsAppUrl={whatsAppUrl} />
    </>
  );
}

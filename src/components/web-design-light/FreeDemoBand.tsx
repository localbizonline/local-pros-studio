import DemoSearchBox from './DemoSearchBox';

// "Get a free demo of your new website" (8 Oct 2026): the Google search box that opens the site chat ready to
// type in, with the floating pointer (version C, picked over a plain band and a WhatsApp preview; first titled
// "See your new website before you pay", but Jeremy did not want the stress on paying). After How it works,
// as a second chance for visitors who scrolled past the same box in the opening section.

const TITLE = 'Get a free demo of your new website';
const LINE = 'Find your business on Google in our chat. We build a demo from your listing, with your name, services and reviews, and send it to you on WhatsApp.';
const SMALL = 'A real person replies on WhatsApp.';

export default function FreeDemoBand({ onOpen }: { onOpen?: () => void }) {
  return (
    <section className="dd-sec fd fd-c">
      <div className="dd-container">
        <div className="dd-head fd-head">
          <p className="dd-eyebrow">Free demo</p>
          <h2 className="dd-h2">{TITLE}</h2>
          <p className="dd-sub">{LINE}</p>
        </div>
        <DemoSearchBox onOpen={onOpen} />
        <p className="fd-small fd-small-c">{SMALL}</p>
      </div>
    </section>
  );
}

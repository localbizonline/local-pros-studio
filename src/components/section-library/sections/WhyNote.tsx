import '../../design-directions/directions.css';
import './whynote.css';

// "Why we look after all three" (Jeremy, 9 Oct 2026): why it's one package, said the way you'd say it to someone,
// after the price section. First written for /pricing, then put on the homepage too. Change it here only.

export default function WhyNote() {
  return (
    <section className="dd dd-a dd-sec wn" id="why">
      <div className="dd-container wn-in">
        <h2 className="dd-h2 wn-title">Why we look after all three</h2>
        <p>
          Think about the last time you needed someone you could trust, like a plumber or a vet. You probably Googled a
          few, read their reviews, looked at their Facebook page and opened their website.
        </p>
        <p>
          Your customers do the same with you. If one of those looks quiet or out of date, they move on to the next
          business.
        </p>
        <p className="wn-end">That’s why we do all three, for one monthly price.</p>
      </div>
    </section>
  );
}

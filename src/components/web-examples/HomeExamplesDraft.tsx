import JoinLight from '../join-light/JoinLight';
import ExamplesChat from './ExamplesChat';

// Homepage draft with the examples pop-up (12 Oct 2026, /review-versions/home-examples): the live homepage as it
// is, hero and "Get a free check-up" button unchanged, plus the Cosmo Pools style pop-up that opens the shared
// examples chat (variant "home": reviews, posts or a website, "our work" wording). Handed over by the homepage
// session. Going live means adding <ExamplesChat variant="home" /> to JoinLight and web-examples.css to
// join-light/styles.ts (the build checks the homepage's stylesheets).
export default function HomeExamplesDraft() {
  return (
    <>
      <JoinLight />
      <ExamplesChat variant="home" />
    </>
  );
}

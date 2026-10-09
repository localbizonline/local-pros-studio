import BusinessSearchBox from '../demo-popup/BusinessSearchBox';

// The website page's free demo search box (8 Oct 2026; a real Google search since 9 Oct 2026): picking their
// business opens the site chat with the free demo offer. Used in the free demo band and the opening section.
// The box itself is shared with the homepage: ../demo-popup/BusinessSearchBox.tsx.
export default function DemoSearchBox({ onOpen, note = "Try it, it's free!" }: { onOpen?: () => void; note?: string }) {
  return <BusinessSearchBox page="web-design" buttonLabel="Find my business" note={note} onOpen={onOpen} />;
}

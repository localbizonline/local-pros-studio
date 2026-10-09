// Every stylesheet the homepage uses. App.tsx loads this with the site's main stylesheet, because the
// pre-built homepage HTML links only that one: otherwise the homepage, whose code now loads separately,
// would show unstyled for a moment (9 Oct 2026). Adding a section with its own CSS file to the homepage?
// Add it here too; the build stops with a message if one is missing (scripts/prerender.mjs).
import './joinlight.css';
import '../design-directions/directions.css';
import '../section-library/sections/herothreeservices.css';
import '../section-library/sections/servicerows.css';
import '../section-library/sections/fitcheck.css';
import '../section-library/sections/proofsection.css';
import '../section-library/sections/proofblocks.css';
import '../section-library/sections/sitechrome.css';
import '../section-library/sections/pricing.css';
import '../section-library/sections/whynote.css';
import '../demo-popup/business-search-box.css';
import '../section-library/sections/reputationstory.css';
import '../section-library/sections/closingcard.css';

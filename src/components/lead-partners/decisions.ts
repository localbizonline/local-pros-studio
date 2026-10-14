// Everything on /lead-partners that is not decided yet, in one place (14 Oct 2026).
// While `value` is null the page shows the note on a yellow "To confirm:" highlight, so it's easy to spot
// what's missing. To fill one in, type the final wording as `value`; the highlight disappears.
// `flag` entries are written copy that needs checking before it goes out: `value` holds the copy as written,
// still shown with the highlight. Set `flag` to false (or replace `value`) once it's checked.

export type Decision = { note: string; value: string | null; flag?: boolean };

export const DECISIONS = {
  switchDate: { note: 'switch date, e.g. 1 December 2026', value: null },
  replyByDate: { note: 'reply-by date, e.g. 21 November', value: null },
  setupWeek: { note: 'setup week', value: null },

  leadVolumeWording: {
    note: 'confirm wording on lead volume. Safer version: “The leads you get through us keep coming to you, as they do now.”',
    value: null,
  },
  commitment: { note: 'confirm 6 / 12 months for lead partners.', value: null },
  guarantee: { note: 'does the 30-day guarantee apply to this package?', value: null },
  billing: { note: 'how and when they’re billed, and from which date.', value: null },

  howManyLeads: {
    note: 'answer. Suggested: “The same as you get now. We can’t promise a set number, because it depends on how many customers come through Local Pros in your area, but nothing about how leads reach you is changing.”',
    value: null,
  },
  leadCredits: { note: 'refunded, used up first, or carried over?', value: null },
  leadsOnTheirOwn: { note: 'answer.', value: null },
  websiteIfTheyStop: { note: 'what happens to a website we built if they stop before 12 months.', value: null },
  cancellation: { note: 'cancellation terms.', value: null },
  guaranteeFaq: { note: 'see the money section.', value: null },
  payFaq: { note: 'see the money section.', value: null },
  missedReplyBy: { note: 'answer.', value: null },

  // The site's no-gating rule (DESIGN-SYSTEM.md section 6, claude.md): never say unhappy customers are kept
  // away from Google. Allowed: "If something went wrong, they can reply and you hear about it straight away."
  gatingReviews: {
    note: 'this line says unhappy customers are kept from Google (review gating), which Google doesn’t allow and the site’s copy rules rule out. Allowed: “If something went wrong, they can reply and you hear about it straight away.”',
    value: 'If someone’s unhappy, it comes to you privately first, so you can sort it out before it ever reaches Google.',
    flag: true,
  },
  gatingFaq: {
    note: 'same review-gating concern as above. Allowed: “If something went wrong, they can reply and you hear about it straight away.”',
    value: 'If someone’s unhappy, you hear about it privately first.',
    flag: true,
  },
} satisfies Record<string, Decision>;

export type DecisionKey = keyof typeof DECISIONS;

// Everything on /lead-partners that is not decided yet, in one place (14 Oct 2026).
// While `value` is null the page shows the note on a yellow "To confirm:" highlight, so it's easy to spot
// what's missing. To fill one in, type the final wording as `value`; the highlight disappears.
// `flag: true` marks written copy that needs checking before it goes out: `value` holds the copy as written,
// still shown with the highlight. Set `flag` to false (or replace `value`) once it's checked.

export type Decision = { note: string; value: string | null; flag?: boolean };

export const DECISIONS = {
  leadVolumeWording: {
    note: 'confirm wording on lead volume. Safer version: “The leads you get through us keep coming to you, as they do now.”',
    value: null,
  },
  commitment: { note: 'confirm 6 / 12 months for lead partners.', value: null },
  guarantee: { note: 'does the 30-day guarantee apply to this package?', value: null },

  howManyLeads: {
    note: 'answer. Suggested: “The same as you get now. We can’t promise a set number, because it depends on how many customers come through Local Pros in your area, but nothing about how leads reach you is changing.”',
    value: null,
  },
  leadCredits: { note: 'refunded, used up first, or carried over?', value: null },
  websiteIfTheyStop: { note: 'what happens to a website we built if they stop before 12 months.', value: null },
  cancellation: { note: 'cancellation terms.', value: null },
  guaranteeFaq: { note: 'see the money section.', value: null },
  payFaq: { note: 'payment method (debit order, card, EFT).', value: null },
} satisfies Record<string, Decision>;

export type DecisionKey = keyof typeof DECISIONS;

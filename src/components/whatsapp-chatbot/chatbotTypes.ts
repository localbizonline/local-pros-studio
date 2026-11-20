// Types of business for /whatsapp-chatbot, picked with ?type=<key>. The Local Pros WhatsApp bot
// sends customers here after they tap "Tell me more" on its sign-off message (plan, 20 Nov 2026:
// https://claude.ai/artifact/UwBrT9vpmCxjm7Wb396XDT). The idea lines match the table Jeremy is
// approving in the proposal doc, so the page repeats what the customer saw in the chat.
// Lines say what the chatbot can do, never results. No prices: we quote first.

export type ChatLine = { from: 'org' | 'customer'; text: string; button?: string };

export type ChatbotType = {
  // Who it is, after "A WhatsApp chatbot for…" and in "For your church, it could…"
  org: string;
  // Group name for the "works well for" list
  group: string;
  // The problem line under the headline, in customers or money
  problem: string;
  ideas: { title: string; body: string }[];
  // Name shown at the top of the example chat
  chatName: string;
  chat: ChatLine[];
};

export const CHATBOT_TYPES: Record<string, ChatbotType> = {
  business: {
    org: 'your business',
    group: 'Any business',
    problem: 'Quotes go cold, customers forget bookings and the same questions take up your day.',
    ideas: [
      { title: 'Follow up every quote', body: 'A friendly WhatsApp a few days after you quote, so fewer quotes go cold.' },
      { title: 'Fewer no-shows', body: 'Remind customers of their booking the day before. They can confirm or move it in the chat.' },
      { title: 'Answer common questions any time', body: 'Hours, prices, areas you cover. The chat answers and passes anything else to your team.' },
    ],
    chatName: 'Your business',
    chat: [
      { from: 'org', text: 'Hi Lerato, just checking you got our quote for the kitchen. Any questions?', button: 'Accept the quote' },
      { from: 'customer', text: 'Yes, looks good. Can you start next week?' },
      { from: 'org', text: 'We can start Tuesday at 08:00. I’ve booked you in.' },
    ],
  },
  trade: {
    org: 'your business',
    group: 'Trades and contractors',
    problem: 'Quotes go cold while you’re on site, and past customers forget when their service is due.',
    ideas: [
      { title: 'Follow up every quote', body: 'A WhatsApp a few days after you quote, so fewer go cold while you’re busy on site.' },
      { title: 'Yearly service reminders', body: 'Remind past customers when their service is due and let them book in the chat.' },
      { title: 'Reply to new enquiries fast', body: 'New enquiries get an answer straight away, even while you’re on a job.' },
    ],
    chatName: 'Your business',
    chat: [
      { from: 'org', text: 'Hi Sipho, your geyser is due for its yearly service. Tap to book a day.', button: 'Book my service' },
      { from: 'customer', text: 'Thursday morning works.' },
      { from: 'org', text: 'You’re booked for Thursday at 08:00. We’ll remind you the day before.' },
    ],
  },
  security: {
    org: 'your security company',
    group: 'Security and alarm companies',
    problem: 'New enquiries wait while your team is out on call-outs, and annual services slip.',
    ideas: [
      { title: 'Reply to enquiries instantly', body: 'New enquiries get an answer straight away, even while your team is out on call-outs.' },
      { title: 'Annual service reminders', body: 'Remind customers when their annual service is due and book it in the chat.' },
      { title: 'Hand over to a person', body: 'Anything urgent goes straight to your control room or office.' },
    ],
    chatName: 'Your security company',
    chat: [
      { from: 'org', text: 'Hi Mrs Naidoo, your alarm system is due for its annual service. Tap to book.', button: 'Book a service' },
      { from: 'customer', text: 'Can you come Saturday?' },
      { from: 'org', text: 'Saturday between 09:00 and 12:00 is booked. See you then.' },
    ],
  },
  bodycorp: {
    org: 'your complex',
    group: 'Body corporates, estates and complexes',
    problem: 'Levy reminders, maintenance notices and repair reports all land on one person.',
    ideas: [
      { title: 'Levy reminders', body: 'Send levy reminders to every owner in one go, with the payment details.' },
      { title: 'Maintenance updates', body: 'Tell every resident about water shut-offs or work on site, in one message.' },
      { title: 'Repair reports with photos', body: 'Residents report a problem with their unit number and a photo, ready for the contractor.' },
    ],
    chatName: 'Your complex',
    chat: [
      { from: 'org', text: 'Hi Thabo, the water will be off on Tuesday from 09:00 to 13:00 for pipe repairs.' },
      { from: 'customer', text: 'Thanks. Also, the gate at block C is sticking.' },
      { from: 'org', text: 'Got it. Please send a photo and your unit number and we’ll pass it to the contractor.' },
    ],
  },
  property: {
    org: 'your agency',
    group: 'Property agents and letting managers',
    problem: 'Enquiries go to whoever answers first, and rent reminders and repairs eat the day.',
    ideas: [
      { title: 'Book viewings in the chat', body: 'Reply to property enquiries straight away and book the viewing in the chat.' },
      { title: 'Rent reminders', body: 'Send tenants a reminder before rent is due.' },
      { title: 'Repair reports with photos', body: 'Tenants report repairs with a photo, so you can send the right contractor.' },
    ],
    chatName: 'Your agency',
    chat: [
      { from: 'customer', text: 'Hi, is the 2-bed in Bryanston still available?' },
      { from: 'org', text: 'Yes it is. Would you like to view it? Pick a time.', button: 'Book a viewing' },
      { from: 'org', text: 'You’re booked for Saturday at 10:00. The agent will meet you at the gate.' },
    ],
  },
  church: {
    org: 'your church',
    group: 'Churches, NPOs and associations',
    problem: 'Reminders, notices and member questions all go out by hand, one message at a time.',
    ideas: [
      { title: 'Service and event reminders', body: 'Remind members about services and events, and share giving and donation links.' },
      { title: 'Member questions', body: 'Answer membership and renewal questions without anyone typing.' },
      { title: 'Notices to everyone', body: 'Send one notice to every member who asked to hear from you.' },
    ],
    chatName: 'Your church',
    chat: [
      { from: 'org', text: 'Hi John, a reminder that the family service is on Sunday at 09:00. Will you join us?', button: 'I’ll be there' },
      { from: 'customer', text: 'Yes, and how do I give online?' },
      { from: 'org', text: 'Here’s our giving link. Thank you for your support.' },
    ],
  },
  school: {
    org: 'your school',
    group: 'Schools, crèches and colleges',
    problem: 'Fee reminders, event notices and admissions questions keep the office busy.',
    ideas: [
      { title: 'Fee reminders', body: 'Send parents fee reminders and event updates automatically.' },
      { title: 'Admissions enquiries', body: 'Answer admissions questions and guide parents through applying.' },
      { title: 'Notices to parents', body: 'Send a notice to every parent in one go.' },
    ],
    chatName: 'Your school',
    chat: [
      { from: 'org', text: 'Hi Mrs Dlamini, a reminder that term fees are due on the 7th. Tap for the payment details.', button: 'Payment details' },
      { from: 'customer', text: 'Thanks. When is the sports day?' },
      { from: 'org', text: 'Sports day is Friday 14 March from 08:00.' },
    ],
  },
  club: {
    org: 'your club',
    group: 'Studios, gyms and sports clubs',
    problem: 'Fees run late, class spots go empty and trial bookings slip through.',
    ideas: [
      { title: 'Fee reminders', body: 'Remind members or parents when fees are due.' },
      { title: 'Fill empty class spots', body: 'Tell members when a spot opens so classes stay full.' },
      { title: 'Trial class bookings', body: 'Take trial bookings in the chat and remind people the day before.' },
    ],
    chatName: 'Your club',
    chat: [
      { from: 'customer', text: 'Hi, can my daughter try a class?' },
      { from: 'org', text: 'Of course. Pick a trial class below.', button: 'Book a trial class' },
      { from: 'org', text: 'She’s booked for Wednesday at 15:30. We’ll remind you the day before.' },
    ],
  },
  salon: {
    org: 'your salon',
    group: 'Salons, spas and wellness',
    problem: 'Bookings come in at all hours, clients forget appointments and don’t rebook.',
    ideas: [
      { title: 'Bookings in the chat', body: 'Clients book their appointment on WhatsApp, any time of day.' },
      { title: 'Reminders the day before', body: 'Fewer missed appointments, with an easy way to move the booking.' },
      { title: 'Prompt clients to rebook', body: 'A friendly WhatsApp when it’s time for their next visit.' },
    ],
    chatName: 'Your salon',
    chat: [
      { from: 'org', text: 'Hi Zanele, it’s been six weeks since your last visit. Shall we book you in?', button: 'Book now' },
      { from: 'customer', text: 'Yes please, Friday afternoon.' },
      { from: 'org', text: 'You’re booked for Friday at 14:00. See you then.' },
    ],
  },
  medical: {
    org: 'your practice',
    group: 'Medical, dental and vet practices',
    problem: 'Missed appointments leave empty slots, and unpaid invoices need chasing.',
    ideas: [
      { title: 'Appointment reminders', body: 'Remind patients the day before, so a cancelled slot can be filled.' },
      { title: 'Invoice follow-ups', body: 'Follow up unpaid invoices politely, with the payment details.' },
      { title: 'No health details', body: 'Messages are about times and payments only, never about treatment.' },
    ],
    chatName: 'Your practice',
    chat: [
      { from: 'org', text: 'Hi Mr Smith, a reminder of your appointment tomorrow at 10:30.', button: 'Confirm' },
      { from: 'customer', text: 'I can’t make it, sorry. Can I move it?' },
      { from: 'org', text: 'No problem. Thursday at 11:00 is open. I’ve moved you.' },
    ],
  },
  professional: {
    org: 'your firm',
    group: 'Accounting, legal and professional firms',
    problem: 'Deadlines slip while you chase clients for documents, and invoices run late.',
    ideas: [
      { title: 'Chase missing documents', body: 'Remind clients for missing documents before deadlines.' },
      { title: 'Invoice reminders', body: 'Send invoice reminders with the payment details.' },
      { title: 'Common questions', body: 'Answer the usual questions and pass the rest to the right person.' },
    ],
    chatName: 'Your firm',
    chat: [
      { from: 'org', text: 'Hi Anri, we still need your IRP5 for your tax return. You can send a photo here.' },
      { from: 'customer', text: 'Here it is.' },
      { from: 'org', text: 'Thanks, received. We’ll let you know when your return is filed.' },
    ],
  },
  shop: {
    org: 'your shop',
    group: 'Shops and online stores',
    problem: 'Shoppers leave items in their cart, and past customers never hear about specials.',
    ideas: [
      { title: 'Cart reminders', body: 'Remind shoppers who left items in their cart, with a link back.' },
      { title: 'Specials to opted-in customers', body: 'Send specials to customers who asked to hear from you.' },
      { title: 'Order questions', body: 'Answer “where is my order?” without anyone typing.' },
    ],
    chatName: 'Your shop',
    chat: [
      { from: 'org', text: 'Hi Kim, you left the garden chairs in your cart. They’re still in stock.', button: 'Finish my order' },
      { from: 'customer', text: 'Do you deliver to Paarl?' },
      { from: 'org', text: 'Yes, delivery to Paarl takes 2 to 3 working days.' },
    ],
  },
  hospitality: {
    org: 'your venue',
    group: 'Restaurants, guesthouses and venues',
    problem: 'Booking questions come in at all hours, and guests arrive without the details.',
    ideas: [
      { title: 'Group bookings', body: 'Take group bookings in the chat, any time of day.' },
      { title: 'Arrival details', body: 'Send directions, check-in times and extras before the visit.' },
      { title: 'Common questions', body: 'Menus, parking and opening hours, answered straight away.' },
    ],
    chatName: 'Your venue',
    chat: [
      { from: 'customer', text: 'Hi, do you have a table for 12 on Saturday night?' },
      { from: 'org', text: 'We do. 18:30 or 19:30?', button: 'Book 19:30' },
      { from: 'org', text: 'Booked for 12 at 19:30. We’ll send directions on Saturday morning.' },
    ],
  },
  workshop: {
    org: 'your workshop',
    group: 'Car workshops and dealers',
    problem: 'Past customers forget when their service is due, and quiet weeks leave bays empty.',
    ideas: [
      { title: 'Service reminders', body: 'Remind customers when their service is due and let them book in the chat.' },
      { title: 'Booking reminders', body: 'A message the day before, so they know when to bring the car in.' },
      { title: 'Car ready updates', body: 'Tell customers when their car is ready to collect.' },
    ],
    chatName: 'Your workshop',
    chat: [
      { from: 'org', text: 'Hi Sam, your Polo is due for its service. Tap to book a day.', button: 'Book my service' },
      { from: 'customer', text: 'Can I bring it in on Thursday morning?' },
      { from: 'org', text: 'You’re booked for Thursday at 08:00. See you then.' },
    ],
  },
  supplier: {
    org: 'your business',
    group: 'Suppliers and manufacturers',
    problem: 'Quote requests arrive half complete, so you go back and forth before you can price.',
    ideas: [
      { title: 'Complete quote requests', body: 'Take quote and parts requests with quantities and photos, ready to quote first time.' },
      { title: 'Follow up quotes', body: 'A WhatsApp a few days later, so fewer quotes go cold.' },
      { title: 'Order updates', body: 'Tell customers when their order is ready or on its way.' },
    ],
    chatName: 'Your business',
    chat: [
      { from: 'customer', text: 'Hi, I need a price on 40 steel brackets.' },
      { from: 'org', text: 'Sure. Please send the size and a photo or drawing, and your delivery area.' },
      { from: 'org', text: 'Thanks, that’s everything we need. Your quote will come through today.' },
    ],
  },
};

export const DEFAULT_TYPE = 'business';

export const chatbotType = (key: string | null | undefined) =>
  (key && CHATBOT_TYPES[key]) || CHATBOT_TYPES[DEFAULT_TYPE];

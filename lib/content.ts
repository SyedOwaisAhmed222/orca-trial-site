/**
 * Every string on the site lives here so copy edits never require
 * touching a component. Sourced from the existing orcatrial.net.
 */

export const site = {
  name: 'Orca Trial',
  tagline: 'A comprehensive approach to medical trials and studies',
  url: 'https://orcatrial.net',
  email: 'info@orcatrial.net',
  phone: '+1 (786) 808-1989',
  phoneHref: '+17868081989',
  address: '1931 Cordova Rd, Unit #2122, Fort Lauderdale, FL 33316',
  hours: 'Mon–Fri · 6am–10pm ET',
} as const

export const nav = [
  { label: 'Why Orca', href: '#why' },
  { label: 'Sponsors / CROs', href: '#sponsors' },
  { label: 'Site Network', href: '#network' },
  { label: 'Therapeutic Areas', href: '#areas' },
  { label: 'Contact', href: '#contact' },
] as const

export const stats = [
  { value: 360, suffix: '+', label: 'Research sites', sub: 'Across the United States' },
  { value: 1600, suffix: '+', label: 'Principal investigators', sub: 'Certified and trained' },
  { value: 12, suffix: '', label: 'Therapeutic areas', sub: 'Core competencies' },
  { value: 2, suffix: ' days', label: 'Contract turnaround', sub: 'Budget response SLA' },
] as const

/** Surfaced high on the page — these four objections kill most enquiries. */
export const guarantees = [
  { icon: 'shield', label: 'No hidden fees', sub: 'One budget, all costs covered' },
  { icon: 'spark', label: 'No exclusivity', sub: 'No long-term agreements' },
  { icon: 'check', label: 'Paid on enrollment', sub: 'We earn when your site does' },
  { icon: 'clock', label: '2-day responses', sub: 'Contract and budget turnaround' },
] as const

export const whyOrca = [
  {
    title: 'A network built for reach',
    body: 'Orca has a network of more than 360 sites and 1,600+ principal investigators, diversely located across the USA.',
    icon: 'network',
    span: 'lg:col-span-3',
  },
  {
    title: 'Startup services, no strings',
    body: 'Budgeting, contracting, receivable management and patient recruitment assistance — without any long-term or exclusive agreements.',
    icon: 'layers',
    span: 'lg:col-span-3',
  },
  {
    title: 'Paid only on enrollment',
    body: 'Orca Trial is compensated only if the site successfully enrolls patients. Our incentives are your incentives.',
    icon: 'shield',
    span: 'lg:col-span-2',
  },
  {
    title: 'Strategy before startup',
    body: 'Our team develops the identification and study-startup strategy that helps sponsors and CROs find the relevant investigators and sites to meet project timelines.',
    icon: 'compass',
    span: 'lg:col-span-4',
  },
] as const

export const audiences = [
  {
    key: 'sponsors',
    eyebrow: 'For sponsors',
    title: 'Everything under one contract',
    points: [
      'One step solution for study startup',
      'Risk-free business development for clinical sites',
      'Expedited study startup for sponsors and CROs',
    ],
  },
  {
    key: 'sites',
    eyebrow: 'For research sites',
    title: 'Studies without the overhead',
    points: [
      'Study availability through the year',
      'No additional fee from the site',
      'Hassle-free business development',
    ],
  },
] as const

export const businessModel = [
  {
    kicker: 'No hidden fee',
    title: 'One budget. No surprises.',
    body: 'At Orca, we do not charge any hidden fees along the process — not from our network, our sites, or sponsors and CROs. After negotiating a budget, our philosophy is to cover all costs incurred during the study. Orca believes in negotiating a single budget with our sponsors as well as our sites.',
  },
  {
    kicker: 'Risk-free development',
    title: 'Sites grow without exposure.',
    body: 'Orca receives payments from sponsors on behalf of the site and disburses them as soon as we receive them. There is no hidden fee in between. This allows research sites hassle-free business development while we handle all feedback on their behalf.',
  },
] as const

export const sponsorPillars = [
  {
    n: '01',
    title: 'Customized study support',
    body: 'With our wide range of research sites and understanding of core study areas, we match each sponsor with the most relevant sites — those with a proven core competency in that study area.',
  },
  {
    n: '02',
    title: 'Cost effectiveness',
    body: 'Orca negotiates a single budget and contract for multiple sites under one umbrella. That means expedited study startup and real cost savings for the study.',
  },
  {
    n: '03',
    title: 'Unified study administration',
    body: 'One point of contact for budget, contract and communication across a single study. A central point for the research network saves clients time and resources by streamlining information — with unique site identification and feasibility reports at an accelerated pace.',
  },
  {
    n: '04',
    title: 'Accelerated study start-up',
    body: 'A single contract with the sponsor for all Orca sites in a study. Contract and budget responses in two working days. Full transparency, start to finish.',
  },
] as const

export const networkPillars = [
  {
    title: 'Geographically dispersed research',
    body: 'Orca can carry a program across geographically dispersed areas of the United States, which ensures patient diversity and increases test scenarios.',
    icon: 'globe',
  },
  {
    title: 'Certified sites',
    body: 'All investigators and site personnel are fully trained and certified, and maintain uniform SOPs within their respective research topics.',
    icon: 'badge',
  },
] as const

export const therapeuticAreas = [
  { name: 'Gastroenterology', icon: 'gastro' },
  { name: 'Neurology', icon: 'neuro' },
  { name: 'Cardiology', icon: 'cardio' },
  { name: 'Rheumatology', icon: 'rheuma' },
  { name: 'Gynaecology', icon: 'gyn' },
  { name: 'Nephrology', icon: 'nephro' },
  { name: 'Diabetes', icon: 'diabetes' },
  { name: 'Internal Medicine', icon: 'internal' },
  { name: 'Endocrinology', icon: 'endo' },
  { name: 'Pediatrics', icon: 'peds' },
  { name: 'Oncology', icon: 'onco' },
  { name: 'Urology', icon: 'uro' },
] as const

export const processSteps = [
  { label: 'Feasibility', body: 'Site identification and feasibility reports at an accelerated pace.' },
  { label: 'Single budget', body: 'One negotiation covering every Orca site in the study.' },
  { label: 'One contract', body: 'A single master contract — responses in two working days.' },
  { label: 'Enrollment', body: 'Patient recruitment assistance across the network.' },
  { label: 'Disbursement', body: 'Sponsor payments passed to sites the moment they land.' },
] as const

export type TherapeuticArea = (typeof therapeuticAreas)[number]

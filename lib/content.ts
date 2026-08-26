/**
 * Every string on the site lives here so copy edits never require
 * touching a component. Sourced from the existing orcatrial.net.
 */

export const site = {
  name: 'Orca Trial',
  // Verbatim from the live site's hero.
  tagline: 'Orca focuses on the comprehensive way to approach medical trials and studies',
  intro:
    'At Orca, we provide a wide range of study startup, and financial services support in addition to lead generation. Orca focuses on medical trials matched to the capabilities of our independent network of sites.',
  url: 'https://orcatrial.net',
  email: 'info@orcatrial.net',
  phone: '+1 (786) 808-1989',
  phoneHref: '+17868081989',
  address: '1931 Cordova Rd, Unit #2122, Fort Lauderdale, FL 33316',
  hours: 'Mon–Fri: 6am–10pm',
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
  { value: 2, suffix: ' days', label: 'Contract responses', sub: 'Contract and budget, in working days' },
] as const

/** Four statements taken from the live site's own copy, surfaced early. */
export const guarantees = [
  { icon: 'shield', label: 'No hidden fees', sub: 'One budget, all costs covered' },
  { icon: 'spark', label: 'No exclusivity', sub: 'No long-term agreements' },
  { icon: 'check', label: 'Paid on enrollment', sub: 'Only if the site enrolls patients' },
  { icon: 'clock', label: '2 working days', sub: 'Contract and budget responses' },
] as const

export const whyOrca = [
  // Verbatim from "WHY CHOOSE ORCA" on the live site. These are statements,
  // not headed cards — the headings that were here were written during the
  // redesign and were never Orca's words.
  {
    body: 'Orca has a network of more than 360 sites and 1,600+ PIs diversely located across USA.',
    icon: 'network',
    span: 'lg:col-span-3',
  },
  {
    body: 'Orca offers a range of startup services including budgeting, contracting, receivable management and patient recruitment assistance, without any long term and exclusive agreements.',
    icon: 'layers',
    span: 'lg:col-span-3',
  },
  {
    body: 'Orca Trial is only compensated if the site successfully enrolls patients.',
    icon: 'shield',
    span: 'lg:col-span-2',
  },
  {
    body: 'Our team is working to develop strategy for identification and study startup which help sponsors and CROs to find relevant investigators / sites to meet their project time lines.',
    icon: 'compass',
    span: 'lg:col-span-4',
  },
] as const

export const audiences = [
  {
    key: 'sponsors',
    eyebrow: 'For sponsors',
    points: [
      'One step solution for study startup',
      'Risk-free business development for clinical sites',
      'Expedited study startup for sponsors and CROs',
    ],
  },
  {
    key: 'sites',
    eyebrow: 'For research sites',
    points: [
      'Study availability through the year',
      'No additional fee from the site',
      'Hassle-free business development',
    ],
  },
] as const

export const businessModel = [
  {
    title: 'No hidden fee',
    body: 'At Orca, we do not charge any hidden fees along the process — not from our network, our sites, or sponsors and CROs. After negotiating a budget, our philosophy is to cover all costs incurred during the study. Orca believes in negotiating a single budget with our sponsors as well as our sites.',
  },
  {
    title: 'Risk-free business development for site',
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
  // `image` files are the official illustrations from the live site
  // (wp-content/uploads/2022/11/Picture5-16.png), downloaded verbatim.
  { name: 'Gastroenterology', image: '/areas/gastroenterology.png' },
  { name: 'Neurology', image: '/areas/neurology.png' },
  { name: 'Cardiology', image: '/areas/cardiology.png' },
  { name: 'Rheumatology', image: '/areas/rheumatology.png' },
  { name: 'Gynaecology', image: '/areas/gynaecology.png' },
  { name: 'Nephrology', image: '/areas/nephrology.png' },
  { name: 'Diabetes', image: '/areas/diabetes.png' },
  { name: 'Internal Medicine', image: '/areas/internal-medicine.png' },
  { name: 'Endocrinology', image: '/areas/endocrinology.png' },
  { name: 'Pediatrics', image: '/areas/pediatrics.png' },
  { name: 'Oncology', image: '/areas/oncology.png' },
  { name: 'Urology', image: '/areas/urology.png' },
] as const

// Removed: a five-step process rail invented during the redesign. Orca has
// not published a step-by-step workflow, so the site must not assert one.

export type TherapeuticArea = (typeof therapeuticAreas)[number]

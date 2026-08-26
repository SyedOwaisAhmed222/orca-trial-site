/** @type {import('next').NextConfig} */
const staticExport = process.env.STATIC_EXPORT === '1'

const nextConfig = {
  reactStrictMode: true,
  // `npm run export` emits a plain-HTML `out/` folder for FTP / any static host.
  // The default build keeps the /api/register route working on Node or Vercel.
  // Route handlers cannot be statically exported, so `npm run export` runs
  // scripts/export-static.mjs, which hides app/api for the duration of the
  // build. Point the form at NEXT_PUBLIC_FORM_ENDPOINT instead (see README).
  ...(staticExport ? { output: 'export', images: { unoptimized: true } } : {}),
}

export default nextConfig

/** @type {import('next').NextConfig} */
const staticExport = process.env.STATIC_EXPORT === '1'

const nextConfig = {
  reactStrictMode: true,
  // Lets a verification build run without clobbering the .next directory a
  // `next dev` server is already using:  NEXT_DIST_DIR=.next-verify next build
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // `npm run export` emits a plain-HTML `out/` folder for FTP / any static host.
  // The default build keeps the /api/register route working on Node or Vercel.
  // Route handlers cannot be statically exported, so `npm run export` runs
  // scripts/export-static.mjs, which hides app/api for the duration of the
  // build. Point the form at NEXT_PUBLIC_FORM_ENDPOINT instead (see README).
  ...(staticExport ? { output: 'export', images: { unoptimized: true } } : {}),
}

export default nextConfig

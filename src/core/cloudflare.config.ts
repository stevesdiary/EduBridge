const {
  CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_R2_ACCESS_KEY_ID,
  CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  CLOUDFLARE_R2_BUCKET_NAME,
  CLOUDFLARE_PUBLIC_URL,
} = process.env

if (
  !CLOUDFLARE_ACCOUNT_ID ||
  !CLOUDFLARE_R2_ACCESS_KEY_ID ||
  !CLOUDFLARE_R2_SECRET_ACCESS_KEY ||
  !CLOUDFLARE_R2_BUCKET_NAME ||
  !CLOUDFLARE_PUBLIC_URL
) {
  throw new Error('Missing environment variables.')
}

const cloudflareAccountId: string = CLOUDFLARE_ACCOUNT_ID
const cloudflareR2AccessKeyId: string = CLOUDFLARE_R2_ACCESS_KEY_ID
const cloudflareR2SecretAccessKey: string = CLOUDFLARE_R2_SECRET_ACCESS_KEY
const cloudflareR2BucketName: string = CLOUDFLARE_R2_BUCKET_NAME
const cloudflarePublicUrl: string = CLOUDFLARE_PUBLIC_URL

export {
  cloudflareAccountId,
  cloudflareR2AccessKeyId,
  cloudflareR2SecretAccessKey,
  cloudflareR2BucketName,
  cloudflarePublicUrl,
}
import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// The default cache is intentionally kept for the first deployment. Add an R2
// incremental-cache binding only after the Worker has been validated in production.
export default defineCloudflareConfig();

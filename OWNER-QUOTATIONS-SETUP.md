# Owner one-time quotations

The owner area has no public registration. Owner login is configured with environment variables and a bcrypt password hash. Quotation and customer details are never stored by the website: they remain in the current quotation form only, and are discarded when the page is left or reset.

## Owner login

Set these variables in local `.env.local` and in the Hostinger Node.js app environment:

- `OWNER_USERNAME`
- `OWNER_PASSWORD_HASH` (bcrypt hash, not the password)
- `SESSION_SECRET` (unique random value of at least 32 characters)

To generate a hash, run `node scripts/hash-owner-password.mjs`. For `.env.local`, paste its full quoted and dollar-escaped output. In Hostinger's environment-variable UI, paste the bcrypt hash with backslashes removed and without quotes. Do not commit secrets or share them in chat.

## WhatsApp sending

Enter the customer's Indian mobile number and create the quotation. The site opens `wa.me` addressed to that number with a concise quotation summary prefilled. The form can also render a professional bill image with the Jeyya Events logo, itemized prices, total, and DD/MM/YY date. Download the bill image and attach it in the WhatsApp chat. Review and send in WhatsApp; the website does not send messages automatically.

---
title: "Gmail Plus Addresses and Dots: Feature or Security Flaw?"
description: "How Gmail's + tags and ignored dots work, why they let one person create many signups, and how to normalize addresses to one canonical form in code."
pubDate: 2026-11-03
updatedDate: 2026-11-14
tags: ["security", "web-development", "authentication", "gmail", "engineering"]
---

Gmail delivers mail for `name+tag@gmail.com` to the same inbox as `name@gmail.com`. It also ignores dots in the name, so every dotted form reaches the same inbox too:

```text
primary: myemail@gmail.com
aliases: myemail+testing@gmail.com
         myemail+newsletter@gmail.com
         m.y.e.m.a.i.l@gmail.com
```

Google treats all of these as one mailbox. Many web applications treat each string as a new user. The mail feature is useful to the owner of the inbox. For a signup system that counts accounts, it creates duplicates.

## 1. How it works

1. **Subaddressing ([RFC 5233](https://datatracker.ietf.org/doc/html/rfc5233)):** The RFC describes a `detail` after a `+` in the local part. Gmail uses it for delivery and filtering, and the tag is optional.
2. **Dots are ignored:** Gmail ignores periods in the username. `jasur.haydarov` and `jasurhaydarov` reach the same inbox. A 10-character username has 9 gaps, so it has 512 dot patterns, all delivered to one inbox.

## 2. Why people use it

- **Breach tracking:** Sign up on an untrusted site with `you+companyname@gmail.com`. If spam arrives at that alias, you know which site leaked or sold your address.
- **Test accounts:** Test admin, manager and viewer roles from one inbox without creating several mailboxes.
- **Filtering:** Gmail filters can label, forward or archive mail by its `+` tag.

## 3. Where backends break

A signup form that checks uniqueness with a plain equality test fails here:

```sql
SELECT id FROM users WHERE email = 'user+trial2@gmail.com';
```

`user+trial2@gmail.com` and `user@gmail.com` are different strings, so the query finds no match, and both can be registered. Abusers use this in three ways:

- **Trial and credit farming:** Create many accounts (`user+1@...`, `user+2@...`) to claim free-tier credits, promo codes or welcome discounts.
- **Referral gaming:** Refer your own alias accounts to collect rewards.
- **Combined with disposable mail:** Aliases plus temporary email services and separate browser profiles get past simple cookie and IP checks.

## 4. Canonical normalization

Do not reject the `+`. Valid addresses use it, and some users depend on it. Keep the address for delivery, and use a second, canonical value for identity checks.

The rules below apply to Gmail only:

1. Trim the address and lowercase it.
2. Map `googlemail.com` to `gmail.com`.
3. For `gmail.com`, remove everything after `+` in the local part, then remove all dots.

Other providers have their own rules, so the function only lowercases their addresses.

```typescript
export function normalizeEmail(input: string): { canonical: string; display: string } {
  const display = input.trim();
  const at = display.lastIndexOf('@');
  if (at <= 0 || at === display.length - 1) {
    throw new Error('Invalid email');
  }

  const local = display.slice(0, at).toLowerCase();
  let domain = display.slice(at + 1).toLowerCase();

  if (domain === 'googlemail.com') {
    domain = 'gmail.com';
  }

  if (domain !== 'gmail.com') {
    return { canonical: `${local}@${domain}`, display };
  }

  const base = local.split('+')[0].replace(/\./g, '');
  if (!base) {
    throw new Error('Invalid email');
  }

  return { canonical: `${base}@gmail.com`, display };
}
```

For `Jasur.H+news@googlemail.com`, the function returns `canonical: "jasurh@gmail.com"` and keeps the original text as `display`.

### Two columns, one unique key

Store the address as typed so outgoing mail keeps the alias. Enforce uniqueness on the canonical column:

![Diagram: the address typed by the user is stored as display_email. The normalized address, jasurh@gmail.com, is stored in canonical_email, which has a unique constraint](/images/blog/the-gmail-plus-trick-superpower-or-security-flaw/canonical-email.svg)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_email   VARCHAR(255) NOT NULL, -- user+tag@gmail.com (for outbound delivery)
  canonical_email VARCHAR(255) NOT NULL, -- user@gmail.com (for identity & uniqueness)
  CONSTRAINT unique_canonical_email UNIQUE (canonical_email)
);
```

If throwaway mail is also a problem, check the domain against an open-source disposable email list such as `disposable-email-domains`.

Use the display address for outgoing mail. Tie accounts, trials and quotas to the canonical address.

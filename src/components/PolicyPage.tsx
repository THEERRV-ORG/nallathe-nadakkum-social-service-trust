import { useEffect } from 'react';
import privacyPolicy from '../policies/html/privacy-policy.html?raw';
import privacyPolicyFull from '../policies/html/privacy-policy-full.html?raw';
import termsAndConditions from '../policies/html/terms-and-conditions.html?raw';
import termsAndConditionsFull from '../policies/html/terms-and-conditions-full.html?raw';
import refundPolicy from '../policies/html/refund-policy.html?raw';
import refundPolicyFull from '../policies/html/refund-policy-full.html?raw';
import childProtectionPolicy from '../policies/html/child-protection-policy.html?raw';

const POLICY_HTML = {
  'privacy-policy': privacyPolicy,
  'privacy-policy-full': privacyPolicyFull,
  'terms-and-conditions': termsAndConditions,
  'terms-and-conditions-full': termsAndConditionsFull,
  'refund-policy': refundPolicy,
  'refund-policy-full': refundPolicyFull,
  'child-protection-policy': childProtectionPolicy,
} as const;

export type PolicySlug = keyof typeof POLICY_HTML;

function extractBody(html: string) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match?.[1] ?? html;
}

export default function PolicyPage({ slug }: { slug: PolicySlug }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  return (
    <main className="policy-page site-shell min-h-screen bg-[#f8fbf8] font-sans text-gray-900">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <img
          src="/logo.png"
          alt=""
          className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.035] grayscale"
        />
      </div>
      <article
        className="policy-document"
        dangerouslySetInnerHTML={{ __html: extractBody(POLICY_HTML[slug]) }}
      />
    </main>
  );
}

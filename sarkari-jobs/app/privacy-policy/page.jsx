// app/privacy-policy/page.jsx
export const metadata = {
  title: "Privacy Policy | SarkariJobs Maharashtra",
  description: "Read our Privacy Policy to understand how we collect, use and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-main py-12 max-w-3xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-gray-400 text-sm mb-8">Last updated: April 2026</p>

      <div className="space-y-8 text-gray-700">
        {[
          {
            title: "1. Information We Collect",
            body: `We collect information you voluntarily provide, such as when you subscribe to job alerts or contact us. We also automatically collect non-personal data like browser type, pages visited, and time spent on our site via Google Analytics.`,
          },
          {
            title: "2. How We Use Information",
            body: `We use the information we collect to: deliver relevant government job content, send job alerts (if subscribed), improve our website experience, and analyze usage patterns. We do not sell your personal information to third parties.`,
          },
          {
            title: "3. Cookies",
            body: `Our website uses cookies to enhance user experience. We use Google Analytics cookies to understand traffic, and Google AdSense cookies for advertising. You can disable cookies in your browser settings, though this may affect website functionality.`,
          },
          {
            title: "4. Google AdSense",
            body: `We use Google AdSense to display advertisements. Google may use cookies to show personalized ads based on your visits to this and other websites. You can opt out of personalized advertising by visiting Google's Ad Settings.`,
          },
          {
            title: "5. Third-Party Links",
            body: `Our website contains links to government websites and official job portals. We are not responsible for the privacy practices or content of those websites. We recommend reading their privacy policies separately.`,
          },
          {
            title: "6. Data Security",
            body: `We implement appropriate security measures to protect your information. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.`,
          },
          {
            title: "7. Children's Privacy",
            body: `Our website is not directed at children under 13 years of age. We do not knowingly collect personal information from children.`,
          },
          {
            title: "8. Contact Us",
            body: `If you have questions about this Privacy Policy, please contact us at: contact@sarkarijobs.com`,
          },
        ].map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-bold text-gray-900 mb-2">{section.title}</h2>
            <p className="leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// app/disclaimer/page.jsx
export const metadata = {
  title: "Disclaimer | SarkariJobs Maharashtra",
  description: "Read our disclaimer about the information provided on SarkariJobs Maharashtra.",
};

export default function DisclaimerPage() {
  return (
    <div className="container-main py-12 max-w-3xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Disclaimer</h1>
      <p className="text-gray-400 text-sm mb-8">Last updated: April 2026</p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 mb-8">
        <p className="font-bold text-yellow-800 mb-1">⚠️ Important Notice</p>
        <p className="text-yellow-700 text-sm">
          SarkariJobs Maharashtra is an independent information portal. We are NOT affiliated with
          any government organization, ministry, or official recruitment body.
        </p>
      </div>

      <div className="space-y-8 text-gray-700">
        {[
          {
            title: "No Official Affiliation",
            body: `SarkariJobs Maharashtra (sarkarijobs.com) is a private independent website. We are not affiliated with, endorsed by, or connected to any government department, Ministry, MPSC, UPSC, SSC, Railway, or any other official body. Our website name does not imply any official government connection.`,
          },
          {
            title: "Accuracy of Information",
            body: `While we strive to provide accurate and up-to-date information about government job vacancies, results, and admit cards, we cannot guarantee the accuracy, completeness, or timeliness of all information. Government notification details can change at any time. Always verify information from the official government website before taking any action.`,
          },
          {
            title: "No Job Guarantee",
            body: `We do not guarantee employment or selection to any government position. We merely publish information about available government job opportunities. The selection process is entirely in the hands of the respective recruiting authorities.`,
          },
          {
            title: "Application Process",
            body: `We are not involved in the application or selection process for any government job. Applications must be submitted only through the official website of the respective recruiting body. We do not charge any fees for job information.`,
          },
          {
            title: "External Links",
            body: `Our website may contain links to official government portals and third-party websites. We are not responsible for the content, accuracy, or security of those external sites.`,
          },
          {
            title: "Advertisement Disclaimer",
            body: `Our website displays advertisements via Google AdSense and potentially other ad networks. These advertisements are not endorsements of any product or service. We are not responsible for the content of third-party advertisements.`,
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

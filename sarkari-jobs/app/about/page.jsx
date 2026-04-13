// app/about/page.jsx
export const metadata = {
  title: "About Us | SarkariJobs Maharashtra",
  description: "SarkariJobs Maharashtra is Maharashtra's #1 platform for latest government jobs, exam results, and admit cards. Learn about our mission.",
};

export default function AboutPage() {
  return (
    <div className="container-main py-12 max-w-3xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">About Us</h1>
      <div className="prose-style space-y-5 text-gray-700">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-2">आमच्याबद्दल</h2>
          <p className="text-blue-800">
            SarkariJobs Maharashtra हे महाराष्ट्रातील सरकारी नोकरी, परीक्षा निकाल आणि प्रवेशपत्रांसाठी
            सर्वात विश्वासार्ह व्यासपीठ आहे.
          </p>
        </div>
        <p>
          SarkariJobs Maharashtra is dedicated to providing accurate, timely, and comprehensive
          information about government jobs in Maharashtra and across India. We cover MPSC, UPSC,
          Railway, Bank, Police, SSC, ZP and all other government recruitment notifications.
        </p>
        <h2 className="text-xl font-bold text-gray-900 pt-4">Our Mission</h2>
        <p>
          Our mission is to bridge the gap between government job aspirants and opportunities. We
          provide free, accurate, and up-to-date information to help candidates apply for jobs,
          prepare for exams, and achieve their career goals in the public sector.
        </p>
        <h2 className="text-xl font-bold text-gray-900 pt-4">What We Offer</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Latest Government Job Notifications (सरकारी भरती)</li>
          <li>Exam Results (परीक्षा निकाल)</li>
          <li>Admit Card Downloads (प्रवेशपत्र)</li>
          <li>Expert Study Tips & Career Guides</li>
          <li>Free Telegram & WhatsApp Job Alerts</li>
        </ul>
        <p className="text-sm text-gray-400 pt-4 border-t border-gray-100">
          <strong>Disclaimer:</strong> We are not affiliated with any government body. All
          information is for informational purposes only. Always verify details from official
          websites before applying.
        </p>
      </div>
    </div>
  );
}

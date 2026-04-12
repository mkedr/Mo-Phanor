import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "SMS Policy and Terms | Mo Phanor - Mortgage Decision Coach",
  description: "SMS messaging policy and terms of service for Mo Phanor's mortgage decision coaching services.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">
              SMS Policy and Terms
            </h1>
            <p className="text-muted-foreground">
              Last updated: March 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="font-heading text-2xl font-bold text-black mb-4">
                SMS/Text Messaging Terms
              </h2>
              <p className="text-black/80 leading-relaxed mb-4">
                By providing your phone number and opting in to receive SMS messages from Mo Phanor / Mortgage Decision Coach, you consent to receive text messages related to our services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-black/80 space-y-2 mb-4">
                <li>Appointment reminders and confirmations</li>
                <li>Follow-up messages regarding your consultation</li>
                <li>Educational content about mortgage decisions</li>
                <li>Newsletter updates (if subscribed)</li>
                <li>Webinar and event notifications (if subscribed)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-heading text-2xl font-bold text-black mb-4">
                Message Frequency
              </h2>
              <p className="text-black/80 leading-relaxed mb-4">
                Message frequency varies based on your interactions and subscriptions. You may receive up to 4 messages per month for newsletter subscribers, plus additional transactional messages related to scheduled consultations.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-heading text-2xl font-bold text-black mb-4">
                Message and Data Rates
              </h2>
              <p className="text-black/80 leading-relaxed mb-4">
                Message and data rates may apply. Please check with your mobile carrier for details about your text messaging plan.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-heading text-2xl font-bold text-black mb-4">
                Opting Out
              </h2>
              <p className="text-black/80 leading-relaxed mb-4">
                You can opt out of receiving SMS messages at any time by:
              </p>
              <ul className="list-disc pl-6 text-black/80 space-y-2 mb-4">
                <li>Replying STOP to any message you receive</li>
                <li>Contacting us directly at 404-692-2444</li>
                <li>Emailing us at talktomo@mophanor.com</li>
              </ul>
              <p className="text-black/80 leading-relaxed">
                After opting out, you will receive one final confirmation message. You will no longer receive SMS messages from us unless you opt in again.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-heading text-2xl font-bold text-black mb-4">
                Help
              </h2>
              <p className="text-black/80 leading-relaxed mb-4">
                For help or questions about our SMS program, reply HELP to any message or contact us at:
              </p>
              <ul className="list-none text-black/80 space-y-1 mb-4">
                <li><strong>Phone:</strong> 404-692-2444</li>
                <li><strong>Email:</strong> talktomo@mophanor.com</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-heading text-2xl font-bold text-black mb-4">
                Privacy
              </h2>
              <p className="text-black/80 leading-relaxed mb-4">
                We respect your privacy. Your phone number and personal information will not be sold, rented, or shared with third parties for marketing purposes. We only use your information to provide the services you have requested.
              </p>
              <p className="text-black/80 leading-relaxed mb-4">
                Information collected includes:
              </p>
              <ul className="list-disc pl-6 text-black/80 space-y-2 mb-4">
                <li>Name and contact information</li>
                <li>Phone number for SMS communications</li>
                <li>Email address for newsletter delivery</li>
                <li>State of residence for licensing compliance</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-heading text-2xl font-bold text-black mb-4">
                Supported Carriers
              </h2>
              <p className="text-black/80 leading-relaxed mb-4">
                Our SMS service is compatible with most major US carriers including AT&T, Verizon, T-Mobile, Sprint, and others. However, not all carriers support all types of messages, and some carriers may block or delay messages.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-heading text-2xl font-bold text-black mb-4">
                Terms of Service
              </h2>
              <p className="text-black/80 leading-relaxed mb-4">
                By using our services, you agree to the following:
              </p>
              <ul className="list-disc pl-6 text-black/80 space-y-2 mb-4">
                <li>You are at least 18 years of age</li>
                <li>You are the account holder for the phone number provided or have authorization to use it</li>
                <li>You understand that Mo Phanor provides mortgage decision coaching services, not lending services</li>
                <li>You acknowledge that any information provided is for educational purposes and does not constitute financial advice</li>
                <li>You will provide accurate and complete information when submitting forms</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-heading text-2xl font-bold text-black mb-4">
                Disclaimer
              </h2>
              <p className="text-black/80 leading-relaxed mb-4">
                Mo Phanor is a licensed mortgage loan originator (NMLS# 2420740) providing decision coaching services. The information provided through our services is for educational purposes only and should not be considered as financial, legal, or tax advice. Always consult with appropriate professionals before making financial decisions.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-heading text-2xl font-bold text-black mb-4">
                Changes to This Policy
              </h2>
              <p className="text-black/80 leading-relaxed mb-4">
                We reserve the right to modify this SMS Policy and Terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of our SMS services after any changes indicates your acceptance of the updated terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-heading text-2xl font-bold text-black mb-4">
                Contact Information
              </h2>
              <p className="text-black/80 leading-relaxed mb-4">
                If you have any questions about this SMS Policy and Terms, please contact us:
              </p>
              <div className="bg-[#F5F5F0] rounded-xl p-6 border border-[#E8E4DC]">
                <p className="text-black font-semibold mb-2">Mo Phanor - Mortgage Decision Coach</p>
                <p className="text-black/80">Company NMLS# 2826</p>
                <p className="text-black/80 mt-4">
                  <strong>Direct:</strong> 404-692-2444<br />
                  <strong>Office:</strong> 973-712-5876<br />
                  <strong>Email:</strong> talktomo@mophanor.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

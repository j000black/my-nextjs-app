export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Contacts</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Get in touch</h1>
        <p className="mt-3 text-slate-600">
          Use this page to show your company email, phone number, address, or a contact form later.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Contact Details</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>
              <span className="font-medium text-slate-800">Email:</span> hello@example.com
            </p>
            <p>
              <span className="font-medium text-slate-800">Phone:</span> (555) 123-4567
            </p>
            <p>
              <span className="font-medium text-slate-800">Address:</span> 123 Main Street
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Office Hours</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p>Saturday: 10:00 AM - 2:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </section>
  );
}

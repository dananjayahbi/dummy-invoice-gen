import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Invoice Generator</h1>
          <p className="text-xl text-gray-600">
            Create professional, customizable invoices instantly. No server storage, no data retention.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Features */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Features</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Multiple professional templates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Customizable line items and totals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Toggle optional fields (tax, bank details, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Download as PDF or print directly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>100% client-side processing - no data stored</span>
              </li>
            </ul>
          </div>

          {/* How It Works */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">How It Works</h2>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">1</span>
                <span>Enter your company and client details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">2</span>
                <span>Add line items and customize fields</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">3</span>
                <span>Preview your invoice</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">4</span>
                <span>Download as PDF or print</span>
              </li>
            </ol>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/generator"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-lg"
          >
            Start Creating Invoices →
          </Link>
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
          <p className="text-blue-900">
            <strong>Privacy Notice:</strong> All invoice data is processed entirely in your browser.
            We do not store, transmit, or retain any of your information.
          </p>
        </div>
      </div>
    </div>
  );
}
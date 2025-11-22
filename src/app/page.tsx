import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center">
            <FileText className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            BVS Dummy Invoice Generator
          </h1>
          <p className="text-xl text-gray-600">
            Generate professional sample invoices with multiple templates and customizable fields.
            All processing happens locally - no data ever leaves your browser.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Link
            href="/generator"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            Start Generating
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-gray-500 pt-8">
          100% client-side processing • No data stored • Completely free
        </p>
      </div>
    </div>
  );
}

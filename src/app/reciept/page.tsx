
"use client";

export default function ReceiptPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 text-center">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎉 Congrats! You&apos;ve Obtained Your Heart&apos;s Desire 🎉
        </h1>
        <div className="w-40 h-1 bg-pink-400 mx-auto mb-8 rounded"></div>

        <div className="bg-gray-50 border rounded p-6 text-left">
          <h2 className="text-lg font-semibold mb-4">Receipt Details</h2>
          <ul className="space-y-2 text-gray-600">
            <li>
              <span className="font-medium">Order ID:</span> #12345
            </li>
            <li>
              <span className="font-medium">Date:</span>{" "}
              {new Date().toLocaleDateString()}
            </li>
            <li>
              <span className="font-medium">Total:</span> $123.45
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
import Link from "next/link";

export default function resetSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <nav>
        <Link
          href="/login"
          className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>
      </nav>
      <div className="animate-in bg-white rounded-lg shadow-lg p-8 max-w-md text-black">
        <div className="flex justify-center items-center mb-6 text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-[#3e4e50]">Email Sent!</h2>
        <p className="text-gray-600 mb-6">An email has been sent to your email address. Please check your inbox.</p>
      </div>
    </div>
  );
}

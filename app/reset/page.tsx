import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/app/login/submit-button";
import Link from "next/link";
export default function reset({ searchParams }: { searchParams: { message: string } }) {
  const resetPassword = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const supabase = createClient();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `http://localhost:3000/new-password`, // Replace with your site URL
    });

    if (error) {
      // Handle error
      console.error("Error resetting password:", error);
    } else {
      // Password reset email sent successfully
      console.log("Password reset email sent:", data);
      // Optionally, you can redirect the user to a success page or show a success message
      redirect("/reset-success");
    }
  };

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
        <h2 className="text-2xl font-bold mb-6 text-[#3e4e50]">Reset your password</h2>
        <p className="text-gray-600 mb-6">
          Enter the email address associated with your account and we'll send you a link to reset your password.
        </p>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required
            />
          </div>
          <SubmitButton
          formAction={resetPassword}
          className="bg-[#f5ac72] hover:bg-[#f8bd7f] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          pendingText="Sending email..."
        >
            Continue
            </SubmitButton>
        </form>
      </div>
    </div>
  );
}
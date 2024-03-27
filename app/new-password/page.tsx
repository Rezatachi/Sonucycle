import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/app/login/submit-button";
import Link from "next/link";

export default function newPassword({ searchParams }: { searchParams: { code: string } }) {

    const changePassword = async (formData: FormData) => {
        "use server";
        // check if the user is logged in
        const supabase = createClient();
        const new_password = formData.get("password") as string;
        const token = searchParams?.code;
        await supabase.auth.exchangeCodeForSession(token);
        // whta do i do with the token?
        const { error } = await supabase.auth.updateUser({ password: new_password });
        if (error) {
            console.log("Error updating password:", error);
            redirect(`/login?message=${token}`);
        } else {
            console.log("Password updated successfully");
            redirect("/login?message=success");
        }
    }

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
                    Enter your new password.
                </p>
                <form>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Your new password"
                            className="block w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <SubmitButton formAction={changePassword}>Change password</SubmitButton>
                </form>
            </div>
        </div>
    )
}

import Link from "next/link";
import { headers } from "next/headers";
import { createClient} from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/app/login/submit-button";
import { supabase, } from "@supabase/auth-ui-shared";
import Toast from "@/components/Toast";
export default function signUpComponent({ searchParams }: { searchParams: { message: string } }) {
    const signUp = async (formData: FormData) => {
        "use server";
        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${origin}/auth/callback`,
          },
        });
        if (error) {
            console.error(error);
          return redirect("/login?message=Could not authenticate user");
        }
        return redirect("/login?message=Check email to continue sign in process");
      };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <nav>
                <Link
                href="/"
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
            <div className=" animate-in bg-white border border-gray-300 rounded-lg p-6">
                {/* create text saying "Sign into your account! Center in box" */}
                <h1 className="text-2xl font-semibold text-black text-center">Sign Up</h1>
                <form
                className="flex flex-col gap-4 mt-4 text-black"
                >
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="p-2 border border-gray-300 rounded-md text-black"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="p-2 border border-gray-300 rounded-md text-black"
                    required
                />
                <SubmitButton className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2" formAction={signUp} pendingText="Signing Up...">Sign Up</SubmitButton>
                {/* add toast */}
        {searchParams?.message && (
          <Toast message={searchParams.message} />
        )}
          </form>
            </div>
        </div>
    );
}
import Link from "next/link";
import { headers } from "next/headers";
import { createClient} from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { supabase, } from "@supabase/auth-ui-shared";

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const signIn = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }
    return redirect("/protected");
  };
  

  // handle google sign in
  // async function handleSignInWithGoogle(response: any) {
  //   const supabase = createClient();
  //   const { data, error } = await supabase.auth.signInWithIdToken({
  //     provider: "google",
  //     token: response.credential,
  //     nonce : 'NONCE',
  //   })
  //   if (error) {
  //     return redirect("/login?message=Could not authenticate user");
  //   }
  //   return redirect("/protected");
  // }

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
      <div className="bg-white border border-gray-300 rounded-lg p-6">
        {/* create text saying "Sign into your account! Center in box" */}
        <h1 className="text-2xl font-bold mb-6 text-[#3e4e50] text-center">Sign into your account!</h1>
        {/* create a form with email and password fields */}
        
        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground text-black">
          <label className="text-md text-black" htmlFor="email">
            Email
          </label>
          <input
            className="text-black rounded-md px-4 py-2 bg-inherit border border-green-500 mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md text-black" htmlFor="password">
            Password
          </label>
          <input
            className="text-black rounded-md px-4 py-2 bg-inherit border border-green-500 mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signIn}
            className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>
          <p className="text-sm text-black">
            Don't have an account at Sonucycle? All good, click{" "}
            <Link href="/signup">
            <span
              className="text-blue-500 cursor-pointer"
            >
              here
            </span>{" "}
            to Sign Up
          </Link></p>
          {/* reset password component */}
          <p className="text-sm text-black">
            Forgot your password? Click
          <Link href="/reset">
          <span
              className="text-blue-500 cursor-pointer"
            > here 
          </span>{" "} 
            to reset it</Link></p>
        </form>
        {/* add toast */}
        {searchParams?.message &&
                    // write a nice blurry div with the message
                    <div className="animate-in bg-black bg-opacity-40 text-white mt-2 p-2 rounded-md text-center">
                        {searchParams.message}
                    </div>}
      </div>
    </div>
  );
}
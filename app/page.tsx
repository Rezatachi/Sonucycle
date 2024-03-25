
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Login from "./login/page";

export default async function Index() {

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 w-full flex flex-col gap-20 items-center justify-center">
        <h1 className="text-4xl font-semibold">Welcome</h1>
        <AuthButton />
        </div>
    </div>
  );
}

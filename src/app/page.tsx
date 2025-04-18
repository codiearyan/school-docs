import GoogleSignInButton from "@/components/auth/signin-button";
import GoogleSignOutButton from "@/components/auth/signout-button";
import FolderView from "@/components/folder-view";
import { auth } from "@/server/auth";

import Image from "next/image";

export default  async function HomePage() {
  const session = await auth();

  console.log(session)

  if(session?.user){
    return (
      <div className="bg- h-screen tehite">
        
        <h1>
          
          Welcome to School Docs
          </h1>
          <p>User Name - {session.user.name}</p>
          <p>User Email - {session.user.email}</p>
         
         {
          session.user.image  && (
            <Image
            src={session.user.image}
            alt={session?.user?.name || ""}
            className=" w-20 h-20 rounded-full"
            width={30}
            height={30}
   />

          )
         }
         <GoogleSignOutButton />
         <FolderView />
        </div>
    )

  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
School Docs - for managing school documents + Google Workspace
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <GoogleSignInButton />   
        </div>
      </div>
    </main>
  );
}

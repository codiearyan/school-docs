import { auth } from '@/server/auth'
import React from 'react'
import GoogleSignInButton from "@/components/auth/signin-button";
import GoogleSignOutButton from "@/components/auth/signout-button";
import FileExplorer from "@/components/file-explorer";
import FolderView from "@/components/folder-view";
import Image
 from 'next/image';
const DashboardPage = async () => {

    const session = await auth()


    if(!session){
        return (
            <h1>hello</h1>
        )
    }
  return (
    <>
    <div>
      This is the dashboard page, will add its layout in layout.tsx
    </div>
    <div className=" h-screen">
        
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
         <FileExplorer />
         {/* <FolderView /> */}
        </div>
    </>
  )
}

export default DashboardPage

"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Popover, PopoverTrigger } from './ui/popover';
import { PopoverContent } from '@radix-ui/react-popover';
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button";
import { SignIn } from "@/actions/sign-in";
import { SignOut } from "@/actions/sign-out";
import { auth } from '@/auth';

function AuthHeader() {
    const session = useSession();

    if(!session?.data?.user) return null

    let authContent: React.ReactNode;
    if (session?.data?.user) {
        authContent = (
            <Popover>
                <PopoverTrigger asChild >
                    <Avatar className='cursor-pointer'>
                        <AvatarImage src={session?.data?.user?.image || ""} alt="Profile" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                    <div className='bg-zinc-600 rounded-md p-5'>
                        <h1 className='text-center text-white'>{session?.data?.user?.name}</h1>
                        <div className='border-t-2 border-gray-100 my-2'></div>
                        <form action={SignOut}>
                            <Button type='submit' className='cursor-pointer'><LogOut /> SignOut</Button>
                        </form>
                    </div>
                </PopoverContent>
            </Popover>
        )

    }
    else {
        authContent = (
            <div className='flex items-center gap-2'>
                <form action={SignIn}>
                    <Button className='cursor-pointer' type="submit">SignIn</Button>
                </form >
                <form action={SignIn}>
                    <Button variant="outline" className='cursor-pointer' type="submit">SignUp</Button>
                </form>
            </div >
        )
    }
    return authContent;
}

export default AuthHeader
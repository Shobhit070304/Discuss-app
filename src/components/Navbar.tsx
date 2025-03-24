import React from 'react'
import { auth } from "@/auth";
import AuthHeader from './AuthHeader';
import SearchInput from './search/SearchInput';


const Navbar = async () => {
    const session = await auth();
    return (
        <div className='h-16 w-full border-b-2 border-gray-300 grid grid-cols-3 items-center justify-between'>
            <div className='w-full flex flex-start'>
                <h1 className='text-2xl font-bold'>Discuss</h1>
            </div>
            <div className='w-full flex'>
                <SearchInput/>
            </div>
            <div className='w-full flex justify-end'>
                <AuthHeader />
            </div>
        </div >
    )
}

export default Navbar
import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      toast.error("Search term must be at least 3 character long")
    }
    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
    if (conversation) {
      setSelectedConversation(conversation)
      setSearch('');
    } else {
      toast.error("No such user found")
    }
  }
  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input
          type='text'
          placeholder='Search...'
          className='input input-sm rounded-full p-2 w-80 bg-gradient-to-br from-blue-200 to-red-200' 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-sm btn-circle bg-gradient-to-br from-blue-500 to-red-500 text-white p-2 absolute right-0'>
          <IoSearchSharp className='w-4 h-4 outline-none' />
        </button>
      </form>
    </div>
  )
}
// w-1/2 md:w-2/5
export default SearchInput; 

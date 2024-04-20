import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import MessageContainer from '../../components/messages/MessageContainer';



const Home = () => {
  return (
    <div className='flex flex-row sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-gray-900 p-4'>
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home;


// 'flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backfrop-blur-lg bg-opacity-0 border border-gray-900 p-4'
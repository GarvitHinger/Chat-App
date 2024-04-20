import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const SignUp = () => {  
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({...inputs,gender})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3x1 font-black text-center text-gray-800'>Sign Up <span className='text-blue-500'> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2 font-black'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input type='text' placeholder='Enter your name' className='w-full input input-bordered h-10' value={inputs.fullName} onChange={(e) => setInputs({...inputs, fullName: e.target.value})}/>
          </div>
          <div>
            <label className='label p-2 font-black'>
              <span className='text-base label-text'>User Name</span>
            </label>
            <input type='text' placeholder='Enter your username' className='w-full input input-bordered h-10' value={inputs.userName} onChange={(e) => setInputs({...inputs, userName: e.target.value})}/>
          </div>
          <div>
            <label className='label p-2 font-black'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input type='password' placeholder='Enter your password' className='w-full input input-bordered h-10' value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})}/>
          </div>
          <div>
            <label className='label p-2 font-black'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input type='password' placeholder='Confirm your password' className='w-full input input-bordered mb-2 h-10' value={inputs.confirmPassword} onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}/>
          </div>

          {/* Gender Checkbox */}
          <GenderCheckBox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender } />

          <Link to={'/login'} className='text-sm hover: underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account?
          </Link>

          <div>
            <button className='btn btn-block font-black btn-sm mt-2' disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
            </button>
          </div>
        </form>
        

      </div>

    </div>
  )
}

export default SignUp;



// const SignUp = () => {  
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//         <h1 className='text-3x1 font-black text-center text-gray-800'>Sign Up <span className='text-blue-500'> ChatApp</span>
//         </h1>

//         <form>
//           <div>
//             <label className='label p-2 font-black'>
//               <span className='text-base label-text'>Full Name</span>
//             </label>
//             <input type='text' placeholder='Enter your name' className='w-full input input-bordered h-10' />
//           </div>
//           <div>
//             <label className='label p-2 font-black'>
//               <span className='text-base label-text'>User Name</span>
//             </label>
//             <input type='text' placeholder='Enter your username' className='w-full input input-bordered h-10' />
//           </div>
//           <div>
//             <label className='label p-2 font-black'>
//               <span className='text-base label-text'>Password</span>
//             </label>
//             <input type='password' placeholder='Enter you password' className='w-full input input-bordered h-10' />
//           </div>
//           <div>
//             <label className='label p-2 font-black'>
//               <span className='text-base label-text'>Confirm Password</span>
//             </label>
//             <input type='password' placeholder='Enter you password' className='w-full input input-bordered mb-2 h-10' />
//           </div>

//           {/* Gender Checkbox */}
//           <GenderCheckBox />

//           <Link to={'/login'} className='text-sm hover: underline hover:text-blue-600 mt-2 inline-block'>
//             Already have an account?
//           </Link>
//         </form>
//         <div>
//             <button className='btn btn-block font-black btn-sm mt-2'>Register</button>
//           </div>

//       </div>

//     </div>
//   )
// }

// export default SignUp



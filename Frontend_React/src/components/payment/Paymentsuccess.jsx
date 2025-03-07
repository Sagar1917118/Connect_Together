import React from 'react'
import {useSearchParams} from 'react-router-dom'
const Paymentsuccess = () => {
const searchQuery=useSearchParams()[0];
console.log(searchQuery.get('reference'));
const search=searchQuery.get('reference');
  return (
    <div className='w-11/12 mx-auto mt-20'>
      <div className='w-[200px] h-[150px] bg-indigo-200 rounded-md text-center flex flex-col justify-between p-4'>
        {
          search ?(
            <div>
              <p>Payment Successful</p>
               <p>Reference Id: <strong>{search}</strong></p>
            </div>
          ):
          (
            <div className='text-red-800 font-bold text-ld'>No payment Made</div>
          )
        }
        <a href="/payment">
          <p className='text-yellow-500 font-bold p-4 bg-indigo-600 rounded-lg'>Redirect</p>
         </a>
      </div>

    </div>
  )
}

export default Paymentsuccess

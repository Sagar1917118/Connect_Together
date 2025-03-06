import React from 'react'
import {useSearchParams} from 'react-router-dom'
const Paymentsuccess = () => {
const searchQuery=useSearchParams()[0];
console.log(searchQuery.get('reference'));
const search=searchQuery.get('reference');
  return (
    <div className='Paymentsuccess'>
      <div className='paymentsuccesscard'>
      <b>Payment successfull</b>
      <h6>reference id : {search}</h6>
      </div>
    </div>
  )
}

export default Paymentsuccess

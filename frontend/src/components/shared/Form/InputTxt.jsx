import React from 'react'

const InputTxt = ({label}) => {
  return (
    <div className='flex flex-col mt-2'>
      <label>{label}</label>
      <input className='py-1 px-2 rounded-md ' type="text"/>
    </div>
  )
}

export default InputTxt

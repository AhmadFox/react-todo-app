import React, { memo, useEffect, useState } from 'react'

import { CheckIcon, Xmark } from '../svg/Icons';

const Notification = ({ show, data }) => {

	const [ open, setOpen ] = useState(show);


	useEffect(() => {
		setOpen(show)
	}, [show]);

	return (
		<div className={`fixed bottom-20 left-0 ease-in-out duration-300 ${open ? 'translate-x-6' : '-translate-x-full'}`}>
			<div className="flex items-center rounded-md p-3 w-80 bg-white shadow-lg">
				<button onClick={(e) => {setOpen(false)}} className='absolute top-3 right-3 text-gray-500 hover:text-gray-800 ease-in-out duration-200'>
					<Xmark addStyle={'w-5 h-5'} />
				</button>
				<div className="">
					<CheckIcon addStyle={`w-8 h-8 
					  ${data.msgType === 'add-task' ? 'text-green-700' :
						data.msgType === 'edit-task' ? 'text-blue-600' :
						data.msgType === 'remove-task' ? 'text-red-400' : 'text-violet-600'}`} />

				</div>
				<div className="pl-2 pr-5">
					<p className={`text-sm leading-tight capitalize ${data.msgType === 'add-task' ? 'text-green-700' :
					data.msgType === 'edit-task' ? 'text-blue-600' :
					data.msgType === 'remove-task' ? 'text-red-400' : 'text-violet-600'}`}>{data.message}</p>
				</div>
			</div>
		</div>
	)
}

export default memo(Notification)

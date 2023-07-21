import React from 'react'

const Container = (props) => {
  return (
	<div className="px-4 mx-auto w-full md:w-10/12 xl:w-9/12 max-w-[800px]">
	  {props.children}
	</div>
  )
}

export default Container

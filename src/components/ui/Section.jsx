import React from 'react'
import Container from './Container'


const Section = (props, addStyle='') => {
	return (
		<section className={`py-9 md:py-10 xl:py-12 ${props.addStyle}`}>
			<Container>
				{props.children}
			</Container>
		</section>
	)
}

export default Section

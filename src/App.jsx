import React, { Fragment } from "react";

// Components
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";


console.log('== App Re-Render ==');

function App() {

	return (
		<Fragment>

			<Navbar />

			<Main />

			<Footer />

		</Fragment>
	);
}

export default App;
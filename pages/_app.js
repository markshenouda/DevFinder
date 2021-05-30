import "../styles/globals.scss";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import NextNprogress from "nextjs-progressbar";
import axios from "axios";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

function MyApp({ Component, pageProps }) {
	const [isDarkMode, setDarkMode] = useState(true);

	// Get theme data from localStorage
	useEffect(() => {
		if (localStorage?.getItem("theme")) {
			let theme = localStorage?.getItem("theme");
			setDarkMode(theme === "dark");
		}
	}, []);

	useEffect(() => {
		if (isDarkMode) {
			document.body.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.body.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDarkMode]);

	return (
		<div className="app">
			<Head>
				<link
					rel="shortcut icon"
					href="/static/icon.png"
					type="image/x-icon"
				/>
			</Head>

			<DefaultSeo {...SEO} />

			<NextNprogress
				color={isDarkMode ? "#00bfff" : "#1e90ff"}
				startPosition={0.3}
				stopDelayMs={200}
				height="4"
				options={{ showSpinner: false }}
			/>
			<DarkModeSwitch
				checked={isDarkMode}
				onChange={(checked) => setDarkMode(checked)}
				size={40}
				moonColor="#b5b5b5"
				sunColor="#535353"
				className="displayModeToggle"
			/>
			<div className="app__container">
				<Component {...pageProps} />
			</div>

			<Footer />
		</div>
	);
}

export default MyApp;

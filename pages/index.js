import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { FiSearch } from "react-icons/fi";
import IconButton from "@material-ui/core/IconButton";
import { useRouter } from "next/router";
import { BiGlasses } from "react-icons/bi";

export default function Home() {
	const { t } = useTranslation();
	const router = useRouter();

	const [searchWord, setSearchWord] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		if (searchWord) {
			router.push({ pathname: "/search", query: { q: searchWord } });
		}
	}

	return (
		<div className="home">
			<div className="home__logo">
				<BiGlasses />
				<h1>DevFinder</h1>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="home__search">
					<input
						type="text"
						placeholder={t("common:searchForDevelopers")}
						value={searchWord}
						onChange={(e) => setSearchWord(e.target.value)}
					/>
					<IconButton type="submit">
						<FiSearch />
					</IconButton>
				</div>
			</form>
		</div>
	);
}

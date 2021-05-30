import { useState, forwardRef } from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

const SearchResult = forwardRef(({ image, username, type }, ref) => {
	const { t } = useTranslation();

	return (
		<div className="searchResult" ref={ref}>
			<img src={image} alt={username} />
			<h3>{username}</h3>
			<small>{type}</small>

			<Link href={`/user/${username}`}>
				<a>{t("common:viewDetails")}</a>
			</Link>
		</div>
	);
});

export default SearchResult;

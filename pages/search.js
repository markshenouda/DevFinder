import { useState, useEffect, forwardRef } from "react";
import Link from "next/link";
import { BiGlasses } from "react-icons/bi";
import IconButton from "@material-ui/core/IconButton";
import { GoSettings } from "react-icons/go";
import Container from "@material-ui/core/Container";
import { useRouter } from "next/router";
import axios from "axios";
import numeral from "numeral";
import SearchResult from "../components/SearchResult";
import Pagination from "@material-ui/lab/Pagination";
import FlipMove from "react-flip-move";
import ErrorProgress from "../components/ErrorProgress";
import FilterModal from "../components/FilterModal";
import useTranslation from "next-translate/useTranslation";
import { NextSeo } from "next-seo";

const Search = ({ result, page, totalPages, error }) => {
	const router = useRouter();
	const { t } = useTranslation();
	const [searchWord, setSearchWord] = useState(router.query.q);
	const [openFilters, setOpenFilters] = useState(false);
	const [resultItems, setResultItems] = useState([]);

	const SEO = {
		title: `${router.query.q} - DevFinder`,
	};

	// I pass the result items from props to state so FlipMove can detect the change on the first time
	useEffect(() => {
		setResultItems(result?.items);
	}, [result]);

	// Search for a new keyword
	function handleSubmit(e) {
		e.preventDefault();
		if (searchWord) {
			router.push({ pathname: "/search", query: { q: searchWord } });
		}
	}

	// Changing the current search page
	function handlePageChange(e, value) {
		if (searchWord) {
			router.push({
				pathname: "/search",
				query: { ...router.query, page: value },
			});
		}
	}

	// To close the filters modal
	function closeFilters() {
		setOpenFilters(false);
	}

	return (
		<Container>
			<NextSeo {...SEO} />
			<div className="search">
				<form onSubmit={handleSubmit}>
					<div className="search__header">
						<Link href="/">
							<a>
								<div className="search__logo">
									<BiGlasses />
									<h1>DevFinder</h1>
								</div>
							</a>
						</Link>

						<div className="search__box">
							<input
								type="text"
								placeholder={t("common:searchForDevelopers")}
								value={searchWord}
								onChange={(e) => setSearchWord(e.target.value)}
							/>
							<IconButton
								onClick={() => setOpenFilters(true)}
								aria-label="filters"
							>
								<GoSettings />
							</IconButton>
						</div>
					</div>
				</form>

				{error ? (
					<ErrorProgress message={error} />
				) : (
					<>
						<div className="search__total">
							{numeral(result?.total_count).format("0,0")}{" "}
							{t("common:results")}
						</div>
						<FlipMove className="search__results" duration={500}>
							{resultItems?.map((item, idx) => (
								<SearchResult
									key={item.id}
									idx={idx}
									image={item.avatar_url}
									username={item.login}
									type={item.type}
								/>
							))}
						</FlipMove>
						{page === 0 && (
							<div className="search__noResults">
								{t("common:thereAreNoResults")}
							</div>
						)}
						<div className="search__pagination">
							<Pagination
								count={totalPages}
								page={Number(page)}
								color="primary"
								onChange={handlePageChange}
							/>
						</div>
					</>
				)}
			</div>

			<FilterModal
				openFilters={openFilters}
				closeFilters={closeFilters}
			/>
		</Container>
	);
};

export const getServerSideProps = async ({ query }) => {
	// Check if there is a search keyword or redirect to home page
	if (!query.q) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
			props: {},
		};
	}

	// Build the GitHub search query
	let githubQuery = query.q;

	if (query.location) {
		githubQuery += ` location:${query.location}`;
	}

	if (query.followers) {
		githubQuery += ` followers:${query.followers}`;
	}

	if (query.type) {
		githubQuery += ` type:${query.type}`;
	}

	if (query.repositories) {
		githubQuery += ` repos:${query.repositories}`;
	}

	try {
		const response = await axios.get("/search/users", {
			params: {
				q: githubQuery,
				per_page: 12,
				page: query.page,
			},
		});

		let currentPage;
		if (response.data.items.length > 0) {
			currentPage = query.page || 1;
		} else {
			currentPage = 0;
		}

		return {
			props: {
				result: response.data,
				page: currentPage,
				totalPages: Math.ceil(response.data.total_count / 12),
			},
		};
	} catch (err) {
		return {
			props: {
				error: err.message,
			},
		};
	}
};

export default Search;

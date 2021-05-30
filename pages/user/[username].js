import Link from "next/link";
import { BiGlasses } from "react-icons/bi";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiGitRepositoryFill, RiBuilding4Fill } from "react-icons/ri";
import { GoLogoGist } from "react-icons/go";
import { MdLocationOn } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";
import ErrorProgress from "../../components/ErrorProgress";
import useTranslation from "next-translate/useTranslation";
import { NextSeo } from "next-seo";

const UserProfile = ({ result, error }) => {
	const { t } = useTranslation();

	const SEO = {
		title: `${result?.name || "Error"} - DevFinder`,
	};

	return (
		<Container>
			<NextSeo {...SEO} />
			<div className="userProfile">
				<Link href="/">
					<a>
						<div className="userProfile__logo">
							<BiGlasses />
							<h1>DevFinder</h1>
						</div>
					</a>
				</Link>

				{error ? (
					<ErrorProgress message={error} />
				) : (
					<>
						<img
							className="userProfile__image"
							alt={result.name}
							src={result.avatar_url}
						/>

						<h1 className="userProfile__name">{result.name}</h1>
						<h2 className="userProfile__username">
							@{result.login}
						</h2>
						<p className="userProfile__bio">{result.bio}</p>

						<div className="userProfile__details">
							<div className="userProfile__detailsItem">
								<BsFillPeopleFill />
								<h2>{result.followers}</h2>
								<h3>{t("common:followers")}</h3>
							</div>

							{result.location && (
								<div className="userProfile__detailsItem">
									<MdLocationOn />
									<h2>{result.location}</h2>
									<h3>{t("common:location")}</h3>
								</div>
							)}

							<div className="userProfile__detailsItem">
								<RiGitRepositoryFill />
								<h2>{result.public_repos}</h2>
								<h3>{t("common:repositories")}</h3>
							</div>
							{result.company && (
								<div className="userProfile__detailsItem">
									<RiBuilding4Fill />
									<h2>{result.company}</h2>
									<h3>{t("common:company")}</h3>
								</div>
							)}

							<div className="userProfile__detailsItem">
								<GoLogoGist />
								<h2>{result.public_gists}</h2>
								<h3>{t("common:publicGists")}</h3>
							</div>
						</div>

						<a
							className="userProfile__link"
							href={result.html_url}
							target="_blank"
						>
							<AiFillGithub />
							<span>{t("common:viewOnGitHub")}</span>
						</a>
					</>
				)}
			</div>
		</Container>
	);
};

export const getServerSideProps = async ({ query }) => {
	try {
		const response = await axios.get(`/users/${query.username}`);
		return {
			props: {
				result: response.data,
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

export default UserProfile;

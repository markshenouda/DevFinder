import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { IoCloseSharp } from "react-icons/io5";
import useTranslation from "next-translate/useTranslation";

const FilterModal = ({ openFilters, closeFilters }) => {
	const router = useRouter();
	const { t } = useTranslation();

	const [location, setLocation] = useState("");
	const [followers, setFollowers] = useState(router.query.followers || "all");
	const [type, setType] = useState(router.query.type || "all");
	const [repositories, setRepositories] = useState(
		router.query.repositories || "all"
	);

	useEffect(() => {
		setLocation(router.query.location || "");
	}, [router.query.location]);

	useEffect(() => {
		setFollowers(router.query.followers || "all");
	}, [router.query.followers]);

	useEffect(() => {
		setType(router.query.type || "all");
	}, [router.query.type]);

	useEffect(() => {
		setRepositories(router.query.repositories || "all");
	}, [router.query.repositories]);

	function handleFilters() {
		router.push({
			pathname: "/search",
			query: {
				...router.query,
				location: location ? location : undefined,
				followers: followers !== "all" ? followers : undefined,
				type: type !== "all" ? type : undefined,
				repositories: repositories !== "all" ? repositories : undefined,
			},
		});

		closeFilters();
	}

	return (
		<Dialog
			open={openFilters}
			onClose={closeFilters}
			fullScreen
			className="modal"
		>
			<DialogContent>
				<Container>
					<div className="modal__close">
						<IconButton onClick={closeFilters}>
							<IoCloseSharp />
						</IconButton>
					</div>
					<h2>{t("common:filters")}</h2>

					<Grid container>
						<Grid item xs={12} md={6}>
							{/** Filter by Location */}
							<div className="modal__label">
								{t("common:location")}
							</div>
							<input
								type="text"
								className="modal__location"
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								placeholder={t("common:searchByLocation")}
							/>

							{/** Filter by Followers number */}
							<div className="modal__label">
								{t("common:followers")}
							</div>
							<RadioGroup
								aria-label="followers"
								name="followers"
								value={followers}
								onChange={(e) => setFollowers(e.target.value)}
							>
								<FormControlLabel
									value="all"
									control={<Radio color="default" />}
									label={t("common:all")}
								/>
								<FormControlLabel
									value="1..10"
									control={<Radio color="default" />}
									label="0 - 10"
								/>
								<FormControlLabel
									value="11..50"
									control={<Radio color="default" />}
									label="11 - 50"
								/>
								<FormControlLabel
									value="51..200"
									control={<Radio color="default" />}
									label="51 - 200"
								/>
								<FormControlLabel
									value="201..500"
									control={<Radio color="default" />}
									label="201 - 500"
								/>
								<FormControlLabel
									value=">500"
									control={<Radio color="default" />}
									label="500+"
								/>
							</RadioGroup>
						</Grid>

						<Grid item xs={12} md={6}>
							{/** Filter by user type */}
							<div className="modal__label">
								{t("common:type")}
							</div>
							<RadioGroup
								aria-label="type"
								name="type"
								value={type}
								onChange={(e) => setType(e.target.value)}
							>
								<FormControlLabel
									value="all"
									control={<Radio color="default" />}
									label={t("common:all")}
								/>
								<FormControlLabel
									value="user"
									control={<Radio color="default" />}
									label="User"
								/>
								<FormControlLabel
									value="org"
									control={<Radio color="default" />}
									label="Organization"
								/>
							</RadioGroup>

							{/** Filter by Repos number */}
							<div className="modal__label">
								{t("common:repositories")}
							</div>
							<RadioGroup
								aria-label="repositories"
								name="repositories"
								value={repositories}
								onChange={(e) =>
									setRepositories(e.target.value)
								}
							>
								<FormControlLabel
									value="all"
									control={<Radio color="default" />}
									label={t("common:all")}
								/>
								<FormControlLabel
									value="1..10"
									control={<Radio color="default" />}
									label="0 - 10"
								/>
								<FormControlLabel
									value="11..50"
									control={<Radio color="default" />}
									label="11 - 50"
								/>
								<FormControlLabel
									value="51..200"
									control={<Radio color="default" />}
									label="51 - 200"
								/>
								<FormControlLabel
									value=">200"
									control={<Radio color="default" />}
									label="200+"
								/>
							</RadioGroup>
						</Grid>
					</Grid>
					<Button
						variant="outlined"
						className="modal__button"
						size="large"
						onClick={handleFilters}
					>
						{t("common:search")}
					</Button>
				</Container>
			</DialogContent>
		</Dialog>
	);
};

export default FilterModal;

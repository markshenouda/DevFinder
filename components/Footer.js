import Link from "next/link";
import { useRouter } from "next/router";
import Container from "@material-ui/core/Container";

const Footer = () => {
	const router = useRouter();
	return (
		<Container>
			<div className="footer">
				<div className="footer__left">
					© 2021{" "}
					<a
						href="https://twitter.com/MarkSShenouda"
						target="_blank"
						rel="noopener noreferrer"
					>
						Mark Shenouda
					</a>
				</div>
				<div className="footer__right">
					<Link href={router.asPath} locale="en">
						English
					</Link>{" "}
					•{" "}
					<Link href={router.asPath} locale="fr">
						Français
					</Link>{" "}
					•{" "}
					<Link href={router.asPath} locale="es">
						Español
					</Link>
				</div>
			</div>
		</Container>
	);
};

export default Footer;

import colors from '../lib/colors';

export default function NewsItem({ title, media, description, link }) {
	return (
		<a target="_blank" href={link || ''}>
			<div className="container">
				<div className="media" />
				<div className="title">
					<h3>{title || ''}</h3>
				</div>
				<div
					className="description"
					dangerouslySetInnerHTML={{ __html: description ? description.substring(0, 500) : '' }}
				/>
			</div>
			<style jsx>{`
				h3 {
					text-align: left;
					padding-left: 3vw;
					font-size: 1.2em;
				}
				.container {
					background: ${colors.light};
					display: flex;
					flex-flow: column;
					border-radius: 20px;

				}
				.media {
					height: 200px;
					background-image: url("${media || ''}");
					background-size: cover;
					border-radius: 20px 20px 0 0;
				}
				.title {
					width: 100%;
					background: ${colors.dark};
				}
				.description {
					color: ${colors.dark};
					height: 130px;
				}
			`}</style>
		</a>
	);
}

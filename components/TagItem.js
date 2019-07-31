import colors from '../lib/colors';

export default function TagItem({ slug, name }) {
	return (
		<a href={`tag?slug=${slug}`}>
			<div>{name}</div>
			<style jsx>{`
				div {
					border: 1px solid ${colors.light};
					border-radius: 15px;
					padding: 10px 18px;
					text-transform: uppercase;
					font-weight: 100;
				}
			`}</style>
		</a>
	);
}

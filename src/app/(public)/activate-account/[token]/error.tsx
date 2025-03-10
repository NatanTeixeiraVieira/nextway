'use client';

export default function ErrorPage() {
	return (
		<div
			className="mx-auto mt-32 w-fit rounded border border-error bg-red-300 p-12"
			data-testid="invalid-token-content"
		>
			<p>O token informado não é válido.</p>
		</div>
	);
}

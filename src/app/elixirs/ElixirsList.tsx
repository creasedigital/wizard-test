import { IElixirRootObject } from "typings";
import Link from "next/link";

const fetchElixirs = async () => {
	const res = await fetch("https://wizard-world-api.herokuapp.com/Elixirs", {
		next: { revalidate: 3600 },
	});
	const elixirs: IElixirRootObject[] = await res.json();
	return elixirs;
};

const ElixirsList = async () => {
	const elixirs = await fetchElixirs();
	return (
		<div>
			{elixirs.map((elixir) => (
				<div
					key={elixir.id}
					className="flex flex-col m-4 p-2 lg:p-4 rounded-lg overflow-hidden h-auto border"
				>
					<Link href={`/elixirs/${elixir.id}`}>
						<div>
							<h2 className="font-semibold text-lg lg:text-2xl text-gray-700 hover:text-gray-400">
								Elixir Name: {elixir.name}
							</h2>
							{elixir.effect && (
								<p>Elixir Effect: {elixir.effect}</p>
							)}
						</div>
					</Link>
				</div>
			))}
		</div>
	);
};

export default ElixirsList;

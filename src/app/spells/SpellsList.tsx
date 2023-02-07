import { ISpellsRootObject } from "typings";
import Link from "next/link";

const fetchSpells = async () => {
	const res = await fetch("https://wizard-world-api.herokuapp.com/Spells", {
		next: { revalidate: 3600 },
	});
	const spells: ISpellsRootObject[] = await res.json();
	return spells;
};

const SpellsList = async () => {
	const spells = await fetchSpells();

	/* 	const handleAssignWizard = (id: string) => {
		console.log(id);
	};
 */
	return (
		<div>
			{spells.map((spell) => (
				<div
					key={spell.id}
					className="flex flex-col m-4 p-2 lg:p-4 rounded-lg overflow-hidden h-auto border"
				>
					<div className="flex justify-between">
						<div>
							<Link href={`/spells/${spell.id}`}>
								<h2 className="font-semibold text-lg lg:text-2xl text-gray-700 hover:text-gray-400">
									Spell Name: {spell.name}
								</h2>
							</Link>

							{spell.effect && (
								<p>Spell Effect: {spell.effect}</p>
							)}
						</div>
						<div>
							<button
								type="submit"
								className="bg-[#384679] block md:inline-block m-2 text-white font-bold py-2 px-4 rounded-lg "
								role={"submit"}
							>
								Assign to a wizard
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default SpellsList;

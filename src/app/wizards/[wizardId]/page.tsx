import { IWizardsRootObject } from "typings";
import { notFound } from "next/navigation";

type PageProps = {
	params: {
		wizardId: string;
	};
};

const fetchWizardById = async (wizardId: string) => {
	const res = await fetch(
		`https://wizard-world-api.herokuapp.com/Wizards/${wizardId}`,
	);

	const wizard: IWizardsRootObject = await res.json();
	return wizard;
};

const WizardPage = async ({ params: { wizardId } }: PageProps) => {
	const wizard = await fetchWizardById(wizardId);

	if (!wizard.id) return notFound();

	return (
		<div className="p-2">
			<p className="text-center mb-2">
				.👻 Get Your Favourite Potions. Muhuhuhuahahaha!!! 👽
			</p>
			<h2 className="text-center font-semibold text-md text-gray-700">
				<span className="font-semibold text-2xl text-gray-900">
					{`${
						wizard.firstName
							? `${
									wizard.firstName.toUpperCase() +
									" " +
									wizard.lastName.toUpperCase()
							  }`
							: wizard.lastName.toUpperCase()
					}`}
				</span>
			</h2>
			<ul className="flex flex-col gap-4 m-2 ">
				{wizard.elixirs.map((elixir) => (
					<li
						key={elixir.id}
						className="flex flex-col p-2 lg:p-4 rounded-lg overflow-hidden h-auto border"
					>
						Elixir Name: {elixir.name}
					</li>
				))}
			</ul>
		</div>
	);
};
export default WizardPage;

export async function generateStaticParams() {
	const res = await fetch("https://wizard-world-api.herokuapp.com/Wizards");
	const wizards: IWizardsRootObject[] = await res.json();
	return wizards.map((wizard) => ({ wizardId: wizard.id.toString() }));
}

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { IWizardsRootObject } from "typings";

const fetchWizards = async () => {
	const res = await fetch("https://wizard-world-api.herokuapp.com/Wizards", {
		next: { revalidate: 3600 },
	});
	const wizards: IWizardsRootObject[] = await res.json();
	return wizards;
};

const WizardsList = async () => {
	let wizards = [];
	wizards = await fetchWizards();

	return (
		<div>
			{wizards.length > 0 &&
				wizards.map((wizard) => (
					<p
						key={wizard.id}
						className="flex flex-col m-4 p-2 lg:p-4 rounded-lg overflow-hidden h-auto border"
					>
						<Link
							href={`/wizards/${wizard.id}`}
							className="font-semibold text-lg lg:text-2xl text-gray-700 hover:text-gray-400"
						>
							{`${
								wizard.firstName
									? `${
											wizard.firstName +
											" " +
											wizard.lastName
									  }`
									: wizard.lastName
							}`}
						</Link>
						{wizard.elixirs.length &&
							wizard.elixirs.map((elixir) => (
								<div key={elixir.id}>{elixir.name}</div>
							))}
					</p>
				))}
		</div>
	);
};

export default WizardsList;

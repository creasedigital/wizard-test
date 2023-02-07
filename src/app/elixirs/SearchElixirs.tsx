"use client";

import React, { useState, FormEvent } from "react";
import { buildQuery } from "@/utils/buildQuery";

const SearchElixirs = () => {
	const [name, setName] = useState("");
	const [difficulty, setDifficulty] = useState("");
	const elixirsDifficulties = [
		"",
		"Unknown",
		"Advanced",
		"Moderate",
		"Beginner",
		"OrdinaryWizardingLevel",
		"OneOfAKind",
	];

	const handleSelect = (type: string) => {
		setDifficulty(type);
		console.log(type);
	};

	const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		getSpells();
		setName("");
		setDifficulty("");
	};

	const getSpells = async (
		queryParams = { Name: name.trim(), Difficulty: difficulty.trim() },
	) => {
		let queryString = buildQuery(queryParams);
		console.log(queryString);

		const response = await fetch(
			`https://wizard-world-api.herokuapp.com/Elixirs${queryString}`,
		);
		const filteredElixir = response.json();
		console.log(filteredElixir);
		return filteredElixir;
	};

	return (
		<div>
			<form onSubmit={handleSearch} className="ml-4 mt-2 mb-4">
				<input
					type={"text"}
					value={name}
					placeholder="enter spell name"
					onChange={(e) => setName(e.target.value)}
					className="m-2 border px-4 py-2 rounded-lg"
				/>

				<select
					value={difficulty}
					onChange={(e) => handleSelect(e.target.value)}
					className="m-2 border px-4 py-2 rounded-lg"
				>
					{elixirsDifficulties.map((difficulty, i) => {
						return (
							<option key={i} value={difficulty}>
								{i === 0
									? "-select difficulty level-"
									: difficulty}
							</option>
						);
					})}
				</select>
				<button
					type="submit"
					className="bg-[#384679] block md:inline-block m-2 text-white font-bold py-2 px-4 rounded-lg "
					role={"button"}
				>
					Search
				</button>
			</form>
		</div>
	);
};
export default SearchElixirs;

"use client";

import React, { useState, FormEvent } from "react";
import { buildQuery } from "@/utils/buildQuery";

const SearchWizards = () => {
	const [fname, setFName] = useState("");
	const [lname, setLName] = useState("");

	const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		getWizards();
		setFName("");
		setLName("");
	};

	const getWizards = async (
		queryParams = { FirstName: fname.trim(), LastName: lname.trim() },
	) => {
		let queryString = buildQuery(queryParams);
		console.log(queryString);

		const response = await fetch(
			`https://wizard-world-api.herokuapp.com/Wizards${queryString}`,
		);
		const filteredWizard = response.json();
		console.log(filteredWizard);
		return filteredWizard;
	};

	return (
		<div>
			<form onSubmit={handleSearch} className="ml-4 mt-2 mb-4">
				<input
					type={"text"}
					value={fname}
					placeholder="enter wizard's firstname"
					onChange={(e) => setFName(e.target.value)}
					className="m-2 border px-4 py-2 rounded-lg"
				/>
				<input
					type={"text"}
					value={lname}
					placeholder="enter wizard's last name"
					onChange={(e) => setLName(e.target.value)}
					className="m-2 border px-4 py-2 rounded-lg"
				/>
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
export default SearchWizards;

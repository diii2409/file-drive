"use client";

import UploadButton from "@/app/_components/UploadButton";
import {useOrganization} from "@clerk/nextjs";
import {useQuery} from "convex/react";

import FileEmpty from "@/app/_components/FileEmpty";
import FileList from "@/app/_components/FileList";
import {Loading} from "@/app/_components/Loading";
import SearchBar from "@/app/_components/SearchBar";
import NoOrganization from "@/components/NoOrganization";
import {useState} from "react";
import {api} from "../../../../convex/_generated/api";

export default function FilesPage() {
	const {organization} = useOrganization();
	const [query, setQuery] = useState("");

	const orgId = organization?.id;
	const files = useQuery(api.file.getFiles, orgId ? {orgId, query} : "skip");

	const isLoading = files === undefined;
	return (
		<div className="w-full">
			{!organization ? (
				<NoOrganization />
			) : (
				<div className="flex flex-col items-center  pt-4 container gap-4 mx-auto lg:px-4">
					<div className="flex justify-between items-center w-full md:px-0">
						<div className="text-2xl font-bold cursor-pointer" onClick={() => setQuery("")}>
							Your files
						</div>
						{files && files.length > 0 && <UploadButton />}
					</div>

					<SearchBar className="w-full px-3 md:px-0" setQuery={setQuery} />
					{isLoading && <Loading className={"mt-40"} content="Loading your file ...!" />}
					{files && files.length === 0 && <FileEmpty />}
					{files && <FileList files={files} />}
				</div>
			)}
		</div>
	);
}

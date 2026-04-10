import { client } from "@/sanity/client";
import { Project } from "@/types/project";
import ProjectDisplay from "@/app/_components/ProjectDisplay";

const PROJECTS_QUERY = `*[
  _type == "Project"
]{ _id }`;

const SINGLE_QUERY = `*[_type == "Project" && _id == $_id][0]`;
const options = { next: { revalidate: 30 } };


export async function generateStaticParams() {
  const projectIDs = await client.fetch<Project[]>(PROJECTS_QUERY);
  return projectIDs.map((project) => (
    {_id : project._id}
  ))
}


export default async function Single({
  params
}: {
  params: Promise<{ _id : string }>,
}) {
    const project = await client.fetch<Project>(SINGLE_QUERY, await params, options);
    if(!project)
        return <p className="ml-15 mt-15 text-l">Pas de projet à cette adresse...</p>;
    return (
        <ProjectDisplay project={project}/>
    )
}
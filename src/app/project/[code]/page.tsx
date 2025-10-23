import { client } from "@/sanity/client";
import { Project } from "@/types/project";
import ProjectDisplay from "@/app/_components/ProjectDisplay";

const PROJECTS_QUERY = `*[
  _type == "Project"
][0...12]`;

const SINGLE_QUERY = `*[_type == "Project" && code == $code][0]`;
const options = { next: { revalidate: 30 } };


export async function generateStaticParams() {
  const projectCodes = await client.fetch<Project[]>(PROJECTS_QUERY);
  return projectCodes.map((project) => (
    {code : project.code}
  ))
}


export default async function Single({
  params
}: {
  params: Promise<{ code : string }>,
}) {
    const project = await client.fetch<Project>(SINGLE_QUERY, await params, options);
    if(!project)
        return false;
    return (
        <ProjectDisplay project={project}/>
    )
}
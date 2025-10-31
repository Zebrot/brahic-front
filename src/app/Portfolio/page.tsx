import ProjectCard from "../_components/ProjectCard";
import { client } from "@/sanity/client";
import { Project } from "@/types/project";
import { BackgroundProvider, Background } from "../context/BackgroundContext";

const POSTS_QUERY = `*[
  _type == "Project"
]|order(publishedAt desc)[0...12]`;
const options = { next: { revalidate: 30 } };


export default async function Index() {
  const projects = await client.fetch<Project[]>(POSTS_QUERY, {}, options);
  return (
    <BackgroundProvider>
      <div className="left-[20%] h-[93vh] w-[38%] absolute -z-1">
        <div className="min-h-full min-w-full w-auto">
          <Background/>
        </div>
      </div>
      <div className="flex flex-col">
          {projects.map((project, index)=> {
            if(!project.images)
              project.images = []
              return <ProjectCard key={index} project={project} index={index} />
        })}
      </div>   
    </BackgroundProvider>
  );
}


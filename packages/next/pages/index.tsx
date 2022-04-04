import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { strapi } from "../lib/services/strapi";
import styles from "../styles/Home.module.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const Home: NextPage = ({ global, projects }: any) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="h-screen bg-white/20">
        <div className="responsive-container h-full flex flex-col px-10">
          <div className="h-[100px] flex items-center justify-between">
            <div>{global.name}</div>
          </div>
          <div className="w-full md:w-[80%] h-full flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <div>
              <ReactMarkdown remarkPlugins={[gfm]}>
                {global.shortPresentation}
              </ReactMarkdown>
            </div>
            <div className="flex flex-row flex-wrap gap-y-3 gap-x-3 mt-3 justify-center md:justify-start">
              {global.stacks.split(",").map((item: string) => (
                <div key={item} className="bg-white/30 rounded py-1 px-2">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
      <section className="px-10 my-10 flex flex-row flex-wrap gap-x-[4%] gap-y-[80px] justify-between responsive-container">
        {projects.map((project: any) => (
          <div key={project.id} className="max-w-[100%] md:max-w-[46%]">
            <a href="#">
              <img
                src={project.attributes.thumbnail}
                alt={project.attributes.title}
                className="h-auto w-full rounded"
              />
              {project.attributes.category.data && (
                <div className="pt-6 text-sm text-white/50 uppercase">
                  {project.attributes.category.data.attributes.name}
                </div>
              )}
              <div className="pt-2 text-xl text-white">
                {project.attributes.title}
              </div>
            </a>
          </div>
        ))}
      </section>
      <section className="px-10 text-3xl md:text-6xl pt-[200px] text-center responsive-container flex flex-col flex-wrap">
        <div>{global.textAboveEmail}</div>
        <a href={`mailto:${global.email}`}>{global.email}</a>
      </section>
      <footer className="flex items-center flex-col my-[100px] responsive-container">
        <div className="h-[1px] w-[80%] bg-white/40 mb-[100px]" />
        <div className="flex flex-row flex-wrap">
          {global.socialNetworks.data.map((item: any) => (
            <div key={item.id} className="py-1 px-2">
              <a target="_blank" href={item.attributes.url} rel="noreferrer">
                {item.attributes.name}
              </a>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export async function getServerSideProps() {
  const global = await strapi.get("global", {
    params: { populate: "socialNetworks" },
  });

  const projects = await strapi.get("projects", {
    params: { populate: "category" },
  });

  return {
    props: {
      global: global.data.data.attributes,
      projects: projects.data.data,
    },
  };
}

export default Home;

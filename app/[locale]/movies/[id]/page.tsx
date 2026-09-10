import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MovieDetailPage from "@/components/movie-detail-page";
import { discoverableMovies, movieTitle } from "@/lib/catalog";
import { sitePath } from "@/lib/site-path";

type Props = { params: Promise<{ locale: string; id: string }> };
const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://cineyah.shadrat-almn7.chatgpt.site";

export function generateStaticParams(){
  return ["ar","en"].flatMap(locale=>discoverableMovies.map(movie=>({locale,id:movie.id})));
}

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {locale,id}=await params;
  const movie=discoverableMovies.find(item=>item.id===id);
  if(!movie||!["ar","en"].includes(locale))return{robots:{index:false}};
  const lang=locale as "ar"|"en";
  const title=locale==="ar"?`فيلم ${movieTitle(movie,"ar")} (${movie.year}) — Cineyah`:`${movie.titleEn} (${movie.year}) — Cineyah`;
  const description=locale==="ar"?movie.descriptionAr:movie.descriptionEn;
  const images=[movie.backdrop,movie.poster]
    .filter((value):value is string=>Boolean(value)&&!value!.startsWith("data:"))
    .map(sitePath);
  const route=sitePath(`/${locale}/movies/${id}/`);
  return{
    title,description,
    alternates:{canonical:route,languages:{ar:sitePath(`/ar/movies/${id}/`),en:sitePath(`/en/movies/${id}/`)}},
    openGraph:{title,description,type:"video.movie",url:`${origin}${route}`,locale:lang==="ar"?"ar_SA":"en_US",...(images.length?{images}:{})},
    robots:{index:true,follow:true},
  };
}

export default async function MoviePage({params}:Props){
  const {locale,id}=await params;
  const movie=discoverableMovies.find(item=>item.id===id);
  if(!movie||!["ar","en"].includes(locale))notFound();
  const lang=locale as "ar"|"en";
  const image=[movie.backdrop,movie.poster]
    .filter((value):value is string=>Boolean(value)&&!value!.startsWith("data:"))
    .map(sitePath);
  const data={
    "@context":"https://schema.org",
    "@type":"Movie",
    name:movie.titleEn,
    ...(movie.titleAr?{alternateName:movie.titleAr}:{}),
    description:lang==="ar"?movie.descriptionAr:movie.descriptionEn,
    duration:`PT${movie.runtimeMinutes}M`,
    ...(image.length?{image}:{}),
    datePublished:String(movie.year),
    genre:movie.genres,
    inLanguage:movie.languageEn,
    ...(movie.countryEn?{countryOfOrigin:{"@type":"Country",name:movie.countryEn}}:{}),
    ...(movie.director?{director:{"@type":"Person",name:movie.director}}:{}),
    ...(movie.cast?.length?{actor:movie.cast.map(name=>({"@type":"Person",name}))}:{}),
    url:`${origin}${sitePath(`/${locale}/movies/${id}/`)}`,
    ...(movie.licenseUrl?{license:movie.licenseUrl}:{}),
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\\u003c")}}/>
    <MovieDetailPage movie={movie} locale={lang}/>
  </>;
}

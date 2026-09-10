export type Locale = "ar" | "en";
export type ContentType = "movie" | "series";
export type Genre = "action"|"horror"|"comedy"|"drama"|"romance"|"thriller"|"crime"|"mystery"|"adventure"|"scifi"|"fantasy"|"war"|"western"|"family"|"animation"|"musical"|"history"|"biography"|"sport";
export type VideoSource = { label:"1080p"|"720p"|"480p"|"360p"; url:string };
export type Subtitle = { lang:"ar"|"en"; labelAr:string; labelEn:string; url:string };
export type Movie = { id:string; type:"movie"; genres:Genre[]; titleAr:string; titleEn:string; year:number; languageAr:string; languageEn:string; runtimeMinutes:number; poster:string; backdrop?:string; descriptionAr:string; descriptionEn:string; publishedAt:string; sources:VideoSource[]; subtitles:Subtitle[]; sourceUrl:string; licenseName:string; licenseUrl:string; attribution:string; downloadAllowed:boolean };
export type Episode = { id:string; number:number; titleAr:string; titleEn:string; runtimeMinutes:number; sources:VideoSource[]; subtitles:Subtitle[] };
export type Season = { number:number; accent:string; episodes:Episode[] };
export type Series = { id:string; type:"series"; genres:Genre[]; titleAr:string; titleEn:string; year:number; poster:string; descriptionAr:string; descriptionEn:string; seasons:Season[] };

export const movieCatalog: Movie[] = [{
  id:"ulises-2012",type:"movie",genres:["drama","mystery"],titleAr:"أوليسيس",titleEn:"Ulises",year:2012,languageAr:"الإسبانية",languageEn:"Spanish",runtimeMinutes:97,
  poster:"https://archive.org/download/ulises-largometraje-abel-amador-2012/__ia_thumb.jpg",
  backdrop:"https://archive.org/download/ulises-largometraje-abel-amador-2012/__ia_thumb.jpg",
  descriptionAr:"يعمل أوليسيس في دفن الجثث داخل حفرة سماد غريبة، ويوفر كل ما يستطيع ليأخذ والدته المريضة في الرحلة التي تحلم بها إلى ألاسكا. وبينما يستعيد محطات حياته، تبدأ ذكرياته وخياله في التداخل حتى يصبح الفصل بين الحقيقة وما يدور في عقله أكثر صعوبة.",
  descriptionEn:"Ulises buries bodies in an unusual composting pit while saving for the trip his ill mother has always dreamed of taking to Alaska. As he revisits his life, memory and imagination begin to overlap, making reality increasingly difficult to separate from what is unfolding in his mind.",
  publishedAt:"2026-09-10",sources:[{label:"1080p",url:"https://archive.org/download/ulises-largometraje-abel-amador-2012/Ulises_Largometraje_Abel_Amador_2012.mp4"}],subtitles:[],
  sourceUrl:"https://archive.org/details/ulises-largometraje-abel-amador-2012",licenseName:"CC BY 4.0",licenseUrl:"https://creativecommons.org/licenses/by/4.0/",attribution:"Ulises (2012), Abel Amador Alcalá",downloadAllowed:true,
}];

export const publicMovies = movieCatalog.filter(movie => movie.runtimeMinutes >= 90 && movie.year >= 2005 && movie.sources.length > 0);

export function formatDuration(minutes:number,locale:Locale) { const hours=Math.floor(minutes/60), remaining=minutes%60; return locale === "en" ? [hours ? `${hours}h` : "", remaining ? `${remaining}m` : ""].filter(Boolean).join(" ") : [hours ? `${hours} ساعة` : "", remaining ? `${remaining} دقيقة` : ""].filter(Boolean).join(" و"); }

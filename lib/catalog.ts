export type Locale = "ar" | "en";
export type ContentType = "movie" | "series";
export type Genre = "action"|"horror"|"comedy"|"drama"|"romance"|"thriller"|"crime"|"mystery"|"adventure"|"scifi"|"fantasy"|"war"|"western"|"family"|"animation"|"musical"|"history"|"biography"|"sport";
export type VideoSource = {
  label:"1080p"|"720p"|"480p"|"360p";
  url:string;
  mimeType?:string;
  sizeBytes?:number;
  videoFormat?:string;
};
export type Subtitle = { lang:"ar"|"en"; labelAr:string; labelEn:string; url:string };
export type LegalLink = { labelAr:string; labelEn:string; url:string; kind:"watch"|"rent"|"buy"|"info" };
export type Movie = {
  id:string;
  type:"movie";
  genres:Genre[];
  mainGenre:Genre;
  titleAr?:string;
  titleEn:string;
  titleOriginal?:string;
  year:number;
  languageAr:string;
  languageEn:string;
  runtimeMinutes:number;
  poster:string;
  backdrop?:string;
  storyAr?:string;
  storyEn?:string;
  descriptionAr:string;
  descriptionEn:string;
  countryAr?:string;
  countryEn?:string;
  director?:string;
  cast?:string[];
  publishedAt:string;
  sources:VideoSource[];
  subtitles:Subtitle[];
  subtitleStatusAr?:string;
  subtitleStatusEn?:string;
  contentSourceName?:string;
  contentSourceUrl?:string;
  originalSourceName?:string;
  originalSourceUrl?:string;
  metadataSourceName?:string;
  metadataSourceUrl?:string;
  licenseName?:string;
  licenseUrl?:string;
  attribution?:string;
  copyrightHolder?:string;
  commercialUseAllowed:boolean;
  derivativesAllowed:boolean;
  verificationDate:string;
  downloadAllowed:boolean;
  downloadUrl?:string;
  rightsStatusAr?:string;
  rightsStatusEn?:string;
  legalLinks?:LegalLink[];
};
export type Episode = { id:string; number:number; titleAr:string; titleEn:string; runtimeMinutes:number; sources:VideoSource[]; subtitles:Subtitle[] };
export type Season = { number:number; accent:string; episodes:Episode[] };
export type Series = { id:string; type:"series"; genres:Genre[]; titleAr:string; titleEn:string; year:number; poster:string; descriptionAr:string; descriptionEn:string; seasons:Season[] };

export const movieCatalog: Movie[] = [
  {
    id:"valkaama-2010",
    type:"movie",
    genres:["drama","romance"],
    mainGenre:"drama",
    titleAr:"فالكاما",
    titleEn:"Valkaama",
    titleOriginal:"Valkaama",
    year:2010,
    languageAr:"الإنجليزية",
    languageEn:"English",
    runtimeMinutes:93,
    poster:"https://archive.org/download/valkaama/Valkaama_Poster_Small.jpg",
    backdrop:"https://archive.org/download/valkaama/valkaama.thumbs/Valkaama_1080p_003600.jpg",
    storyAr:"يسافر شابان عبر شمال أوروبا بحثًا عن مكان بعيد اسمه فالكاما، لكن الطريق يكشف اختلاف نظرتهما إلى الحب والحرية والانتماء. دراما مستقلة هادئة عن الصداقة والرحيل والبحث عن بيت.",
    storyEn:"Two young people travel through northern Europe in search of a remote place called Valkaama. Their journey exposes different ideas about love, freedom and belonging in a quiet independent drama about friendship, departure and finding home.",
    descriptionAr:"فيلم روائي مستقل طويل من إنتاج ألماني بولندي، نشره صانعه تيم باومان رسميًا كمشروع سينمائي مفتوح يسمح بالمشاهدة وإعادة الاستخدام التجاري والمشتقات مع النسب والمشاركة بالمثل.",
    descriptionEn:"A German-Polish independent feature officially released by filmmaker Tim Baumann as an open movie permitting commercial reuse and derivatives with attribution and share-alike.",
    countryAr:"ألمانيا / بولندا",
    countryEn:"Germany / Poland",
    director:"Tim Baumann",
    publishedAt:"2026-09-11",
    sources:[{
      label:"480p",
      url:"https://archive.org/download/valkaama/Valkaama_1080p.mp4",
      mimeType:"video/mp4",
      videoFormat:"H.264/AAC MP4",
      sizeBytes:576111669,
    }],
    subtitles:[
      {lang:"ar",labelAr:"العربية — ترجمة Cineyah",labelEn:"Arabic — Cineyah translation",url:"/subtitles/valkaama-ar.vtt"},
      {lang:"en",labelAr:"الإنجليزية — رسمية",labelEn:"English — official",url:"/subtitles/valkaama-en.vtt"},
    ],
    subtitleStatusAr:"ترجمة عربية كاملة أنشأتها Cineyah من ملف الترجمة الإنجليزية الرسمي، مع الحفاظ على 705 توقيتات.",
    subtitleStatusEn:"Complete Cineyah Arabic translation derived from the official English subtitles, preserving all 705 cue timings.",
    contentSourceName:"Internet Archive — creator upload",
    contentSourceUrl:"https://archive.org/details/valkaama",
    originalSourceName:"Valkaama official website",
    originalSourceUrl:"https://www.valkaama.com/index.php?page=valkaama&l=en",
    metadataSourceName:"Valkaama official website / Internet Archive metadata",
    metadataSourceUrl:"https://archive.org/metadata/valkaama",
    licenseName:"CC BY-SA 4.0",
    licenseUrl:"https://creativecommons.org/licenses/by-sa/4.0/",
    attribution:"Valkaama (2010), Tim Baumann and contributors. Arabic subtitle adaptation by Cineyah, 2026. CC BY-SA 4.0.",
    copyrightHolder:"Tim Baumann and Valkaama contributors",
    commercialUseAllowed:true,
    derivativesAllowed:true,
    verificationDate:"2026-09-11",
    downloadAllowed:true,
    downloadUrl:"https://archive.org/download/valkaama/Valkaama_1080p.mp4",
    rightsStatusAr:"تحققنا من صفحة المشروع الرسمية، وبيانات النسخة التي رفعها المخرج، ورخصة CC BY-SA، والمدة والصوت وطلبات النطاق والتشغيل داخل المشغل.",
    rightsStatusEn:"Verified against the official project page, the filmmaker's uploaded copy, its CC BY-SA licence, runtime, audio, byte-range support and in-player playback.",
  },
];

export function movieTitle(movie:Movie,locale:Locale){
  return locale === "ar" ? (movie.titleAr || movie.titleOriginal || movie.titleEn) : movie.titleEn;
}

export function formatDuration(minutes:number,locale:Locale) {
  const hours=Math.floor(minutes/60), remaining=minutes%60;
  return locale === "en"
    ? [hours ? `${hours}h` : "", remaining ? `${remaining}m` : ""].filter(Boolean).join(" ")
    : [hours ? `${hours} ساعة` : "", remaining ? `${remaining} دقيقة` : ""].filter(Boolean).join(" و");
}

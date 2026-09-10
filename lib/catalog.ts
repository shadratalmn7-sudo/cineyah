export type Locale = "ar" | "en";
export type ContentType = "movie" | "series";
export type Genre = "action"|"horror"|"comedy"|"drama"|"romance"|"thriller"|"crime"|"mystery"|"adventure"|"scifi"|"fantasy"|"war"|"western"|"family"|"animation"|"musical"|"history"|"biography"|"sport";
export type VideoSource = { label:"1080p"|"720p"|"480p"|"360p"; url:string };
export type Subtitle = { lang:"ar"|"en"; labelAr:string; labelEn:string; url:string };
export type LegalLink = { labelAr:string; labelEn:string; url:string; kind:"watch"|"rent"|"buy"|"info" };
export type Movie = {
  id:string;
  type:"movie";
  genres:Genre[];
  titleAr:string;
  titleEn:string;
  year:number;
  languageAr:string;
  languageEn:string;
  runtimeMinutes:number;
  poster:string;
  backdrop?:string;
  descriptionAr:string;
  descriptionEn:string;
  publishedAt:string;
  sources:VideoSource[];
  subtitles:Subtitle[];
  sourceUrl:string;
  licenseName?:string;
  licenseUrl?:string;
  attribution?:string;
  downloadAllowed:boolean;
  legalLinks?:LegalLink[];
};
export type Episode = { id:string; number:number; titleAr:string; titleEn:string; runtimeMinutes:number; sources:VideoSource[]; subtitles:Subtitle[] };
export type Season = { number:number; accent:string; episodes:Episode[] };
export type Series = { id:string; type:"series"; genres:Genre[]; titleAr:string; titleEn:string; year:number; poster:string; descriptionAr:string; descriptionEn:string; seasons:Season[] };

function escapeXml(value:string){
  return value.replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&apos;"}[char]??char));
}

function titlePoster(title:string,subtitle:string){
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#141b2f"/><stop offset="1" stop-color="#050811"/></linearGradient></defs><rect width="800" height="1200" fill="url(#g)"/><circle cx="650" cy="180" r="220" fill="#e72b2b" opacity=".18"/><text x="60" y="880" fill="#f7f8fc" font-family="Arial,sans-serif" font-size="62" font-weight="700">${escapeXml(title)}</text><text x="60" y="960" fill="#aeb8ca" font-family="Arial,sans-serif" font-size="34">${escapeXml(subtitle)}</text><text x="60" y="1080" fill="#e72b2b" font-family="Arial,sans-serif" font-size="28" font-weight="700" letter-spacing="6">CINEYAH</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const movieCatalog: Movie[] = [
  {
    id:"spider-man-no-way-home-2021",type:"movie",genres:["action","adventure","fantasy","scifi"],titleAr:"الرجل العنكبوت: لا طريق للوطن",titleEn:"Spider-Man: No Way Home",year:2021,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:148,
    poster:titlePoster("Spider-Man: No Way Home","2021"),
    descriptionAr:"بعد انكشاف هوية بيتر باركر أمام العالم، يلجأ إلى دكتور سترينج بحثًا عن حل يعيد حياته إلى طبيعتها، لكن محاولة تغيير ما يعرفه الناس تفتح بابًا لمشكلات قادمة من عوالم أخرى.",
    descriptionEn:"After Peter Parker's identity becomes public, he asks Doctor Strange for help restoring his normal life. The attempt to change what the world knows goes wrong and brings dangerous visitors from other realities.",
    publishedAt:"2026-09-10",sources:[],subtitles:[],
    sourceUrl:"https://www.justwatch.com/us/movie/spider-man-no-way-home",downloadAllowed:false,
    legalLinks:[{kind:"watch",labelAr:"اعثر على أماكن المشاهدة القانونية",labelEn:"Find legal streaming options",url:"https://www.justwatch.com/us/movie/spider-man-no-way-home"}],
  },
  {
    id:"dune-part-two-2024",type:"movie",genres:["action","adventure","drama","scifi"],titleAr:"كثيب: الجزء الثاني",titleEn:"Dune: Part Two",year:2024,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:167,
    poster:titlePoster("Dune: Part Two","2024"),
    descriptionAr:"يواصل بول أتريدس رحلته بين شعب الفريمن على كوكب أراكيس، محاولًا الموازنة بين علاقاته الشخصية والدور الكبير الذي يُدفع نحوه، بينما يقترب الصراع مع آل هاركونن من مرحلة حاسمة.",
    descriptionEn:"Paul Atreides continues his journey with the Fremen on Arrakis, balancing personal loyalties with the larger role others expect him to play as the conflict with House Harkonnen reaches a decisive stage.",
    publishedAt:"2026-09-10",sources:[],subtitles:[],
    sourceUrl:"https://www.justwatch.com/us/movie/dune-part-two-2023",downloadAllowed:false,
    legalLinks:[{kind:"watch",labelAr:"اعثر على أماكن المشاهدة القانونية",labelEn:"Find legal streaming options",url:"https://www.justwatch.com/us/movie/dune-part-two-2023"}],
  },
  {
    id:"the-batman-2022",type:"movie",genres:["action","crime","drama","mystery","thriller"],titleAr:"ذا باتمان",titleEn:"The Batman",year:2022,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:177,
    poster:titlePoster("The Batman","2022"),
    descriptionAr:"في سنواته الأولى كمحارب للجريمة، يتتبع باتمان سلسلة جرائم تقوده إلى ألغاز مرتبطة بمدينة غوثام ونخبها، ويضطر إلى إعادة النظر في الطريقة التي يفهم بها العدالة ودوره داخل المدينة.",
    descriptionEn:"Early in his career as Gotham's vigilante, Batman follows a chain of crimes that exposes secrets tied to the city and its powerful figures, forcing him to rethink what justice and his own role in Gotham really mean.",
    publishedAt:"2026-09-10",sources:[],subtitles:[],
    sourceUrl:"https://www.justwatch.com/us/movie/the-batman",downloadAllowed:false,
    legalLinks:[{kind:"watch",labelAr:"اعثر على أماكن المشاهدة القانونية",labelEn:"Find legal streaming options",url:"https://www.justwatch.com/us/movie/the-batman"}],
  },
  {
    id:"interstellar-2014",type:"movie",genres:["adventure","drama","scifi"],titleAr:"بين النجوم",titleEn:"Interstellar",year:2014,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:169,
    poster:titlePoster("Interstellar","2014"),
    descriptionAr:"مع تدهور ظروف الحياة على الأرض، ينضم طيار سابق إلى مهمة فضائية تبحث عن مستقبل يمكن للبشر الاعتماد عليه، بينما يصبح الزمن والمسافة جزءًا أساسيًا من ثمن الرحلة.",
    descriptionEn:"As conditions on Earth deteriorate, a former pilot joins a space mission searching for a future humanity can rely on, while time and distance become part of the personal cost of the journey.",
    publishedAt:"2026-09-10",sources:[],subtitles:[],
    sourceUrl:"https://www.justwatch.com/us/movie/interstellar",downloadAllowed:false,
    legalLinks:[{kind:"watch",labelAr:"اعثر على أماكن المشاهدة القانونية",labelEn:"Find legal streaming options",url:"https://www.justwatch.com/us/movie/interstellar"}],
  },
  {
    id:"ulises-2012",type:"movie",genres:["drama","mystery"],titleAr:"أوليسيس",titleEn:"Ulises",year:2012,languageAr:"الإسبانية",languageEn:"Spanish",runtimeMinutes:97,
    poster:"https://archive.org/download/ulises-largometraje-abel-amador-2012/__ia_thumb.jpg",
    backdrop:"/backdrops/ulises-2012.jpg",
    descriptionAr:"يعمل أوليسيس في دفن الجثث داخل حفرة سماد غريبة، ويوفر كل ما يستطيع ليأخذ والدته المريضة في الرحلة التي تحلم بها إلى ألاسكا. وبينما يستعيد محطات حياته، تبدأ ذكرياته وخياله في التداخل حتى يصبح الفصل بين الحقيقة وما يدور في عقله أكثر صعوبة.",
    descriptionEn:"Ulises buries bodies in an unusual composting pit while saving for the trip his ill mother has always dreamed of taking to Alaska. As he revisits his life, memory and imagination begin to overlap, making reality increasingly difficult to separate from what is unfolding in his mind.",
    publishedAt:"2026-09-10",sources:[{label:"1080p",url:"https://archive.org/download/ulises-largometraje-abel-amador-2012/Ulises_Largometraje_Abel_Amador_2012.mp4"}],subtitles:[],
    sourceUrl:"https://archive.org/details/ulises-largometraje-abel-amador-2012",licenseName:"CC BY 4.0",licenseUrl:"https://creativecommons.org/licenses/by/4.0/",attribution:"Ulises (2012), Abel Amador Alcalá",downloadAllowed:true,
    legalLinks:[{kind:"info",labelAr:"المصدر والترخيص",labelEn:"Source and license",url:"https://archive.org/details/ulises-largometraje-abel-amador-2012"}],
  }
];

export const discoverableMovies = movieCatalog.filter(movie => movie.runtimeMinutes >= 90 && movie.year >= 2005);
export const publicMovies = discoverableMovies.filter(movie => movie.sources.length > 0);

export function formatDuration(minutes:number,locale:Locale) { const hours=Math.floor(minutes/60), remaining=minutes%60; return locale === "en" ? [hours ? `${hours}h` : "", remaining ? `${remaining}m` : ""].filter(Boolean).join(" ") : [hours ? `${hours} ساعة` : "", remaining ? `${remaining} دقيقة` : ""].filter(Boolean).join(" و"); }

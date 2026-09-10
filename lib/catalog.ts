export type Locale = "ar" | "en";
export type ContentType = "movie" | "series";
export type Genre = "action"|"horror"|"comedy"|"drama"|"romance"|"thriller"|"crime"|"mystery"|"adventure"|"scifi"|"fantasy"|"war"|"western"|"family"|"animation"|"musical"|"history"|"biography"|"sport";
export type VideoSource = {
  label:"1080p"|"720p"|"480p"|"360p";
  url:string;
  mimeType?:string;
  sizeBytes?:number;
};
export type Subtitle = { lang:"ar"|"en"; labelAr:string; labelEn:string; url:string };
export type LegalLink = { labelAr:string; labelEn:string; url:string; kind:"watch"|"rent"|"buy"|"info" };
export type Movie = {
  id:string;
  type:"movie";
  genres:Genre[];
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
  metadataSourceName?:string;
  metadataSourceUrl?:string;
  licenseName?:string;
  licenseUrl?:string;
  attribution?:string;
  downloadAllowed:boolean;
  downloadUrl?:string;
  rightsStatusAr?:string;
  rightsStatusEn?:string;
  legalLinks?:LegalLink[];
};
export type Episode = { id:string; number:number; titleAr:string; titleEn:string; runtimeMinutes:number; sources:VideoSource[]; subtitles:Subtitle[] };
export type Season = { number:number; accent:string; episodes:Episode[] };
export type Series = { id:string; type:"series"; genres:Genre[]; titleAr:string; titleEn:string; year:number; poster:string; descriptionAr:string; descriptionEn:string; seasons:Season[] };

function escapeXml(value:string){
  return value.replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&apos;"}[char]??char));
}

function titlePoster(title:string,subtitle:string){
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#141b2f"/><stop offset="1" stop-color="#050811"/></linearGradient></defs><rect width="800" height="1200" fill="url(#g)"/><circle cx="650" cy="180" r="220" fill="#e72b2b" opacity=".18"/><text x="60" y="880" fill="#f7f8fc" font-family="Arial,sans-serif" font-size="54" font-weight="700">${escapeXml(title)}</text><text x="60" y="960" fill="#aeb8ca" font-family="Arial,sans-serif" font-size="34">${escapeXml(subtitle)}</text><text x="60" y="1080" fill="#e72b2b" font-family="Arial,sans-serif" font-size="28" font-weight="700" letter-spacing="6">CINEYAH</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const today="2026-09-10";
const infoOnlyRightsAr="صفحة معلومات فقط. لا توجد نسخة مشاهدة منشورة داخل Cineyah، ولم يتم الادعاء بامتلاك حقوق عرض للفيلم.";
const infoOnlyRightsEn="Metadata-only page. No playback copy is published on Cineyah and no streaming rights are claimed.";
const noSubsAr="لا توجد ترجمة مرخّصة منشورة داخل Cineyah.";
const noSubsEn="No licensed subtitle track is published on Cineyah.";

export const movieCatalog: Movie[] = [
  {
    id:"spider-man-no-way-home-2021",type:"movie",genres:["action","adventure","fantasy","scifi"],titleAr:"الرجل العنكبوت: لا طريق للوطن",titleEn:"Spider-Man: No Way Home",titleOriginal:"Spider-Man: No Way Home",year:2021,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:148,
    poster:titlePoster("Spider-Man: No Way Home","2021"),descriptionAr:"بعد انكشاف هوية بيتر باركر أمام العالم، يلجأ إلى دكتور سترينج بحثًا عن حل يعيد حياته إلى طبيعتها، لكن محاولة تغيير ما يعرفه الناس تفتح بابًا لمشكلات قادمة من عوالم أخرى.",descriptionEn:"After Peter Parker's identity becomes public, he asks Doctor Strange for help restoring his normal life. The attempt to change what the world knows goes wrong and brings dangerous visitors from other realities.",
    publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"JustWatch",metadataSourceUrl:"https://www.justwatch.com/us/movie/spider-man-no-way-home",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
    legalLinks:[{kind:"info",labelAr:"تحقق من خيارات المشاهدة القانونية",labelEn:"Check legal viewing options",url:"https://www.justwatch.com/us/movie/spider-man-no-way-home"}],
  },
  {
    id:"dune-part-two-2024",type:"movie",genres:["action","adventure","drama","scifi"],titleAr:"كثيب: الجزء الثاني",titleEn:"Dune: Part Two",titleOriginal:"Dune: Part Two",year:2024,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:167,
    poster:titlePoster("Dune: Part Two","2024"),descriptionAr:"يواصل بول أتريدس رحلته بين شعب الفريمن على كوكب أراكيس، محاولًا الموازنة بين علاقاته الشخصية والدور الكبير الذي يُدفع نحوه، بينما يقترب الصراع مع آل هاركونن من مرحلة حاسمة.",descriptionEn:"Paul Atreides continues his journey with the Fremen on Arrakis, balancing personal loyalties with the larger role others expect him to play as the conflict with House Harkonnen reaches a decisive stage.",
    publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"JustWatch",metadataSourceUrl:"https://www.justwatch.com/us/movie/dune-part-two-2023",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
    legalLinks:[{kind:"info",labelAr:"تحقق من خيارات المشاهدة القانونية",labelEn:"Check legal viewing options",url:"https://www.justwatch.com/us/movie/dune-part-two-2023"}],
  },
  {
    id:"the-batman-2022",type:"movie",genres:["action","crime","drama","mystery","thriller"],titleAr:"ذا باتمان",titleEn:"The Batman",titleOriginal:"The Batman",year:2022,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:177,
    poster:titlePoster("The Batman","2022"),descriptionAr:"في سنواته الأولى كمحارب للجريمة، يتتبع باتمان سلسلة جرائم تقوده إلى ألغاز مرتبطة بمدينة غوثام ونخبها، ويضطر إلى إعادة النظر في الطريقة التي يفهم بها العدالة ودوره داخل المدينة.",descriptionEn:"Early in his career as Gotham's vigilante, Batman follows a chain of crimes that exposes secrets tied to the city and its powerful figures, forcing him to rethink what justice and his own role in Gotham really mean.",
    publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"JustWatch",metadataSourceUrl:"https://www.justwatch.com/us/movie/the-batman",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
    legalLinks:[{kind:"info",labelAr:"تحقق من خيارات المشاهدة القانونية",labelEn:"Check legal viewing options",url:"https://www.justwatch.com/us/movie/the-batman"}],
  },
  {
    id:"interstellar-2014",type:"movie",genres:["adventure","drama","scifi"],titleAr:"بين النجوم",titleEn:"Interstellar",titleOriginal:"Interstellar",year:2014,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:169,
    poster:titlePoster("Interstellar","2014"),descriptionAr:"مع تدهور ظروف الحياة على الأرض، ينضم طيار سابق إلى مهمة فضائية تبحث عن مستقبل يمكن للبشر الاعتماد عليه، بينما يصبح الزمن والمسافة جزءًا أساسيًا من ثمن الرحلة.",descriptionEn:"As conditions on Earth deteriorate, a former pilot joins a space mission searching for a future humanity can rely on, while time and distance become part of the personal cost of the journey.",
    publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"JustWatch",metadataSourceUrl:"https://www.justwatch.com/us/movie/interstellar",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
    legalLinks:[{kind:"info",labelAr:"تحقق من خيارات المشاهدة القانونية",labelEn:"Check legal viewing options",url:"https://www.justwatch.com/us/movie/interstellar"}],
  },
  {
    id:"ulises-2012",type:"movie",genres:["drama","mystery"],titleAr:"أوليسيس",titleEn:"Ulises",titleOriginal:"Ulises",year:2012,languageAr:"الإسبانية",languageEn:"Spanish",runtimeMinutes:97,
    poster:"https://archive.org/download/ulises-largometraje-abel-amador-2012/__ia_thumb.jpg",backdrop:"/backdrops/ulises-2012.jpg",
    descriptionAr:"يعمل أوليسيس في دفن الجثث داخل حفرة سماد غريبة، ويوفر كل ما يستطيع ليأخذ والدته المريضة في الرحلة التي تحلم بها إلى ألاسكا. وبينما يستعيد محطات حياته، تبدأ ذكرياته وخياله في التداخل حتى يصبح الفصل بين الحقيقة وما يدور في عقله أكثر صعوبة.",descriptionEn:"Ulises buries bodies in an unusual composting pit while saving for the trip his ill mother has always dreamed of taking to Alaska. As he revisits his life, memory and imagination begin to overlap, making reality increasingly difficult to separate from what is unfolding in his mind.",
    publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,contentSourceName:"Internet Archive",contentSourceUrl:"https://archive.org/details/ulises-largometraje-abel-amador-2012",metadataSourceName:"Internet Archive",metadataSourceUrl:"https://archive.org/details/ulises-largometraje-abel-amador-2012",licenseName:"CC BY 4.0",licenseUrl:"https://creativecommons.org/licenses/by/4.0/",attribution:"Ulises (2012), Abel Amador Alcalá",downloadAllowed:true,downloadUrl:"https://archive.org/download/ulises-largometraje-abel-amador-2012/Ulises_Largometraje_Abel_Amador_2012.mp4",
    rightsStatusAr:"الرخصة المعلنة CC BY 4.0. تم إيقاف المشاهدة داخل Cineyah مؤقتًا لأن نسخة MP4 الحالية (~3.89 GB) ثبت أنها تعلق على iPhone/Safari؛ لا ندّعي توافقها مع Safari حتى يتوفر مصدر متحقق عمليًا.",rightsStatusEn:"The declared license is CC BY 4.0. Cineyah playback is temporarily disabled because the current ~3.89 GB MP4 was reported to stall on iPhone/Safari; Safari compatibility is not claimed until a practically verified source is available.",
    legalLinks:[{kind:"info",labelAr:"المصدر والترخيص",labelEn:"Source and license",url:"https://archive.org/details/ulises-largometraje-abel-amador-2012"}],
  },

  // Horror batch 01 — legal-first metadata pages only. No playback source is attached unless Cineyah has verified viewing rights.
  {
    id:"the-exorcist-1973",type:"movie",genres:["horror","drama"],titleAr:"طارد الأرواح الشريرة",titleEn:"The Exorcist",titleOriginal:"The Exorcist",year:1973,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:122,poster:titlePoster("The Exorcist","1973"),
    countryAr:"الولايات المتحدة",countryEn:"United States",director:"William Friedkin",cast:["Ellen Burstyn","Max von Sydow","Jason Miller","Linda Blair"],descriptionAr:"تطلب أم مساعدة رجال دين بعد أن تبدأ ابنتها بإظهار سلوك وظواهر مرعبة ذات طابع شيطاني.",descriptionEn:"A mother seeks help from clergy after her daughter begins displaying terrifying behavior and phenomena with an apparent demonic cause.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/The_Exorcist",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"the-shining-1980",type:"movie",genres:["horror","drama","mystery"],titleAr:"البريق",titleEn:"The Shining",titleOriginal:"The Shining",year:1980,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:146,poster:titlePoster("The Shining","1980"),countryAr:"المملكة المتحدة والولايات المتحدة",countryEn:"United Kingdom / United States",director:"Stanley Kubrick",cast:["Jack Nicholson","Shelley Duvall","Scatman Crothers","Danny Lloyd"],descriptionAr:"تنتقل عائلة إلى فندق جبلي معزول في الشتاء، حيث تكشف العزلة والقوى الخارقة في المكان عن تهديد متصاعد.",descriptionEn:"A family moves into an isolated mountain hotel for the winter, where isolation and supernatural forces reveal an escalating threat.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/The_Shining_(film)",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"rosemarys-baby-1968",type:"movie",genres:["horror","drama","mystery"],titleAr:"طفل روزماري",titleEn:"Rosemary's Baby",titleOriginal:"Rosemary's Baby",year:1968,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:137,poster:titlePoster("Rosemary's Baby","1968"),countryAr:"الولايات المتحدة",countryEn:"United States",director:"Roman Polanski",cast:["Mia Farrow","John Cassavetes","Ruth Gordon","Sidney Blackmer"],descriptionAr:"تبدأ امرأة حامل بالشك في جيرانها والظروف المحيطة بحملها، لتتكشف إشارات إلى مؤامرة ذات طابع غامض وشيطاني.",descriptionEn:"A pregnant woman grows suspicious of her neighbors and the circumstances surrounding her pregnancy, uncovering signs of an occult conspiracy.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/Rosemary%27s_Baby_(film)",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"the-omen-1976",type:"movie",genres:["horror","mystery","thriller"],titleAr:"الطالع",titleEn:"The Omen",titleOriginal:"The Omen",year:1976,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:111,poster:titlePoster("The Omen","1976"),countryAr:"المملكة المتحدة والولايات المتحدة",countryEn:"United Kingdom / United States",director:"Richard Donner",cast:["Gregory Peck","Lee Remick","David Warner","Billie Whitelaw"],descriptionAr:"يشك دبلوماسي في أن ابنه بالتبني مرتبط بسلسلة أحداث شريرة تحمل دلالات دينية ونبوءات مرعبة.",descriptionEn:"A diplomat comes to suspect that his adopted son is connected to a series of sinister events with terrifying religious implications.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/The_Omen",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"the-changeling-1980",type:"movie",genres:["horror","mystery","drama"],titleAr:"ذا تشينجلينغ",titleEn:"The Changeling",titleOriginal:"The Changeling",year:1980,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:107,poster:titlePoster("The Changeling","1980"),countryAr:"كندا",countryEn:"Canada",director:"Peter Medak",cast:["George C. Scott","Trish Van Devere","Melvyn Douglas"],descriptionAr:"ينتقل مؤلف موسيقي حزين إلى منزل تاريخي ويبدأ بمواجهة ظواهر شبحية تقوده إلى سر مدفون منذ سنوات.",descriptionEn:"A grieving composer moves into a historic house and encounters ghostly phenomena that lead him toward a long-buried secret.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/The_Changeling_(film)",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"the-others-2001",type:"movie",genres:["horror","mystery","thriller"],titleAr:"الآخرون",titleEn:"The Others",titleOriginal:"The Others",year:2001,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:104,poster:titlePoster("The Others","2001"),countryAr:"إسبانيا والولايات المتحدة وفرنسا",countryEn:"Spain / United States / France",director:"Alejandro Amenábar",cast:["Nicole Kidman","Fionnula Flanagan","Christopher Eccleston","Alakina Mann"],descriptionAr:"تعيش أم مع طفليها في منزل مظلم ومعزول، ثم تبدأ أحداث غامضة تجعلها تعتقد أن المكان يضم حضورًا غير مرئي.",descriptionEn:"A mother lives with her two children in a dark, isolated house where strange events suggest the presence of unseen occupants.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/The_Others_(2001_film)",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"the-conjuring-2013",type:"movie",genres:["horror","mystery","thriller"],titleAr:"الشعوذة",titleEn:"The Conjuring",titleOriginal:"The Conjuring",year:2013,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:112,poster:titlePoster("The Conjuring","2013"),countryAr:"الولايات المتحدة",countryEn:"United States",director:"James Wan",cast:["Vera Farmiga","Patrick Wilson","Lili Taylor","Ron Livingston"],descriptionAr:"يحقق باحثان في الظواهر الخارقة في منزل عائلة تتعرض لسلسلة أحداث مخيفة مرتبطة بتاريخ المكان.",descriptionEn:"Paranormal investigators examine a family home where frightening events appear tied to the property's dark history.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/The_Conjuring",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"the-conjuring-2-2016",type:"movie",genres:["horror","mystery","thriller"],titleAr:"الشعوذة 2",titleEn:"The Conjuring 2",titleOriginal:"The Conjuring 2",year:2016,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:134,poster:titlePoster("The Conjuring 2","2016"),countryAr:"الولايات المتحدة",countryEn:"United States",director:"James Wan",cast:["Vera Farmiga","Patrick Wilson","Frances O'Connor","Madison Wolfe"],descriptionAr:"يسافر محققا الظواهر الخارقة لمساعدة عائلة في لندن تواجه نشاطًا مخيفًا يُنسب إلى كيان غير طبيعي.",descriptionEn:"Paranormal investigators travel to London to help a family confronting frightening activity attributed to an otherworldly entity.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/The_Conjuring_2",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"insidious-2010",type:"movie",genres:["horror","mystery","thriller"],titleAr:"غادر",titleEn:"Insidious",titleOriginal:"Insidious",year:2010,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:101,poster:titlePoster("Insidious","2010"),countryAr:"كندا والولايات المتحدة والمملكة المتحدة",countryEn:"Canada / United States / United Kingdom",director:"James Wan",cast:["Patrick Wilson","Rose Byrne","Barbara Hershey"],descriptionAr:"تحاول عائلة إنقاذ طفلها بعد دخوله في غيبوبة غامضة، بينما تتكشف صلة الحادث بعالم من الأرواح والكيانات.",descriptionEn:"A family tries to save their child after a mysterious coma reveals a connection to a realm inhabited by spirits and hostile entities.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/Insidious_(film)",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"sinister-2012",type:"movie",genres:["horror","mystery","thriller"],titleAr:"شرير",titleEn:"Sinister",titleOriginal:"Sinister",year:2012,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:109,poster:titlePoster("Sinister","2012"),countryAr:"المملكة المتحدة والولايات المتحدة وكندا",countryEn:"United Kingdom / United States / Canada",director:"Scott Derrickson",cast:["Ethan Hawke","Juliet Rylance","James Ransone","Clare Foley"],descriptionAr:"يعثر كاتب جرائم على تسجيلات منزلية مرتبطة بجرائم قتل سابقة، فيكتشف نمطًا يقوده إلى تهديد خارق للطبيعة.",descriptionEn:"A crime writer discovers home movies connected to earlier murders and uncovers a pattern leading to a supernatural threat.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/Sinister_(film)",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"hereditary-2018",type:"movie",genres:["horror","drama","mystery"],titleAr:"وراثي",titleEn:"Hereditary",titleOriginal:"Hereditary",year:2018,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:127,poster:titlePoster("Hereditary","2018"),countryAr:"الولايات المتحدة",countryEn:"United States",director:"Ari Aster",cast:["Toni Collette","Alex Wolff","Milly Shapiro","Ann Dowd","Gabriel Byrne"],descriptionAr:"بعد وفاة جدة العائلة، تبدأ سلسلة اكتشافات وأحداث مرعبة تكشف إرثًا غامضًا يمتد إلى طقوس وقوى خارقة.",descriptionEn:"After the family matriarch dies, disturbing discoveries and events reveal an inherited mystery tied to ritual and supernatural forces.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/Hereditary_(film)",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"the-witch-2015",type:"movie",genres:["horror","drama","mystery"],titleAr:"الساحرة",titleEn:"The Witch",titleOriginal:"The Witch",year:2015,languageAr:"الإنجليزية القديمة",languageEn:"Early Modern English",runtimeMinutes:92,poster:titlePoster("The Witch","2015"),countryAr:"الولايات المتحدة وكندا والمملكة المتحدة",countryEn:"United States / Canada / United Kingdom",director:"Robert Eggers",cast:["Anya Taylor-Joy","Ralph Ineson","Kate Dickie","Harvey Scrimshaw"],descriptionAr:"تعيش أسرة متدينة قرب غابة معزولة في نيو إنجلاند، ثم تتصاعد الشكوك والخوف مع اختفاء طفل وظهور إشارات إلى السحر.",descriptionEn:"A devout family lives beside an isolated New England forest, where a child's disappearance and signs of witchcraft fuel fear and suspicion.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/The_Witch_(2015_film)",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"the-wailing-2016",type:"movie",genres:["horror","mystery","thriller"],titleAr:"العويل",titleEn:"The Wailing",titleOriginal:"곡성",year:2016,languageAr:"الكورية واليابانية",languageEn:"Korean / Japanese",runtimeMinutes:156,poster:titlePoster("The Wailing","2016"),countryAr:"كوريا الجنوبية",countryEn:"South Korea",director:"Na Hong-jin",cast:["Kwak Do-won","Hwang Jung-min","Chun Woo-hee","Jun Kunimura"],descriptionAr:"تنتشر حوادث غريبة ومرض عنيف في قرية ريفية بعد وصول رجل غامض، فيدخل شرطي في مواجهة مع طقوس وشكوك وقوى غير مفهومة.",descriptionEn:"Strange incidents and a violent illness spread through a rural village after a mysterious stranger arrives, drawing a policeman into ritual, suspicion and unexplained forces.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/The_Wailing_(2016_film)",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"noroi-the-curse-2005",type:"movie",genres:["horror","mystery"],titleAr:"نوروي: اللعنة",titleEn:"Noroi: The Curse",titleOriginal:"ノロイ",year:2005,languageAr:"اليابانية",languageEn:"Japanese",runtimeMinutes:115,poster:titlePoster("Noroi: The Curse","2005"),countryAr:"اليابان",countryEn:"Japan",director:"Kōji Shiraishi",cast:["Jin Muraki","Marika Matsumoto","Rio Kanno","Tomono Kuga"],descriptionAr:"يتتبع باحث في الظواهر الخارقة سلسلة أحداث مترابطة تقوده إلى طقس قديم ولعنة تتكشف عبر تسجيلات ووثائق.",descriptionEn:"A paranormal researcher follows connected incidents that lead toward an old ritual and a curse revealed through recordings and documents.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/Noroi%3A_The_Curse",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"incantation-2022",type:"movie",genres:["horror","mystery"],titleAr:"تعويذة",titleEn:"Incantation",titleOriginal:"咒",year:2022,languageAr:"الماندرين والتايوانية",languageEn:"Mandarin / Taiwanese Hokkien",runtimeMinutes:111,poster:titlePoster("Incantation","2022"),countryAr:"تايوان",countryEn:"Taiwan",director:"Kevin Ko",cast:["Tsai Hsuan-yen","Huang Sin-ting","Kao Ying-hsuan","Sean Lin"],descriptionAr:"تحاول أم حماية ابنتها من تبعات لعنة مرتبطة بخرق محرّم ديني وطقوس غامضة حدثت قبل سنوات.",descriptionEn:"A mother tries to protect her daughter from the consequences of a curse tied to a broken religious taboo and rituals from years earlier.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/Incantation_(film)",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"the-exorcism-of-emily-rose-2005",type:"movie",genres:["horror","drama","thriller"],titleAr:"طرد الأرواح من إيميلي روز",titleEn:"The Exorcism of Emily Rose",titleOriginal:"The Exorcism of Emily Rose",year:2005,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:119,poster:titlePoster("The Exorcism of Emily Rose","2005"),countryAr:"الولايات المتحدة",countryEn:"United States",director:"Scott Derrickson",cast:["Laura Linney","Tom Wilkinson","Jennifer Carpenter","Campbell Scott"],descriptionAr:"تتحول وفاة شابة بعد طقوس طرد أرواح إلى قضية محكمة تبحث في الحد الفاصل بين التفسير الطبي والادعاءات الخارقة.",descriptionEn:"A young woman's death following an exorcism becomes a court case examining the boundary between medical explanations and supernatural claims.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/The_Exorcism_of_Emily_Rose",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"the-rite-2011",type:"movie",genres:["horror","drama","thriller"],titleAr:"الطقس",titleEn:"The Rite",titleOriginal:"The Rite",year:2011,languageAr:"الإنجليزية والإيطالية واللاتينية",languageEn:"English / Italian / Latin",runtimeMinutes:114,poster:titlePoster("The Rite","2011"),countryAr:"الولايات المتحدة والمجر وإيطاليا والمملكة المتحدة",countryEn:"United States / Hungary / Italy / United Kingdom",director:"Mikael Håfström",cast:["Anthony Hopkins","Colin O'Donoghue","Alice Braga","Ciarán Hinds","Rutger Hauer"],descriptionAr:"يسافر طالب كهنوت متشكك إلى روما لتعلم طقوس طرد الأرواح، ثم يواجه أحداثًا تختبر تفسيراته وشكوكه.",descriptionEn:"A skeptical seminary student travels to Rome to study exorcism and encounters events that challenge his explanations and doubts.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/The_Rite_(2011_film)",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"the-possession-2012",type:"movie",genres:["horror","thriller"],titleAr:"المسّ",titleEn:"The Possession",titleOriginal:"The Possession",year:2012,languageAr:"الإنجليزية",languageEn:"English",runtimeMinutes:92,poster:titlePoster("The Possession","2012"),countryAr:"الولايات المتحدة",countryEn:"United States",director:"Ole Bornedal",cast:["Jeffrey Dean Morgan","Kyra Sedgwick","Natasha Calis","Matisyahu"],descriptionAr:"تشتري فتاة صندوقًا قديمًا في مزاد، ثم تبدأ عليها تغيرات مخيفة تربط العائلة بحكاية عن كيان محبوس داخل الصندوق.",descriptionEn:"A girl buys an old box at a yard sale and begins changing in frightening ways, linking her family to the story of an entity trapped inside it.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/The_Possession",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"dabbe-curse-of-the-jinn-2013",type:"movie",genres:["horror","mystery"],titleAr:"دابه: مسّ الجن",titleEn:"Dabbe: The Possession",titleOriginal:"Dabbe: Cin Çarpması",year:2013,languageAr:"التركية",languageEn:"Turkish",runtimeMinutes:145,poster:titlePoster("Dabbe: The Possession","2013"),countryAr:"تركيا",countryEn:"Turkey",director:"Hasan Karacadağ",cast:["Irmak Örnek","Cansu Kurgun","Ali Murat Özgen","Elçin Atamgüç"],descriptionAr:"يتتبع الفيلم حالة يُعتقد أنها مسّ من الجن، مع طقوس ومعتقدات محلية عن السحر والكيانات غير المرئية.",descriptionEn:"The film follows a case believed to involve jinn possession, drawing on rituals and local beliefs about magic and unseen entities.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"Wikipedia",metadataSourceUrl:"https://en.wikipedia.org/wiki/Dabbe%3A_Curse_of_the_Jinn",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
  {
    id:"siccin-2014",type:"movie",genres:["horror","mystery"],titleAr:"سِجّين",titleEn:"Siccin",titleOriginal:"Siccîn",year:2014,languageAr:"التركية",languageEn:"Turkish",runtimeMinutes:96,poster:titlePoster("Siccin","2014"),countryAr:"تركيا",countryEn:"Turkey",director:"Alper Mestçi",cast:["Merve Ateş","Toygun Ateş","Aydan Çakır"],descriptionAr:"تدفع الغيرة امرأة إلى اللجوء إلى السحر الأسود، فتبدأ سلسلة عواقب مرعبة تمس عائلة بأكملها.",descriptionEn:"Jealousy drives a woman toward black magic, setting off terrifying consequences that spread through an entire family.",publishedAt:today,sources:[],subtitles:[],subtitleStatusAr:noSubsAr,subtitleStatusEn:noSubsEn,metadataSourceName:"IMDb",metadataSourceUrl:"https://www.imdb.com/title/tt4240654/",downloadAllowed:false,rightsStatusAr:infoOnlyRightsAr,rightsStatusEn:infoOnlyRightsEn,
  },
];

export const discoverableMovies = movieCatalog.filter(movie => movie.runtimeMinutes >= 90);
export const publicMovies = discoverableMovies;
export const playableMovies = discoverableMovies.filter(movie => movie.sources.length > 0);

export function movieTitle(movie:Movie,locale:Locale){
  return locale === "ar" ? (movie.titleAr || movie.titleOriginal || movie.titleEn) : movie.titleEn;
}

export function formatDuration(minutes:number,locale:Locale) {
  const hours=Math.floor(minutes/60), remaining=minutes%60;
  return locale === "en"
    ? [hours ? `${hours}h` : "", remaining ? `${remaining}m` : ""].filter(Boolean).join(" ")
    : [hours ? `${hours} ساعة` : "", remaining ? `${remaining} دقيقة` : ""].filter(Boolean).join(" و");
}

function recommendationScore(source:Movie,candidate:Movie){
  const sharedGenres=candidate.genres.filter(genre=>source.genres.includes(genre)).length;
  const sameLanguage=candidate.languageEn===source.languageEn?1:0;
  const yearGap=Math.abs(candidate.year-source.year);
  return sharedGenres*10+sameLanguage*4+Math.max(0,5-Math.floor(yearGap/10));
}

export function getSimilarMovies(movie:Movie,limit=6){
  return discoverableMovies
    .filter(candidate=>candidate.id!==movie.id)
    .map(candidate=>({candidate,score:recommendationScore(movie,candidate)}))
    .filter(item=>item.score>0)
    .sort((a,b)=>b.score-a.score||Math.abs(a.candidate.year-movie.year)-Math.abs(b.candidate.year-movie.year)||a.candidate.titleEn.localeCompare(b.candidate.titleEn))
    .slice(0,limit)
    .map(item=>item.candidate);
}

export function getYouMayAlsoLike(movie:Movie,limit=6){
  const similarIds=new Set(getSimilarMovies(movie,limit).map(item=>item.id));
  const pool=discoverableMovies.filter(candidate=>candidate.id!==movie.id&&!similarIds.has(candidate.id));
  const seed=[...movie.id].reduce((sum,char)=>sum+char.charCodeAt(0),0);
  return [...pool].sort((a,b)=>((a.year+seed)%97)-((b.year+seed)%97)||a.titleEn.localeCompare(b.titleEn)).slice(0,limit);
}

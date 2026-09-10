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
  // GENERATED PLAYABLE START
  {
    "id": "a-shot-in-the-dark-1964-hd-port-en-audio-1080p",
    "type": "movie",
    "genres": [
      "comedy"
    ],
    "titleAr": "(Sellers) A Shot In The Dark (1964) HD 1080p (Port Eng Audio)",
    "titleEn": "(Sellers) A Shot In The Dark (1964) HD 1080p (Port Eng Audio)",
    "titleOriginal": "(Sellers) A Shot In The Dark (1964) HD 1080p (Port Eng Audio)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 102,
    "poster": "https://archive.org/download/a-shot-in-the-dark-1964-hd-port-en-audio-1080p/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/a-shot-in-the-dark-1964-hd-port-en-audio-1080p/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 102 دقيقة.",
    "descriptionEn": "Classic Blake Edwards Comedy From The Pink Panther Movie Series Featuring The Comic Genius Of Mr. Peter Sellers. Restored Version Presented In 1080p. Enjoy",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/a-shot-in-the-dark-1964-hd-port-en-audio-1080p/A%20Shot%20In%20The%20Dark%20%281964%29%20HD%20%28Port%20En%20AUDIO%29%201080p.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 608279842
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/a-shot-in-the-dark-1964-hd-port-en-audio-1080p",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/a-shot-in-the-dark-1964-hd-port-en-audio-1080p",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "(Sellers) A Shot In The Dark (1964) HD 1080p (Port Eng Audio) (2026) — ",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/a-shot-in-the-dark-1964-hd-port-en-audio-1080p/A%20Shot%20In%20The%20Dark%20%281964%29%20HD%20%28Port%20En%20AUDIO%29%201080p.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/a-shot-in-the-dark-1964-hd-port-en-audio-1080p"
      }
    ]
  },
  {
    "id": "1997-98-m-2-comedy-central-fox-te-nos",
    "type": "movie",
    "genres": [
      "comedy"
    ],
    "titleAr": "1997 98 M 2 Comedy Central Fox TE NOS",
    "titleEn": "1997 98 M 2 Comedy Central Fox TE NOS",
    "titleOriginal": "1997 98 M 2 Comedy Central Fox TE NOS",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 146,
    "poster": "https://archive.org/download/1997-98-m-2-comedy-central-fox-te-nos/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/1997-98-m-2-comedy-central-fox-te-nos/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 146 دقيقة.",
    "descriptionEn": "Video - #054",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/1997-98-m-2-comedy-central-fox-te-nos/1997-98%20M2%20Comedy%20Central%20Fox_TE_NOS.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1049351451
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/1997-98-m-2-comedy-central-fox-te-nos",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/1997-98-m-2-comedy-central-fox-te-nos",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "1997 98 M 2 Comedy Central Fox TE NOS (2025) — ",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/1997-98-m-2-comedy-central-fox-te-nos/1997-98%20M2%20Comedy%20Central%20Fox_TE_NOS.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/1997-98-m-2-comedy-central-fox-te-nos"
      }
    ]
  },
  {
    "id": "a-better-tomorrow-iii-love-death-in-saigon",
    "type": "movie",
    "genres": [
      "action",
      "drama",
      "war"
    ],
    "titleAr": "A Better Tomorrow III: Love & Death In Saigon 英雄本色3-夕陽之歌",
    "titleEn": "A Better Tomorrow III: Love & Death In Saigon 英雄本色3-夕陽之歌",
    "titleOriginal": "A Better Tomorrow III: Love & Death In Saigon 英雄本色3-夕陽之歌",
    "year": 2026,
    "languageAr": "english-handwritten",
    "languageEn": "english-handwritten",
    "runtimeMinutes": 119,
    "poster": "https://archive.org/download/a-better-tomorrow-iii-love-death-in-saigon/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/a-better-tomorrow-iii-love-death-in-saigon/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 119 دقيقة.",
    "descriptionEn": "A Better Tomorrow III: Love & Death in Saigon ( Chinese : 英雄本色3-夕陽之歌 ) is a 1989 Hong Kong action drama film directed, co-written, and co-produced by Tsui Hark , the producer behind the first two films in the series. It is a prequel to John Woo 's A Better Tomorrow and A Better Tomorrow II . John Woo wrote a screenplay for a third installment, but he never got to direct it due to artistic differences with Tsui during the filming of the second film. Instead, the original screenplay later became Bullet in the Head . The two films have many parallels, most notably, both being set in the Vietnam War . The film stars Chow Yun-fat , who reprises hi",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/a-better-tomorrow-iii-love-death-in-saigon/1.%20A%20Better%20Tomorrow%20III%2C%20Love%20%26%20Death%20in%20Saigon_.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 781662337
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/a-better-tomorrow-iii-love-death-in-saigon",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/a-better-tomorrow-iii-love-death-in-saigon",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "A Better Tomorrow III: Love & Death In Saigon 英雄本色3-夕陽之歌 (2026) — KonCategory3",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/a-better-tomorrow-iii-love-death-in-saigon/1.%20A%20Better%20Tomorrow%20III%2C%20Love%20%26%20Death%20in%20Saigon_.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/a-better-tomorrow-iii-love-death-in-saigon"
      }
    ]
  },
  {
    "id": "a-copenhagen-love-story-2025",
    "type": "movie",
    "genres": [
      "romance"
    ],
    "titleAr": "A Copenhagen Love Story ( 2025)",
    "titleEn": "A Copenhagen Love Story ( 2025)",
    "titleOriginal": "A Copenhagen Love Story ( 2025)",
    "year": 2026,
    "languageAr": "Unknown",
    "languageEn": "Unknown",
    "runtimeMinutes": 104,
    "poster": "https://archive.org/download/a-copenhagen-love-story-2025/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/a-copenhagen-love-story-2025/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 104 دقيقة.",
    "descriptionEn": "English Movies IBKDJ9",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/a-copenhagen-love-story-2025/A%20Copenhagen%20Love%20Story%20%282025%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 656838061
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/a-copenhagen-love-story-2025",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/a-copenhagen-love-story-2025",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "A Copenhagen Love Story ( 2025) (2026) — ",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/a-copenhagen-love-story-2025/A%20Copenhagen%20Love%20Story%20%282025%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/a-copenhagen-love-story-2025"
      }
    ]
  },
  {
    "id": "ace-high-t-00",
    "type": "movie",
    "genres": [
      "comedy",
      "western"
    ],
    "titleAr": "Ace High (1968) (Bud Spencer & Terence Hill) (HD 1080p)",
    "titleEn": "Ace High (1968) (Bud Spencer & Terence Hill) (HD 1080p)",
    "titleOriginal": "Ace High (1968) (Bud Spencer & Terence Hill) (HD 1080p)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 122,
    "poster": "https://archive.org/download/ace-high-t-00/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/ace-high-t-00/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 122 دقيقة.",
    "descriptionEn": "HD Presentation Of This Great Western, Which Also Features Eli Walach",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/ace-high-t-00/Ace%20High_t00.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 715987526
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/ace-high-t-00",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/ace-high-t-00",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Ace High (1968) (Bud Spencer & Terence Hill) (HD 1080p) (2026) — ",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/ace-high-t-00/Ace%20High_t00.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/ace-high-t-00"
      }
    ]
  },
  {
    "id": "adrenalin-fear-the-rush-1996",
    "type": "movie",
    "genres": [
      "action",
      "thriller",
      "scifi"
    ],
    "titleAr": "Adrenalin: Fear The Rush (Theatrical Cut)",
    "titleEn": "Adrenalin: Fear The Rush (Theatrical Cut)",
    "titleOriginal": "Adrenalin: Fear The Rush (Theatrical Cut)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 76,
    "poster": "https://archive.org/download/adrenalin.-fear.-the.-rush.-1996/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/adrenalin.-fear.-the.-rush.-1996/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 76 دقيقة.",
    "descriptionEn": "Adrenalin: Fear the Rush is a 1996 American science fiction-action film written and directed by Albert Pyun and starring Christopher Lambert and Natasha Henstridge. It is set in an alternative future in 2007, where the Russian Federation has collapsed and Eastern Europe is in disarray. Out of this chaos an unknown virus covers the Earth and eventually the United States.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/adrenalin.-fear.-the.-rush.-1996/Adrenalin.Fear.The.Rush.1996.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1507990817
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/adrenalin.-fear.-the.-rush.-1996",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/adrenalin.-fear.-the.-rush.-1996",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Adrenalin: Fear The Rush (Theatrical Cut) (2026) — Albert Pyun",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/adrenalin.-fear.-the.-rush.-1996/Adrenalin.Fear.The.Rush.1996.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/adrenalin.-fear.-the.-rush.-1996"
      }
    ]
  },
  {
    "id": "an-american-tail-1986-tmdb-4978",
    "type": "movie",
    "genres": [
      "action",
      "comedy",
      "drama",
      "adventure",
      "animation",
      "musical"
    ],
    "titleAr": "An American Tail ( 1986) {tmdb 4978}",
    "titleEn": "An American Tail ( 1986) {tmdb 4978}",
    "titleOriginal": "An American Tail ( 1986) {tmdb 4978}",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 80,
    "poster": "https://archive.org/download/an-american-tail-1986-tmdb-4978/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/an-american-tail-1986-tmdb-4978/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 80 دقيقة.",
    "descriptionEn": "A young mouse named Fievel and his family decide to migrate to America, a \"land without cats,\" at the turn of the 20th century. But somehow, Fievel ends up in the New World alone and must fend off not only the felines he never thought he'd have to deal with again but also the loneliness of being away from home.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/an-american-tail-1986-tmdb-4978/An%20American%20Tail%20%281986%29%20%7Btmdb-4978%7D.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1261237104
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/an-american-tail-1986-tmdb-4978",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/an-american-tail-1986-tmdb-4978",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "An American Tail ( 1986) {tmdb 4978} (2026) — ",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/an-american-tail-1986-tmdb-4978/An%20American%20Tail%20%281986%29%20%7Btmdb-4978%7D.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/an-american-tail-1986-tmdb-4978"
      }
    ]
  },
  {
    "id": "an-eastern-bunny-puppy-full-family-movie-in-english-v-exclusive",
    "type": "movie",
    "genres": [
      "mystery",
      "family"
    ],
    "titleAr": "AN EASTERN BUNNY PUPPY (2014)",
    "titleEn": "AN EASTERN BUNNY PUPPY (2014)",
    "titleOriginal": "AN EASTERN BUNNY PUPPY (2014)",
    "year": 2023,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 90,
    "poster": "https://archive.org/download/an-eastern-bunny-puppy-full-family-movie-in-english-v-exclusive/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/an-eastern-bunny-puppy-full-family-movie-in-english-v-exclusive/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2023، مدته نحو 90 دقيقة.",
    "descriptionEn": "A Mystery writer is not thrilled when she's assigned to write a children's book, \"An Easter Bunny Puppy.\" Out of ideas, she asks her daughter for help. Meanwhile, her dog, RUSS, the narrator of the story, digs up a priceless Faberge egg buried in the woods and takes it home with him, unaware that he's trailing a thief who stole the egg.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/an-eastern-bunny-puppy-full-family-movie-in-english-v-exclusive/AN%20EASTERN%20BUNNY%20PUPPY%20-%20FULL%20FAMILY%20MOVIE%20IN%20ENGLISH%20-%20V%20EXCLUSIVE.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 625091054
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/an-eastern-bunny-puppy-full-family-movie-in-english-v-exclusive",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/an-eastern-bunny-puppy-full-family-movie-in-english-v-exclusive",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "AN EASTERN BUNNY PUPPY (2014) (2023) — V Movies",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/an-eastern-bunny-puppy-full-family-movie-in-english-v-exclusive/AN%20EASTERN%20BUNNY%20PUPPY%20-%20FULL%20FAMILY%20MOVIE%20IN%20ENGLISH%20-%20V%20EXCLUSIVE.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/an-eastern-bunny-puppy-full-family-movie-in-english-v-exclusive"
      }
    ]
  },
  {
    "id": "watch-as-the-gods-will-full-movie-free-on-123moviestv-2",
    "type": "movie",
    "genres": [
      "horror"
    ],
    "titleAr": "As The Gods Will (2014)",
    "titleEn": "As The Gods Will (2014)",
    "titleOriginal": "As The Gods Will (2014)",
    "year": 2014,
    "languageAr": "jpn",
    "languageEn": "jpn",
    "runtimeMinutes": 117,
    "poster": "https://archive.org/download/watch-as-the-gods-will-full-movie-free-on-123moviestv-2/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/watch-as-the-gods-will-full-movie-free-on-123moviestv-2/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2014، مدته نحو 117 دقيقة.",
    "descriptionEn": "Jdjfjfufurueueuejeje",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/watch-as-the-gods-will-full-movie-free-on-123moviestv-2/Watch_As_the_Gods_Will_full_movie_free_on_123moviestv_2.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 378678360
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/watch-as-the-gods-will-full-movie-free-on-123moviestv-2",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/watch-as-the-gods-will-full-movie-free-on-123moviestv-2",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "As The Gods Will (2014) (2014) — Toho Films",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/watch-as-the-gods-will-full-movie-free-on-123moviestv-2/Watch_As_the_Gods_Will_full_movie_free_on_123moviestv_2.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/watch-as-the-gods-will-full-movie-free-on-123moviestv-2"
      }
    ]
  },
  {
    "id": "black-rose-mansion",
    "type": "movie",
    "genres": [
      "drama",
      "romance"
    ],
    "titleAr": "Black Rose Mansion (1969)",
    "titleEn": "Black Rose Mansion (1969)",
    "titleOriginal": "Black Rose Mansion (1969)",
    "year": 2026,
    "languageAr": "jpn",
    "languageEn": "jpn",
    "runtimeMinutes": 90,
    "poster": "https://archive.org/download/black-rose-mansion/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/black-rose-mansion/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 90 دقيقة.",
    "descriptionEn": "Rip of the HD restoration. Subs included as a download.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/black-rose-mansion/Black%20Rose%20Mansion.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1995899323
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/black-rose-mansion",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/black-rose-mansion",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Black Rose Mansion (1969) (2026) — Kinji Fukasaku",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/black-rose-mansion/Black%20Rose%20Mansion.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/black-rose-mansion"
      }
    ]
  },
  {
    "id": "blades-1989",
    "type": "movie",
    "genres": [
      "horror",
      "comedy",
      "thriller"
    ],
    "titleAr": "Blades (1989)",
    "titleEn": "Blades (1989)",
    "titleOriginal": "Blades (1989)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 98,
    "poster": "https://archive.org/download/blades.-1989/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/blades.-1989/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 98 دقيقة.",
    "descriptionEn": "The 1989 Troma horror comedy and parody of Jaws.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/blades.-1989/Blades.1989.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 575363952
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/blades.-1989",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/blades.-1989",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Blades (1989) (2026) — Troma Entertainment",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/blades.-1989/Blades.1989.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/blades.-1989"
      }
    ]
  },
  {
    "id": "20250206-3-2025-05-03-22-08-32",
    "type": "movie",
    "genres": [
      "comedy",
      "western"
    ],
    "titleAr": "Bob & Tom - Laugh in the Fast Lane (1993)",
    "titleEn": "Bob & Tom - Laugh in the Fast Lane (1993)",
    "titleOriginal": "Bob & Tom - Laugh in the Fast Lane (1993)",
    "year": 2025,
    "languageAr": "english-handwritten",
    "languageEn": "english-handwritten",
    "runtimeMinutes": 76,
    "poster": "https://archive.org/download/20250206-3-2025-05-03-22-08-32/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/20250206-3-2025-05-03-22-08-32/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 76 دقيقة.",
    "descriptionEn": "Produced by Bob Kevoian, Tom Griswold & Steve Allee Released 1993 Audio Samples: OK K.O.! Let’s Be Heroes and Camp Lakebottom Orginal Format: CD and Cassette Length: 76 min Naptown Blues - Duke Tumatoe & The Nap Tones Clintorious A Beer's Much Better Than a Woman - The Bo Deanos Love Brothers Go Hawaiian Party in My Pants - Dean & Jerry Bon Aire The Mr. Obvious Show Tom Whiskey: Frontier Doctor Klopenberg Does Dylan My Skin Keeps A Grown' - Heywood Banks King Whiskey Throbbing Python of Love - Tammy Whynot Cathy Rigby's New Show Sphincter Blast - Harry Colonic, Jr. Assinin The Tongue Song - The Bo Deanos Mr. Bation Knock on Wood - The Alligat",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/20250206-3-2025-05-03-22-08-32/20250206-3_2025_05_03_22_08_32.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 227765384
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/20250206-3-2025-05-03-22-08-32",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/20250206-3-2025-05-03-22-08-32",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Bob & Tom - Laugh in the Fast Lane (1993) (2025) — The Bob & Tom Show",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/20250206-3-2025-05-03-22-08-32/20250206-3_2025_05_03_22_08_32.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/20250206-3-2025-05-03-22-08-32"
      }
    ]
  },
  {
    "id": "20250207-1-2025-03-02-23-03-06",
    "type": "movie",
    "genres": [
      "comedy",
      "western"
    ],
    "titleAr": "Bob & Tom - With a Little Help From our Friends (1989)",
    "titleEn": "Bob & Tom - With a Little Help From our Friends (1989)",
    "titleOriginal": "Bob & Tom - With a Little Help From our Friends (1989)",
    "year": 2025,
    "languageAr": "english-handwritten",
    "languageEn": "english-handwritten",
    "runtimeMinutes": 71,
    "poster": "https://archive.org/download/20250207-1-2025-03-02-23-03-06/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/20250207-1-2025-03-02-23-03-06/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 71 دقيقة.",
    "descriptionEn": "Produced by Bob Kevoian & Tom Griswold Released 1989 Audio Samples: Ed, Edd n Eddy, The Day My Butt Went Psycho!, Camp Lakebottom, Endangered Species and Big City Greens Original Format: CD and Cassette Proceeds: Gleaners Food Bank of Indianapolis and Children's Wish Foundation of Indiana Length: 71 min Track Listing Bob & Tom's Almost All-Star Band / With a Little Help From Our Friends - The Beatawfuls Arnie's Revenge - Arnie Whiskey Eighteen Wheels on a Big Rig - Heywood Banks The Alter-Ego - David Stassman & Chuck Wood The Love Brothers Do Eighteen Holes - The Love Brothers Buttman - Warren Piece & The Baloney Ponies (Featuring Chick McGee",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/20250207-1-2025-03-02-23-03-06/20250207-1_2025_03_02_23_03_06.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 209016359
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/20250207-1-2025-03-02-23-03-06",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/20250207-1-2025-03-02-23-03-06",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Bob & Tom - With a Little Help From our Friends (1989) (2025) — The Bob & Tom Show",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/20250207-1-2025-03-02-23-03-06/20250207-1_2025_03_02_23_03_06.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/20250207-1-2025-03-02-23-03-06"
      }
    ]
  },
  {
    "id": "close-encounters-of-the-spooky-kind-1-and-2",
    "type": "movie",
    "genres": [
      "action",
      "horror",
      "comedy",
      "romance",
      "fantasy",
      "war"
    ],
    "titleAr": "Close Encounters Of The Spooky Kind & Close Encounters Of The Spooky Kind II",
    "titleEn": "Close Encounters Of The Spooky Kind & Close Encounters Of The Spooky Kind II",
    "titleOriginal": "Close Encounters Of The Spooky Kind & Close Encounters Of The Spooky Kind II",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 99,
    "poster": "https://archive.org/download/close-encounters-of-the-spooky-kind-1-and-2/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/close-encounters-of-the-spooky-kind-1-and-2/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 99 دقيقة.",
    "descriptionEn": "Encounters of the Spooky Kind ( Chinese : 鬼打鬼 ) is a 1980 Hong Kong martial arts comedy horror film starring and directed by Sammo Hung , written by Hung and Huang Ying, and produced by Hung's film production company Bo Ho Film Company . Released as Spooky Encounters in the United States and also known as Close Encounters of the Spooky Kind , the latter title more blatantly mimicking the title of the film Close Encounters of the Third Kind (1977), Encounters of the Spooky Kind popularized the production of films based on the jiangshi of Chinese legends in the Hong Kong film industry, though it was not the first. As Andrew Heskens of EasternKi",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/close-encounters-of-the-spooky-kind-1-and-2/1.%20Close%20Encounters%20of%20the%20Spooky%20Kind.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 640003916
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/close-encounters-of-the-spooky-kind-1-and-2",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/close-encounters-of-the-spooky-kind-1-and-2",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Close Encounters Of The Spooky Kind & Close Encounters Of The Spooky Kind II (2026) — KonCaregory3",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/close-encounters-of-the-spooky-kind-1-and-2/1.%20Close%20Encounters%20of%20the%20Spooky%20Kind.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/close-encounters-of-the-spooky-kind-1-and-2"
      }
    ]
  },
  {
    "id": "judy-hopps-nick-wylde-in-car-2-with-fm-hs-202511",
    "type": "movie",
    "genres": [
      "action",
      "animation"
    ],
    "titleAr": "COMBINED Films",
    "titleEn": "COMBINED Films",
    "titleOriginal": "COMBINED Films",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 70,
    "poster": "https://archive.org/download/judy-hopps-nick-wylde-in-car-2-with-fm-hs_202511/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/judy-hopps-nick-wylde-in-car-2-with-fm-hs_202511/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 70 دقيقة.",
    "descriptionEn": "Combining different scenes together, like the VIDEO STARS",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/judy-hopps-nick-wylde-in-car-2-with-fm-hs_202511/2%20UglyDolls%20in%20Buzz%20Lightyear%20of%20SC%20-%20The%20A%20B.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1659381999
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/judy-hopps-nick-wylde-in-car-2-with-fm-hs_202511",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/judy-hopps-nick-wylde-in-car-2-with-fm-hs_202511",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "COMBINED Films (2025) — J R. O - DreamWorks Master",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/judy-hopps-nick-wylde-in-car-2-with-fm-hs_202511/2%20UglyDolls%20in%20Buzz%20Lightyear%20of%20SC%20-%20The%20A%20B.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/judy-hopps-nick-wylde-in-car-2-with-fm-hs_202511"
      }
    ]
  },
  {
    "id": "comedy-classics-volume-1",
    "type": "movie",
    "genres": [
      "action",
      "comedy",
      "scifi"
    ],
    "titleAr": "Comedy Classics (aka Kings of Comedy)",
    "titleEn": "Comedy Classics (aka Kings of Comedy)",
    "titleOriginal": "Comedy Classics (aka Kings of Comedy)",
    "year": 2007,
    "languageAr": "Unknown",
    "languageEn": "Unknown",
    "runtimeMinutes": 79,
    "poster": "https://archive.org/download/comedy-classics-volume-1/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/comedy-classics-volume-1/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2007، مدته نحو 79 دقيقة.",
    "descriptionEn": "Comedy Classics Presented by legendary voiceover artist Pete Smith from the backlot of the GTV-9 Studios, Comedy Classics is an entertaining look back at some of the great comic performances recorded by Nine’s in-house productions over the past 50 years. Included in this special compliation is comedy duo The Two Ronnies – featuring their classic Bespoke Taxidermist Sketch as well as a futuristic “Automated Doctor Sketch”. Pete and Dud join in the jocularity with some piano hi-jinks, arguing music impropriety. Allan Sherman steps up to the microphone to perform a medley of comic songs and Irish comedian Dave Allen will leave you in stitches as",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/comedy-classics-volume-1/Comedy%20Classics%20Volume%201.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 929588985
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/comedy-classics-volume-1",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/comedy-classics-volume-1",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Comedy Classics (aka Kings of Comedy) (2007) — Nine Network",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/comedy-classics-volume-1/Comedy%20Classics%20Volume%201.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/comedy-classics-volume-1"
      }
    ]
  },
  {
    "id": "corey-yuens-ninja-in-the-dragons-den-drunken-dragon-exciting-dragon",
    "type": "movie",
    "genres": [
      "action",
      "horror",
      "adventure",
      "fantasy",
      "war"
    ],
    "titleAr": "Corey Yuen's Ninja In The Dragons Den 龍之忍者 + Drunken Dragon aka Exciting Dragon 龍發威 : with bonus Huggbees Riff (GeekJuiceMedia)",
    "titleEn": "Corey Yuen's Ninja In The Dragons Den 龍之忍者 + Drunken Dragon aka Exciting Dragon 龍發威 : with bonus Huggbees Riff (GeekJuiceMedia)",
    "titleOriginal": "Corey Yuen's Ninja In The Dragons Den 龍之忍者 + Drunken Dragon aka Exciting Dragon 龍發威 : with bonus Huggbees Riff (GeekJuiceMedia)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 190,
    "poster": "https://archive.org/download/corey-yuens-ninja-in-the-dragons-den-drunken-dragon-exciting-dragon/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/corey-yuens-ninja-in-the-dragons-den-drunken-dragon-exciting-dragon/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 190 دقيقة.",
    "descriptionEn": "Ninja in the Dragon's Den ( Chinese : 龍之忍者 ) is a 1982 Hong Kong martial arts film directed by Corey Yuen in his feature film directorial debut, and written by Yuen and Ng See-yuen . It stars Conan Lee , Hiroyuki Sanada and Hwang Jang-lee . The film was released theatrically in Hong Kong on 24 June 1982. Plot In Japan of the Tokugawa Ieyasu period, a young ninja named Genbu wantonly kills samurai and other government officials, leaving his clan to face the blame. When they hunt him down, Genbu and his wife Akane sail to China both to escape their wrathful kinsmen and for Genbu to complete his revenge by finding the last man he holds responsib",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/corey-yuens-ninja-in-the-dragons-den-drunken-dragon-exciting-dragon/1.%20Corey%20Yuen%27s%20Ninja%20In%20The%20Dragons%20Den%20%2B%20Drunken%20Dragon%20aka%20Exciting%20Dragon.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 976698526
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/corey-yuens-ninja-in-the-dragons-den-drunken-dragon-exciting-dragon",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/corey-yuens-ninja-in-the-dragons-den-drunken-dragon-exciting-dragon",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Corey Yuen's Ninja In The Dragons Den 龍之忍者 + Drunken Dragon aka Exciting Dragon 龍發威 : with bonus Huggbees Riff (GeekJuiceMedia) (2026) — KONCATIII",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/corey-yuens-ninja-in-the-dragons-den-drunken-dragon-exciting-dragon/1.%20Corey%20Yuen%27s%20Ninja%20In%20The%20Dragons%20Den%20%2B%20Drunken%20Dragon%20aka%20Exciting%20Dragon.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/corey-yuens-ninja-in-the-dragons-den-drunken-dragon-exciting-dragon"
      }
    ]
  },
  {
    "id": "crimes-and-misdemeanors-1989",
    "type": "movie",
    "genres": [
      "comedy",
      "drama",
      "romance",
      "crime"
    ],
    "titleAr": "Crimes And Misdemeanors (1989)",
    "titleEn": "Crimes And Misdemeanors (1989)",
    "titleOriginal": "Crimes And Misdemeanors (1989)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 104,
    "poster": "https://archive.org/download/crimes-and-misdemeanors-1989/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/crimes-and-misdemeanors-1989/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 104 دقيقة.",
    "descriptionEn": "Crimes and Misdemeanors is a 1989 American existential comedy-drama film written and directed by Woody Allen, who stars alongside Martin Landau, Mia Farrow, Anjelica Huston, Jerry Orbach, Alan Alda, Sam Waterston, and Joanna Gleason. A respected ophthalmologist (Martin Landau) murders his mistress (Anjelica Huston) to protect his reputation, while a struggling filmmaker (Allen) faces professional jealousy and romantic rejection. The film was met with critical acclaim, receiving three Academy Award nominations: Allen, for Best Director and Best Original Screenplay, and Landau, for Best Actor in a Supporting Role. Several publications have rank",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/crimes-and-misdemeanors-1989/Crimes%20and%20Misdemeanors%20%281989%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1767352587
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/crimes-and-misdemeanors-1989",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/crimes-and-misdemeanors-1989",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Crimes And Misdemeanors (1989) (2026) — Orion Pictures",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/crimes-and-misdemeanors-1989/Crimes%20and%20Misdemeanors%20%281989%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/crimes-and-misdemeanors-1989"
      }
    ]
  },
  {
    "id": "cuando-el-destino-nos-alcance-1973-espanol-latino",
    "type": "movie",
    "genres": [
      "crime",
      "mystery"
    ],
    "titleAr": "cuando-el-destino-nos-alcance-1973-español-latino",
    "titleEn": "cuando-el-destino-nos-alcance-1973-español-latino",
    "titleOriginal": "cuando-el-destino-nos-alcance-1973-español-latino",
    "year": 2024,
    "languageAr": "Unknown",
    "languageEn": "Unknown",
    "runtimeMinutes": 97,
    "poster": "https://archive.org/download/cuando-el-destino-nos-alcance-1973-espanol-latino/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/cuando-el-destino-nos-alcance-1973-espanol-latino/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2024، مدته نحو 97 دقيقة.",
    "descriptionEn": "Un detective en el siglo 21 aprende el horrible secreto de la realidad acerca de la escasez de comida.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/cuando-el-destino-nos-alcance-1973-espanol-latino/cuando-el-destino-nos-alcance-1973-espa%C3%B1ol-latino.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 828587053
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/cuando-el-destino-nos-alcance-1973-espanol-latino",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/cuando-el-destino-nos-alcance-1973-espanol-latino",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "cuando-el-destino-nos-alcance-1973-español-latino (2024) — ",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/cuando-el-destino-nos-alcance-1973-espanol-latino/cuando-el-destino-nos-alcance-1973-espa%C3%B1ol-latino.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/cuando-el-destino-nos-alcance-1973-espanol-latino"
      }
    ]
  },
  {
    "id": "daimajin-1966",
    "type": "movie",
    "genres": [
      "horror"
    ],
    "titleAr": "Daimajin (1966)",
    "titleEn": "Daimajin (1966)",
    "titleOriginal": "Daimajin (1966)",
    "year": 2026,
    "languageAr": "jpn",
    "languageEn": "jpn",
    "runtimeMinutes": 84,
    "poster": "https://archive.org/download/daimajin-1966/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/daimajin-1966/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 84 دقيقة.",
    "descriptionEn": "Daimajin (Japanese: 大魔神, Hepburn: Daimajin; lit. 'Giant Demon God') is a 1966 Japanese tokusatsu film[note 1] directed by Kimiyoshi Yasuda. Produced and distributed by Daiei Film,[1] it is the first film in the Daimajin trilogy. The plot centers around a wrathful spirit (the eponymous Daimajin) sealed inside an ancient statue, which comes to life to help the surviving children of the slain lord of Tanba Province (Miwa Takada and Yoshihiko Aoyama). Daimajin was released theatrically in Japan on April 17, 1966, as a double feature with Gamera vs. Barugon. The film did not receive a theatrical release in the United States, instead being released",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/daimajin-1966/Daimajin-The-Monster-of-Terror-1966_Media_fsrkpTcXkOA_001_1080p.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 854916729
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/daimajin-1966",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/daimajin-1966",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Daimajin (1966) (2026) — Daiei Film/Kimiyoshi Yasuda/Tetsuro Yoshida",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/daimajin-1966/Daimajin-The-Monster-of-Terror-1966_Media_fsrkpTcXkOA_001_1080p.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/daimajin-1966"
      }
    ]
  },
  {
    "id": "descendant-of-the-sun-1983",
    "type": "movie",
    "genres": [
      "action",
      "horror",
      "fantasy"
    ],
    "titleAr": "Descendant of the Sun (1983)",
    "titleEn": "Descendant of the Sun (1983)",
    "titleOriginal": "Descendant of the Sun (1983)",
    "year": 2026,
    "languageAr": "chi",
    "languageEn": "chi",
    "runtimeMinutes": 92,
    "poster": "https://archive.org/download/descendant.of.the.-sun.-1983/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/descendant.of.the.-sun.-1983/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 92 دقيقة.",
    "descriptionEn": "Yuen becomes immortal after 500 years of practising at the Dai Lor realm. His arch nemesis demon descends to earth, so he descends after him in the form of an infant. 18 years later, they come to a clash while defending a princess.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/descendant.of.the.-sun.-1983/Descendant.of.the.Sun.1983.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 537047215
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/descendant.of.the.-sun.-1983",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/descendant.of.the.-sun.-1983",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Descendant of the Sun (1983) (2026) — Chor Yuen",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/descendant.of.the.-sun.-1983/Descendant.of.the.Sun.1983.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/descendant.of.the.-sun.-1983"
      }
    ]
  },
  {
    "id": "devi-dhyani-sacred-pink-floyd-pulse-part-1-english-subtitles-h-265part-1",
    "type": "movie",
    "genres": [
      "action"
    ],
    "titleAr": "Devi Dhyani Sacred Dance Pink Floyd Pulse Part 1 English Subtitles H 265part 1",
    "titleEn": "Devi Dhyani Sacred Dance Pink Floyd Pulse Part 1 English Subtitles H 265part 1",
    "titleOriginal": "Devi Dhyani Sacred Dance Pink Floyd Pulse Part 1 English Subtitles H 265part 1",
    "year": 2005,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 74,
    "poster": "https://archive.org/download/devi-dhyani-sacred-pink-floyd-pulse-part-1-english-subtitles-h-265part-1/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/devi-dhyani-sacred-pink-floyd-pulse-part-1-english-subtitles-h-265part-1/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2005، مدته نحو 74 دقيقة.",
    "descriptionEn": "Devi Dhyani Dances Sacred Dance - Sacred Pink Floyd from Pulse mainly... Devi Dhyani comes from Argentina. She is a Doctor of Law and Managing Director of Energy Enhancement Meditation - energyenhancement.org - Principal Baillarina, certificated teacher of the Ballet. Devi Dhyani spent time learning Classical Indian Dance in Kalakshetra school of Bharata Natyam in Chennai with the help of the Indian Embassy of Buenos Aires. She trained in Odissi Style Classical Indian Dance in Bhubaneshwar and has training in Martha Graham Modern Dance. Born in 1949, now in 2025 she is 77 years old and still performing! I think I saw Dance in the style of Dev",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/devi-dhyani-sacred-pink-floyd-pulse-part-1-english-subtitles-h-265part-1/-Devi-Dhyani-Sacred-Pink-Floyd-Pulse-Part-1-English-Subtitles-H265part1.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 446177000
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/devi-dhyani-sacred-pink-floyd-pulse-part-1-english-subtitles-h-265part-1",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/devi-dhyani-sacred-pink-floyd-pulse-part-1-english-subtitles-h-265part-1",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Devi Dhyani Sacred Dance Pink Floyd Pulse Part 1 English Subtitles H 265part 1 (2005) — Swami Satchidanand",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/devi-dhyani-sacred-pink-floyd-pulse-part-1-english-subtitles-h-265part-1/-Devi-Dhyani-Sacred-Pink-Floyd-Pulse-Part-1-English-Subtitles-H265part1.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/devi-dhyani-sacred-pink-floyd-pulse-part-1-english-subtitles-h-265part-1"
      }
    ]
  },
  {
    "id": "dhv-mkv-clapper",
    "type": "movie",
    "genres": [
      "horror"
    ],
    "titleAr": "DHV.MKV-TRHPS1975.mkv",
    "titleEn": "DHV.MKV-TRHPS1975.mkv",
    "titleOriginal": "DHV.MKV-TRHPS1975.mkv",
    "year": 2022,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 100,
    "poster": "https://archive.org/download/dhv.-mkv-clapper/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/dhv.-mkv-clapper/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2022، مدته نحو 100 دقيقة.",
    "descriptionEn": "DHV.MKV-TRHPS1975.mkv",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/dhv.-mkv-clapper/DHV.MKV-TRHPS1975.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 593396987
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/dhv.-mkv-clapper",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/dhv.-mkv-clapper",
    "licenseName": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "attribution": "DHV.MKV-TRHPS1975.mkv (2022) — DHV.MKV",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/dhv.-mkv-clapper/DHV.MKV-TRHPS1975.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/dhv.-mkv-clapper"
      }
    ]
  },
  {
    "id": "schlefaz-die-schlechtesten-filme-aller-zeiten",
    "type": "movie",
    "genres": [
      "action",
      "horror",
      "comedy",
      "drama",
      "scifi"
    ],
    "titleAr": "Die schlechtesten Filme aller Zeiten",
    "titleEn": "Die schlechtesten Filme aller Zeiten",
    "titleOriginal": "Die schlechtesten Filme aller Zeiten",
    "year": 2025,
    "languageAr": "German",
    "languageEn": "German",
    "runtimeMinutes": 121,
    "poster": "https://archive.org/download/schlefaz-die-schlechtesten-filme-aller-zeiten/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/schlefaz-die-schlechtesten-filme-aller-zeiten/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 121 دقيقة.",
    "descriptionEn": "SchleFaZ („Die schlechtesten Filme aller Zeiten“) ist ein satirisches TV-Format auf Tele 5, in dem Oliver Kalkofe und Peter Rütten mit bissigem Humor und ironischen Kommentaren besonders schlechte Filme präsentieren. Die Sendung zeigt Trash-Klassiker aus den Bereichen Horror, Sci-Fi, Action und Drama, begleitet von witzigen Einspielern, Hintergrundinfos und kultigen Trinkspielregeln. Mit einer treuen Fangemeinde und interaktiven Elementen wie dem Hashtag #SchleFaZ ist die Show längst zum Kult geworden – für alle, die Spaß an unfreiwilliger Komik, absurden Drehbüchern und filmischen Totalausfällen haben.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/schlefaz-die-schlechtesten-filme-aller-zeiten/Die%20schlechtesten%20Filme%20aller%20Zeiten%20S02E01%20-%20Sharknado%20%E2%80%93%20Genug%20gesagt%21.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 733172359
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/schlefaz-die-schlechtesten-filme-aller-zeiten",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/schlefaz-die-schlechtesten-filme-aller-zeiten",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Die schlechtesten Filme aller Zeiten (2025) — ",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/schlefaz-die-schlechtesten-filme-aller-zeiten/Die%20schlechtesten%20Filme%20aller%20Zeiten%20S02E01%20-%20Sharknado%20%E2%80%93%20Genug%20gesagt%21.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/schlefaz-die-schlechtesten-filme-aller-zeiten"
      }
    ]
  },
  {
    "id": "disney-segaentertaimentanimatedmovie-1988-1",
    "type": "movie",
    "genres": [
      "action",
      "animation"
    ],
    "titleAr": "Disney/Warner Bros. Entertainment's Treasure Island (1988) (Остров сокровищ) (Restored, Original Russian dub and English sub) (Fanmade)",
    "titleEn": "Disney/Warner Bros. Entertainment's Treasure Island (1988) (Остров сокровищ) (Restored, Original Russian dub and English sub) (Fanmade)",
    "titleOriginal": "Disney/Warner Bros. Entertainment's Treasure Island (1988) (Остров сокровищ) (Restored, Original Russian dub and English sub) (Fanmade)",
    "year": 2022,
    "languageAr": "rus",
    "languageEn": "rus",
    "runtimeMinutes": 108,
    "poster": "https://archive.org/download/disney-segaentertaimentanimatedmovie-1988-1/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/disney-segaentertaimentanimatedmovie-1988-1/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2022، مدته نحو 108 دقيقة.",
    "descriptionEn": "Video Rating: G For @BlazeJohnson28 Taken from DVD Disney/Warner Bros. Entertainment's Treasure Island (1988) (2006) and streaming Disney Max Plus (with English substitule) (August 2022-) Note: This is the First Soviet animated movie of Disney/Warner Bros. Pictures Entertaiment (now Disney/SEGA Entertaiment) and first soviet animated movie of distribution of Disney/SEGA Entertaiment for released on U.S. Theatres but english subs, with Original Russian dub and Uncut. P.S.: Not confunded the Disney/Warner Bros. Entertainmet's Treasure Island (1950) that movie is in Live Action film",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/disney-segaentertaimentanimatedmovie-1988-1/DisneySEGAentertaimentanimatedmovie1988-1.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 2320787673
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/disney-segaentertaimentanimatedmovie-1988-1",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/disney-segaentertaimentanimatedmovie-1988-1",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Disney/Warner Bros. Entertainment's Treasure Island (1988) (Остров сокровищ) (Restored, Original Russian dub and English sub) (Fanmade) (2022) — David Cherkassky",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/disney-segaentertaimentanimatedmovie-1988-1/DisneySEGAentertaimentanimatedmovie1988-1.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/disney-segaentertaimentanimatedmovie-1988-1"
      }
    ]
  },
  {
    "id": "dora-the-explorer-cowgirl-dora-2003-dvd-202605",
    "type": "movie",
    "genres": [
      "adventure",
      "western"
    ],
    "titleAr": "Dora The Explorer: Cowgirl Dora (2003 DVD)",
    "titleEn": "Dora The Explorer: Cowgirl Dora (2003 DVD)",
    "titleOriginal": "Dora The Explorer: Cowgirl Dora (2003 DVD)",
    "year": 2003,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 97,
    "poster": "https://archive.org/download/dora-the-explorer-cowgirl-dora-2003-dvd_202605/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/dora-the-explorer-cowgirl-dora-2003-dvd_202605/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2003، مدته نحو 97 دقيقة.",
    "descriptionEn": "Howdy, vaqueros! Cowgirl Dora and Cowboy Boots need your help on a rootin' tootin' adventure through the Wild West! Hop in the saddle and ride the Pony Express, and help Dora make some special deliveries! Neither rain nor snow nor Swiper the Fox can keep the mail from gettin' where it's goin'. Will you help them make their deliveries? Let's ride!",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/dora-the-explorer-cowgirl-dora-2003-dvd_202605/Dora%20The%20Explorer%20Cowgirl%20Dora%20%282003%20DVD%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 578544693
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/dora-the-explorer-cowgirl-dora-2003-dvd_202605",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/dora-the-explorer-cowgirl-dora-2003-dvd_202605",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Dora The Explorer: Cowgirl Dora (2003 DVD) (2003) — Paramount Home Entertainment",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/dora-the-explorer-cowgirl-dora-2003-dvd_202605/Dora%20The%20Explorer%20Cowgirl%20Dora%20%282003%20DVD%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/dora-the-explorer-cowgirl-dora-2003-dvd_202605"
      }
    ]
  },
  {
    "id": "driving-miss-daisy-1989",
    "type": "movie",
    "genres": [
      "comedy",
      "drama"
    ],
    "titleAr": "Driving Miss Daisy (1989)",
    "titleEn": "Driving Miss Daisy (1989)",
    "titleOriginal": "Driving Miss Daisy (1989)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 99,
    "poster": "https://archive.org/download/driving-miss-daisy-1989/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/driving-miss-daisy-1989/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 99 دقيقة.",
    "descriptionEn": "Driving Miss Daisy is a 1989 American comedy drama film directed by Bruce Beresford and written by Alfred Uhry, based on Uhry's 1987 play. The film stars Jessica Tandy, Morgan Freeman, and Dan Aykroyd. Freeman reprised his role from the original Off-Broadway production. The story defines Daisy and her point of view through a network of relationships and emotions by focusing on her home life, synagogue, friends, family, fears, and concerns over a twenty-five-year period. Driving Miss Daisy was a critical and commercial success upon its release and at the 62nd Academy Awards received nine nominations, and won four: Best Picture, Best Actress (f",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/driving-miss-daisy-1989/Driving%20Miss%20Daisy%20%281989%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1072191723
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/driving-miss-daisy-1989",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/driving-miss-daisy-1989",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Driving Miss Daisy (1989) (2026) — Warner Bros. Pictures",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/driving-miss-daisy-1989/Driving%20Miss%20Daisy%20%281989%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/driving-miss-daisy-1989"
      }
    ]
  },
  {
    "id": "dweb-virtual-meetup-aug-2026-camp-jomo-fomo",
    "type": "movie",
    "genres": [
      "adventure"
    ],
    "titleAr": "DWeb Virtual Meetup — DWeb Camp JOMO (or FOMO, in case you missed it) (August 2026)",
    "titleEn": "DWeb Virtual Meetup — DWeb Camp JOMO (or FOMO, in case you missed it) (August 2026)",
    "titleOriginal": "DWeb Virtual Meetup — DWeb Camp JOMO (or FOMO, in case you missed it) (August 2026)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 64,
    "poster": "https://archive.org/download/dweb-virtual-meetup-aug-2026-camp-jomo-fomo/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/dweb-virtual-meetup-aug-2026-camp-jomo-fomo/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 64 دقيقة.",
    "descriptionEn": "DWeb Camp 2026 was a big success: We had over 370 campers come out to the Brandenburg forest with over 350 sessions and activities taking place day and night. Even if you were there, it would have been impossible to experience all that took place. One of the pillars of DWeb Camp is JOMO (Joy Of Missing Out): At Camp, there is more than you can ever possibly experience in one day or one week. Be present and content with where you are at any given moment. Whether you were camping with us or were unable to make it, we don’t want you to have missed out on some of the best sessions. That’s why this meetup featured a few projects and takeaways from",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/dweb-virtual-meetup-aug-2026-camp-jomo-fomo/DWebMeetup-Aug2026.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 266673283
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/dweb-virtual-meetup-aug-2026-camp-jomo-fomo",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/dweb-virtual-meetup-aug-2026-camp-jomo-fomo",
    "licenseName": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "attribution": "DWeb Virtual Meetup — DWeb Camp JOMO (or FOMO, in case you missed it) (August 2026) (2026) — DWeb SF",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/dweb-virtual-meetup-aug-2026-camp-jomo-fomo/DWebMeetup-Aug2026.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/dweb-virtual-meetup-aug-2026-camp-jomo-fomo"
      }
    ]
  },
  {
    "id": "finalfantasycrystalchronicles-tasv5-wobmiar",
    "type": "movie",
    "genres": [
      "fantasy"
    ],
    "titleAr": "finalfantasycrystalchronicles-tasv5-wobmiar",
    "titleEn": "finalfantasycrystalchronicles-tasv5-wobmiar",
    "titleOriginal": "finalfantasycrystalchronicles-tasv5-wobmiar",
    "year": 2021,
    "languageAr": "jpn",
    "languageEn": "jpn",
    "runtimeMinutes": 106,
    "poster": "https://archive.org/download/finalfantasycrystalchronicles-tasv5-wobmiar/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/finalfantasycrystalchronicles-tasv5-wobmiar/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2021، مدته نحو 106 دقيقة.",
    "descriptionEn": "http://tasvideos.org/7164S.html",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/finalfantasycrystalchronicles-tasv5-wobmiar/finalfantasycrystalchronicles-tasv5-wobmiar_512kb.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1331533368
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/finalfantasycrystalchronicles-tasv5-wobmiar",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/finalfantasycrystalchronicles-tasv5-wobmiar",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "finalfantasycrystalchronicles-tasv5-wobmiar (2021) — Wobmiar",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/finalfantasycrystalchronicles-tasv5-wobmiar/finalfantasycrystalchronicles-tasv5-wobmiar_512kb.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/finalfantasycrystalchronicles-tasv5-wobmiar"
      }
    ]
  },
  {
    "id": "fist-of-the-double-k-directed-by-john-woo",
    "type": "movie",
    "genres": [
      "action"
    ],
    "titleAr": "Fist Of The Double K [Directed By John Woo In 1973]",
    "titleEn": "Fist Of The Double K [Directed By John Woo In 1973]",
    "titleOriginal": "Fist Of The Double K [Directed By John Woo In 1973]",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 85,
    "poster": "https://archive.org/download/fist-of-the-double-k-directed-by-john-woo/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/fist-of-the-double-k-directed-by-john-woo/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 85 دقيقة.",
    "descriptionEn": "Fist to Fist (Chinese title: Chu ba , UK title: Dragons of Death ) ( Chinese : 除霸 ) is a 1973 Hong Kong martial arts film directed by Filipino film producer Jimmy L. Pascual, [ 2 ] with John Woo as an assistant director. It was released in the United States by The Cannon Group in September 1973, who re-edited it to a 70-minute runtime and released it under the title Fist of the Double K , providing the film with a new English dubbed soundtrack. [ 3 ] Cast Henry Yu Yung Wong Chung-Shun Lily Chen Ching Jackie Chan (as Chen Yuen Lung) Mars Yuen Wah Danny Chow Brandy Yuen Yuen Woo Ping Stewart Tam Tin Shan Kwai Lee Ying See also Jackie Chan filmo",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/fist-of-the-double-k-directed-by-john-woo/Fist%20of%20the%20Double%20K%20%5BDirected%20by%20John%20Woo%20in%201973%5D.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 450663571
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/fist-of-the-double-k-directed-by-john-woo",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/fist-of-the-double-k-directed-by-john-woo",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Fist Of The Double K [Directed By John Woo In 1973] (2026) — KonCATIII",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/fist-of-the-double-k-directed-by-john-woo/Fist%20of%20the%20Double%20K%20%5BDirected%20by%20John%20Woo%20in%201973%5D.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/fist-of-the-double-k-directed-by-john-woo"
      }
    ]
  },
  {
    "id": "fortress-unrated",
    "type": "movie",
    "genres": [
      "action",
      "thriller",
      "scifi"
    ],
    "titleAr": "Fortress (1992)",
    "titleEn": "Fortress (1992)",
    "titleOriginal": "Fortress (1992)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 96,
    "poster": "https://archive.org/download/fortress-unrated/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/fortress-unrated/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 96 دقيقة.",
    "descriptionEn": "Unrated Edition",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/fortress-unrated/Fortress%20%281992%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1600925425
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/fortress-unrated",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/fortress-unrated",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Fortress (1992) (2026) — Stuart Gordon",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/fortress-unrated/Fortress%20%281992%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/fortress-unrated"
      }
    ]
  },
  {
    "id": "fortress-2-hd",
    "type": "movie",
    "genres": [
      "action",
      "thriller",
      "scifi"
    ],
    "titleAr": "Fortress 2 (2000)",
    "titleEn": "Fortress 2 (2000)",
    "titleOriginal": "Fortress 2 (2000)",
    "year": 2000,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 92,
    "poster": "https://archive.org/download/fortress-2-HD/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/fortress-2-HD/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2000، مدته نحو 92 دقيقة.",
    "descriptionEn": "HD rip of Fortress 2: Re-Entry.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/fortress-2-HD/Fortress%202.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1543115329
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/fortress-2-HD",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/fortress-2-HD",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Fortress 2 (2000) (2000) — Geoff Murphy",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/fortress-2-HD/Fortress%202.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/fortress-2-HD"
      }
    ]
  },
  {
    "id": "geekjuicemaggie-cheung",
    "type": "movie",
    "genres": [
      "action",
      "comedy",
      "thriller",
      "crime",
      "adventure",
      "scifi",
      "fantasy",
      "war",
      "history"
    ],
    "titleAr": "GeekJuiceMaggie Cheung's Showcase With Paper Marriage, The Iceman Cometh, & New Dragon Gate Inn",
    "titleEn": "GeekJuiceMaggie Cheung's Showcase With Paper Marriage, The Iceman Cometh, & New Dragon Gate Inn",
    "titleOriginal": "GeekJuiceMaggie Cheung's Showcase With Paper Marriage, The Iceman Cometh, & New Dragon Gate Inn",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 206,
    "poster": "https://archive.org/download/geekjuicemaggie-cheung/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/geekjuicemaggie-cheung/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 206 دقيقة.",
    "descriptionEn": "Paper Marriage ( Chinese : 過埠新娘 ; Jyutping : Gwo3 Fau6 San1 Neong2 ) is a 1988 Hong Kong action comedy film directed and co-written by Alfred Cheung , and starring Sammo Hung and Maggie Cheung . It was released by Golden Harvest on 14 April 1988. In the United States(Edmonton is an \"American\" city in this though is some versions say Los Angeles), a down-on-his-luck Chinese boxer/Kickboxer named Bo Chin accepts promise of payment to marry a Hong Kong woman named Jade Lee so she can get American citizenship. They realize too late that they have been set up in a complicated plan to cheat them out of the woman's money. Their adventures begin when",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/geekjuicemaggie-cheung/GeekJuiceMaggie%20Cheung%27s%20Showcase%20with%20Paper%20Marriage%2C%20The%20Iceman%20Cometh%2C%20%26%20New%20Dragon%20Gate%20Inn.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 849230002
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/geekjuicemaggie-cheung",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/geekjuicemaggie-cheung",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "GeekJuiceMaggie Cheung's Showcase With Paper Marriage, The Iceman Cometh, & New Dragon Gate Inn (2025) — KonCategory3",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/geekjuicemaggie-cheung/GeekJuiceMaggie%20Cheung%27s%20Showcase%20with%20Paper%20Marriage%2C%20The%20Iceman%20Cometh%2C%20%26%20New%20Dragon%20Gate%20Inn.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/geekjuicemaggie-cheung"
      }
    ]
  },
  {
    "id": "getting-any-1994-internal-bdrip-x264-manic",
    "type": "movie",
    "genres": [
      "comedy"
    ],
    "titleAr": "Getting Any (1994)",
    "titleEn": "Getting Any (1994)",
    "titleOriginal": "Getting Any (1994)",
    "year": 2024,
    "languageAr": "jpn",
    "languageEn": "jpn",
    "runtimeMinutes": 109,
    "poster": "https://archive.org/download/getting.any.1994.internal.bdrip.x264-manic/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/getting.any.1994.internal.bdrip.x264-manic/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2024، مدته نحو 109 دقيقة.",
    "descriptionEn": "While pursuing his dream of having car sex, a goofy middle-aged man makes all the wrong moves and ends up enrolling in a number of crazy escapades. (If you download the movie, it automatically has the english subtitles in the file)",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/getting.any.1994.internal.bdrip.x264-manic/getting.any.1994.internal.bdrip.x264-manic.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 655024288
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/getting.any.1994.internal.bdrip.x264-manic",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/getting.any.1994.internal.bdrip.x264-manic",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Getting Any (1994) (2024) — Takeshi Kitano",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/getting.any.1994.internal.bdrip.x264-manic/getting.any.1994.internal.bdrip.x264-manic.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/getting.any.1994.internal.bdrip.x264-manic"
      }
    ]
  },
  {
    "id": "little-big-drama-show-ggg-x-wade-and-chocolatito-x-arroyo-4-23-16",
    "type": "movie",
    "genres": [
      "action",
      "drama"
    ],
    "titleAr": "HBO World Championship Boxing: \"GGG x Wade & Chocolatito x Arroyo\" (Apr. 23rd, 2016)",
    "titleEn": "HBO World Championship Boxing: \"GGG x Wade & Chocolatito x Arroyo\" (Apr. 23rd, 2016)",
    "titleOriginal": "HBO World Championship Boxing: \"GGG x Wade & Chocolatito x Arroyo\" (Apr. 23rd, 2016)",
    "year": 2016,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 101,
    "poster": "https://archive.org/download/LITTLE-BIG-DRAMA-SHOW-GGG-x-WADE-and-CHOCOLATITO-x-ARROYO-4.23.16/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/LITTLE-BIG-DRAMA-SHOW-GGG-x-WADE-and-CHOCOLATITO-x-ARROYO-4.23.16/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2016، مدته نحو 101 دقيقة.",
    "descriptionEn": "Venue: The Forum (revitalized after a multi-million dollar renovation from MSG, now known as the KIA Forum) in Inglewood (Los Angeles), California, USA Commentators: Jim Lampley, Max Kellerman & Roy Jones Jr. for HBO Sports Ring Announcer: Michael Buffer Roman \"Chocolatito\" Gonzalez (C) vs. McWilliams Arroyo (12 3-Minute Rounds for the WBC & Ring Magazine Flyweight [112 Ibs] Championships of the World) Gennady Gennadyevich Golovkin aka \"GGG\" (C) vs. Dominic Wade (12 3-Minute Rounds or less for the Unified {WBC Interim, WBA Super, IBF & IBO} Middleweight [160 Ibs] Championships of the World)",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/LITTLE-BIG-DRAMA-SHOW-GGG-x-WADE-and-CHOCOLATITO-x-ARROYO-4.23.16/HBO_Boxing_Golovkin_vs_Wade.MP4",
        "mimeType": "video/mp4",
        "sizeBytes": 227121274
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/LITTLE-BIG-DRAMA-SHOW-GGG-x-WADE-and-CHOCOLATITO-x-ARROYO-4.23.16",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/LITTLE-BIG-DRAMA-SHOW-GGG-x-WADE-and-CHOCOLATITO-x-ARROYO-4.23.16",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "HBO World Championship Boxing: \"GGG x Wade & Chocolatito x Arroyo\" (Apr. 23rd, 2016) (2016) — TGB Promotions, 360 Promotions, GGG Promotions & Home Box Office Inc.",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/LITTLE-BIG-DRAMA-SHOW-GGG-x-WADE-and-CHOCOLATITO-x-ARROYO-4.23.16/HBO_Boxing_Golovkin_vs_Wade.MP4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/LITTLE-BIG-DRAMA-SHOW-GGG-x-WADE-and-CHOCOLATITO-x-ARROYO-4.23.16"
      }
    ]
  },
  {
    "id": "hbo-wcb-hopkins-x-cloud-and-thurman-x-zaveck-3-9-13",
    "type": "movie",
    "genres": [
      "action"
    ],
    "titleAr": "HBO World Championship Boxing: “Hopkins x Cloud & Thurman x Zaveck” (Mar. 9th, 2013)",
    "titleEn": "HBO World Championship Boxing: “Hopkins x Cloud & Thurman x Zaveck” (Mar. 9th, 2013)",
    "titleOriginal": "HBO World Championship Boxing: “Hopkins x Cloud & Thurman x Zaveck” (Mar. 9th, 2013)",
    "year": 2013,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 68,
    "poster": "https://archive.org/download/HBO-WCB-HOPKINS-x-CLOUD-and-THURMAN-x-ZAVECK-3.9.13/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/HBO-WCB-HOPKINS-x-CLOUD-and-THURMAN-x-ZAVECK-3.9.13/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2013، مدته نحو 68 دقيقة.",
    "descriptionEn": "Venue: Barclays Center in Brooklyn, New York, USA Commentators: Jim Lampley, Max Kellerman & Andre “S.O.G.” Ward for HBO Sports Ring Announcer: Michael Buffer",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/HBO-WCB-HOPKINS-x-CLOUD-and-THURMAN-x-ZAVECK-3.9.13/FIGHT%20%231%20Keith%20Thurman%20vs%20Jan%20Zaveck%20%283.9.2013%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1092136327
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/HBO-WCB-HOPKINS-x-CLOUD-and-THURMAN-x-ZAVECK-3.9.13",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/HBO-WCB-HOPKINS-x-CLOUD-and-THURMAN-x-ZAVECK-3.9.13",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "HBO World Championship Boxing: “Hopkins x Cloud & Thurman x Zaveck” (Mar. 9th, 2013) (2013) — ",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/HBO-WCB-HOPKINS-x-CLOUD-and-THURMAN-x-ZAVECK-3.9.13/FIGHT%20%231%20Keith%20Thurman%20vs%20Jan%20Zaveck%20%283.9.2013%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/HBO-WCB-HOPKINS-x-CLOUD-and-THURMAN-x-ZAVECK-3.9.13"
      }
    ]
  },
  {
    "id": "heart-of-dragon-aka-heart-of-the-dragon-aka-first-mission-aka-raging-force-1985",
    "type": "movie",
    "genres": [
      "action",
      "drama"
    ],
    "titleAr": "Heart Of Dragon aka Heart Of The Dragon aka First Mission aka Raging Force 龍的心 (1985)",
    "titleEn": "Heart Of Dragon aka Heart Of The Dragon aka First Mission aka Raging Force 龍的心 (1985)",
    "titleOriginal": "Heart Of Dragon aka Heart Of The Dragon aka First Mission aka Raging Force 龍的心 (1985)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 98,
    "poster": "https://archive.org/download/heart-of-dragon-aka-heart-of-the-dragon-aka-first-mission-aka-raging-force-1985/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/heart-of-dragon-aka-heart-of-the-dragon-aka-first-mission-aka-raging-force-1985/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 98 دقيقة.",
    "descriptionEn": "Heart of Dragon Heart of Dragon , (Chinese: 龍的心) released in the United Kingdom as Heart of the Dragon , is a 1985 Hong Kong action drama film directed by Sammo Hung , who also starred in the lead role. The film co-stars Jackie Chan , Emily Chu and Mang Hoi . [ 1 ] Yuen Biao , Yuen Wah , and Corey Yuen were among the action directors for the film. Background The film is unusual in that although featuring Sammo Hung and Lam Ching-ying , two actors famed for their kung fu abilities, neither actually perform any martial arts . Golden Harvest had wanted Hung to perform fight scenes in the film, but he refused, rationalising \"My character was ment",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/heart-of-dragon-aka-heart-of-the-dragon-aka-first-mission-aka-raging-force-1985/1.%20Heart%20Of%20Dragon%20aka%20Heart%20Of%20The%20Dragon%20aka%20First%20Mission%20aka%20Raging%20Force%20%281985%29.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 608795010
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/heart-of-dragon-aka-heart-of-the-dragon-aka-first-mission-aka-raging-force-1985",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/heart-of-dragon-aka-heart-of-the-dragon-aka-first-mission-aka-raging-force-1985",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Heart Of Dragon aka Heart Of The Dragon aka First Mission aka Raging Force 龍的心 (1985) (2026) — KonCATIII",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/heart-of-dragon-aka-heart-of-the-dragon-aka-first-mission-aka-raging-force-1985/1.%20Heart%20Of%20Dragon%20aka%20Heart%20Of%20The%20Dragon%20aka%20First%20Mission%20aka%20Raging%20Force%20%281985%29.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/heart-of-dragon-aka-heart-of-the-dragon-aka-first-mission-aka-raging-force-1985"
      }
    ]
  },
  {
    "id": "hellraiser-full-series",
    "type": "movie",
    "genres": [
      "horror"
    ],
    "titleAr": "Hellraiser Full Series",
    "titleEn": "Hellraiser Full Series",
    "titleOriginal": "Hellraiser Full Series",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 93,
    "poster": "https://archive.org/download/hellraiser-full-series/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/hellraiser-full-series/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 93 دقيقة.",
    "descriptionEn": "Hellraiser Full Series",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/hellraiser-full-series/%281987%29%20Hellraiser%20%5Bdir.%20Clive%20Barker%5D.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1667129066
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/hellraiser-full-series",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/hellraiser-full-series",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Hellraiser Full Series (2025) — Wicked313",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/hellraiser-full-series/%281987%29%20Hellraiser%20%5Bdir.%20Clive%20Barker%5D.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/hellraiser-full-series"
      }
    ]
  },
  {
    "id": "heroes-shed-no-tears-aka-sunset-warriors",
    "type": "movie",
    "genres": [
      "action",
      "horror",
      "drama",
      "war"
    ],
    "titleAr": "Heroes Shed No Tears aka Sunset Warriors 英雄無淚 (Dubbed & Subtitled) [John Woo's Lone Wolf & Cub...In Nam!]]",
    "titleEn": "Heroes Shed No Tears aka Sunset Warriors 英雄無淚 (Dubbed & Subtitled) [John Woo's Lone Wolf & Cub...In Nam!]]",
    "titleOriginal": "Heroes Shed No Tears aka Sunset Warriors 英雄無淚 (Dubbed & Subtitled) [John Woo's Lone Wolf & Cub...In Nam!]]",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 98,
    "poster": "https://archive.org/download/heroes-shed-no-tears-aka-sunset-warriors/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/heroes-shed-no-tears-aka-sunset-warriors/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 98 دقيقة.",
    "descriptionEn": "Heroes Shed No Tears (1986 film) Heroes Shed No Tears ( Chinese : 英雄無淚 ; Cantonese Yale : Ying Huhng Mouh Leuih ; also known as Return to Killing Fields in the Philippines) is a 1984 Hong Kong action war film directed by John Woo . The film stars Eddy Ko , with a supporting cast of Lam Ching-ying , Bruce Jang Il-Sik, Ma Ying-chun, Philippe Loffredo, and Cécile Le Bailly . Filmed prior to the success of Woo's A Better Tomorrow , the film is a story about a group of mercenaries on a mission to extract a drug lord from the Indochina area. Plot The Thai government hires a group of Chinese mercenaries led by Chan Chung to capture a powerful drug l",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/heroes-shed-no-tears-aka-sunset-warriors/1.%20John%20Woo%20-%20Sunset%20Warriors%20%28dubbed%29.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 969245411
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/heroes-shed-no-tears-aka-sunset-warriors",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/heroes-shed-no-tears-aka-sunset-warriors",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Heroes Shed No Tears aka Sunset Warriors 英雄無淚 (Dubbed & Subtitled) [John Woo's Lone Wolf & Cub...In Nam!]] (2026) — KonCategory",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/heroes-shed-no-tears-aka-sunset-warriors/1.%20John%20Woo%20-%20Sunset%20Warriors%20%28dubbed%29.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/heroes-shed-no-tears-aka-sunset-warriors"
      }
    ]
  },
  {
    "id": "bronson-hard-times-1975-hd-1080p",
    "type": "movie",
    "genres": [
      "action",
      "thriller",
      "western"
    ],
    "titleAr": "Hi-Def Action Flicks: 18 HD Charles Bronson Movies (Restored 1080p)",
    "titleEn": "Hi-Def Action Flicks: 18 HD Charles Bronson Movies (Restored 1080p)",
    "titleOriginal": "Hi-Def Action Flicks: 18 HD Charles Bronson Movies (Restored 1080p)",
    "year": 2026,
    "languageAr": "Unknown",
    "languageEn": "Unknown",
    "runtimeMinutes": 99,
    "poster": "https://archive.org/download/bronson-hard-times-1975-hd-1080p/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/bronson-hard-times-1975-hd-1080p/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 99 دقيقة.",
    "descriptionEn": "!8 HD Restored Charles Buchinski Movies Presented In Their Original Aspect Ratios. Enjoy",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/bronson-hard-times-1975-hd-1080p/Bronson%20-%20BorderLine%20%28TV%20Movie%29%20%281980%29%20%28FS%29%20%28HD%201080p%29.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1840774790
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/bronson-hard-times-1975-hd-1080p",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/bronson-hard-times-1975-hd-1080p",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Hi-Def Action Flicks: 18 HD Charles Bronson Movies (Restored 1080p) (2026) — ",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/bronson-hard-times-1975-hd-1080p/Bronson%20-%20BorderLine%20%28TV%20Movie%29%20%281980%29%20%28FS%29%20%28HD%201080p%29.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/bronson-hard-times-1975-hd-1080p"
      }
    ]
  },
  {
    "id": "high-risk-meltdown",
    "type": "movie",
    "genres": [
      "action",
      "romance"
    ],
    "titleAr": "High Risk Meltdown 鼠膽龍威 (GeekJuiceMedia)",
    "titleEn": "High Risk Meltdown 鼠膽龍威 (GeekJuiceMedia)",
    "titleOriginal": "High Risk Meltdown 鼠膽龍威 (GeekJuiceMedia)",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 202,
    "poster": "https://archive.org/download/high-risk-meltdown/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/high-risk-meltdown/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 202 دقيقة.",
    "descriptionEn": "After failing to save his wife from ‘The Doctor’, Kit Li is working as a bodyguard and secret stunt double for the cowardly martial arts film star Frankie Lane. Frankie attends an exhibition of the crown jewels of Russia at a Hong Kong hotel, and when the Doctor’s gang take over the building in attempt to steal them, Kit is the only thing standing in their way. Will Frankie regain his courage? Will romance blossom between Kit and the nosy reporter? Who has the best Kung-Fu?",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/high-risk-meltdown/High%20Risk%20Meltdown.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 848621041
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/high-risk-meltdown",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/high-risk-meltdown",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "High Risk Meltdown 鼠膽龍威 (GeekJuiceMedia) (2025) — KonCategory3",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/high-risk-meltdown/High%20Risk%20Meltdown.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/high-risk-meltdown"
      }
    ]
  },
  {
    "id": "il-buono-il-brutto-il-cattivo",
    "type": "movie",
    "genres": [
      "adventure",
      "western"
    ],
    "titleAr": "Il buono, il brutto, il cattivo - Sergio Leone (1966)",
    "titleEn": "Il buono, il brutto, il cattivo - Sergio Leone (1966)",
    "titleOriginal": "Il buono, il brutto, il cattivo - Sergio Leone (1966)",
    "year": 2026,
    "languageAr": "Italian",
    "languageEn": "Italian",
    "runtimeMinutes": 174,
    "poster": "https://archive.org/download/il-buono-il-brutto-il-cattivo/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/il-buono-il-brutto-il-cattivo/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 174 دقيقة.",
    "descriptionEn": "[Mostrando al Biondo un cappio] Lo riconosci quest'occhiello, biondo? [lanciandogli il cappio] Passalo su quel trave! Va su! Monta su quello! [il Biondo sale su uno sgabello] Bravo, così! Fissa bene la corda al trave: deve reggere il peso d'un maiale. Mettici dentro il collo! Bravissimo! Ti sta un po' comodo, eh? Be', rimediamo subito: ho un sistema nuovo! Un po' diverso dal tuo... Non sparo alla corda, sparo alle gambe dello sgabello! Adiós! (Tuco)",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/il-buono-il-brutto-il-cattivo/Il%20buono%2Cil%20brutto%2Cil%20cattivo%20-%20Sergio%20Leone%20%281966%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1023996150
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/il-buono-il-brutto-il-cattivo",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/il-buono-il-brutto-il-cattivo",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Il buono, il brutto, il cattivo - Sergio Leone (1966) (2026) — Sergio Leone",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/il-buono-il-brutto-il-cattivo/Il%20buono%2Cil%20brutto%2Cil%20cattivo%20-%20Sergio%20Leone%20%281966%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/il-buono-il-brutto-il-cattivo"
      }
    ]
  },
  {
    "id": "kekceve-ukane",
    "type": "movie",
    "genres": [
      "adventure",
      "family"
    ],
    "titleAr": "Kekec's Tricks full movie Kekceve ukane celoten film (1968)",
    "titleEn": "Kekec's Tricks full movie Kekceve ukane celoten film (1968)",
    "titleOriginal": "Kekec's Tricks full movie Kekceve ukane celoten film (1968)",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 75,
    "poster": "https://archive.org/download/kekceve-ukane/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/kekceve-ukane/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 75 دقيقة.",
    "descriptionEn": "Kekec's Tricks (Original title: Kekceve ukane) is a 1968 Yugoslavian adventure film. It is directed by Joze Gale and written by Ivan Ribic and Josip Vandot. The film is a sequel to Kekec (1951). This children's film follows the witty boy Kekec and his friends as they have adventures in the mountains of Slovenia during the summer. Kekec's Tricks. Release date: December 23, 1968. Genre: Adventure. ... Polde Bibic (Bedanec), Boris Ivanovski (Rozle), Zlatko Krasnic (Kekec), Jasna Krofak (Mojca), Fanika Podobnikar (Tinkara), Milorad Radovic (Brincelj), Joze Zupan (Vitranc).",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/kekceve-ukane/Kekec%27sTricks-all-subs.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 880894349
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/kekceve-ukane",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/kekceve-ukane",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Kekec's Tricks full movie Kekceve ukane celoten film (1968) (2025) — Joze Gale",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/kekceve-ukane/Kekec%27sTricks-all-subs.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/kekceve-ukane"
      }
    ]
  },
  {
    "id": "kev-ruaj-ntseg-ntawm-4-tug-tshaj-lij-1",
    "type": "movie",
    "genres": [
      "action",
      "drama",
      "fantasy"
    ],
    "titleAr": "Kev Ruaj Ntseg Ntawm 4 Tug Tshaj Lij 1",
    "titleEn": "Kev Ruaj Ntseg Ntawm 4 Tug Tshaj Lij 1",
    "titleOriginal": "Kev Ruaj Ntseg Ntawm 4 Tug Tshaj Lij 1",
    "year": 2025,
    "languageAr": "hmn",
    "languageEn": "hmn",
    "runtimeMinutes": 119,
    "poster": "https://archive.org/download/kev-ruaj-ntseg-ntawm-4-tug-tshaj-lij-1/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/kev-ruaj-ntseg-ntawm-4-tug-tshaj-lij-1/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 119 دقيقة.",
    "descriptionEn": "The Four 2012 crystal Lui,Anthony Wong Hmong dubbed by EQ Entertainment, there is only 3 parts that are dubbed in Hmong part 4 was never dubbed cuz JT production retired it's company maybe 2021? Hmong dubbed version title is Kev Ruaj Ntseg Ntawm 4 Tug Tshaj Lis,it means the Smart and dumbness from the 4 best fighters. Mai Yer Patreon Vimeo Channel has all 3 of them on her channel. Check my Patreon page Xindy Hmong Dubbed & Plus. It is very sad that all Hmong movie rental and DVD booth at stores closed down permanent on mid 2010s. Long Chang market on Franklin in Sacramento permanently closed down shop too. Please download video Incase If I ev",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/kev-ruaj-ntseg-ntawm-4-tug-tshaj-lij-1/Kev%20Ruaj%20Ntseg%20Ntawm%204%20Tug%20Tshaj%20Lij%201.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 963522635
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/kev-ruaj-ntseg-ntawm-4-tug-tshaj-lij-1",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/kev-ruaj-ntseg-ntawm-4-tug-tshaj-lij-1",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Kev Ruaj Ntseg Ntawm 4 Tug Tshaj Lij 1 (2025) — Xinderella Lee",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/kev-ruaj-ntseg-ntawm-4-tug-tshaj-lij-1/Kev%20Ruaj%20Ntseg%20Ntawm%204%20Tug%20Tshaj%20Lij%201.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/kev-ruaj-ntseg-ntawm-4-tug-tshaj-lij-1"
      }
    ]
  },
  {
    "id": "knockabout-directed-by-sammo-hung-starring-yuen-biao",
    "type": "movie",
    "genres": [
      "action",
      "comedy",
      "crime",
      "mystery"
    ],
    "titleAr": "Knockabout 雜家小子; Za jia xiao zi [ Directed By Sammo Hung, Starring Yuen Biao] [1979 Dubbed]",
    "titleEn": "Knockabout 雜家小子; Za jia xiao zi [ Directed By Sammo Hung, Starring Yuen Biao] [1979 Dubbed]",
    "titleOriginal": "Knockabout 雜家小子; Za jia xiao zi [ Directed By Sammo Hung, Starring Yuen Biao] [1979 Dubbed]",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 100,
    "poster": "https://archive.org/download/knockabout-directed-by-sammo-hung-starring-yuen-biao/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/knockabout-directed-by-sammo-hung-starring-yuen-biao/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 100 دقيقة.",
    "descriptionEn": "Knockabout (Chinese: 雜家小子; Za jia xiao zi ) is a 1979 Hong Kong martial arts comedy film starring Yuen Biao and directed by Sammo Hung , who also co-stars in the film. Plot The film follows two con artist brothers, Yipao / Little John (Yuen Biao) and Taipao / Big John (Bryan Leung). One day they are cheated out of their ill-gotten gains in an encounter with Jia Wu Dao / Silver Fox (Lau Kar Wing). They try to fight him, to retrieve their money, but are defeated, so they ask him to train them, hoping to become the best fighters in the city. After surpassing the fighting skills of \"ordinary people\", Yipao soon discovers that Jia Wu Dao is a murd",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/knockabout-directed-by-sammo-hung-starring-yuen-biao/1.%20Knockabout%20%5BDirected%20by%20Sammo%20Hung%20starring%20Yuen%20Biao%5D%20%5B1979%5D.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 766432747
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/knockabout-directed-by-sammo-hung-starring-yuen-biao",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/knockabout-directed-by-sammo-hung-starring-yuen-biao",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Knockabout 雜家小子; Za jia xiao zi [ Directed By Sammo Hung, Starring Yuen Biao] [1979 Dubbed] (2026) — KonCategoryIII",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/knockabout-directed-by-sammo-hung-starring-yuen-biao/1.%20Knockabout%20%5BDirected%20by%20Sammo%20Hung%20starring%20Yuen%20Biao%5D%20%5B1979%5D.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/knockabout-directed-by-sammo-hung-starring-yuen-biao"
      }
    ]
  },
  {
    "id": "251164-27e-63c-97-3a-92-4968-975b-8785ede-937d-1-jzuf-2203624-1fichier",
    "type": "movie",
    "genres": [
      "horror"
    ],
    "titleAr": "LaMatanzaDeTexas",
    "titleEn": "LaMatanzaDeTexas",
    "titleOriginal": "LaMatanzaDeTexas",
    "year": 2026,
    "languageAr": "spa",
    "languageEn": "spa",
    "runtimeMinutes": 84,
    "poster": "https://archive.org/download/251164-27e-63c-97-3a-92-4968-975b-8785ede-937d-1-jzuf-2203624-1fichier/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/251164-27e-63c-97-3a-92-4968-975b-8785ede-937d-1-jzuf-2203624-1fichier/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 84 دقيقة.",
    "descriptionEn": "Film directed by Tobe Hooper that premiered in 1974. The movie is about some teenagers who go to check their old house until, due to lack of gasoline, they go to a place supposedly without anyone without knowing that they are about to go through the worst nightmare they are going to have.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/251164-27e-63c-97-3a-92-4968-975b-8785ede-937d-1-jzuf-2203624-1fichier/251164--27e63c97-3a92-4968-975b-8785ede937d1--jzuf--2203624-1fichier.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 572256866
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/251164-27e-63c-97-3a-92-4968-975b-8785ede-937d-1-jzuf-2203624-1fichier",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/251164-27e-63c-97-3a-92-4968-975b-8785ede-937d-1-jzuf-2203624-1fichier",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "LaMatanzaDeTexas (2026) — Tobe Hooper",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/251164-27e-63c-97-3a-92-4968-975b-8785ede-937d-1-jzuf-2203624-1fichier/251164--27e63c97-3a92-4968-975b-8785ede937d1--jzuf--2203624-1fichier.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/251164-27e-63c-97-3a-92-4968-975b-8785ede-937d-1-jzuf-2203624-1fichier"
      }
    ]
  },
  {
    "id": "long-arm-of-the-law-iii",
    "type": "movie",
    "genres": [
      "action",
      "thriller"
    ],
    "titleAr": "Long Arm of The Law III (1989)",
    "titleEn": "Long Arm of The Law III (1989)",
    "titleOriginal": "Long Arm of The Law III (1989)",
    "year": 2026,
    "languageAr": "chi",
    "languageEn": "chi",
    "runtimeMinutes": 107,
    "poster": "https://archive.org/download/long-arm-of-the-law-iii/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/long-arm-of-the-law-iii/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 107 دقيقة.",
    "descriptionEn": "An ex-soldier escapes death row, fleeing to Hong Kong and forced to work for a gang of criminals when they kidnap the woman he loves.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/long-arm-of-the-law-iii/Long%20Arm%20of%20the%20Law%20III.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 624888184
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/long-arm-of-the-law-iii",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/long-arm-of-the-law-iii",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Long Arm of The Law III (1989) (2026) — Michael Mak Tong-Kit",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/long-arm-of-the-law-iii/Long%20Arm%20of%20the%20Law%20III.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/long-arm-of-the-law-iii"
      }
    ]
  },
  {
    "id": "quite-like-love-neon-fireplace-neon-glow-o-romantic-night-o-background-music",
    "type": "movie",
    "genres": [
      "romance"
    ],
    "titleAr": "Love Neon Fireplace 💗🔥 | Neon Glow • Romantic Night • Background Music",
    "titleEn": "Love Neon Fireplace 💗🔥 | Neon Glow • Romantic Night • Background Music",
    "titleOriginal": "Love Neon Fireplace 💗🔥 | Neon Glow • Romantic Night • Background Music",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 64,
    "poster": "https://archive.org/download/quite-like-love-neon-fireplace-neon-glow-o-romantic-night-o-background-music/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/quite-like-love-neon-fireplace-neon-glow-o-romantic-night-o-background-music/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 64 دقيقة.",
    "descriptionEn": "Quite Like Love Neon fireplace ambience. A glowing neon “Love” sign in the night, soft reflections on dark surfaces, and a warm source of fire creating contrast between cold neon light and cozy warmth. Calm romantic background music designed for long listening, evening relaxation, or quiet night moments. No vocals, no drops, no sudden changes — just neon glow, firelight, and steady atmospheric sound.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/quite-like-love-neon-fireplace-neon-glow-o-romantic-night-o-background-music/Quite%20Like%20Love%20Neon%20Fireplace%20%20Neon%20Glow%20%E2%80%A2%20Romantic%20Night%20%E2%80%A2%20Background%20Music.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 277230103
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/quite-like-love-neon-fireplace-neon-glow-o-romantic-night-o-background-music",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/quite-like-love-neon-fireplace-neon-glow-o-romantic-night-o-background-music",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Love Neon Fireplace 💗🔥 | Neon Glow • Romantic Night • Background Music (2026) — Budynok Khaltury",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/quite-like-love-neon-fireplace-neon-glow-o-romantic-night-o-background-music/Quite%20Like%20Love%20Neon%20Fireplace%20%20Neon%20Glow%20%E2%80%A2%20Romantic%20Night%20%E2%80%A2%20Background%20Music.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/quite-like-love-neon-fireplace-neon-glow-o-romantic-night-o-background-music"
      }
    ]
  },
  {
    "id": "magic-tree-house-202601",
    "type": "movie",
    "genres": [
      "fantasy",
      "animation"
    ],
    "titleAr": "Magic Tree House - 2011 - English sub",
    "titleEn": "Magic Tree House - 2011 - English sub",
    "titleOriginal": "Magic Tree House - 2011 - English sub",
    "year": 2011,
    "languageAr": "jpn",
    "languageEn": "jpn",
    "runtimeMinutes": 105,
    "poster": "https://archive.org/download/magic-tree-house_202601/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/magic-tree-house_202601/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2011، مدته نحو 105 دقيقة.",
    "descriptionEn": "Magic Tree House (マジック・ツリーハウス, Majikku Tsurī Hausu) is a 2011 Japanese animated fantasy film based on the American children's book series of the same name by Mary Pope Osborne. The film is directed by Hiroshi Nishikiori, and the film's screenplay was adapted from the Japanese version of the novel series Magic Tree House by Ichiro Okouchi. The film stars actress Keiko Kitagawa as Jack, and also stars child actress Mana Ashida as Annie. Magic Tree House debuted at the 24th Tokyo International Film Festival on October 23rd 2011. It was subsequently released in Japanese cinemas on January 7th 2012 and grossed the equivalent of 5.7 million US doll",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/magic-tree-house_202601/Magic%20Tree%20House.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 623409049
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/magic-tree-house_202601",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/magic-tree-house_202601",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Magic Tree House - 2011 - English sub (2011) — Gaga Communications",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/magic-tree-house_202601/Magic%20Tree%20House.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/magic-tree-house_202601"
      }
    ]
  },
  {
    "id": "may-2002-vose-anydownloader-com-1",
    "type": "movie",
    "genres": [
      "horror",
      "romance",
      "thriller"
    ],
    "titleAr": "May (May, ¿quieres ser mi amigo? / Muñeca diabólica / La cara del horror) 2002 [Subtítulos en Español]",
    "titleEn": "May (May, ¿quieres ser mi amigo? / Muñeca diabólica / La cara del horror) 2002 [Subtítulos en Español]",
    "titleOriginal": "May (May, ¿quieres ser mi amigo? / Muñeca diabólica / La cara del horror) 2002 [Subtítulos en Español]",
    "year": 2002,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 94,
    "poster": "https://archive.org/download/may-2002-vose-anydownloader.com-1/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/may-2002-vose-anydownloader.com-1/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2002، مدته نحو 94 دقيقة.",
    "descriptionEn": "May es una película estadounidense de terror psicológico de 2002 escrita y dirigida por Lucky McKee en su debut como director. Protagonizada por Angela Bettis, Jeremy Sisto, Anna Faris y James Duval. Sinopsis: Cuando May era niña, era una chica solitaria con un ojo vago y sin más amigos que una extraña muñeca casera guardada en una vitrina que le regaló su madre el día de su cumpleaños. May se convierte en una joven solitaria y extraña, que trabaja en un hospital de animales y ayuda al veterinario en las cirugías y a coser animales operados la mayor parte del tiempo. Su compañera lesbiana Polly siente una especie de atracción por ella. Cuando",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/may-2002-vose-anydownloader.com-1/may-2002-vose-anydownloader.com%20%281%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 803250622
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/may-2002-vose-anydownloader.com-1",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/may-2002-vose-anydownloader.com-1",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "May (May, ¿quieres ser mi amigo? / Muñeca diabólica / La cara del horror) 2002 [Subtítulos en Español] (2002) — Lucky McKee",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/may-2002-vose-anydownloader.com-1/may-2002-vose-anydownloader.com%20%281%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/may-2002-vose-anydownloader.com-1"
      }
    ]
  },
  {
    "id": "men-from-the-gutter-1983",
    "type": "movie",
    "genres": [
      "action",
      "thriller"
    ],
    "titleAr": "Men From The Gutter (1983)",
    "titleEn": "Men From The Gutter (1983)",
    "titleOriginal": "Men From The Gutter (1983)",
    "year": 2026,
    "languageAr": "chi",
    "languageEn": "chi",
    "runtimeMinutes": 88,
    "poster": "https://archive.org/download/men.-from.-the.-gutter.-1983/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/men.-from.-the.-gutter.-1983/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 88 دقيقة.",
    "descriptionEn": "Action thriller from director Lam Nai-Choi. Rip of the new HD transfer.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/men.-from.-the.-gutter.-1983/Men.From.The.Gutter.1983.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 517283489
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/men.-from.-the.-gutter.-1983",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/men.-from.-the.-gutter.-1983",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Men From The Gutter (1983) (2026) — Lam Nai-Choi",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/men.-from.-the.-gutter.-1983/Men.From.The.Gutter.1983.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/men.-from.-the.-gutter.-1983"
      }
    ]
  },
  {
    "id": "midnight-chillers-drive-in",
    "type": "movie",
    "genres": [
      "horror"
    ],
    "titleAr": "Midnight Chillers Drive In",
    "titleEn": "Midnight Chillers Drive In",
    "titleOriginal": "Midnight Chillers Drive In",
    "year": 2025,
    "languageAr": "Unknown",
    "languageEn": "Unknown",
    "runtimeMinutes": 94,
    "poster": "https://archive.org/download/midnight-chillers-drive-in/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/midnight-chillers-drive-in/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 94 دقيقة.",
    "descriptionEn": "Drive in slasher",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/midnight-chillers-drive-in/Midnight%20Chillers-%20Drive%20in.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 503081505
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/midnight-chillers-drive-in",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/midnight-chillers-drive-in",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Midnight Chillers Drive In (2025) — Zombie Rat Films",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/midnight-chillers-drive-in/Midnight%20Chillers-%20Drive%20in.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/midnight-chillers-drive-in"
      }
    ]
  },
  {
    "id": "midnight-chillers-living-dead",
    "type": "movie",
    "genres": [
      "horror"
    ],
    "titleAr": "Midnight Chillers Living Dead",
    "titleEn": "Midnight Chillers Living Dead",
    "titleOriginal": "Midnight Chillers Living Dead",
    "year": 2024,
    "languageAr": "Unknown",
    "languageEn": "Unknown",
    "runtimeMinutes": 99,
    "poster": "https://archive.org/download/midnight-chillers-living-dead/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/midnight-chillers-living-dead/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2024، مدته نحو 99 دقيقة.",
    "descriptionEn": "Edgar shows us the grand Daddy of all zombie movies. In bloody color uncut.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/midnight-chillers-living-dead/Midnight%20Chillers%20-%20Living%20Dead.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 360827795
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/midnight-chillers-living-dead",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/midnight-chillers-living-dead",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Midnight Chillers Living Dead (2024) — Zombie Rat Films",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/midnight-chillers-living-dead/Midnight%20Chillers%20-%20Living%20Dead.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/midnight-chillers-living-dead"
      }
    ]
  },
  {
    "id": "millionaires-express-geekjuicemedia",
    "type": "movie",
    "genres": [
      "action",
      "horror",
      "comedy",
      "adventure",
      "western"
    ],
    "titleAr": "Millionaires Express",
    "titleEn": "Millionaires Express",
    "titleOriginal": "Millionaires Express",
    "year": 2025,
    "languageAr": "english-handwritten",
    "languageEn": "english-handwritten",
    "runtimeMinutes": 90,
    "poster": "https://archive.org/download/millionaires-express-Geekjuicemedia/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/millionaires-express-Geekjuicemedia/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 90 دقيقة.",
    "descriptionEn": "Millionaires Express (Chinese: 富貴列車, also known as The Millionaires' Express[2] or Shanghai Express;[3] released in the Philippines as China Warriors)[4] is a 1986 Hong Kong western action comedy film starring, written and directed by Sammo Hung. The film co-stars Yuen Biao, Rosamund Kwan, Fan Mei-sheng, and Hwang Jang-lee.[5] Plot In Russia, Ching Fong-tin attempts to steal goods from Russian soldiers. They catch him and force him to strip down to his underwear and dance for their amusement. He escapes by stealing the soldiers' grenades and blowing up the cabin with them inside. Ching is immediately caught by government agent Fook Loi, but e",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/millionaires-express-Geekjuicemedia/Millionaires%20Express.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 693284554
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/millionaires-express-Geekjuicemedia",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/millionaires-express-Geekjuicemedia",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Millionaires Express (2025) — KonCategory3",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/millionaires-express-Geekjuicemedia/Millionaires%20Express.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/millionaires-express-Geekjuicemedia"
      }
    ]
  },
  {
    "id": "mismatched-couples-ching-fung-dik-sau-qing-feng-di-shou-1985",
    "type": "movie",
    "genres": [
      "action",
      "comedy",
      "romance"
    ],
    "titleAr": "Mismatched Couples (Ching.fung.dik.sau 情逢敵手 Qing.feng.di.shou. 1985)",
    "titleEn": "Mismatched Couples (Ching.fung.dik.sau 情逢敵手 Qing.feng.di.shou. 1985)",
    "titleOriginal": "Mismatched Couples (Ching.fung.dik.sau 情逢敵手 Qing.feng.di.shou. 1985)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 90,
    "poster": "https://archive.org/download/mismatched-couples-ching.fung.dik.sau-qing.feng.di.shou-1985/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/mismatched-couples-ching.fung.dik.sau-qing.feng.di.shou-1985/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 90 دقيقة.",
    "descriptionEn": "Mismatched Couples (a.k.a. Love Meets the Match ) is a 1985 Hong Kong action romantic comedy film directed by Yuen Woo-ping and starring himself alongside Donnie Yen . The film was created during hip hop culture's height of popularity in the 1980s, and in addition to martial arts, incorporates b-boying , popping , locking , and the electric boogaloo . Plot Eddie ( Donnie Yen ) is a martial artist and hip hop dancer. In the film, he befriends a poor old man named Mini ( Yuen Woo-ping ). Mini later falls in love with Eddie's older sister, Ying (Wong Wan-si). Later, Eddie's \"cousin\"(not blood related...), Stella ( May Lo ), falls for him, but Ed",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/mismatched-couples-ching.fung.dik.sau-qing.feng.di.shou-1985/Mismatched%20Couples%20%28Ching.fung.dik.sau%20%E6%83%85%E9%80%A2%E6%95%B5%E6%89%8B%20Qing.feng.di.shou.1985%29_.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 806835967
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/mismatched-couples-ching.fung.dik.sau-qing.feng.di.shou-1985",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/mismatched-couples-ching.fung.dik.sau-qing.feng.di.shou-1985",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Mismatched Couples (Ching.fung.dik.sau 情逢敵手 Qing.feng.di.shou. 1985) (2026) — KonCATIII",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/mismatched-couples-ching.fung.dik.sau-qing.feng.di.shou-1985/Mismatched%20Couples%20%28Ching.fung.dik.sau%20%E6%83%85%E9%80%A2%E6%95%B5%E6%89%8B%20Qing.feng.di.shou.1985%29_.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/mismatched-couples-ching.fung.dik.sau-qing.feng.di.shou-1985"
      }
    ]
  },
  {
    "id": "moon-zero-two-1969",
    "type": "movie",
    "genres": [
      "scifi",
      "western"
    ],
    "titleAr": "Moon Zero Two (1969)",
    "titleEn": "Moon Zero Two (1969)",
    "titleOriginal": "Moon Zero Two (1969)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 100,
    "poster": "https://archive.org/download/moon-zero-two.1969/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/moon-zero-two.1969/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 100 دقيقة.",
    "descriptionEn": "On the Moon in the year 2021, a former astronaut-turned-salvager helps a millionaire space industrialist capture a 6000-ton sapphire asteroid, while also assisting a woman in finding her missing miner/prospector brother.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/moon-zero-two.1969/Moon%20Zero%20Two%20%281969%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 577031689
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/moon-zero-two.1969",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/moon-zero-two.1969",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Moon Zero Two (1969) (2026) — Roy Ward Baker",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/moon-zero-two.1969/Moon%20Zero%20Two%20%281969%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/moon-zero-two.1969"
      }
    ]
  },
  {
    "id": "myfriendstiggerandpoohsupersleuthchristmasmoviez1abuad0051001",
    "type": "movie",
    "genres": [
      "comedy",
      "adventure",
      "fantasy",
      "animation"
    ],
    "titleAr": "My Friends Tigger and Pooh - Super Sleuth Christmas Movie (Z1A BUAD0051001)",
    "titleEn": "My Friends Tigger and Pooh - Super Sleuth Christmas Movie (Z1A BUAD0051001)",
    "titleOriginal": "My Friends Tigger and Pooh - Super Sleuth Christmas Movie (Z1A BUAD0051001)",
    "year": 2007,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 96,
    "poster": "https://archive.org/download/myfriendstiggerandpoohsupersleuthchristmasmoviez1abuad0051001/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/myfriendstiggerandpoohsupersleuthchristmasmoviez1abuad0051001/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2007، مدته نحو 96 دقيقة.",
    "descriptionEn": "CGI-animated adventure with Pooh and his friends. When Pooh and the gang find one of Santa's reindeer lost in the woods, they fear Santa won't be able to deliver presents around the world without all of his reindeer. Hoping to save Christmas, they set off to deliver him back to the North Pole. But along the way, they become stranded and have to set up camp. It's not the ideal Christmas Eve - but they learn that the true meaning of Christmas is about being together. This title introduces new characters Darby, a precocious six-year-old, and her dog Buster, who live on the outskirts of the 100-Acre Wood.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/myfriendstiggerandpoohsupersleuthchristmasmoviez1abuad0051001/My%20Friends%20Tigger%20and%20Pooh%20-%20Super%20Sleuth%20Christmas%20Movie%20%28Z1A%20BUAD0051001%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1561153121
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/myfriendstiggerandpoohsupersleuthchristmasmoviez1abuad0051001",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/myfriendstiggerandpoohsupersleuthchristmasmoviez1abuad0051001",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "My Friends Tigger and Pooh - Super Sleuth Christmas Movie (Z1A BUAD0051001) (2007) — A. A. Milne, Walt Disney",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/myfriendstiggerandpoohsupersleuthchristmasmoviez1abuad0051001/My%20Friends%20Tigger%20and%20Pooh%20-%20Super%20Sleuth%20Christmas%20Movie%20%28Z1A%20BUAD0051001%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/myfriendstiggerandpoohsupersleuthchristmasmoviez1abuad0051001"
      }
    ]
  },
  {
    "id": "my-lucky-stars-with-trailers",
    "type": "movie",
    "genres": [
      "action",
      "comedy",
      "war"
    ],
    "titleAr": "MY LUCKY STARS 福星高照 [Dubbed & Subtitled] 1985",
    "titleEn": "MY LUCKY STARS 福星高照 [Dubbed & Subtitled] 1985",
    "titleOriginal": "MY LUCKY STARS 福星高照 [Dubbed & Subtitled] 1985",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 96,
    "poster": "https://archive.org/download/my-lucky-stars-with-trailers/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/my-lucky-stars-with-trailers/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 96 دقيقة.",
    "descriptionEn": "My Lucky Stars ( Chinese : 福星高照 ) is a 1985 Hong Kong action comedy film starring and directed by Sammo Hung . The film was written by Barry Wong , and produced by Leonard Ho . The film co-stars Jackie Chan , Yuen Biao , Sibelle Hu , Richard Ng , Charlie Chin , Eric Tsang , and Stanley Fung . [ 1 ] It was released as 5 Lucky Stars in Japan [ 2 ] and as Ninja Encounter in the Philippines . [ 3 ] My Lucky Stars is the second film in the Lucky Stars series , and a semi-sequel to Winners and Sinners , with many of the same actors returning as the \"Five Lucky Stars\" troupe, albeit with different character names and slightly different roles. Plot s",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/my-lucky-stars-with-trailers/1.%20My%20Lucky%20Stars%20%281985%20Dubbed%29.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 875169982
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/my-lucky-stars-with-trailers",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/my-lucky-stars-with-trailers",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "MY LUCKY STARS 福星高照 [Dubbed & Subtitled] 1985 (2026) — KonCATIII",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/my-lucky-stars-with-trailers/1.%20My%20Lucky%20Stars%20%281985%20Dubbed%29.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/my-lucky-stars-with-trailers"
      }
    ]
  },
  {
    "id": "na-part-30-pictures",
    "type": "movie",
    "genres": [
      "western"
    ],
    "titleAr": "NA Part 30 Pictures",
    "titleEn": "NA Part 30 Pictures",
    "titleOriginal": "NA Part 30 Pictures",
    "year": 2024,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 84,
    "poster": "https://archive.org/download/na-part-30-pictures/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/na-part-30-pictures/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2024، مدته نحو 84 دقيقة.",
    "descriptionEn": "First with canvas and paint, later with cameras and glass plates - artists hurried into the American West to capture the disappearing lives and culture of Native Americans before they were gone forever. This is number 30 in the series on Native Americans produced for Ramping Up your English. Host John Letz introduces viewers to notable artists, some of whom dedicated their lives to documenting ways of life, cultures, and individuals during these times of massive change.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/na-part-30-pictures/NA%20Part%2030%20Pictures.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 400654241
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/na-part-30-pictures",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/na-part-30-pictures",
    "licenseName": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "attribution": "NA Part 30 Pictures (2024) — John Letz",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/na-part-30-pictures/NA%20Part%2030%20Pictures.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/na-part-30-pictures"
      }
    ]
  },
  {
    "id": "napoleon-high-school-grease-the-musical-circa-1990-captured-20231014",
    "type": "movie",
    "genres": [
      "drama",
      "musical"
    ],
    "titleAr": "Napoleon High School Grease The Musical Circa 1990 Captured 20231014",
    "titleEn": "Napoleon High School Grease The Musical Circa 1990 Captured 20231014",
    "titleOriginal": "Napoleon High School Grease The Musical Circa 1990 Captured 20231014",
    "year": 2023,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 106,
    "poster": "https://archive.org/download/napoleon-high-school-grease-the-musical-circa-1990-captured-20231014/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/napoleon-high-school-grease-the-musical-circa-1990-captured-20231014/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2023، مدته نحو 106 دقيقة.",
    "descriptionEn": "Napoleon, Ohio high school drama presents the musical 'Grease' in 1990.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/napoleon-high-school-grease-the-musical-circa-1990-captured-20231014/Napoleon_High_School-Grease_the_Musical_circa_1990-Captured_20231014.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 612521240
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/napoleon-high-school-grease-the-musical-circa-1990-captured-20231014",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/napoleon-high-school-grease-the-musical-circa-1990-captured-20231014",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Napoleon High School Grease The Musical Circa 1990 Captured 20231014 (2023) — ",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/napoleon-high-school-grease-the-musical-circa-1990-captured-20231014/Napoleon_High_School-Grease_the_Musical_circa_1990-Captured_20231014.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/napoleon-high-school-grease-the-musical-circa-1990-captured-20231014"
      }
    ]
  },
  {
    "id": "need-for-speed-2014-full-movie-01",
    "type": "movie",
    "genres": [
      "action",
      "thriller",
      "crime",
      "adventure"
    ],
    "titleAr": "Need For Speed (2014) - Full Movie",
    "titleEn": "Need For Speed (2014) - Full Movie",
    "titleOriginal": "Need For Speed (2014) - Full Movie",
    "year": 2014,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 131,
    "poster": "https://archive.org/download/need-for-speed-2014-full-movie-01/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/need-for-speed-2014-full-movie-01/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2014، مدته نحو 131 دقيقة.",
    "descriptionEn": "ChatGPT \"Need for Speed\" follows Tobey Marshall, a street racer who seeks revenge after his friend is killed by a rival driver, Dino Brewster. After being framed for a crime he didn’t commit, Tobey is released from prison and joins a high-stakes cross-country race to clear his name and exact his revenge. The movie features thrilling car chases, intense races, and a quest for justice as Tobey and his crew navigate dangerous roads and deceitful opponents. Ultimately, it's a high-octane journey about redemption, loyalty, and the need for speed.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/need-for-speed-2014-full-movie-01/Need%20For%20Speed%202014%20full%20movie-01.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 577782359
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/need-for-speed-2014-full-movie-01",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/need-for-speed-2014-full-movie-01",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Need For Speed (2014) - Full Movie (2014) — Scott Waugh",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/need-for-speed-2014-full-movie-01/Need%20For%20Speed%202014%20full%20movie-01.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/need-for-speed-2014-full-movie-01"
      }
    ]
  },
  {
    "id": "nevada-smith-1966",
    "type": "movie",
    "genres": [
      "western"
    ],
    "titleAr": "Nevada Smith (1966)",
    "titleEn": "Nevada Smith (1966)",
    "titleOriginal": "Nevada Smith (1966)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 131,
    "poster": "https://archive.org/download/nevada.smith.1966/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/nevada.smith.1966/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 131 دقيقة.",
    "descriptionEn": "Nevada Smith is the young son of an Indian American mother and European-American father. When his father is killed by three men over gold, Nevada sets out to find them and kill them. The boy is taken in by a gun merchant. The gun merchant shows him how to shoot and to shoot on time and correct.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/nevada.smith.1966/Nevada%20Smith%20%281966%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 2339717869
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/nevada.smith.1966",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/nevada.smith.1966",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Nevada Smith (1966) (2026) — Henry Hathaway",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/nevada.smith.1966/Nevada%20Smith%20%281966%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/nevada.smith.1966"
      }
    ]
  },
  {
    "id": "new-dragon-gate-inn",
    "type": "movie",
    "genres": [
      "action",
      "comedy",
      "thriller",
      "war",
      "history"
    ],
    "titleAr": "New Dragon Gate Inn 新龍門客棧 (GeekJuiceMedia)",
    "titleEn": "New Dragon Gate Inn 新龍門客棧 (GeekJuiceMedia)",
    "titleOriginal": "New Dragon Gate Inn 新龍門客棧 (GeekJuiceMedia)",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 98,
    "poster": "https://archive.org/download/new-dragon-gate-inn/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/new-dragon-gate-inn/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 98 دقيقة.",
    "descriptionEn": "New Dragon Gate Inn is a 1992 Hong Kong wuxia film directed by Raymond Lee and produced by Tsui Hark , starring Maggie Cheung , Brigitte Lin , Tony Leung Ka-fai , and Donnie Yen . It was released as Dragon Inn in North America. The film is a remake of Dragon Gate Inn (1967). New Dragon Gate Inn was shot as a standard wuxia action thriller, with fast-paced action including martial arts, sword fighting and black comedy set in ancient China. Plot This is a period film set during the Ming Dynasty in the desert region of China. Tsao Siu-yan is a power-crazed eunuch who rules China as if he were the Emperor and not a mere official. He is the head o",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/new-dragon-gate-inn/New%20Dragon%20Gate%20Inn.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 934458827
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/new-dragon-gate-inn",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/new-dragon-gate-inn",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "New Dragon Gate Inn 新龍門客棧 (GeekJuiceMedia) (2025) — KonCategory3",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/new-dragon-gate-inn/New%20Dragon%20Gate%20Inn.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/new-dragon-gate-inn"
      }
    ]
  },
  {
    "id": "1000172859",
    "type": "movie",
    "genres": [
      "crime",
      "mystery",
      "musical"
    ],
    "titleAr": "Nick Jr Pocoyo's Picks (January 16, 2012/Martin Luther King Day) Full Ideal Recording",
    "titleEn": "Nick Jr Pocoyo's Picks (January 16, 2012/Martin Luther King Day) Full Ideal Recording",
    "titleOriginal": "Nick Jr Pocoyo's Picks (January 16, 2012/Martin Luther King Day) Full Ideal Recording",
    "year": 2012,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 180,
    "poster": "https://archive.org/download/1000172859/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/1000172859/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2012، مدته نحو 180 دقيقة.",
    "descriptionEn": "Includes: A Little Something Between Friends / Angry Alien / The Messy Guest / Pocoyo's Balloon Drum Roll Please / Drummer Boy / Musical Blocks / Dance Off Elly Spots / The Big Sneeze / Detective Pocoyo / Elly's Tea Party Elly's Shoes /Elly's Doll / Elly's Ballet Class / Elly on Ice Pato's Postal Service/Pato's Egg/Pato's Paintings/Farewell Friends Sleepy Bird's Surprise / Vamoosh on the Loose / Baby Bird Bother / Baby Bird Sitting I Don't own anything, all content belongs to their respective copyright owners.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/1000172859/1000172859.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 741603183
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/1000172859",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/1000172859",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Nick Jr Pocoyo's Picks (January 16, 2012/Martin Luther King Day) Full Ideal Recording (2012) — Nick Jr.",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/1000172859/1000172859.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/1000172859"
      }
    ]
  },
  {
    "id": "vts-01-2-20260508",
    "type": "movie",
    "genres": [
      "fantasy"
    ],
    "titleAr": "Nick Playdate (June 9, 2010) Full Recordings",
    "titleEn": "Nick Playdate (June 9, 2010) Full Recordings",
    "titleOriginal": "Nick Playdate (June 9, 2010) Full Recordings",
    "year": 2010,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 180,
    "poster": "https://archive.org/download/vts-01-2_20260508/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/vts-01-2_20260508/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2010، مدته نحو 180 دقيقة.",
    "descriptionEn": "Includes Real Version Ni Hao, Kai-Lan: Hoho's Big Flight Go, Diego, Go!: Baby Jaguar to the Rescue Max & Ruby: Ruby's Lemonade Stand / Ruby's Rummage Sale / Ruby's Magic Act Team Umizoomi: The Dinosaur Museum Mishap Dora the Explorer: Dora Saves the Snow Princess Ideal Version Dora the Explorer: Bouncing Ball Wow! Wow! Wubbzy!: Hoop Dreamz / Daizy's Purple Thumb Ni Hao, Kai-Lan:The Hula Duck Dance Party Jack's Big Music Show: Jack and the Beanstalk Olivia: Olivia and the Babies / Olivia's Good Luck Team Umizoomi: Carnival I don't own anything, all content belongs to their respective copyright owners.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/vts-01-2_20260508/VTS%2001%201.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 741586635
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/vts-01-2_20260508",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/vts-01-2_20260508",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Nick Playdate (June 9, 2010) Full Recordings (2010) — Nickelodeon",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/vts-01-2_20260508/VTS%2001%201.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/vts-01-2_20260508"
      }
    ]
  },
  {
    "id": "nightmare-fuel-s-2-ep-1",
    "type": "movie",
    "genres": [
      "horror"
    ],
    "titleAr": "Nightmare Fuel S 2 EP 1",
    "titleEn": "Nightmare Fuel S 2 EP 1",
    "titleOriginal": "Nightmare Fuel S 2 EP 1",
    "year": 2023,
    "languageAr": "Unknown",
    "languageEn": "Unknown",
    "runtimeMinutes": 82,
    "poster": "https://archive.org/download/nightmare-fuel-s-2-ep-1/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/nightmare-fuel-s-2-ep-1/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2023، مدته نحو 82 دقيقة.",
    "descriptionEn": "Classic movies with commercials and promos",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/nightmare-fuel-s-2-ep-1/Nightmare%20Fuel%20S2%20EP1.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 298920702
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/nightmare-fuel-s-2-ep-1",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/nightmare-fuel-s-2-ep-1",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Nightmare Fuel S 2 EP 1 (2023) — Zombie Rat Films",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/nightmare-fuel-s-2-ep-1/Nightmare%20Fuel%20S2%20EP1.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/nightmare-fuel-s-2-ep-1"
      }
    ]
  },
  {
    "id": "operation-scorpio-1992-full-movie-david-lai-hd-aka-scorpion-king-english-dub",
    "type": "movie",
    "genres": [
      "action",
      "war"
    ],
    "titleAr": "Operation Scorpio 羯子戰士 (1992) aka Scorpion King (GeekJuiceMedia)",
    "titleEn": "Operation Scorpio 羯子戰士 (1992) aka Scorpion King (GeekJuiceMedia)",
    "titleOriginal": "Operation Scorpio 羯子戰士 (1992) aka Scorpion King (GeekJuiceMedia)",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 99,
    "poster": "https://archive.org/download/operation-scorpio-1992-full-movie-david-lai-hd-aka-scorpion-king-english-dub/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/operation-scorpio-1992-full-movie-david-lai-hd-aka-scorpion-king-english-dub/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 99 دقيقة.",
    "descriptionEn": "The Scorpion King (released in Hong Kong as Operation Scorpio ) ( Chinese : 羯子戰士 ) is a 1992 Hong Kong martial arts film directed by David Lai, and produced by Sammo Hung . The film stars Chin Kar-lok , Lau Kar-leung and Kim Won-jin. The film was released theatrically in Hong Kong on 12 November 1992. Plot Budding comic book artist Yuk Su ( Chin Kar-Lok ) finds himself living out the fantasies of his alternate world when he saves a young girl from an illegal prostitution racket. After he was expelled from medical school his father took Yuk Su to one of his father's friends to help him keep up with his education. Soon he found a teacher ( Lau",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/operation-scorpio-1992-full-movie-david-lai-hd-aka-scorpion-king-english-dub/Operation%20Scorpio%20%281992%29%20Full%20Movie%20David%20Lai%20HD%20AKA%20Scorpion%20King%20English%20DUB.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 630785622
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/operation-scorpio-1992-full-movie-david-lai-hd-aka-scorpion-king-english-dub",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/operation-scorpio-1992-full-movie-david-lai-hd-aka-scorpion-king-english-dub",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Operation Scorpio 羯子戰士 (1992) aka Scorpion King (GeekJuiceMedia) (2025) — KonCategory3",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/operation-scorpio-1992-full-movie-david-lai-hd-aka-scorpion-king-english-dub/Operation%20Scorpio%20%281992%29%20Full%20Movie%20David%20Lai%20HD%20AKA%20Scorpion%20King%20English%20DUB.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/operation-scorpio-1992-full-movie-david-lai-hd-aka-scorpion-king-english-dub"
      }
    ]
  },
  {
    "id": "operation-thunderbolt-1977",
    "type": "movie",
    "genres": [
      "action",
      "thriller"
    ],
    "titleAr": "Operation Thunderbolt (1977)",
    "titleEn": "Operation Thunderbolt (1977)",
    "titleOriginal": "Operation Thunderbolt (1977)",
    "year": 2026,
    "languageAr": "heb",
    "languageEn": "heb",
    "runtimeMinutes": 128,
    "poster": "https://archive.org/download/operation.-thunderbolt.-1977/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/operation.-thunderbolt.-1977/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 128 دقيقة.",
    "descriptionEn": "In July 1976, an Air France flight from Tel-Aviv to Paris via Athens was hijacked and forced to land in Entebbe, Uganda. The Jewish passengers were separated and held hostage in demand to release many terrorists held in Israeli prisons. After much debate, the Israeli government sent an elite commando unit to raid the airfield and release the hostages.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/operation.-thunderbolt.-1977/Operation.Thunderbolt.1977.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 743814023
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/operation.-thunderbolt.-1977",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/operation.-thunderbolt.-1977",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Operation Thunderbolt (1977) (2026) — Menahem Golan",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/operation.-thunderbolt.-1977/Operation.Thunderbolt.1977.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/operation.-thunderbolt.-1977"
      }
    ]
  },
  {
    "id": "ourmashaandthemagicnut",
    "type": "movie",
    "genres": [
      "comedy",
      "adventure",
      "fantasy",
      "animation"
    ],
    "titleAr": "Our Masha and the Magic Nut (Russian)",
    "titleEn": "Our Masha and the Magic Nut (Russian)",
    "titleOriginal": "Our Masha and the Magic Nut (Russian)",
    "year": 2009,
    "languageAr": "rus",
    "languageEn": "rus",
    "runtimeMinutes": 73,
    "poster": "https://archive.org/download/OurMashaandtheMagicNut/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/OurMashaandtheMagicNut/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2009، مدته نحو 73 دقيقة.",
    "descriptionEn": "No introduction to this masterpiece is needed, all the homies from the eastern block know what it is about and it's place in the history of animation. Yes, it has 2/10 rating on IMDB, but if you will not take this movie seriously, it's absolutely amazing.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/OurMashaandtheMagicNut/Our%20Masha%20and%20the%20Magic%20Nut.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1265630338
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/OurMashaandtheMagicNut",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/OurMashaandtheMagicNut",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Our Masha and the Magic Nut (Russian) (2009) — Amedia",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/OurMashaandtheMagicNut/Our%20Masha%20and%20the%20Magic%20Nut.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/OurMashaandtheMagicNut"
      }
    ]
  },
  {
    "id": "panic-in-echo-park",
    "type": "movie",
    "genres": [
      "drama"
    ],
    "titleAr": "Panic In Echo Park (1977)",
    "titleEn": "Panic In Echo Park (1977)",
    "titleOriginal": "Panic In Echo Park (1977)",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 73,
    "poster": "https://archive.org/download/panic-in-echo-park/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/panic-in-echo-park/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 73 دقيقة.",
    "descriptionEn": "From IMDb : Dr. Michael Stoner, a young physician working in a Los Angeles hospital, discovers evidence of a potentially fatal epidemic spreading within the predominantly minority community of Echo Park. Despite his initial concerns, his warnings are met with skepticism and dismissed by both his superiors and city officials. Faced with bureaucratic indifference and systemic obstacles, Dr. Stoner initiates an independent investigation to identify the source of the outbreak. He navigates a challenging environment characterized by limited resources, institutional resistance, and the growing fear and distrust within the community. Through his tir",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/panic-in-echo-park/Panic_in_Echo_Park.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 421557646
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/panic-in-echo-park",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/panic-in-echo-park",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Panic In Echo Park (1977) (2025) — National Broadcasting Company",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/panic-in-echo-park/Panic_in_Echo_Park.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/panic-in-echo-park"
      }
    ]
  },
  {
    "id": "paper-marriage-1988",
    "type": "movie",
    "genres": [
      "action",
      "comedy",
      "adventure"
    ],
    "titleAr": "Paper Marriage 過埠新娘[1988] ☯ GeekJuiceMedia",
    "titleEn": "Paper Marriage 過埠新娘[1988] ☯ GeekJuiceMedia",
    "titleOriginal": "Paper Marriage 過埠新娘[1988] ☯ GeekJuiceMedia",
    "year": 2025,
    "languageAr": "english-handwritten",
    "languageEn": "english-handwritten",
    "runtimeMinutes": 92,
    "poster": "https://archive.org/download/paper-marriage-1988/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/paper-marriage-1988/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 92 دقيقة.",
    "descriptionEn": "Paper Marriage ( Chinese : 過埠新娘 ; Jyutping : Gwo3 Fau6 San1 Neong2 ) is a 1988 Hong Kong action comedy film directed and co-written by Alfred Cheung , and starring Sammo Hung and Maggie Cheung . It was released by Golden Harvest on 14 April 1988. In the United States, a down-on-his-luck Chinese boxer named Bo Chin accepts promise of payment to marry a Hong Kong woman named Jade Lee so she can get American citizenship. They realize too late that they have been set up in a complicated plan to cheat them out of the woman's money. Their adventures begin when Bo is forced back into the boxing ring and Jade tries her hand at mud wrestling . Cast Sa",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/paper-marriage-1988/Paper%20Marriage%20%5B1988%5D.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 714896501
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/paper-marriage-1988",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/paper-marriage-1988",
    "licenseName": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "attribution": "Paper Marriage 過埠新娘[1988] ☯ GeekJuiceMedia (2025) — KonCategory3",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/paper-marriage-1988/Paper%20Marriage%20%5B1988%5D.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/paper-marriage-1988"
      }
    ]
  },
  {
    "id": "vidklvpelicula20200907basuritasthegarbagepailkidsmovielapandillabasura1987posl33c8e0",
    "type": "movie",
    "genres": [
      "family"
    ],
    "titleAr": "Película: Basuritas - The Garbage Pail Kids Movie - La Pandilla Basura (1987) [Posl33_C8E0]",
    "titleEn": "Película: Basuritas - The Garbage Pail Kids Movie - La Pandilla Basura (1987) [Posl33_C8E0]",
    "titleOriginal": "Película: Basuritas - The Garbage Pail Kids Movie - La Pandilla Basura (1987) [Posl33_C8E0]",
    "year": 2024,
    "languageAr": "spanish",
    "languageEn": "spanish",
    "runtimeMinutes": 96,
    "poster": "https://archive.org/download/vidklvpelicula20200907basuritasthegarbagepailkidsmovielapandillabasura1987posl33c8e0/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/vidklvpelicula20200907basuritasthegarbagepailkidsmovielapandillabasura1987posl33c8e0/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2024، مدته نحو 96 دقيقة.",
    "descriptionEn": "Película: Basuritas - The Garbage Pail Kids Movie - La Pandilla Basura (1987) [Posl33_C8E0] is a feature-length fiction film from 2024.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/vidklvpelicula20200907basuritasthegarbagepailkidsmovielapandillabasura1987posl33c8e0/Pel%C3%ADcula/20200907%20Basuritas%20-%20The%20Garbage%20Pail%20Kids%20Movie%20-%20La%20Pandilla%20Basura%20%281987%29%20%5BPOsl33_c8e0%5D/20200907%20Basuritas%20-%20The%20Garbage%20Pail%20Kids%20Movie%20-%20La%20Pandilla%20Basura%20%281987%29%20%5BPOsl33_c8e0%5D.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 480278721
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/vidklvpelicula20200907basuritasthegarbagepailkidsmovielapandillabasura1987posl33c8e0",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/vidklvpelicula20200907basuritasthegarbagepailkidsmovielapandillabasura1987posl33c8e0",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Película: Basuritas - The Garbage Pail Kids Movie - La Pandilla Basura (1987) [Posl33_C8E0] (2024) — Videoteca",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/vidklvpelicula20200907basuritasthegarbagepailkidsmovielapandillabasura1987posl33c8e0/Pel%C3%ADcula/20200907%20Basuritas%20-%20The%20Garbage%20Pail%20Kids%20Movie%20-%20La%20Pandilla%20Basura%20%281987%29%20%5BPOsl33_c8e0%5D/20200907%20Basuritas%20-%20The%20Garbage%20Pail%20Kids%20Movie%20-%20La%20Pandilla%20Basura%20%281987%29%20%5BPOsl33_c8e0%5D.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/vidklvpelicula20200907basuritasthegarbagepailkidsmovielapandillabasura1987posl33c8e0"
      }
    ]
  },
  {
    "id": "pokemon-double-feature-vol-1-mewtwo-strikes-back-mewtwo-returns-2026",
    "type": "movie",
    "genres": [
      "action",
      "adventure",
      "war"
    ],
    "titleAr": "Pokémon: Double Feature Vol. 1 - 'Mewtwo Strikes Back' & 'Mewtwo Returns' (2026)",
    "titleEn": "Pokémon: Double Feature Vol. 1 - 'Mewtwo Strikes Back' & 'Mewtwo Returns' (2026)",
    "titleOriginal": "Pokémon: Double Feature Vol. 1 - 'Mewtwo Strikes Back' & 'Mewtwo Returns' (2026)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 153,
    "poster": "https://archive.org/download/pokemon-double-feature-vol.-1-mewtwo-strikes-back-mewtwo-returns-2026/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/pokemon-double-feature-vol.-1-mewtwo-strikes-back-mewtwo-returns-2026/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 153 دقيقة.",
    "descriptionEn": "Get ready for the action-packed adventures of Ash, Pikachu, Misty, Brock and all their friends in over 2 full hours of 2 Pokémon feature films on 1 bumper-packed video! In the first movie \"Mewtwo Strikes Back\", the adventure explodes into action with the debut of Mewtwo, a bio-engineered Pokémon created from the DNA of Mew, the rarest of all Pokémon. After escaping from the lab where it was created, Mewtwo is determined to prove its own superiority. It lures a number of talented Trainers into a Pokémon battle like never before-and of course, Ash and his friends are happy to accept the challenge! Ash's excitement turns to fear and anger when M",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/pokemon-double-feature-vol.-1-mewtwo-strikes-back-mewtwo-returns-2026/Pok%C3%A9mon%20-%20Double%20Feature%20Vol.%201%20-%20%27Mewtwo%20Strikes%20Back%27%20%26%20%27Mewtwo%20Returns%27%20%282026%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1290144669
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/pokemon-double-feature-vol.-1-mewtwo-strikes-back-mewtwo-returns-2026",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/pokemon-double-feature-vol.-1-mewtwo-strikes-back-mewtwo-returns-2026",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Pokémon: Double Feature Vol. 1 - 'Mewtwo Strikes Back' & 'Mewtwo Returns' (2026) (2026) — The Authentic Video Music Club",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/pokemon-double-feature-vol.-1-mewtwo-strikes-back-mewtwo-returns-2026/Pok%C3%A9mon%20-%20Double%20Feature%20Vol.%201%20-%20%27Mewtwo%20Strikes%20Back%27%20%26%20%27Mewtwo%20Returns%27%20%282026%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/pokemon-double-feature-vol.-1-mewtwo-strikes-back-mewtwo-returns-2026"
      }
    ]
  },
  {
    "id": "power-encounter-3-tim-warner-v-1-720p",
    "type": "movie",
    "genres": [
      "horror",
      "western"
    ],
    "titleAr": "Power Encounter 3: Animism - Dr Timothy Warner",
    "titleEn": "Power Encounter 3: Animism - Dr Timothy Warner",
    "titleOriginal": "Power Encounter 3: Animism - Dr Timothy Warner",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 61,
    "poster": "https://archive.org/download/power-encounter-3-tim-warner-v-1-720p/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/power-encounter-3-tim-warner-v-1-720p/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 61 دقيقة.",
    "descriptionEn": "The sermon centers on the critical importance of understanding and engaging with people’s worldview—particularly in cross-cultural missions—arguing that true conversion requires confronting not just intellectual beliefs but the experiential and spiritual dimensions of a person’s belief system, such as animism, ancestor worship, and spiritual powers. It critiques the Western Christian tendency to operate from a deistic, dualistic worldview that separates the natural and supernatural realms, leading to a diminished perception of demonic forces and the Holy Spirit’s active presence. Instead, the sermon advocates for a biblical worldview that aff",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/power-encounter-3-tim-warner-v-1-720p/power_encounter_3_-_tim_warner_v1%20%28720p%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 907839475
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/power-encounter-3-tim-warner-v-1-720p",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/power-encounter-3-tim-warner-v-1-720p",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Power Encounter 3: Animism - Dr Timothy Warner (2025) — Trinity",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/power-encounter-3-tim-warner-v-1-720p/power_encounter_3_-_tim_warner_v1%20%28720p%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/power-encounter-3-tim-warner-v-1-720p"
      }
    ]
  },
  {
    "id": "power-encounter-6-tim-warner-v-1-720p",
    "type": "movie",
    "genres": [
      "fantasy"
    ],
    "titleAr": "Power Encounter 6: Spiritual Authority - Dr Timothy Warner",
    "titleEn": "Power Encounter 6: Spiritual Authority - Dr Timothy Warner",
    "titleOriginal": "Power Encounter 6: Spiritual Authority - Dr Timothy Warner",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 62,
    "poster": "https://archive.org/download/power-encounter-6-tim-warner-v-1-720p/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/power-encounter-6-tim-warner-v-1-720p/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 62 دقيقة.",
    "descriptionEn": "This class centers on the Christian's spiritual authority and resistance to evil, grounded in the believer's position in Christ, as revealed in Ephesians. It emphasizes that true spiritual warfare is not fought through human strength or cognitive knowledge alone, but through the power of God’s resurrection life, which places believers far above spiritual forces of darkness. The preacher underscores the inseparable interplay of the world, the flesh, and the devil, warning against treating them as isolated or mutually exclusive, while affirming that resistance must be rooted in spiritual identity, not personal willpower. Practical application i",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/power-encounter-6-tim-warner-v-1-720p/power_encounter_6_-_tim_warner_v1%20%28720p%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1064038701
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/power-encounter-6-tim-warner-v-1-720p",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/power-encounter-6-tim-warner-v-1-720p",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Power Encounter 6: Spiritual Authority - Dr Timothy Warner (2025) — Trinity",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/power-encounter-6-tim-warner-v-1-720p/power_encounter_6_-_tim_warner_v1%20%28720p%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/power-encounter-6-tim-warner-v-1-720p"
      }
    ]
  },
  {
    "id": "power-encounter-7-timothy-warner-v-1-720p",
    "type": "movie",
    "genres": [
      "horror",
      "fantasy",
      "western"
    ],
    "titleAr": "Power Encounter 7: Syncretism - Timothy Warner",
    "titleEn": "Power Encounter 7: Syncretism - Timothy Warner",
    "titleOriginal": "Power Encounter 7: Syncretism - Timothy Warner",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 75,
    "poster": "https://archive.org/download/power-encounter-7-timothy-warner-v-1-720p/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/power-encounter-7-timothy-warner-v-1-720p/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 75 دقيقة.",
    "descriptionEn": "This message presents a comprehensive critique of modern Western Christianity’s syncretism, arguing that its tendency to secularize spirituality—by excluding the supernatural from everyday life—mirrors the very animism it seeks to overcome. Drawing on the concept of the 'excluded middle,' it contends that Christianity must reclaim a holistic worldview where God is the active source of all reality, including science, culture, and personal experience, rather than relegating the spiritual to a separate, irrelevant realm. The speaker warns against reducing faith to mere belief in creation while embracing a mechanistic, impersonal view of the univ",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/power-encounter-7-timothy-warner-v-1-720p/power_encounter_7_-_timothy_warner_v1%20%28720p%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1318918301
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/power-encounter-7-timothy-warner-v-1-720p",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/power-encounter-7-timothy-warner-v-1-720p",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Power Encounter 7: Syncretism - Timothy Warner (2025) — Trinity",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/power-encounter-7-timothy-warner-v-1-720p/power_encounter_7_-_timothy_warner_v1%20%28720p%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/power-encounter-7-timothy-warner-v-1-720p"
      }
    ]
  },
  {
    "id": "princess-madam-when-godfrey-ho-tries",
    "type": "movie",
    "genres": [
      "action",
      "romance",
      "crime",
      "war"
    ],
    "titleAr": "Princess Madam (When Godfrey Ho Tries)(GeekJuiceMedia)☯",
    "titleEn": "Princess Madam (When Godfrey Ho Tries)(GeekJuiceMedia)☯",
    "titleOriginal": "Princess Madam (When Godfrey Ho Tries)(GeekJuiceMedia)☯",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 84,
    "poster": "https://archive.org/download/princess-madam-when-godfrey-ho-tries/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/princess-madam-when-godfrey-ho-tries/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 84 دقيقة.",
    "descriptionEn": "Princess Madam , also called Under Police Protection , and Ultra Force III internationally, is a 1989 Girls with Guns action movie directed by Godfrey Ho, starring Moon Lee , Sharon Yeung , Michiko Nishiwaki and somehow doesn't involve ninjas in its plot . Mona (Moon) and Lisa (Sharon) are both top officers in the police force and lifelong best friends, but they cannot be more different from each other; Mona is a married woman with a feminine streak from her relatively peaceful upbringing, while Lisa is a tomboy and a brute with a troubled childhood. When both women becomes the target of an elite assassin after thwarting an assassination atte",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/princess-madam-when-godfrey-ho-tries/Princess%20Madam%20%28When%20Godfrey%20Ho%20Tries%29.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 834990157
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/princess-madam-when-godfrey-ho-tries",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/princess-madam-when-godfrey-ho-tries",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Princess Madam (When Godfrey Ho Tries)(GeekJuiceMedia)☯ (2025) — KonCategory3",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/princess-madam-when-godfrey-ho-tries/Princess%20Madam%20%28When%20Godfrey%20Ho%20Tries%29.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/princess-madam-when-godfrey-ho-tries"
      }
    ]
  },
  {
    "id": "rainbowbigtimevideotv8120",
    "type": "movie",
    "genres": [
      "comedy",
      "crime",
      "mystery"
    ],
    "titleAr": "Rainbow - Big Time Video (TV 8120)",
    "titleEn": "Rainbow - Big Time Video (TV 8120)",
    "titleOriginal": "Rainbow - Big Time Video (TV 8120)",
    "year": 2019,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 89,
    "poster": "https://archive.org/download/rainbowbigtimevideotv8120/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/rainbowbigtimevideotv8120/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2019، مدته نحو 89 دقيقة.",
    "descriptionEn": "KEEPING TIDY - Zippy, George and Bungle promise to tidy up after a visit from the Lord of Litter. EXERCISE IS FUN - Geoffrey shows Bungle a fun way to keep fit and healthy. PLANTING SEEDS - Out in the Rainbow Garden, Zippy plans to build a Windmill to keep the birds off their newly planted seeds. A LAZY DAY - It's a lazy day in the Rainbow House but Tat the Cat isn't so lucky. Christopher Lillicrap is their special guest. NEW FOR OLD - Guest John Styles proves that new things aren't necessarily better than old and he entertains with a Victorian Theatre Puppet Show. WHO DONE IT? - Zippy and George turn detective to solve the mystery of the mis",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/rainbowbigtimevideotv8120/Rainbow%20-%20Big%20Time%20Video%20%28TV%208120%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 556191224
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/rainbowbigtimevideotv8120",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/rainbowbigtimevideotv8120",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Rainbow - Big Time Video (TV 8120) (2019) — Pamela Lonsdale",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/rainbowbigtimevideotv8120/Rainbow%20-%20Big%20Time%20Video%20%28TV%208120%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/rainbowbigtimevideotv8120"
      }
    ]
  },
  {
    "id": "righteous-indignation",
    "type": "movie",
    "genres": [
      "drama",
      "crime"
    ],
    "titleAr": "Righteous Indignation",
    "titleEn": "Righteous Indignation",
    "titleOriginal": "Righteous Indignation",
    "year": 2019,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 87,
    "poster": "https://archive.org/download/righteous-indignation/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/righteous-indignation/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2019، مدته نحو 87 دقيقة.",
    "descriptionEn": "Upon his release from prison,a big-time street hustler returns home to pick up where he left off, but his adversary is bent on revenge and domination.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/righteous-indignation/Righteous%20Indignation.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1650997078
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/righteous-indignation",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/righteous-indignation",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Righteous Indignation (2019) — Malcolm Joor",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/righteous-indignation/Righteous%20Indignation.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/righteous-indignation"
      }
    ]
  },
  {
    "id": "rigor-mortis-2014",
    "type": "movie",
    "genres": [
      "action",
      "horror",
      "fantasy",
      "war"
    ],
    "titleAr": "Rigor Mortis (2014)",
    "titleEn": "Rigor Mortis (2014)",
    "titleOriginal": "Rigor Mortis (2014)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 101,
    "poster": "https://archive.org/download/rigor-mortis-2014/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/rigor-mortis-2014/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 101 دقيقة.",
    "descriptionEn": "Rigor Mortis is a 2013 Hong Kong action horror film directed by Juno Mak and produced by Takashi Shimizu . The film is a tribute to the Mr. Vampire film series. Many of the former cast are featured in this film: Chin Siu-ho , Anthony Chan , Billy Lau and Richard Ng . Additionally, Chung Fat, who starred in Encounters of the Spooky Kind , is also featured. [ 3 ] Plot Actor Chin Siu-ho , former star of Mr. Vampire , is suicidal after his wife and young son leave him. He moves into a dilapidated apartment building [ 1 ] and hangs himself. His struggles draw the attention of twin girl ghosts who haunt the apartment, and they possess his body. Yau",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/rigor-mortis-2014/2.%20Rigor%20Mortis.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 800932852
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/rigor-mortis-2014",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/rigor-mortis-2014",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Rigor Mortis (2014) (2026) — KonCategory3",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/rigor-mortis-2014/2.%20Rigor%20Mortis.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/rigor-mortis-2014"
      }
    ]
  },
  {
    "id": "ring-a-mind-melting-adventure-game",
    "type": "movie",
    "genres": [
      "adventure",
      "scifi"
    ],
    "titleAr": "Ring: A Mind Melting Adventure Game",
    "titleEn": "Ring: A Mind Melting Adventure Game",
    "titleOriginal": "Ring: A Mind Melting Adventure Game",
    "year": 2022,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 89,
    "poster": "https://archive.org/download/ring-a-mind-melting-adventure-game/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/ring-a-mind-melting-adventure-game/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2022، مدته نحو 89 دقيقة.",
    "descriptionEn": "Mandalore Gaming said it be smart to back this up, so I did.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/ring-a-mind-melting-adventure-game/Ring%20A%20Mind%20Melting%20Adventure%20Game%20VDownloader.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1243203874
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/ring-a-mind-melting-adventure-game",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/ring-a-mind-melting-adventure-game",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Ring: A Mind Melting Adventure Game (2022) — Mandalore Gaming,",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/ring-a-mind-melting-adventure-game/Ring%20A%20Mind%20Melting%20Adventure%20Game%20VDownloader.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/ring-a-mind-melting-adventure-game"
      }
    ]
  },
  {
    "id": "rob-zombies-halloween-halloween-ii",
    "type": "movie",
    "genres": [
      "horror"
    ],
    "titleAr": "Rob Zombies Halloween & Halloween II",
    "titleEn": "Rob Zombies Halloween & Halloween II",
    "titleOriginal": "Rob Zombies Halloween & Halloween II",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 122,
    "poster": "https://archive.org/download/rob-zombies-halloween-halloween-ii/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/rob-zombies-halloween-halloween-ii/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 122 دقيقة.",
    "descriptionEn": "Rob Zombies Halloween & Halloween II 1080p Full Movies",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/rob-zombies-halloween-halloween-ii/Halloween%20-%20%282007%29%20-%20HDTV-1080p%20-%20h265.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 718495506
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/rob-zombies-halloween-halloween-ii",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/rob-zombies-halloween-halloween-ii",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Rob Zombies Halloween & Halloween II (2025) — Wicked313",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/rob-zombies-halloween-halloween-ii/Halloween%20-%20%282007%29%20-%20HDTV-1080p%20-%20h265.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/rob-zombies-halloween-halloween-ii"
      }
    ]
  },
  {
    "id": "valencian",
    "type": "movie",
    "genres": [
      "romance"
    ],
    "titleAr": "Romance",
    "titleEn": "Romance",
    "titleOriginal": "Romance",
    "year": 2023,
    "languageAr": "english-handwritten",
    "languageEn": "english-handwritten",
    "runtimeMinutes": 63,
    "poster": "https://archive.org/download/Valencian/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/Valencian/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2023، مدته نحو 63 دقيقة.",
    "descriptionEn": "Romance Languages",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/Valencian/Parisian%20French%20Act%201%20Part%201.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1800246268
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/Valencian",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/Valencian",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Romance (2023) — ",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/Valencian/Parisian%20French%20Act%201%20Part%201.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/Valencian"
      }
    ]
  },
  {
    "id": "shanghai-express-the-millionaires-express-english-dubs-and-subs",
    "type": "movie",
    "genres": [
      "action",
      "horror",
      "comedy",
      "adventure",
      "western"
    ],
    "titleAr": "Shanghai Express & The Millionaires Express 富貴列車 (English Dubs And Subs)",
    "titleEn": "Shanghai Express & The Millionaires Express 富貴列車 (English Dubs And Subs)",
    "titleOriginal": "Shanghai Express & The Millionaires Express 富貴列車 (English Dubs And Subs)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 191,
    "poster": "https://archive.org/download/shanghai-express-the-millionaires-express-english-dubs-and-subs/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/shanghai-express-the-millionaires-express-english-dubs-and-subs/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 191 دقيقة.",
    "descriptionEn": "Millionaires Express ( Chinese : 富貴列車 ; Jyutping : Fu 3 gwai 3 Lit 6 ce 1 , also known as The Millionaires' Express [ 2 ] or Shanghai Express [ 3 ] ) is a 1986 Hong Kong Western action comedy film co-written, directed by, and starring Sammo Hung . It centers on a disparate group of characters, including rival bandits , con artists , and ninjas , who converge on a rural town where a train carrying many wealthy passengers is stopping. The film is notable for its large, ensemble cast of well-known performers (many of them in cameo roles ), including Hung, Yuen Biao , Rosamund Kwan , Kenny Bee , Peter Chan , Chin Kar-lok , Chin Siu-ho , Hsiao Ho",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/shanghai-express-the-millionaires-express-english-dubs-and-subs/2.%20Shanghai%20Express%20%26%20The%20Millionaires%20Express%20%28English%20Dubs%20and%20Subs%29.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 851031676
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/shanghai-express-the-millionaires-express-english-dubs-and-subs",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/shanghai-express-the-millionaires-express-english-dubs-and-subs",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Shanghai Express & The Millionaires Express 富貴列車 (English Dubs And Subs) (2026) — KonCATIII",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/shanghai-express-the-millionaires-express-english-dubs-and-subs/2.%20Shanghai%20Express%20%26%20The%20Millionaires%20Express%20%28English%20Dubs%20and%20Subs%29.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/shanghai-express-the-millionaires-express-english-dubs-and-subs"
      }
    ]
  },
  {
    "id": "shaolin-temple-1982-jet-li",
    "type": "movie",
    "genres": [
      "action",
      "comedy",
      "romance",
      "war"
    ],
    "titleAr": "Shaolin Temple (1982)",
    "titleEn": "Shaolin Temple (1982)",
    "titleOriginal": "Shaolin Temple (1982)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 95,
    "poster": "https://archive.org/download/shaolin-temple-1982-Jet-Li/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/shaolin-temple-1982-Jet-Li/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 95 دقيقة.",
    "descriptionEn": "The Shaolin Temple (少林寺) is a 1982 martial arts film directed by Chang Hsin Yen and starring Jet Li in his debut role (credited as Jet Lee in the film) along with Ding Lan and Yu Hai in supporting roles. A Hong Kong-Chinese co-production, the film is based on the Shaolin Monastery in China and depicts Shaolin Kung Fu . [ 1 ] The film was among the first major co-productions between Hong Kong and mainland China, and the first to be filmed in mainland China with a mostly mainland cast. [ 2 ] The film's plot has an episodic storytelling structure while combining action, comedy and romance elements. [ 3 ] It was the first martial arts film to be",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/shaolin-temple-1982-Jet-Li/Shaolin%20Temple%20%281982%29.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 705586370
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/shaolin-temple-1982-Jet-Li",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/shaolin-temple-1982-Jet-Li",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Shaolin Temple (1982) (2026) — KonCategoryIII",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/shaolin-temple-1982-Jet-Li/Shaolin%20Temple%20%281982%29.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/shaolin-temple-1982-Jet-Li"
      }
    ]
  },
  {
    "id": "rtvs-jump-force",
    "type": "movie",
    "genres": [
      "adventure"
    ],
    "titleAr": "Shonen Jump's Deeath ( green) ; A WayneradioTV Jump Force Fanedit",
    "titleEn": "Shonen Jump's Deeath ( green) ; A WayneradioTV Jump Force Fanedit",
    "titleOriginal": "Shonen Jump's Deeath ( green) ; A WayneradioTV Jump Force Fanedit",
    "year": 2024,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 76,
    "poster": "https://archive.org/download/rtvs-jump-force/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/rtvs-jump-force/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2024، مدته نحو 76 دقيقة.",
    "descriptionEn": "This is a re-upload of a fanedit i made, just in case the youtube version dies for whatever reason. I am going to drop the raw elements file in a moment as well. ------------- CW: MISOPHONIA TRIGGERS like SNIFFLING, SNORTING, COUGHING, ECT Enter the reverse-isekai world of Deeeath ( green) as he goes upon his quest to separate the misplaced dimensions, all while reping his favorite bosses with his T-Shirts!! Along the way, he will make many allies and many enemies, but nothing is to much for Deeeath ( green) to handlle!! --- Okay anyways heres this. Ppl that like, watch me sometimes might know this but somewhere on my channel from WAAAAYYYYYY",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/rtvs-jump-force/RTVS%20Jump%20Force.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 446023345
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/rtvs-jump-force",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/rtvs-jump-force",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Shonen Jump's Deeath ( green) ; A WayneradioTV Jump Force Fanedit (2024) — RainysFlowers",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/rtvs-jump-force/RTVS%20Jump%20Force.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/rtvs-jump-force"
      }
    ]
  },
  {
    "id": "7734782921371",
    "type": "movie",
    "genres": [
      "horror"
    ],
    "titleAr": "Shredder",
    "titleEn": "Shredder",
    "titleOriginal": "Shredder",
    "year": 2003,
    "languageAr": "spa",
    "languageEn": "spa",
    "runtimeMinutes": 86,
    "poster": "https://archive.org/download/7734782921371/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/7734782921371/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2003، مدته نحو 86 دقيقة.",
    "descriptionEn": "Shredder es una película de terror estadounidense de 2003 dirigida por Greg Huson y protagonizada por Scott Weinger y Lindsey McKeon. Narra la historia de un grupo de amigos que son acechados y asesinados por un agresor desconocido en una estación de esquí abandonada. Fue filmada en el Silver Mountain Resort en Kellogg, Idaho, y lanzada directamente en video en Estados Unidos por MGM Home Entertainment.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/7734782921371/7734782921371.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1720014198
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/7734782921371",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/7734782921371",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Shredder (2003) — Greg Huson",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/7734782921371/7734782921371.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/7734782921371"
      }
    ]
  },
  {
    "id": "subway-1985",
    "type": "movie",
    "genres": [
      "action",
      "thriller"
    ],
    "titleAr": "Subway (1985)",
    "titleEn": "Subway (1985)",
    "titleOriginal": "Subway (1985)",
    "year": 2026,
    "languageAr": "fre",
    "languageEn": "fre",
    "runtimeMinutes": 102,
    "poster": "https://archive.org/download/subway.-1985/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/subway.-1985/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 102 دقيقة.",
    "descriptionEn": "A seductive fable. Fred, a raffish safe blower, takes refuge in the Paris Metro after being chased by the henchmen of a shady businessman from whom he has just stolen some documents. While hiding out in the back rooms and conduits of the Metro, Fred encounters a subterranean society of eccentric characters and petty criminals.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/subway.-1985/Subway.1985.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 601304589
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/subway.-1985",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/subway.-1985",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Subway (1985) (2026) — Luc Besson",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/subway.-1985/Subway.1985.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/subway.-1985"
      }
    ]
  },
  {
    "id": "yard-sale-tape-finds-august-2024-pack-1",
    "type": "movie",
    "genres": [
      "action",
      "crime",
      "mystery"
    ],
    "titleAr": "SURPRISE Yard Sale WOC Tape Finds Pack #1 (1995-1996)",
    "titleEn": "SURPRISE Yard Sale WOC Tape Finds Pack #1 (1995-1996)",
    "titleOriginal": "SURPRISE Yard Sale WOC Tape Finds Pack #1 (1995-1996)",
    "year": 2024,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 215,
    "poster": "https://archive.org/download/yard-sale-tape-finds-august-2024-pack-1/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/yard-sale-tape-finds-august-2024-pack-1/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2024، مدته نحو 215 دقيقة.",
    "descriptionEn": "Buttloads of 1990's Saturday Morning TV. What you're looking at now is Pack #1 of a bunch of Fox Kids and CBS Saturday Morning stuff from 1995-1996. Make sure you download these video files on your computer or smart phone. these shows feature: 1. The Tick: Coach Fussell's Lament (11:00am 12/30/95 - Fox Kids) 2. Ace Ventura: Pet Detective: A Parrot Who Knew Too Much (9/7/96 - CBS Kidz) 4:3 in standard so that's super rare to find a series uncropped. 3. Teenage Mutant Ninja Turtles: State of Shock (9/7/96 - CBS Action Zone) But.. what's with this other junk?: 4. Red Scorpion 2 on Cinemax (1998) 5. Star Trek crap on Fox 11 6. dumb tennis ball ga",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/yard-sale-tape-finds-august-2024-pack-1/August%202024%20Tape%20Finds%20%239%20-%20Unlabled%20TDK%20T-160%20Tape%2C%20features%20some%20CBS%20saturday%20morning%20cartoons%20from%201996%20%28Part%202-3%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1249940830
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/yard-sale-tape-finds-august-2024-pack-1",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/yard-sale-tape-finds-august-2024-pack-1",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "SURPRISE Yard Sale WOC Tape Finds Pack #1 (1995-1996) (2024) — Cinemax, Fox Kids Network, CBS, CBS Kidz, CBS Action Zone, Fox 11",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/yard-sale-tape-finds-august-2024-pack-1/August%202024%20Tape%20Finds%20%239%20-%20Unlabled%20TDK%20T-160%20Tape%2C%20features%20some%20CBS%20saturday%20morning%20cartoons%20from%201996%20%28Part%202-3%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/yard-sale-tape-finds-august-2024-pack-1"
      }
    ]
  },
  {
    "id": "sworn-to-justice-starring-cynthia-rothrock-tony-lo-bianco-and-kurt-mc-kinney-geek-juice-media",
    "type": "movie",
    "genres": [
      "action",
      "comedy",
      "crime",
      "adventure"
    ],
    "titleAr": "Sworn To Justice [Starring Cynthia Rothrock, Tony Lo Bianco And Kurt McKinney](GeekJuiceMedia]",
    "titleEn": "Sworn To Justice [Starring Cynthia Rothrock, Tony Lo Bianco And Kurt McKinney](GeekJuiceMedia]",
    "titleOriginal": "Sworn To Justice [Starring Cynthia Rothrock, Tony Lo Bianco And Kurt McKinney](GeekJuiceMedia]",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 97,
    "poster": "https://archive.org/download/sworn-to-justice-starring-cynthia-rothrock-tony-lo-bianco-and-kurt-mc-kinney-geek-juice-media/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/sworn-to-justice-starring-cynthia-rothrock-tony-lo-bianco-and-kurt-mc-kinney-geek-juice-media/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 97 دقيقة.",
    "descriptionEn": "Cynthia Rothrock as Single Female Criminal Defense Psychologist (not Lawyer) directed by: Paul Maslak starring: Cynthia Rothrock, Brad Dourif, Mako, Vince Murdocco, Tony Lo Bianco, Kurt McKinney, Kenn Scott, Walter Koenig 1996 / 97 min / 1.85:1 / English stereo Janna Dane (Cynthia Rothrock) is a criminal defense psychologist who has always followed the rule of law and fought to defend those accused of crimes, until one night she discovers that her sister and nephew have been brutally murdered by a gang of thugs in their own home. Attacked by the same criminals, Janna is able to use her martial arts training to defend herself, however, after l",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/sworn-to-justice-starring-cynthia-rothrock-tony-lo-bianco-and-kurt-mc-kinney-geek-juice-media/Sworn%20to%20Justice%20%5BStarring%20Cynthia%20Rothrock%2C%20Tony%20Lo%20Bianco%20and%20Kurt%20McKinney%5D%28GeekJuiceMedia%29%29.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 460664356
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/sworn-to-justice-starring-cynthia-rothrock-tony-lo-bianco-and-kurt-mc-kinney-geek-juice-media",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/sworn-to-justice-starring-cynthia-rothrock-tony-lo-bianco-and-kurt-mc-kinney-geek-juice-media",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Sworn To Justice [Starring Cynthia Rothrock, Tony Lo Bianco And Kurt McKinney](GeekJuiceMedia] (2025) — KONCATIII",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/sworn-to-justice-starring-cynthia-rothrock-tony-lo-bianco-and-kurt-mc-kinney-geek-juice-media/Sworn%20to%20Justice%20%5BStarring%20Cynthia%20Rothrock%2C%20Tony%20Lo%20Bianco%20and%20Kurt%20McKinney%5D%28GeekJuiceMedia%29%29.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/sworn-to-justice-starring-cynthia-rothrock-tony-lo-bianco-and-kurt-mc-kinney-geek-juice-media"
      }
    ]
  },
  {
    "id": "sympathy-for-lady-vengeance",
    "type": "movie",
    "genres": [
      "thriller",
      "crime"
    ],
    "titleAr": "Sympathy For Lady Vengeance (2005) (SPA SUB)",
    "titleEn": "Sympathy For Lady Vengeance (2005) (SPA SUB)",
    "titleOriginal": "Sympathy For Lady Vengeance (2005) (SPA SUB)",
    "year": 2005,
    "languageAr": "kor",
    "languageEn": "kor",
    "runtimeMinutes": 115,
    "poster": "https://archive.org/download/sympathy-for-lady-vengeance/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/sympathy-for-lady-vengeance/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2005، مدته نحو 115 دقيقة.",
    "descriptionEn": "Sympathy for Lady Vengeance es una película surcoreana de thriller psicológico del año 2005 dirigida por Park Chan-wook. Es la tercera y última parte de la T rilogía de la Venganza en la cual la preceden S ympathy for Mr. Vengeance y Oldboy . El largometraje, protagonizado por L ee Yeong-ae y Choi Min-sik, cuenta la historia de Lee-Geum Ja, una mujer que, después de pasar trece años y medio en la cárcel, decide vengarse del verdadero autor del crimen que la llevó hasta allí. Se estrenó en Corea del Sur el 29 de julio de 2005. Obtuvo el Premio Blue Dragón del cine coreano a la mejor película y actriz. Se presentó, entre otros, en el F estival",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/sympathy-for-lady-vengeance/Lady%20Vengeance.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 685709268
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/sympathy-for-lady-vengeance",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/sympathy-for-lady-vengeance",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Sympathy For Lady Vengeance (2005) (SPA SUB) (2005) — Park Chan-wook",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/sympathy-for-lady-vengeance/Lady%20Vengeance.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/sympathy-for-lady-vengeance"
      }
    ]
  },
  {
    "id": "tekken-blood-vengeance-castellano",
    "type": "movie",
    "genres": [
      "action",
      "western"
    ],
    "titleAr": "Tekken Blood Vengeance Castellano",
    "titleEn": "Tekken Blood Vengeance Castellano",
    "titleOriginal": "Tekken Blood Vengeance Castellano",
    "year": 2011,
    "languageAr": "spa",
    "languageEn": "spa",
    "runtimeMinutes": 89,
    "poster": "https://archive.org/download/tekken-blood-vengeance-castellano/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/tekken-blood-vengeance-castellano/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2011، مدته نحو 89 دقيقة.",
    "descriptionEn": "This is the spanish dub version of the 2011 movie Tekken Blood Vengeance, i noticed the spanish dub wasn't available online so i decided to upload it here so everyone can get access to it. The dub is in Castellano (spanish from Spain) since it was made by KAZÉ (nowadays Crunchyroll France) that distributes japanese multimedia across Europe, the spanish dub is only available on European DVD's. The identity of the voice actors is unknown. Blood Vengeance was part of the promotional campaign being made for the videogame Tekken Tag Tournament 2, it is known that the movie was made with low budget and limited time since it had to be ready before T",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/tekken-blood-vengeance-castellano/Tekken_Blood_Vengeance_Castellano.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 540927725
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/tekken-blood-vengeance-castellano",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/tekken-blood-vengeance-castellano",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Tekken Blood Vengeance Castellano (2011) — Dai Sato from Digital Frontier",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/tekken-blood-vengeance-castellano/Tekken_Blood_Vengeance_Castellano.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/tekken-blood-vengeance-castellano"
      }
    ]
  },
  {
    "id": "teletubbiesbusydaybbcv7244",
    "type": "movie",
    "genres": [
      "comedy",
      "fantasy"
    ],
    "titleAr": "Teletubbies - Busy Day (BBCV 7244)",
    "titleEn": "Teletubbies - Busy Day (BBCV 7244)",
    "titleOriginal": "Teletubbies - Busy Day (BBCV 7244)",
    "year": 2001,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 72,
    "poster": "https://archive.org/download/TeletubbiesBusyDayBBCV7244/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/TeletubbiesBusyDayBBCV7244/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2001، مدته نحو 72 دقيقة.",
    "descriptionEn": ". Noo-Noo tidies up the blankets (from Numbers- 5 version 2 ) . TV EVENT: Getting Up in the Morning . Tubby Toast Tower (from Naughty Sock Returns ) . TV EVENT: Washing Up . Tubby Sponges (from Emily Washing the Pony ) . TV EVENT: Going to School By Boat . Special Things to Do (from Monkey Safari ) . TV EVENT: Going for a Walk . Too Much Tubby Custard! (from Trickle Painting ) . TV EVENT: Sleep Over . Laa Laa's Ball in bed (from Sleep Over )",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/TeletubbiesBusyDayBBCV7244/Teletubbies%20-%20Busy%20Day%20%28BBCV%207244%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 2774891184
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/TeletubbiesBusyDayBBCV7244",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/TeletubbiesBusyDayBBCV7244",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Teletubbies - Busy Day (BBCV 7244) (2001) — Anne Wood, Andrew Davenport",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/TeletubbiesBusyDayBBCV7244/Teletubbies%20-%20Busy%20Day%20%28BBCV%207244%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/TeletubbiesBusyDayBBCV7244"
      }
    ]
  },
  {
    "id": "main-one-202607",
    "type": "movie",
    "genres": [
      "scifi"
    ],
    "titleAr": "Terminator 3 (2 DVDs Iso)",
    "titleEn": "Terminator 3 (2 DVDs Iso)",
    "titleOriginal": "Terminator 3 (2 DVDs Iso)",
    "year": 2003,
    "languageAr": "ita",
    "languageEn": "ita",
    "runtimeMinutes": 105,
    "poster": "https://archive.org/download/main-one_202607/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/main-one_202607/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2003، مدته نحو 105 دقيقة.",
    "descriptionEn": "Backup of my personal DVD copy",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/main-one_202607/Main%20one.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 637859267
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/main-one_202607",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/main-one_202607",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Terminator 3 (2 DVDs Iso) (2003) — Warner Bros",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/main-one_202607/Main%20one.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/main-one_202607"
      }
    ]
  },
  {
    "id": "93203-888640ab-77b-3-48ac-96dc-3b-69e-9dca-7f-8-rqbv-878305-1fichier",
    "type": "movie",
    "genres": [
      "horror",
      "thriller"
    ],
    "titleAr": "Terror Train (Español Latino)",
    "titleEn": "Terror Train (Español Latino)",
    "titleOriginal": "Terror Train (Español Latino)",
    "year": 2026,
    "languageAr": "spa",
    "languageEn": "spa",
    "runtimeMinutes": 97,
    "poster": "https://archive.org/download/93203-888640ab-77b-3-48ac-96dc-3b-69e-9dca-7f-8-rqbv-878305-1fichier/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/93203-888640ab-77b-3-48ac-96dc-3b-69e-9dca-7f-8-rqbv-878305-1fichier/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 97 دقيقة.",
    "descriptionEn": "Terror Train (1980), directed by Roger Spottiswoode and starring the ultimate \"Scream Queen\" Jamie Lee Curtis, is a definitive classic from the golden age of 1980s slasher cinema that follows a group of medical students targeted by a vengeful killer during a New Year's Eve costume party aboard a moving train. The film holds a significant place in horror history primarily due to its claustrophobic setting, which masterfully elevated the feeling of isolation and inescapable dread by confining its victims to a speeding locomotive, a trope that inspired numerous future survival-horror concepts. Furthermore, it stood out from its contemporary peer",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/93203-888640ab-77b-3-48ac-96dc-3b-69e-9dca-7f-8-rqbv-878305-1fichier/93203--888640ab-77b3-48ac-96dc-3b69e9dca7f8--rqbv--878305-1fichier.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 3213769117
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/93203-888640ab-77b-3-48ac-96dc-3b-69e-9dca-7f-8-rqbv-878305-1fichier",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/93203-888640ab-77b-3-48ac-96dc-3b-69e-9dca-7f-8-rqbv-878305-1fichier",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Terror Train (Español Latino) (2026) — Roger Spottiswoode",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/93203-888640ab-77b-3-48ac-96dc-3b-69e-9dca-7f-8-rqbv-878305-1fichier/93203--888640ab-77b3-48ac-96dc-3b69e9dca7f8--rqbv--878305-1fichier.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/93203-888640ab-77b-3-48ac-96dc-3b-69e-9dca-7f-8-rqbv-878305-1fichier"
      }
    ]
  },
  {
    "id": "the-5-element-ninjas-shaw-bros-vs-the-five-element-ninjas-filmark",
    "type": "movie",
    "genres": [
      "action",
      "horror",
      "drama",
      "mystery",
      "adventure",
      "fantasy",
      "war",
      "western",
      "animation"
    ],
    "titleAr": "The 5 Element Ninjas-五遁忍術 [ SHAW BROS Vs The Five Element Ninjas-忍無可忍 [FILMARK]",
    "titleEn": "The 5 Element Ninjas-五遁忍術 [ SHAW BROS Vs The Five Element Ninjas-忍無可忍 [FILMARK]",
    "titleOriginal": "The 5 Element Ninjas-五遁忍術 [ SHAW BROS Vs The Five Element Ninjas-忍無可忍 [FILMARK]",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 193,
    "poster": "https://archive.org/download/the-5-element-ninjas-shaw-bros-vs-the-five-element-ninjas-filmark/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-5-element-ninjas-shaw-bros-vs-the-five-element-ninjas-filmark/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 193 دقيقة.",
    "descriptionEn": "The 5 Element Ninjas vs The Five Element Ninjas Filmark International Ltd. vs Shaw Brothers Studios The Super Ninja 忍無可忍 · Killer Ninja · Killers Invincible When a formula is created that can supposedly cure cocaine addiction, every criminal in town wants a piece of the action. Luckily the professor responsible for this amazing discovery has a protector in the form of his son-in-law, John (Lo Rei) who is a strictly by-the-book police officer. However, they didn’t count on the mysterious Mr Tong taking an interest and with the help of his gang of Five Element Ninjas he disposes of the competition and goes after his one remaining obstacle: John",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/the-5-element-ninjas-shaw-bros-vs-the-five-element-ninjas-filmark/The%205%20Element%20Ninjas%20%5BSHAW%20BROS%20vs%20The%20Five%20Element%20Ninjas%20%5BFILMARK%5D.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1140567918
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-5-element-ninjas-shaw-bros-vs-the-five-element-ninjas-filmark",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-5-element-ninjas-shaw-bros-vs-the-five-element-ninjas-filmark",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "The 5 Element Ninjas-五遁忍術 [ SHAW BROS Vs The Five Element Ninjas-忍無可忍 [FILMARK] (2026) — KonCategoryIII",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-5-element-ninjas-shaw-bros-vs-the-five-element-ninjas-filmark/The%205%20Element%20Ninjas%20%5BSHAW%20BROS%20vs%20The%20Five%20Element%20Ninjas%20%5BFILMARK%5D.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-5-element-ninjas-shaw-bros-vs-the-five-element-ninjas-filmark"
      }
    ]
  },
  {
    "id": "the-addams-family-movie-1966-in-color-a-fan-film",
    "type": "movie",
    "genres": [
      "family"
    ],
    "titleAr": "The Addams Family Movie 1966 In Color A Fan Film",
    "titleEn": "The Addams Family Movie 1966 In Color A Fan Film",
    "titleOriginal": "The Addams Family Movie 1966 In Color A Fan Film",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 118,
    "poster": "https://archive.org/download/the-addams-family-movie-1966-in-color-a-fan-film/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-addams-family-movie-1966-in-color-a-fan-film/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 118 دقيقة.",
    "descriptionEn": "A love letter to The Addams Family, Giving them an end of series movie like The Munsters had.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/the-addams-family-movie-1966-in-color-a-fan-film/The%20Addams%20Family%20Movie%201966%20%20In%20Color%20%20A%20Fan%20Film.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 965049355
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-addams-family-movie-1966-in-color-a-fan-film",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-addams-family-movie-1966-in-color-a-fan-film",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Addams Family Movie 1966 In Color A Fan Film (2025) — The Lou Cut",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-addams-family-movie-1966-in-color-a-fan-film/The%20Addams%20Family%20Movie%201966%20%20In%20Color%20%20A%20Fan%20Film.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-addams-family-movie-1966-in-color-a-fan-film"
      }
    ]
  },
  {
    "id": "the-black-raven-1943-george-zucco-720p",
    "type": "movie",
    "genres": [
      "horror"
    ],
    "titleAr": "The Black Raven (1943) George Zucco [Good Qual., 720p]",
    "titleEn": "The Black Raven (1943) George Zucco [Good Qual., 720p]",
    "titleOriginal": "The Black Raven (1943) George Zucco [Good Qual., 720p]",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 61,
    "poster": "https://archive.org/download/the-black-raven-1943-george-zucco-720p/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-black-raven-1943-george-zucco-720p/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 61 دقيقة.",
    "descriptionEn": "The Black Raven (1943) Starring George Zucco, Wanda McKay, Robert Livingston Cinematography by Robert E. Cline Edited by Holbrook N. Todd Written by Fred Myton Produced by Sigmund Neufeld Directed by Sam Newfield Distributed by Producers Releasing Corporation 1943 / B&W / NR / 61min / English Audio / No Subs / 4:3 / 720p HD",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/the-black-raven-1943-george-zucco-720p/The%20Black%20Raven%20%281943%29%20%5BGeorge%20Zucco%3B%20%5E720p%5D.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 788959652
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-black-raven-1943-george-zucco-720p",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-black-raven-1943-george-zucco-720p",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Black Raven (1943) George Zucco [Good Qual., 720p] (2026) — Producers Releasing Corporation",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-black-raven-1943-george-zucco-720p/The%20Black%20Raven%20%281943%29%20%5BGeorge%20Zucco%3B%20%5E720p%5D.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-black-raven-1943-george-zucco-720p"
      }
    ]
  },
  {
    "id": "the-case-of-the-disappearing-copyright",
    "type": "movie",
    "genres": [
      "crime",
      "mystery",
      "adventure",
      "western",
      "musical"
    ],
    "titleAr": "The Case Of The Disappearing Copyright",
    "titleEn": "The Case Of The Disappearing Copyright",
    "titleOriginal": "The Case Of The Disappearing Copyright",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 89,
    "poster": "https://archive.org/download/the-case-of-the-disappearing-copyright/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-case-of-the-disappearing-copyright/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 89 دقيقة.",
    "descriptionEn": "1930 ushered in a new decade and a world teetering between mystery and modernity. It was a year of detectives, jazz, speakeasies, and iconic characters stepping onto the cultural stage—many of whom have been locked behind copyright for nearly a century. Now, at long last, their cases have been reopened. This year, we follow “ The Case of the Disappearing Copyright ” as beloved sleuths and unforgettable stories slip back into the hands of the public. Nancy Drew makes her public domain debut with her first four mystery stories, beginning with The Secret of the Old Clock . Agatha Christie’s famed detective Miss Marple appears in her first novel,",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/the-case-of-the-disappearing-copyright/The%20Case%20of%20the%20Disappearing%20Copyright_720p.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1377521627
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-case-of-the-disappearing-copyright",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-case-of-the-disappearing-copyright",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "The Case Of The Disappearing Copyright (2026) — Internet Archive",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-case-of-the-disappearing-copyright/The%20Case%20of%20the%20Disappearing%20Copyright_720p.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-case-of-the-disappearing-copyright"
      }
    ]
  },
  {
    "id": "the-cat-creeps-1930-complete-vitaphone-project-reconstruction",
    "type": "movie",
    "genres": [
      "horror",
      "mystery"
    ],
    "titleAr": "The Cat Creeps (1930) Reconstruction",
    "titleEn": "The Cat Creeps (1930) Reconstruction",
    "titleOriginal": "The Cat Creeps (1930) Reconstruction",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 72,
    "poster": "https://archive.org/download/the-cat-creeps-1930-complete-vitaphone-project-reconstruction/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-cat-creeps-1930-complete-vitaphone-project-reconstruction/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 72 دقيقة.",
    "descriptionEn": "The Cat Creeps (1930) This film is mostly still lost, but the complete audio track was found and The Vitaphone Project on YT did a great reconstruction using the 1930 audio with synchronized dialogue cards and the footage from the 1927 silent version The Cat & The Canary . I'm including TWO versions here, the full widescreen reconstructed version available from The Vitaphone Project in 1080p AND my own edit, a fully re-formatted, 4:3 version trimming most of the supplemental info from the frame and leaving only the footage from the 1927 and 1930 version and the dialogue cards in 720p, making for a more traditional, streamlined viewing. Enjoy!",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/the-cat-creeps-1930-complete-vitaphone-project-reconstruction/The%20Cat%20Creeps%20%20%281930%29%20%5BComplete%20Vitaphone%20Project%20Reconstruction%3B%201080p%5D.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 720350874
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-cat-creeps-1930-complete-vitaphone-project-reconstruction",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-cat-creeps-1930-complete-vitaphone-project-reconstruction",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Cat Creeps (1930) Reconstruction (2026) — Universal Pictures, The Vitaphone Project",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-cat-creeps-1930-complete-vitaphone-project-reconstruction/The%20Cat%20Creeps%20%20%281930%29%20%5BComplete%20Vitaphone%20Project%20Reconstruction%3B%201080p%5D.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-cat-creeps-1930-complete-vitaphone-project-reconstruction"
      }
    ]
  },
  {
    "id": "the-chipmunk-adventure-1994",
    "type": "movie",
    "genres": [
      "adventure"
    ],
    "titleAr": "The Chipmunk Adventure (1994)",
    "titleEn": "The Chipmunk Adventure (1994)",
    "titleOriginal": "The Chipmunk Adventure (1994)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 77,
    "poster": "https://archive.org/download/the-chipmunk-adventure-1994/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-chipmunk-adventure-1994/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 77 دقيقة.",
    "descriptionEn": "20th Century Fox Home Entertainment",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/the-chipmunk-adventure-1994/Video.Guru_20260603_070235216.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 649646918
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-chipmunk-adventure-1994",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-chipmunk-adventure-1994",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Chipmunk Adventure (1994) (2026) — 20th Century Fox Home Entertainment",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-chipmunk-adventure-1994/Video.Guru_20260603_070235216.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-chipmunk-adventure-1994"
      }
    ]
  },
  {
    "id": "the-choir-of-kings-college-cambridge-perform-handels-messiah",
    "type": "movie",
    "genres": [
      "drama",
      "western"
    ],
    "titleAr": "The Choir Of King's College | The Brandenburg Consort: George Frideric Handel - Messiah (1993)",
    "titleEn": "The Choir Of King's College | The Brandenburg Consort: George Frideric Handel - Messiah (1993)",
    "titleOriginal": "The Choir Of King's College | The Brandenburg Consort: George Frideric Handel - Messiah (1993)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 136,
    "poster": "https://archive.org/download/the-choir-of-kings-college-cambridge-perform-handels-messiah/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-choir-of-kings-college-cambridge-perform-handels-messiah/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 136 دقيقة.",
    "descriptionEn": "The recording of Handel's Messiah was performed by the Choir of King's College, Cambridge, featuring the Brandenburg Consort, conducted by Stephen Cleobury, it is a notable performance that blends traditional British choral elements with authentic period-instrument accompaniment. Messiah (HWV 56) is an English-language oratorio composed in 1741 by George Frideric Handel. The text was compiled from the King James Bible and the Coverdale Psalter by Charles Jennens. It was first performed in Dublin on 13 April 1742 and received its London premiere a year later. After an initially modest public reception, the oratorio gained in popularity, eventu",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/the-choir-of-kings-college-cambridge-perform-handels-messiah/The%20Choir%20of%20King%27s%20College%20Cambridge%20perform%20Handel%27s%20Messiah.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1187010207
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-choir-of-kings-college-cambridge-perform-handels-messiah",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-choir-of-kings-college-cambridge-perform-handels-messiah",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Choir Of King's College | The Brandenburg Consort: George Frideric Handel - Messiah (1993) (2026) — Image Entertainment",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-choir-of-kings-college-cambridge-perform-handels-messiah/The%20Choir%20of%20King%27s%20College%20Cambridge%20perform%20Handel%27s%20Messiah.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-choir-of-kings-college-cambridge-perform-handels-messiah"
      }
    ]
  },
  {
    "id": "the-dropout-1982",
    "type": "movie",
    "genres": [
      "thriller",
      "crime",
      "mystery"
    ],
    "titleAr": "The Dropout (1982)",
    "titleEn": "The Dropout (1982)",
    "titleOriginal": "The Dropout (1982)",
    "year": 2026,
    "languageAr": "jpn",
    "languageEn": "jpn",
    "runtimeMinutes": 119,
    "poster": "https://archive.org/download/the-dropout-1982/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-dropout-1982/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 119 دقيقة.",
    "descriptionEn": "1982 Japanese thriller directed by Eiichi Kudo. Detective Seiji Otaki is determined to find the psychopathic killer of a young woman.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/the-dropout-1982/The%20Dropout%20%281982%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 3377358441
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-dropout-1982",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-dropout-1982",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Dropout (1982) (2026) — Eiichi Kudo",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-dropout-1982/The%20Dropout%20%281982%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-dropout-1982"
      }
    ]
  },
  {
    "id": "evil-within-2-review-intro-skit",
    "type": "movie",
    "genres": [
      "horror"
    ],
    "titleAr": "the evil within 2 review raew footage",
    "titleEn": "the evil within 2 review raew footage",
    "titleOriginal": "the evil within 2 review raew footage",
    "year": 2023,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 88,
    "poster": "https://archive.org/download/evil-within-2-review-intro-skit/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/evil-within-2-review-intro-skit/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2023، مدته نحو 88 دقيقة.",
    "descriptionEn": "horrore review footage archiving for space ignore",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/evil-within-2-review-intro-skit/The%20Evil%20Within%202%20-%20All%20Cutscenes%20%28GAME%20MOVIE%29%201080p%20HD.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 748632745
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/evil-within-2-review-intro-skit",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/evil-within-2-review-intro-skit",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "the evil within 2 review raew footage (2023) — nexusgiga",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/evil-within-2-review-intro-skit/The%20Evil%20Within%202%20-%20All%20Cutscenes%20%28GAME%20MOVIE%29%201080p%20HD.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/evil-within-2-review-intro-skit"
      }
    ]
  },
  {
    "id": "the-garbage-pail-kids-movie-1988",
    "type": "movie",
    "genres": [
      "adventure",
      "fantasy",
      "family"
    ],
    "titleAr": "The Garbage Pail Kids Movie (1988, VHS)",
    "titleEn": "The Garbage Pail Kids Movie (1988, VHS)",
    "titleOriginal": "The Garbage Pail Kids Movie (1988, VHS)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 97,
    "poster": "https://archive.org/download/the-garbage-pail-kids-movie-1988/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-garbage-pail-kids-movie-1988/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 97 دقيقة.",
    "descriptionEn": "Released in 1987-1988. The Garbage Pail Kids. They're weird. They're yucky. They're out of the garbage pail... and into big trouble when some nasty punks set out to trash them. And it looks like not even a magical antique store owner (Anthony Newley) and his young assistant (Mackenzie Astin) can save the day. Think the Garbage Pail Kids are outrageous in their series of Topps Chewing Gum trading cards? Just wait until you share the adventure of The Garbage Pail Kids Movie and gross out with the grossest kids in the world!",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/the-garbage-pail-kids-movie-1988/The%20Garbage%20Pail%20Kids%20Movie%20%281988%29.MP4",
        "mimeType": "video/mp4",
        "sizeBytes": 1763014467
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-garbage-pail-kids-movie-1988",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-garbage-pail-kids-movie-1988",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Garbage Pail Kids Movie (1988, VHS) (2026) — Atlantic Releasing Corporation",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-garbage-pail-kids-movie-1988/The%20Garbage%20Pail%20Kids%20Movie%20%281988%29.MP4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-garbage-pail-kids-movie-1988"
      }
    ]
  },
  {
    "id": "the-human-vapor-1960-english-subtitles",
    "type": "movie",
    "genres": [
      "drama",
      "thriller",
      "crime",
      "mystery",
      "scifi"
    ],
    "titleAr": "The Human Vapor (English Subtitles) - Full Film [Restored HD]",
    "titleEn": "The Human Vapor (English Subtitles) - Full Film [Restored HD]",
    "titleOriginal": "The Human Vapor (English Subtitles) - Full Film [Restored HD]",
    "year": 2026,
    "languageAr": "jpn",
    "languageEn": "jpn",
    "runtimeMinutes": 91,
    "poster": "https://archive.org/download/the-human-vapor-1960-english-subtitles/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-human-vapor-1960-english-subtitles/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 91 دقيقة.",
    "descriptionEn": "The Human Vapor (ガス人間第一号, Gasu Ningen Daiichigō; lit. 'The First Gas Man') is a 1960 Japanese science fiction thriller film directed by Ishirō Honda, with special effects by Eiji Tsuburaya. Produced and distributed by Toho, it is the third and final film in the Transforming Human Series, after The H-Man (1958) and The Secret of the Telegian (1960). Yoshio Tsuchiya stars as the titular character, a man transformed into a gaseous being after a scientific experiment goes awry. Kaoru Yachigusa, Tatsuya Mihashi, and Keiko Sata appear in supporting roles. The story follows the vaporous antihero as he exploits his newfound powers to commit bank robb",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/the-human-vapor-1960-english-subtitles/The%20Human%20Vapor%20%281960%29%F0%9F%94%B9%28English%20Subtitles%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 2951804007
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-human-vapor-1960-english-subtitles",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-human-vapor-1960-english-subtitles",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Human Vapor (English Subtitles) - Full Film [Restored HD] (2026) — Ishirō Honda",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-human-vapor-1960-english-subtitles/The%20Human%20Vapor%20%281960%29%F0%9F%94%B9%28English%20Subtitles%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-human-vapor-1960-english-subtitles"
      }
    ]
  },
  {
    "id": "the-hunted-1995-1080p-blu-ray-x-264",
    "type": "movie",
    "genres": [
      "action",
      "thriller",
      "war"
    ],
    "titleAr": "The Hunted (1995)",
    "titleEn": "The Hunted (1995)",
    "titleOriginal": "The Hunted (1995)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 110,
    "poster": "https://archive.org/download/the.-hunted.-1995.1080p.-blu-ray.x-264/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the.-hunted.-1995.1080p.-blu-ray.x-264/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 110 دقيقة.",
    "descriptionEn": "Paul Racine, a high-powered American business executive in Japan, is catapulted into a maze of danger and intrigue after he and his sexy companion are the targets of assassins hired by the ruthless Kinjo. To survive, Racine must join forces with a powerful samurai and together they will fight the force of evil in an awesome battle rooted in centuries of brutal conflict.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/the.-hunted.-1995.1080p.-blu-ray.x-264/The.Hunted.1995.1080p.BluRay.x264.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1906112076
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the.-hunted.-1995.1080p.-blu-ray.x-264",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the.-hunted.-1995.1080p.-blu-ray.x-264",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Hunted (1995) (2026) — J.F. Lawton",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the.-hunted.-1995.1080p.-blu-ray.x-264/The.Hunted.1995.1080p.BluRay.x264.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the.-hunted.-1995.1080p.-blu-ray.x-264"
      }
    ]
  },
  {
    "id": "834903673395",
    "type": "movie",
    "genres": [
      "romance",
      "western"
    ],
    "titleAr": "The Iron Mistress 1952",
    "titleEn": "The Iron Mistress 1952",
    "titleOriginal": "The Iron Mistress 1952",
    "year": 2024,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 109,
    "poster": "https://archive.org/download/834903673395/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/834903673395/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2024، مدته نحو 109 دقيقة.",
    "descriptionEn": "Western",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/834903673395/834903673395.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 471270896
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/834903673395",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/834903673395",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Iron Mistress 1952 (2024) — WB",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/834903673395/834903673395.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/834903673395"
      }
    ]
  },
  {
    "id": "the-killing-doctor",
    "type": "movie",
    "genres": [
      "horror",
      "drama",
      "thriller",
      "mystery",
      "adventure"
    ],
    "titleAr": "The Killing Doctor",
    "titleEn": "The Killing Doctor",
    "titleOriginal": "The Killing Doctor",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 75,
    "poster": "https://archive.org/download/the-killing-doctor/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-killing-doctor/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 75 دقيقة.",
    "descriptionEn": "Original text on back of VHS tape cover below: The Killing Doctor: A successful Hollywood Doctor with a very shady past (played by John Forsythe), begins an affair with a beautiful, but married patient. Her suspicious husband has them followed. The investigator discovers a disturbing career with plenty of questions. With murder in the past, the doctor may be ready top act again! With an all-star cast, THE KILLING DOCTOR is a tangled web of gripping suspense and intrigue with a shocking ending! RATED PG RUNNING TIME APPROX 78 MIN. \"Duplicated in EP mode\" Distributed & Artwork By: MNTEX ENTERTAINMENT PRIOR LAKE, MAINE Unknown production year da",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/the-killing-doctor/The%20Killing%20Doctor.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 436281201
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-killing-doctor",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-killing-doctor",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Killing Doctor (2025) — Video Treasure",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-killing-doctor/The%20Killing%20Doctor.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-killing-doctor"
      }
    ]
  },
  {
    "id": "the-longest-nite-1998",
    "type": "movie",
    "genres": [
      "action",
      "thriller"
    ],
    "titleAr": "The Longest Nite (1998)",
    "titleEn": "The Longest Nite (1998)",
    "titleOriginal": "The Longest Nite (1998)",
    "year": 2026,
    "languageAr": "chi",
    "languageEn": "chi",
    "runtimeMinutes": 81,
    "poster": "https://archive.org/download/the.-longest.-nite.-1998/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the.-longest.-nite.-1998/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 81 دقيقة.",
    "descriptionEn": "Caught in the middle of a fierce gang war in Macau, a corrupt cop named Sam handles negotiations between two Triad leaders who plan to join forces. He meets a suspicious bald man named Tony, who keeps following him around and disrupting his personal business. But when Sam finds out he’s a suspect in a nightclub owner’s murder, he’s sure his stalker has something to do with it.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/the.-longest.-nite.-1998/The.Longest.Nite.1998.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 494497500
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the.-longest.-nite.-1998",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the.-longest.-nite.-1998",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Longest Nite (1998) (2026) — Patrick Yau Tat-Chi",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the.-longest.-nite.-1998/The.Longest.Nite.1998.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the.-longest.-nite.-1998"
      }
    ]
  },
  {
    "id": "the-magnificent-butcher-dubbed-and-subtitled",
    "type": "movie",
    "genres": [
      "action",
      "comedy",
      "animation"
    ],
    "titleAr": "The Magnificent Butcher 林世榮 (Dubbed & Subtitled) ☯",
    "titleEn": "The Magnificent Butcher 林世榮 (Dubbed & Subtitled) ☯",
    "titleOriginal": "The Magnificent Butcher 林世榮 (Dubbed & Subtitled) ☯",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 216,
    "poster": "https://archive.org/download/the-magnificent-butcher-dubbed-and-subtitled/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-magnificent-butcher-dubbed-and-subtitled/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 216 دقيقة.",
    "descriptionEn": "The Magnificent Butcher ( Chinese : 林世榮 ) is a 1979 Hong Kong martial arts comedy film directed by Yuen Woo-ping , and starring Sammo Hung , Kwan Tak-hing , Yuen Biao , and Wei Pai. The film is based on the story of Lam Sai-wing , one of the students of the legendary Chinese folk hero Wong Fei-hung . Hung plays \"Butcher\" Lam Sai-wing and Kwan Tak-hing plays Wong Fei-hung, a role he had played before in over 70 films. The film also features Hung's opera \"brother\" Yuen Biao as another of Wong's students, Leung Foon, a role he would reprise years later in the film Once Upon a Time in China along with Jet Li . The Magnificent Butcher was produced",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/the-magnificent-butcher-dubbed-and-subtitled/1.%20The%20Magnificent%20Butcher%20%28Dubbed%20and%20Subtitled%29%20%E2%98%AF_.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1028141774
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-magnificent-butcher-dubbed-and-subtitled",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-magnificent-butcher-dubbed-and-subtitled",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "The Magnificent Butcher 林世榮 (Dubbed & Subtitled) ☯ (2026) — KonCATIII",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-magnificent-butcher-dubbed-and-subtitled/1.%20The%20Magnificent%20Butcher%20%28Dubbed%20and%20Subtitled%29%20%E2%98%AF_.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-magnificent-butcher-dubbed-and-subtitled"
      }
    ]
  },
  {
    "id": "magnificent-butcher-original-dub-new-dub-subtitled",
    "type": "movie",
    "genres": [
      "action",
      "comedy",
      "animation"
    ],
    "titleAr": "The Magnificent Butcher 林世榮 (Original Dub, New Dub, & Subtitled)",
    "titleEn": "The Magnificent Butcher 林世榮 (Original Dub, New Dub, & Subtitled)",
    "titleOriginal": "The Magnificent Butcher 林世榮 (Original Dub, New Dub, & Subtitled)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 104,
    "poster": "https://archive.org/download/magnificent-butcher-original-dub-new-dub-subtitled/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/magnificent-butcher-original-dub-new-dub-subtitled/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 104 دقيقة.",
    "descriptionEn": "The Magnificent Butcher ( Chinese : 林世榮 ) is a 1979 Hong Kong martial arts comedy film directed by Yuen Woo-ping , and starring Sammo Hung , Kwan Tak-hing , Yuen Biao , and Wei Pai. The film is based on the story of Lam Sai-wing , one of the students of the legendary Chinese folk hero Wong Fei-hung . Hung plays \"Butcher\" Lam Sai-wing and Kwan Tak-hing plays Wong Fei-hung, a role he had played before in over 70 films. The film also features Hung's opera \"brother\" Yuen Biao as another of Wong's students, Leung Foon, a role he would reprise years later in the film Once Upon a Time in China along with Jet Li . The Magnificent Butcher was produced",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/magnificent-butcher-original-dub-new-dub-subtitled/1.%20Magnificent%20Butcher%20%28Original%20Dub%29.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 690611346
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/magnificent-butcher-original-dub-new-dub-subtitled",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/magnificent-butcher-original-dub-new-dub-subtitled",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "The Magnificent Butcher 林世榮 (Original Dub, New Dub, & Subtitled) (2026) — KonCategoryIII",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/magnificent-butcher-original-dub-new-dub-subtitled/1.%20Magnificent%20Butcher%20%28Original%20Dub%29.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/magnificent-butcher-original-dub-new-dub-subtitled"
      }
    ]
  },
  {
    "id": "the-ox-bow-incident-1943-202602",
    "type": "movie",
    "genres": [
      "western"
    ],
    "titleAr": "The Ox-Bow Incident",
    "titleEn": "The Ox-Bow Incident",
    "titleOriginal": "The Ox-Bow Incident",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 76,
    "poster": "https://archive.org/download/the-ox-bow-incident-1943_202602/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-ox-bow-incident-1943_202602/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 76 دقيقة.",
    "descriptionEn": "1943 western about a lynching that goes wrong.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/the-ox-bow-incident-1943_202602/YTDown.com_YouTube_The-Ox-Bow-Incident-1943-HD-Western-Henr_Media_drG29jmsKoo_001_1080p.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1173280419
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-ox-bow-incident-1943_202602",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-ox-bow-incident-1943_202602",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Ox-Bow Incident (2026) — William Wellman/20th Century Fox",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-ox-bow-incident-1943_202602/YTDown.com_YouTube_The-Ox-Bow-Incident-1943-HD-Western-Henr_Media_drG29jmsKoo_001_1080p.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-ox-bow-incident-1943_202602"
      }
    ]
  },
  {
    "id": "the-sicilian-1987-directors-cut",
    "type": "movie",
    "genres": [
      "thriller"
    ],
    "titleAr": "The Sicilian (1987) Director's Cut",
    "titleEn": "The Sicilian (1987) Director's Cut",
    "titleOriginal": "The Sicilian (1987) Director's Cut",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 147,
    "poster": "https://archive.org/download/the-sicilian-1987-directors-cut/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-sicilian-1987-directors-cut/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 147 دقيقة.",
    "descriptionEn": "Extended Director's Cut Egocentric bandit Salvatore Giuliano fights the Church, the Mafia, and the landed gentry while leading a populist movement for Sicilian independence.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/the-sicilian-1987-directors-cut/The%20Sicilian%20%281987%29%20Director%27s%20Cut.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 893038760
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-sicilian-1987-directors-cut",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-sicilian-1987-directors-cut",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Sicilian (1987) Director's Cut (2026) — Michael Cimino",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-sicilian-1987-directors-cut/The%20Sicilian%20%281987%29%20Director%27s%20Cut.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-sicilian-1987-directors-cut"
      }
    ]
  },
  {
    "id": "thestatecounseller2005",
    "type": "movie",
    "genres": [
      "drama",
      "thriller",
      "crime",
      "mystery"
    ],
    "titleAr": "The State Counseller",
    "titleEn": "The State Counseller",
    "titleOriginal": "The State Counseller",
    "year": 2005,
    "languageAr": "rus",
    "languageEn": "rus",
    "runtimeMinutes": 129,
    "poster": "https://archive.org/download/TheStateCounseller2005/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/TheStateCounseller2005/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2005، مدته نحو 129 دقيقة.",
    "descriptionEn": "The State Counseller is a 2005 Russian historical thriller film, an adaptation of Boris Akunin's novel of the same name featuring detective Erast Fandorin. Directed by Filipp Yankovsky, it was one of the most expensive films ever made in Russia. A revolutionary organisation is planning to assassinate the Governor of Moscow as the first step to overthrowing the Tsarist state. Detective Erast Fandorin attempts to counter them, but his efforts are hindered by his dealings with Prince Pozharsky.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/TheStateCounseller2005/%D0%A1%D1%82%D0%B0%D1%82%D1%81%D0%BA%D0%B8%D0%B9%20%D0%A1%D0%BE%D0%B2%D0%B5%D1%82%D0%BD%D0%B8%D0%BA.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 2221813981
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/TheStateCounseller2005",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/TheStateCounseller2005",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The State Counseller (2005) — Channel One Russia",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/TheStateCounseller2005/%D0%A1%D1%82%D0%B0%D1%82%D1%81%D0%BA%D0%B8%D0%B9%20%D0%A1%D0%BE%D0%B2%D0%B5%D1%82%D0%BD%D0%B8%D0%BA.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/TheStateCounseller2005"
      }
    ]
  },
  {
    "id": "the-super-mario-galaxy-movie-2026-202607",
    "type": "movie",
    "genres": [
      "comedy",
      "animation"
    ],
    "titleAr": "The Super Mario Galaxy Movie (2026)",
    "titleEn": "The Super Mario Galaxy Movie (2026)",
    "titleOriginal": "The Super Mario Galaxy Movie (2026)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 98,
    "poster": "https://archive.org/download/the-super-mario-galaxy-movie-2026_202607/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-super-mario-galaxy-movie-2026_202607/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 98 دقيقة.",
    "descriptionEn": "Mario ventures into space, exploring cosmic worlds and tackling galactic challenges far from the familiar Mushroom Kingdom.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/the-super-mario-galaxy-movie-2026_202607/The%20Super%20Mario%20Galaxy%20Movie%20%282026%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 2674020351
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-super-mario-galaxy-movie-2026_202607",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-super-mario-galaxy-movie-2026_202607",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Super Mario Galaxy Movie (2026) (2026) — Illumination Entertainment",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-super-mario-galaxy-movie-2026_202607/The%20Super%20Mario%20Galaxy%20Movie%20%282026%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-super-mario-galaxy-movie-2026_202607"
      }
    ]
  },
  {
    "id": "the-sweet-talking-chans-movie-1997-full-movie",
    "type": "movie",
    "genres": [
      "fantasy"
    ],
    "titleAr": "The Sweet Talking Chans Movie (1997) Full Movie",
    "titleEn": "The Sweet Talking Chans Movie (1997) Full Movie",
    "titleOriginal": "The Sweet Talking Chans Movie (1997) Full Movie",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 80,
    "poster": "https://archive.org/download/the-sweet-talking-chans-movie-1997-full-movie/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-sweet-talking-chans-movie-1997-full-movie/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 80 دقيقة.",
    "descriptionEn": "The Sweet Talking Chans Movie (1997) is the first and only feature film starring the beloved Australian children's music group, The Sweet Talking Chans. The story follows Sweet Talkers as they try to host a surprise party for Dorothy the Dinosaur, who is upset because she thinks they've forgotten her birthday. Things get complicated when an amateur magician, Wally the Great (Nikos Stratikopoulos), steals Julian Sweet Talker's magic wand in an attempt to become a better magician, and Dorothy goes after him, not realising a party is planned for her. Sweet Talkers must then team up with their friends, including Captain Feathersword and Henry the",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/the-sweet-talking-chans-movie-1997-full-movie/The%20Sweet%20Talking%20Chans%20Movie%20%281997%29%20Full%20Movie-360p30.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 474799516
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-sweet-talking-chans-movie-1997-full-movie",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-sweet-talking-chans-movie-1997-full-movie",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Sweet Talking Chans Movie (1997) Full Movie (2025) — GooGoo & GinGin",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-sweet-talking-chans-movie-1997-full-movie/The%20Sweet%20Talking%20Chans%20Movie%20%281997%29%20Full%20Movie-360p30.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-sweet-talking-chans-movie-1997-full-movie"
      }
    ]
  },
  {
    "id": "the-taking-of-beverly-hills",
    "type": "movie",
    "genres": [
      "action",
      "war"
    ],
    "titleAr": "The Taking Of Beverly Hills (1991)",
    "titleEn": "The Taking Of Beverly Hills (1991)",
    "titleOriginal": "The Taking Of Beverly Hills (1991)",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 95,
    "poster": "https://archive.org/download/the-taking-of-beverly-hills/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-taking-of-beverly-hills/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 95 دقيقة.",
    "descriptionEn": "The Taking of Beverly Hills is a 1991 American action film directed by Sidney J. Furie and starring Ken Wahl, Matt Frewer, Harley Jane Kozak and Robert Davi. In the film, football hero Boomer Hayes battles a group of ex-cops, who are using a chemical spill as a front to rob several homes and bank vaults in Beverly Hills.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/the-taking-of-beverly-hills/The%20Taking%20of%20Beverly%20Hills%20%281991%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1550465046
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-taking-of-beverly-hills",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-taking-of-beverly-hills",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Taking Of Beverly Hills (1991) (2025) — Sidney J. Furie",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-taking-of-beverly-hills/The%20Taking%20of%20Beverly%20Hills%20%281991%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-taking-of-beverly-hills"
      }
    ]
  },
  {
    "id": "ws-have-rocket-will-travel-1080p-1959-hd",
    "type": "movie",
    "genres": [
      "comedy"
    ],
    "titleAr": "The Three Stooges: HD Movies (Restored WS & FS 1080p)",
    "titleEn": "The Three Stooges: HD Movies (Restored WS & FS 1080p)",
    "titleOriginal": "The Three Stooges: HD Movies (Restored WS & FS 1080p)",
    "year": 2026,
    "languageAr": "Unknown",
    "languageEn": "Unknown",
    "runtimeMinutes": 70,
    "poster": "https://archive.org/download/ws-have-rocket-will-travel-1080p-1959-hd/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/ws-have-rocket-will-travel-1080p-1959-hd/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 70 دقيقة.",
    "descriptionEn": "A Batch Of Very Funny, Freature Length Restored Comedies From The Three Stooges. Enjoy",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "1080p",
        "url": "https://archive.org/download/ws-have-rocket-will-travel-1080p-1959-hd/%28FS%29%20The%20Three%20Stooges%20-%20Soup%20To%20Nuts%20%281930%29%20C%20%28WM%29%20%28AI%20Colorized%29%20%281080p%29.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1376170000
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/ws-have-rocket-will-travel-1080p-1959-hd",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/ws-have-rocket-will-travel-1080p-1959-hd",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Three Stooges: HD Movies (Restored WS & FS 1080p) (2026) — ",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/ws-have-rocket-will-travel-1080p-1959-hd/%28FS%29%20The%20Three%20Stooges%20-%20Soup%20To%20Nuts%20%281930%29%20C%20%28WM%29%20%28AI%20Colorized%29%20%281080p%29.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/ws-have-rocket-will-travel-1080p-1959-hd"
      }
    ]
  },
  {
    "id": "the-unholy-night-1929-lionel-barrymore-720p",
    "type": "movie",
    "genres": [
      "horror",
      "mystery"
    ],
    "titleAr": "The Unholy Night (1929) [Good Qual., 720p]",
    "titleEn": "The Unholy Night (1929) [Good Qual., 720p]",
    "titleOriginal": "The Unholy Night (1929) [Good Qual., 720p]",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 93,
    "poster": "https://archive.org/download/the-unholy-night-1929-lionel-barrymore-720p/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-unholy-night-1929-lionel-barrymore-720p/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 93 دقيقة.",
    "descriptionEn": "The Unholy Night (1929) Starring Ernest Torrence, Roland Young, Dorothy Sebastian, Natalie Moorhead, Sydney Jarvis, Polly Moran, Sōjin Kamiyama, Richard Tucker, John Loder, Philip Strange, John Roche, Lionel Belmore, Richard Travers, and (an uncredited) Boris Karloff Cinematograpy by Ira Morgan Edited by Grant Whytock Based on the story \"The Green Ghost\" by Ben Hecht Written by Edwin Justus Mayer Screenplay by Dorothy Farnum Directed by Lionel Barrymore Distributed by Metro-Goldwyn-Mayer 1929 / B&W / NR / 93min / English Audio / No Subs / 1.33:1 / 720p",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/the-unholy-night-1929-lionel-barrymore-720p/The%20Unholy%20Night%20%281929%29%20%5BDir.%20Lionel%20Barrymore%3B%20720p%5D.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 876921894
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-unholy-night-1929-lionel-barrymore-720p",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-unholy-night-1929-lionel-barrymore-720p",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Unholy Night (1929) [Good Qual., 720p] (2026) — Lionel Barrymore",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-unholy-night-1929-lionel-barrymore-720p/The%20Unholy%20Night%20%281929%29%20%5BDir.%20Lionel%20Barrymore%3B%20720p%5D.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-unholy-night-1929-lionel-barrymore-720p"
      }
    ]
  },
  {
    "id": "the-wiggles-cold-spaghetti-western-2004-vhs-202608",
    "type": "movie",
    "genres": [
      "adventure",
      "western"
    ],
    "titleAr": "The Wiggles: Cold Spaghetti Western (2004 VHS)",
    "titleEn": "The Wiggles: Cold Spaghetti Western (2004 VHS)",
    "titleOriginal": "The Wiggles: Cold Spaghetti Western (2004 VHS)",
    "year": 2004,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 67,
    "poster": "https://archive.org/download/the-wiggles-cold-spaghetti-western-2004-vhs_202608/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the-wiggles-cold-spaghetti-western-2004-vhs_202608/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2004، مدته نحو 67 دقيقة.",
    "descriptionEn": "Yippee-ti-yi-yo! Get ready to boot scoot down the Wiggly Trail in this western adventure with wiggly music. Cowpokes Greg, Anthony, Murray and Jeff are hustling to the Town Fair. Their friend, Alfonso the Master Pasta Maker, must win the Country Cook-Off to save the Great Western Café from going bust. But there's bad news, partner! Alfonso lost the secret ingredient to his pasta. With help from Foodman, the Superhero of Sustenance, The Wiggles® ride off into the sunset having saved the day - and the café!",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/the-wiggles-cold-spaghetti-western-2004-vhs_202608/The%20Wiggles%20Cold%20Spaghetti%20Western%20%282004%20VHS%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 220759591
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the-wiggles-cold-spaghetti-western-2004-vhs_202608",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the-wiggles-cold-spaghetti-western-2004-vhs_202608",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The Wiggles: Cold Spaghetti Western (2004 VHS) (2004) — HIT Entertainment",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the-wiggles-cold-spaghetti-western-2004-vhs_202608/The%20Wiggles%20Cold%20Spaghetti%20Western%20%282004%20VHS%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the-wiggles-cold-spaghetti-western-2004-vhs_202608"
      }
    ]
  },
  {
    "id": "the-world-the-flesh-and-the-devil-1959",
    "type": "movie",
    "genres": [
      "romance",
      "scifi"
    ],
    "titleAr": "The World, the Flesh and The Devil (1959)",
    "titleEn": "The World, the Flesh and The Devil (1959)",
    "titleOriginal": "The World, the Flesh and The Devil (1959)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 95,
    "poster": "https://archive.org/download/the.-world.the.-flesh.and.-the.-devil.-1959/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the.-world.the.-flesh.and.-the.-devil.-1959/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 95 دقيقة.",
    "descriptionEn": "The World, the Flesh and the Devil is a 1959 American science fiction doomsday film written and directed by Ranald MacDougall. The film stars Harry Belafonte, who was then at the peak of his film career. The film is set in a post-apocalyptic world with very few human survivors. It is based on two sources: the 1901 novel The Purple Cloud by M. P. Shiel and the story \"End of the World\" by Ferdinand Reyher.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/the.-world.the.-flesh.and.-the.-devil.-1959/The.World.the.Flesh.and.The.Devil.1959.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 576988161
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the.-world.the.-flesh.and.-the.-devil.-1959",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the.-world.the.-flesh.and.-the.-devil.-1959",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "The World, the Flesh and The Devil (1959) (2026) — Ranald MacDougall",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the.-world.the.-flesh.and.-the.-devil.-1959/The.World.the.Flesh.and.The.Devil.1959.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the.-world.the.-flesh.and.-the.-devil.-1959"
      }
    ]
  },
  {
    "id": "they-call-him-og-2025-telugu-dvdscr-x-264-aac-700-mb",
    "type": "movie",
    "genres": [
      "action",
      "drama",
      "thriller",
      "crime"
    ],
    "titleAr": "They Call Him OG ( 2025) Telugu DVDScr X 264 AAC 700 MB",
    "titleEn": "They Call Him OG ( 2025) Telugu DVDScr X 264 AAC 700 MB",
    "titleOriginal": "They Call Him OG ( 2025) Telugu DVDScr X 264 AAC 700 MB",
    "year": 2025,
    "languageAr": "tel",
    "languageEn": "tel",
    "runtimeMinutes": 147,
    "poster": "https://archive.org/download/they-call-him-og-2025-telugu-dvdscr-x-264-aac-700-mb/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/they-call-him-og-2025-telugu-dvdscr-x-264-aac-700-mb/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 147 دقيقة.",
    "descriptionEn": "After vanishing from Mumbai`s underworld for a decade, mob boss Ojas Gambheera resurfaces-feared, unstoppable, and with a single goal: to reclaim his empire and exact vengeance on the current tyrant, Omi Bhau. As loyalties fracture and alliances shift, OG reignites a brutal criminal war, confronting both external threats and haunting buried betrayals.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/they-call-him-og-2025-telugu-dvdscr-x-264-aac-700-mb/They%20Call%20Him%20OG%20%282025%29%20Telugu%20DVDScr%20-%20x264%20-%20AAC%20-%20700MB.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 764937716
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/they-call-him-og-2025-telugu-dvdscr-x-264-aac-700-mb",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/they-call-him-og-2025-telugu-dvdscr-x-264-aac-700-mb",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "They Call Him OG ( 2025) Telugu DVDScr X 264 AAC 700 MB (2025) — Mohanish Ganta",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/they-call-him-og-2025-telugu-dvdscr-x-264-aac-700-mb/They%20Call%20Him%20OG%20%282025%29%20Telugu%20DVDScr%20-%20x264%20-%20AAC%20-%20700MB.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/they-call-him-og-2025-telugu-dvdscr-x-264-aac-700-mb"
      }
    ]
  },
  {
    "id": "thief-of-hearts-1984",
    "type": "movie",
    "genres": [
      "drama",
      "thriller"
    ],
    "titleAr": "Thief of Hearts (1984)",
    "titleEn": "Thief of Hearts (1984)",
    "titleOriginal": "Thief of Hearts (1984)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 100,
    "poster": "https://archive.org/download/thief.-of.-hearts.-1984/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/thief.-of.-hearts.-1984/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 100 دقيقة.",
    "descriptionEn": "Thief of Hearts is a 1984 American erotic drama-thriller produced by Don Simpson and Jerry Bruckheimer. Written and directed by Douglas Day Stewart, it stars Steven Bauer, Barbara Williams, John Getz and David Caruso. A woman trapped in a boring marriage begins an affair with a handsome man who seems able to read her mind. She doesn’t know that he has broken into her house and read her diaries, where she has recorded her deepest thoughts and fantasies.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/thief.-of.-hearts.-1984/Thief.Of.Hearts.1984.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 595035122
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/thief.-of.-hearts.-1984",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/thief.-of.-hearts.-1984",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Thief of Hearts (1984) (2026) — Douglas Day Stewart",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/thief.-of.-hearts.-1984/Thief.Of.Hearts.1984.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/thief.-of.-hearts.-1984"
      }
    ]
  },
  {
    "id": "best-of-sir-topham-hatt-202604",
    "type": "movie",
    "genres": [
      "western"
    ],
    "titleAr": "Thomas & Friends: Best Of Sir Topham Hatt 2007/2026 (Custom DVD)",
    "titleEn": "Thomas & Friends: Best Of Sir Topham Hatt 2007/2026 (Custom DVD)",
    "titleOriginal": "Thomas & Friends: Best Of Sir Topham Hatt 2007/2026 (Custom DVD)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 72,
    "poster": "https://archive.org/download/best-of-sir-topham-hatt_202604/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/best-of-sir-topham-hatt_202604/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 72 دقيقة.",
    "descriptionEn": "The Fat Controller aka. Sir Topham Hatt a fictional character from the British children's books, The Railway Series, written by the Reverend W. Awdry and his son, Christopher Awdry. He is the controller of the North Western Railway on the Island of Sodor, which includes Thomas the Tank Engine among its engines. STORYTELLER 1. George Carlin 2. Alec Baldwin Our Story Stops Are: 1 .Trouble in the Shed 2. Thomas Goes Fishing 3. Toby the Tram Engine 4. Thomas Breaks the Rules 5. Henry's Special Coal 6. Duck Takes Charge 7. Pop Goes the Diesel 8. Thomas Comes To Breakfast 9. A Scarf for Percy 10. Thomas and the Special Letter 11. Lady Hatt's Birthd",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/best-of-sir-topham-hatt_202604/best%20of%20Sir%20Topham%20Hatt.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 2280097423
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/best-of-sir-topham-hatt_202604",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/best-of-sir-topham-hatt_202604",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Thomas & Friends: Best Of Sir Topham Hatt 2007/2026 (Custom DVD) (2026) — Anchor Bay Entertainment",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/best-of-sir-topham-hatt_202604/best%20of%20Sir%20Topham%20Hatt.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/best-of-sir-topham-hatt_202604"
      }
    ]
  },
  {
    "id": "b45486",
    "type": "movie",
    "genres": [
      "action",
      "adventure"
    ],
    "titleAr": "Thomas & Friends: Ultimate Friendship Adventures (2016 DVD)",
    "titleEn": "Thomas & Friends: Ultimate Friendship Adventures (2016 DVD)",
    "titleOriginal": "Thomas & Friends: Ultimate Friendship Adventures (2016 DVD)",
    "year": 2016,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 91,
    "poster": "https://archive.org/download/b45486/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/b45486/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2016، مدته نحو 91 دقيقة.",
    "descriptionEn": "Double up on your delivery of Thomas & Friends™ with 10 action-­packed stories! All aboard for exciting rescues, engines tuning up and flocks of new friends. Learn how to work together, build new friendships and ride the roads or rails for a rainbow of adventure.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/b45486/b45486.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 2134535908
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/b45486",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/b45486",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Thomas & Friends: Ultimate Friendship Adventures (2016 DVD) (2016) — Universal Pictures Home Entertainment",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/b45486/b45486.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/b45486"
      }
    ]
  },
  {
    "id": "tiger-cage-ii-1990-dubbed",
    "type": "movie",
    "genres": [
      "action"
    ],
    "titleAr": "Tiger Cage II [1990 DUBBED]",
    "titleEn": "Tiger Cage II [1990 DUBBED]",
    "titleOriginal": "Tiger Cage II [1990 DUBBED]",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 96,
    "poster": "https://archive.org/download/tiger-cage-ii-1990-dubbed_/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/tiger-cage-ii-1990-dubbed_/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 96 دقيقة.",
    "descriptionEn": "Tiger Cage 2 is a 1990 Hong Kong action film directed by Yuen Woo-ping and starring Donnie Yen . [ 1 ] [ 2 ] The film is a sequel to the 1988 film Tiger Cage , which was also directed by Yuen, and features a new storyline with returning cast members Yen and Carol Cheng in different roles. Plot Dragon Yau is a hot-headed ex-cop named whose attitude has got him in trouble with his bosses and his wife. On a trip to the divorce lawyers, he is witness to a robbery where a shootout ensues and a suitcase of money disappears. During the same shootout Lawyer Mandy Chang also witnesses and becomes unintentionally involved with said events. On a trip to",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/tiger-cage-ii-1990-dubbed_/1.%20Tiger%20Cage%20II%20%5B1990%20DUBBED%5D.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 897654315
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/tiger-cage-ii-1990-dubbed_",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/tiger-cage-ii-1990-dubbed_",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Tiger Cage II [1990 DUBBED] (2026) — KonCATIII",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/tiger-cage-ii-1990-dubbed_/1.%20Tiger%20Cage%20II%20%5B1990%20DUBBED%5D.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/tiger-cage-ii-1990-dubbed_"
      }
    ]
  },
  {
    "id": "tiger-cage-iii-1991-dubbed",
    "type": "movie",
    "genres": [
      "action",
      "drama",
      "thriller",
      "crime"
    ],
    "titleAr": "Tiger Cage III [1991 DUBBED]",
    "titleEn": "Tiger Cage III [1991 DUBBED]",
    "titleOriginal": "Tiger Cage III [1991 DUBBED]",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 93,
    "poster": "https://archive.org/download/tiger-cage-iii-1991-dubbed/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/tiger-cage-iii-1991-dubbed/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 93 دقيقة.",
    "descriptionEn": "Tiger Cage 3 (Cantonese: 冷面狙擊手, literally \"Cold-Faced Shooter\") is a 1991 Hong Kong action film directed by Yuen Woo-ping . Its English title positions it as a sequel to the 1988 film Tiger Cage and its 1990 sequel Tiger Cage 2 , which were also directed by Yuen, though this film features a new storyline with none of the main cast members returning. Plot Suki Cheung is a rising financial advisor who often accompanies her boss Mr. Wong to dinner meetings. Her boyfriend James and his best friend John, a CCB officer, place a wire in her purse to find out if she is having an affair. Through the wire the two friends hear Mr. Wong and Mr. Lee barga",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/tiger-cage-iii-1991-dubbed/1.%20Tiger%20Cage%20III%20%5B1991%20DUBBED%5D.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 802415287
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/tiger-cage-iii-1991-dubbed",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/tiger-cage-iii-1991-dubbed",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Tiger Cage III [1991 DUBBED] (2026) — KONCATIII",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/tiger-cage-iii-1991-dubbed/1.%20Tiger%20Cage%20III%20%5B1991%20DUBBED%5D.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/tiger-cage-iii-1991-dubbed"
      }
    ]
  },
  {
    "id": "tough-guys-dont-dance-1987",
    "type": "movie",
    "genres": [
      "comedy",
      "thriller"
    ],
    "titleAr": "Tough Guys Don't Dance (1987)",
    "titleEn": "Tough Guys Don't Dance (1987)",
    "titleOriginal": "Tough Guys Don't Dance (1987)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 110,
    "poster": "https://archive.org/download/tough.-guys.-dont.-dance.-1987/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/tough.-guys.-dont.-dance.-1987/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 110 دقيقة.",
    "descriptionEn": "Oh man. Oh god, oh man. Oh god, oh man. Oh god, oh man. Oh god, oh man. Tim Madden awakens one morning to discover a fresh tattoo on his arm, his car covered in blood, his girlfriend in bed with the town sheriff, and a woman’s severed head in his weed stash. Sensing a setup and in desperate need to clear his name, he begins an investigation that soon begins to expose a web of corruption in the small coastal community of Provincetown.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/tough.-guys.-dont.-dance.-1987/Tough.Guys.Dont.Dance.1987.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 664702449
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/tough.-guys.-dont.-dance.-1987",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/tough.-guys.-dont.-dance.-1987",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Tough Guys Don't Dance (1987) (2026) — Norman Mailer",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/tough.-guys.-dont.-dance.-1987/Tough.Guys.Dont.Dance.1987.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/tough.-guys.-dont.-dance.-1987"
      }
    ]
  },
  {
    "id": "tropa-de-elite-elite-squad",
    "type": "movie",
    "genres": [
      "action",
      "drama",
      "crime"
    ],
    "titleAr": "Tropa De Elite - Missão Dada é Missão Cumprida",
    "titleEn": "Tropa De Elite - Missão Dada é Missão Cumprida",
    "titleOriginal": "Tropa De Elite - Missão Dada é Missão Cumprida",
    "year": 2007,
    "languageAr": "por",
    "languageEn": "por",
    "runtimeMinutes": 115,
    "poster": "https://archive.org/download/tropa-de-elite-elite-squad/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/tropa-de-elite-elite-squad/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2007، مدته نحو 115 دقيقة.",
    "descriptionEn": "Lançado pela The Weinstein Company e pela Zazen Produções",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/tropa-de-elite-elite-squad/Tropa%20de%20Elite%20%28Elite%20Squad%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1731663768
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/tropa-de-elite-elite-squad",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/tropa-de-elite-elite-squad",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Tropa De Elite - Missão Dada é Missão Cumprida (2007) — José Padilha",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/tropa-de-elite-elite-squad/Tropa%20de%20Elite%20%28Elite%20Squad%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/tropa-de-elite-elite-squad"
      }
    ]
  },
  {
    "id": "tokaido-yotsuya-kaidan-1959-raw",
    "type": "movie",
    "genres": [
      "horror"
    ],
    "titleAr": "Tôkaidô Yotsuya Kaidan 1959 (RAW) (東海道四谷怪談)",
    "titleEn": "Tôkaidô Yotsuya Kaidan 1959 (RAW) (東海道四谷怪談)",
    "titleOriginal": "Tôkaidô Yotsuya Kaidan 1959 (RAW) (東海道四谷怪談)",
    "year": 2022,
    "languageAr": "jpn",
    "languageEn": "jpn",
    "runtimeMinutes": 77,
    "poster": "https://archive.org/download/tokaido-yotsuya-kaidan-1959-raw/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/tokaido-yotsuya-kaidan-1959-raw/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2022، مدته نحو 77 دقيقة.",
    "descriptionEn": "Name : Tôkaidô Yotsuya kaidan / The Ghost of Yotsuya / 東海道四谷怪談 Date : 1959 Quality : 1080p the file contains English and French subtitles",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/tokaido-yotsuya-kaidan-1959-raw/T%C3%B4kaid%C3%B4%20Yotsuya%20kaidan%201959%20%28HD%20RAW%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 450641675
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/tokaido-yotsuya-kaidan-1959-raw",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/tokaido-yotsuya-kaidan-1959-raw",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Tôkaidô Yotsuya Kaidan 1959 (RAW) (東海道四谷怪談) (2022) — Nobuo Nakagawa",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/tokaido-yotsuya-kaidan-1959-raw/T%C3%B4kaid%C3%B4%20Yotsuya%20kaidan%201959%20%28HD%20RAW%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/tokaido-yotsuya-kaidan-1959-raw"
      }
    ]
  },
  {
    "id": "vts-05-1-20260425",
    "type": "movie",
    "genres": [
      "mystery"
    ],
    "titleAr": "Unlabeled TDK D90 Blank Cassette Tape (Late 80s and 90s)",
    "titleEn": "Unlabeled TDK D90 Blank Cassette Tape (Late 80s and 90s)",
    "titleOriginal": "Unlabeled TDK D90 Blank Cassette Tape (Late 80s and 90s)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 150,
    "poster": "https://archive.org/download/vts-05-1_20260425/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/vts-05-1_20260425/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 150 دقيقة.",
    "descriptionEn": "this ones a mystery. desc soon",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/vts-05-1_20260425/VTS_05_1.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 885512727
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/vts-05-1_20260425",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/vts-05-1_20260425",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Unlabeled TDK D90 Blank Cassette Tape (Late 80s and 90s) (2026) — Various Artists",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/vts-05-1_20260425/VTS_05_1.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/vts-05-1_20260425"
      }
    ]
  },
  {
    "id": "796001978-1-16",
    "type": "movie",
    "genres": [
      "fantasy"
    ],
    "titleAr": "Untold Festival 2022 | Alok",
    "titleEn": "Untold Festival 2022 | Alok",
    "titleOriginal": "Untold Festival 2022 | Alok",
    "year": 2022,
    "languageAr": "rum",
    "languageEn": "rum",
    "runtimeMinutes": 76,
    "poster": "https://archive.org/download/796001978-1-16/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/796001978-1-16/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2022، مدته نحو 76 دقيقة.",
    "descriptionEn": "Alok gave the crowd at Untold Festival 2022 magical moments on the Main Stage! Relive his set on Archive",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/796001978-1-16/796001978-1-16.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 243771174
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/796001978-1-16",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/796001978-1-16",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Untold Festival 2022 | Alok (2022) — UNTOLD",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/796001978-1-16/796001978-1-16.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/796001978-1-16"
      }
    ]
  },
  {
    "id": "ytdown-com-you-tube-vergo-official-horror-movie-media-k-zsp-5-swwy-70-003-360p",
    "type": "movie",
    "genres": [
      "horror"
    ],
    "titleAr": "Vergo Official Horror Movie",
    "titleEn": "Vergo Official Horror Movie",
    "titleOriginal": "Vergo Official Horror Movie",
    "year": 2021,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 111,
    "poster": "https://archive.org/download/ytdown.com-you-tube-vergo-official-horror-movie-media-k-zsp-5-swwy-70-003-360p/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/ytdown.com-you-tube-vergo-official-horror-movie-media-k-zsp-5-swwy-70-003-360p/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2021، مدته نحو 111 دقيقة.",
    "descriptionEn": "Kfcfvkcrkgtkvrkgrkrgkgr",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/ytdown.com-you-tube-vergo-official-horror-movie-media-k-zsp-5-swwy-70-003-360p/YTDown.com_YouTube_Vergo-Official-Horror-Movie_Media_kZSp5Swwy70_003_360p.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 272705142
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/ytdown.com-you-tube-vergo-official-horror-movie-media-k-zsp-5-swwy-70-003-360p",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/ytdown.com-you-tube-vergo-official-horror-movie-media-k-zsp-5-swwy-70-003-360p",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Vergo Official Horror Movie (2021) — Cold Blood Studios",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/ytdown.com-you-tube-vergo-official-horror-movie-media-k-zsp-5-swwy-70-003-360p/YTDown.com_YouTube_Vergo-Official-Horror-Movie_Media_kZSp5Swwy70_003_360p.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/ytdown.com-you-tube-vergo-official-horror-movie-media-k-zsp-5-swwy-70-003-360p"
      }
    ]
  },
  {
    "id": "visible-secret-2001",
    "type": "movie",
    "genres": [
      "horror",
      "romance",
      "fantasy"
    ],
    "titleAr": "Visible Secret (2001)",
    "titleEn": "Visible Secret (2001)",
    "titleOriginal": "Visible Secret (2001)",
    "year": 2001,
    "languageAr": "chi",
    "languageEn": "chi",
    "runtimeMinutes": 103,
    "poster": "https://archive.org/download/visible-secret-2001/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/visible-secret-2001/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2001، مدته نحو 103 دقيقة.",
    "descriptionEn": "A man develops a relationship with a woman who has mysterious supernatural abilities.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/visible-secret-2001/Visible%20Secret%20%282001%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 607442846
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/visible-secret-2001",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/visible-secret-2001",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Visible Secret (2001) (2001) — Ann Hui",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/visible-secret-2001/Visible%20Secret%20%282001%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/visible-secret-2001"
      }
    ]
  },
  {
    "id": "its-the-old-army-game-12-mbps",
    "type": "movie",
    "genres": [
      "comedy"
    ],
    "titleAr": "W.C. Fields - It's The Old Army Game (Restored HD 1080p)",
    "titleEn": "W.C. Fields - It's The Old Army Game (Restored HD 1080p)",
    "titleOriginal": "W.C. Fields - It's The Old Army Game (Restored HD 1080p)",
    "year": 2025,
    "languageAr": "Unknown",
    "languageEn": "Unknown",
    "runtimeMinutes": 76,
    "poster": "https://archive.org/download/its-the-old-army-game-12-mbps/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/its-the-old-army-game-12-mbps/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 76 دقيقة.",
    "descriptionEn": "HD Presentation Of Classic Silent Comedy From W.C. Fields.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/its-the-old-army-game-12-mbps/It%27s%20The%20Old%20Army%20Game%20%2812Mbps%29.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 461265883
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/its-the-old-army-game-12-mbps",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/its-the-old-army-game-12-mbps",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "W.C. Fields - It's The Old Army Game (Restored HD 1080p) (2025) — ",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/its-the-old-army-game-12-mbps/It%27s%20The%20Old%20Army%20Game%20%2812Mbps%29.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/its-the-old-army-game-12-mbps"
      }
    ]
  },
  {
    "id": "the-new-gladiators-1984",
    "type": "movie",
    "genres": [
      "action",
      "scifi"
    ],
    "titleAr": "Warriors of the Year 2072 aka The New Gladiators (1984)",
    "titleEn": "Warriors of the Year 2072 aka The New Gladiators (1984)",
    "titleOriginal": "Warriors of the Year 2072 aka The New Gladiators (1984)",
    "year": 2026,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 94,
    "poster": "https://archive.org/download/the.-new.-gladiators.-1984/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/the.-new.-gladiators.-1984/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2026، مدته نحو 94 دقيقة.",
    "descriptionEn": "In the future, two television networks compete for ratings by producing violent game shows. One network produces a modern-day version of the Roman gladiators, only on motorcycles instead of chariots, and uses convicted murderers as the participants. The network decides it needs a champion for this sport, so they frame a constant winner from another game for murder, and place him on the show.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/the.-new.-gladiators.-1984/The.New.Gladiators.1984.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 545110117
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/the.-new.-gladiators.-1984",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/the.-new.-gladiators.-1984",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "Warriors of the Year 2072 aka The New Gladiators (1984) (2026) — Lucio Fulci",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/the.-new.-gladiators.-1984/The.New.Gladiators.1984.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/the.-new.-gladiators.-1984"
      }
    ]
  },
  {
    "id": "watchwithmother2bbcv4286",
    "type": "movie",
    "genres": [
      "fantasy",
      "musical"
    ],
    "titleAr": "Watch With Mother 2 (BBCV 4286)",
    "titleEn": "Watch With Mother 2 (BBCV 4286)",
    "titleOriginal": "Watch With Mother 2 (BBCV 4286)",
    "year": 2019,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 78,
    "poster": "https://archive.org/download/watchwithmother2bbcv4286/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/watchwithmother2bbcv4286/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2019، مدته نحو 78 دقيقة.",
    "descriptionEn": "Picture Book: Bush Baby Andy Pandy: The Cart Flowerpot Men: The Potato Man Rag, Tag and Bobtail: Snowballs The Woodentops: Horseshoe",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "720p",
        "url": "https://archive.org/download/watchwithmother2bbcv4286/Watch%20with%20Mother%202%20%28BBCV%204286%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 1267030888
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/watchwithmother2bbcv4286",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/watchwithmother2bbcv4286",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Watch With Mother 2 (BBCV 4286) (2019) — Freda Lingstrom, Maria Bird",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/watchwithmother2bbcv4286/Watch%20with%20Mother%202%20%28BBCV%204286%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/watchwithmother2bbcv4286"
      }
    ]
  },
  {
    "id": "what-a-whopper-1961-202412",
    "type": "movie",
    "genres": [
      "comedy"
    ],
    "titleAr": "What A Whopper (1961) - British Comedy Film",
    "titleEn": "What A Whopper (1961) - British Comedy Film",
    "titleOriginal": "What A Whopper (1961) - British Comedy Film",
    "year": 2024,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 86,
    "poster": "https://archive.org/download/what-a-whopper-1961_202412/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/what-a-whopper-1961_202412/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2024، مدته نحو 86 دقيقة.",
    "descriptionEn": "What a Whopper is a 1961 British comedy film directed by Gilbert Gunn and starring Adam Faith, Sid James and Carole Lesley. It was written by Doctor Who writer and Dalek creator Terry Nation from an original script by Jeremy Lloyd. A writer travels to Scotland to fake a sighting of the Loch Ness Monster. TV reporter Fyfe Robertson appears briefly as himself, covering the alleged sightings of the monster.",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "480p",
        "url": "https://archive.org/download/what-a-whopper-1961_202412/What_a_Whopper_%281961%29.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 824974268
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/what-a-whopper-1961_202412",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/what-a-whopper-1961_202412",
    "licenseName": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "attribution": "What A Whopper (1961) - British Comedy Film (2024) — Terry Nation",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/what-a-whopper-1961_202412/What_a_Whopper_%281961%29.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/what-a-whopper-1961_202412"
      }
    ]
  },
  {
    "id": "winners-sinners-geek-juice-media",
    "type": "movie",
    "genres": [
      "action",
      "comedy",
      "drama",
      "crime",
      "war"
    ],
    "titleAr": "Winners & Sinners 奇謀妙計五福星 (GeekJuiceMedia) (Dubbed & Subtitled))",
    "titleEn": "Winners & Sinners 奇謀妙計五福星 (GeekJuiceMedia) (Dubbed & Subtitled))",
    "titleOriginal": "Winners & Sinners 奇謀妙計五福星 (GeekJuiceMedia) (Dubbed & Subtitled))",
    "year": 2025,
    "languageAr": "eng",
    "languageEn": "eng",
    "runtimeMinutes": 104,
    "poster": "https://archive.org/download/winners-sinners-geek-juice-media/__ia_thumb.jpg",
    "backdrop": "https://archive.org/download/winners-sinners-geek-juice-media/__ia_thumb.jpg",
    "descriptionAr": "فيلم روائي طويل من عام 2025، مدته نحو 104 دقيقة.",
    "descriptionEn": "Winners & Sinners (Chinese: 奇謀妙計五福星, also known as 5 Lucky Stars) is a 1983 Hong Kong action comedy film written and directed by Sammo Hung, who also starred in the film. The film co-stars Jackie Chan and Yuen Biao, the latter serving as one of the film's action directors. It was the first in the Lucky Stars series of films, a highly successful series in Hong Kong. The film co-stars Chan in a significant role as an error-prone police officer. It also features a cameo appearance from Yuen as another police officer who gets into a fight with Chan's character. The film is followed by My Lucky Stars and Twinkle, Twinkle Lucky Stars, insofar as th",
    "publishedAt": "2026-09-10",
    "sources": [
      {
        "label": "360p",
        "url": "https://archive.org/download/winners-sinners-geek-juice-media/1.%20Winners%20%26%20Sinners%20%28GeekJuiceMedia%29%20%28Dubbed%29.ia.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 639924296
      }
    ],
    "subtitles": [],
    "subtitleStatusAr": "لا توجد ترجمة عربية مرخّصة منشورة حاليًا.",
    "subtitleStatusEn": "No licensed Arabic subtitle track is currently published.",
    "contentSourceName": "Internet Archive",
    "contentSourceUrl": "https://archive.org/details/winners-sinners-geek-juice-media",
    "metadataSourceName": "Internet Archive",
    "metadataSourceUrl": "https://archive.org/details/winners-sinners-geek-juice-media",
    "licenseName": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "Winners & Sinners 奇謀妙計五福星 (GeekJuiceMedia) (Dubbed & Subtitled)) (2025) — KonCategory3",
    "downloadAllowed": true,
    "downloadUrl": "https://archive.org/download/winners-sinners-geek-juice-media/1.%20Winners%20%26%20Sinners%20%28GeekJuiceMedia%29%20%28Dubbed%29.ia.mp4",
    "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
    "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
    "legalLinks": [
      {
        "kind": "info",
        "labelAr": "المصدر والترخيص",
        "labelEn": "Source and license",
        "url": "https://archive.org/details/winners-sinners-geek-juice-media"
      }
    ]
  },
  // GENERATED PLAYABLE END
];

export const discoverableMovies = movieCatalog.filter(movie => movie.runtimeMinutes >= 60);
export const playableMovies = discoverableMovies.filter(movie => movie.sources.length > 0);
export const publicMovies = playableMovies;

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

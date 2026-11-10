SQ.register("major", "da", {
  meta: {
    title: "Valg af uddannelse | Selvevalueringsportalen",
    desc: "Spørgsmål, der hjælper dig med at se klart, før du vælger uddannelse, og med at sortere i dine interesser og evner."
  },
  intro: {
    title: "Valg af uddannelse",
    subtitle: "Det rigtige beslutningskvadrat for unge",
    verse: {
      ar: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
      meaning: "»Vor Herre, giv os glæde for vore øjne i vore ægtefæller og vore efterkommere, og gør os til forbilleder for de gudfrygtige.«",
      src: "Sura al-Furqan, vers 74"
    },
    after: [
      "<h3 class=\"center\">Beslutningskvadratet for uddannelse</h3><div class=\"grid-4\"><div class=\"tile\"><div class=\"t-icon\">❤️</div><strong>Noget, du elsker</strong><span>Det får dig op før vækkeuret!</span></div><div class=\"tile\"><div class=\"t-icon\">💪</div><strong>Noget, du kan</strong><span>Inden for dine evner og kvalifikationer</span></div><div class=\"tile\"><div class=\"t-icon\">📈</div><strong>Har en fremtid på arbejdsmarkedet</strong><span>Giver dig et ordentligt levebrød</span></div><div class=\"tile\"><div class=\"t-icon\">🌍</div><strong>Gavner dit fællesskab og dit land</strong><span>Dækker et behov i samfundet</span></div></div>",
      "<div class=\"card callout warn\"><h4>⚠️ Risikoen ved et forkert valg:</h4><ul class=\"list\"><li>Spildte år, kræfter og ressourcer</li><li>Psykisk belastning, depression og stress</li><li>En ustabil vej på arbejdsmarkedet</li></ul></div>"
    ],
    body: [
      "<p>Ungdommen er en periode, der er <strong>både vigtig og risikabel</strong>: vigtig, fordi den former et menneskes fremtid, og risikabel, fordi den er fuld af omskiftelser.</p><p>Valget af uddannelse efter gymnasiet er <strong>som dit fødselsår</strong> – kun ét år, men det former din skæbne!</p><p class=\"muted\">Vurderingen er for unge, der skal vælge uddannelse, eller for forældre, der vil vurdere, hvor klar deres børn er.</p>"
    ]
  },
  axes: {
    a1: {
      title: "Bevidsthed og planlægning",
      lead: "Hvor bevidst du er om vigtigheden af at planlægge og styre dine ting",
      desc: "Hvor bevidst du er om vigtigheden af at planlægge og styre dine ting"
    },
    a2: {
      title: "Kend dig selv og dine evner",
      lead: "Hvor godt du kender dine virkelige interesser og evner",
      desc: "Hvor godt du kender dine virkelige interesser og evner"
    },
    a3: {
      title: "Undersøgelse og rådgivning",
      lead: "Hvor meget du har undersøgt og spurgt erfarne mennesker",
      desc: "Hvor meget du har undersøgt og spurgt erfarne mennesker"
    }
  },
  questions: [
    "Jeg er klar over, at valget af uddannelse er en livsafgørende beslutning, der kræver god planlægning",
    "Jeg forstår, at et liv uden planlægning fører til spild og fortrydelse",
    "Jeg har en klar plan for min fremtidige uddannelse og karriere",
    "Jeg tænker mig grundigt om, før jeg træffer vigtige beslutninger",
    "Jeg kender risikoen ved at vælge uddannelse tilfældigt",
    "Jeg ved, at det koster meget at skifte uddannelse senere (tid, kræfter, penge)",
    "Jeg kan tage ansvar for mine beslutninger og deres konsekvenser",
    "Jeg ved, hvad jeg elsker, og hvor min passion ligger",
    "Jeg kender mine faglige styrker og svagheder",
    "Jeg kan skelne mellem det, jeg elsker, og det, jeg faktisk er god til",
    "Jeg ved, hvilke fag jeg er dygtig til",
    "Jeg kan forestille mig selv arbejde glad inden for et bestemt område",
    "Jeg kender min personlighedstype (praktisk, teoretisk, kreativ, teknisk …)",
    "Jeg har prøvet forskellige aktiviteter for at finde mine interesser",
    "Jeg har undersøgt de mulige uddannelser og deres optagelseskrav",
    "Jeg har spurgt folk inden for faget, hvordan deres studie og arbejde er",
    "Jeg har undersøgt jobmulighederne inden for de uddannelser, der interesserer mig",
    "Jeg har rådført mig med mine forældre og med folk, der har mere erfaring end mig",
    "Jeg ved, hvad arbejdsmarkedet i mit land har brug for",
    "Jeg har tænkt over, hvordan min uddannelse kan gavne mit fællesskab",
    "Jeg har taget interesse- eller evnetest for at hjælpe mig med at vælge"
  ],
  resultLabel: "Din parathed til at vælge uddannelse",
  bands: [
    {
      title: "Fremragende! 🌟",
      text: "Du er godt forberedt til at vælge uddannelse. Bliv ved med at undersøge og søge råd."
    },
    {
      title: "Godt 👍",
      text: "Du har et godt grundlag, men du har brug for at undersøge og tænke mere."
    },
    {
      title: "Du har brug for mere forberedelse ⚠️",
      text: "Forhast ikke beslutningen. Læs rådene nedenfor."
    },
    {
      title: "Stop! 🛑",
      text: "Du er ikke klar til at træffe denne beslutning endnu. Begynd med rådene nedenfor."
    }
  ],
  advice: {
    a1: {
      title: "💡 Råd til bedre bevidsthed og planlægning",
      body: [
        "Planlægning og god styring er grundlaget for succes i livet. Imam Ali (fred være med ham) sagde:",
        {
          ar: "لا خير في دنيا لا تدبير فيها",
          meaning: "»Der er intet godt i et liv uden planlægning.«",
          src: "Imam Ali (fred være med ham)"
        },
        "Uanset hvor mange evner et menneske har fået, vil det spilde dem uden god planlægning. Han (fred være med ham) sagde også:",
        {
          ar: "التدبير قبل العمل يؤمنك من الندم",
          meaning: "»Planlægning, før du handler, beskytter dig mod fortrydelse.«",
          src: "Imam Ali (fred være med ham)"
        }
      ],
      tips: [
        "Sæt dig ned, og skriv: Hvad vil jeg være om 10 år?",
        "Lav en plan A, en plan B og en plan C – livet går ikke altid som planlagt.",
        "Husk, at dette år er »som dit fødselsår« – én beslutning former din vej i livet.",
        "Træf ikke din beslutning under pres eller i sidste øjeblik."
      ],
      tipsTitle: "Konkrete skridt"
    },
    a2: {
      title: "💡 Råd til at kende dig selv og dine evner",
      body: [
        "At kende sig selv er grundlaget for al succes. Imam Ali (fred være med ham) sagde:",
        {
          ar: "من عرف نفسه فقد عرف ربه",
          meaning: "»Den, der kender sig selv, kender sin Herre.«",
          src: "Imam Ali (fred være med ham)"
        },
        "At kende sig selv omfatter at kende sine evner og interesser. Han (fred være med ham) sagde:",
        {
          ar: "يُعجبني رأي الشيخ وجَلَدُ الغلام",
          meaning: "»Jeg beundrer den ældres dømmekraft og den unges energi.«",
          src: "Imam Ali (fred være med ham)"
        },
        "Unge har energi og begejstring, men de har brug for vejledning og erfaring."
      ],
      tips: [
        "Spørg dig selv: Hvad får mig til at »stå op før vækkeuret« for at lave det?",
        "Se på dine karakterer: Hvilke fag falder dig naturligt?",
        "Prøv forskellige aktiviteter (frivilligt arbejde, kurser, små projekter) for at finde dine interesser.",
        "Spørg folk omkring dig: Hvilke talenter ser de i dig?",
        "Tag de interessetest, der findes på nettet (fx på UddannelsesGuiden, ug.dk)."
      ],
      tipsTitle: "Konkrete skridt"
    },
    a3: {
      title: "💡 Råd om at undersøge og søge råd",
      body: [
        "At søge råd og spørge er kendetegn ved kloge mennesker. Imam Ali (fred være med ham) sagde:",
        {
          ar: "من شاور الرجال شاركهم في عقولهم",
          meaning: "»Den, der rådfører sig med andre, får del i deres forstand.«",
          src: "Imam Ali (fred være med ham)"
        },
        "Imam al-Sadiq (fred være med ham) sagde:",
        {
          ar: "استشر العاقل من الرجال تسعد برأيه، ولا تتركه فتندم",
          meaning: "»Søg råd hos den kloge, så bliver du lykkelig ved hans råd; overse ham ikke, ellers vil du fortryde.«",
          src: "Imam al-Sadiq (fred være med ham)"
        }
      ],
      tips: [
        "Spørg studerende: Hvordan er deres studie? Kan de lide det? Hvad laver de efter endt uddannelse?",
        "Søg på nettet efter »jobmuligheder for [uddannelse] i mit land« – i Danmark fx på ug.dk.",
        "Rådfør dig med dine forældre – de har livserfaring og vil dig det bedste.",
        "Tænk over: Har mit land brug for denne uddannelse? Vil jeg kunne få arbejde?",
        "Find balancen mellem de fire: (du elsker det + du kan det + det har en fremtid + det gavner dit fællesskab).",
        "Vælg ikke en uddannelse, bare fordi din ven valgte den, eller fordi den er »moderne«."
      ],
      tipsTitle: "Konkrete skridt"
    }
  }
});

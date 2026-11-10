SQ.register('husband', 'da', {
  meta: {
    title: 'Er du en god ægtemand? | Selvevalueringsportalen',
    desc: 'En kort selvevaluering for ægtemænd. Få dit resultat og konkrete råd til at styrke dit ægteskab.'
  },
  intro: {
    title: 'Er du en god ægtemand?',
    subtitle: 'En selvevaluering inspireret af en prædiken af sheikh dr. Hassan Al-Balushi',
    body: '<p>I sin prædiken stiller sheikh dr. Hassan Al-Balushi et vigtigt spørgsmål: <strong>»Er du en god ægtemand?«</strong><br>Denne selvevaluering hjælper dig med at se ærligt på dig selv og finde dine styrker og svagheder i dit ægteskab.</p>'
  },
  axes: {
    a1: {
      title: 'Det følelsesmæssige ansvar',
      desc: ['At tage ansvar for den følelsesmæssige side af ægteskabet. Det bygger på tre søjler:', { list: [
        '<strong>Tryghed:</strong> at din hustru føler sig tryg hos dig',
        '<strong>Venskab:</strong> at du er en ægte ven for din hustru',
        '<strong>Respekt:</strong> at du respekterer din hustru som menneske og som en gave fra Allah'
      ] }]
    },
    a2: {
      title: 'Det praktiske ansvar',
      desc: ['At gå forrest i at styre ægteskabets praktiske sider:', { list: [
        '<strong>Initiativ:</strong> at bryde rutinen og forny forholdet',
        '<strong>Grænser:</strong> at beskytte hjemmet og håndtere relationer udadtil',
        '<strong>Partnerskab:</strong> at dele ansvar og beslutninger'
      ] }]
    }
  },
  pillars: {
    safety: { name: 'Tryghed', heading: '🛡️ Tryghed' },
    friendship: { name: 'Venskab', heading: '🤝 Venskab' },
    respect: { name: 'Respekt', heading: '🙏 Respekt' },
    initiative: { name: 'Initiativ', heading: '🚀 Initiativ og fornyelse' },
    boundaries: { name: 'Grænser', heading: '🏠 Grænser og beskyttelse' },
    partnership: { name: 'Partnerskab', heading: '🤝 Partnerskab og beslutninger' }
  },
  questions: [
    'Min hustru kommer til mig, når hun har et problem eller er under pres',
    'Jeg lytter til min hustru og lader hende fortælle om sine bekymringer uden at afbryde',
    'Mine reaktioner er forudsigelige, og mit humør er stabilt – ikke svingende',
    'Min hustru er ikke bange for min reaktion, når hun vil fortælle mig noget',
    'Jeg er åben og ærlig over for min hustru og skjuler ikke vigtige ting for hende',
    'Min hustru nyder at være sammen med mig – og jeg med hende',
    'Jeg interesserer mig for detaljerne i min hustrus liv og spørger til hendes dag',
    'Jeg lytter engageret til min hustru og kommenterer det, hun fortæller',
    'Jeg roser min hustru og værdsætter hendes indsats derhjemme',
    'Jeg siger jævnligt kærlige ord til min hustru',
    'Jeg bruger ikke ydmygende eller sårende ord, heller ikke når jeg er vred',
    'Jeg løfter aldrig hånden mod min hustru, uanset hvad vi er uenige om',
    'Jeg indrømmer mine fejl og er villig til at ændre mig',
    'Efter en konflikt tager jeg initiativ til at reparere forholdet og hele sårene',
    'Jeg tager initiativ til at bryde rutinen og forny vores ægteskab',
    'Jeg forstår min hustrus humørsvingninger og håndterer dem med klogskab',
    'Jeg håndterer forholdet mellem min hustru og min familie med klogskab og balance',
    'Jeg bevarer mit hjems hemmeligheder og fortæller ikke om vores privatliv',
    'Jeg lever op til mine pligter og mit ansvar over for hjemmet og familien',
    'Jeg hjælper min hustru med husholdningen og børnene',
    'Jeg rådfører mig med min hustru og inddrager hende i vigtige beslutninger'
  ],
  bands: [
    { title: 'Masha’Allah! Du er en rigtig god ægtemand.', text: 'Dit resultat viser stor bevidsthed og en vedvarende indsats for at bygge et godt ægteskab.' },
    { title: 'Godt gået! Du er på rette vej.', text: 'Du har nået målet (60 %). Læs rådene for at nå et endnu bedre og lykkeligere niveau.' },
    { title: 'Du har brug for at gøre en større indsats.', text: 'Der er god plads til forbedring. Fokusér på de svageste punkter, og begynd med en lille ændring hver dag.' },
    { title: 'Tiden er inde til en grundlæggende forandring.', text: 'Bare rolig – at erkende problemet er halvdelen af løsningen. Tag det første skridt i dag.' }
  ],
  overall: [
    { title: 'Masha’Allah! Du er en rigtig god ægtemand.', text: ['Dit resultat viser stor bevidsthed og en vedvarende indsats for at bygge et godt ægteskab. Fortsæt på dette niveau.',
      { ar: 'خيركم خيركم لأهله، وأنا خيركم لأهلي', meaning: '»Den bedste blandt jer er den, der er bedst mod sin familie – og jeg er den bedste blandt jer mod min familie.«', src: 'Profeten Muhammad (Allahs velsignelse være med ham og hans familie)' }] },
    { title: 'Godt gået! Du er på rette vej.', text: ['Du har nået målet (60 %), og det betyder, at du er en god ægtemand. Læs rådene nedenfor for at blive endnu bedre.'] },
    { title: 'Du har brug for at gøre en større indsats.', text: ['Dit resultat viser, at der er god plads til forbedring. Fokusér på de svageste punkter, og begynd med en lille ændring hver dag.'] },
    { title: 'Tiden er inde til en grundlæggende forandring.', text: ['Bare rolig – at erkende problemet er halvdelen af løsningen! Hver dag er en ny chance for at blive en bedre ægtemand.',
      { ar: 'أفضل الأعمال ما أكرهت نفسك عليه', meaning: '»De bedste gerninger er dem, du tvinger dig selv til at gøre.«', src: 'Imam Ali (fred være med ham)' }] }
  ],
  feedback: {
    safety: {
      excellent: { title: '🛡️ Fremragende tryghed', text: 'Du er et trygt sted for din hustru! Bliv ved med at være den, hun søger til i svære tider.' },
      good: { title: '🛡️ God tryghed', text: 'Fin indsats! Prøv at være mere stabil i dine reaktioner og mere åben i jeres kommunikation.' },
      needsWork: { title: '🛡️ Trygheden kan forbedres', text: ['Din hustru har brug for at føle sig tryg hos dig. Arbejd på at styre dine følelser, og vær mere tydelig.',
        { ar: 'رحم الله عبداً أحسن فيما بينه وبين زوجته', meaning: '»Må Allah vise barmhjertighed mod den tjener, der gør det godt i forholdet mellem sig selv og sin hustru.«', src: 'Imam al-Sadiq (fred være med ham)' }],
        tips: ['Øv dig i at lytte uden at afbryde', 'Gør dine reaktioner rolige og forudsigelige', 'Vær åben, og skjul ikke vigtige ting'] }
    },
    friendship: {
      excellent: { title: '🤝 Fremragende venskab', text: 'Din hustru er din sande ven! Bliv ved med at interessere dig for detaljerne og vise din kærlighed.' },
      good: { title: '🤝 Godt venskab', text: 'Et godt venskab! Prøv at bruge mere god tid sammen og vise dine følelser oftere.' },
      needsWork: { title: '🤝 Venskabet kan forbedres', text: ['Venskab i ægteskabet er grundlaget for lykke. Profeten (Allahs velsignelse være med ham og hans familie) spøgte med sine hustruer og lyttede til dem.',
        { ar: 'خيركم خيركم لأهله', meaning: '»Den bedste blandt jer er den, der er bedst mod sin familie.«', src: 'Profeten Muhammad (Allahs velsignelse være med ham og hans familie)' }],
        tips: ['Sæt tid af hver dag til at tale med hende', 'Spørg ind til detaljerne i hendes dag', 'Vis din kærlighed i både ord og handling'] }
    },
    respect: {
      excellent: { title: '🙏 Fremragende respekt', text: 'Du respekterer din hustru og hendes værdighed! Det er grundlaget for et godt ægteskab.' },
      good: { title: '🙏 God respekt', text: 'God respekt! Bliv ved med at tage initiativ til forsoning og tage imod konstruktiv kritik.' },
      needsWork: { title: '🙏 Respekten kan forbedres', text: ['Respekt er en rød linje! Hæv aldrig stemmen eller hånden.',
        { ar: 'فإنهن أمانات الله عندكم، فلا تضاروهن', meaning: '»De er betroet jer af Allah, så gør dem ikke fortræd.«', src: 'Imam Ali (fred være med ham)' }],
        tips: ['Undgå sårende ord, uanset hvor vred du er', 'Tag initiativ til at undskylde og forsone', 'Vær åben for forandring og konstruktiv kritik'] }
    },
    initiative: {
      excellent: { title: '🚀 Fremragende initiativ', text: 'Du fornyer forholdet og bryder rutinen! Bliv ved med de positive overraskelser.' },
      good: { title: '🚀 Godt initiativ', text: 'Fine initiativer! Forny jer endnu mere, og forstå din hustrus humørsvingninger.' },
      needsWork: { title: '🚀 Initiativet kan forbedres', text: 'Rutinen er ægteskabets fjende! Tag initiativ til fornyelse, og forstå din hustrus naturlige humørsvingninger.',
        tips: ['Planlæg små overraskelser jævnligt', 'Gå ud sammen, selv bare en kort tur', 'Forstå hendes humørskift, og tag dem ikke personligt'] }
    },
    boundaries: {
      excellent: { title: '🏠 Fremragende grænser', text: 'Du beskytter dit hjem og håndterer relationerne med klogskab! Bliv ved med at holde balancen.' },
      good: { title: '🏠 Gode grænser', text: 'God styring! Bevar dit hjems privatliv og balancen i forholdet til familien.' },
      needsWork: { title: '🏠 Grænserne kan forbedres', text: 'Dit hjem er betroet dig! Bevar dets hemmeligheder, og håndter forholdet til familien med klogskab uden at gøre din hustru uret.',
        tips: ['Fortæl ikke andre om dit hjems hemmeligheder', 'Find balancen mellem din hustrus ret og pligten over for dine forældre', 'Hold jeres beslutninger mellem jer to'] }
    },
    partnership: {
      excellent: { title: '🤝 Fremragende partnerskab', text: 'Du er en ægte partner! Du lever op til dine pligter og rådfører dig med din hustru. Et flot eksempel!' },
      good: { title: '🤝 Godt partnerskab', text: 'Et godt partnerskab! Hjælp mere til derhjemme, og rådfør dig mere med din hustru.' },
      needsWork: { title: '🤝 Partnerskabet kan forbedres', text: ['Ægteskab er et partnerskab! Profeten (Allahs velsignelse være med ham og hans familie) hjalp sin familie og rådførte sig med sine hustruer.',
        { ar: 'كان يخصف نعله ويرقع ثوبه ويخدم نفسه', meaning: '»Han reparerede selv sine sko, lappede sit tøj og klarede sine egne ting.«', src: 'Beskrivelse af Profeten (Allahs velsignelse være med ham og hans familie)' }],
        tips: ['Hjælp fast til med husarbejdet', 'Rådfør dig med din hustru om beslutninger', 'Løft hele dit ansvar over for familien'] }
    }
  },
  promise: {
    intro: 'Skriv et løfte til dig selv om det, du vil udvikle og forbedre i dit ægteskab.<br>Løftet er mellem dig og dig selv – at holde det er første skridt mod en positiv forandring.',
    suggestions: ['Jeg vil sætte tid af hver dag til at tale med min hustru', 'Jeg vil jævnligt vise min hustru kærlighed og påskønnelse']
  }
});

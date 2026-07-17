export const projectPages = {
  keyfix: {
    hero: {
      en: "Fix the wrong keyboard layout after the word is typed.",
      fa: "بعد از تایپ کلمه، زبان اشتباه کیبورد را اصلاح کن.",
      ar: "أصلح تخطيط لوحة المفاتيح الخاطئ بعد كتابة الكلمة.",
      de: "Korrigiere das falsche Tastaturlayout nach dem Wort."
    },
    lead: {
      en: "KeyFix watches only a short local typing buffer, detects when a word was typed with the wrong keyboard layout, alerts or switches language, and can correct the previous mistyped word after Space — without telemetry.",
      fa: "KeyFix فقط یک بافر کوتاه محلی از تایپ را بررسی می‌کند، تشخیص می‌دهد کلمه با چیدمان اشتباه نوشته شده، هشدار می‌دهد یا زبان را عوض می‌کند و می‌تواند بعد از Space کلمه قبلی را اصلاح کند — بدون ارسال داده.",
      ar: "يراقب KeyFix مخزنا محليا قصيرا للكتابة فقط، ويكتشف عندما تكتب كلمة بتخطيط لوحة مفاتيح خاطئ، ثم ينبه أو يبدل اللغة ويمكنه تصحيح الكلمة السابقة بعد Space — دون إرسال بيانات.",
      de: "KeyFix beobachtet nur einen kurzen lokalen Tipp-Puffer, erkennt Worte im falschen Tastaturlayout, warnt oder wechselt die Sprache und kann das vorherige falsch getippte Wort nach Space korrigieren — ohne Telemetrie."
    },
    problem: {
      en: "Switching between English, Persian, Arabic, and German keyboard layouts leads to mistyped words. Users notice after typing but can't fix without deleting and retyping.",
      fa: "جابجایی بین چیدمان کیبورد انگلیسی، فارسی، عربی و آلمانی منجر به تایپ اشتباه می‌شود. کاربر بعد از تایپ متوجه می‌شود اما بدون پاک کردن و بازنویسی نمی‌تواند اصلاح کند.",
      ar: "التنقل بين تخطيطات لوحة المفاتيح الإنجليزية والفارسية والعربية والألمانية يؤدي إلى كلمات مكتوبة بشكل خاطئ. يلاحظ المستخدمون ذلك بعد الكتابة لكن لا يمكنهم التصحيح دون حذف وإعادة كتابة.",
      de: "Das Wechseln zwischen englischen, persischen, arabischen und deutschen Tastaturlayouts führt zu falsch getippten Wörtern. Benutzer bemerken es erst nach dem Tippen, können es aber nur durch Löschen und Neuschreiben korrigieren."
    },
    solution: {
      en: "A tray app that detects wrong keyboard layouts in real-time, alerts the user, and can automatically correct the mistyped word after pressing Space — all locally with no data sent anywhere.",
      fa: "یک اپلیکیشن tray که چیدمان اشتباه کیبورد را در لحظه تشخیص می‌دهد، به کاربر هشدار می‌دهد و می‌تواند کلمه اشتباه را بعد از Space خودکار اصلاح کند — همه به صورت محلی و بدون ارسال داده.",
      ar: "تطبيق tray يكتشف تخطيطات لوحة المفاتيح الخاطئة في الوقت الفعلي، وينبه المستخدم، ويمكنه تصحيح الكلمة الخاطئة تلقائياً بعد Space — كل ذلك محلياً دون إرسال أي بيانات.",
      de: "Eine Tray-App, die falsche Tastaturlayouts in Echtzeit erkennt, den Benutzer warnt und das falsch getippte Wort nach Space automatisch korrigieren kann — alles lokal ohne Datenübertragung."
    },
    features: [
      { title: { en: "Local typing buffer", fa: "بافر تایپ محلی", ar: "مخزن كتابة محلي", de: "Lokaler Tipp-Puffer" }, body: { en: "Keeps only a short in-memory buffer and clears it after correction, Enter, Tab, unsupported layouts, or excluded apps.", fa: "فقط یک بافر کوتاه داخل حافظه نگه می‌دارد و بعد از اصلاح، Enter، Tab، چیدمان‌های پشتیبانی‌نشده یا برنامه‌های مستثنی آن را پاک می‌کند.", ar: "يحتفظ بمخزن قصير داخل الذاكرة فقط ويمسحه بعد التصحيح أو Enter أو Tab أو التخطيطات غير المدعومة أو التطبيقات المستثناة.", de: "Hält nur einen kurzen Puffer im Speicher und löscht ihn nach Korrektur, Enter, Tab, nicht unterstützten Layouts oder ausgeschlossenen Apps." } },
      { title: { en: "Dictionary detection", fa: "تشخیص با دیکشنری", ar: "كشف بالقواميس", de: "Wörterbuch-Erkennung" }, body: { en: "Uses common-word dictionaries for English, Persian, Arabic, and German to decide whether another layout is more likely.", fa: "از دیکشنری کلمات رایج انگلیسی، فارسی، عربی و آلمانی استفاده می‌کند تا تشخیص دهد آیا چیدمان دیگری محتمل‌تر است یا نه.", ar: "يستخدم قواميس للكلمات الشائعة في الإنجليزية والفارسية والعربية والألمانية ليقرر إن كان تخطيط آخر أكثر احتمالا.", de: "Nutzt häufige Wörter für Englisch, Persisch, Arabisch und Deutsch, um zu entscheiden, ob ein anderes Layout wahrscheinlicher ist." } },
      { title: { en: "Alert, suggest, or fix", fa: "هشدار، پیشنهاد یا اصلاح", ar: "تنبيه أو اقتراح أو تصحيح", de: "Warnen, vorschlagen oder korrigieren" }, body: { en: "Can play an alert, show a tray notification, switch the input language, or automatically rewrite the previous mistyped word.", fa: "می‌تواند صدا پخش کند، اعلان tray نشان دهد، زبان ورودی را عوض کند یا کلمه اشتباه قبلی را خودکار بازنویسی کند.", ar: "يمكنه تشغيل صوت، إظهار إشعار في tray، تبديل لغة الإدخال أو إعادة كتابة الكلمة السابقة تلقائيا.", de: "Kann einen Ton abspielen, eine Tray-Benachrichtigung zeigen, die Eingabesprache wechseln oder das vorherige falsch getippte Wort ersetzen." } },
      { title: { en: "Per-language control", fa: "کنترل زبان‌ها", ar: "تحكم حسب اللغة", de: "Kontrolle pro Sprache" }, body: { en: "Users can enable only the languages they actually type with, improving accuracy and reducing unnecessary corrections.", fa: "کاربر فقط زبان‌هایی را فعال می‌کند که واقعاً با آن‌ها تایپ می‌کند؛ این کار دقت را بهتر و اصلاح‌های بی‌مورد را کمتر می‌کند.", ar: "يمكن للمستخدم تفعيل اللغات التي يكتب بها فعلا فقط، مما يحسن الدقة ويقلل التصحيحات غير الضرورية.", de: "Nutzer aktivieren nur die Sprachen, die sie wirklich verwenden. Das verbessert die Erkennung und reduziert unnötige Korrekturen." } },
      { title: { en: "Safer correction", fa: "اصلاح امن‌تر", ar: "تصحيح أكثر أمانا", de: "Sicherere Korrektur" }, body: { en: "Avoids rewriting words that are already valid in the active language and handles short words more carefully.", fa: "کلمه‌ای را که در زبان فعال معتبر است بازنویسی نمی‌کند و کلمات کوتاه را با احتیاط بیشتری بررسی می‌کند.", ar: "لا يعيد كتابة كلمة صالحة بالفعل في اللغة النشطة ويتعامل مع الكلمات القصيرة بحذر أكبر.", de: "Schreibt keine Wörter um, die bereits in der aktiven Sprache gültig sind, und behandelt kurze Wörter vorsichtiger." } },
      { title: { en: "Windows installer", fa: "نصب‌کننده ویندوز", ar: "مثبت ويندوز", de: "Windows-Installer" }, body: { en: "The release ships as a Windows setup file so users can install the app without building from source.", fa: "نسخه منتشرشده به شکل فایل Setup ویندوز ارائه شده تا کاربر بدون build کردن سورس برنامه را نصب کند.", ar: "يأتي الإصدار كملف إعداد لويندوز حتى يتمكن المستخدم من تثبيت التطبيق من دون بناء المصدر.", de: "Das Release wird als Windows-Setup ausgeliefert, damit Nutzer die App ohne Build aus dem Quellcode installieren können." } }
    ],
    steps: [
      { title: { en: "User types normally", fa: "کاربر عادی تایپ می‌کند", ar: "يكتب المستخدم بشكل طبيعي", de: "Normal tippen" }, body: { en: "KeyFix stays in the tray and waits until a word is completed with Space before making a decision.", fa: "KeyFix داخل tray می‌ماند و صبر می‌کند تا کلمه با Space کامل شود، بعد تصمیم می‌گیرد.", ar: "يبقى KeyFix في tray وينتظر اكتمال الكلمة بزر Space قبل اتخاذ القرار.", de: "KeyFix bleibt im Tray und wartet, bis ein Wort mit Space abgeschlossen ist, bevor es entscheidet." } },
      { title: { en: "Score the word locally", fa: "امتیازدهی محلی کلمه", ar: "تقييم الكلمة محليا", de: "Wort lokal bewerten" }, body: { en: "The app compares the observed word with enabled language dictionaries and keyboard layout maps.", fa: "برنامه کلمه دیده شده را با دیکشنری زبان‌های فعال و نقشه‌های چیدمان کیبورد مقایسه می‌کند.", ar: "يقارن التطبيق الكلمة المرصودة بقواميس اللغات المفعلة وخرائط تخطيط لوحة المفاتيح.", de: "Die App vergleicht das beobachtete Wort mit aktivierten Wörterbüchern und Tastaturlayout-Zuordnungen." } },
      { title: { en: "Choose the action", fa: "انتخاب واکنش", ar: "اختيار الإجراء", de: "Aktion wählen" }, body: { en: "Depending on settings, KeyFix alerts, suggests, switches language, or corrects the mistyped word automatically.", fa: "بر اساس تنظیمات، KeyFix هشدار می‌دهد، پیشنهاد می‌دهد، زبان را عوض می‌کند یا کلمه اشتباه را خودکار اصلاح می‌کند.", ar: "حسب الإعدادات، ينبه KeyFix أو يقترح أو يبدل اللغة أو يصحح الكلمة الخاطئة تلقائيا.", de: "Je nach Einstellung warnt KeyFix, schlägt vor, wechselt die Sprache oder korrigiert das falsch getippte Wort automatisch." } },
      { title: { en: "Stay private", fa: "خصوصی باقی می‌ماند", ar: "يبقى خاصا", de: "Privat bleiben" }, body: { en: "Typed text is not saved to disk, not uploaded, and no telemetry or remote server is used.", fa: "متن تایپ شده روی دیسک ذخیره نمی‌شود، جایی آپلود نمی‌شود و telemetry یا سرور خارجی وجود ندارد.", ar: "لا يتم حفظ النص المكتوب على القرص، ولا يتم رفعه، ولا توجد telemetry أو خوادم بعيدة.", de: "Getippter Text wird nicht gespeichert, nicht hochgeladen, und es gibt keine Telemetrie oder Remote-Server." } }
    ],
    downloads: [{ label: { en: "Download latest", fa: "دانلود آخرین نسخه", ar: "تحميل الأحدث", de: "Neueste Version" }, url: "https://github.com/miladateight/KeyFix/releases/latest", primary: true },
                { label: { en: "Release notes", fa: "یادداشت انتشار", ar: "ملاحظات الإصدار", de: "Release Notes" }, url: "https://github.com/miladateight/KeyFix/releases", primary: false },
                { label: { en: "Source code", fa: "سورس کد", ar: "الكود المصدري", de: "Quellcode" }, url: "https://github.com/miladateight/KeyFix", primary: false }]
  },
  netdoctor: {
    hero: {
      en: "Diagnose and repair network issues with confidence.",
      fa: "مشکلات شبکه را با اطمینان تشخیص بده و ترمیم کن.",
      ar: "شخص مشاكل الشبكة وأصلحها بثقة.",
      de: "Netzwerkprobleme sicher diagnostizieren und beheben."
    },
    lead: {
      en: "NetDoctor is a Windows network diagnostics tool that checks DNS, latency, proxy configuration, and connectivity — with guided, reversible repair flows.",
      fa: "NetDoctor یک ابزار تشخیص شبکه ویندوز است که DNS، تاخیر، تنظیمات proxy و اتصال را بررسی می‌کند — با ترمیم‌های هدایت‌شده و قابل بازگشت.",
      ar: "NetDoctor أداة تشخيص شبكات Windows تفحص DNS والكمون وإعدادات proxy والاتصال — مع مسارات إصلاح موجَّهة وقابلة للتراجع.",
      de: "NetDoctor ist ein Windows-Netzwerkdiagnosetool, das DNS, Latenz, Proxy-Konfiguration und Konnektivität prüft — mit geführten, rückgängig machbaren Reparaturen."
    },
    problem: {
      en: "\"Is the internet up?\" is often the wrong question, especially in Iran: local access, international access, DNS, proxy, and VPN state can each fail independently, and most people can't tell which one is actually broken.",
      fa: "«آیا اینترنت وصل است؟» اغلب سؤال اشتباهی است، به‌خصوص در ایران: دسترسی داخلی، دسترسی بین‌المللی، DNS، پراکسی و وضعیت VPN می‌توانند مستقل از هم خراب شوند و اکثر افراد نمی‌توانند تشخیص دهند مشکل واقعی از کجاست.",
      ar: "\"هل الإنترنت متصل؟\" غالباً سؤال خاطئ، خصوصاً في إيران: الوصول المحلي والدولي وDNS والوكيل وحالة VPN يمكن أن تتعطل كل على حدة، ومعظم الناس لا يستطيعون تحديد أين يكمن الخلل فعلاً.",
      de: "\"Ist das Internet erreichbar?\" ist oft die falsche Frage, besonders im Iran: lokaler Zugriff, internationaler Zugriff, DNS, Proxy und VPN-Status können jeweils unabhängig ausfallen, und die meisten Menschen können nicht sagen, wo das eigentliche Problem liegt."
    },
    solution: {
      en: "A single Windows app that separates internal from international access, compares your DNS against multiple resolvers including Iranian ones, and proposes a one-click fix you can always undo once the real cause is clear.",
      fa: "یک اپلیکیشن ویندوز که دسترسی داخلی را از بین‌المللی جدا می‌کند، DNS شما را با چند resolver از جمله گزینه‌های ایرانی مقایسه می‌کند و بعد از روشن‌شدن علت واقعی، یک ترمیم یک‌کلیکی و همیشه قابل‌بازگشت پیشنهاد می‌دهد.",
      ar: "تطبيق Windows واحد يفصل الوصول المحلي عن الدولي، ويقارن DNS الخاص بك بعدة خوادم من ضمنها خوادم إيرانية، ويقترح إصلاحاً بضغطة واحدة قابلاً للتراجع دائماً بعد تحديد السبب الحقيقي.",
      de: "Eine einzige Windows-App, die internen von internationalem Zugriff trennt, Ihr DNS mit mehreren Resolvern vergleicht, darunter iranische, und nach Klärung der eigentlichen Ursache eine Ein-Klick-Lösung vorschlägt, die sich immer rückgängig machen lässt."
    },
    features: [
      { title: { en: "Problem-first flow", fa: "جریان مبتنی بر مشکل", ar: "تدفّق يبدأ من المشكلة", de: "Problemorientierter Ablauf" }, body: { en: "Start from your symptom, not from technical menus.", fa: "شروع از علائمی که می‌بینید، نه از منوهای فنی.", ar: "البدء من العارض الذي تراه، لا من قوائم تقنية.", de: "Start bei Ihrem Symptom, nicht bei technischen Menüs." } },
      { title: { en: "Internal vs. international", fa: "داخلی در مقابل بین‌المللی", ar: "محلي مقابل دولي", de: "Intern vs. international" }, body: { en: "A clear verdict on what works and what doesn't, separated by scope.", fa: "نتیجه‌ای روشن از آنچه کار می‌کند و آنچه کار نمی‌کند، به‌تفکیک دامنه.", ar: "حكم واضح حول ما يعمل وما لا يعمل، مفصولاً حسب النطاق.", de: "Ein klares Urteil darüber, was funktioniert und was nicht, getrennt nach Reichweite." } },
      { title: { en: "Multi-resolver DNS diagnosis", fa: "تشخیص DNS با چند resolver", ar: "تشخيص DNS متعدد الخوادم", de: "DNS-Diagnose mit mehreren Resolvern" }, body: { en: "Compares your system DNS against multiple public resolvers, including Shecan, Electro, and Begzar.", fa: "DNS سیستم شما را با چند resolver عمومی از جمله شکن، الکترو و بگزار مقایسه می‌کند.", ar: "يقارن DNS النظام بعدة خوادم عامة، من ضمنها خوادم إيرانية معروفة.", de: "Vergleicht Ihr System-DNS mit mehreren öffentlichen Resolvern, darunter bekannte iranische Anbieter." } },
      { title: { en: "Full checks", fa: "بررسی کامل", ar: "فحوصات شاملة", de: "Vollständige Prüfungen" }, body: { en: "Adapter, gateway, DNS, latency and packet loss, TCP port reachability, VPN adapters, and Windows proxy.", fa: "آداپتور، گیت‌وی، DNS، تاخیر و افت بسته، دسترسی پورت TCP، آداپتورهای VPN و پراکسی ویندوز.", ar: "المحول، الجواز، DNS، الكمون وفقد الحزم، الوصول إلى منافذ TCP، محولات VPN، ووكيل Windows.", de: "Adapter, Gateway, DNS, Latenz und Paketverlust, TCP-Port-Erreichbarkeit, VPN-Adapter und Windows-Proxy." } },
      { title: { en: "Fix safely", fa: "ترمیم امن", ar: "إصلاح آمن", de: "Sicher reparieren" }, body: { en: "Switch DNS, reset a stale proxy, or refresh the network — always saving the previous setting first, with Undo.", fa: "تغییر DNS، ریست پراکسی قدیمی یا تازه‌سازی شبکه — همیشه با ذخیره‌ی تنظیم قبلی و قابلیت Undo.", ar: "تبديل DNS أو إعادة ضبط وكيل قديم أو تحديث الشبكة — مع حفظ الإعداد السابق دائماً وإمكانية التراجع.", de: "DNS wechseln, einen veralteten Proxy zurücksetzen oder das Netzwerk erneuern — immer mit vorheriger Sicherung und Undo." } },
      { title: { en: "Advanced repair", fa: "ترمیم پیشرفته", ar: "إصلاح متقدّم", de: "Erweiterte Reparatur" }, body: { en: "A full Winsock / TCP-IP stack reset behind a clear warning, for the toughest cases.", fa: "ریست کامل پشته‌ی Winsock / TCP-IP پشت یک هشدار روشن، برای سخت‌ترین موارد.", ar: "إعادة ضبط كاملة لمكدّس Winsock / TCP-IP خلف تحذير واضح، للحالات الأصعب.", de: "Ein vollständiger Winsock-/TCP-IP-Stack-Reset hinter einer klaren Warnung, für die schwierigsten Fälle." } }
    ],
    editions: [
      { title: { en: "NetDoctor", fa: "NetDoctor", ar: "NetDoctor", de: "NetDoctor" }, body: { en: "English interface, country auto-detected, built for users anywhere in the world.", fa: "رابط انگلیسی، تشخیص خودکار کشور، برای کاربران در سراسر جهان.", ar: "واجهة إنجليزية، اكتشاف تلقائي للدولة، مصمم للمستخدمين حول العالم.", de: "Englische Oberfläche, automatische Ländererkennung, für Nutzer weltweit." } },
      { title: { en: "NetDoctor — Iran Edition", fa: "NetDoctor — نسخه ایران", ar: "NetDoctor — إصدار إيران", de: "NetDoctor — Iran Edition" }, body: { en: "Persian (فارسی) right-to-left interface, tuned for Iranian sites, ISPs, and DNS resolvers.", fa: "رابط فارسی راست‌به‌چپ، تنظیم‌شده برای سایت‌ها، ISPها و resolverهای DNS ایرانی.", ar: "واجهة فارسية من اليمين إلى اليسار، مضبوطة لمواقع إيران ومزوّدي الخدمة وخوادم DNS المحلية.", de: "Persische Oberfläche von rechts nach links, abgestimmt auf iranische Seiten, Provider und DNS-Resolver." } }
    ],
    screenshots: [
      { src: "/projects/netdoctor/dashboard.png", caption: { en: "Command center — live health, bottleneck analysis, and safe fixes", fa: "مرکز فرماندهی — سلامت زنده، آنالیز گلوگاه و ترمیم امن", ar: "مركز القيادة — الصحة المباشرة وتحليل الاختناق والإصلاح الآمن", de: "Command Center — Live-Status, Engpassanalyse und sichere Reparaturen" } },
      { src: "/projects/netdoctor/setup.png", caption: { en: "Guided Initial Setup — diagnose, choose a DNS, and repair step by step", fa: "راه‌اندازی اولیه‌ی گام‌به‌گام — عیب‌یابی، انتخاب DNS و ترمیم", ar: "الإعداد الأولي الموجَّه — تشخيص واختيار DNS وإصلاح خطوة بخطوة", de: "Geführte Ersteinrichtung — Diagnose, DNS-Auswahl und Reparatur Schritt für Schritt" } }
    ],
    steps: [
      { title: { en: "Run a scan", fa: "اجرای اسکن", ar: "تشغيل الفحص", de: "Scan ausführen" }, body: { en: "NetDoctor runs a comprehensive diagnostics scan covering DNS, ping, traceroute, and proxy.", fa: "NetDoctor یک اسکن تشخیصی جامع شامل DNS، پینگ، traceroute و proxy اجرا می‌کند.", ar: "يجري NetDoctor فحصاً تشخيصياً شاملاً يغطي DNS و ping و traceroute و proxy.", de: "NetDoctor führt einen umfassenden Diagnosescan durch, der DNS, Ping, Traceroute und Proxy abdeckt." } },
      { title: { en: "Review results", fa: "بررسی نتایج", ar: "مراجعة النتائج", de: "Ergebnisse prüfen" }, body: { en: "Issues are categorized with clear severity levels and explanations.", fa: "مشکلات با سطوح شدت و توضیحات واضح دسته‌بندی می‌شوند.", ar: "تصنف المشاكل بمستويات شدة وشروحات واضحة.", de: "Probleme werden mit klaren Schweregraden und Erklärungen kategorisiert." } },
      { title: { en: "Apply a fix", fa: "اعمال ترمیم", ar: "تطبيق الإصلاح", de: "Reparatur anwenden" }, body: { en: "Select a repair and follow the guided steps. Each step can be reviewed before applying.", fa: "یک ترمیم انتخاب کنید و مراحل هدایت‌شده را دنبال کنید. هر مرحله قبل از اعمال قابل بررسی است.", ar: "اختر إصلاحاً واتبع الخطوات الموجَّهة. كل خطوة قابلة للمراجعة قبل التطبيق.", de: "Wähle eine Reparatur und folge den geführten Schritten. Jeder Schritt kann vor der Anwendung überprüft werden." } },
      { title: { en: "Revert if needed", fa: "بازگشت در صورت نیاز", ar: "التراجع إذا لزم الأمر", de: "Rückgängig machen bei Bedarf" }, body: { en: "Every repair is logged and reversible from the app's history panel.", fa: "هر ترمیم ثبت شده و از پنل تاریخچه برنامه قابل بازگشت است.", ar: "كل إصلاح مسجل وقابل للتراجع من لوحة تاريخ التطبيق.", de: "Jede Reparatur wird protokolliert und kann über das Verlaufsfeld der App rückgängig gemacht werden." } }
    ],
    downloads: [{ label: { en: "Get a license on Telegram", fa: "دریافت لایسنس در تلگرام", ar: "الحصول على ترخيص عبر Telegram", de: "Lizenz über Telegram erhalten" }, url: "https://t.me/MiladAteight", primary: true },
                { label: { en: "Download latest", fa: "دانلود آخرین نسخه", ar: "تحميل الأحدث", de: "Neueste Version" }, url: "https://github.com/miladateight/NetDoctor/releases/latest", primary: false }]
  },
  "pdf-sanitizer": {
    hero: {
      en: "Clean up thousands of PDF pages in one pass.",
      fa: "هزاران صفحه PDF را در یک مرحله پاک‌سازی کن.",
      ar: "نظّف آلاف صفحات PDF في تمريرة واحدة.",
      de: "Tausende PDF-Seiten in einem Durchgang bereinigen."
    },
    lead: {
      en: "PDF Sanitizer is a Windows tool for commercial and trading teams that edit huge PDFs. It finds repeated or unwanted content and removes, replaces, or inserts it across hundreds or thousands of pages from a single rule set — no manual page-by-page work.",
      fa: "PDF Sanitizer یک ابزار ویندوز برای تیم‌های بازرگانی و تجاری است که PDFهای بزرگ را ویرایش می‌کنند. محتوای تکراری یا ناخواسته را پیدا می‌کند و با یک مجموعه قانون آن را روی صدها یا هزاران صفحه حذف، جایگزین یا اضافه می‌کند — بدون کار دستی صفحه‌به‌صفحه.",
      ar: "PDF Sanitizer أداة Windows للفِرق التجارية التي تحرّر ملفات PDF ضخمة. تعثر على المحتوى المتكرر أو غير المرغوب وتحذفه أو تستبدله أو تضيفه عبر مئات أو آلاف الصفحات من مجموعة قواعد واحدة — دون عمل يدوي صفحةً بصفحة.",
      de: "PDF Sanitizer ist ein Windows-Tool für Handels- und Geschäftsteams, die riesige PDFs bearbeiten. Es findet wiederkehrende oder unerwünschte Inhalte und entfernt, ersetzt oder ergänzt sie über Hunderte oder Tausende Seiten aus einem einzigen Regelsatz — ohne manuelle Seite-für-Seite-Arbeit."
    },
    problem: {
      en: "Commercial and trading teams often receive PDFs with hundreds or thousands of pages that repeat the same blocks — headers, stamps, prices, watermarks, or contact details — that must be removed or updated. Doing it by hand, page by page, is slow, tiring, and error-prone.",
      fa: "تیم‌های بازرگانی و تجاری اغلب PDFهایی با صدها یا هزاران صفحه دریافت می‌کنند که بلوک‌های یکسانی را تکرار می‌کنند — سربرگ، مهر، قیمت، واترمارک یا اطلاعات تماس — که باید حذف یا به‌روزرسانی شوند. انجام دستی این کار صفحه‌به‌صفحه کند، خسته‌کننده و پرخطاست.",
      ar: "غالباً ما تتلقى الفِرق التجارية ملفات PDF بمئات أو آلاف الصفحات تكرّر نفس الكتل — ترويسات وأختام وأسعار وعلامات مائية أو بيانات اتصال — يجب حذفها أو تحديثها. القيام بذلك يدوياً صفحةً بصفحة بطيء ومُتعب وعرضة للأخطاء.",
      de: "Handels- und Geschäftsteams erhalten oft PDFs mit Hunderten oder Tausenden Seiten, die dieselben Blöcke wiederholen — Kopfzeilen, Stempel, Preise, Wasserzeichen oder Kontaktdaten — die entfernt oder aktualisiert werden müssen. Das von Hand, Seite für Seite, zu tun, ist langsam, ermüdend und fehleranfällig."
    },
    solution: {
      en: "Define once what should be removed, replaced, or added, then let PDF Sanitizer apply those rules across the whole document — however many pages — locally on your machine, and export one clean file.",
      fa: "یک بار مشخص کن چه چیزی باید حذف، جایگزین یا اضافه شود، سپس بگذار PDF Sanitizer آن قانون‌ها را روی کل سند — هر تعداد صفحه — به‌صورت محلی روی سیستم تو اعمال کند و یک فایل تمیز خروجی بگیرد.",
      ar: "حدِّد مرة واحدة ما يجب حذفه أو استبداله أو إضافته، ثم دَع PDF Sanitizer يطبّق هذه القواعد على المستند بأكمله — مهما بلغ عدد صفحاته — محلياً على جهازك، ويُصدّر ملفاً واحداً نظيفاً.",
      de: "Lege einmal fest, was entfernt, ersetzt oder ergänzt werden soll, und lass PDF Sanitizer diese Regeln auf das gesamte Dokument anwenden — egal wie viele Seiten — lokal auf deinem Rechner, und exportiere eine saubere Datei."
    },
    features: [
      { title: { en: "Rule-based batch editing", fa: "ویرایش دسته‌ای بر پایه قانون", ar: "تحرير دفعي قائم على القواعد", de: "Regelbasierte Stapelbearbeitung" }, body: { en: "Define find, replace, remove, and insert rules once, then apply them to every page automatically.", fa: "قانون‌های پیدا کردن، جایگزینی، حذف و افزودن را یک بار تعریف کن و به‌صورت خودکار روی هر صفحه اعمال کن.", ar: "عرّف قواعد البحث والاستبدال والحذف والإضافة مرة واحدة، ثم طبّقها على كل صفحة تلقائياً.", de: "Definiere Such-, Ersetzungs-, Entfernungs- und Einfügeregeln einmal und wende sie automatisch auf jede Seite an." } },
      { title: { en: "Built for large documents", fa: "ساخته‌شده برای اسناد بزرگ", ar: "مصمّم للمستندات الكبيرة", de: "Für große Dokumente gebaut" }, body: { en: "Handles hundreds to thousands of pages in a single pass instead of page-by-page editing.", fa: "به‌جای ویرایش صفحه‌به‌صفحه، صدها تا هزاران صفحه را در یک مرحله پردازش می‌کند.", ar: "يعالج مئات إلى آلاف الصفحات في تمريرة واحدة بدلاً من التحرير صفحةً بصفحة.", de: "Verarbeitet Hunderte bis Tausende Seiten in einem Durchgang statt Seite für Seite." } },
      { title: { en: "Remove, replace, or insert", fa: "حذف، جایگزینی یا افزودن", ar: "حذف أو استبدال أو إضافة", de: "Entfernen, ersetzen oder einfügen" }, body: { en: "Delete repeated blocks, swap out text or values, or add new content in bulk across the file.", fa: "بلوک‌های تکراری را حذف کن، متن یا مقادیر را عوض کن یا محتوای جدید را به‌صورت دسته‌ای در کل فایل اضافه کن.", ar: "احذف الكتل المتكررة، أو استبدل النصوص والقيم، أو أضِف محتوى جديداً دفعةً واحدة عبر الملف.", de: "Lösche wiederkehrende Blöcke, tausche Text oder Werte aus oder füge neue Inhalte in großem Umfang in die Datei ein." } },
      { title: { en: "Preview before export", fa: "پیش‌نمایش قبل از خروجی", ar: "معاينة قبل التصدير", de: "Vorschau vor dem Export" }, body: { en: "Review what the rules will change before the final PDF is written, so nothing is edited blindly.", fa: "قبل از نوشتن PDF نهایی، تغییراتی را که قانون‌ها اعمال می‌کنند بررسی کن تا هیچ‌چیز کورکورانه ویرایش نشود.", ar: "راجع ما ستغيّره القواعد قبل كتابة ملف PDF النهائي، حتى لا يُحرَّر شيء بشكل أعمى.", de: "Prüfe, was die Regeln ändern, bevor das finale PDF geschrieben wird — nichts wird blind bearbeitet." } },
      { title: { en: "Local processing", fa: "پردازش محلی", ar: "معالجة محلية", de: "Lokale Verarbeitung" }, body: { en: "Documents are processed on your own machine. Files are never uploaded to any server.", fa: "اسناد روی سیستم خودت پردازش می‌شوند. فایل‌ها هرگز به هیچ سروری آپلود نمی‌شوند.", ar: "تتم معالجة المستندات على جهازك. لا تُرفَع الملفات إلى أي خادم أبداً.", de: "Dokumente werden auf deinem eigenen Rechner verarbeitet. Dateien werden nie auf einen Server hochgeladen." } },
      { title: { en: "Free and Premium tiers", fa: "نسخه رایگان و پریمیوم", ar: "باقتان مجانية وبريميوم", de: "Kostenlose und Premium-Stufe" }, body: { en: "Start free for small jobs, up to 10 pages and 2 files a day; unlock unlimited work with a Telegram license.", fa: "برای کارهای کوچک رایگان شروع کن، تا ۱۰ صفحه و ۲ فایل در روز؛ کار نامحدود را با لایسنس تلگرام باز کن.", ar: "ابدأ مجاناً للمهام الصغيرة، حتى 10 صفحات وملفين في اليوم؛ افتح العمل غير المحدود بترخيص عبر Telegram.", de: "Starte kostenlos für kleine Aufgaben, bis zu 10 Seiten und 2 Dateien pro Tag; schalte unbegrenztes Arbeiten mit einer Telegram-Lizenz frei." } }
    ],
    plans: [
      {
        name: { en: "Free", fa: "رایگان", ar: "مجاني", de: "Kostenlos" },
        price: { en: "Free", fa: "رایگان", ar: "مجاني", de: "Kostenlos" },
        note: { en: "For small, occasional jobs", fa: "برای کارهای کوچک و گاه‌به‌گاه", ar: "للمهام الصغيرة والعرضية", de: "Für kleine, gelegentliche Aufgaben" },
        features: [
          { en: "Up to 10 pages per file", fa: "تا ۱۰ صفحه در هر فایل", ar: "حتى 10 صفحات لكل ملف", de: "Bis zu 10 Seiten pro Datei" },
          { en: "Up to 2 files per day", fa: "حداکثر ۲ فایل در روز", ar: "حتى ملفين في اليوم", de: "Bis zu 2 Dateien pro Tag" },
          { en: "All core sanitize rules", fa: "همه قانون‌های اصلی پاک‌سازی", ar: "جميع قواعد التنظيف الأساسية", de: "Alle Kern-Bereinigungsregeln" },
          { en: "Fully local processing", fa: "پردازش کاملاً محلی", ar: "معالجة محلية بالكامل", de: "Vollständig lokale Verarbeitung" }
        ]
      },
      {
        name: { en: "Premium", fa: "پریمیوم", ar: "بريميوم", de: "Premium" },
        price: { en: "License via Telegram", fa: "لایسنس از طریق تلگرام", ar: "ترخيص عبر Telegram", de: "Lizenz über Telegram" },
        badge: { en: "Unlimited", fa: "نامحدود", ar: "غير محدود", de: "Unbegrenzt" },
        highlight: true,
        note: { en: "For high-volume, professional work", fa: "برای کارهای حرفه‌ای و پرحجم", ar: "للعمل الاحترافي وكبير الحجم", de: "Für professionelle Arbeit mit hohem Volumen" },
        features: [
          { en: "Unlimited pages per file", fa: "صفحات نامحدود در هر فایل", ar: "صفحات غير محدودة لكل ملف", de: "Unbegrenzte Seiten pro Datei" },
          { en: "Unlimited files per day", fa: "فایل نامحدود در روز", ar: "ملفات غير محدودة يومياً", de: "Unbegrenzte Dateien pro Tag" },
          { en: "Full rule engine, no caps", fa: "موتور قانون کامل، بدون سقف", ar: "محرك قواعد كامل دون حدود", de: "Vollständige Regel-Engine, ohne Limits" },
          { en: "Priority support on Telegram", fa: "پشتیبانی اولویت‌دار در تلگرام", ar: "دعم ذو أولوية عبر Telegram", de: "Priorisierter Support auf Telegram" }
        ],
        cta: { label: { en: "Get a license on Telegram", fa: "دریافت لایسنس در تلگرام", ar: "الحصول على ترخيص عبر Telegram", de: "Lizenz über Telegram erhalten" }, url: "https://t.me/MiladAteight" }
      }
    ],
    steps: [
      { title: { en: "Load your PDF", fa: "بارگذاری PDF", ar: "حمّل ملف PDF", de: "PDF laden" }, body: { en: "Open a large document — whatever number of pages it has.", fa: "یک سند بزرگ را باز کن — با هر تعداد صفحه‌ای که دارد.", ar: "افتح مستنداً كبيراً — أياً كان عدد صفحاته.", de: "Öffne ein großes Dokument — egal mit wie vielen Seiten." } },
      { title: { en: "Define the rules", fa: "تعریف قانون‌ها", ar: "عرّف القواعد", de: "Regeln definieren" }, body: { en: "Mark what to remove, what to replace, and what to insert.", fa: "مشخص کن چه چیزی حذف، چه چیزی جایگزین و چه چیزی اضافه شود.", ar: "حدِّد ما يُحذف وما يُستبدل وما يُضاف.", de: "Lege fest, was entfernt, ersetzt und eingefügt wird." } },
      { title: { en: "Run the batch", fa: "اجرای دسته‌ای", ar: "شغّل الدفعة", de: "Stapel ausführen" }, body: { en: "Apply the rules across every page of the document in one pass.", fa: "قانون‌ها را در یک مرحله روی همه صفحات سند اعمال کن.", ar: "طبّق القواعد على كل صفحة من المستند في تمريرة واحدة.", de: "Wende die Regeln in einem Durchgang auf jede Seite des Dokuments an." } },
      { title: { en: "Export a clean file", fa: "خروجی فایل تمیز", ar: "صدّر ملفاً نظيفاً", de: "Saubere Datei exportieren" }, body: { en: "Preview the result and save the sanitized PDF.", fa: "نتیجه را پیش‌نمایش کن و PDF پاک‌سازی‌شده را ذخیره کن.", ar: "عايِن النتيجة واحفظ ملف PDF بعد تنظيفه.", de: "Prüfe das Ergebnis und speichere das bereinigte PDF." } }
    ],
    downloads: [{ label: { en: "Get a license on Telegram", fa: "دریافت لایسنس در تلگرام", ar: "الحصول على ترخيص عبر Telegram", de: "Lizenz über Telegram erhalten" }, url: "https://t.me/MiladAteight", primary: true }]
  },
  "hybrid-web-mail-infrastructure": {
    hero: {
      en: "Production infrastructure for web, mail, and secure tunneling.",
      fa: "زیرساخت واقعی برای وب، ایمیل و تونل امن.",
      ar: "بنية تحتية إنتاجية للويب والبريد والأنفاق الآمنة.",
      de: "Produktionsinfrastruktur für Web, Mail und sichere Tunnel."
    },
    lead: {
      en: "A sanitized case study of a hybrid production environment: Linux hosting, HestiaCP, Nginx, Exim, Dovecot, Roundcube, HAProxy, WireGuard, MikroTik, and backup strategy.",
      fa: "یک مطالعه موردی پاک‌سازی‌شده از محیط عملیاتی ترکیبی: هاستینگ لینوکس، HestiaCP، Nginx، Exim، Dovecot، Roundcube، HAProxy، WireGuard، MikroTik و استراتژی بکاپ.",
      ar: "دراسة حالة منظفة من بيئة إنتاج هجينة: استضافة Linux و HestiaCP و Nginx و Exim و Dovecot و Roundcube و HAProxy و WireGuard و MikroTik واستراتيجية النسخ الاحتياطي.",
      de: "Eine bereinigte Fallstudie einer hybriden Produktionsumgebung: Linux-Hosting, HestiaCP, Nginx, Exim, Dovecot, Roundcube, HAProxy, WireGuard, MikroTik und Backup-Strategie."
    },
    problem: {
      en: "Running both web and mail services on a single public IP behind CGNAT, with a requirement for zero-downtime mail delivery, DNS authentication, and encrypted internal routing.",
      fa: "اجرای همزمان سرویس‌های وب و ایمیل روی یک IP عمومی پشت CGNAT، با نیاز به تحویل ایمیل بدون قطعی، احراز هویت DNS و مسیریابی رمزگذاری‌شده داخلی.",
      ar: "تشغيل كل من خدمات الويب والبريد على IP عام واحد خلف CGNAT، مع شرط تسليم بريد دون انقطاع ومصادقة DNS وتوجيه داخلي مشفر.",
      de: "Betrieb von Web- und Mail-Diensten auf einer einzigen öffentlichen IP hinter CGNAT, mit Anforderungen an unterbrechungsfreie Mail-Zustellung, DNS-Authentifizierung und verschlüsseltes internes Routing."
    },
    solution: {
      en: "A hybrid architecture using HAProxy for TCP splitting, WireGuard for encrypted site-to-site links, MikroTik for VLAN and routing, and HestiaCP with Nginx and Exim for the web/mail stack.",
      fa: "یک معماری ترکیبی با HAProxy برای جداسازی TCP، WireGuard برای لینک‌های رمزگذاری‌شده سایت به سایت، MikroTik برای VLAN و مسیریابی، و HestiaCP با Nginx و Exim برای پشته وب و ایمیل.",
      ar: "بنية هجينة تستخدم HAProxy لتقسيم TCP و WireGuard للوصلات المشفرة بين المواقع و MikroTik لـ VLAN والتوجيه و HestiaCP مع Nginx و Exim لمنظومة الويب والبريد.",
      de: "Eine hybride Architektur mit HAProxy für TCP-Splitting, WireGuard für verschlüsselte Site-to-Site-Verbindungen, MikroTik für VLAN und Routing, und HestiaCP mit Nginx und Exim für den Web/Mail-Stack."
    },
    features: [
      { title: { en: "HAProxy TCP splitting", fa: "جداسازی TCP با HAProxy", ar: "تقسيم TCP عبر HAProxy", de: "HAProxy TCP-Splitting" }, body: { en: "Single public IP handles HTTP, HTTPS, SMTP, IMAP, and submission — HAProxy routes each protocol to the correct backend.", fa: "یک IP عمومی HTTP، HTTPS، SMTP، IMAP و submission را مدیریت می‌کند — HAProxy هر پروتکل را به backend مناسب هدایت می‌کند.", ar: "IP عام واحد يتعامل مع HTTP و HTTPS و SMTP و IMAP و submission — HAProxy يوجّه كل بروتوكول إلى الخلفية المناسبة.", de: "Eine einzige öffentliche IP behandelt HTTP, HTTPS, SMTP, IMAP und Submission — HAProxy leitet jedes Protokoll an das richtige Backend weiter." } },
      { title: { en: "WireGuard tunneling", fa: "تونل WireGuard", ar: "نفق WireGuard", de: "WireGuard-Tunnel" }, body: { en: "Encrypted site-to-site link between datacenter and office with failover routing via MikroTik.", fa: "لینک رمزگذاری‌شده بین دیتاسنتر و دفتر با مسیریابی failover از طریق MikroTik.", ar: "وصلة مشفرة بين مركز البيانات والمكتب مع توجيه احتياطي عبر MikroTik.", de: "Verschlüsselte Site-to-Site-Verbindung zwischen Rechenzentrum und Büro mit Failover-Routing über MikroTik." } },
      { title: { en: "DNS authentication", fa: "احراز هویت DNS", ar: "مصادقة DNS", de: "DNS-Authentifizierung" }, body: { en: "SPF, DKIM, DMARC, and DANE records configured and verified for all mail domains.", fa: "رکوردهای SPF، DKIM، DMARC و DANE برای همه دامنه‌های ایمیل پیکربندی و تأیید شده‌اند.", ar: "تم تكوين سجلات SPF و DKIM و DMARC و DANE والتحقق منها لجميع نطاقات البريد.", de: "SPF-, DKIM-, DMARC- und DANE-Einträge wurden für alle Mail-Domains konfiguriert und verifiziert." } },
      { title: { en: "Backup strategy", fa: "استراتژی بکاپ", ar: "استراتيجية النسخ الاحتياطي", de: "Backup-Strategie" }, body: { en: "Automated daily backups with off-site encryption, tested restore procedures, and retention policies.", fa: "بکاپ خودکار روزانه با رمزگذاری خارج از سایت، روش‌های بازیابی تست‌شده و سیاست‌های نگهداری.", ar: "نسخ احتياطية تلقائية يومية مع تشفير خارج الموقع وإجراءات استعادة مُختبرة وسياسات احتفاظ.", de: "Automatische tägliche Backups mit Off-Site-Verschlüsselung, getesteten Wiederherstellungsverfahren und Aufbewahrungsrichtlinien." } },
      { title: { en: "Monitoring & logging", fa: "نظارت و ثبت", ar: "مراقبة وتسجيل", de: "Überwachung und Protokollierung" }, body: { en: "Centralized logging with log rotation, service health checks, and alerting for critical failures.", fa: "ثبت متمرکز با چرخش لاگ، بررسی سلامت سرویس و هشدار برای خرابی‌های بحرانی.", ar: "تسجيل مركزي مع تدوير السجلات وفحوصات صحة الخدمة وتنبيهات للأعطال الحرجة.", de: "Zentrale Protokollierung mit Log-Rotation, Service-Health-Checks und Alarmierung bei kritischen Ausfällen." } },
      { title: { en: "Migration playbook", fa: "راهنمای مهاجرت", ar: "دليل الترحيل", de: "Migrationshandbuch" }, body: { en: "Step-by-step migration from legacy cPanel to HestiaCP with detailed rollback procedures.", fa: "مهاجرت گام‌به‌گام از cPanel قدیمی به HestiaCP با روش‌های دقیق بازگشت.", ar: "ترحيل خطوة بخطوة من cPanel القديم إلى HestiaCP مع إجراءات تراجع مفصلة.", de: "Schritt-für-Schritt-Migration von Legacy-cPanel zu HestiaCP mit detaillierten Rollback-Verfahren." } }
    ],
    steps: [
      { title: { en: "Assess current setup", fa: "ارزیابی وضعیت فعلی", ar: "تقييم الإعداد الحالي", de: "Aktuelle Einrichtung bewerten" }, body: { en: "Review existing hosting, mail flow, DNS records, and network topology.", fa: "بررسی هاستینگ فعلی، جریان ایمیل، رکوردهای DNS و توپولوژی شبکه.", ar: "مراجعة الاستضافة الحالية وتدفق البريد وسجلات DNS وهيكل الشبكة.", de: "Überprüfung des bestehenden Hostings, Mail-Flows, DNS-Einträge und der Netzwerktopologie." } },
      { title: { en: "Design hybrid architecture", fa: "طراحی معماری ترکیبی", ar: "تصميم البنية الهجينة", de: "Hybride Architektur entwerfen" }, body: { en: "Plan the HAProxy splitting, WireGuard links, VLANs, and service placement.", fa: "برنامه‌ریزی جداسازی HAProxy، لینک‌های WireGuard، VLAN‌ها و جانمایی سرویس‌ها.", ar: "تخطيط تقسيم HAProxy ووصلات WireGuard و VLANs ومواضع الخدمات.", de: "Planung des HAProxy-Splittings, der WireGuard-Verbindungen, VLANs und Service-Platzierung." } },
      { title: { en: "Migrate services", fa: "مهاجرت سرویس‌ها", ar: "ترحيل الخدمات", de: "Dienste migrieren" }, body: { en: "Move mail and web services in a controlled sequence with validation at each step.", fa: "انتقال سرویس‌های ایمیل و وب در یک توالی کنترل‌شده با اعتبارسنجی در هر مرحله.", ar: "نقل خدمات البريد والويب بتسلسل محكوم مع التحقق في كل خطوة.", de: "Migration der Mail- und Webdienste in kontrollierter Reihenfolge mit Validierung bei jedem Schritt." } },
      { title: { en: "Verify & document", fa: "تأیید و مستندسازی", ar: "التحقق والتوثيق", de: "Verifizieren und dokumentieren" }, body: { en: "Test mail delivery, DNS resolution, failover routing, and document the final architecture.", fa: "تست تحویل ایمیل، DNS، مسیریابی failover و مستندسازی معماری نهایی.", ar: "اختبار تسليم البريد وتحليل DNS وتوجيه التبديل وتوثيق البنية النهائية.", de: "Testen der Mail-Zustellung, DNS-Auflösung, Failover-Routing und Dokumentation der endgültigen Architektur." } }
    ],
    downloads: [{ label: { en: "Architecture repository", fa: "مخزن معماری", ar: "مستودع المعمارية", de: "Architektur-Repository" }, url: "https://github.com/miladateight/hybrid-web-mail-infrastructure", primary: true },
                { label: { en: "Source diagrams", fa: "نمودارهای منبع", ar: "مخططات المصدر", de: "Quelldiagramme" }, url: "https://github.com/miladateight/hybrid-web-mail-infrastructure", primary: false }]
  },
  "instagram-youtube-soundcloud-downloader": {
    hero: {
      en: "Download from Instagram, YouTube, and SoundCloud via Telegram.",
      fa: "از Instagram، YouTube و SoundCloud از طریق تلگرام دانلود کن.",
      ar: "نزّل من Instagram و YouTube و SoundCloud عبر Telegram.",
      de: "Lade von Instagram, YouTube und SoundCloud per Telegram herunter."
    },
    lead: {
      en: "A private Telegram bot that handles media downloads from multiple platforms, with admin-only activation and cookie-based authentication.",
      fa: "یک ربات تلگرامی خصوصی که دانلود رسانه از چندین پلتفرم را مدیریت می‌کند، با فعال‌سازی فقط توسط ادمین و احراز هویت مبتنی بر کوکی.",
      ar: "بوت Telegram خاص يدير تنزيل الوسائط من منصات متعددة، مع تفعيل من المسؤول فقط ومصادقة تعتمد على ملفات تعريف الارتباط.",
      de: "Ein privater Telegram-Bot, der Mediendownloads von mehreren Plattformen verwaltet, mit Admin-Aktivierung und Cookie-basierter Authentifizierung."
    },
    problem: {
      en: "Downloading media from Instagram, YouTube, and SoundCloud usually requires multiple apps, browser extensions, or websites — each with ads, trackers, and inconsistent quality.",
      fa: "دانلود رسانه از Instagram، YouTube و SoundCloud معمولاً به چندین اپلیکیشن، افزونه مرورگر یا وب‌سایت نیاز دارد — هرکدام با تبلیغات، ردیاب‌ها و کیفیت ناپایدار.",
      ar: "يتطلب تنزيل الوسائط من Instagram و YouTube و SoundCloud عادة تطبيقات متعددة أو إضافات متصفح أو مواقع ويب — كل منها يحتوي على إعلانات ومتتبعات وجودة غير مستقرة.",
      de: "Das Herunterladen von Medien von Instagram, YouTube und SoundCloud erfordert normalerweise mehrere Apps, Browser-Erweiterungen oder Websites — jede mit Werbung, Trackern und inkonsistenter Qualität."
    },
    solution: {
      en: "A single Telegram bot where authorized users send a link, and the bot handles the download, format selection, and delivery — clean, fast, and private.",
      fa: "یک ربات تلگرامی که کاربران مجاز لینک ارسال می‌کنند و ربات دانلود، انتخاب فرمت و تحویل را مدیریت می‌کند — تمیز، سریع و خصوصی.",
      ar: "بوت Telegram واحد حيث يرسل المستخدمون المصرح لهم رابطاً، ويتولى البوت التنزيل واختيار التنسيق والتسليم — نظيف وسريع وخاص.",
      de: "Ein einziger Telegram-Bot, bei dem autorisierte Benutzer einen Link senden und der Bot den Download, die Formatauswahl und die Zustellung übernimmt — sauber, schnell und privat."
    },
    features: [
      { title: { en: "Multi-platform support", fa: "پشتیبانی چند پلتفرمی", ar: "دعم متعدد المنصات", de: "Multi-Plattform-Unterstützung" }, body: { en: "Downloads from Instagram (reels, posts, stories), YouTube (videos, shorts), and SoundCloud (tracks, playlists).", fa: "دانلود از Instagram (reels، پست‌ها، stories)، YouTube (ویدئوها، shorts) و SoundCloud (آهنگ‌ها، لیست‌ها).", ar: "تنزيل من Instagram (reels ومنشورات وقصص) وYouTube (فيديو وshorts) وSoundCloud (مقاطع وقوائم).", de: "Downloads von Instagram (Reels, Beiträge, Stories), YouTube (Videos, Shorts) und SoundCloud (Tracks, Playlists)." } },
      { title: { en: "Admin activation", fa: "فعال‌سازی توسط ادمین", ar: "تفعيل المسؤول", de: "Admin-Aktivierung" }, body: { en: "Only pre-authorized Telegram users can use the bot. New users require admin approval.", fa: "فقط کاربران تأییدشده تلگرام می‌توانند از ربات استفاده کنند. کاربران جدید نیاز به تأیید ادمین دارند.", ar: "يمكن فقط للمستخدمين المصرح لهم مسبقاً استخدام البوت. المستخدمون الجدد يحتاجون موافقة المسؤول.", de: "Nur vorautorisierte Telegram-Benutzer können den Bot nutzen. Neue Benutzer benötigen Admin-Freigabe." } },
      { title: { en: "Cookie management", fa: "مدیریت کوکی", ar: "إدارة الكوكيز", de: "Cookie-Verwaltung" }, body: { en: "Supports cookie-based authentication for platforms that require it, stored securely per user.", fa: "از احراز هویت مبتنی بر کوکی برای پلتفرم‌هایی که نیاز دارند پشتیبانی می‌کند، به صورت امن برای هر کاربر ذخیره می‌شود.", ar: "يدعم مصادقة تعتمد على الكوكيز للمنصات التي تتطلب ذلك، مخزنة بشكل آمن لكل مستخدم.", de: "Unterstützt Cookie-basierte Authentifizierung für Plattformen, die dies erfordern, sicher pro Benutzer gespeichert." } },
      { title: { en: "Format selection", fa: "انتخاب فرمت", ar: "اختيار التنسيق", de: "Formatwahl" }, body: { en: "Users can choose between video, audio, and specific quality options when available.", fa: "کاربران می‌توانند بین ویدئو، صدا و گزینه‌های کیفیت خاص انتخاب کنند.", ar: "يمكن للمستخدمين الاختيار بين الفيديو والصوت وخيارات جودة محددة عند التوفر.", de: "Benutzer können zwischen Video, Audio und bestimmten Qualitätsoptionen wählen, wenn verfügbar." } },
      { title: { en: "Queue system", fa: "سیستم صف", ar: "نظام قائمة الانتظار", de: "Warteschlangensystem" }, body: { en: "Multiple download requests are queued and processed sequentially to avoid rate limits.", fa: "درخواست‌های دانلود متعدد در صف قرار می‌گیرند و به ترتیب پردازش می‌شوند تا از محدودیت نرخ جلوگیری شود.", ar: "تضع طلبات التنزيل المتعددة في قائمة وتعالج بالتسلسل لتجنب حدود المعدل.", de: "Mehrere Download-Anfragen werden in eine Warteschlange gestellt und sequenziell verarbeitet, um Ratenbegrenzungen zu vermeiden." } },
      { title: { en: "Privacy-focused", fa: "حریم خصوصی", ar: "التركيز على الخصوصية", de: "Datenschutzorientiert" }, body: { en: "Downloads are delivered directly via Telegram. No logs are kept of downloaded files or user activity.", fa: "دانلودها مستقیماً از طریق تلگرام تحویل داده می‌شوند. هیچ لاگی از فایل‌های دانلودی یا فعالیت کاربران نگهداری نمی‌شود.", ar: "يتم تسليم التنزيلات مباشرة عبر Telegram. لا يتم الاحتفاظ بسجلات للملفات المنزلة أو نشاط المستخدم.", de: "Downloads werden direkt per Telegram zugestellt. Es werden keine Protokolle heruntergeladener Dateien oder Benutzeraktivitäten geführt." } }
    ],
    steps: [
      { title: { en: "Send a link", fa: "ارسال لینک", ar: "إرسال رابط", de: "Link senden" }, body: { en: "Authorized users send an Instagram, YouTube, or SoundCloud link to the bot.", fa: "کاربران مجاز یک لینک Instagram، YouTube یا SoundCloud به ربات ارسال می‌کنند.", ar: "يرسل المستخدمون المصرح لهم رابط Instagram أو YouTube أو SoundCloud إلى البوت.", de: "Autorisierte Benutzer senden einen Instagram-, YouTube- oder SoundCloud-Link an den Bot." } },
      { title: { en: "Bot processes", fa: "پردازش توسط ربات", ar: "معالجة البوت", de: "Bot verarbeitet" }, body: { en: "The bot fetches the media, offers format options if available, and prepares the file.", fa: "ربات رسانه را دریافت می‌کند، گزینه‌های فرمت را ارائه می‌دهد و فایل را آماده می‌کند.", ar: "يجلب البوت الوسائط، ويقدم خيارات التنسيق إذا كانت متاحة، ويجهّز الملف.", de: "Der Bot ruft die Medien ab, bietet Formatoptionen an, falls verfügbar, und bereitet die Datei vor." } },
      { title: { en: "Download delivered", fa: "تحویل دانلود", ar: "تسليم التنزيل", de: "Download zugestellt" }, body: { en: "The file is sent directly through Telegram chat. No external links or ads.", fa: "فایل مستقیماً از طریق چت تلگرام ارسال می‌شود. بدون لینک خارجی یا تبلیغات.", ar: "يرسل الملف مباشرة عبر محادثة Telegram. لا روابط خارجية أو إعلانات.", de: "Die Datei wird direkt per Telegram-Chat gesendet. Keine externen Links oder Werbung." } }
    ],
    downloads: [{ label: { en: "Source code", fa: "سورس کد", ar: "الكود المصدري", de: "Quellcode" }, url: "https://github.com/miladateight/instagram-youtube-soundcloud-downloader", primary: true }]
  },
  "ai-chat-rtl-fixer": {
    hero: {
      en: "Make AI chat apps read right-to-left — without breaking code.",
      fa: "اپ‌های چت هوش مصنوعی را راست‌به‌چپ کن — بدون خراب‌کردن کد.",
      ar: "اجعل تطبيقات دردشة الذكاء الاصطناعي تُقرأ من اليمين إلى اليسار — دون كسر الكود.",
      de: "KI-Chat-Apps von rechts nach links lesbar machen — ohne Code zu zerstören."
    },
    lead: {
      en: "AI Chat RTL Fixer is a free, open-source Windows tray tool that fixes right-to-left rendering inside desktop AI chat apps for Persian, Arabic, Hebrew, and Urdu — while code, paths, commands, URLs, and English text stay left-to-right and copy-safe.",
      fa: "AI Chat RTL Fixer یک ابزار tray ویندوز رایگان و متن‌باز است که رندر راست‌به‌چپ را داخل اپ‌های دسکتاپ چت هوش مصنوعی برای فارسی، عربی، عبری و اردو اصلاح می‌کند — در حالی که کد، مسیرها، دستورها، URLها و متن انگلیسی چپ‌به‌راست و امن برای کپی باقی می‌مانند.",
      ar: "AI Chat RTL Fixer أداة مجانية مفتوحة المصدر في شريط مهام Windows تصحّح عرض النص من اليمين إلى اليسار داخل تطبيقات دردشة الذكاء الاصطناعي للفارسية والعربية والعبرية والأردية — بينما يبقى الكود والمسارات والأوامر والروابط والنص الإنجليزي من اليسار إلى اليمين وآمناً للنسخ.",
      de: "AI Chat RTL Fixer ist ein kostenloses, quelloffenes Windows-Tray-Tool, das die Rechts-nach-links-Darstellung in Desktop-KI-Chat-Apps für Persisch, Arabisch, Hebräisch und Urdu korrigiert — während Code, Pfade, Befehle, URLs und englischer Text von links nach rechts und kopiersicher bleiben."
    },
    problem: {
      en: "Desktop AI chat apps (Electron / WebView2) render Persian, Arabic, Hebrew, and Urdu messages left-to-right, so the text reads backwards, punctuation jumps to the wrong side, and mixed lines with English or code become hard to follow.",
      fa: "اپ‌های دسکتاپ چت هوش مصنوعی (Electron / WebView2) پیام‌های فارسی، عربی، عبری و اردو را چپ‌به‌راست نمایش می‌دهند؛ در نتیجه متن برعکس خوانده می‌شود، علائم به سمت اشتباه می‌پرند و خطوط ترکیبی با انگلیسی یا کد سخت‌خوان می‌شوند.",
      ar: "تعرض تطبيقات دردشة الذكاء الاصطناعي (Electron / WebView2) رسائل الفارسية والعربية والعبرية والأردية من اليسار إلى اليمين، فيُقرأ النص معكوساً، وتقفز علامات الترقيم إلى الجانب الخطأ، وتصبح الأسطر المختلطة مع الإنجليزية أو الكود صعبة المتابعة.",
      de: "Desktop-KI-Chat-Apps (Electron / WebView2) stellen persische, arabische, hebräische und urdu Nachrichten von links nach rechts dar, sodass der Text rückwärts gelesen wird, Satzzeichen auf die falsche Seite springen und gemischte Zeilen mit Englisch oder Code schwer lesbar werden."
    },
    solution: {
      en: "A lightweight tray app that classifies each chat block and applies the correct text direction to the chat surface only — leaving the sidebar, menus, editor, and terminal untouched. Everything is runtime-only: disable or quit and every change is gone.",
      fa: "یک اپ tray سبک که هر بلوک چت را دسته‌بندی می‌کند و جهت درست متن را فقط روی سطح چت اعمال می‌کند — بدون دست‌زدن به نوار کناری، منوها، ویرایشگر و ترمینال. همه‌چیز فقط در زمان اجراست: غیرفعال یا بسته کنی، همه تغییرها پاک می‌شوند.",
      ar: "تطبيق خفيف في شريط المهام يصنّف كل كتلة دردشة ويطبّق اتجاه النص الصحيح على سطح الدردشة فقط — دون المساس بالشريط الجانبي والقوائم والمحرر والطرفية. كل شيء يعمل وقت التشغيل فقط: عطّله أو أغلقه فتختفي كل التغييرات.",
      de: "Eine leichte Tray-App, die jeden Chat-Block klassifiziert und die richtige Textrichtung nur auf die Chat-Oberfläche anwendet — Seitenleiste, Menüs, Editor und Terminal bleiben unberührt. Alles läuft nur zur Laufzeit: deaktivieren oder beenden, und jede Änderung ist weg."
    },
    features: [
      { title: { en: "Chat surface only", fa: "فقط سطح چت", ar: "سطح الدردشة فقط", de: "Nur die Chat-Oberfläche" }, body: { en: "Only chat messages are re-flowed. The sidebar, title bar, menus, settings, file tree, code editor, and terminal are never modified.", fa: "فقط پیام‌های چت بازچینش می‌شوند. نوار کناری، نوار عنوان، منوها، تنظیمات، درخت فایل، ویرایشگر کد و ترمینال هرگز تغییر نمی‌کنند.", ar: "يُعاد ترتيب رسائل الدردشة فقط. الشريط الجانبي وشريط العنوان والقوائم والإعدادات وشجرة الملفات ومحرر الكود والطرفية لا تُعدَّل أبداً.", de: "Nur Chat-Nachrichten werden umgeflossen. Seitenleiste, Titelleiste, Menüs, Einstellungen, Dateibaum, Code-Editor und Terminal bleiben unverändert." } },
      { title: { en: "Code stays LTR", fa: "کد چپ‌به‌راست می‌ماند", ar: "الكود يبقى LTR", de: "Code bleibt LTR" }, body: { en: "Code blocks, file paths, commands, URLs, and English text keep left-to-right direction and stay copy-safe.", fa: "بلوک‌های کد، مسیرهای فایل، دستورها، URLها و متن انگلیسی جهت چپ‌به‌راست را حفظ می‌کنند و برای کپی امن می‌مانند.", ar: "تحافظ كتل الكود والمسارات والأوامر والروابط والنص الإنجليزي على اتجاه من اليسار إلى اليمين وتبقى آمنة للنسخ.", de: "Codeblöcke, Dateipfade, Befehle, URLs und englischer Text behalten die Links-nach-rechts-Richtung und bleiben kopiersicher." } },
      { title: { en: "Runtime-only", fa: "فقط در زمان اجرا", ar: "وقت التشغيل فقط", de: "Nur zur Laufzeit" }, body: { en: "No files inside the target app are patched. Disable the tool or restart the app normally and it returns to a clean state.", fa: "هیچ فایلی داخل اپ هدف تغییر داده نمی‌شود. ابزار را غیرفعال کن یا اپ را عادی ری‌استارت کن تا به حالت تمیز برگردد.", ar: "لا يتم تعديل أي ملفات داخل التطبيق المستهدف. عطّل الأداة أو أعد تشغيل التطبيق بشكل عادي فيعود إلى حالة نظيفة.", de: "Keine Dateien der Ziel-App werden gepatcht. Tool deaktivieren oder App normal neu starten, und sie kehrt in einen sauberen Zustand zurück." } },
      { title: { en: "Bundled Vazirmatn font", fa: "فونت Vazirmatn همراه", ar: "خط Vazirmatn مضمَّن", de: "Integrierte Vazirmatn-Schrift" }, body: { en: "The Vazirmatn font is applied to the chat surface only, improving readability of Persian and Arabic text.", fa: "فونت Vazirmatn فقط روی سطح چت اعمال می‌شود و خوانایی متن فارسی و عربی را بهتر می‌کند.", ar: "يُطبَّق خط Vazirmatn على سطح الدردشة فقط، مما يحسّن قراءة النص الفارسي والعربي.", de: "Die Vazirmatn-Schrift wird nur auf die Chat-Oberfläche angewendet und verbessert die Lesbarkeit persischer und arabischer Texte." } },
      { title: { en: "Privacy-first", fa: "حریم خصوصی در اولویت", ar: "الخصوصية أولاً", de: "Datenschutz zuerst" }, body: { en: "No telemetry, no analytics, no account, no API keys. The only connection is local loopback (127.0.0.1) to the target app, and logs hold safe metadata — never chat text.", fa: "بدون telemetry، بدون آنالیتیکس، بدون حساب کاربری، بدون API key. تنها اتصال، loopback محلی (127.0.0.1) به اپ هدف است و لاگ‌ها فقط متادیتای امن دارند — نه متن چت.", ar: "لا telemetry ولا تحليلات ولا حساب ولا مفاتيح API. الاتصال الوحيد هو الاسترجاع المحلي (127.0.0.1) إلى التطبيق المستهدف، والسجلات تحوي بيانات وصفية آمنة فقط — لا نص دردشة أبداً.", de: "Keine Telemetrie, keine Analytik, kein Konto, keine API-Schlüssel. Die einzige Verbindung ist lokales Loopback (127.0.0.1) zur Ziel-App, und Logs enthalten nur sichere Metadaten — niemals Chat-Text." } },
      { title: { en: "Consent-based relaunch", fa: "ری‌استارت با اجازه کاربر", ar: "إعادة تشغيل بموافقة المستخدم", de: "Neustart mit Zustimmung" }, body: { en: "When a supported app runs without a debug port, the tray offers a one-click, user-consented \"Relaunch with RTL Fix\" bound to a random free loopback port.", fa: "وقتی اپ پشتیبانی‌شده بدون پورت دیباگ اجرا می‌شود، tray یک گزینه یک‌کلیکی و با اجازه کاربر «Relaunch with RTL Fix» ارائه می‌دهد که به یک پورت آزاد تصادفی روی loopback بسته می‌شود.", ar: "عندما يعمل تطبيق مدعوم دون منفذ تصحيح، يقدّم شريط المهام خيار \"إعادة التشغيل مع إصلاح RTL\" بنقرة واحدة وبموافقة المستخدم، مرتبطاً بمنفذ استرجاع حر عشوائي.", de: "Läuft eine unterstützte App ohne Debug-Port, bietet das Tray einen Ein-Klick-Neustart „Relaunch with RTL Fix\" mit Nutzerzustimmung, gebunden an einen zufälligen freien Loopback-Port." } }
    ],
    editions: [
      { title: { en: "Windows installer", fa: "نصب‌کننده ویندوز", ar: "مثبت ويندوز", de: "Windows-Installer" }, body: { en: "Recommended. Installs to Program Files, adds a Start Menu shortcut and an uninstaller, and never forces \"Start with Windows\".", fa: "پیشنهادی. در Program Files نصب می‌شود، شورت‌کات Start Menu و حذف‌کننده اضافه می‌کند و هرگز «Start with Windows» را اجباری نمی‌کند.", ar: "موصى به. يُثبَّت في Program Files، ويضيف اختصاراً في قائمة ابدأ وأداة إلغاء تثبيت، ولا يفرض أبداً \"البدء مع Windows\".", de: "Empfohlen. Installiert nach Programme, fügt eine Startmenü-Verknüpfung und einen Deinstallierer hinzu und erzwingt nie „Mit Windows starten\"." } },
      { title: { en: "Portable — self-contained", fa: "پرتابل — خودکفا", ar: "محمول — مكتفٍ ذاتياً", de: "Portabel — self-contained" }, body: { en: "A win-x64 build that bundles .NET 8, so it runs with no prerequisites and no installation.", fa: "یک بیلد win-x64 که .NET 8 را همراه دارد؛ بدون هیچ پیش‌نیاز و بدون نصب اجرا می‌شود.", ar: "بناء win-x64 يتضمّن .NET 8، فيعمل دون متطلبات مسبقة ودون تثبيت.", de: "Ein win-x64-Build mit gebündeltem .NET 8, läuft ohne Voraussetzungen und ohne Installation." } },
      { title: { en: "Portable — framework-dependent", fa: "پرتابل — وابسته به فریم‌ورک", ar: "محمول — يعتمد على إطار العمل", de: "Portabel — framework-abhängig" }, body: { en: "A small build that needs the .NET 8 Desktop Runtime already installed.", fa: "یک بیلد کوچک که به نصب‌بودن .NET 8 Desktop Runtime نیاز دارد.", ar: "بناء صغير يحتاج إلى تثبيت .NET 8 Desktop Runtime مسبقاً.", de: "Ein kleiner Build, der die bereits installierte .NET 8 Desktop Runtime benötigt." } }
    ],
    steps: [
      { title: { en: "Detect a supported app", fa: "شناسایی اپ پشتیبانی‌شده", ar: "اكتشاف تطبيق مدعوم", de: "Unterstützte App erkennen" }, body: { en: "The tray watches for known desktop AI chat apps such as Claude Desktop and ChatGPT Desktop.", fa: "tray مراقب اپ‌های شناخته‌شده دسکتاپ چت هوش مصنوعی مثل Claude Desktop و ChatGPT Desktop است.", ar: "يراقب شريط المهام تطبيقات دردشة الذكاء الاصطناعي المعروفة مثل Claude Desktop و ChatGPT Desktop.", de: "Das Tray achtet auf bekannte Desktop-KI-Chat-Apps wie Claude Desktop und ChatGPT Desktop." } },
      { title: { en: "Relaunch with consent", fa: "ری‌استارت با اجازه", ar: "إعادة التشغيل بموافقة", de: "Neustart mit Zustimmung" }, body: { en: "For Electron apps it uses the Chrome DevTools Protocol over 127.0.0.1 and, if needed, offers a one-click relaunch on a random free debug port.", fa: "برای اپ‌های Electron از Chrome DevTools Protocol روی 127.0.0.1 استفاده می‌کند و در صورت نیاز، ری‌استارت یک‌کلیکی روی یک پورت دیباگ آزاد تصادفی پیشنهاد می‌دهد.", ar: "لتطبيقات Electron يستخدم بروتوكول Chrome DevTools عبر 127.0.0.1، وعند الحاجة يقدّم إعادة تشغيل بنقرة واحدة على منفذ تصحيح حر عشوائي.", de: "Für Electron-Apps nutzt es das Chrome DevTools Protocol über 127.0.0.1 und bietet bei Bedarf einen Ein-Klick-Neustart auf einem zufälligen freien Debug-Port." } },
      { title: { en: "Inject scoped RTL", fa: "تزریق RTL محدود", ar: "حقن RTL محدود النطاق", de: "Begrenztes RTL einfügen" }, body: { en: "It injects scoped CSS, the Vazirmatn font, and a runtime script that classifies each chat block and sets the correct direction.", fa: "CSS محدود، فونت Vazirmatn و یک اسکریپت زمان‌اجرا تزریق می‌کند که هر بلوک چت را دسته‌بندی و جهت درست را تعیین می‌کند.", ar: "يحقن CSS محدود النطاق وخط Vazirmatn وسكربت وقت تشغيل يصنّف كل كتلة دردشة ويضبط الاتجاه الصحيح.", de: "Es fügt begrenztes CSS, die Vazirmatn-Schrift und ein Laufzeitskript ein, das jeden Chat-Block klassifiziert und die richtige Richtung setzt." } },
      { title: { en: "Revert anytime", fa: "برگشت در هر لحظه", ar: "التراجع في أي وقت", de: "Jederzeit zurücksetzen" }, body: { en: "Because it is runtime-only, disabling the tool or restarting the app normally always returns it to a clean, unmodified state.", fa: "چون فقط در زمان اجراست، غیرفعال‌کردن ابزار یا ری‌استارت عادی اپ همیشه آن را به حالت تمیز و بدون تغییر برمی‌گرداند.", ar: "لأنها تعمل وقت التشغيل فقط، فإن تعطيل الأداة أو إعادة تشغيل التطبيق بشكل عادي يعيده دائماً إلى حالة نظيفة غير معدَّلة.", de: "Da es nur zur Laufzeit arbeitet, kehrt die App durch Deaktivieren des Tools oder einen normalen Neustart immer in einen sauberen, unveränderten Zustand zurück." } }
    ],
    downloads: [{ label: { en: "Download latest", fa: "دانلود آخرین نسخه", ar: "تحميل الأحدث", de: "Neueste Version" }, url: "https://github.com/miladateight/AI.Chat.RTL.Fixer/releases/latest", primary: true },
                { label: { en: "Source code", fa: "سورس کد", ar: "الكود المصدري", de: "Quellcode" }, url: "https://github.com/miladateight/AI.Chat.RTL.Fixer", primary: false }]
  },
  veyna: {
    hero: {
      en: "Private connectivity. Protected profiles.",
      fa: "اتصال خصوصی. پروفایل محافظت‌شده.",
      ar: "اتصال خاص. ملفات محمية.",
      de: "Private Verbindung. Geschützte Profile."
    },
    lead: {
      en: "A privacy-focused Windows Xray client for standard imports, protected profiles, and Smart, System Proxy, or TUN modes.",
      fa: "کلاینت Xray ویندوز با تمرکز بر حریم خصوصی، برای ورودی‌های استاندارد، پروفایل‌های محافظت‌شده و حالت‌های Smart، System Proxy و TUN.",
      ar: "عميل Xray لنظام Windows يركز على الخصوصية، للاستيراد القياسي والملفات المحمية وأوضاع Smart وSystem Proxy وTUN.",
      de: "Ein datenschutzorientierter Windows-Xray-Client für Standardimporte, geschützte Profile sowie Smart-, System-Proxy- und TUN-Modi."
    },
    problem: {
      en: "Xray users often manage several link formats, subscriptions, routing modes, and DNS choices across tools that can expose the original configuration when a profile is shared.",
      fa: "کاربران Xray معمولاً چند نوع لینک، اشتراک، حالت مسیریابی و انتخاب DNS را بین ابزارهای مختلف مدیریت می‌کنند؛ ابزارهایی که ممکن است هنگام اشتراک‌گذاری، تنظیمات اصلی پروفایل را آشکار کنند.",
      ar: "غالباً يدير مستخدمو Xray صيغ روابط واشتراكات وأوضاع توجيه وخيارات DNS متعددة عبر أدوات قد تكشف الإعداد الأصلي عند مشاركة ملف التعريف.",
      de: "Xray-Nutzer verwalten häufig mehrere Linkformate, Abonnements, Routing-Modi und DNS-Optionen in verschiedenen Tools, die beim Teilen die ursprüngliche Konfiguration offenlegen können."
    },
    solution: {
      en: "VEYNA brings standard and protected profile workflows into one client. Locked imports stay opaque, while connection mode, node, DNS, and LAN-bypass controls remain clear and reversible.",
      fa: "VEYNA جریان کار پروفایل‌های استاندارد و محافظت‌شده را در یک کلاینت جمع می‌کند. ورودی‌های قفل‌شده پنهان می‌مانند و انتخاب حالت اتصال، نود، DNS و LAN bypass روشن و قابل بازگشت است.",
      ar: "يجمع VEYNA مسارات عمل الملفات القياسية والمحمية في عميل واحد. تبقى الواردات المقفلة مبهمة، بينما تظل عناصر وضع الاتصال والعقدة وDNS وتجاوز LAN واضحة وقابلة للتراجع.",
      de: "VEYNA vereint Standard- und geschützte Profilabläufe in einem Client. Gesperrte Importe bleiben verborgen, während Verbindungsmodus, Knoten, DNS und LAN-Bypass klar und reversibel steuerbar sind."
    },
    features: [
      { title: { en: "Flexible imports", fa: "ورودی‌های انعطاف‌پذیر", ar: "استيراد مرن", de: "Flexible Importe" }, body: { en: "Imports VLESS, VMess, Trojan, Shadowsocks, and SOCKS5 links, plus plain, mixed, or base64 subscriptions and Xray JSON.", fa: "لینک‌های VLESS، VMess، Trojan، Shadowsocks و SOCKS5 را همراه اشتراک‌های ساده، ترکیبی یا base64 و Xray JSON وارد می‌کند.", ar: "يستورد روابط VLESS وVMess وTrojan وShadowsocks وSOCKS5، إضافة إلى الاشتراكات العادية أو المختلطة أو base64 وXray JSON.", de: "Importiert VLESS-, VMess-, Trojan-, Shadowsocks- und SOCKS5-Links sowie einfache, gemischte oder Base64-Abonnements und Xray JSON." } },
      { title: { en: "Protected profiles", fa: "پروفایل‌های محافظت‌شده", ar: "ملفات محمية", de: "Geschützte Profile" }, body: { en: "Lock Studio creates opaque VEYNA links. Imported locked profiles never reveal or share their original source configuration.", fa: "Lock Studio لینک‌های پنهان VEYNA می‌سازد. پروفایل‌های قفل‌شده واردشده هرگز تنظیمات منبع اصلی را نمایش یا اشتراک‌گذاری نمی‌کنند.", ar: "ينشئ Lock Studio روابط VEYNA مبهمة. ولا تكشف الملفات المقفلة المستوردة إعداد المصدر الأصلي أو تشاركه أبداً.", de: "Lock Studio erstellt undurchsichtige VEYNA-Links. Importierte gesperrte Profile zeigen oder teilen ihre ursprüngliche Konfiguration nie." } },
      { title: { en: "Three connection modes", fa: "سه حالت اتصال", ar: "ثلاثة أوضاع اتصال", de: "Drei Verbindungsmodi" }, body: { en: "Choose Smart mode, Windows System Proxy, or a Wintun-powered TUN connection according to the traffic and application.", fa: "بر اساس ترافیک و برنامه، حالت Smart، پراکسی سیستمی ویندوز یا اتصال TUN مبتنی بر Wintun را انتخاب کنید.", ar: "اختر وضع Smart أو وكيل نظام Windows أو اتصال TUN المعتمد على Wintun وفقاً لحركة المرور والتطبيق.", de: "Je nach Datenverkehr und Anwendung stehen Smart-Modus, Windows-Systemproxy oder eine Wintun-basierte TUN-Verbindung zur Wahl." } },
      { title: { en: "Routing and DNS control", fa: "کنترل مسیریابی و DNS", ar: "التحكم في التوجيه وDNS", de: "Routing- und DNS-Steuerung" }, body: { en: "Selectable DNS and LAN-bypass policies make the active route explicit, while normal shutdown restores proxy, route, and DNS changes.", fa: "DNS قابل انتخاب و سیاست‌های LAN bypass مسیر فعال را روشن می‌کنند و توقف عادی، تغییرات پراکسی، route و DNS را برمی‌گرداند.", ar: "تجعل خيارات DNS وسياسات تجاوز LAN المسار النشط واضحاً، بينما يعيد الإيقاف العادي تغييرات الوكيل والمسار وDNS.", de: "Wählbare DNS- und LAN-Bypass-Regeln machen die aktive Route transparent. Beim normalen Beenden werden Proxy-, Routing- und DNS-Änderungen zurückgesetzt." } },
      { title: { en: "English and Persian", fa: "انگلیسی و فارسی", ar: "الإنجليزية والفارسية", de: "Englisch und Persisch" }, body: { en: "The interface includes complete English and Persian localization, right-to-left layout support, and consistent light and dark themes.", fa: "رابط کاربری دارای ترجمه کامل انگلیسی و فارسی، پشتیبانی از چیدمان راست‌به‌چپ و تم‌های روشن و تیره یکپارچه است.", ar: "تتضمن الواجهة تعريباً كاملاً بالإنجليزية والفارسية، ودعم التخطيط من اليمين إلى اليسار، وسمات فاتحة وداكنة متناسقة.", de: "Die Oberfläche bietet vollständige englische und persische Lokalisierung, Rechts-nach-links-Unterstützung sowie konsistente helle und dunkle Designs." } },
      { title: { en: "Desktop integration", fa: "یکپارچگی با دسکتاپ", ar: "تكامل سطح المكتب", de: "Desktop-Integration" }, body: { en: "Tray controls, single-instance handling, installer cleanup, and coordinated Core shutdown keep the Windows experience predictable.", fa: "کنترل‌های tray، اجرای تک‌نمونه، پاک‌سازی نصب‌کننده و توقف هماهنگ Core تجربه ویندوز را قابل پیش‌بینی نگه می‌دارند.", ar: "تحافظ عناصر شريط المهام وتشغيل نسخة واحدة وتنظيف المثبت والإيقاف المنسق للنواة على تجربة Windows مستقرة.", de: "Tray-Steuerung, Einzelinstanz-Verhalten, Installer-Bereinigung und koordiniertes Core-Herunterfahren sorgen für eine verlässliche Windows-Nutzung." } }
    ],
    steps: [
      { title: { en: "Import a profile", fa: "واردکردن پروفایل", ar: "استيراد ملف", de: "Profil importieren" }, body: { en: "Paste a supported link, add a subscription URL, import a subscription payload, or load Xray JSON.", fa: "یک لینک پشتیبانی‌شده، URL اشتراک، محتوای اشتراک یا Xray JSON را وارد کنید.", ar: "ألصق رابطاً مدعوماً أو أضف رابط اشتراك أو استورد محتوى اشتراك أو حمّل Xray JSON.", de: "Einen unterstützten Link, eine Abo-URL, einen Abo-Inhalt oder Xray JSON importieren." } },
      { title: { en: "Choose profile and node", fa: "انتخاب پروفایل و نود", ar: "اختيار الملف والعقدة", de: "Profil und Knoten wählen" }, body: { en: "Review standard profile details when available, then select the profile and node that should carry the connection.", fa: "در صورت امکان جزئیات پروفایل استاندارد را بررسی کنید، سپس پروفایل و نود اتصال را انتخاب کنید.", ar: "راجع تفاصيل الملف القياسي عند توفرها، ثم اختر الملف والعقدة اللذين سيحملان الاتصال.", de: "Verfügbare Standardprofildetails prüfen und anschließend Profil und Knoten für die Verbindung auswählen." } },
      { title: { en: "Set the route", fa: "تنظیم مسیر", ar: "ضبط المسار", de: "Route festlegen" }, body: { en: "Select Smart, System Proxy, or TUN mode, then choose the DNS and LAN-bypass policy that fits the session.", fa: "حالت Smart، System Proxy یا TUN را انتخاب کنید و سپس DNS و سیاست LAN bypass مناسب را تنظیم کنید.", ar: "اختر وضع Smart أوSystem Proxy أوTUN، ثم حدد سياسة DNS وتجاوز LAN المناسبة للجلسة.", de: "Smart-, System-Proxy- oder TUN-Modus und anschließend die passende DNS- und LAN-Bypass-Regel wählen." } },
      { title: { en: "Connect and restore", fa: "اتصال و بازگردانی", ar: "الاتصال والاستعادة", de: "Verbinden und zurücksetzen" }, body: { en: "Connect from Home or Profiles. When the session stops normally, VEYNA restores the proxy, route, and DNS changes it made.", fa: "از Home یا Profiles متصل شوید. با توقف عادی نشست، VEYNA تغییرات پراکسی، route و DNS را بازمی‌گرداند.", ar: "اتصل من Home أوProfiles. وعند توقف الجلسة بشكل عادي، يعيد VEYNA تغييرات الوكيل والمسار وDNS التي أجراها.", de: "Über Home oder Profiles verbinden. Beim normalen Sitzungsende setzt VEYNA seine Proxy-, Routing- und DNS-Änderungen zurück." } }
    ],
    downloads: [{ label: { en: "Download latest", fa: "دانلود آخرین نسخه", ar: "تحميل الأحدث", de: "Neueste Version" }, url: "https://github.com/miladateight/Veyna.App/releases/latest", primary: true },
                { label: { en: "Release notes", fa: "یادداشت انتشار", ar: "ملاحظات الإصدار", de: "Versionshinweise" }, url: "https://github.com/miladateight/Veyna.App/blob/main/Windows/docs/RELEASE_NOTES_0.8.0.md", primary: false },
                { label: { en: "Source code", fa: "سورس کد", ar: "الكود المصدري", de: "Quellcode" }, url: "https://github.com/miladateight/Veyna.App", primary: false }]
  }
};

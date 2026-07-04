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
    downloads: [{ label: { en: "Download v0.4.0", fa: "دانلود v0.4.0", ar: "تحميل v0.4.0", de: "Download v0.4.0" }, url: "https://github.com/miladateight/KeyFix/releases/download/v0.4.0/KeyFixSetup-0.4.0.exe", primary: true },
                { label: { en: "Release notes", fa: "یادداشت انتشار", ar: "ملاحظات الإصدار", de: "Release Notes" }, url: "https://github.com/miladateight/KeyFix/releases/tag/v0.4.0", primary: false },
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
      { src: "/projects/netdoctor/start.png", caption: { en: "Problem picker — start from the symptom", fa: "انتخاب مشکل — شروع از علامتی که می‌بینید", ar: "منتقي المشكلة — البدء من العارض", de: "Problemauswahl — Start beim Symptom" } },
      { src: "/projects/netdoctor/dashboard.png", caption: { en: "Diagnosis dashboard — verdict, checks, safe fixes", fa: "داشبورد تشخیص — نتیجه، بررسی‌ها، ترمیم‌های امن", ar: "لوحة التشخيص — الحكم والفحوصات والإصلاحات الآمنة", de: "Diagnose-Dashboard — Urteil, Prüfungen, sichere Reparaturen" } }
    ],
    steps: [
      { title: { en: "Run a scan", fa: "اجرای اسکن", ar: "تشغيل الفحص", de: "Scan ausführen" }, body: { en: "NetDoctor runs a comprehensive diagnostics scan covering DNS, ping, traceroute, and proxy.", fa: "NetDoctor یک اسکن تشخیصی جامع شامل DNS، پینگ، traceroute و proxy اجرا می‌کند.", ar: "يجري NetDoctor فحصاً تشخيصياً شاملاً يغطي DNS و ping و traceroute و proxy.", de: "NetDoctor führt einen umfassenden Diagnosescan durch, der DNS, Ping, Traceroute und Proxy abdeckt." } },
      { title: { en: "Review results", fa: "بررسی نتایج", ar: "مراجعة النتائج", de: "Ergebnisse prüfen" }, body: { en: "Issues are categorized with clear severity levels and explanations.", fa: "مشکلات با سطوح شدت و توضیحات واضح دسته‌بندی می‌شوند.", ar: "تصنف المشاكل بمستويات شدة وشروحات واضحة.", de: "Probleme werden mit klaren Schweregraden und Erklärungen kategorisiert." } },
      { title: { en: "Apply a fix", fa: "اعمال ترمیم", ar: "تطبيق الإصلاح", de: "Reparatur anwenden" }, body: { en: "Select a repair and follow the guided steps. Each step can be reviewed before applying.", fa: "یک ترمیم انتخاب کنید و مراحل هدایت‌شده را دنبال کنید. هر مرحله قبل از اعمال قابل بررسی است.", ar: "اختر إصلاحاً واتبع الخطوات الموجَّهة. كل خطوة قابلة للمراجعة قبل التطبيق.", de: "Wähle eine Reparatur und folge den geführten Schritten. Jeder Schritt kann vor der Anwendung überprüft werden." } },
      { title: { en: "Revert if needed", fa: "بازگشت در صورت نیاز", ar: "التراجع إذا لزم الأمر", de: "Rückgängig machen bei Bedarf" }, body: { en: "Every repair is logged and reversible from the app's history panel.", fa: "هر ترمیم ثبت شده و از پنل تاریخچه برنامه قابل بازگشت است.", ar: "كل إصلاح مسجل وقابل للتراجع من لوحة تاريخ التطبيق.", de: "Jede Reparatur wird protokolliert und kann über das Verlaufsfeld der App rückgängig gemacht werden." } }
    ],
    downloads: [{ label: { en: "Get a license on Telegram", fa: "دریافت لایسنس در تلگرام", ar: "الحصول على ترخيص عبر Telegram", de: "Lizenz über Telegram erhalten" }, url: "https://t.me/MiladAteight", primary: true },
                { label: { en: "Download latest", fa: "دانلود آخرین نسخه", ar: "تحميل الأحدث", de: "Neueste Version" }, url: "https://github.com/miladateight/NetDoctor/releases", primary: false },
                { label: { en: "Source code", fa: "سورس کد", ar: "الكود المصدري", de: "Quellcode" }, url: "https://github.com/miladateight/NetDoctor", primary: false }]
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
  }
};

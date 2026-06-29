---
title: Production checklist for launch
product: vercel
url: /docs/production-checklist
canonical_url: "https://vercel.com/docs/production-checklist"
last_updated: 2026-06-16
type: reference
prerequisites:
  []
related:
  - /docs/instant-rollback
  - /docs/deployments/managing-deployments
  - /docs/monorepos/turborepo
  - /docs/headers/security-headers
  - /docs/conformance/rules/NEXTJS_MISSING_SECURITY_HEADERS
summary: Ensure your application is ready for launch with this comprehensive production checklist by the Vercel engineering team. Covering operational...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/production-checklist.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "86f561d751aed385806a7bf5b3b0aeba7f4180391b18c96e364b7812123ca7bb"
---

# Production checklist for launch

When launching your application on Vercel, it is important to ensure that it's ready for production. This checklist is prepared by the Vercel engineering team and designed to help you prepare your application for launch by running through a series of questions to ensure:

- [Operational excellence](#operational-excellence)
- [Security](#security)
- [Reliability](#reliability)
- [Performance efficiency](#performance)
- [Cost optimization](#cost-optimization).

## Operational excellence

- Define an incident response plan for your team, including [escalation paths](/help#issues), [communication channels](https://www.vercel-status.com), and [rollback strategies](/docs/instant-rollback) for deployments
- Familiarize yourself with how to [stage, promote and rollback](/docs/deployments/managing-deployments) deployments
- Ensure [caching](/docs/monorepos/turborepo) is configured if deploying using a monorepo to prevent unnecessary builds
- Perform a zero downtime migration to [Vercel DNS](/kb/guide/zero-downtime-migration-for-dns)

## Security

- Implement a [Content Security Policy](/docs/headers/security-headers) (CSP) and proper [security headers](/docs/conformance/rules/NEXTJS_MISSING_SECURITY_HEADERS)
- Enable [Deployment Protection](/docs/deployment-protection) to prevent unauthorized access to your deployments
- Configure the [Vercel Web Application Firewall (WAF)](/docs/security/vercel-waf) to monitor, block, and challenge incoming traffic. This includes setting up [custom rules](/docs/security/vercel-waf/custom-rules), [IP blocking](/docs/security/vercel-waf/ip-blocking), and enabling [managed rulesets](/docs/security/vercel-waf/managed-rulesets) for enhanced security
- Enable [Log Drains](/docs/drains) to persist logs from your deployments
- Review common [SSL certificate issues](/docs/domains/troubleshooting#common-ssl-certificate-issues)
- Enable a [Preview Deployment Suffix](/docs/deployments/generated-urls#preview-deployment-suffix) to use a [custom domain](/docs/domains/add-a-domain) for Preview Deployments
- Commit your [lockfiles](/docs/package-managers) to pin dependencies and speed up builds through caching
- Consider implementing [rate limiting](/docs/vercel-firewall/vercel-waf/rate-limiting) to prevent abuse
- Review and implement [access roles](/docs/rbac/access-roles) to ensure the correct permissions are set for your team members
- Enable [SAML SSO](/docs/saml) *([Pro](/docs/plans/pro-plan) add-on or [Enterprise](/docs/plans/enterprise) plans with [Owner](/docs/rbac/access-roles#owner-role) role only)*
- Enable [SCIM](/docs/saml#managing-team-members) *([Enterprise](/docs/plans/enterprise) plans with [Owner](/docs/rbac/access-roles#owner-role) role only)*
- Enable [Audit Logs](/docs/observability/audit-log) to track and analyze team member activity *([Enterprise](/docs/plans/enterprise) plans with [Owner](/docs/rbac/access-roles#owner-role) role only)*
- Ensure that cookies comply with the [allowed cookie policy](/docs/conformance/rules/SET_COOKIE_VALIDATION) to enhance security. *([Enterprise](/docs/plans/enterprise) plans with [Owner](/docs/rbac/access-roles#owner-role) role only)*
- Setup a firewall rule to [block requests from unwanted bots](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall%2Fconfigure%2Frule%2Fnew%3Ftemplate%3D%257B%2522name%2522%253A%2522Detect%2BBad%2BBots%2522%252C%2522active%2522%253Atrue%252C%2522description%2522%253A%2522%2522%252C%2522action%2522%253A%257B%2522mitigate%2522%253A%257B%2522redirect%2522%253Anull%252C%2522action%2522%253A%2522log%2522%252C%2522rateLimit%2522%253Anull%252C%2522actionDuration%2522%253Anull%257D%257D%252C%2522id%2522%253A%2522%2522%252C%2522conditionGroup%2522%253A%255B%257B%2522conditions%2522%253A%255B%257B%2522type%2522%253A%2522user_agent%2522%252C%2522op%2522%253A%2522re%2522%252C%2522value%2522%253A%252201h4x.com%257C360Spider%257C404checker%257C404enemy%257C80legs%257CADmantX%257CAIBOT%257CALittle%2BClient%257CASPSeek%257CAbonti%257CAboundex%257CAboundexbot%257CAcunetix%257CAdsTxtCrawlerTP%257CAfD-Verbotsverfahren%257CAhrefsBot%257CAiHitBot%257CAipbot%257CAlexibot%257CAllSubmitter%257CAlligator%257CAlphaBot%257CAnarchie%257CAnarchy%257CAnarchy99%257CAnkit%257CAnthill%257CApexoo%257CAspiegel%257CAsterias%257CAtomseobot%257CAttach%257CAwarioBot%257CAwarioRssBot%257CAwarioSmartBot%257CBBBike%257CBDCbot%257CBDFetch%257CBLEXBot%257CBackDoorBot%257CBackStreet%257CBackWeb%257CBacklink-Ceck%257CBacklinkCrawler%257CBacklinksExtendedBot%257CBadass%257CBandit%257CBarkrowler%257CBatchFTP%257CBattleztar%2BBazinga%257CBetaBot%257CBigfoot%257CBitacle%257CBlackWidow%257CBlack%2BHole%257CBlackboard%257CBlow%257CBlowFish%257CBoardreader%257CBolt%257CBotALot%257CBrandprotect%257CBrandwatch%257CBuck%257CBuddy%257CBuiltBotTough%257CBuiltWith%257CBullseye%257CBunnySlippers%257CBuzzSumo%257CBytespider%257CCATExplorador%257CCCBot%257CCODE87%257CCSHttp%257CCalculon%257CCazoodleBot%257CCegbfeieh%257CCensysInspect%257CChatGPT-User%257CCheTeam%257CCheeseBot%257CCherryPicker%257CChinaClaw%257CChlooe%257CCitoid%257CClaritybot%257CClaudeBot%257CCliqzbot%257CCloud%2Bmapping%257CCocolyzebot%257CCogentbot%257CCollector%257CCopier%257CCopyRightCheck%257CCopyscape%257CCosmos%257CCraftbot%257CCrawling%2Bat%2BHome%2BProject%257CCrazyWebCrawler%257CCrescent%257CCrunchBot%257CCurious%257CCusto%257CCyotekWebCopy%257CDBLBot%257CDIIbot%257CDSearch%257CDTS%2BAgent%257CDataCha0s%257CDatabaseDriverMysqli%257CDemon%257CDeusu%257CDevil%257CDigincore%257CDigitalPebble%257CDirbuster%257CDisco%257CDiscobot%257CDiscoverybot%257CDispatch%257CDittoSpyder%257CDnBCrawler-Analytics%257CDnyzBot%257CDomCopBot%257CDomainAppender%257CDomainCrawler%257CDomainSigmaCrawler%257CDomainStatsBot%257CDomains%2BProject%257CDotbot%257CDownload%2BWonder%257CDragonfly%257CDrip%257CECCP%252F1.0%257CEMail%2BSiphon%257CEMail%2BWolf%257CEasyDL%257CEbingbong%257CEcxi%257CEirGrabber%257CEroCrawler%257CEvil%257CExabot%257CExpress%2BWebPictures%257CExtLinksBot%257CExtractor%257CExtractorPro%257CExtreme%2BPicture%2BFinder%257CEyeNetIE%257CEzooms%257CFDM%257CFHscan%257CFacebookBot%257CFemtosearchBot%257CFimap%257CFirefox%252F7.0%257CFlashGet%257CFlunky%257CFoobot%257CFreeuploader%257CFrontPage%257CFuzz%257CFyberSpider%257CFyrebot%257CG-i-g-a-b-o-t%257CGPTBot%257CGT%253A%253AWWW%257CGalaxyBot%257CGenieo%257CGermCrawler%257CGetRight%257CGetWeb%257CGetintent%257CGigabot%257CGo%2521Zilla%257CGo-Ahead-Got-It%257CGoZilla%257CGotit%257CGrabNet%257CGrabber%257CGrafula%257CGrapeFX%257CGrapeshotCrawler%257CGridBot%257CHEADMasterSEO%257CHMView%257CHTMLparser%257CHTTP%253A%253ALite%257CHTTrack%257CHaansoft%257CHaosouSpider%257CHarvest%257CHavij%257CHeritrix%257CHloader%257CHonoluluBot%257CHumanlinks%257CHybridBot%257CIDBTE4M%257CIDBot%257CIRLbot%257CIblog%257CId-search%257CIlseBot%257CImage%2BFetch%257CImage%2BSucker%257CImagesiftBot%257CIndeedBot%257CIndy%2BLibrary%257CInfoNaviRobot%257CInfoTekies%257CInformation%2BSecurity%2BTeam%2BInfraSec%2BScanner%257CInfraSec%2BScanner%257CIntelliseek%257CInterGET%257CInternetMeasurement%257CInternetSeer%257CInternet%2BNinja%257CIria%257CIskanie%257CIstellaBot%257CJOC%2BWeb%2BSpider%257CJamesBOT%257CJbrofuzz%257CJennyBot%257CJetCar%257CJetty%257CJikeSpider%257CJoomla%257CJorgee%257CJustView%257CJyxobot%257CKenjin%2BSpider%257CKeybot%2BTranslation-Search-Machine%257CKeyword%2BDensity%257CKinza%257CKozmosbot%257CLNSpiderguy%257CLWP%253A%253ASimple%257CLanshanbot%257CLarbin%257CLeap%257CLeechFTP%257CLeechGet%257CLexiBot%257CLftp%257CLibWeb%257CLibwhisker%257CLieBaoFast%257CLightspeedsystems%257CLikse%257CLinkScan%257CLinkWalker%257CLinkbot%257CLinkextractorPro%257CLinkpadBot%257CLinksManager%257CLinqiaMetadataDownloaderBot%257CLinqiaRSSBot%257CLinqiaScrapeBot%257CLipperhey%257CLipperhey%2BSpider%257CLitemage_walker%257CLmspider%257CLtx71%257CMFC_Tear_Sample%257CMIDown%2Btool%257CMIIxpc%257CMJ12bot%257CMQQBrowser%257CMSFrontPage%257CMSIECrawler%257CMTRobot%257CMag-Net%257CMagnet%257CMail.RU_Bot%257CMajestic-SEO%257CMajestic12%257CMajestic%2BSEO%257CMarkMonitor%257CMarkWatch%257CMass%2BDownloader%257CMasscan%257CMata%2BHari%257CMauiBot%257CMb2345Browser%257CMeanPath%2BBot%257CMeanpathbot%257CMediatoolkitbot%257CMegaIndex.ru%257CMetauri%257CMicroMessenger%257CMicrosoft%2BData%2BAccess%257CMicrosoft%2BURL%2BControl%257CMinefield%257CMister%2BPiX%257CMoblie%2BSafari%257CMojeek%257CMojolicious%257CMolokaiBot%257CMorfeus%2BFucking%2BScanner%257CMozlila%257CMr.4x3%257CMsrabot%257CMusobot%257CNICErsPRO%257CNPbot%257CName%2BIntelligence%257CNameprotect%257CNavroad%257CNearSite%257CNeedle%257CNessus%257CNetAnts%257CNetLyzer%257CNetMechanic%257CNetSpider%257CNetZIP%257CNet%2BVampire%257CNetcraft%257CNettrack%257CNetvibes%257CNextGenSearchBot%257CNibbler%257CNiki-bot%257CNikto%257CNimbleCrawler%257CNimbostratus%257CNinja%257CNmap%257CNuclei%257CNutch%257COctopus%257COffline%2BExplorer%257COffline%2BNavigator%257COnCrawl%257COpenLinkProfiler%257COpenVAS%257COpenfind%257COpenvas%257COrangeBot%257COrangeSpider%257COutclicksBot%257COutfoxBot%257CPECL%253A%253AHTTP%257CPHPCrawl%257CPOE-Component-Client-HTTP%257CPageAnalyzer%257CPageGrabber%257CPageScorer%257CPageThing.com%257CPage%2BAnalyzer%257CPandalytics%257CPanscient%257CPapa%2BFoto%257CPavuk%257CPeoplePal%257CPetalbot%257CPi-Monster%257CPicscout%257CPicsearch%257CPictureFinder%257CPiepmatz%257CPimonster%257CPixray%257CPleaseCrawl%257CPockey%257CProPowerBot%257CProWebWalker%257CProbethenet%257CProximic%257CPsbot%257CPu_iN%257CPump%257CPxBroker%257CPyCurl%257CQueryN%2BMetasearch%257CQuick-Crawler%257CRSSingBot%257CRainbot%257CRankActive%257CRankActiveLinkBot%257CRankFlex%257CRankingBot%257CRankingBot2%257CRankivabot%257CRankurBot%257CRe-re%257CReGet%257CRealDownload%257CReaper%257CRebelMouse%257CRecorder%257CRedesScrapy%257CRepoMonkey%257CRipper%257CRocketCrawler%257CRogerbot%257CSBIder%257CSEOkicks%257CSEOkicks-Robot%257CSEOlyt%257CSEOlyticsCrawler%257CSEOprofiler%257CSEOstats%257CSISTRIX%257CSMTBot%257CSalesIntelligent%257CScanAlert%257CScanbot%257CScoutJet%257CScrapy%257CScreaming%257CScreenerBot%257CScrepyBot%257CSearchestate%257CSearchmetricsBot%257CSeekport%257CSeekportBot%257CSemanticJuice%257CSemrush%257CSemrushBot%257CSentiBot%257CSenutoBot%257CSeoSiteCheckup%257CSeobilityBot%257CSeomoz%257CShodan%257CSiphon%257CSiteCheckerBotCrawler%257CSiteExplorer%257CSiteLockSpider%257CSiteSnagger%257CSiteSucker%257CSite%2BSucker%257CSitebeam%257CSiteimprove%257CSitevigil%257CSlySearch%257CSmartDownload%257CSnake%257CSnapbot%257CSnoopy%257CSocialRankIOBot%257CSociscraper%257CSogou%2Bweb%2Bspider%257CSosospider%257CSottopop%257CSpaceBison%257CSpammen%257CSpankBot%257CSpanner%257CSpbot%257CSpider_Bot%257CSpider_Bot%252F3.0%257CSpinn3r%257CSputnikBot%257CSqlmap%257CSqlworm%257CSqworm%257CSteeler%257CStripper%257CSucker%257CSucuri%257CSuperBot%257CSuperHTTP%257CSurfbot%257CSurveyBot%257CSuzuran%257CSwiftbot%257CSzukacz%257CT0PHackTeam%257CT8Abot%257CTeleport%257CTeleportPro%257CTelesoft%257CTelesphoreo%257CTelesphorep%257CTheNomad%257CThe%2BIntraformant%257CThumbor%257CTightTwatBot%257CTinyTestBot%257CTitan%257CToata%257CToweyabot%257CTracemyfile%257CTrendiction%257CTrendictionbot%257CTrue_Robot%257CTuringos%257CTurnitin%257CTurnitinBot%257CTwengaBot%257CTwice%257CTyphoeus%257CURLy.Warning%257CURLy%2BWarning%257CUnisterBot%257CUpflow%257CV-BOT%257CVB%2BProject%257CVCI%257CVacuum%257CVagabondo%257CVelenPublicWebCrawler%257CVeriCiteCrawler%257CVidibleScraper%257CVirusdie%257CVoidEYE%257CVoil%257CVoltron%257CWASALive-Bot%257CWBSearchBot%257CWEBDAV%257CWISENutbot%257CWPScan%257CWWW-Collector-E%257CWWW-Mechanize%257CWWW%253A%253AMechanize%257CWWWOFFLE%257CWallpapers%257CWallpapers%252F3.0%257CWallpapersHD%257CWeSEE%257CWebAuto%257CWebBandit%257CWebCollage%257CWebCopier%257CWebEnhancer%257CWebFetch%257CWebFuck%257CWebGo%2BIS%257CWebImageCollector%257CWebLeacher%257CWebPix%257CWebReaper%257CWebSauger%257CWebStripper%257CWebSucker%257CWebWhacker%257CWebZIP%257CWeb%2BAuto%257CWeb%2BCollage%257CWeb%2BEnhancer%257CWeb%2BFetch%257CWeb%2BFuck%257CWeb%2BPix%257CWeb%2BSauger%257CWeb%2BSucker%257CWebalta%257CWebmasterWorldForumBot%257CWebshag%257CWebsiteExtractor%257CWebsiteQuester%257CWebsite%2BQuester%257CWebster%257CWhack%257CWhacker%257CWhatweb%257CWho.is%2BBot%257CWidow%257CWinHTTrack%257CWiseGuys%2BRobot%257CWonderbot%257CWoobot%257CWotbox%257CWprecon%257CXaldon%2BWebSpider%257CXaldon_WebSpider%257CXenu%257CYaK%257CYoudaoBot%257CZade%257CZauba%257CZermelo%257CZeus%257CZitebot%257CZmEu%257CZoomBot%257CZoominfoBot%257CZumBot%257CZyBorg%257Cadscanner%257Canthropic-ai%257Carchive.org_bot%257Carquivo-web-crawler%257Carquivo.pt%257Cautoemailspider%257Cawario.com%257Cbacklink-check%257Ccah.io.community%257Ccheck1.exe%257Cclark-crawler%257Ccoccocbot%257Ccognitiveseo%257Ccohere-ai%257Ccom.plumanalytics%257Ccrawl.sogou.com%257Ccrawler.feedback%257Ccrawler4j%257Cdataforseo.com%257Cdataforseobot%257Cdemandbase-bot%257Cdomainsproject.org%257CeCatch%257Cevc-batch%257Cfacebookscraper%257Cgopher%257Cheritrix%257Cimagesift.com%257Cinstabid%257CinternetVista%2Bmonitor%257Cips-agent%257Cisitwp.com%257Ciubenda-radar%257Clinkdexbot%257Clinkfluence%257Clwp-request%257Clwp-trivial%257Cmagpie-crawler%257Cmeanpathbot%257Cmediawords%257Cmuhstik-scan%257CnetEstate%2BNE%2BCrawler%257CoBot%257Comgili%257Copenai%257Copenai.com%257Cpage%2Bscorer%257CpcBrowser%257Cplumanalytics%257Cpolaris%2Bversion%257Cprobe-image-size%257Cripz%257Cs1z.ru%257Csatoristudio.net%257Cscalaj-http%257Cscan.lol%257Cseobility%257Cseocompany.store%257Cseoscanners%257Cseostar%257Cserpstatbot%257Csexsearcher%257Csitechecker.pro%257Csiteripz%257Csogouspider%257Csp_auditbot%257Cspyfu%257Csysscan%257CtAkeOut%257Ctrendiction.com%257Ctrendiction.de%257Cubermetrics-technologies.com%257Cvoyagerx.com%257Cwebgains-bot%257Cwebmeup-crawler%257Cwebpros.com%257Cwebprosbot%257Cx09Mozilla%257Cx22Mozilla%257Cxpymep1.exe%257Czauba.io%257Czgrab%2522%257D%255D%257D%255D%257D%26sig%3Db0b8a83044ae2d1c72c9647a0c93b76bff3d8f8f\&title=Add+Firewall+Rule+from+Template) to your project deployment

## Reliability

- Enable [Observability Plus](/docs/observability/observability-plus) to debug and optimize performance, investigate errors, monitor traffic, and more *(Available on [Pro](/docs/plans/pro-plan) and [Enterprise](/docs/plans/enterprise) plans)*
- Enable [automatic Function failover](/docs/functions/configuring-functions/region#automatic-failover) to add multi-region redundancy and protect against regional outages *([Enterprise](/docs/plans/enterprise) plans only)*
- If using [Secure Compute](/docs/networking/secure-compute), enable a [passive failover region](/docs/networking/secure-compute#region-failover) to ensure continued operation during regional outages *([Enterprise](/docs/plans/enterprise) plans only)*
- Implement [caching headers](/docs/cdn-cache) for static assets or Function responses to reduce usage or origin requests
- Understand the differences between [caching headers and Incremental Static Regeneration](/docs/incremental-static-regeneration)
- Consider adding [Tracing](/docs/tracing) to instrument your application for distributed tracing
- Consider running a [load test](/kb/guide/what-s-vercel-s-policy-regarding-load-testing-deployments) on your application to stress your upstream services *([Enterprise](/docs/plans/enterprise) plans only)*

## Performance

- Enable [Speed Insights](/docs/speed-insights) for instant access to field performance data and [Core Web Vitals](/blog/how-core-web-vitals-affect-seo)
- Review your [Time To First Byte (TTFB)](/docs/speed-insights/metrics#time-to-first-byte-ttfb) to ensure your application is responding quickly
- Ensure you are using [Image Optimization](/docs/image-optimization) to reduce the size of your images
- Ensure you are using [Script Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/scripts) to optimize script loading performance
- Ensure you are using [Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to remove external network requests for improved privacy and performance
- Ensure your [Vercel Function](/docs/functions/configuring-functions/region) region is the same as your origin API or database
- Consider the *limitations* of placing a [third-party proxy](/docs/security/reverse-proxy) in front of Vercel, and notify your Vercel account representative ([Enterprise](/docs/plans/enterprise) customers) for guidance

## Cost optimization

- Enable [Fluid compute](/docs/fluid-compute) to reduce cold starts, optimize concurrency, and enhance function scalability
- Follow our [manage and optimize usage guides](/docs/pricing/manage-and-optimize-usage) to understand how to optimize your usage, and manage your costs
- Configure [Spend Management](/docs/spend-management) to manage your usage and [trigger alerts](/docs/spend-management#managing-alert-threshold-notifications) on usage changes
- Review or adjust the [maximum duration](/docs/functions/configuring-functions/duration), and [memory](/docs/functions/configuring-functions/memory) for your Vercel Functions
- Ensure [Incremental Static Regeneration](/docs/incremental-static-regeneration) (ISR) revalidation times are set appropriately to match content changes or move to [on-demand revalidation](/docs/incremental-static-regeneration/quickstart#on-demand-revalidation)
- For teams created before February 18th, 2025, [opt in to the new image optimization pricing](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fsettings%2Fbilling%23image-optimization-new-price\&title=Go+to+Billing+Settings) to ensure the lowest cost, and review [best practices](/docs/image-optimization/managing-image-optimization-costs).
- Move large media files such as GIFs and videos to [blob storage](/docs/storage/vercel-blob)

## Enterprise support

Need help with your production rollout?


---

[View full sitemap](/docs/sitemap)

-- Migrate data from embedded Keystone sqlite3 database to a new postgresql db
BEGIN TRANSACTION;
-- Add existing Bookmarks
-- id, url, label, description, keywords, created, modified
INSERT INTO "Bookmark"
    VALUES ('cktd7a1m70047w5977pa6qnr6', 'https://myvector.us.af.mil/myvector/Home/Dashboard', 'MyVector', 'Manage your desired career path.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7ac7v0054w597niqq61jb', 'https://afpcsecure.us.af.mil/', 'SURF', 'A one page summary of your career found on AMS', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7ahef0061w597biuto0yc', 'https://afpcsecure.us.af.mil/', 'Orders', 'View PCS orders through vMPF.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7anq40068w597xloypsez', 'https://mypers.af.mil', 'EPRs/OPRs', 'View EPRs/OPRs in PRDA.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7aqyt0075w597bxgv2g24', 'https://mypers.af.mil', 'PRDA', 'The official location of your personnel records.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7awdz0082w597p8o770za', 'https://mypers.af.mil/', 'MyPers', 'The official source of Human Resources information.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7c0d30190w597qoftevq1', 'https://afpcsecure.us.af.mil/', 'vMPF', 'View your deployment band and other MPF information.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7cpza0204w597pnothi98', 'https://afpcsecure.us.af.mil/', 'Alpha Rosters', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7ct850211w597unm5sncx', 'https://mypers.af.mil', 'vRED', 'View and update your virtual record of emergency data.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7cy940218w597qfaa90m6', 'https://afpcsecure.us.af.mil/', 'Outprocessing Checklists', 'View your out-processing checklist on vMPF.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7dpms0328w597ry7ovgmb', 'https://www.tricareonline.com/tol2/prelogin/desktopIndex.xhtml', 'TriCare Online (TOL)', 'Make appointments and communicate with your MTF.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7dwyi0351w597wu2eml5h', 'https://asimsimr.health.mil/', 'Dental', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7e2tr0358w597t5j24os9', 'https://myfss.us.af.mil/USAFCommunity/s/usaf-fitness-management', 'PT Tests', 'View your PT Test scores.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7e79v0365w597bn4ffa3r', 'https://milconnect.dmdc.osd.mil/milconnect/', 'MilConnect', 'Review personal, health care, and personnel information from one reliable source, the Defense Enrollment Eligibility Reporting System (DEERS)', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7ettn0457w597p7ja4uye', 'https://leave.af.mil/profile', 'LeaveWeb', 'The tracking system for requesting and tracking leave.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7f1yq0480w597b32b06dx', 'https://myfss.us.af.mil/USAFCommunity/s/', 'MyFSS', 'The new customer relationship management portal for all A1 mission area functions and applications', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7hjz30636w5977vu4la4c', 'https://mypay.dfas.mil/#/', 'MyPay', 'MyPay allows you to manage your pay information, leave and earning statements, W-2s, and more.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7hoo80643w597sj13gjp8', 'https://www.tsp.gov/', 'TSP', 'View and change your TSP allotments and balances.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7t1ug0734w5978i3jocce', 'https://afpcsecure.us.af.mil/', 'Assignments', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7tc7w0741w597oq8lx17u', 'https://www.move.mil/', 'Move.mil', 'Access all your PCS info.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7tgot0748w597hzdz4qvm', 'https://www.defensetravel.dod.mil/site/govtravelcard.cfm', 'GTCC', 'View and pay your Government travel card.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7tqcp0755w597fjgux36n', 'https://dtsproweb.defensetravel.osd.mil/dts-app/pubsite/all/view', 'DTS', 'Generate travel authorizations, make trip reservations, and route travel requests for approval, using DTS.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7u8rr0871w597eg6ncqln', 'https://usaf.dps.mil/teams/saffmcsp/portal', 'CSP', 'Finance customer service. ', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7ui590878w597f96dod7n', '/', 'vFinance', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7vc341000w597fmlr3crz', 'http://www.militaryonesource.mil/', 'Military Onesource', 'Department of Defense-funded program providing comprehensive information on every aspect of military life at no cost to active duty, the National Guard, Reserve members, and their families. ', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7vgt31007w597gmme1i81', 'https://www.afpc.af.mil/Separation/Transition-Assistance-Program/ ', 'TAP', 'Provides information, tools, and training to ensure service members, and their spouses, are prepared for the next step in civilian life.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7vv7s1135w597j1paf5sb', 'https://myvector.us.af.mil/myvector/Home', 'VML Announcements', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7w1tx1142w5979y0mpqf3', 'https://afmilpers.us.af.mil/PascodesNet40/PasCodesMain.aspx', 'PAS Code Lookups', 'Search for current PAS code information for worldwide Air Force users. ', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7w8z71149w597tlktd87j', 'https://afpcsecure.us.af.mil/', 'BLSDM', 'The system provides commanders the capability to produce queries and reports on individual members, request actions to be taken, and query personnel data.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cktd7wfz11156w59750jxc9ep', 'https://mypers.af.mil/app/answers/detail/a_id/7504/kw/afecd/p/10', 'AFECD', 'Air Force Enlisted Classification Directory / Air Force Officer Classification Directory', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2nw7x90612v6mzpuiz6ajz', 'https://afvec.us.af.mil/afvec/', 'AFVEC', 'AFVEC provides information on Voluntary Education Benefits and offers a variety of self-service applications to Air Force members.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2ny92c0644v6mztr8mgc8j', 'https://www.reddit.com/r/SpaceForce/', 'Space Force Reddit', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2nypsa0676v6mzuq4rxug8', 'https://twitter.com/SpaceForceDoD', 'USSF Twitter', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2nzg0y0708v6mziie1deum', 'https://dod.teams.microsoft.us/l/team/19%3adod%3aa251c51337c74806a4ae8e938b896620%40thread.skype/conversations?groupId=8d05e236-8dbc-478e-b4e4-04a73e93755d&tenantId=8331b18d-2d87-48ef-a35f-ac8818ebf9b4', 'MS Teams', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2o1jrl0740v6mza1yym3qe', 'https://www.facebook.com/SpaceForceDoD/', 'Space Force Facebook', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2o469i0772v6mzm7ktxk1x', 'https://www.spaceforce.mil/', 'Spaceforce.mil', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2o5f8x0804v6mzspuuw5s7', 'https://www.navy.mil/', 'Navy.mil', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2o6iuk0836v6mzjbufxm9s', 'https://www.army.mil/', 'Army.mil', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2o7jtl0868v6mzhsuqawb6', 'https://www.uscg.mil/', 'USCG.mil', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2o9ef00900v6mzv2mdpmi0', 'https://www.defense.gov/', 'DoD', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2oc14u0932v6mzhjjisvr3', 'https://www.marines.mil/', 'Marines.mil', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2od1p30964v6mz59vyo9u7', 'https://www.airuniversity.af.edu/', 'Air University', 'A center for professional military education (PME)', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2odume0996v6mz6zl3cw82', 'https://www.airuniversity.af.edu/Barnes/CCAF/', 'Community College of the Air Force', 'A federally-chartered degree-granting institution', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2oesn11028v6mzxogl24qf', 'https://www.linkedin.com/company/spaceforcedod/', 'SF on LinkedIn', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2ogd041060v6mz6vkqthk4', 'https://af.ataaps.csd.disa.mil/', 'ATAAPS', 'Automated Time Attendance and Production System. An automated system for entering civilian time and attendance.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2ohngg1092v6mzovtjb8ou', 'https://cas2net.army.mil/', 'AcqDemo/Cas2Net', 'Civilian performance review system', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2p27q81619v6mzreuccggn', 'https://mypers.af.mil/app/answers/detail/a_id/7759/kw/afocd/p/9', 'AFOCD', 'Officer Classification Directory.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2p34lo1651v6mzhiyzt29p', 'https://afvec.us.af.mil/afvec/', 'AFVEC', 'Virtual Education Center.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2xwapw2079v6mz3fr976ti', 'https://acesfos.csd.disa.mil/', 'ACES', 'Provides direct Civil Engineer information management support to active Air Force units, the Air National Guard, and the Air Force Reserve, during peace and war, at fixed main bases, bare bases, and deployed locations.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2y2zts2122v6mzaxkcd8sb', 'https://acms.us.af.mil/group/acms/entry', 'ACMS', 'The system for supporting the implementation of the Defense Acquisition Workforce Improvement Act (DAWIA) and Acquisition Professional Development Program (APDP).', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2ya3ag2154v6mzbjrpmp1t', 'https://wbcpins.tinker.af.mil/', 'ACPINS', 'Automated Computer Program Identification Number System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yboef2186v6mzait0qtk4', 'https://afpcsecure.us.af.mil/', 'ADP', 'Airmen Development Plan', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2ybw6v2218v6mznweyhl6l', 'https://aef.cloud.disa.mil/', 'AEF Online', 'The AEF Center executes the Air Force battle rhythm. We are the reach back enabler that plans and delivers versatile Air and Space power to the right place, at the right time, to support COMAFFORs'' mission needs.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yccps2250v6mzfht2uokx', 'https://aeps.ria.army.mil/aepspublic.cfm', 'AEPS', 'Army Electronic Product Support', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2ydh6p2282v6mzr4u1yybv', 'https://www.milsuite.mil/book/groups/af-cnodp', 'AF CNODP Milsuite Page', 'Homepage for the Air Force component of the Computer Network Operations Development Program (CNODP) to provide information to potential and onboarding applicants.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2ye3l02314v6mz8ib45i7o', 'https://afvec.us.af.mil/afvec/Public/COOL/', 'AF COOL', 'Credentialing Opportunities On-Line. Explore credentials recognized by the private sector that can improve Air Force job performance while helping to prepare for future civilian employment.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yenae2346v6mzkoblq10s', 'https://usafprod.skillport.com/skillportfe/custom/login/usaf/seamlesslogin.action', 'AF e-Learning', 'The Air Force E-Learning program provides over 2,800 technical and business skills courses, thousands of online books, as well as preparation tools for commercial IT certification tests.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yfut92389v6mzz02ye67w', 'https://cs2.eis.af.mil/sites/10001/S/_layouts/15/start.aspx#/SitePages/Home.aspx', 'AF EIS SharePoint Tech Support Site', 'The categories listed throughout this site are here to assist and empower you as you navigate through the EIS SharePoint environments.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2ygq0g2421v6mzp3aru57c', 'https://afeonet.milcloud.mil/', 'AF EONet (.mil only)', 'AF EONet addresses requirements for military equal opportunity (MEO) and civilian equal opportunity (EEO) case management, allowing the Air Force to address/manage EO problems efficiently, and track them to resolution.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yh5tr2453v6mzncti3myr', 'https://aftoolbox.hq.af.mil/', 'AF Toolbox', 'The Air Force Toolbox is a catalog of systems and concepts designed to stimulate discussion and debate concerning the role of future aerospace systems in the future security environment.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yhirt2485v6mzjtqhqpzb', 'https://www.ed.hq.af.mil/afcd', 'AFCD', 'Air Force Congressional Domain', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yi3u82517v6mzhaoqlr3f', 'https://imp.afds.af.mil/default.aspx', 'AFDS', 'Air Force Directory Services. AFDS is the system used to effectively manage access control, identity management, and security threats while simplifying security management. ', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yifzd2549v6mz3ws414qk', 'https://afget.robins.af.mil/Robins/', 'AFGET', 'Air Force Global Enterprise Tracking.  The Air Force Global Enterprise Tracking (AFGET) system provides real-time location information.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yj1xj2581v6mz13l2hrxo', 'https://trackerlite.wpafb.af.mil/tracker', 'AFMC Tracker (.mil only)', 'This page provides users with supply and transportation pipeline information obtained from numerous DoD data systems in multiple report formats.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yk3us2613v6mz16imoxm7', 'https://afpcsecure.us.af.mil/', 'AFOQTS', 'Air Force Officer Qualifying Test Score.  Test Control Officers (TCOs) have the ability to review test center scores by test dates and more.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2ykk9z2645v6mz848a3dfq', 'https://afpaas.af.mil/', 'AFPAAS', 'Air Force Personnel Accountability and Assessment System. AFPAAS standardizes a method for the Air Force to account, assess, manage, and monitor the recovery and reconstitution process for personnel and their families affected and/or scattered by a wide-spread catastrophic event.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2ylgaj2677v6mzmcoc5q4r', 'https://pwtraining.dma.mil/', 'AFPIMS', 'Air Force Public Information Management System. AFPIMS is a content management system designed to unify all Air Force public sites by giving them a uniform appearance, standardizing the paths to information and ensuring that only appropriate information is published.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yn5m62709v6mz44sdl5ea', 'https://webapps.afrc.af.mil/A1/DPM_V3/default.asp', 'AFRC Military Clearing House', 'The following link is provided for assignment opportunity registration and information regarding NAF re-missioning.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2ynri82741v6mzo44bv8gd', 'https://afrims.cce.af.mil/', 'AFRIMS', 'AF Records Information Management System. The mandatory, AF-wide system that provides AF Records Managers, at all levels of organization, an online, real-time system to manage and prepare file plans and associated records management products.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yo6392773v6mz75yw3mgw', 'https://afrisstf.csd.disa.mil/afrisstf/', 'AFRISS-TF', 'Air Force Recruiting Information Support System - Total Force. ', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yp13u2805v6mzsj37623v', 'https://weather.af.mil/', 'AFW-WEBS', 'Air Force Weather-Web Services. A suite of interactive web applications that provide meteorological support to DoD operations worldwide.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yqizw2837v6mzgdc596mi', 'https://agepift.sso.cce.af.mil/', 'AGEP-IFT', 'Aircrew Graduate Evaluation Program - Introductory Flight Training. The AGEP-IFT program provides gaining-unit supervisors and instructors the ability to record their ratings and comments on the effectiveness of training program graduates.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yr8gj2869v6mzun6bwd73', 'https://aimwts.sso.cce.af.mil/portal/aimwts2/', 'AIMWTS', 'Aeromedical Information Management Waiver Tracking System. A management system that tracks waivers and ETPs through their entire lifecycle.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yrnen2901v6mz87nyfokn', 'https://www.afapo.hq.af.mil/Public/Presentation/Main/Index.cfm', 'Air Force Art Collection', 'The documented story of the Air Force through the universal language of art. ', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2ys1q82933v6mznktnnunw', 'http://www.beready.af.mil/', 'Air Force Be Ready', 'Get a kit, make a plan, and prepare yourself and your family for any disasters.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2ysnbt2965v6mzqm0rjm6i', 'https://www.housing.af.mil/', 'Air Force Housing', 'Provides information on family and unaccompanied housing available at Air Force installations worldwide.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2ytfwy2997v6mzel5olv30', 'https://imp.afds.af.mil/lookup.aspx', 'Air Force White Pages (.mil)', 'Individuals may use the white pages to search for individuals in the Air Force by first name, last name, rank and/or location.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yuhrr3029v6mzeedn4bol', 'https://lms.au.af.edu/login/canvas', 'Air University Canvas', 'Distance learning access to a variety of programs.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yuslh3061v6mz2v6y5zxq', 'https://almss.us.af.mil/', 'ALMSS', 'Automated Logistics Management and Support System. A system that provides a global logistics view of Command and Control Intelligence Surveillance Reconnaissance (C2ISR) sustainment support.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yvgnq3093v6mz6lck6vs4', 'https://www.my.af.mil/ammoprod/wm', 'AMMO & AMST', 'Global Ammunition Control Point (GACP), the Centralized Management Function for all conventional munitions activities', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yvr4l3125v6mzqlkkyffp', 'https://amp.robins.af.mil/', 'AMP', 'Asset Management Program.  The tracking system used to provide insight to operational and logistic usage of aircraft and end-item activity at any level of hierarchy within the Intelligence Surveillance Reconnaissance (ISR) sustainment support in a Contractor Logistics Support (CLS) environment.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yw3ow3157v6mzdx5f7g6g', 'https://afpcsecure.us.af.mil/', 'AMS', 'Asset Management System.  The program used for assignment preferences and career management for officer and enlisted Airmen.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2ywhlg3189v6mzx3m0fw5a', 'https://apacs.milcloud.mil/', 'APACS', 'Aircraft and Personnel Automated Clearance System. A tool designed to aid DoD aircraft mission planners and operators, and DoD travelers on official business (and in some cases leave) overseas in meeting the clearance requirements outlined in the DoD Foreign Clearance Guide', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2ywrcq3221v6mzi1mnkfzf', 'https://www.apan.org/', 'APAN', 'All Partners Access Network. Provides the DOD and mission partners community spaces and collaborative tools to leverage information to effectively plan, train and respond to meet their business requirements and mission objectives.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yx0xr3253v6mzfczl5jcm', 'https://www.my.af.mil/gcss-af/USAF/ep/globalTab.do?channelPageId=s0ECF2BB844E64F620144F48AA2DF00BD', 'API', 'Airmen Powered by Innovation.  The consolidation of four Air Force-wide "good idea" generating programs: IDEA, BP, PECI, and USAF CPI. ', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yxkfy3285v6mz1d7r3fos', 'https://apims.af.mil/apims', 'APIMS', 'Air Program Information Management System. The information system for air quality permit management, air emission inventory, and air emission reporting.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yxtdi3317v6mztrm42g80', 'http://afacpo.com/acpo/', 'APM', 'Acquisition Process Model. A tool designed to serve as the standard Air Force acquisition process reference and guide for all stakeholders.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yyocl3349v6mz0jz254gn', 'https://www.my.af.mil/arcnetprod', 'ARCNet', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2yywya3381v6mz137fcbgs', 'https://afpcsecure.us.af.mil/', 'ARMS', 'Provides military members access to their Unit Personnel Record Group documents. ', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2z06nn3424v6mz6neftuza', 'https://arms.sso.cce.af.mil/arms', 'ARMS', 'Aviation Resource Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2z0z733456v6mznecjutma', 'https://arowsr.afrc.af.mil/arows-r/', 'AROWS-R', 'AF Reserve Order Writing System.  The Air Force Reserve Order Writing System. ', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2z1kyc3488v6mz6st355y9', 'https://halfway.peterson.af.mil/SARP/ARTS', 'ARTS List', 'Air Force Resources to Share List. An application that provides a set of tools for reallocating surplus supplies and curtailing unnecessary supply purchases on Air Force Government Purchase Cards (GPC).', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2z1z333520v6mzs1gqevqa', 'https://asap.safety.af.mil/', 'ASAP', 'Airman Safety Action Program. A program designed to enhance aviation safety through the prevention of accidents and incidents.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2z2n443552v6mzdl2uz76e', 'https://asimsimr.health.mil/imr/loginunit.aspx', 'ASIMS Unit POC Site', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2z32sf3584v6mz0z9t3hnf', 'https://quicksearch.dla.mil/qsSearch.aspx', 'ASSIST', 'Provides direct access to Defense and Federal specifications and standards available in the official DoD repository, the ASSIST database.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2z4n0d3648v6mz03fcrdh8', 'https://www.my.af.mil/atimsprod1', 'ATIMS', 'Automated Technology Information Management System.  An interactive data warehouse supporting 65 programs located at Eglin, Hill, Warner Robins, Tyndall, and Redstone Arsenal along with their industry partners.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2z4xt03680v6mzsedg56ml', 'https://www.my.af.mil/arcnetprod/resnet/training/airmantrainingplan.aspx', 'ATMT', 'ARCNet Training Management Toolset. A new toolset that contains a series of robust training and tracking tools for Air Reserve Component units.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2z581s3712v6mz8tikfen3', 'https://www.igc.ustranscom.mil/igc/', 'AV', 'Asset Visibility. Provides the warfighter end-to-end asset visibility in the DoD logistics operational pipeline.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2zx6jk3744v6mzvs710v1k', 'https://bars.cce.af.mil/bars/index', 'BARs', 'Battlefield Airmen Rapid Refresh and Replenishment', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2zyfdx3776v6mz8cmuo7fy', 'https://base.cce.af.mil/', 'BaS&E', 'Base Support & Expeditionary Planning Tool', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw2zzgu33808v6mzhzglm112', 'https://cs2.eis.af.mil/sites/13239/optrn/default.aspx', 'C2IMERA', 'Provides an integrated composite picture of installation resources used for planning, force employment, emergent management, and C2 monitoring and reporting to in-garrison & deployed Commanders.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3003wp3840v6mzqwxf5wy9', 'https://www.my.af.mil/amsprod/ams', 'C2MS', 'Command and Control Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw301pnk3872v6mzdp2m3qdf', 'https://cafdex.us.af.mil/WSS/CAFDEx', 'CAFDEx / WSS', 'Central Access for Data Exchange - Weapon System Sustainment', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3046pk3904v6mzs8i5mvif', 'https://cafdex.us.af.mil/fhp/fhpm/', 'CAFDEx / FHP', 'Centralized Access for Data Exchange - Flying Hour Program', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw305o5d3936v6mzkpt2oeuo', 'https://cafdex.us.af.mil/RSEP/CAFDEx', 'CAFDEx / RSEP', 'Centralized Access for Data Exchange - Requirements Scheduling and Execution', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw307naq3968v6mznc3lvion', 'https://webg081.csd.disa.mil/WebG081', 'CAMS-FM / G081', 'Core Automated Maintenance System for Mobility', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw308ia14000v6mzuchaw6et', 'https://www.caspr.hq.af.mil/Presentation/Authorization/Login.cfm', 'CASPR', 'Central Adjudication Security Personnel Repository', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw309akl4032v6mznl1mjp69', 'https://cs2.eis.af.mil/sites/23643/SitePages/Home.aspx', 'CBIS', 'Contracting Business Intelligence Service', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30b7ll4064v6mzl4ts94sf', 'https://my.af.mil/ccafstarsprod/STARS', 'CCAF-STARS', 'Community College of the Air Force-Student Transcript Administration and Record System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30c4k84096v6mzmjh5ddu6', 'https://cdrs.cce.af.mil/', 'CDRS', 'Corporate Data Repository System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30d3uj4128v6mz9l5uimur', 'https://usaf.dps.mil/teams/CEDASH/Scripts/Homepage/Home.aspx', 'CE DASH', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30ehkb4160v6mz7t6icr2f', 'https://cems.sso.cce.af.mil/cems', 'CEI', 'Civilian Employment Information', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30f2b64192v6mzkujkrx8u', 'https://cems.sso.cce.af.mil/cems', 'CEMS', 'Comprehensive Engine Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30fweh4224v6mz2pcy71z3', 'https://cool.sso.cce.af.mil/', 'COOL', 'Center Ops Online', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30ghn24256v6mzdbcu7jei', 'https://cafdex.us.af.mil/RSEP/CESR', 'CESR', 'Comm Electronics Sustainment Requirements', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30hwe24288v6mzw4cgm7z7', 'https://cft.sso.cce.af.mil/apps/CFT', 'CFT', 'Contract Field Team', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30irn74320v6mzgb4udcpk', 'https://chris.wpafb.af.mil/', 'CHRIS', 'Command Human Resources Intelligence System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30jl334352v6mz8294zcsg', 'https://cips.cce.af.mil/CIPS5', 'CIPS', 'Cyberspace Infrastructure Planning System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30lseg4384v6mzdbhpipys', 'https://compo.dcpds.cpms.osd.mil/', 'Civilian Career Report', 'The Civilian Career Report (formerly the Civilian Career Brief) is available in MyBiz+ under both Key Services and the Reports detail page.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30mnw24416v6mzf9cmmtz4', 'https://afpcsecure.us.af.mil/', 'Civilian Virtual In-Processing', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30n5nq4448v6mzipnff064', 'https://intelshare.intelink.gov/sites/DAFCJIC/', 'CJIC', 'Criminal Justice Information Cell', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30q3mt4480v6mzorkaneip', 'https://afpcsecure.us.af.mil/', 'CLRP', 'College Loan Repayment Program', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30ql7n4512v6mz7g2ysc9y', 'https://www.cmos.csd.disa.mil/', 'CMOS', 'Cargo Movement Operations System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30sixd4544v6mzjov2bvtz', 'https://afpcsecure.us.af.mil/', 'CMS', 'Case Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30uj8a4587v6mzz8becxh8', 'https://kdss.sso.cce.af.mil/', 'CMS', 'Command Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30w3f44619v6mz0wl0kqbs', 'https://afpcsecure.us.af.mil/', 'CPDSS', 'Civilian Personnel Decision Support System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30x50u4651v6mzks7h003i', 'https://cris.cce.af.mil/', 'CRIS', 'Commanders'' Resources Integration System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30yb3u4683v6mzxi8s8ejt', 'https://www.transactionservices.dla.mil/daasinq/', 'DAASINQ', 'Defense Automatic Addressing System Inquiry System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw30zh754715v6mz12bv6wng', 'https://www.dau.edu/', 'DAU', 'Defense Acquisition University. A global learning environment to develop qualified acquisition, requirements and contingency professionals', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3100zp4747v6mzt75cnl2y', 'https://conference.apps.mil/', 'DCS', 'Defense Collaboration Services', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw311qt24779v6mz77pn66uz', 'https://www.dmdc.osd.mil/milconnect/faces/index.jspx', 'DEERS', 'Defense Enrollment Eligibility Reporting System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3120i64811v6mz3dzg1v6d', 'http://www.dhl-usa.com/en/express/resource_center/government_and_defense.html', 'DHL', '(Commercial site) Package tracking, calculate transit times with online DHL tools.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw313dak4843v6mzsrob9knd', 'https://dla.deps.mil/dod/dla/dlaenergy/sitepages/home.aspx', 'DLA Energy Portal', 'Repository for many of the tools and documents needed for customers to work with DLA Energy.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw314d5c4875v6mzd8hxcm3h', 'https://www.logisticsinformationservice.dla.mil/default.htm', 'DLIS', 'Defense Logistics Information Service', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw315hm94907v6mzg306ulg1', 'https://dmhrsi.csd.disa.mil/OA_HTML/AppsLogin', 'DMHRSi', 'Defense Medical Human Resource System Internet', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3164b64939v6mzsjy7pufd', 'https://dod.emall.dla.mil/', 'DoD e-Mall', 'Shop and buy DLA-managed items by paying with either a Government Purchase card or the traditional DoDAAC/Fund Cite. ', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw31723i4971v6mz63kezamx', 'https://safe.apps.mil/about.php', 'DoD SAFE', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw317rbu5003v6mzmcz4tqzc', 'https://dodaac.wpafb.af.mil/', 'DODAAC', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw318lfb5035v6mzm26n5z1x', 'https://dots.dodiis.mil/', 'DOTS', 'DoDIIS One-Way Transfer Service. A one-way transfer service that allows users to transfer files up-domain from NIPRNet to SIPRNet, from NIPRNet to JWICS, and from SIPRNet to JWICS.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3195qk5067v6mzb28w3mr6', 'https://dpassupport.golearnportal.org/', 'DPAS', 'Defense Property Accountability System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw31aqxf5099v6mz9r4fvu65', 'https://cafdex.us.af.mil/WSS/DPEM_RQMTS/', 'DPEM', 'Depot Purchased Equipment Maintenance - Funds Management', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw31bpyx5131v6mz4susl0si', 'https://cafdex.us.af.mil/WSS/DPEM_RQMTS/', 'DPEM', 'Depot Purchased Equipment Maintenance - Requirements', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw31evjc5204v6mzd9e9g963', 'http://www.move.mil/', 'DPS', 'Defense Personal Property System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw31fxij5236v6mz2gzj6bgg', 'https://www.my.af.mil/drilsprod', 'DRILS / G200', 'Defense Repair Information Logistics System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw31lg2t5268v6mzf9b8q1ph', 'https://usaf.deps.mil/sites/DSOR/AMS', 'DSOR AMS', 'Depot Source of Repair Automated Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw31n7a85300v6mz1zoes0ju', 'https://usaf.deps.mil/sites/DSOR/AMS', 'DSS MRO Tracking', 'Distribution Standard System Material Release Order Tracking System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw31qdp25404v6mzxp1316ex', 'https://afpcsecure.us.af.mil/', 'eBOSS', 'Electronic Board Operations Support System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw31rcba5436v6mztozf3zl8', 'https://apims.af.mil/apims/ecars', 'ECARS', 'Employee-vehicle Certifications and Reporting System ', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw31t0l65468v6mzxwjq1z6f', 'https://alod.afrc.af.mil/alod/default.aspx', 'ECT', 'Electronic Case Tracking', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw31to3g5500v6mzc5r5uwqc', 'https://usaf.dps.mil/teams/eDASH/WPP/HomePage/Home.aspx', 'eDASH', 'A communication resource that facilitates effective environmental management by providing standard procedures, performance metrics, and functional tools for more efficient information exchange to meet the mission of the Air Force at all levels.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw31uwza5532v6mzg9332qlu', 'https://www.my.af.mil/esoh-sds/eesoh-sds/sds/loadSdsSearch.action', 'EESOH-MIS', 'Enterprise Environmental Safety and Occupational Health Management Information System - Safety Data Search', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw31wep25564v6mzab94pfvr', 'https://www.my.af.mil/esoh/eesoh/', 'EESOH-MIS', 'Enterprise Environmental Safety and Occupational Health-Management Information System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3t5vct5601v6mzapxaij4t', 'https://efinance.sso.cce.af.mil/', 'eFinance Workspace', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3x0uvb5633v6mzp0o98035', 'https://fss.emap-web.com/', 'EMAP', 'Eagle Modification Action Plan', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3x1l5w5665v6mzczxanjkv', 'https://airforce.emass.apps.mil/', 'eMASS', 'Enterprise Mission Assurance Support Service', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3x27yi5697v6mzovj8q6pi', 'https://www.my.af.mil/EMOC/EMOC3', 'EMOC', 'Enhanced Maintenance Operations Center', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3x2zl65729v6mzywipimmk', 'https://esd.us.af.mil/', 'ESD', 'Enterprise Service Desk Portal', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3x4gue5761v6mz7y02enbm', 'https://eopf.opm.gov/USAF/', 'eOPF', 'The Office of Personnel Management (OPM) electronic Official Personnel Folder (eOPF) contains official government documents covering your employment history.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3x4we45793v6mzcb0soynd', 'https://usaf.dps.mil/teams/epo/epo', 'EPO', 'Electronic Project Order', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3x5v105825v6mzup59de1d', 'https://afpcsecure.us.af.mil/', 'EPROM', 'Enlisted Promotion', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3x6oja5857v6mzkok817xw', 'http://apps.militaryonesource.mil/esat', 'eSAT', 'eSponsorship Application Training', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3x78bn5889v6mz2ll6lfcx', 'https://www.my.af.mil/ESBMetricsWeb/?0', 'ESB Metrics Application', 'Provides users with access to view information about their data feeds that are routed thru the ESB. ', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3x7sdp5921v6mzct7pribz', 'https://www.esgr.mil/', 'ESGR', 'Employer Support of the Guard and Reserve', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3y0qgi5958v6mzwox5tksn', 'https://cs2.eis.af.mil/sites/app10-ETCA/SitePages/Home.aspx', 'ETCA', 'Education and Training Course Announcements', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3y19765990v6mzkimtj4p7', 'https://www.my.af.mil/etims/ETIMS/index.jsp', 'ETIMS', 'Enhanced Technical Information Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3y1tng6022v6mzws3z86b4', 'https://www.etims-web.com/', 'eTIMS', 'Eagle Tooling Information Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3y40gc6054v6mzme09r0y3', 'https://etmsweb.wpafb.af.mil/', 'ETMS', 'Education and Training Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3y4iau6086v6mztgrbz5iz', 'https://acqss.ezsource.wpafb.af.mil/', 'EZ Source Electronic Source Selection Tool', 'A workflow application that facilitates the creation, organization, and communication of sensitive, unclassified, competitive source selection documentation used in the source selection evaluation process.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3y4xzn6118v6mz4sibj9ux', 'http://www.my.af.mil/common/fedlog/FEDLOG.ZIP', 'FED LOG', 'Federal Logistics', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3y6kv16150v6mztd6e47nd', 'http://www.my.af.mil/common/fedlog/FEDLOGLITE.ZIP', 'FED LOG Lite', 'Federal Logistics', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw3y7lla6182v6mzu0m1yvsm', 'http://www.dla.mil/HQ/InformationOperations/Offers/Products/LogisticsApplications/FEDLOG.aspx', 'FED LOG ', 'Federal Logistics Data Information Center', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw43trio6214v6mz75foru6q', 'http://www.fedex.com/us/tracking/', 'FedEx', '(Commercial site) FedEx provides access to a growing global marketplace through a network of supply chain, transportation, business and related information services.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw43uhs96246v6mzogsdqrb6', 'https://www.fedmall.mil/', 'FedMall', 'FedMall, formerly DOD eMALL, functions as an online focal point for DOD customers seeking to acquire off-the-shelf, finished goods from the commercial marketplace.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw43v8v86278v6mz44gevd7f', 'https://femweb.robins.af.mil/', 'FEMWEB', 'Facilities and Equipment Maintenance', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw43vpy26310v6mzw9rqwwd0', 'https://afpcsecure.us.af.mil/', 'Fill RPA Status Report', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw43wti56342v6mz6vdzygj3', 'https://fm.adls.af.mil/', 'FMDLC', 'Financial Management Distributed Learning Center', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw43xe7p6374v6mzt29bwhe6', 'https://miap.csd.disa.mil/portal.html', 'GAFS', 'General Accounting and Finance System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw4404mb6406v6mzixbuyc6n', 'https://www.my.af.mil/pkmscdsso?https://www.gcss-af.com/cfs/outreach/tools/tracker/index.cfm?tracker=7&program=1', 'GCSS-AF Change Request System', 'Track new requirements and user-initiated change to the GCSS-AF Infrastructure.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw440l5a6438v6mzu66rmcla', 'https://lims-ev.cce.af.mil/boe/ESSO/', 'GCSS-AF Data Services', 'A single source for authoritative data, analytical processing, and integrated enterprise solutions.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw441byl6470v6mz9umnlxmo', 'https://www.my.af.mil/pkmscdsso?https://www.gcss-af.com/cfs/outreach/tools/tracker/index.cfm?tracker=2&program=1', 'GCSS-AF Deficiency Report System', 'Track problems with delivered GCSS-AF Infrastructure Capability. It is used, in concert, with the Watch Item Tracker (WIT) tool which is used to identify potential problems.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw442mjr6502v6mzxf2m7dgm', 'https://www.my.af.mil/pkmscdsso?https://www.gcss-af.com/cfs/outreach/tools/tracker/index.cfm?program=1&tracker=9', 'GCSS AF RSO Activity Handler', 'Check the status of the activities for your RSO; submit request for activity of an RSO''d application.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw4468616534v6mz5v7poqg8', 'https://www.my.af.mil/pkmscdsso?https://www.gcss-af.com/cfs/outreach/tools/tracker/index.cfm?tracker=1&program=1', 'GCSS-AF Watch Item Tracker', 'Track potential problems with delivered GCSS-AF Infrastructure Capability, system or hardware before establishing a formal DR.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw446xum6566v6mzqtpi1v68', 'https://www.my.af.mil/pkmscdsso?https://www.gcss-af.com/cfs/outreach/survey/index.cfm?view_type=5', 'GCSS-AF Workplans', 'A service set up to integrate hardware, software, applications, services and tools into the GCSS-AF enclave.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw44bh1x6598v6mzw9b1u313', 'https://dod411.gds.disa.mil/', 'GDS', 'Global Directory Service', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw44dfzm6630v6mz14d24kck', 'https://cs2.eis.af.mil/sites/12922/default.aspx', 'GDSS', 'Global Decision Support System (General Information)', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw45o96z6662v6mzq8sdvafx', 'https://army.deps.mil/NETCOM/sites/GEARS5/Live/web/Home.aspx', 'GEARS', 'Global Electronic Approval Routing System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw45ow3f6694v6mz0nudw8sf', 'https://gko.ngb.army.mil/', 'GKO', 'Guard Knowledge Online', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw45pwdp6726v6mzuamdefti', 'https://grbplatform.us.af.mil/', 'GRB / EBIS', 'Government Retirement and Benefits / Employee Benefits Information System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw45qboy6758v6mzywb3aoah', 'https://usaf.dps.mil/teams/AFRNI/SitePages/Health-of-the-Network.aspx', 'HON', 'Health of the Network', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw45qz8u6790v6mzhbu1w5vb', 'https://miap.csd.disa.mil/portal.html', 'IAPS', 'Integrated Accounts Payable System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw45scwo6822v6mzm170pf3h', 'http://go.usa.gov/cJtjW', 'IDECS New User Account Registration', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw45sze26854v6mz67zcml7e', 'http://go.usa.gov/cJtjC', 'IDECS', 'Integrated Budget Documentation and Execution System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw45u8ug6886v6mzdbwdzdot', 'https://www.igc.ustranscom.mil/igc/', 'IGC', 'Integrated Data Environment / Global Transportation Network Convergence', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw45upuk6918v6mz1j82xdr1', 'https://igems.hill.af.mil/', 'IGEMS', 'Inspector General Evaluation Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw45vg5q6950v6mzw9i4b88d', 'https://ils-s.cce.af.mil/ilss/', 'ILS-S', 'Integrated Logistics System-Supply', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw45wfk86982v6mzghtcs7my', 'https://ils-s.test.cce.af.mil/ilss/', 'ILS-S', 'Integrated Logistics Systems-Supply Schoolhouse', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw45wxax7014v6mzei5q6831', 'https://imds.cce.af.mil/imds/', 'IMDS', 'Integrated Maintenance Data System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw45yykj7046v6mznsy8qzvm', 'https://webts-ocmc.csd.disa.mil/', 'IMDS', 'Web Transaction Server', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw460l897078v6mzeidt1hv6', 'https://org2.eis.af.mil/sites/22301/SitePages/impresa.aspx', 'Impresa', 'a.k.a MABSM', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw461ib27110v6mz5817cwgy', 'https://haf.itips.hedc.af.mil/', 'ITIPS', 'IT Investment Portfolio Suite', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw462zgl7142v6mzwnat6or8', 'https://jcd.sso.cce.af.mil/', 'JCD', 'Joint CLPM (Command Language Program Manager) Database', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw463ogj7174v6mzuwf3bm4b', 'https://jedmics.af.mil/', 'JEDMICS', 'Joint Engineering Data Management Information Control System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw464icj7206v6mz2v8v1ip8', 'https://jko.jten.mil/', 'JKO', 'Joint Knowledge Online', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw465efk7238v6mzxzbeu3gi', 'https://www.jllis.mil/', 'JLLIS', 'Joint Lessons Learned Information System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw467zgg7270v6mz9dr1map6', 'https://josac.ustranscom.mil/', 'JOSAC', 'Joint Operation Support Airlift Center', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw468h4z7302v6mze863z950', 'https://kdss.sso.cce.af.mil/', 'KDSS', 'Keystone Decision Support System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46btsv7334v6mza729tfyy', 'https://www.my.af.mil/gcss-af/USAF/content/limsevtraining', 'LIMS-EV Training eBook', 'Frequently Asked Questions, Quick Reference Material, Training Guides, and Videos that highlight the current capabilities available, as well as provide a sneak-peek into upcoming releases.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46d6dk7366v6mz0ho2f4ya', 'https://afpcsecure.us.af.mil/', 'MDB', 'Base Microsoft Access Database', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46egkq7398v6mzfxera3cl', 'http://mears.army.mil/', 'MEARS', 'Multi-User Engineering Change Proposal (ECP) Automated Review System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46f98d7430v6mzf0j9a2ag', 'https://www.dlis.dla.mil/medals/', 'MEDALS', 'Military Engineering Data Asset Locator System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46gx267462v6mzncvvyomt', 'https://miap.csd.disa.mil/portal.html', 'MIAP', 'Multi-Host Internet Access Portal', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46hg927494v6mz6ejgftf3', 'https://mict.us.af.mil/', 'MICT', 'Management Internal Control Toolset', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46ibzo7526v6mzdtz9250s', 'https://milpds-prod.csd.disa.mil/', 'MilPDS', 'Military Personnel Data System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46j31n7558v6mz0rqwwgg4', 'https://mafops.us.af.mil/', 'MAF Ops', 'Mobility Air Forces Operations', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46jo387590v6mzbhz4knbz', 'https://mpc4.mission-planning.org/default.aspx', 'MPC', 'Mission Planning Central', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46kczs7622v6mzxpz2kut6', 'https://mpes4.pentagon.af.mil/mpes/login.jsp', 'MPES', 'Manpower Programming and Execution System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46kwda7654v6mzx29xw3av', 'https://mrdss1.health.mil/ultra4/login', 'MRDSS', 'Medical Readiness Decision Support System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46nmqm7686v6mzbxoyn6wd', 'https://asimsimr.health.mil/imr/myIMR.aspx', 'My IMR / ASIMS', 'Provides users access to their Individual Medical Readiness (IMR) status, including IMR action list, Immunizations, and Deployment Health Assessments.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46opfq7718v6mznb2zsjj6', 'https://compo.dcpds.cpms.osd.mil/', 'My Workplace', 'Allows employees, managers and supervisors to establish performance plans, provide feedback, and appraise employee performance.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46qje87750v6mznwhg7qbr', 'https://compo.dcpds.cpms.osd.mil/', 'MyBiz+', 'The source for all DoD employees, supervisors and managers to view and update their personal and HR related information', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46r4l17782v6mz6rlpva24', 'https://myetms.wpafb.af.mil/', 'MyETMS', 'My Education and Training Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46s6vh7814v6mzus2a35za', 'https://myfss.us.af.mil/', 'MyFitness', 'Your destination for getting notifications, scheduling, entering test results, and all other processes related to the fitness goals for Airmen and Guardians.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46skfc7846v6mzsiz97alm', 'https://lms-jets.cce.af.mil/', 'myLearning', 'Supports the AF goal of providing web-based training that offers all Airmen the flexibility to accomplish training anytime, anywhere, —24/7.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46tjdt7878v6mzowmt0ezt', 'http://www.roc.noaa.gov/WSR88D/', 'NEXRAD', 'National Logistics Support Center', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46u5r27910v6mz1dlzl2ag', 'https://oars.hq.af.mil/', 'OARS', 'Obligated Adjustment Reporting System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46w5no7942v6mz1scwveed', 'https://olvims.cce.af.mil/Dispatch/faces/home', 'OLVIMS', 'On-Line Vehicle Interactive Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46xc337974v6mz0gb6nbtg', 'https://ooport.hill.af.mil/', 'OO-ALC Portlet', 'Access to Parts Supportability, Total Asset Visibility, Quality Deficiency Reporting, G021, Packaging Requirements, Time Compliance, Q072, Finance and Accounting, Air Munitions, Express, Wholesale Shipping, Retail Shipping, D035K, Depot Maintenance Reengineering, Nonconforming Technical Assistance, and more.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw46y7b58006v6mz8w1qwsq9', 'https://afpcsecure.us.af.mil/', 'PARIS', 'Personnel Automated Records Information System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw4705kv8038v6mz04tqoja4', 'https://g97oop2.wwyk.okc.disa.mil/DM_g097/', 'PDMSS', 'Programmed Depot Maintenance Scheduling System for Hill AFB', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw471q068111v6mzrw4opjq1', 'https://g97ocp2.wwyk.okc.disa.mil/DM_g097/', 'PDMSS', 'Programmed Depot Maintenance Scheduling System for Tinker AFB', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw473bga8143v6mzods9lbf1', 'https://g97wrp2.wwyk.okc.disa.mil/DM_g097/', 'PDMSS', 'Programmed Depot Maintenance Scheduling System for Warner Robins AFB', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw473tfq8175v6mz97htkh9e', 'https://www.my.af.mil/langrsoprod/pemd/', 'PEMD', 'Protocol Event Management Database', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw474s0h8207v6mzsd5c2lao', 'https://pepp.sso.cce.af.mil/portal/pepp/', 'PEPP', 'Physical Examination Processing Program', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw4768868239v6mztrnwitpk', 'https://afpcsecure.us.af.mil/', 'PERSTEMPO', 'Personnel TEMPO: a quality-of-life measurement that measures the amount of time an individual spends away from his or her home station.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47736w8271v6mzakrfek6n', 'https://cs2.eis.af.mil/sites/11417/default.aspx', 'PEX', 'Patriot Excalibur', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw477hy28303v6mz8wkavecz', 'https://pmrt.altess.army.mil/pmrt/login.jsp', 'PMRT', 'Project Management Resource Tool', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw478bke8335v6mz9vgmudvu', 'https://prps.cce.af.mil/PRPS/', 'PRPS', 'Purchase Request Process System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw4790w98367v6mzz8jdx3pl', 'https://rammis.sso.cce.af.mil/rammis/', 'RAMMIS-W', 'Radioactive Materials Management Information System-Web', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw479zpq8399v6mzp7b7wdv4', 'https://rampod4.robins.af.mil/', 'RAMPOD', 'Reliability, Availability, Maintainability, Logistics Support System for Pods', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47ba3e8431v6mzip41mdv7', 'https://afpcsecure.us.af.mil/', 'RAW', 'Retrieval Application Websites', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47brzq8463v6mzs3q3jdg5', 'https://halfway.peterson.af.mil/SARP/ReACT', 'ReACT', 'Requirements Assessment and Compliance Tool', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47d9cf8495v6mzrpe4639j', 'https://recon.wpafb.af.mil/', 'RECON', 'Reusable Container Worldwide Warehouse', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47e37q8527v6mzmikdxin2', 'https://remisprd.sso.cce.af.mil/REMISAppWeb/REMIS.jsp?r=1', 'REMIS USAF', 'Reliability and Maintainability Information System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47emg78559v6mzbyp5euk8', 'https://afpcsecure.us.af.mil/', 'Reserve Vacancies', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47f4958591v6mz0d8327q1', 'https://afpcsecure.us.af.mil/', 'RMVS', 'Reserve Management Vacancy System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47fryd8623v6mzkt4rtuhv', 'https://afpcsecure.us.af.mil/', 'RPA', 'Request for Personnel Action Generators', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47g8cx8655v6mzyiav8x13', 'https://www.my.af.mil/afmsprod/portal/rsms/login', 'RSMS', 'Refractive Surgery Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47h0zb8687v6mz9laezyhb', 'https://www.my.af.mil/samrs/', 'SAMRS', 'Security Assistance Manpower Requirements System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47hmdo8719v6mzmq2f8j1e', 'https://halfway.peterson.af.mil/SARP', 'SARP', 'Space/Cyberspace Analysis Resource Portal', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47jkot8751v6mz3yknt3he', 'http://www.dbschenkerusa.com/', 'Schenker USA', 'Formerly Burlington Air Express (BAX) global.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47k9ou8783v6mzsp9i8ki0', 'https://scsweb.csd.disa.mil/smsweb/', 'SCS', 'Stock Control System Web Inquiry', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47l2gj8815v6mz376boh7d', 'https://slam.cce.af.mil/', 'SLAM', 'SLAM Access Management', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47lkr78847v6mzlhja97ch', 'https://slcms.us.af.mil/slcms/Dashboard/Default', 'SLCMS', 'Senior Leader Career Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47m0r58879v6mz50j8wmpu', 'https://dfasde.csd.disa.mil/', 'SMAS', 'Standard Material Accounting System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47ml9c8911v6mzsmz41o7q', 'https://sms.transport.mil/', 'SMS', 'Single Mobility System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47n6p48943v6mz5jkmcejc', 'https://smt.altess.army.mil/smt/', 'SMT', 'Strategic Management Tool', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47o6ju8975v6mz92n52e9w', 'https://spires.wpafb.af.mil/', 'SPIRES', 'Special Packaging Instructions Retrieval and Exchange System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47p6fj9007v6mzjpcdlo7i', 'https://ssat.wpafb.af.mil/', 'SSAT-S', 'Strategic Sourcing Analysis Tool - Sustainment', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47pwsi9039v6mzrfugzfop', 'https://www.my.af.mil/langrsoprod/ssl/ssl', 'SSL', 'Software Sharing Library', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47qtcz9071v6mzxhuwe4jy', 'https://starsraw.a1vdc.us.af.mil/', 'STARS / RAW', 'Statistical Analysis & Retrievals System / Retrieval Applications Web', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47rlv99103v6mz1zleetug', 'https://suasman.sofapps.net/', 'SUASMAN', 'Small Unmanned Aircraft Systems Manager', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47t2vn9135v6mzd5mwq89e', 'https://www.t-cdp.hq.af.mil/Presentation/Authorization/Login.cfm', 'T-CDP', 'Transition - Civilian Development Plan', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47u56i9167v6mzrobv5tj6', 'https://www.my.af.mil/imdsltpa-tba/IMDSTWeb/ActionServlet', 'TBA', 'Training Business Area', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47v3tz9199v6mzzsqnst3u', 'https://www.my.af.mil/imdsltpa-upe/IMDSTWebPractice/ActionServlet', 'TBA UPE', 'Training Business Area User Practice Environment', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47vujh9231v6mzutobgrm5', 'https://tcoss.scott.af.mil/', 'TCOSS', 'Telecommunications Certifications Office Support System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47wgto9263v6mzftqb3851', 'https://tosune5.robins.af.mil/pdm_gateway/jsp/index.jsp', 'Technical Data Repository', 'Provides a single point of access to multiple technical data repositories at WR-ALC.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47wv349295v6mzrp785z8k', 'https://afpcsecure.us.af.mil/', 'TEMPO Tracker', 'To assist Air Force Commanders and others with the tracking and management of PERSTEMPO. ', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47xyiz9327v6mzx3ezfbzz', 'https://usafammo-training.cce.af.mil/', 'TICMS', 'Theater Integrated Combat Munitions System Training System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw47zklt9359v6mzkwpzk2d2', 'https://cognos.sso.cce.af.mil/apps/cognos8/cgi-bin/cognosisapi.dll', 'Tinker Cognos', 'Cognos Reporting Instance at Tinker AFB.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw480a2o9391v6mz64zj8jy4', 'https://www.my.af.mil/idmprod', 'Tinker IDM', 'Integrated Data for Maintenance', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw480owe9423v6mzk8qw0dly', 'https://www-tmds.c2.amc.af.mil/TMDS/', 'TMDS', 'Table Management Distribution System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw4821x59455v6mzv0cvo6nx', 'https://toap.sso.cce.af.mil/toap', 'TOAP', 'Technical Order Authoring and Publishing', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw482xlh9487v6mz4blrb0ib', 'https://app.tolsecuremessaging.com/', 'TOL Patient Portal Secure Messaging', 'A service that allows patients to take command of their healthcare by offering efficient electronic exchange between patients and their healthcare team.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw483q8c9519v6mzf9ar5qy4', 'https://trdmws.maf.ustranscom.mil/trdm/index.html', 'TRDM', 'TRANSCOM Reference Data Management', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw484cry9551v6mzxghpztg3', 'https://trips.safety.army.mil/', 'TRIPS', 'Travel Risk Planning System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw485nxp9583v6mzm4qnq8zg', 'http://www.tricare.mil/Welcome/Plans/TRS.aspx?sc_database=web', 'TRS', 'TRICARE Reserve Select', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw4863019615v6mzrq152pz1', 'https://www.ttms.us.af.mil/ttms/', 'TTMS', 'Technical Training Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw486vhj9647v6mz3po56xjn', 'http://www.ups.com/tracking/tracking.html', 'UPS', 'United Parcel Service', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw487g039679v6mzqg7h6xyw', 'http://www.ups-scs.com/', 'UPS Supply Chain Solutions', '(Commercial site) Detailed tracking information for your shipments.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48b1q59711v6mztp1hesdt', 'https://acspacs.wpafb.af.mil/PicomCloud/Default.aspx', 'USAF Central ECG Library Management System', 'USAF Central Electrocardiographic Libary Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48buw49743v6mzk4dtvbsx', 'http://www.usps.com/shipping/trackandconfirm.htm', 'USPS', 'United States Postal Service', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48ch9y9775v6mzq5bwqrc5', 'https://utapsweb.afrc.af.mil/utapsweb/', 'UTAPS', 'Unit Training Assembly Processing System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48d0cl9807v6mz9hmc55ow', 'https://intelshare.intelink.gov/sites/vemo/SitePages/Home.aspx', 'VEMO', 'Virtual Environment Management Office', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48emtc9839v6mzn0m472zm', 'https://www.dodtap.mil/login.html', 'VMET', 'Verification of Military Experience and Training', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48fj4z9871v6mzwyvwdhw7', 'https://afpcsecure.us.af.mil/', 'VOP', 'Virtual In/Out Processing', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48fzr59903v6mzu8e6jy1o', 'https://mypers.af.mil/app/processes/form/fn/vdb', 'vPC', 'Virtual Personnel Center', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48h49u9935v6mzgiepqp9x', 'https://afpcsecure.us.af.mil/', 'vPSC RBA', 'Virtual Personnel Services Center Role Based Access', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48hmuk9967v6mz1lu5l7df', 'https://www.my.af.mil/arcnetprod/ARCNet/VRS/Home/', 'VRS', 'Volunteer Reserve System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48idj89999v6mzhvpif89x', 'https://piee.eb.mil/', 'WAWF', 'Wide Area Workflow', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48j1z710031v6mz97eh5ij5', 'https://wdac-services.afwa.af.mil/sso/', 'WDA', 'Weather Data Analysis', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48jqyv10063v6mza2avnlv2', 'https://webccaralt.altess.army.mil/webccar/', 'Web CCaR', 'Web Comprehensive Cost and Requirements', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48kd0b10095v6mzttj6r6td', 'https://www.transactionservices.dla.mil/daashome/webvlips.asp', 'WEB VLIPS', 'WEB Visual Logistics Information Processing System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48kwcd10127v6mz4sy1lmhn', 'https://webi.ssg.gunter.af.mil/wi', 'Web-I', 'A personal gateway to information management primarily for Gunter personnel.', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48ljm210159v6mzop39l6dz', 'https://fp.logisticsinformationservice.dla.mil/', 'WebFLIS', 'Federal Logistics Information System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48lze710191v6mzi8pv061j', 'https://aflsa.jag.af.mil/apps/tflite/bin/index.php', 'WebFLITE Legal Research', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48mphe10223v6mza6p4o3z0', 'http://www.wedge.hpc.mil/', 'WEdge', 'Warfighter''s Edge', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48n8ti10255v6mzqc6u72y7', 'https://www.wgl.wpafb.af.mil/wgl/', 'WGL', 'Weighted Guidelines', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48o9cx10287v6mz8ht5s4fq', 'https://login.lcmp.af.mil/wlcmt/default.aspx', 'WLCMT', 'Weapons Load Crew Management Tool', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48ov7510319v6mzt75fveoc', 'https://wmsweb.afncr.af.mil/wms/', 'WMS', 'Warehouse Management System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48pmdt10351v6mzwjv0xrw1', 'https://aftoc.hill.af.mil/', 'WSCRS', 'Weapon System Cost Retrieval System', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48qewp10383v6mz0ms9dv0c', 'https://wsmisrealm.cce.af.mil/home.do', 'WSMIS REALM', 'Requirements / Execution Availability Logistics Module', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw48r35710415v6mzyb0mnslb', 'https://cafdex.us.af.mil/WSS/WSMS/', 'WSMS', 'Weapon System Management Support', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckw4g0mge11189v6mzqnu9vgti', 'https://www.af.mil/', 'AF.mil', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckwz3tphw1763ql97pia1zkvc', 'https://webmail.apps.mil/', 'Webmail', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckwz3u4461813ql970wkd254m', 'https://www.e-publishing.af.mil/', 'e-Publications', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckzqb72p000092cp9a52yz1gr', 'https://spacecamp.il2.dsop.io', 'Space Camp', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckzqb943t00392cp9rennu9vh', 'https://www2.peterson.af.mil/nssi', 'NSSI', 'National Security Space Institute', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckzqb9urh00542cp9m64csx14', 'https://digitalu.udemy.com', 'Digital University ', '','', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('ckzqbalpv00692cp9xznyz5vv', 'https://halfway.peterson.af.mil/stars/All/SurfOrRibbon', 'STARS', 'Space Talent Analysis & Requirements System ', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Bookmark"
    VALUES ('cl0mps26f0039x0p9qi14k7oh', 'https://www.dcpas.osd.mil/', 'DCPAS', 'Defense Civilian Personnel Advisory Service', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- Add existing Collections
-- id, title, showInSitesApps, created, modified
INSERT INTO "Collection"
    VALUES ('ckt3ce8ch0041q6978cs76832', 'Career', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Collection"
    VALUES ('cktd7cyuc0243w597xp1xuyj1', 'Personnel & Administration', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Collection"
    VALUES ('cktd7e7so0387w597jckip72l', 'Medical & Dental', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Collection"
    VALUES ('cktd7fe6t0493w597s0asrv2t', 'Life & Fitness', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Collection"
    VALUES ('cktd7tr2g0780w597127ytr4h', 'PCS', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Collection"
    VALUES ('cktd7uiow0903w5979nxcsf12', 'Finance & Travel', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Collection"
    VALUES ('cktd7vhca1032w597styp1wb5', 'Outprocessing', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Collection"
    VALUES ('cktd7wgp61181w5976koa85hl', 'Management', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Collection"
    VALUES ('cktd7wwk21308w597sm49rchs', 'vMPF', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Collection"
    VALUES ('ckw4fdpmk10632v6mz27mrlw7u', 'Supervisory', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Collection"
    VALUES ('ckw4fh9vl10763v6mz9lsb4j22', 'Education', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Collection"
    VALUES ('ckw4fjxwa10939v6mz76e99ia6', 'Public Social Platforms', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Collection"
    VALUES ('ckw4fzjbe11131v6mzn15fg22n', 'Public Military Websites', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "Collection"
    VALUES ('ckwz3u58s1835ql974leo1yll', 'Example Collection', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- Add bookmarks to collections
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7a1m70047w5977pa6qnr6', 'ckt3ce8ch0041q6978cs76832');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7ac7v0054w597niqq61jb', 'ckt3ce8ch0041q6978cs76832');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7ahef0061w597biuto0yc', 'ckt3ce8ch0041q6978cs76832');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7anq40068w597xloypsez', 'ckt3ce8ch0041q6978cs76832');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7aqyt0075w597bxgv2g24', 'ckt3ce8ch0041q6978cs76832');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7awdz0082w597p8o770za', 'ckt3ce8ch0041q6978cs76832');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7a1m70047w5977pa6qnr6', 'cktd7cyuc0243w597xp1xuyj1');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7c0d30190w597qoftevq1', 'cktd7cyuc0243w597xp1xuyj1');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7cpza0204w597pnothi98', 'cktd7cyuc0243w597xp1xuyj1');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7ct850211w597unm5sncx', 'cktd7cyuc0243w597xp1xuyj1');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7cy940218w597qfaa90m6', 'cktd7cyuc0243w597xp1xuyj1');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7ct850211w597unm5sncx', 'cktd7e7so0387w597jckip72l');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7dpms0328w597ry7ovgmb', 'cktd7e7so0387w597jckip72l');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7dwyi0351w597wu2eml5h', 'cktd7e7so0387w597jckip72l');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7e2tr0358w597t5j24os9', 'cktd7e7so0387w597jckip72l');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7e79v0365w597bn4ffa3r', 'cktd7e7so0387w597jckip72l');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7e2tr0358w597t5j24os9', 'cktd7fe6t0493w597s0asrv2t');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7ettn0457w597p7ja4uye', 'cktd7fe6t0493w597s0asrv2t');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7dpms0328w597ry7ovgmb', 'cktd7fe6t0493w597s0asrv2t');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7e79v0365w597bn4ffa3r', 'cktd7fe6t0493w597s0asrv2t');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7f1yq0480w597b32b06dx', 'cktd7fe6t0493w597s0asrv2t');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7hjz30636w5977vu4la4c', 'cktd7fe6t0493w597s0asrv2t');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7hoo80643w597sj13gjp8', 'cktd7fe6t0493w597s0asrv2t');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7ahef0061w597biuto0yc', 'cktd7tr2g0780w597127ytr4h');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7cy940218w597qfaa90m6', 'cktd7tr2g0780w597127ytr4h');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7t1ug0734w5978i3jocce', 'cktd7tr2g0780w597127ytr4h');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7tc7w0741w597oq8lx17u', 'cktd7tr2g0780w597127ytr4h');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7tgot0748w597hzdz4qvm', 'cktd7tr2g0780w597127ytr4h');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7tqcp0755w597fjgux36n', 'cktd7tr2g0780w597127ytr4h');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7hjz30636w5977vu4la4c', 'cktd7uiow0903w5979nxcsf12');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7hoo80643w597sj13gjp8', 'cktd7uiow0903w5979nxcsf12');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7tgot0748w597hzdz4qvm', 'cktd7uiow0903w5979nxcsf12');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7tqcp0755w597fjgux36n', 'cktd7uiow0903w5979nxcsf12');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7u8rr0871w597eg6ncqln', 'cktd7uiow0903w5979nxcsf12');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7ui590878w597f96dod7n', 'cktd7uiow0903w5979nxcsf12');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7ahef0061w597biuto0yc', 'cktd7vhca1032w597styp1wb5');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7cy940218w597qfaa90m6', 'cktd7vhca1032w597styp1wb5');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7t1ug0734w5978i3jocce', 'cktd7vhca1032w597styp1wb5');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7tc7w0741w597oq8lx17u', 'cktd7vhca1032w597styp1wb5');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7vc341000w597fmlr3crz', 'cktd7vhca1032w597styp1wb5');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7vgt31007w597gmme1i81', 'cktd7vhca1032w597styp1wb5');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7cpza0204w597pnothi98', 'cktd7wgp61181w5976koa85hl');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7e2tr0358w597t5j24os9', 'cktd7wgp61181w5976koa85hl');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7vv7s1135w597j1paf5sb', 'cktd7wgp61181w5976koa85hl');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7w1tx1142w5979y0mpqf3', 'cktd7wgp61181w5976koa85hl');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7w8z71149w597tlktd87j', 'cktd7wgp61181w5976koa85hl');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7wfz11156w59750jxc9ep', 'cktd7wgp61181w5976koa85hl');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7a1m70047w5977pa6qnr6', 'cktd7wwk21308w597sm49rchs');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7ac7v0054w597niqq61jb', 'cktd7wwk21308w597sm49rchs');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7aqyt0075w597bxgv2g24', 'cktd7wwk21308w597sm49rchs');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7awdz0082w597p8o770za', 'cktd7wwk21308w597sm49rchs');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7t1ug0734w5978i3jocce', 'cktd7wwk21308w597sm49rchs');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7cpza0204w597pnothi98', 'ckw4fdpmk10632v6mz27mrlw7u');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7e2tr0358w597t5j24os9', 'ckw4fdpmk10632v6mz27mrlw7u');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7vv7s1135w597j1paf5sb', 'ckw4fdpmk10632v6mz27mrlw7u');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7w1tx1142w5979y0mpqf3', 'ckw4fdpmk10632v6mz27mrlw7u');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7w8z71149w597tlktd87j', 'ckw4fdpmk10632v6mz27mrlw7u');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7wfz11156w59750jxc9ep', 'ckw4fdpmk10632v6mz27mrlw7u');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckw2nzg0y0708v6mziie1deum', 'ckw4fdpmk10632v6mz27mrlw7u');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckw2od1p30964v6mz59vyo9u7', 'ckw4fh9vl10763v6mz9lsb4j22');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckw2odume0996v6mz6zl3cw82', 'ckw4fh9vl10763v6mz9lsb4j22');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckw2p34lo1651v6mzhiyzt29p', 'ckw4fh9vl10763v6mz9lsb4j22');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckw2ny92c0644v6mztr8mgc8j', 'ckw4fjxwa10939v6mz76e99ia6');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckw2nypsa0676v6mzuq4rxug8', 'ckw4fjxwa10939v6mz76e99ia6');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckw2o1jrl0740v6mza1yym3qe', 'ckw4fjxwa10939v6mz76e99ia6');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckw2oesn11028v6mzxogl24qf', 'ckw4fjxwa10939v6mz76e99ia6');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckw2o469i0772v6mzm7ktxk1x', 'ckw4fzjbe11131v6mzn15fg22n');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckw2o5f8x0804v6mzspuuw5s7', 'ckw4fzjbe11131v6mzn15fg22n');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckw2o6iuk0836v6mzjbufxm9s', 'ckw4fzjbe11131v6mzn15fg22n');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckw2o7jtl0868v6mzhsuqawb6', 'ckw4fzjbe11131v6mzn15fg22n');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckw2o9ef00900v6mzv2mdpmi0', 'ckw4fzjbe11131v6mzn15fg22n');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckw2oc14u0932v6mzhjjisvr3', 'ckw4fzjbe11131v6mzn15fg22n');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckw4g0mge11189v6mzqnu9vgti', 'ckw4fzjbe11131v6mzn15fg22n');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7c0d30190w597qoftevq1', 'ckwz3u58s1835ql974leo1yll');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7ettn0457w597p7ja4uye', 'ckwz3u58s1835ql974leo1yll');
INSERT INTO "_Bookmark_collections"
    VALUES ('cktd7hjz30636w5977vu4la4c', 'ckwz3u58s1835ql974leo1yll');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckwz3tphw1763ql97pia1zkvc', 'ckwz3u58s1835ql974leo1yll');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckwz3u4461813ql970wkd254m', 'ckwz3u58s1835ql974leo1yll');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckw30zh754715v6mz12bv6wng', 'ckw4fh9vl10763v6mz9lsb4j22');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckzqb943t00392cp9rennu9vh', 'ckw4fh9vl10763v6mz9lsb4j22');
INSERT INTO "_Bookmark_collections"
    VALUES ('ckzqb9urh00542cp9m64csx14', 'ckw4fh9vl10763v6mz9lsb4j22');
COMMIT;


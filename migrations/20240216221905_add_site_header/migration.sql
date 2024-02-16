-- CreateTable
CREATE TABLE "SiteHeader" (
    "id" INTEGER NOT NULL,
    "buttonLabel" TEXT NOT NULL DEFAULT 'News',
    "buttonSource" TEXT NOT NULL DEFAULT '/news',
    "dropdownLabel" TEXT NOT NULL DEFAULT 'About us',
    "dropdownItem1Label" TEXT NOT NULL DEFAULT 'About the USSF',
    "dropdownItem1Source" TEXT NOT NULL DEFAULT '/about-us',
    "dropdownItem2Label" TEXT NOT NULL DEFAULT 'ORBIT blog',
    "dropdownItem2Source" TEXT NOT NULL DEFAULT '/about-us/orbit-blog',
    "dropdownItem3Label" TEXT NOT NULL DEFAULT '',
    "dropdownItem3Source" TEXT NOT NULL DEFAULT '',
    "dropdownItem4Label" TEXT NOT NULL DEFAULT '',
    "dropdownItem4Source" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "SiteHeader_pkey" PRIMARY KEY ("id")
);

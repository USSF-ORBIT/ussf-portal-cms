-- CreateTable
CREATE TABLE "SiteHeader" (
    "id" INTEGER NOT NULL,
    "buttonLabel" TEXT NOT NULL DEFAULT '',
    "buttonSource" TEXT NOT NULL DEFAULT '',
    "dropdownLabel" TEXT NOT NULL DEFAULT '',
    "dropdownItem1Label" TEXT NOT NULL DEFAULT '',
    "dropdownItem1Source" TEXT NOT NULL DEFAULT '',
    "dropdownItem2Label" TEXT NOT NULL DEFAULT '',
    "dropdownItem2Source" TEXT NOT NULL DEFAULT '',
    "dropdownItem3Label" TEXT NOT NULL DEFAULT '',
    "dropdownItem3Source" TEXT NOT NULL DEFAULT '',
    "dropdownItem4Label" TEXT NOT NULL DEFAULT '',
    "dropdownItem4Source" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "SiteHeader_pkey" PRIMARY KEY ("id")
);

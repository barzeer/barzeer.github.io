from datetime import datetime
import os
import re

URL_BASE = "https://barzeer.github.io/"
PARENT_RE = re.compile(r"^\.[/\\]")
INDEX_RE = re.compile(r"index.html$")


def main():
    file_list = []
    for root, dirs, files in os.walk("."):
        for filename in files:
            if filename.endswith(".html") and not filename.startswith("google"):
                add_file(file_list, root, filename)

    with open("sitemap.xml", "wt") as sitemap:
        print('<?xml version="1.0" encoding="UTF-8"?>', end="\n", file=sitemap)
        print('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                end="\n", file=sitemap)
        for url, mdate in sorted(file_list, key=lambda pair: pair[0]):
            print_file(sitemap, url, mdate)
        print("</urlset>", end="\n", file=sitemap)


def add_file(file_list, folder, filename):
    pathname = os.path.join(folder, filename)
    mtime = os.path.getmtime(pathname)
    mdate = datetime.fromtimestamp(mtime)
    pathname = PARENT_RE.sub("", pathname)
    pathname = pathname.replace("\\", "/")
    pathname = INDEX_RE.sub("", pathname)
    url = URL_BASE + pathname
    file_list.append((url, mdate))


def print_file(sitemap, url, mdate):
    print("  <url>", end="\n", file=sitemap)
    print(f"    <loc>{url}</loc>", end="\n", file=sitemap)
    print(f"    <lastmod>{mdate:%Y-%m-%d}</lastmod>", end="\n", file=sitemap)
    print("  </url>", end="\n", file=sitemap)


if __name__ == "__main__":
    main()

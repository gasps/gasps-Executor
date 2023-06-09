import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from "../consts";

export async function get() {
  const posts = await getCollection("executor");

  const feedItems = posts
    .filter((post) => post.data.isPublic !== false)
    .map((post) => ({
      ...post.data,
      // replace html tags from description
      description: post.data.description.replace(/(<([^>]+)>)/gi, ""),
      link: `/executor/${post.slug}/`,
      customData: `
      <image>${post.data.heroImage}</image>
      <category>${post.data.type}</category>`,
    }));

  const categories = ["Sirius", "Rayfield", "executor", "News", "Updates", "Announcements", "Newsroom"];

  const customData = `
        <generator>AstroJS</generator>
        <language>en</language>
        ${categories.map((category) => `<category>${category}</category>`).join("")}
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <ttl>60</ttl>
        <image>
            <url>https://executor.gasps.lol/placeholder-social.png</url>
            <title>${SITE_TITLE}</title>
            <link>${SITE_URL}</link>
        </image>
      `;

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: SITE_URL,
    feed_url: `${SITE_URL}/rss.xml`,
    customData,
    items: feedItems,
  });
}

import { BLOG_DESCRIPTION, BLOG_TITLE } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";
import RSS from "rss";

export async function GET() {
	const feed = new RSS({
		title: BLOG_TITLE,
		description: BLOG_DESCRIPTION,
	});

	const posts = await getBlogPostList();

	posts.forEach(post => {
		feed.item({
			title: post.title,
			description: post.abstract,
			date: post.publishedOn,
			url: `https://fake.com/${post.slug}`,
		});
	})

	return new Response(feed.xml({indent: true}),{
		headers: {
			'Content-Type':'application/xml',
		}
	});
}

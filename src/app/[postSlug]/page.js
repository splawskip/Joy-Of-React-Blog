import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';

import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CodeSnippet from '@/components/CodeSnippet';
import dynamic from 'next/dynamic';
import Spinner from '@/components/Spinner';

const DivisionGroupsDemo = dynamic(() => import('@/components/DivisionGroupsDemo'), {
	loading: Spinner
});
const CircularColorsDemo = dynamic(() => import('@/components/CircularColorsDemo'), {
	loading: Spinner
});

export async function generateMetadata({ params }) {
	const {frontmatter} = await loadBlogPost(params.postSlug);

	return {
	  title: `${frontmatter.title} - Post`,
	  description: frontmatter.abstract,
	};
  }

async function BlogPost({params}) {
	const {content, frontmatter} = await loadBlogPost(params.postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
		<MDXRemote
			source={content}
			components={{
				pre: CodeSnippet,
				DivisionGroupsDemo,
				CircularColorsDemo,
			}}
		></MDXRemote>
      </div>
    </article>
  );
}

export default BlogPost;

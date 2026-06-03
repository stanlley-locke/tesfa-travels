'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getPosts(publishedOnly: boolean = false) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, posts };
  } catch (error) {
    console.error('Failed to get posts:', error);
    return { success: false, error: 'Failed to retrieve posts' };
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });
    return { success: true, post };
  } catch (error) {
    console.error('Failed to get post:', error);
    return { success: false, error: 'Failed to retrieve post' };
  }
}

export async function createPost(data: {
  title: string;
  slug: string;
  content: string;
  image?: string;
  published?: boolean;
  authorName?: string;
}) {
  try {
    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        image: data.image,
        published: data.published ?? false,
        authorName: data.authorName || 'Tesfa Team',
      },
    });
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    return { success: true, post };
  } catch (error) {
    console.error('Failed to create post:', error);
    return { success: false, error: 'Failed to create post' };
  }
}

export async function updatePost(id: string, data: {
  title?: string;
  slug?: string;
  content?: string;
  image?: string;
  published?: boolean;
  authorName?: string;
}) {
  try {
    const post = await prisma.blogPost.update({
      where: { id },
      data,
    });
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    return { success: true, post };
  } catch (error) {
    console.error('Failed to update post:', error);
    return { success: false, error: 'Failed to update post' };
  }
}

export async function togglePublishStatus(id: string, published: boolean) {
  try {
    const post = await prisma.blogPost.update({
      where: { id },
      data: { published },
    });
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    return { success: true, post };
  } catch (error) {
    console.error('Failed to toggle post status:', error);
    return { success: false, error: 'Failed to toggle status' };
  }
}

export async function deletePost(id: string) {
  try {
    await prisma.blogPost.delete({
      where: { id },
    });
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete post:', error);
    return { success: false, error: 'Failed to delete post' };
  }
}

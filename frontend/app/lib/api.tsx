export async function fetchPosts() {
    const res = await fetch(`http://localhost:8000/api/posts/source/pedro/`);
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    return res.json();
}


  export async function fetchPostBySlug(slug: string) {
    const res = await fetch(`http://localhost:8000/api/posts/${slug}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch post with slug: ${slug}`);
    }
    
    const responseData = await res.json();
    
    // Return the post data from inside the response
    return responseData.data;
  }
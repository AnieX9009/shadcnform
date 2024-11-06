import { useState, useEffect } from 'react';
import postService from '../services/postService';
import UpdateModalComponent from './UpdateModalComponent';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button";

// Define types for posts
interface Post {
  _id: string;
  title: string;
  date: string;
  image: string;
}

const ShowComponent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts on mount
  const fetchPosts = async () => {
    const response = await postService.getPosts();
    setPosts(response.data.data);
  };

  useEffect(() => {
    fetchPosts();
  }, [posts]);

  // Delete post function
  const deletePost = async (id: string) => {
    const response = await postService.deletePost(id);
    if (response.data.success) {
      alert(response.data.msg);
      setPosts(posts.filter((post) => post._id !== id)); // Remove deleted post from state
    } else {
      alert('Failed to delete post');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Posts</CardTitle>
      </CardHeader>
      <CardContent>
        {posts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>
                    <img
                      src={`http://localhost:8000/api/postImages/${post.image}`}
                      alt="Post"
                      style={{ width: '100px' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => deletePost(post._id)}>
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <UpdateModalComponent id={post._id} title={post.title} date={post.date} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No posts available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ShowComponent;

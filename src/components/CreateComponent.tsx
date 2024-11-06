import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import postService from '../services/postService';

const CreateComponent: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await postService.create(formData);
      if (response.data.success) {
        setMessage('Post created successfully.');
      } else {
        setMessage('Post failed.');
      }

      setTimeout(() => setMessage(''), 2000);
      event.currentTarget.reset();
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImage(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div>
            <Label htmlFor="title">Post Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Enter post title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <br />
          <div>
            <Label htmlFor="date">Post Date</Label>
            <Input
              type="date"
              id="date"
              name="date"
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <br />
          <div>
            <Label htmlFor="image">Post Image</Label>
            <Input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </form>
      {message && <p>{message}</p>}
    </Card>
  );
};

export default CreateComponent;

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PostService from '../services/postService';

// Define props interface for TypeScript
interface UpdateModalProps {
  id: string;
  title: string;
  date: string;
}

const UpdateModalComponent: React.FC<UpdateModalProps> = ({ id, title: initialTitle, date: initialDate }) => {
  const [isShow, setIsShow] = useState(false);

  const toggleModal = () => {
    setIsShow(!isShow);
  };

  // Form state for title, date, and selected file
  const [title, setTitle] = useState(initialTitle);
  const [date, setDate] = useState(initialDate);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', title);
    formData.append('date', date);

    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const response = await PostService.update(formData);
      if (response.data.success) {
        alert(response.data.msg);
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      alert('Failed to update post');
    }

    toggleModal(); // Close modal after updating
  };

  return (
    <>
      <Dialog open={isShow} onOpenChange={toggleModal}>
        <DialogTrigger asChild>
          <Button onClick={toggleModal}>Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Post</DialogTitle>
            <DialogDescription>Make changes to your post below.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={title}
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <br />
            <div>
              <Label htmlFor="file">Post Image</Label>
              <Input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="destructive" onClick={toggleModal}>
                Close
              </Button>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateModalComponent;

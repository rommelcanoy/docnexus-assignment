import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";

import Input from "../Input";
import Modal from "../Modal";
import ImageUpload from "../ImageUpload";
import useUsers from "@/hooks/useUsers";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const { mutate: mutateFetchedUsers } = useUsers();
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    setProfileImage(currentUser?.profileImage)
    setCoverImage(currentUser?.coverImage)
    setName(currentUser?.name)
    setUsername(currentUser?.username)
    setBio(currentUser?.bio)
    setState(currentUser?.title)
    setCity(currentUser?.city)
    setState(currentUser?.state)
    setTitle(currentUser?.title)
  }, [currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.profileImage, currentUser?.coverImage, currentUser?.city, currentUser?.state, currentUser?.title]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch('/api/edit', { name, username, bio, profileImage, coverImage, city, state, title });
      mutateFetchedUser();
      mutateFetchedUsers();

      toast.success('Updated');

      editModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [editModal, name, username, bio, mutateFetchedUser, mutateFetchedUsers, profileImage, coverImage, city, state, title]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label="Upload profile image" />
      <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => setCoverImage(image)} label="Upload cover image" />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Job Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
      <Input
        placeholder="City"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        disabled={isLoading}
      />
      <Input
        placeholder="State"
        onChange={(e) => setState(e.target.value)}
        value={state}
        disabled={isLoading}
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
}

export default EditModal;

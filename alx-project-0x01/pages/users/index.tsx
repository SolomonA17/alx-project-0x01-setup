import { useState } from "react";
import Header from "@/components/layout/Header";
import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal"; // New modal component
import { UserProps } from "@/interfaces";

interface UsersPageProps {
  posts: UserProps[];
}

const Users: React.FC<UsersPageProps> = ({ posts }) => {
  const [users, setUsers] = useState<UserProps[]>(posts); // state for user list
  const [isModalOpen, setIsModalOpen] = useState(false); // modal visibility

  // Add user callback
  const handleAddUser = (newUser: UserProps) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setIsModalOpen(false); // close modal after adding
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">User Directory</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-700 px-4 py-2 rounded-full text-white"
          >
            Add User
          </button>
        </div>

        {/* User Modal */}
        {isModalOpen && (
          <UserModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddUser={handleAddUser}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user: UserProps, index: number) => (
            <UserCard key={index} {...user} />
          ))}
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const posts = await response.json();

  return {
    props: {
      posts,
    },
  };
}

export default Users;

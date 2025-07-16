import React, { useState } from "react";
import { UserData, UserModalProps } from "@/interfaces";

const UserModal: React.FC<UserModalProps> = ({ onClose, onSubmit }) => {
  const [user, setUser] = useState<UserData>({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    if (keys.length === 1) {
      setUser((prev) => ({ ...prev, [name]: value }));
    } else if (keys.length === 2) {
      setUser((prev) => ({
        ...prev,
        [keys[0]]: {
          ...(prev as any)[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else if (keys.length === 3) {
      setUser((prev) => ({
        ...prev,
        [keys[0]]: {
          ...(prev as any)[keys[0]],
          [keys[1]]: {
            ...(prev as any)[keys[0]][keys[1]],
            [keys[2]]: value,
          },
        },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center">
  <div className="bg-white rounded-xl p-4 w-full max-w-md text-sm">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New User</h2>
    <form onSubmit={handleSubmit} className="space-y-2">
      <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-1.5 border rounded text-sm" />
      <input type="text" name="username" placeholder="Username" onChange={handleChange} className="w-full p-1.5 border rounded text-sm" />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-1.5 border rounded text-sm" />
      
      <div className="grid grid-cols-2 gap-2">
        <input type="text" name="address.street" placeholder="Street" onChange={handleChange} className="p-1.5 border rounded text-sm" />
        <input type="text" name="address.suite" placeholder="Suite" onChange={handleChange} className="p-1.5 border rounded text-sm" />
        <input type="text" name="address.city" placeholder="City" onChange={handleChange} className="p-1.5 border rounded text-sm" />
        <input type="text" name="address.zipcode" placeholder="Zipcode" onChange={handleChange} className="p-1.5 border rounded text-sm" />
        <input type="text" name="address.geo.lat" placeholder="Latitude" onChange={handleChange} className="p-1.5 border rounded text-sm" />
        <input type="text" name="address.geo.lng" placeholder="Longitude" onChange={handleChange} className="p-1.5 border rounded text-sm" />
      </div>

      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-1.5 border rounded text-sm" />
      <input type="text" name="website" placeholder="Website" onChange={handleChange} className="w-full p-1.5 border rounded text-sm" />

      <input type="text" name="company.name" placeholder="Company Name" onChange={handleChange} className="w-full p-1.5 border rounded text-sm" />
      <input type="text" name="company.catchPhrase" placeholder="Catch Phrase" onChange={handleChange} className="w-full p-1.5 border rounded text-sm" />
      <input type="text" name="company.bs" placeholder="Business Strategy" onChange={handleChange} className="w-full p-1.5 border rounded text-sm" />

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onClose} className="text-gray-600 text-sm">Cancel</button>
        <button type="submit" className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm">Add User</button>
      </div>
    </form>
  </div>
</div>

  );
};

export default UserModal;

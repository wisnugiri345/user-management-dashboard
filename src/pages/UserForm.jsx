import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../store/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const users = useSelector((state) => state.users.users);
  const isEdit = !!id;
  const existingUser =
    users.find((user) => user.id === parseInt(id)) || {
      name: "",
      email: "",
      address: { street: "" },
      company: { name: "" },
    };

  const [formData, setFormData] = useState(existingUser);

  useEffect(() => {
    if (isEdit) {
      setFormData(existingUser);
    }
  }, [id, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      setFormData({
        ...formData,
        address: { ...formData.address, street: value },
      });
    } else if (name.includes("company.")) {
      setFormData({
        ...formData,
        company: { ...formData.company, name: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateUser({ ...formData, id: parseInt(id) }));
    } else {
      dispatch(addUser({ ...formData, id: Date.now() }));
    }
    navigate("/");
  };

  return (
    <div className="p-6 bg-white max-w-lg rounded-lg m-auto my-10 shadow">
      <h2 className="text-2xl font-bold mb-[20px] text-start">
        {isEdit ? "Edit User" : "Add User"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] border p-5 rounded-md">
        <Input
          name="name"
          label="Name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          label="Email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Address"
          name="address.street"
          placeholder="Address"
          value={formData.address.street}
          onChange={handleChange}
          required
        />
        <Input
        label="Company"
          name="company.name"
          placeholder="Company"
          value={formData.company.name}
          onChange={handleChange}
          required
        />
        <div className="flex justify-end gap-[20px] mt-10">
          <Button
            onClick={() => navigate("/")}
            variant={'outline'}
          >
            Cancel
          </Button>
          <Button
            type="submit"
          >
            {isEdit ? "Update" : "Add"} User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;

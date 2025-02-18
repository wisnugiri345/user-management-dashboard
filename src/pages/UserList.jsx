import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setSearchQuery, deleteUser } from "../store/userSlice";
import { fetchUsers } from "../services/userService";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, searchQuery } = useSelector((state) => state.users);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      dispatch(setUsers(data));
    };

    if (users.length === 0) {
      getUsers();
    }
  }, [dispatch, users]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      header: "ID",
      cell: ({ row }) => <span>{row.id}</span>,
    },
    {
      header: "Name",
      cell: ({ row }) => <span>{row.name}</span>,
    },
    {
      header: "Email",
      cell: ({ row }) => <span>{row.email}</span>,
    },
    {
      header: "Company",
      cell: ({ row }) => <span>{row.company?.name || "-"}</span>,
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2 items-center justify-center">
          <Button link={`/edit/${row.id}`}>
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="p-4 flex flex-col gap-[30px]">
      <h1 className="text-2xl font-bold">User Management Dashboard</h1>

      <div className="flex w-full">
        <div className="flex w-1/2">
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            className="w-full py-3 px-2 rounded-[6px] text-xs bg-[#F4F2FF] hover:border-1 outline-none hover:border-[#6E6893]  text-[#6E6893]"
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>

        <Button link="/add" className="ms-auto bg-primary rounded-[6px] text-[12px] text-white px-4 py-2 self-center">
          + Add User
        </Button>
      </div>

      <Table className="mt-4" data={filteredUsers} columns={columns} />
    </div>
  );
};

export default UserList;

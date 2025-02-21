import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "./App.css";

function UserManagement() {
  const [data, setData] = useState([
    { id: 1, name: "Ali", status: false },
    { id: 2, name: "Sara", status: true },
    { id: 3, name: "John", status: false },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    status: false,
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const openAddUserModal = () => {
    setIsEdit(false);
    setCurrentUser({ id: null, name: "", status: false });
    setIsModalOpen(true);
  };

  const openEditUserModal = (user) => {
    setIsEdit(true);
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) =>
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });

  const saveUser = () => {
    if (!currentUser.name.trim()) return;

    if (isEdit) {
      setData(
        data.map((user) => (user.id === currentUser.id ? currentUser : user))
      );
    } else {
      setData([...data, { ...currentUser, id: Date.now(), status: false }]);
    }
    closeModal();
  };

  const deleteUser = (id) => setData(data.filter((user) => user.id !== id));

  const toggleStatusByCheckbox = (id) => {
    setData(
      data.map((user) =>
        user.id === id ? { ...user, status: !user.status } : user
      )
    );
  };

  const filteredData = data.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "all" ||
        (filter === "active" && user.status) ||
        (filter === "inactive" && !user.status))
  );

  return (
    <Container
      maxWidth="sm"
      className="container"
      sx={{ py: 4, bgcolor: "#353331", borderRadius: 2, boxShadow: 3 }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#f0e68c" }}
      >
        User Management
      </Typography>
      <TextField
        fullWidth
        label="Search by name"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 2,
          color: "white",
          border: "1px solid grey",
          borderRadius: "6px",
          "&:focus": { borderColor: "grey" },
        }}
      />

      <Select
        fullWidth
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ mb: 2, color: "grey", border: "1px solid grey" }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </Select>
      <Button
        fullWidth
        variant="contained"
        onClick={openAddUserModal}
        sx={{ mb: 2 }}
      >
        + Add User
      </Button>

      {filteredData.length ? (
        filteredData.map((user) => (
          <Card
            key={user.id}
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              color:"grey",
              backgroundColor: "#333",
            }}
          >
            <CardContent>
              <Typography>{user.name}</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={user.status}
                    onChange={() => toggleStatusByCheckbox(user.id)}
                  />
                }
                label={user.status ? "Active" : "Inactive"}
              />
            </CardContent>
            <div>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => openEditUserModal(user)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => deleteUser(user.id)}
                sx={{ ml: 1 }}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <Typography align="center">No users found.</Typography>
      )}

      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>{isEdit ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            name="name"
            label="Enter user name"
            value={currentUser.name}
            onChange={handleInputChange}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={saveUser}
            variant="contained"
            sx={{
              backgroundColor: "yellow",
              color: "white",
              "&:hover": { backgroundColor: "darkred" },
            }}
          >
            {isEdit ? "Save Changes" : "Add User"}
          </Button>

          <Button 
  onClick={closeModal} 
  variant="contained" 
  sx={{ backgroundColor: "green", color: "white", "&:hover": { backgroundColor: "darkgreen" } }}
>
  Cancel
</Button>

        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default UserManagement;

import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../store/userSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "./Modal";

export default function List() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [editInput, setEditInput] = useState('');
    const [editId, setEditId] = useState('');
    const [modalType, setModalType] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [inputSearch, setInputSearch] = useState('');
    const users = useSelector((state) => state.user);

    const filteredUser = users.filter(user =>
        user.input.toLowerCase().includes(inputSearch.trim().toLowerCase()) ||
        (user.position && user.position.toLowerCase().includes(inputSearch.trim().toLowerCase()))
    )

    const deleteMsg = (message) => {
        toast.info(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
        })
    }

    const editMsg = () => {
        toast.success("Name edit successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true
        });
    }

    const handleDelete = (id) => {
        const selectedUser = users.find((u) => u.id === id);

        const parent = users.find((u) => u.parent === selectedUser.input);
        if (parent) {
            deleteMsg("Please remove all users under this person before deleting!");
            return;
        }
        setModalType("delete");
        setShowModal(true);
        setSelectedUserId(id);
    };

    const confirmationDelete = () => {
        dispatch(usersActions.deleteUsers(selectedUserId));
        setShowModal(false);
        deleteMsg("User Deleted Successfully!");
    }

    const handleEdit = (input, id) => {
        setShowModal(true);
        setModalType('edit');
        if (id) {
            setEditInput(input);
            setEditId(id);
        }
    }

    const handleUpdate = () => {
        if (editId) {
            dispatch(usersActions.editUser({ id: editId, input: editInput }));
        }
        setShowModal(false);
        editMsg();
    }

    return (
        <div className="w-full">
            <div className="flex justify-center items-center">
                <h2>Position Table</h2>
            </div>
            <div className="max-h-227 overflow-y-auto">
                <div className="mt-3 mb-2 mr-3 flex justify-start">
                    <input
                        type="text"
                        placeholder="Search by name or position."
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                        className="inputSearch border px-2 py-1 rounded w-1/2"
                    />
                </div>
                <table>
                    <thead className="table-head">
                        <tr>
                            <th>Sr No.</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Parent</th>
                            <th>Action</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUser.length === 0 ? (
                            <tr>
                                <td>No Record.</td>
                            </tr>
                        ) : (
                            filteredUser.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.input}</td>
                                    <td>{!user.position ? "--" : user.position}</td>
                                    <td>{!user.parent ? "--" : user.parent}</td>
                                    <td>
                                        <button
                                            className="deleteBtn bg-blue-300 rounded"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="deleteBtn bg-blue-400 rounded"
                                            onClick={() => handleEdit(user.input, user.id)}
                                            data-dialog-target="modal"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <Modal
                    modalType={modalType}
                    editInput={editInput}
                    setEditInput={setEditInput}
                    setShowModal={setShowModal}
                    handleUpdate={handleUpdate}
                    confirmationDelete={confirmationDelete}
                />
            )}

        </div>
    );
}

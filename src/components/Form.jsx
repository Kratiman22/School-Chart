import POSITION from "../Position.js";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from '../store/userSlice.js';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Form() {
    const id = uuidv4();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user);

    const formAdd = useForm({
        defaultValues: {
            input: "",
            position: ""
        }
    });

    const formParent = useForm({
        defaultValues: {
            parent: "",
            parentName: "",
            childName: "",
            childPosition: ""
        }
    });

    const userAdded = (message) => {
        toast.success(message, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true
        });
    }

    const positionAdded = () => {
        toast.success("Parent added successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
        });
    }

    const directorExists = users.find((u) => u.position === 'Director');
    const selectedParentPosition = formParent.watch("parent");
    const parentName = formParent.watch("parentName");
    const selectedChildPositon = formParent.watch("childPosition");

    useEffect(() => {
        formParent.setValue("childPosition", "");
    }, [formParent.setValue, selectedParentPosition]);
    
    useEffect(() => {
        formParent.setValue("parentName", "");
    }, [formParent, selectedParentPosition]);

    useEffect(() => {
        formParent.setValue("childName", "");
    }, [formParent, selectedChildPositon]);

    let childName = [];
    if (parentName) {
        childName = users.filter((u) => u.input !== parentName);
    }

    let childOption = [];
    if (selectedParentPosition) {
        const parentIndex = POSITION.indexOf(selectedParentPosition);
        if (parentIndex < POSITION.length - 1) {
            childOption = POSITION.slice(parentIndex + 1);
        }
    }

    const addUsersHandle = (data) => {
        const input = data.input;
        const position = data.position;

        dispatch(usersActions.addUsers({ id, input, position }));

        userAdded("User added successfully!");
        formAdd.reset();
    }

    const onSubmit = (data) => {

        const parentUser = users.find(u => u.input === data.parentName);

        if (data.parent !== "Director") {

            if (!parentUser || !parentUser.parent) {
                toast.info(
                    <p>
                        <b>{parentUser ? parentUser.input : "This user"}</b> doesn't have a parent. Add its parent first!
                    </p>,
                    {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true
                    }
                );
                return;
            }
        }

        dispatch(usersActions.setParentAndChild({
            parent: data.parent,
            parentName: data.parentName,
            childPosition: data.childPosition,
            childName: data.childName
        }));

        positionAdded();
        formParent.reset();
    }

    return (
        <div className="w-full">

            <div className="flex justify-center items-center mb-5">
                <h2>Position Input</h2>
            </div>
            <form onSubmit={formAdd.handleSubmit(addUsersHandle)}>
                <p className="form-input p-4">
                    <lable>Name: </lable>
                    <input type="text" name="name" {...formAdd.register("input", { required: "Name is required!" })} placeholder="Enter Name" className="input" />
                    {formAdd.formState.errors.input && <p style={{ color: 'red' }}>{formAdd.formState.errors.input.message}</p>}
                </p>

                <label>Position:

                    <select name="position" {...formAdd.register("position", { required: "Position is required!" })}>
                        <option value="" disabled>Select</option>
                        {POSITION.map((post, index) => (
                            <option key={index} value={post} disabled={post === 'Director' && directorExists?.position}>{post}</option>
                        ))}
                    </select>
                    {formAdd.formState.errors.position && <span>{formAdd.formState.errors.position.message}</span>}
                </label>
                <button type="submit" className="submit-btn">Save</button>
            </form>

            {/* SET PARENT AND CHILD FORM */}

            <div className="mt-2">

                <form onSubmit={formParent.handleSubmit(onSubmit)}>
                    <h2 className="text-center">Parent & Child </h2>
                    {/* PARENT */}

                    <label>Parent:

                        <select {...formParent.register("parent", { required: "Parent is required!" })} name="parent">
                            <option value="" disabled >Select</option>
                            {POSITION
                                .filter((u) => u !== "Student")
                                .map((post, index) => (
                                    <option key={index} value={post}>{post}</option>
                                ))}
                        </select>
                        {formParent.formState.errors.parent && <span>{formParent.formState.errors.parent.message}</span>}
                    </label>

                    {/* THE PARENT NAME */}
                    {/* IT SHOWS THE NAME OF THE PARENT THAT POSITION ARE SELECTED ABOVE. */}

                    <label>Parent Name:

                        <select {...formParent.register("parentName", { required: "Name is required!" })} name="parentName">
                            <option value="" disabled>Select</option>
                            {users.filter((u) => u.position === selectedParentPosition).map((u) => (
                                <option key={u.id} value={u.input}>{u.input}</option>
                            ))}
                        </select>
                        {formParent.formState.errors.parentName && <span>{formParent.formState.errors.parentName.message}</span>}
                    </label>

                    {/* UNDER POSITION(DESIGNATION) */}
                    {/* ITS SHOWS SELECT SHOWS THE POSITION OF THE CHILD WHICH WE WANT TO ASSIGN THAT CHILD */}

                    <label>Child:

                        <select {...formParent.register("childPosition", {
                            validate: value => {
                                if (users.length > 0 && !value) {
                                    return "Please select a parent for this position!";
                                }
                                return true;
                            }
                        })} name="childPosition">
                            <option value="" disabled >Select</option>
                            {childOption.length > 0 && childOption.map((u, idx) => (
                                <option key={idx} value={u}>{u}</option>
                            ))}
                        </select>
                        {formParent.formState.errors.childPosition && <span>{formParent.formState.errors.childPosition.message}</span>}
                    </label>

                    {/* THE UNDER PERSON NAME */}
                    {/* ITS SHOWS THE NAME OF THE PERSON THAT ARE WE GOING TO MAKE CHILD */}

                    <label>Child Name:

                        <select {...formParent.register("childName", { required: "Child Name is required!" })} name="childName">
                            <option value="" disabled>Select</option>
                            {childName.filter((u) => u.position === selectedChildPositon).map((childPersName) => (
                                <option key={childPersName.id} value={childPersName.input}>{childPersName.input}</option>
                            ))}
                        </select>
                        {formParent.formState.errors.childName && <span>{formParent.formState.errors.childName.message}</span>}
                    </label>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

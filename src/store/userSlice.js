import { createSlice } from "@reduxjs/toolkit";

let user = localStorage.getItem('users');

let initialState = user ? JSON.parse(user) : []

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUsers: (state, action) => {
            state.push(action.payload);
        },
        deleteUsers: (state, action) => {
            return state.filter((u) => u.id !== action.payload);
        },
        removeParent: (state, action) => {
            const userForChart = state.find((u) => u.id === action.payload);
            if(userForChart) {
                userForChart.parent = "";
            }
        },
        editUser: (state, action) => {
            const { id, input } = action.payload;
            const user = state.find((u) => u.id === id);
            if (user) {
                user.input = input;
            }
        },
        setParentAndChild: (state, action) => {
            const { parent, parentName, childPosition, childName } = action.payload;
            console.log("Parent: ", parent);
            console.log("parentName: ", parentName);
            console.log("childPosition: ", childPosition);
            console.log("childName: ", childName);
            console.log("user: ", user);
            // const user = state.find(u => u.input === userName);
            const childUser = state.find(u => u.input === childName);
            console.log("childUser: ", childUser);

            // if (user) {
            //     user.position = position;
            // }
            if (childUser) {
                childUser.parent = parentName;
            }
        },
    }
});

export const usersActions = userSlice.actions;
export default userSlice;

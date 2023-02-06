import React, { createContext, useContext, useState } from "react";
import { Auth, DataStore } from "aws-amplify";

import { User } from "../models";


import { auth, db } from "../../config";
const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
    const user = auth.currentUser;
    const uid = user?.uid;

    const [authUser, setAuthUser] = useState(null);
    const [dbUser, setDbUser] = useState(null);
    const sub = uid;

    React.useEffect(() => {
        setAuthUser(user)
    }, [user])

    React.useEffect(() => {
        user ? 
            db.collection("User").where("sub", "==", uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setDbUser(doc.data())
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })

         : []
       
    }, [uid]);


    return (
        <AuthContext.Provider value={{ authUser, dbUser, sub, setDbUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
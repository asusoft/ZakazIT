import React, { createContext, useContext, useState } from "react";
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
                .onSnapshot((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const dbUserData = doc.data()
                        const dbUserObject = { ...dbUserData, id: doc.id };
                        setDbUser(dbUserObject)
                    });
                })
            : []

    }, [uid]);

    const signOut = () => {
        auth
            .signOut()
            .then(function () {
                setAuthUser(null)
                setDbUser(null)
            })
            .catch(error => alert(error.message));
    };

    return (
        <AuthContext.Provider value={{ authUser, dbUser, sub, signOut, setDbUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
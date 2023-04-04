import { createContext, useState } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [userType, setUserType] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <MyContext.Provider
      value={{
        connected,
        setConnected,
        userid,
        setUserid,
        username,
        setUsername,
        email,
        setEmail,
        FirstName,
        setFirstName,
        LastName,
        setLastName,
        age,
        setAge,
        userType,
        setUserType,
        phone,
        setPhone,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;

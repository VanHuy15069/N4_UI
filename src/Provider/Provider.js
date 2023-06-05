import Login from '~/components/DefaultLayout/Login/Login';
import { useState, createContext } from 'react';
export const Context = createContext();
function Provider({ children }) {
    const [state, setState] = useState(false);
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);
    return (
        <Context.Provider value={[state, setState, user, setUser, show, setShow, page, setPage]}>
            {children}
            {show && <Login />}
        </Context.Provider>
    );
}
export default Provider;

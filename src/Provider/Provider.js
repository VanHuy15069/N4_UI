import Login from '~/components/DefaulLayout/Login/Login';
import { useState, createContext } from 'react';
export const Context = createContext();
function Provider({ children }) {
    const [state, setState] = useState(false);
    const [user, setUser] = useState();
    const [show, setShow] = useState(false);
    return (
        <Context.Provider value={[state, setState, user, setUser, show, setShow]}>
            {children}
            {show && <Login />}
        </Context.Provider>
    );
}
export default Provider;

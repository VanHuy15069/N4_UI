import { Routes, Route } from 'react-router-dom';
import { publicRoute } from './routes';
import { Fragment } from 'react';
import DefaultLayout from './components/DefaultLayout';
import { useContext, useEffect } from 'react';
import { Context } from './Provider/Provider';
function App() {
    const [, setSate, , setUser, , ,] = useContext(Context);
    //Xác thực người dùng đăng nhập
    useEffect(() => {
        const token = localStorage.getItem('token');
        const isUser = JSON.parse(localStorage.getItem('userLogin'));
        if (token) {
            setSate(true);
            setUser(isUser);
        } else {
            setSate(false);
            setUser();
        }
    }, [setUser, setSate]);
    return (
        <div className="App">
            <Routes>
                {publicRoute.map((route, index) => {
                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;

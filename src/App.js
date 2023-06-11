import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoute, adminRoute } from './routes';
import { Fragment } from 'react';
import DefaultLayout from './components/DefaultLayout';
import { useContext, useEffect } from 'react';
import { Context } from './Provider/Provider';
import AdminLayout from './components/AdminLayout';
import ProfileLayout from './components/ProfileLayout/ProfileLayout';
import ProfilePage from './Page/ProfilePage/ProfilePage';
import NoSlider from './components/NoSlider';
import Cart from './Page/Cart/Cart';
import PayPage from './Page/PayPage/PayPage';
import BillPage from './Page/Bill/BillPage';
function App() {
    const [, setSate, , setUser, , , ,] = useContext(Context);
    const isUser = JSON.parse(localStorage.getItem('userLogin'));
    let isAdmin = false;
    if (isUser) {
        isAdmin = isUser.admin;
    }
    //Xác thực người dùng đăng nhập
    useEffect(() => {
        const isUser = JSON.parse(localStorage.getItem('userLogin'));
        const token = localStorage.getItem('token');
        if (token) {
            setSate(true);
            setUser(isUser);
        } else {
            if (isUser) {
                localStorage.removeItem('userLogin');
            }
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
                {/* private route user */}
                <Route
                    path="/account"
                    element={
                        isUser ? (
                            <ProfileLayout>
                                <ProfilePage />
                            </ProfileLayout>
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/cart"
                    element={
                        isUser && (
                            <NoSlider>
                                <Cart />
                            </NoSlider>
                        )
                    }
                />
                <Route
                    path="/pay"
                    element={
                        isUser ? (
                            <NoSlider>
                                <PayPage />
                            </NoSlider>
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/pay/bill/:id"
                    element={
                        isUser ? (
                            <NoSlider>
                                <BillPage />
                            </NoSlider>
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                {/* Private route Admin */}
                {adminRoute.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                isAdmin ? (
                                    <AdminLayout>
                                        <Page />
                                    </AdminLayout>
                                ) : (
                                    <Navigate to="/" />
                                )
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;

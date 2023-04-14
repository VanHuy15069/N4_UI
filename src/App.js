import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoute } from './routes';
import { Fragment } from 'react';
import DefaultLayout from './components/DefaultLayout';
function App() {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

export default App;

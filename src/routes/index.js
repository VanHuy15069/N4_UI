import Home from '~/Page/Home/HomePage';
import Product from '~/Page/ProductNam/ProductNam';
import ProductNu from '~/Page/ProductNamNu/ProductNu';
import InformationProduct from '~/Page/InformationProduct/Information';
import NoSlider from '~/components/NoSlider';
import Review from '~/Page/Review/Review';
import Blogs from '~/Page/Blogs/Blogs';
import LienHe from '~/Page/LienHe/LienHe';
import Cart from '~/Page/Cart/Cart';
import Admin from '~/Page/Admin/Admin';
import UserManagementPage from '~/Page/userManagementPage/UserManagementPage';
import CategoryPage from '~/Page/CategoryPage/CategoryPage';
import ProductManagement from '~/Page/ProductManagement/ProductManagement';
const publicRoute = [
    { path: '/', component: Home },
    { path: '/product/nam', component: Product, layout: NoSlider },
    { path: '/product/nu', component: ProductNu, layout: NoSlider },
    { path: '/information/:id', component: InformationProduct, layout: NoSlider },
    { path: '/review', component: Review, layout: NoSlider },
    { path: '/blogs', component: Blogs, layout: NoSlider },
    { path: '/lien-he', component: LienHe, layout: NoSlider },
    { path: '/cart', component: Cart, layout: NoSlider },
];
const adminRoute = [
    { path: '/admin', component: Admin },
    { path: '/admin/user', component: UserManagementPage },
    { path: '/admin/category', component: CategoryPage },
    { path: '/admin/product', component: ProductManagement },
];
export { publicRoute, adminRoute };

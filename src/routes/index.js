import Home from '~/Page/Home/HomePage';
import Product from '~/Page/ProductNam/ProductNam';
import ProductNu from '~/Page/ProductNamNu/ProductNu';
import InformationProduct from '~/Page/InformationProduct/InformationProduct';
import NoSlider from '~/components/NoSlider';
import Review from '~/Page/Review/Review';
import Blogs from '~/Page/Blogs/Blogs';
import LienHe from '~/Page/LienHe/LienHe';
import Admin from '~/Page/Admin/Admin';
import UserManagementPage from '~/Page/userManagementPage/UserManagementPage';
import CategoryPage from '~/Page/CategoryPage/CategoryPage';
import ProductManagement from '~/Page/ProductManagement/ProductManagement';
import Feedback from '~/Page/Feedback/Feedback';
import ManageBlog from '~/Page/ManageBlogs/ManageBlog';
import InformationBlog from '~/Page/InformationBlog/InformationBlog';

import SearchResultPage from '~/Page/SearchResultPage/SearchResultPage';

const publicRoute = [
    { path: '/', component: Home },
    { path: '/product/nam', component: Product, layout: NoSlider },
    { path: '/product/nu', component: ProductNu, layout: NoSlider },
    { path: '/information/:id', component: InformationProduct, layout: NoSlider },
    { path: '/review', component: Review, layout: NoSlider },
    { path: '/blogs', component: Blogs, layout: NoSlider },
    { path: '/lien-he', component: LienHe, layout: NoSlider },
    { path: '/cart', component: Cart, layout: NoSlider },
    { path: '/informationBlog/:id', component: InformationBlog, layout: NoSlider },
    { path: '/search/:keyword', component: SearchResultPage, layout: NoSlider },
];
const adminRoute = [
    { path: '/admin', component: Admin },
    { path: '/admin/user', component: UserManagementPage },
    { path: '/admin/category', component: CategoryPage },
    { path: '/admin/product', component: ProductManagement },
    { path: '/admin/feedback', component: Feedback },
    { path: '/admin/manage_blogs', component: ManageBlog },
];
export { publicRoute, adminRoute };

import Home from '~/Page/Home';
import Product from '~/Page/ProductNam';
import ProductNu from '~/Page/ProductNamNu';
import InformationProduct from '~/Page/InformationProduct';
import NoSlider from '~/components/NoSlider';
import Review from '~/Page/Review/Review';
import Blogs from '~/Page/Blogs/Blogs';
import LienHe from '~/Page/LienHe/LienHe';
import Cart from '~/Page/Cart/Cart';
import AdminLayout from '~/components/AdminLayout';
import Admin from '~/Page/Admin/Admin';
const publicRoute = [
    { path: '/', component: Home },
    { path: '/product/nam', component: Product, layout: NoSlider },
    { path: '/product/nu', component: ProductNu, layout: NoSlider },
    { path: '/information', component: InformationProduct, layout: NoSlider },
    { path: '/review', component: Review, layout: NoSlider },
    { path: '/blogs', component: Blogs, layout: NoSlider },
    { path: '/lien-he', component: LienHe, layout: NoSlider },
    { path: '/cart', component: Cart, layout: NoSlider },
    { path: '/admin', component: Admin, layout: AdminLayout },
];
export { publicRoute };

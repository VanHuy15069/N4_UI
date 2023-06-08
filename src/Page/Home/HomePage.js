import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';
import ListProduct from '~/components/DefaultLayout/ListProduct/ListProduct';
import { useEffect, useState } from 'react';
import Banner from '~/components/DefaultLayout/Banner/Banner';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { bannerMale, bannerFemale } from '~/Images/images';
const cx = classNames.bind(styles);
function Home() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/v1/product/getProduct')
            .then((res) => {
                setProducts(res.data.product);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const featuredProducts = [...products];
    featuredProducts.sort((a, b) => b.price - a.price);
    const popularProducts = [...products];
    popularProducts.sort((a, b) => b.quantity - a.quantity);
    const curnons = products.filter((trademark) => trademark.supplier === 'Curnon');
    const nakzens = products.filter((trademark) => trademark.supplier === 'Nakzen');
    const rossinis = products.filter((trademark) => trademark.supplier === 'Rossini');
    const rolexs = products.filter((trademark) => trademark.supplier === 'Rolex');
    const julius = products.filter((trademark) => trademark.supplier === 'Julius');
    const newProducts = [...products];
    newProducts.sort((a, b) => b.id - a.id);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <Link to="/product/nam">
                    <Banner src={bannerMale} />
                </Link>
                <Link to="/product/nu">
                    <Banner src={bannerFemale} />
                </Link>
            </div>
            <ListProduct products={featuredProducts.slice(0, 8)} slidesPerView={4} title="Sản phẩm nổi bật" />
            <ListProduct products={newProducts.slice(0, 8)} slidesPerView={4} title="Sản phẩm mới nhất" />
            <ListProduct products={popularProducts.slice(0, 8)} slidesPerView={4} title="Sản phẩm phổ biến" />
            <ListProduct products={curnons.slice(0, 8)} slidesPerView={4} title="Thương hiệu Curnon " rewind />
            <ListProduct products={julius.slice(0, 8)} slidesPerView={4} title="Thương hiệu Julius" rewind />
            <ListProduct products={nakzens.slice(0, 8)} slidesPerView={4} title="Thương hiệu Nakzen" rewind />
            <ListProduct products={rolexs.slice(0, 8)} slidesPerView={4} title="Thương hiệu Rolex" rewind />
            <ListProduct products={rossinis.slice(0, 8)} slidesPerView={4} title="Thương hiệu Rossini" rewind />
        </div>
    );
}
export default Home;

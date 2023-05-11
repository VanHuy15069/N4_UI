import classNames from 'classnames/bind';
import styles from './ProductNam.module.scss';
import Products from '~/components/DefaultLayout/Products/Products';
import { useState, useEffect } from 'react';
import axios from 'axios';
const cx = classNames.bind(styles);
function ProductNam() {
    const [products, setProducts] = useState([]);
    const [category, setCategoty] = useState('');
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/v1/category/getCategoryMale')
            .then((res) => {
                setProducts(res.data.cate[0].ProductDetails);
                setCategoty(res.data.cate[0].name);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Products products={products} category={category} />
        </div>
    );
}
export default ProductNam;

import Products from '~/components/DefaultLayout/Products/Products';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductNu() {
    const [products, setProducts] = useState([]);
    const [category, setCategoty] = useState('');
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/v1/category/getCategoryFeMale')
            .then((res) => {
                setProducts(res.data.cate[0].ProductDetails);
                setCategoty(res.data.cate[0].name);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div>
            <Products products={products} category={category} />
        </div>
    );
}
export default ProductNu;

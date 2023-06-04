import classNames from 'classnames/bind';
import styles from './SearchResultPage.module.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from '~/components/DefaultLayout/ProductItem/ProductItem';
const cx = classNames.bind(styles);
function SearchResultPage() {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [isActive, setIsActive] = useState([true]);
    const numberPages = [];
    const active = [];
    const limit = 8;
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/v1/product/getTitle', {
                params: {
                    title: params.keyword,
                    limit: limit,
                    page: page,
                },
            })
            .then((res) => {
                setProducts(res.data.title.rows);
                setCount(res.data.title.count);
            })
            .catch((err) => console.log(err));
    }, [params.keyword, page]);
    for (let i = 1; i <= Math.ceil(count / limit); i++) {
        numberPages.push(i);
        active.push(false);
    }
    const handleClick = (index, e) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        setTimeout(() => {
            const value = e.target.value;
            setPage(value);
            active[0] = false;
            active[index] = true;
            setIsActive([...active]);
        }, 150);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-title')}>
                    Kết quả tìm kiếm cho: <span>{params.keyword}</span>
                </div>
            </div>
            {products.length > 0 ? (
                <div className={cx('resoult')}>
                    {products.map((product, index) => {
                        return (
                            <ProductItem
                                className={cx('item')}
                                key={index}
                                src={product.image}
                                title={product.title}
                                price={product.price}
                                id={product.id}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className={cx('no-products')}>Không tìm thấy kết quả phù hợp.</div>
            )}
            <div className={cx('page')}>
                {numberPages.map((number, index) => {
                    return numberPages.length > 1 ? (
                        <input
                            className={cx('input', { active: isActive[index] })}
                            key={index}
                            type="button"
                            value={number}
                            onClick={(e) => handleClick(index, e)}
                        />
                    ) : (
                        ''
                    );
                })}
            </div>
        </div>
    );
}
export default SearchResultPage;

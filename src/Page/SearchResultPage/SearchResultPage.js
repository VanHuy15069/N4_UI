import classNames from 'classnames/bind';
import styles from './SearchResultPage.module.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Context } from '~/Provider/Provider';
import axios from 'axios';
import ProductItem from '~/components/DefaultLayout/ProductItem/ProductItem';
const cx = classNames.bind(styles);
function SearchResultPage() {
    const [, , , , , , page, setPage] = useContext(Context);
    const params = useParams();
    const [products, setProducts] = useState([]);
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
                if (page === 1) {
                    setIsActive([true]);
                }
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
        const value = Number(e.target.value);
        setPage(value);
        active[index] = true;
        setIsActive([...active]);
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }, 100);
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

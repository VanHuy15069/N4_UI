import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import SideBar from '../SideBar/SideBar';
import ProductItem from '../ProductItem/ProductItem';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
const cx = classNames.bind(styles);
function Products({ products, category }) {
    const [value, setValue] = useState(1);
    const [array, setArray] = useState([]);
    const [tradeMark, setTradeMark] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage;
    const pageNumbers = [];
    const options = [...array];
    for (let i = 1; i <= Math.ceil(array.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    useEffect(() => {
        setArray([...products]);
    }, [products]);
    const handleClick = (e) => {
        setCurrentPage(e.target.value);
    };
    const getAll = () => {
        setArray([...products]);
        setValue(1);
        setTradeMark('');
    };
    const getNakzen = () => {
        const nakzens = products.filter((trademark) => trademark.supplier === 'Nakzen');
        setArray(nakzens);
        setTradeMark('Nakzen');
        setValue(1);
    };
    const getRossini = () => {
        const rossinies = products.filter((tradeMark) => tradeMark.supplier === 'Rossini');
        setArray(rossinies);
        setTradeMark('Rossini');
        setValue(1);
    };
    const getJulius = () => {
        const getJulius = products.filter((tradeMark) => tradeMark.supplier === 'Julius');
        setArray(getJulius);
        setTradeMark('Julius');
        setValue(1);
    };
    const getCurnon = () => {
        const curnons = products.filter((tradeMark) => tradeMark.supplier === 'Curnon');
        setArray(curnons);
        setTradeMark('Curnon');
        setValue(1);
    };
    const getRolex = () => {
        const rolexs = products.filter((tradeMark) => tradeMark.supplier === 'Rolex');
        setArray(rolexs);
        setTradeMark('Rolex');
        setValue(1);
    };
    const handleChange = (e) => {
        if (options.length > 0) {
            setValue(e.target.value);
            const value = Number(e.target.value);
            if (value === 1) {
                options.sort((a, b) => a.id - b.id);
            } else if (value === 2) {
                options.sort((a, b) => b.id - a.id);
            } else if (value === 3) {
                options.sort((a, b) => a.price - b.price);
            } else if (value === 4) {
                options.sort((a, b) => b.price - a.price);
            }
            setArray(options);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('title')}>
                    <Link to="/">
                        <span className={cx('link')}>Trang chủ</span>
                    </Link>{' '}
                    /{' '}
                    <span onClick={getAll} className={cx('desc')}>
                        {category}
                    </span>{' '}
                    {tradeMark ? <span className={cx('trademark')}>/ {tradeMark}</span> : ''}
                </h3>
                <select className={cx('select')} value={value} onChange={handleChange}>
                    <option value={1}>Thứ tự mặc định</option>
                    <option value={2}>Mới nhất</option>
                    <option value={3}>Thứ tự theo giá: thấp đến cao</option>
                    <option value={4}>Thứ tự theo giá: cao đến thấp</option>
                </select>
            </div>
            <div className={cx('container')}>
                <div className={cx('side-bar')}>
                    <SideBar
                        getAll={getAll}
                        getNakzen={getNakzen}
                        getRossini={getRossini}
                        getJulius={getJulius}
                        getCurnon={getCurnon}
                        getRolex={getRolex}
                    />
                </div>
                <div className={cx('content')}>
                    <div className={cx('list-products')}>
                        {array.length > 0 ? (
                            array.slice(firstIndex, lastIndex).map((product, index) => {
                                return (
                                    <ProductItem
                                        key={index}
                                        id={product.id}
                                        className={cx('item')}
                                        classNameImg
                                        src={product.image}
                                        title={product.title}
                                        price={product.price}
                                    />
                                );
                            })
                        ) : (
                            <div className={cx('no-product')}>
                                <p className={cx('text')}>Không có sản phẩm nào</p>
                            </div>
                        )}
                    </div>

                    <div className={cx('next-page')}>
                        <div className={cx('pagination')}>
                            {pageNumbers.map((num, index) => {
                                return pageNumbers.length > 1 ? (
                                    <input
                                        className={cx('input')}
                                        key={index}
                                        type="button"
                                        value={num}
                                        onClick={handleClick}
                                    />
                                ) : (
                                    ''
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Products;

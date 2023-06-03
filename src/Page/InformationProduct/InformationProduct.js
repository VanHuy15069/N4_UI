import classNames from 'classnames/bind';
import styles from './InformationProduct.module.scss';
import ListProduct from '~/components/DefaultLayout/ListProduct/ListProduct';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Context } from '~/Provider/Provider';
import axios from 'axios';
import ImageLayout from '~/components/DefaultLayout/ImageLayout/ImageLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function InformationProduct() {
    const params = useParams();
    const [, , user, , , setShow] = useContext(Context);
    const [showImg, setShowImg] = useState(false);
    const [count, setCount] = useState(1);
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});
    const [check, setCheck] = useState('');
    const [link, setLink] = useState('/product/nam');
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/v1/product/${params.id}`)
            .then((res) => {
                setCategory(res.data.data.details.ProductDetails);
                setProduct(res.data.data.details);
            })
            .catch((err) => console.log(err));
    }, [params]);
    useEffect(() => {
        if (category.id === 1) {
            setLink('/product/nam');
        } else if (category.id === 2) {
            setLink('/product/nu');
        }
    }, [category]);
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
    const CountUp = () => {
        if (count < product.quantity) {
            setCount((count) => count + 1);
        }
    };
    const CountDown = () => {
        if (count > 1) {
            setCount((count) => count - 1);
        }
    };
    const handleChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value)) {
            if (Number(value) >= 0 && Number(value) <= product.quantity) {
                setCount(Number(value));
            }
        }
    };
    const handleBlur = (e) => {
        if (Number(e.target.value) === 0) {
            setCount(1);
        }
    };
    const sameProducts = products.filter(
        (item) => item.supplier === product.supplier && item.categoryId === category.id && item.id !== product.id,
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            axios
                .post('http://localhost:5000/api/v1/order/addOder', {
                    userId: user.id,
                    productId: params.id,
                    quantity: count,
                    priceTotal: product.price,
                })
                .then(() => {
                    setCheck('Sản phẩm đã được thêm vào giỏ hàng của bạn!');
                })
                .catch((err) => console.log(err));
        } else {
            setShow(true);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-product')}>
                <div className={cx('product-detail')}>
                    <div className={cx('wrapper-img')} onClick={() => setShowImg(true)}>
                        {product.image && (
                            <img className={cx('img')} src={`http://localhost:5000/src/${product.image}`} alt="" />
                        )}
                    </div>
                    <div className={cx('information')}>
                        <div className={cx('header')}>
                            <Link to="/">
                                <span className={cx('header-title')}>TRANG CHỦ</span>
                            </Link>
                            {' / '}
                            <Link to={link}>
                                <span className={cx('header-title')}>{category.name}</span>
                            </Link>
                        </div>
                        <h2 className={cx('title')}>{product.title}</h2>
                        <div className={cx('line')}></div>
                        <div className={cx('price')}>{VND.format(product.price)}</div>
                        <div className={cx('desc')}>
                            <p className={cx('text')}>{product.summary}</p>
                            <ul className={cx('list-desc')}>
                                <li>Loại sản phẩm: {category.name}</li>
                                <li>Cân nặng: {product.weight}kg</li>
                                <li>Thương hiệu: {product.supplier}</li>
                            </ul>
                        </div>
                        <div className={cx('control')}>
                            <p className={cx('text', 'text-quantity')}>Số lượng còn: {product.quantity}</p>
                            <div className={cx('quantity')}>
                                <div className={cx('control-quantity')}>
                                    <button className={cx('btn-quantity')} onClick={CountDown}>
                                        -
                                    </button>
                                    <input
                                        className={cx('input-quantity')}
                                        type="text"
                                        value={count}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <button className={cx('btn-quantity')} onClick={CountUp}>
                                        +
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className={cx('btn-cart')}>
                                        <button className={cx('btn-add')} type="submit">
                                            Thêm vào giỏ
                                        </button>
                                    </div>
                                </form>
                            </div>
                            {check && (
                                <div className={cx('check')}>
                                    <span className={cx('icon-check')}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>{' '}
                                    {check}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx('same-products')}>
                    <h3 className={cx('same-products_title')}>SẢN PHẨM TƯƠNG TỰ</h3>
                    <ListProduct
                        products={sameProducts.slice(0, 10)}
                        classNameImg
                        rewind
                        slidesPerView={5}
                        onClick={handleScroll}
                        mTopNull
                        small
                    />
                </div>
            </div>
            {showImg && <ImageLayout src={product.image} title={product.title} onHihe={() => setShowImg(false)} />}
        </div>
    );
}
export default InformationProduct;

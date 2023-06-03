import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { useState, useEffect, useContext } from 'react';
import { Context } from '~/Provider/Provider';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import BoxMSG from '~/components/AdminLayout/BoxMSG/BoxMSG';
const cx = classNames.bind(styles);
function Cart() {
    const arrCart = [];
    const [allCart, setAllCart] = useState([]);
    const [oldValue, setOldValue] = useState();
    const [carts, setCarts] = useState([]);
    const [, , user, , ,] = useContext(Context);
    const [quantitys, setQuantitys] = useState([]);
    const [show, setShow] = useState(false);
    const [idCart, setIdCart] = useState();
    const [render, setRender] = useState(false);
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    useEffect(() => {
        if (user.id) {
            axios
                .get(`http://localhost:5000/api/v1/order/${user.id}`)
                .then((res) => {
                    const cartProducts = res.data.data.filter((element) => {
                        return element.productInfo !== null;
                    });
                    const quantity = res.data.data.map((item) => {
                        return item.quantity;
                    });
                    setOldValue(quantity);
                    setQuantitys(quantity);
                    setCarts(cartProducts);
                    setAllCart(res.data.data);
                })
                .catch((err) => console.log('Loi roi'));
        }
    }, [user.id, render]);
    const countUp = (index, cart) => {
        if (quantitys[index] < cart.productInfo.quantity) {
            quantitys[index]++;
            setQuantitys([...quantitys]);
        }
    };
    const countDown = (index) => {
        if (quantitys[index] > 1) {
            quantitys[index]--;
            setQuantitys([...quantitys]);
        }
    };
    const handleChange = (cart, index, e) => {
        const value = e.target.value;
        const arr = [...quantitys];
        if (!isNaN(value)) {
            if (Number(value) >= 0 && Number(value) <= cart.productInfo.quantity) {
                const inputCart = arrCart.map((item) => {
                    if (item.id === index) {
                        arrCart[index].quantity = Number(value);
                    }
                    return item.quantity;
                });
                arr[index] = inputCart[index];
                setQuantitys([...arr]);
            }
        }
    };
    const handleBlur = (index, e) => {
        if (Number(e.target.value) === 0) {
            quantitys[index] = oldValue[index];
            setQuantitys([...quantitys]);
        }
    };
    const handleShowFormDel = (id) => {
        setShow(true);
        setIdCart(id);
    };
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/api/v1/order/${id}`)
            .then(() => {
                setRender(!render);
                setShow(false);
            })
            .catch(() => alert('Không thể kết nối đến server!'));
    };
    useEffect(() => {
        allCart.forEach((element) => {
            if (element.productInfo === null) {
                axios.delete(`http://localhost:5000/api/v1/order/${element.id}`);
            }
        });
    }, [allCart]);
    const priceSum = carts.reduce((sum, cart) => {
        return sum + cart.quantity * cart.productInfo.price;
    }, 0);
    return (
        <div className={cx('wrapper')}>
            {carts.length > 0 ? (
                <div className={cx('cart-list')}>
                    <div className={cx('cart')}>
                        <div className={cx('data-table')}>
                            <table className={cx('table')}>
                                <thead>
                                    <tr className={cx('header-table')}>
                                        <th colSpan={3} className={cx('product-title')}>
                                            Sản phẩm
                                        </th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Tổng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carts.map((cart, index) => {
                                        const obj = {};
                                        obj['id'] = index;
                                        obj['quantity'] = cart.quantity;
                                        arrCart.push(obj);
                                        return (
                                            <tr key={index}>
                                                <td className={cx('icon')} onClick={() => handleShowFormDel(cart.id)}>
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </td>
                                                <td className={cx('col-img')}>
                                                    <Link to={`/information/${cart.productId}`}>
                                                        <img
                                                            className={cx('img')}
                                                            src={`http://localhost:5000/src/${cart.productInfo.image}`}
                                                            alt=""
                                                        />
                                                    </Link>
                                                </td>
                                                <td className={cx('product-name')}>
                                                    <Link to={`/information/${cart.productId}`}>
                                                        {cart.productInfo.title}
                                                    </Link>
                                                </td>
                                                <td className={cx('price')}>{VND.format(cart.productInfo.price)}</td>
                                                <td>
                                                    <div className={cx('control-quantity')}>
                                                        <button
                                                            className={cx('btn-quantity')}
                                                            onClick={() => countDown(index)}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            className={cx('input-quantity')}
                                                            type="text"
                                                            value={quantitys[index]}
                                                            onChange={(e) => handleChange(cart, index, e)}
                                                            onBlur={(e) => handleBlur(index, e)}
                                                        />
                                                        <button
                                                            className={cx('btn-quantity')}
                                                            onClick={() => countUp(index, cart)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className={cx('price')}>
                                                    {VND.format(cart.quantity * cart.productInfo.price)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className={cx('button')}>
                            <Link to="/">
                                <button className={cx('back')}>
                                    <span className={cx('icon-back')}>
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                    </span>
                                    <span>Tiếp tuc xem sản phẩm</span>
                                </button>
                            </Link>
                            <button className={cx('btn-update')}>Cập nhật giỏ hàng</button>
                        </div>
                    </div>
                    <div className={cx('order')}>
                        <table className={cx('table', 'table-order')}>
                            <thead>
                                <tr className={cx('header-table')}>
                                    <th colSpan={2} className={cx('product-title')}>
                                        Tổng số lượng
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tổng phụ</td>
                                    <td className={cx('price')}>{VND.format(priceSum)}</td>
                                </tr>
                                <tr>
                                    <td>Giao hàng</td>
                                    <td>
                                        <div className={cx('desc')}>Giao hàng miễn phí</div>
                                        <div className={cx('desc')}>
                                            Ước tính cho <span>Việt Nam (VND)</span>
                                        </div>
                                        <div className={cx('desc')}>Giao hàng nhanh chóng</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tổng</td>
                                    <td className={cx('price')}>{VND.format(priceSum)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={cx('pay')}>
                            <Link to="/pay">
                                <div className={cx('pay-btn')}>TIẾN HÀNH THANH TOÁN</div>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('empty-cart')}>
                    <p className={cx('text')}>Chưa có sản phẩm nào trong giỏ hàng.</p>
                    <Link to="/">
                        <button className={cx('btn-back')}>Quay trở lại cửa hàng</button>
                    </Link>
                </div>
            )}
            {show && (
                <BoxMSG control onClickHide={() => setShow(false)} onClickOK={() => handleDelete(idCart)}>
                    <div className={cx('notification')}>Đừng mà! Xin bạn đấy</div>
                </BoxMSG>
            )}
        </div>
    );
}
export default Cart;

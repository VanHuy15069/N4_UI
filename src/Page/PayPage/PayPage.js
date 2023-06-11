import classNames from 'classnames/bind';
import styles from './PayPage.module.scss';
import { useContext, useEffect, useState } from 'react';
import { Context } from '~/Provider/Provider';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function PayPage() {
    const navigate = useNavigate();
    const [, , user, , , , ,] = useContext(Context);
    const [products, setProducts] = useState([]);
    const [data, setData] = useState({
        fullName: '',
        address: '',
        phoneNumber: '',
        email: '',
        note: '',
        status: 'Chờ duyệt',
    });
    const { fullName, address, phoneNumber, email, note } = data;
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/v1/order/${user.id}`)
            .then((res) => {
                setProducts(res.data.data);
            })
            .catch((err) => console.log(err));
    }, [user.id]);
    const priceSum = products.reduce((sum, product) => {
        return sum + product.quantity * product.productInfo.price;
    }, 0);
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/v1/orderDetails/addOrderDetails', { userId: user.id, ...data })
            .then((res) => {
                products.forEach((element) => {
                    axios
                        .put(`http://localhost:5000/api/v1/order/${element.id}`, {
                            deleted: 1,
                            quantity: element.quantity,
                        })

                        .catch((err) => console.log(err));
                });

                navigate(`/pay/bill/${res.data.orderDetails.id}`);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className={cx('wrapper')}>
            {products.length > 0 ? (
                <form onSubmit={handleSubmit}>
                    <div className={cx('container')}>
                        <div className={cx('information')}>
                            <h3 className={cx('header')}>THÔNG TIN THANH TOÁN</h3>
                            <div className={cx('form')}>
                                <div className={cx('box')}>
                                    <p className={cx('text')}>Họ và tên</p>
                                    <input
                                        className={cx('input')}
                                        type="text"
                                        value={fullName}
                                        name="fullName"
                                        onChange={handleChange}
                                        placeholder="Họ và tên"
                                    />
                                </div>
                                <div className={cx('box')}>
                                    <p className={cx('text')}>Địa chỉ</p>
                                    <input
                                        className={cx('input')}
                                        type="text"
                                        value={address}
                                        name="address"
                                        onChange={handleChange}
                                        placeholder="Địa chỉ"
                                    />
                                </div>
                                <div className={cx('box')}>
                                    <p className={cx('text')}>Số điện thoại</p>
                                    <input
                                        className={cx('input')}
                                        type="text"
                                        value={phoneNumber}
                                        name="phoneNumber"
                                        onChange={handleChange}
                                        placeholder="Số điện thoại"
                                    />
                                </div>
                                <div className={cx('box')}>
                                    <p className={cx('text')}>Email</p>
                                    <input
                                        className={cx('input')}
                                        type="email"
                                        value={email}
                                        name="email"
                                        onChange={handleChange}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className={cx('box')}>
                                    <p className={cx('text')}>Ghi chú đơn hàng (tuỳ chọn)</p>
                                    <textarea
                                        rows="5"
                                        className={cx('input', 'input-are')}
                                        value={note}
                                        name="note"
                                        type="text"
                                        onChange={handleChange}
                                        placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('bill')}>
                            <div className={cx('wrapper-bill')}>
                                <div className={cx('bill-info')}>
                                    <div className={cx('data-table')}>
                                        <h3>ĐƠN HÀNG CỦA BẠN</h3>
                                        <table className={cx('table')}>
                                            <thead>
                                                <tr className={cx('boder-bold', 'primary')}>
                                                    <th>SẢN PHẨM</th>
                                                    <th>TỔNG</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map((product, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className={cx('product-item')}>
                                                                <p className={cx('product-title')}>
                                                                    {product.productInfo.title}
                                                                </p>
                                                                <div
                                                                    className={cx('quantity')}
                                                                >{` × ${product.quantity}`}</div>
                                                            </td>
                                                            <td className={cx('bold')}>
                                                                {VND.format(
                                                                    product.productInfo.price * product.quantity,
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                <tr>
                                                    <td className={cx('primary')}>Tổng phụ</td>
                                                    <td className={cx('bold')}>{VND.format(priceSum)}</td>
                                                </tr>
                                                <tr>
                                                    <td className={cx('bold', 'not-back')}>Giao hàng</td>
                                                    <td>Giao hàng miễn phí</td>
                                                </tr>
                                                <tr className={cx('boder-bold', 'primary')}>
                                                    <td>Tổng</td>
                                                    <td className={cx('bold')}>{VND.format(priceSum)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button className={cx('btn-pay')} type="submit">
                                            Đặt hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className={cx('empty')}>
                    <p className={cx('text-empty')}>Không thể thanh toán khi không có sản phẩm nào trong giỏ hàng.</p>
                    <Link to="/">
                        <button className={cx('btn-back')}>Quay về cửa hàng</button>
                    </Link>
                </div>
            )}
        </div>
    );
}
export default PayPage;

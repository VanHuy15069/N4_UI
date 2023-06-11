import classNames from 'classnames/bind';
import styles from './BillPage.module.scss';
import { useEffect, useState, useContext } from 'react';
import { Context } from '~/Provider/Provider';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const cx = classNames.bind(styles);
function BillPage() {
    const params = useParams();
    const [, , user, , , , ,] = useContext(Context);
    const [products, setProducts] = useState([]);
    const [bill, setBill] = useState({});
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const format = new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/v1/order/${user.id}`)
            .then((res) => {
                const orderProducts = res.data.data.filter((item) => item.deleted === true);
                setProducts(orderProducts);
            })
            .catch((err) => console.log(err));
    }, [user.id]);
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/v1/orderDetails/${params.id}}`)
            .then((res) => setBill(res.data.data))
            .catch((err) => console.log(err));
    }, [params.id]);
    const priceSum = products.reduce((sum, product) => {
        return sum + product.quantity * product.productInfo.price;
    }, 0);
    return (
        <div className={cx('wrapper')}>
            {bill && bill.userId === user.id ? (
                <div className={cx('container')}>
                    <div className={cx('order-detail')}>
                        <h2 className={cx('header')}>Chi tiết đơn hàng</h2>
                        <div className={cx('data-table')}>
                            <table className={cx('table')}>
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Tổng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className={cx('product-item')}>
                                                    <p className={cx('product-title')}>{product.productInfo.title}</p>
                                                    <div className={cx('quantity')}>{` × ${product.quantity}`}</div>
                                                </td>
                                                <td className={cx('bold')}>
                                                    {VND.format(product.productInfo.price * product.quantity)}
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
                                    <tr>
                                        <td className={cx('bold', 'not-back')}>Phương thức thanh toán</td>
                                        <td>Trả tiền mặt khi nhận hàng</td>
                                    </tr>
                                    <tr className={cx('boder-bold', 'primary')}>
                                        <td>Tổng</td>
                                        <td className={cx('bold')}>{VND.format(priceSum)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={cx('bill')}>
                        <div className={cx('wrapper-bill')}>
                            <div className={cx('thanks')}>Cảm ơn bạn. Đơn hàng của bạn đã được nhận.</div>
                            <ul className={cx('list-bill')}>
                                <li>
                                    Mã đơn hàng: <span className={cx('strong')}>{params.id}</span>
                                </li>
                                <li>
                                    Ngày:{' '}
                                    {bill.createdAt && (
                                        <span className={cx('strong')}>
                                            {format.format(Date.parse(bill.createdAt))}
                                        </span>
                                    )}
                                </li>
                                <li>
                                    Tổng cộng: <span className={cx('strong')}>{VND.format(priceSum)}</span>
                                </li>
                                <li>
                                    Phương thức thanh toán:{' '}
                                    <span className={cx('strong')}>Trả tiền mặt khi nhận hàng</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('order-null')}>
                    <p>Đơn hàng này không tồn tại.</p>
                    <Link to="/">
                        <button className={cx('btn-back')}>Quay trở lại cửa hàng</button>
                    </Link>
                </div>
            )}
        </div>
    );
}
export default BillPage;

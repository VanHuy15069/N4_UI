import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';
import { useState, useEffect, useContext } from 'react';
import { Context } from '~/Provider/Provider';
import axios from 'axios';
import BoxMSG from '~/components/AdminLayout/BoxMSG/BoxMSG';
import TableDetails from '~/components/TableDetails/TableDetails';
const cx = classNames.bind(styles);
function ProfilePage() {
    const [, , user, , , , ,] = useContext(Context);
    const [data, setData] = useState([]);
    const [products, setProducts] = useState([]);
    const [currenOrder, setCurrunOrder] = useState({});
    const [show, setShow] = useState(false);
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
            .get('http://localhost:5000/api/v1/orderDetails/getOrderDetails/getAll')
            .then((res) => {
                setData(res.data.orders);
            })
            .catch((err) => console.log(err));
    }, []);
    const userOrder = data.filter((item) => item.userId === user.id);
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/v1/order/${user.id}`)
            .then((res) => {
                const oderProducts = res.data.data.filter((item) => item.deleted === true);
                setProducts(oderProducts);
            })
            .catch((err) => console.log(err));
    }, [user.id]);
    const priceSum = products.reduce((sum, product) => {
        return sum + product.quantity * product.productInfo.price;
    }, 0);
    const handleClick = (item) => {
        setCurrunOrder(item);
        setShow(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h3 className={cx('title')}>Danh sách đơn hàng</h3>
                <div className={cx('orders')}>
                    {data.length > 0 ? (
                        <div className={cx('data-table')}>
                            <table className={cx('table')}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Ngày tạo</th>
                                        <th>Giá trị đơn hàng</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userOrder.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{format.format(Date.parse(item.createdAt))}</td>
                                                <td>{VND.format(priceSum)}</td>
                                                <td>{item.status}</td>
                                                <td className={cx('action')}>
                                                    <span onClick={() => handleClick(item)}>Xem</span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className={cx('body')}>Không có đơn hàng nào</div>
                    )}
                </div>
            </div>
            {show && (
                <BoxMSG maxWidth onClickHide={() => setShow(false)}>
                    <TableDetails products={products} priceSum={priceSum} note={currenOrder.note} />
                </BoxMSG>
            )}
        </div>
    );
}
export default ProfilePage;

import classNames from 'classnames/bind';
import styles from './OrderManagement.module.scss';
import Wrapper from '~/components/Wrapper/Wrapper';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import BoxMSG from '~/components/AdminLayout/BoxMSG/BoxMSG';
import TableDetails from '~/components/TableDetails/TableDetails';
const cx = classNames.bind(styles);

function OrderManagement() {
    const [data, setData] = useState([]);
    const [currunOrder, setCurrunOrder] = useState({});
    const [products, setProducts] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [accept, setAccpect] = useState(false);
    const [cancleOrder, setCancleOrder] = useState(false);
    const [orderAccpect, setOrderAcpect] = useState({});
    const [render, setRender] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/v1/orderDetails/getOrderDetails/getAll')
            .then((res) => {
                setData(res.data.orders);
            })
            .catch((err) => console.log(err));
    }, [render]);
    useEffect(() => {
        if (currunOrder.userId) {
            axios
                .get(`http://localhost:5000/api/v1/order/${currunOrder.userId}`)
                .then((res) => {
                    const oderProducts = res.data.data.filter((item) => item.deleted === true);
                    setProducts(oderProducts);
                })
                .catch((err) => console.log(err));
        }
    }, [currunOrder.userId]);
    const priceSum = products.reduce((sum, product) => {
        return sum + product.quantity * product.productInfo.price;
    }, 0);
    const handleDetail = (order) => {
        setCurrunOrder(order);
        setShowDetails(true);
    };
    const handleShowAccpect = (order) => {
        if (order.status === 'Chờ duyệt') {
            setAccpect(true);
            setOrderAcpect(order);
        }
    };
    const handleShowCancle = (order) => {
        if (order.status === 'Chờ duyệt') {
            setCancleOrder(true);
            setOrderAcpect(order);
        }
    };
    const handleAccpect = () => {
        axios
            .put(`http://localhost:5000/api/v1/orderDetails/${orderAccpect.id}`, { status: 'Đã duyệt' })
            .then(() => {
                setRender(!render);
                setAccpect(false);
            })
            .catch((err) => console.log(err));
    };
    const handleCancle = () => {
        axios
            .put(`http://localhost:5000/api/v1/orderDetails/${orderAccpect.id}`, { status: 'Bị hủy' })
            .then(() => {
                setRender(!render);
                setCancleOrder(false);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className={cx('wrapper')}>
            <Wrapper header="Danh sách đơn hàng" icon={faShoppingCart}>
                <div className={cx('container')}>
                    <div className={cx('data-table')}>
                        <table className={cx('table')}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Khách hàng</th>
                                    <th>Địa chỉ</th>
                                    <th>Số điện thoại</th>
                                    <th>Email</th>
                                    <th>Trạng thái</th>
                                    <th colSpan={3}>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((order, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{order.id}</td>
                                            <td>{order.fullName}</td>
                                            <td>{order.address}</td>
                                            <td>{order.phoneNumber}</td>
                                            <td>{order.email}</td>
                                            <td>{order.status}</td>
                                            <td className={cx('action')}>
                                                <button className={cx('btn')} onClick={() => handleDetail(order)}>
                                                    <span className={cx('icon-btn')}>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </span>
                                                    Xem
                                                </button>
                                            </td>
                                            <td className={cx('action')}>
                                                <button
                                                    className={cx('btn', 'btn-accpect')}
                                                    onClick={() => handleShowAccpect(order)}
                                                >
                                                    <span className={cx('icon-btn')}>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </span>
                                                    Duyệt
                                                </button>
                                            </td>
                                            <td className={cx('action')}>
                                                <button
                                                    className={cx('btn', 'btn-delete')}
                                                    onClick={() => handleShowCancle(order)}
                                                >
                                                    <span className={cx('icon-btn')}>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </span>
                                                    Hủy
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Wrapper>
            {showDetails && (
                <BoxMSG maxWidth onClickHide={() => setShowDetails(false)}>
                    <TableDetails products={products} priceSum={priceSum} note={currunOrder.note} />
                </BoxMSG>
            )}
            {accept && (
                <BoxMSG control maxWidth onClickHide={() => setAccpect(false)} onClickOK={handleAccpect}>
                    <p className={cx('text-msg')}>Duyệt đơn hàng này</p>
                </BoxMSG>
            )}
            {cancleOrder && (
                <BoxMSG control maxWidth onClickHide={() => setCancleOrder(false)} onClickOK={handleCancle}>
                    <p className={cx('text-msg')}> Hủy đơn hàng này</p>
                </BoxMSG>
            )}
        </div>
    );
}
export default OrderManagement;

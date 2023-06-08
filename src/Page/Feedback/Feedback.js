import classNames from 'classnames/bind';
import styles from './Feedback.module.scss';
import Wrapper from '~/components/Wrapper/Wrapper';
import { useState, useEffect } from 'react';
import { faComment, faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import BoxMSG from '~/components/AdminLayout/BoxMSG/BoxMSG';

const cx = classNames.bind(styles);

function Feedback() {
    const [feedback, setFeedback] = useState([]);
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [render, setRender] = useState(false);
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/v1/contact/getContact')
            .then((res) => {
                setFeedback(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [render]);
    const showBoxDel = (item) => {
        setShow(true);
        setUser(item);
    };
    const handleDelete = () => {
        axios
            .delete(`http://localhost:5000/api/v1/contact/${user.id}`)
            .then(() => {
                setRender(!render);
                setShow(false);
            })
            .catch(() => {
                alert('Lỗi server!');
            });
    };
    const showNote = (item) => {
        setShowDetail(true);
        setUser(item);
    };
    return (
        <div className={cx('wrapper')}>
            <Wrapper header="Phản hồi khách hàng" icon={faComment}>
                <div className={cx('data-table')}>
                    <table className={cx('table')}>
                        <tbody>
                            <tr>
                                <th>Khách hàng</th>
                                <th>Email</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th colSpan={2}>Phản hồi</th>
                                <th colSpan={2}>Thao tác</th>
                            </tr>
                            {feedback.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.fullName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td className={cx('over')}>{item.note}</td>
                                        <td>
                                            <button className={cx('btn', 'btn-detail')} onClick={() => showNote(item)}>
                                                <span className={cx('icon-btn')}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </span>
                                                Xem chi tiết
                                            </button>
                                        </td>
                                        <td className={cx('action')}>
                                            <a href={`mailto:${item.email}`}>
                                                <button className={cx('btn', 'btn-fix')}>
                                                    <span className={cx('icon-btn')}>
                                                        <FontAwesomeIcon icon={faComment} />
                                                    </span>
                                                    Phản hồi
                                                </button>
                                            </a>
                                        </td>
                                        <td className={cx('action')}>
                                            <button className={cx('btn')} onClick={() => showBoxDel(item)}>
                                                <span className={cx('icon-btn')}>
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </span>
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Wrapper>
            {show && (
                <BoxMSG onClickOK={handleDelete} onClickHide={() => setShow(false)} control>
                    Xác nhận xóa thông tin liên hệ của khách hàng:{' '}
                    <span style={{ fontWeight: 'bold' }}>{user.fullName}</span>
                </BoxMSG>
            )}
            {showDetail && (
                <BoxMSG maxWidth onClickHide={() => setShowDetail(false)}>
                    {user.note}
                </BoxMSG>
            )}
        </div>
    );
}
export default Feedback;

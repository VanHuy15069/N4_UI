import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Feedback.module.scss';
import Wrapper from '~/components/Wrapper/Wrapper';
import { faComment, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const cx = classNames.bind(styles);

export default function Feedback() {
    const [length] = useState(0);
    const [feedback, setFeedback] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/v1/contact/feedback')
            .then((res) => {
                setFeedback(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [length]);
    return (
        <div className={cx('wrapper')}>
            <Wrapper header="Phản hồi khách hàng" icon={faComment}>
                <div className={cx('data-table')}>
                    <table className={cx('table')}>
                        <tbody>
                            <tr>
                                <th>Họ tên khách hàng</th>
                                <th>Email</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th>Phản hồi</th>
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
                                        <td className={cx('action')}>
                                            <button className={cx('btn', 'btn-fix')}>
                                                <span className={cx('icon-btn')}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </span>
                                                Sửa
                                            </button>
                                        </td>
                                        <td className={cx('action')}>
                                            <button className={cx('btn')}>
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
        </div>
    );
}

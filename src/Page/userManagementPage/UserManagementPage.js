import classNames from 'classnames/bind';
import styles from './UserManagement.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BoxMSG from '~/components/AdminLayout/BoxMSG/BoxMSG';
const cx = classNames.bind(styles);
function UserManagementPage() {
    const [name, setName] = useState('');
    const [length, setLength] = useState(0);
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [showBox, setShowBox] = useState(false);
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/v1/user/getAllUser', {
                headers: {
                    token: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then((res) => {
                setData(res.data);
            })
            .catch(() => {
                alert('Không thể kết nối đến server');
            });
    }, [length]);
    const onShowMSG = (user) => {
        setName(`${user.firstName} ${user.lastName}`);
        setId(user.id);
        setShowBox(true);
    };
    const handleDelete = () => {
        axios
            .delete(`http://localhost:5000/api/v1/user/${id}`, {
                headers: {
                    token: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then((res) => {
                setShowBox(false);
                setLength(data.length);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={faUsers} />
                </span>
                <h2 className={cx('title')}>Danh sách khách hàng</h2>
            </div>
            <div className={cx('data-table')}>
                <table className={cx('table')}>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Tên khách hàng</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Thao tác</th>
                        </tr>
                        {data.map((user) => {
                            return (
                                !user.admin && (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>
                                            {user.firstName} {user.lastName}
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <button onClick={() => onShowMSG(user)} className={cx('btn')}>
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                )
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {showBox && (
                <BoxMSG
                    message={`Xác nhận xóa khách hàng ${name}`}
                    onClickHide={() => setShowBox(false)}
                    onClickOK={handleDelete}
                />
            )}
        </div>
    );
}
export default UserManagementPage;

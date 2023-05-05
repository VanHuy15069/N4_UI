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
    //biến length để rerender useEffect
    const [length, setLength] = useState(0);
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [showBox, setShowBox] = useState(false);
    //get tất cả khách hàng
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
        //khi length thay đổi thì rerender
    }, [length]);
    //show box thông báo
    const onShowMSG = (user) => {
        setName(`${user.firstName} ${user.lastName}`);
        setId(user.id);
        setShowBox(true);
    };
    //xóa user theo id
    const handleDelete = () => {
        axios
            .delete(`http://localhost:5000/api/v1/user/${id}`, {
                headers: {
                    token: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then(() => {
                //ẩn box thông báo sau khi xóa thành công
                setShowBox(false);
                //thay đổi biến length thi xóa thành công
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
                        {/* render data user */}
                        {data.map((user) => {
                            return (
                                //nếu là admin thì không render
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
                                            {/* get data user được chọn */}
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
            {/* box thông báo */}
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

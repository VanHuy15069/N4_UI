import classNames from 'classnames/bind';
import styles from './UserManagement.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashCan, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BoxMSG from '~/components/AdminLayout/BoxMSG/BoxMSG';
const cx = classNames.bind(styles);
function UserManagementPage() {
    const [user, setUser] = useState({});
    const [control, setControl] = useState(false);
    //biến length để rerender useEffect
    const [length, setLength] = useState(0);
    const [data, setData] = useState([]);
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
        setControl(true);
        setUser(user);
        setShowBox(true);
    };
    const onShowInfor = (user) => {
        setControl(false);
        setUser(user);
        setShowBox(true);
    };
    //xóa user theo id
    const handleDelete = () => {
        axios
            .delete(`http://localhost:5000/api/v1/user/${user.id}`, {
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
                            <th colSpan={2}>Thao tác</th>
                        </tr>
                        {/* render data user */}
                        {data.map((user) => {
                            return (
                                //nếu là admin thì không render
                                !user.admin && (
                                    <tr key={user.id}>
                                        <td className={cx('text-center')}>{user.id}</td>
                                        <td>
                                            <p className={cx('m-left')}>
                                                {user.firstName} {user.lastName}
                                            </p>
                                        </td>
                                        <td>
                                            <p className={cx('m-left')}>{user.email}</p>
                                        </td>

                                        <td>
                                            <p className={cx('m-left')}>{user.phoneNumber}</p>
                                        </td>
                                        <td className={cx('text-center')}>
                                            {/* get data user được chọn */}
                                            <button onClick={() => onShowInfor(user)} className={cx('btn')}>
                                                <span className={cx('icon-btn')}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </span>
                                                Xem
                                            </button>
                                        </td>
                                        <td className={cx('text-center')}>
                                            {/* get data user được chọn */}
                                            <button onClick={() => onShowMSG(user)} className={cx('btn', 'btn-delete')}>
                                                <span className={cx('icon-btn')}>
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </span>
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
                <BoxMSG control={control} onClickHide={() => setShowBox(false)} onClickOK={handleDelete}>
                    {control ? (
                        <p>
                            Xác nhận xóa khách hàng{' '}
                            <span className={cx('name')}>
                                {user.firstName} {user.lastName}
                            </span>
                        </p>
                    ) : (
                        <div className={cx('wrapper-box')}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>ID</td>
                                        <td>{user.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Tên đănh nhập</td>
                                        <td>{user.username}</td>
                                    </tr>
                                    <tr>
                                        <td>First Name</td>
                                        <td>{user.firstName}</td>
                                    </tr>
                                    <tr>
                                        <td>Last Name</td>
                                        <td>{user.lastName}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Số điện thoại</td>
                                        <td>{user.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>Địa chỉ</td>
                                        <td>{user.address}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </BoxMSG>
            )}
        </div>
    );
}
export default UserManagementPage;

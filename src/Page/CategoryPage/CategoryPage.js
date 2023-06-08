import classNames from 'classnames/bind';
import styles from './CategoryPage.module.scss';
import Wrapper from '~/components/Wrapper/Wrapper';
import { faPenToSquare, faRectangleList, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BoxMSG from '~/components/AdminLayout/BoxMSG/BoxMSG';
import axios from 'axios';
const cx = classNames.bind(styles);
function CategoryPage() {
    const [check, setCheck] = useState('');
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const [length, setLength] = useState(0);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/v1/category/getCategory')
            .then((res) => {
                setCategory(res.data.cate.cate);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [length]);
    const handleHide = () => {
        setShow(false);
        setCheck('');
    };
    const hanldeShow = () => {
        setShow(true);
    };
    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const hanleAddname = (e) => {
        e.preventDefault();
        if (!name) {
            setCheck('Không được để trống thông tin!');
        } else {
            axios
                .post('http://localhost:5000/api/v1/category/addCategory', { name: name })
                .then((res) => {
                    setCategory(res.data.cate.cate);
                    setLength(category.length);
                    setShow(false);
                })
                .catch((err) => {
                    alert('Không thể kết nối đến server');
                });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Wrapper header="Quản lý danh mục" icon={faRectangleList} control onCLick={hanldeShow}>
                <div className={cx('data-table')}>
                    <table className={cx('table')}>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Tên loại sản phẩm</th>
                                <th colSpan={2}>Thao tác</th>
                            </tr>
                            {category.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
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
            {show && (
                <BoxMSG onClickHide={handleHide} messageErr={check}>
                    <form onSubmit={hanleAddname}>
                        <div>Tên loại sản phẩm:</div>
                        <input
                            className={cx('input')}
                            type="text"
                            name="name"
                            onChange={handleChangeName}
                            value={name}
                        />
                        <div className={cx('wrapper-btn')}>
                            <button type="submit" className={cx('btn', 'btn-add')}>
                                Thêm
                            </button>
                        </div>
                    </form>
                </BoxMSG>
            )}
        </div>
    );
}
export default CategoryPage;

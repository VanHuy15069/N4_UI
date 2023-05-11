import classNames from 'classnames/bind';
import styles from './ProductManagement.module.scss';
import Wrapper from '~/components/Wrapper/Wrapper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { faLeaf, faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BoxMSG from '~/components/AdminLayout/BoxMSG/BoxMSG';
const cx = classNames.bind(styles);
function ProductManagement() {
    const [value, setValue] = useState({
        title: '',
        price: '',
        weight: '',
        quantity: '',
        summary: '',
    });
    const [image, setImage] = useState();
    const [length, setLength] = useState(0);
    const [select, setSelect] = useState({
        categoryId: 1,
        supplier: 'Curnon',
    });
    const { title, price, weight, quantity, summary } = value;
    const [category, setCategory] = useState([]);
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/v1/product/getProduct')
            .then((res) => {
                setProducts(res.data.product);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [length]);
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/v1/category/getCategory')
            .then((res) => {
                setCategory(res.data.cate.cate);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const handleChange = (e) => {
        const spaceValue = e.target.value;
        if (!spaceValue.startsWith(' ')) {
            setValue({ ...value, [e.target.name]: e.target.value });
        }
    };
    const handleChangeOption = (e) => {
        setSelect({ ...select, [e.target.name]: e.target.value });
    };
    const handleChangeImage = (e) => {
        setImage(e.target.files[0]);
    };
    const handleShowBox = () => {
        setShow(true);
    };
    const handleAddProduct = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', value.title.trim());
        formData.append('categoryId', select.categoryId);
        formData.append('price', value.price.trim());
        formData.append('weight', value.weight.trim());
        formData.append('supplier', select.supplier);
        formData.append('quantity', value.quantity.trim());
        formData.append('summary', value.summary.trim());
        axios
            .post('http://localhost:5000/api/v1/product/addProduct', formData)
            .then(() => {
                setShow(false);
                setLength(products.length);
                setImage();
                setValue({ title: '', categoryId: '', price: '', weight: '', supplier: '', quantity: '', summary: '' });
                setSelect({ categoryId: 1, supplier: 'Curnon' });
            })
            .catch(() => {
                alert('Không kết nối được với server');
            });
    };
    return (
        <div className={cx('wrapper')}>
            <Wrapper icon={faLeaf} header="Quản lý sản phẩm" control onCLick={handleShowBox}>
                <div className={cx('body')}>
                    <div className={cx('data-table')}>
                        <table className={cx('table')}>
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng trong kho</th>
                                    <th>Giá tiền</th>
                                    <th>Nhập hàng</th>
                                    <th colSpan={2}>Thao tác</th>
                                </tr>
                                {products.map((product, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{product.id}</td>
                                            <td>
                                                <img
                                                    className={cx('img')}
                                                    src={`http://localhost:5000/src/${product?.image}`}
                                                    alt=""
                                                />
                                            </td>
                                            <td>{product.title}</td>
                                            <td>{product.quantity}</td>
                                            <td>{VND.format(product.price)}</td>
                                            <td>
                                                <button className={cx('btn')}>
                                                    <span className={cx('icon-btn')}>
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </span>
                                                    Nhập hàng
                                                </button>
                                            </td>
                                            <td>
                                                <button className={cx('btn')}>
                                                    <span className={cx('icon-btn')}>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </span>
                                                    Sửa
                                                </button>
                                            </td>
                                            <td>
                                                <button className={cx('btn', 'btn-delete')}>
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
                </div>
            </Wrapper>
            {show && (
                <form onSubmit={handleAddProduct}>
                    <BoxMSG onClickHide={() => setShow(false)} control type="submit">
                        <h3 style={{ textAlign: 'center' }}>Thêm sản phẩm</h3>
                        <table className={cx('add-table')}>
                            <tbody>
                                <tr>
                                    <td>Tên sản phẩm</td>
                                    <td>
                                        <input
                                            className={cx('input')}
                                            type="text"
                                            name="title"
                                            value={title}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Hình ảnh</td>
                                    <td>
                                        <input
                                            style={{ marginLeft: '8px' }}
                                            type="file"
                                            name="image"
                                            onChange={handleChangeImage}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Loại sản phẩm</td>
                                    <td>
                                        <select className={cx('input')} name="categoryId" onChange={handleChangeOption}>
                                            {category.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Giá bán</td>
                                    <td>
                                        <input
                                            className={cx('input')}
                                            type="text"
                                            name="price"
                                            value={price}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Cân nặng</td>
                                    <td>
                                        <input
                                            className={cx('input')}
                                            type="text"
                                            name="weight"
                                            value={weight}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Nhà sản xuất</td>
                                    <td>
                                        <select className={cx('input')} name="supplier" onChange={handleChangeOption}>
                                            <option value="Curnon">Curnon</option>
                                            <option value="Julius">Julius</option>
                                            <option value="Nakzen">Nakzen</option>
                                            <option value="Rolex">Rolex</option>
                                            <option value="Rossini">Rossini</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Số lượng</td>
                                    <td>
                                        <input
                                            className={cx('input')}
                                            type="text"
                                            name="quantity"
                                            value={quantity}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Mô tả</td>
                                    <td>
                                        <textarea
                                            className={cx('input')}
                                            rows="4"
                                            name="summary"
                                            value={summary}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </BoxMSG>
                </form>
            )}
        </div>
    );
}
export default ProductManagement;

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
    const [length, setLength] = useState(0);
    const [isUpdate, setIsUpdate] = useState(false);
    const [value, setValue] = useState({
        title: '',
        price: '',
        weight: '',
        quantity: '',
        summary: '',
    });
    // const [addQuantity, setAddQuantity] = useState(0);
    // const [showAddQuantity, setShowAddQuantity] = useState(false);
    const [check, setCheck] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [product, setProduct] = useState({
        id: '',
        titleOld: '',
        priceOld: '',
        weightOld: '',
        quantityOld: '',
        summaryOld: '',
    });
    const [image, setImage] = useState();
    const [select, setSelect] = useState({
        categoryId: 1,
        supplier: 'Curnon',
    });
    const [selectOld, setSelectOld] = useState({
        categoryIdOld: '',
        supplierOld: '',
    });
    const [uploadImg, setUploadImg] = useState();
    const { title, price, weight, quantity, summary } = value;
    const { titleOld, priceOld, weightOld, quantityOld, summaryOld } = product;
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
    }, [length, isUpdate]);
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
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(uploadImg);
        };
    }, [uploadImg]);
    const handleShowReMake = (product) => {
        setShowForm(true);
        setUploadImg(`http://localhost:5000/src/${product.image}`);
        setSelectOld({ ...selectOld, categoryIdOld: product.categoryId, supplierOld: product.supplier });
        setProduct({
            id: product.id,
            titleOld: product.title,
            priceOld: product.price,
            weightOld: product.weight,
            quantityOld: product.quantity,
            summaryOld: product.summary,
        });
    };
    const handleChange = (e) => {
        const spaceValue = e.target.value;
        if (!spaceValue.startsWith(' ')) {
            if (show) {
                setValue({ ...value, [e.target.name]: e.target.value });
            } else if (showForm) {
                setProduct({ ...product, [e.target.name + 'Old']: e.target.value });
            }
            // else if (showAddQuantity) {
            //     setAddQuantity(e.target.value);
            // }
        }
    };
    const handleChangeOption = (e) => {
        setSelect({ ...select, [e.target.name]: e.target.value });
        setSelectOld({ ...selectOld, [e.target.name + 'Old']: e.target.value });
    };
    const handleChangeImage = (e) => {
        setImage(e.target.files[0]);
        setUploadImg(URL.createObjectURL(e.target.files[0]));
    };
    const handleShowBox = () => {
        setShow(true);
    };
    const handleDelete = (product) => {
        setShowDelete(true);
        setProduct({
            id: product.id,
            titleOld: product.title,
            priceOld: product.price,
            weightOld: product.weight,
            quantityOld: product.quantity,
            summaryOld: product.summary,
        });
    };
    // const handleAddQuantity = (product) => {
    //     setShowAddQuantity(true);
    //     setProduct({
    //         id: product.id,
    //         titleOld: product.title,
    //         priceOld: product.price,
    //         weightOld: product.weight,
    //         quantityOld: product.quantity,
    //         summaryOld: product.summary,
    //     });
    // };
    // const handleQuantity = (e) => {
    //     e.preventDefault();
    //     axios
    //         .put(`http://localhost:5000/api/v1/product/${product.id}`, { quantity: product.quantityOld + addQuantity })
    //         .then((res) => console.log(res))
    //         .catch((err) => console.log(err));
    // };
    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!value.title || !value.price || !value.weight || !value.quantity || !value.summary) {
            setCheck('Bạn cần nhập đầy đủ thông tin sản phẩm');
        } else if (!image) {
            setCheck('Thiếu ảnh sản phẩm');
        } else {
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
                    setValue({
                        title: '',
                        categoryId: '',
                        price: '',
                        weight: '',
                        supplier: '',
                        quantity: '',
                        summary: '',
                    });
                    setSelect({ categoryId: 1, supplier: 'Curnon' });
                    setCheck('');
                })
                .catch(() => {
                    alert('Không kết nối được với server');
                });
        }
    };
    const handleRemakeProduct = (e) => {
        e.preventDefault();
        if (
            !product.titleOld ||
            !selectOld.categoryIdOld ||
            !product.priceOld ||
            !product.weightOld ||
            !selectOld.supplierOld ||
            !product.quantityOld ||
            !product.summaryOld
        ) {
            setCheck('Bạn cần nhập đầy đủ thông tin');
        } else if (!image) {
            setCheck('Thiếu ảnh ảnh sản phẩm');
        } else {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', product.titleOld.trim());
            formData.append('categoryId', selectOld.categoryIdOld);
            formData.append('price', product.priceOld);
            formData.append('weight', product.weightOld.trim());
            formData.append('supplier', selectOld.supplierOld);
            formData.append('quantity', product.quantityOld);
            formData.append('summary', product.summaryOld.trim());
            axios
                .put(`http://localhost:5000/api/v1/product/${product.id}`, formData)
                .then(() => {
                    setShowForm(false);
                    setIsUpdate(!isUpdate);
                    setImage();
                    setCheck('');
                })
                .catch((err) => console.log(err));
        }
    };
    const handleDeleteProduct = () => {
        axios
            .delete(`http://localhost:5000/api/v1/product/${product.id}`)
            .then((res) => {
                console.log(res);
                setShowDelete(false);
                setLength(products.length);
            })
            .catch((err) => console.log(err));
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
                                    <th>Số lượng hàng</th>
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
                                                    src={`http://localhost:5000/src/${product.image}`}
                                                    alt=""
                                                />
                                            </td>
                                            <td>
                                                <p>{product.title}</p>
                                            </td>
                                            <td>{product.quantity}</td>
                                            <td>{VND.format(product.price)}</td>
                                            <td>
                                                <button
                                                    className={cx('btn')}
                                                    // onClick={() => handleAddQuantity(product)}
                                                >
                                                    <span className={cx('icon-btn')}>
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </span>
                                                    Nhập hàng
                                                </button>
                                            </td>
                                            <td>
                                                <button className={cx('btn')} onClick={() => handleShowReMake(product)}>
                                                    <span className={cx('icon-btn')}>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </span>
                                                    Sửa
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleDelete(product)}
                                                    className={cx('btn', 'btn-delete')}
                                                >
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
                    <BoxMSG
                        onClickHide={() => {
                            setShow(false);
                            setCheck('');
                        }}
                        control
                        type="submit"
                        messageErr={check}
                    >
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
            {showForm && (
                <form onSubmit={handleRemakeProduct}>
                    <BoxMSG
                        onClickHide={() => {
                            setShowForm(false);
                            setCheck('');
                        }}
                        control
                        type="submit"
                        messageErr={check}
                    >
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
                                            value={titleOld}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Hình ảnh</td>
                                    <td className={cx('row-img')}>
                                        <input
                                            style={{ marginLeft: '8px' }}
                                            type="file"
                                            name="image"
                                            onChange={handleChangeImage}
                                        />
                                        <div className={cx('wrapper-img')}>
                                            <img className={cx('img-upload')} src={uploadImg} alt="" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Loại sản phẩm</td>
                                    <td>
                                        <select
                                            className={cx('input')}
                                            value={selectOld.categoryIdOld}
                                            name="categoryId"
                                            onChange={handleChangeOption}
                                        >
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
                                            value={priceOld}
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
                                            value={weightOld}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Nhà sản xuất</td>
                                    <td>
                                        <select
                                            className={cx('input')}
                                            value={selectOld.supplierOld}
                                            name="supplier"
                                            onChange={handleChangeOption}
                                        >
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
                                            value={quantityOld}
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
                                            value={summaryOld}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </BoxMSG>
                </form>
            )}
            {showDelete && (
                <BoxMSG control onClickHide={() => setShowDelete(false)} onClickOK={handleDeleteProduct} maxWidth>
                    Xác nhận xóa sản phẩm: <span style={{ fontWeight: 'bold' }}>{product.titleOld}</span>
                </BoxMSG>
            )}
            {/* {showAddQuantity && (
                <BoxMSG onClickOK={handleQuantity} onClickHide={() => setShowAddQuantity(false)} control type="submit">
                    <form>
                        <p>Nhập số lượng cần thêm</p>
                        <input type="text" name="quantity" onChange={handleChange} value={addQuantity} />
                    </form>
                </BoxMSG>
            )} */}
        </div>
    );
}
export default ProductManagement;

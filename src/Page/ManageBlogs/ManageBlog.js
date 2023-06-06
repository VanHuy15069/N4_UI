import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageBlogs.module.scss';
import Wrapper from '~/components/Wrapper/Wrapper';
import { faBlogger } from '@fortawesome/free-brands-svg-icons';
import BoxMSG from '~/components/AdminLayout/BoxMSG/BoxMSG';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import axios from 'axios';

const cx = classNames.bind(styles);

export default function ManageBlog() {
    let [show, setShow] = useState(false);
    let [check, setCheck] = useState('');
    let [markdown, setMarkdown] = useState({
        contentMarkDown: '',
        contentHTML: '',
    });
    let [value, setValue] = useState({
        title: '',
    });
    let { title } = value;
    let [img, setImg] = useState();
    let [uploadImg, setUploadImg] = useState();
    let [blog, setBlog] = useState([]);
    const [blogs, setBlogs] = useState({
        idOld: '',
        titleOld: '',
        contentHTMLOld: '',
        contentMarkDownOld: '',
    });
    let [length, setLength] = useState(0);
    let [showDelete, setShowDelete] = useState(false);

    let handleOnChangeImg = (e) => {
        setImg(e.target.files[0]);
        setUploadImg(URL.createObjectURL(e.target.files[0]));
    };

    let handleShow = () => {
        setShow(true);
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(uploadImg);
        };
    }, [uploadImg]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/v1/blog/getAllBlog')
            .then((res) => {
                setBlog(res.data.blog);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [length]);

    const mdParser = new MarkdownIt(/* Markdown-it options */);

    // Finish!
    function handleEditorChange({ html, text }) {
        setMarkdown({
            contentHTML: html,
            contentMarkDown: text,
        });
        //console.log('handleEditorChange', html, text);
    }

    let handleOnChange = (e) => {
        const spaceValue = e.target.value;
        if (!spaceValue.startsWith(' ')) {
            if (show) {
                setValue({ ...value, [e.target.name]: e.target.value });
            } 
        }
    };

    let formatter = new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

    let handleSubmitBlog = (e) => {
        e.preventDefault();
        if (!value.title || !markdown.contentHTML || !markdown.contentMarkDown) {
            setCheck('Nhập đủ thông tin bài viết');
        } else if (!img) {
            setCheck('Bạn chưa chọn ảnh!');
        } else {
            const formData = new FormData();
            formData.append('image', img);
            formData.append('title', value.title.trim());
            formData.append('contentHTML', markdown.contentHTML.trim());
            formData.append('contentHTMLMarkdown', markdown.contentMarkDown.trim());
            axios
                .post('http://localhost:5000/api/v1/blog/addBlog', formData)
                .then(() => {
                    setShow(false);
                    setImg();
                    setValue({
                        title: '',
                    });
                    setMarkdown({
                        contentHTML: '',
                        contentMarkDown: '',
                    });
                    setCheck('');
                    setLength(blog.length);
                })
                .catch(() => {
                    alert('Lỗi server');
                });
        }
    };

    let handleDelete = (blog) => {
        setShowDelete(true);
        setBlogs({
            id: blog.id,
            titleOld: blog.titleOld,
            contentHTMLOld: blog.contentHTML,
            contentMarkDownOld: blog.contentMarkDown,
        });
    };

    let handleDeleteBlog = () => {
        axios
            .delete(`http://localhost:5000/api/v1/blog/${blogs.id}`)
            .then((res) => {
                setShowDelete(false);
                setLength(blog.length);
            })
            .catch((err) => console.log(err));
        console.log('ID: ' + blogs.id);
    };

    

    
    return (
        <div className={cx('wrapper')} type="submit">
            <Wrapper header="Quản lý bài viết" icon={faBlogger} control onCLick={handleShow}></Wrapper>
            <div className={cx('body')}>
                <div className={cx('data-table')}>
                    <table className={cx('table')}>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Tiêu đề bài viết</th>
                                <th>Ngày tạo</th>
                                <th colSpan={2}>Thao tác</th>
                            </tr>
                            {blog.map((blog, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{blog.id}</td>
                                        <td>{blog.title}</td>
                                        <td>{formatter.format(Date.parse(blog.createdAt))}</td>
                                        
                                        <td>
                                            <button
                                                onClick={() => handleDelete(blog)}
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
            {show && (
                <BoxMSG
                    onClickHide={() => {
                        setShow(false);
                        setCheck('');
                    }}
                    //control
                    type="submit"
                    messageErr={check}
                >
                    <form onSubmit={handleSubmitBlog}>
                        <h3 style={{ textAlign: 'center', textTransform: 'uppercase' }}>Thêm bài viết</h3>

                        <div className={cx('box-input')}>
                            <div className={cx('title')}>Tiêu đề: </div>
                            <div className={cx('input-val')}>
                                <input type="text" name="title" onChange={handleOnChange} value={title} />
                            </div>
                        </div>

                        <div className={cx('box-input')}>
                            <div className={cx('title')}>Thumbnail: </div>
                            <div className={cx('input-val')}>
                                <input type="file" name="img" style={{ border: 'none' }} onChange={handleOnChangeImg} />
                            </div>
                        </div>

                        <div className={cx('content')}>
                            <MdEditor
                                style={{ height: '500px', width: '1200px' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={handleEditorChange}
                            />
                        </div>

                        <div className={cx('wrap-btn')}>
                            <button type="submit" className={cx('btn')}>
                                Thêm
                            </button>
                        </div>
                    </form>
                </BoxMSG>
            )}
            {showDelete && (
                <BoxMSG control onClickHide={() => setShowDelete(false)} onClickOK={handleDeleteBlog} maxWidth>
                    Xác nhận xoá bài viết <span style={{ fontWeight: '700' }}>{blogs.titleOld}</span>
                </BoxMSG>
            )}
            
        </div>
    );
}

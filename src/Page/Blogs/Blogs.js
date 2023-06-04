import classNames from 'classnames/bind';
import styles from './Blogs.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);
function Blogs() {
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/v1/blog/getAllBlog')
            .then((res) => {
                setBlog(res.data.blog);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    let formatter = new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3>Blogs</h3>
            </div>
            <div className={cx('content')}>
                <div className={cx('blog-left')}>
                    <div className={cx('top')}>
                        <input type="text" name="search-blog" className={cx('search-blog')} placeholder="Tìm kiếm..." />
                        <button type="submit" name="submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    <div className={cx('middle')}>
                        <h3>Bài viết mới</h3>
                    </div>
                    <div className={cx('bottom')}>
                        <div className={cx('bottom-wrapper-c')}>
                            {blog.slice(0, 5).map((blog, index) => {
                                return (
                                    <a href="#" title={blog.title}>
                                        <div key={index} className={cx('bottom-wrapper')}>
                                            <div className={cx('bottom-content')}>
                                                <div className={cx('img')}>
                                                    <img src={`http://localhost:5000/src/${blog.image}`} />
                                                </div>

                                                <div className={cx('title')}>{blog.title}</div>
                                            </div>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className={cx('blog-right')}>
                    {blog.map((blog, index) => {
                        return (
                            <div className={cx('element')} key={index}>
                                <a href="#" title={blog.title}>
                                    <div className={cx('thumbnail')}>
                                        <img src={`http://localhost:5000/src/${blog.image}`} />
                                    </div>

                                    <div className={cx('title-blog')}>
                                        <h3>{blog.title}</h3>
                                    </div>

                                    <div className={cx('date')}>
                                        <p>Ngày tạo: {formatter.format(Date.parse(blog.createdAt))}</p>
                                    </div>

                                    <div className={cx('border')}></div>

                                    <div className={cx('preview')}>
                                        <p>{blog.contentHTMLMarkdown}</p>
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default Blogs;

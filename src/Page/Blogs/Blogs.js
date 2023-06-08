import classNames from 'classnames/bind';
import styles from './Blogs.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BlogSideBar from '~/components/DefaultLayout/BLogSideBar/BlogSideBar';
import { Link } from 'react-router-dom';

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
                    <BlogSideBar />
                </div>

                <div className={cx('blog-right')}>
                    {blog
                        .sort((a, b) => b.id - a.id)
                        .map((blog, index) => {
                            return (
                                <Link to={`/informationBlog/${blog.id}`} key={index}>
                                    <div className={cx('element')} title={blog.title}>
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
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
export default Blogs;

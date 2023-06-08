import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './InformationBlog.module.scss';
import BlogSideBar from '~/components/DefaultLayout/BLogSideBar/BlogSideBar';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTelegram } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

const cx = classNames.bind(styles);

export default function InformationBlog() {
    const [blog, setBlog] = useState([]);
    const params = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/v1/blog/${params.id}`)
            .then((res) => {
                setBlog(res.data.response);
            })
            .catch((err) => console.log(err));
    }, [params]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('blog-left')}>
                <BlogSideBar />
            </div>

            <div className={cx('blog-right')}>
                <div className={cx('content')}>
                    <Link to="/blogs">
                        {` < `}
                        <span className={cx('header')}>Blog</span>
                    </Link>

                    <div className={cx('title')}>
                        <h2>{blog.title}</h2>
                    </div>

                    <div className={cx('thumbnail')}>
                        <img src={`http://localhost:5000/src/${blog.image}`} alt="" />
                    </div>

                    <div className={cx('contentHTML')} dangerouslySetInnerHTML={{ __html: blog.contentHTML }}></div>

                    <footer>
                        <div className={cx('social-network')}>
                            <div className={cx('img-s')} style={{ backgroundColor: '#3e5b8f' }}>
                                <FontAwesomeIcon icon={faFacebook} /> <p>Facebook</p>
                            </div>

                            <div className={cx('img-s')} style={{ backgroundColor: '#c3382c' }}>
                                <FontAwesomeIcon icon={faGoogle} /> <p>Google</p>
                            </div>

                            <div className={cx('img-s')} style={{ backgroundColor: '#29a9ea' }}>
                                <FontAwesomeIcon icon={faTelegram} /> <p>Telegram</p>
                            </div>
                        </div>

                    </footer>
                </div>
            </div>
        </div>
    );
}

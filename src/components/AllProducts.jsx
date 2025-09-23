import { Col, Pagination, Row, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { _all_product } from '../common/axios_services';
import ProductCard from './Card';

const AllProducts = (props) => {
    let params = new URLSearchParams(window?.location?.search);
    const [pageSize,] = React.useState(24)
    const [page, setPage] = React.useState(1)
    const [total, setTotal] = React.useState(0)
    const [products, setProducts] = React.useState([])
    const [loadingProducts, setLoadingProducts] = React.useState(false)
    let searchParam = params.get('search')

    let skeleton = [];
    for (let i = 0; i < 6; i++) {
        skeleton.push(<Skeleton active />)
    }

    const MyPagination = ({ total, onChange, current }) => {
        return (
            <Pagination
                onChange={onChange}
                total={total}
                defaultCurrent={current}
                pageSize={pageSize}
            />
        );
    };

    const getProduct = async () => {
        setLoadingProducts(true)
        try {
            const all_products = await _all_product({ page: page, per_page: pageSize, search: searchParam?.length > 1 ? searchParam : '' })
            setProducts(all_products.data.data)
            setLoadingProducts(false)
            setTotal(all_products.data.meta.total)
        } catch (err) {
            setLoadingProducts(true)

        }
    }

    useEffect(() => {
        getProduct()
    }, [page, pageSize, searchParam])

    return (
        <div id="allProducts" className="">
            <div className="quick-list no-margin products shop_space_top">
                <div className="">
                    <div className="top">
                        <div className="">
                            <h3 className="">{props.param}</h3>
                        </div>
                        {!loadingProducts ?
                            <Row gutter={[16, 16]}>
                                {products.map((product, index) => (
                                    <Col className="gutter-row" xs={12} sm={6} md={6} lg={6} xl={6} key={index} >
                                        <ProductCard product={product} />
                                    </Col>
                                ))}
                            </Row>
                            :
                            <Row gutter={[16, 16]}>
                                {skeleton.map((placeHolder, index) => (
                                    <Col className="gutter-row" xs={12} sm={6} md={6} lg={6} xl={6} key={index}>
                                        {placeHolder}
                                    </Col>
                                ))}
                            </Row>
                        }
                    </div>
                    <div className="mt-3"></div>
                    <MyPagination
                        total={total}
                        current={page}
                        onChange={setPage}
                    />
                    <div className="mt-5"></div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts
import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import "./productDetails.css"
import { useSelector, useDispatch } from "react-redux"
import { getProductDetails } from '../../Actions/productAction'
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, product, error } = useSelector(state => state.productDetails)

    useEffect(() => {

        dispatch(getProductDetails(id));
    }, [dispatch, id])

    return (
        <Fragment>
        <div className="productDetails">
            <div>
                {product && product.product && product.product.images ? (
                    <Carousel>
                        {product.product.images.map((item, i) => (
                            <img
                                src={item.url}
                                className="CarouselImage"
                                key={item.url}
                                alt={`${i} Slide`}
                            />
                        ))}
                    </Carousel>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    </Fragment>
    )
}

export default ProductDetails
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchProductStart, setProduct} from "../../redux/Products/products.actions"
import Button from "../forms/Button";
import { addProduct } from "../../redux/Cart/cart.actions";
import './styles.scss';

const mapState = state => ({
    product: state.productsData.product
})

const PorductCard = ({}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productID } = useParams();
    const { product } = useSelector(mapState);

    const {
        productThumbnail,
        productName,
        productPrice,
        productDesc
    } = product;

    useEffect(() => {
        dispatch(fetchProductStart(productID))

        //to not show the previous clicked product after clicking on another product
        return () => {
            dispatch(
                setProduct({})
            )
        }
    },[]);
    

    const handleAddToCart = (product) =>{
        if(!product) return null;
        dispatch(
            addProduct(product)
        )
        history.push('/cart')
    }
    const configAddToCartBtn = {
        type: 'button'
    }
    return(
        <div className="productCard">
            <div className="hero">
                <img src={productThumbnail} />
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>
                            {productName}
                        </h1>
                    </li>
                    <li>
                        <span>
                            {productPrice} DHS
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn} onClick={()=> handleAddToCart(product)}>
                                Add to cart
                            </Button>
                        </div> 
                    </li>
                    <li>
                        <span className="prodDesc" dangerouslySetInnerHTML={{__html: productDesc }} />
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default PorductCard;
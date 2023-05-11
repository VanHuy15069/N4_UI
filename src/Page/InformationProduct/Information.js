import { useParams } from 'react-router-dom';

function InformationProduct() {
    const id = useParams();
    return <h2>SAN PHAM: {id.id}</h2>;
}
export default InformationProduct;

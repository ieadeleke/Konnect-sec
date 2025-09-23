import { Skeleton } from 'antd';
import { Link } from 'react-router-dom'

const SubHeader = () => {
    const [subcategories, setSubcategories] = useState([]);
useEffect(() => {
        axiosCall('/sub-category/no_pagination')
            .then(res => {
                setSubcategories(res.data.data)
            })
            .catch(err => {

            })
    }, [])
    let skeleton = [];
    for (let i = 0; i < 21; i++) {
        skeleton.push(<Skeleton.Button active size={'default'}
            shape={'default'}
        />)
    }
    return (
        <div className="px-4">
            <div className="">
                {
                    subcategories.length ?
                        subcategories.map((subcategory, index) => (
                            <div className="" key={index}>
                                <Link to={`/subcategories/${subcategory.id}`}>{subcategory.subcat_name}</Link>
                            </div>
                        ))
                        :
                        skeleton.map((placeHolder, index) => (
                            <div className="" key={index}>
                                {placeHolder}
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default SubHeader
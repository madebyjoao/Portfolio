import { useParams } from "react-router";


function Builder() {

    const { slug } = useParams();

    return (
        <div>

        <h1 className="text-white">THis is the builder</h1>

        </div>
        
    )

}


export default Builder;
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from '../features/cabins/CabinTable';
import AddCabin from "../features/cabins/AddCabin";
// import { useEffect } from "react";
// import { getCabins } from "../services/apiCabins";

function Cabins() {



  return (
    <>    
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter / Sort </p>
    </Row>

    <Row>
    <CabinTable/>
    <AddCabin/>
    
    </Row>

    </>

  );
}

export default Cabins;

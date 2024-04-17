'use client'

import DatabaseConnectionForm from "@/app/components/DatabaseConnectionForm";
import {Container} from "@mui/material";
import SelectInput from "@mui/material/Select/SelectInput";

export default function DbConnPage(children) {



    /* const handleConnectionSubmit = async (connectionData) => {
         try {
             // Realizar la petición POST al servidor
             const response = await axios.post('/api/connect-database', connectionData);
             // Manejar la respuesta
             console.log(response.data);
         } catch (error) {
             // Manejar el error
             console.error('Error al conectar con la base de datos', error);
         }
     };*/

    return <Container>
        <h1>Grid Page </h1>
        <SelectInput>pgsl</SelectInput>
    </Container>

}

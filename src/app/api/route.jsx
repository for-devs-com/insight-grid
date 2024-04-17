const POST = async (request) => {
    const requestData = await request.json();
    return Response.json('Conexión exitosa a la base de datos: ' + requestData.databaseName);

}
const { compare } = require('bcryptjs');
const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');

const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controller/socket');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //Verificar autenticacion
    if (!valido) { return client.disconnect(); }

    //cliente autenticado
    usuarioConectado(uid);

    //Ingresar usuario a una sala en especifico
    client.join(uid);

    //Escuchar del cliente mensaje-personal
    client.on('mensaje-personal', async(payload) => {
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });


    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

    /* client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    }); */

    // client.on('vote-band', (payload) => {

    //     bands.voteBand(payload.id);
    //     io.emit('active-bands', bands.getBands());
    // });

    // client.on('add-band', (payload) => {
    //     const newBand = new Band(payload.name);
    //     bands.addBand(newBand);
    //     io.emit('active-bands', bands.getBands());
    // });

    // client.on('delete-band', (payload) => {

    //     bands.deleteBand(payload.id);
    //     io.emit('active-bands', bands.getBands());
    // });

    // client.on('emitir-mensaje', ( payload ) => {
    //     // console.log(payload);
    //     // io.emit('nuevo-mensaje', payload ); // emite a todos!
    //     client.broadcast.emit('nuevo-mensaje', payload ); // emite a todos menos el que lo emitió
    // })


});
const express = require('express');
const mongoose = require('mongoose')
const server = express();
const ListRoutes = require('./routes/ListRoutes');
const fs = require('fs');
const path = require('path');

server.use(express.json({limit: '50mb'}));

server.use('/alunos', ListRoutes);
server.use('/lists', ListRoutes);
server.use('/login', ListRoutes);


/*** Responsavel por receber = cliente->servidor imagem ***/
server.post('/uploadimage', async (req, res) => {

    try {
      const base64Image = req.body.image.replace(/^data:image\/jpg;base64,/, "");
      const buffer = Buffer.from(base64Image, 'base64');

      const absolutePath = path.resolve('C:/kuaile/backend/uploads');

      if (fs.existsSync(absolutePath)) {
          console.log(`A pasta ${absolutePath} já existe.`);
      } else {
          fs.mkdir(absolutePath, (err) => {
            if (err) {
              console.error(`Erro ao criar a pasta ${absolutePath}: ${err}`);
            } else {
              console.log(`A pasta ${absolutePath} foi criada com sucesso.`);
            }
          });
      }
  
      fs.writeFileSync(`./uploads/${req.body.name +'.'+ req.body.ext}`, buffer);
      res.sendStatus(200);
  
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
});

/*** Responsavel por enviar = servidor->cliente imagem ***/
server.post('/getimage', (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.body.filename);
    const imageBuffer = fs.readFileSync(filePath);
    const base64Image = Buffer.from(imageBuffer).toString('base64');
  
    res.send(base64Image);
  });


server.listen(3000, () =>{
    console.log('API ONLINE')

    mongoose.connection.on("connected", ()=>{
        console.log("connected sucsess v120230222")
    })

    mongoose.connection.on("error", (err)=>{
        console.log("error",err)
    })
});
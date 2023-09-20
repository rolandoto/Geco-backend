const {response} = require("express")
const res = require("express/lib/response")
const { pool } = require("../database/connection")
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const uuid = require('uuid');
const sharp = require("sharp");

// Generar un único ID


const UploadFile = async(req, res=response) =>{  

    const  {id} =  req.body
  
    try {
  
      const files = req.files;
  
      if (!files || files.length !== 2) {
        return res.status(401).json({
          ok: false,
          msg: 'Debe seleccionar dos imágenes',
        });
      }
  
      const rutaAdelante = 'https://geco-backend-production.up.railway.app/public/' + files[0].filename;
      const rutaAtras = 'https://geco-backend-production.up.railway.app/public/' + files[1].filename;
  
      let data = {
        Foto_documento_adelante: rutaAdelante,
        Foto_documento_atras: rutaAtras,
      };
      
      await pool.query(
        'UPDATE web_checking SET ? WHERE ID_Reserva = ?',
        [data, id],
        (err, customer) => {
          if (err) {
            return res.status(401).json({
              ok: false,
              msg: 'Error al actualizar datos',
            });
          } else {
            return res.status(201).json({
              ok: true,
            });
          }
        }
      );
  
    } catch (error) {
      console.log(error)
      res.status(401).json({
        ok:false
      })
    }
  }



  const UploalPopUp = async(req, res=response) =>{  

  
    try {
  
      const files = req.files;
  
      if (!files || files.length !== 1) {
        return res.status(401).json({
          ok: false,
          msg: 'Debe seleccionar dos imágenes',
        });
      }
  
      const rutaPopUp = 'https://geco-backend-production.up.railway.app/public/' + files[0].filename;
    
      let data = {
        Img_description: rutaPopUp,
      };
      
      await pool.query(
        'UPDATE PopUpPms SET ? WHERE ID = 1',
        [data],
        (err, customer) => {
          if (err) {
            return res.status(401).json({
              ok: false,
              msg: 'Error al actualizar datos',
            });
          } else {
            return res.status(201).json({
              ok: true,
            });
          }
        }
      );
  
    } catch (error) {
      console.log(error)
      res.status(401).json({
        ok:false
      })
    }
  }


  const UploadCartPresent = async (req, res = response) => {
    const { Username,ID_Reserva } = req.body;

    try {
      const width = 1200
    const height = 630

    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    context.fillStyle = '#000'
    context.fillRect(0, 0, width, height)

    context.font = 'bold 70pt Menlo'
    context.textAlign = 'center'
    context.textBaseline = 'top'
    context.fillStyle = '#3574d4'

    const text = 'Hello, sdasdsadasd!'

    const textWidth = context.measureText(text).width
    context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120)
    context.fillStyle = '#fff'
    context.fillText(text, 600, 170)

    context.fillStyle = '#fff'
    context.font = 'bold 30pt Menlo'
    context.fillText('flaviocopes.com', 600, 530)

    loadImage('./public/logo.jpg').then(image => {
      context.drawImage(image, 340, 515, 70, 70)
      const buffer = canvas.toBuffer('image/png')
      fs.writeFileSync('./public/defined.png', buffer)
      return res.status(201).json({
        ok:true,
        img:`public/defined.png`
      })
      
    })
      
    
    
    } catch (error) {
      return res.status(401).json({
        ok: false,
        msg: 'Error en la función UploadCartPresent',
      });
    }
  };
  

  
  module.exports ={
    UploadFile,
    UploalPopUp,
    UploadCartPresent
  }
'use strict'

const { model } = require('mongoose');
const firebase = require('../db')
const Fruit = require('../models/fruit')
const firestore = firebase.firestore();


const addFruit = async (req, res, next) => {
    try {
        const data = req.body;
        const fruit = await firestore.collection('fruit').doc().set(data)
        res.send('Record saved successfully');
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getAllFruit = async (req, res, next) => {
    try {
        const fruit = await firestore.collection('fruit');
        const data = await fruit.get();
        const fruitsArray= [];
        if(data.empty){
            return res.status(404).send('Khong ton fruit');
        } else {
            data.forEach(doc => {
                const fruit = new Fruit(
                    doc.data().baoquan, 
                    doc.data().discription, 
                    doc.data().id, 
                    doc.data().kcal, 
                    doc.data().name, 
                    doc.data().organic,
                    doc.data().price, 
                    doc.data().start,
                    doc.data().imgurl,
                );
                fruitsArray.push(fruit); 
            });
            return res.send(fruitsArray);
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getFruit = async (req, res, next) => {
    try {
        const id = req.params.id;
        const fruit = await firestore.collection('fruit').doc(id);
        const data = await fruit.get();
        if(!data.exists) {
            res.status(404).send('Fruit with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateFruit = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const fruit =  await firestore.collection('fruit').doc(id);
        await fruit.update(data);
        res.send('cap nhat thanh cong');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteFruit = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('fruit').doc(id).delete();
        res.send('xoa thanh cong');
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {
    addFruit,
    getAllFruit,
    getFruit,
    updateFruit,
    deleteFruit
}
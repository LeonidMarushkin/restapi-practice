import express from "express";
import fs from 'fs/promises';
import bodyParser from "body-parser";

const srv = express();
// const bodyParser = require('body-parser');

let goods = [
    {
        id: 1,
        title: "Сковорода",
        description: "Можно использовать даже не по прямому назначению",
        price: 999
    },
    {
        id: 2,
        title: "Мясорубка",
        description: "Название говорит само за себя",
        price: 1470
    },
    {
        id: 3,
        title: "Чайник",
        description: "Не принимать на свой счет",
        price: 9001
    },
    {
        id: 4,
        title: "Нож",
        description: "Достал нож, ну ты понял",
        price: 1613
    },
    {
        id: 5,
        title: "Вилка",
        description: "Не бойся ложки",
        price: 444
    },
];

srv.use(bodyParser.json());

// srv.get('/goods', (req, res) => {
//     let results = [...goods];
//     res.json(results);
// });

srv.get('/goods', (req, res) => {
    const { id, price } = req.query;
    let result = [...goods];
    if (id) {
        result = result.filter(r => r.id == id);
    }

    if (price) {
        result = result.filter(r => r.price > price);
    }
    res.json(result);
});

srv.get('/goods/:id', (req, res) => {
    const { id } = req.params;
    let result = [...goods];
    if (id) {
        result = result.filter(r => r.id == id);
    }
    res.json(result);
});

srv.post('/goods', (req, res) => {
    goods.push(req.body);
    res.json([...goods]);
});

srv.put('/goods/:id', (req, res) => {
    const { id } = req.params;
    let result;
    // console.log(goods.length);
    // console.log(goods[2].id);
    for (let i = 0; i < goods.length; i++) {
        if ( goods[i].id == id) { 
            goods[i].price = req.body.price;
            goods[i].description = req.body.description;
            goods[i].title = req.body.title;
            result = goods[i];
        } 
    }
    res.json([result]);
});

srv.delete('/goods/:id', (req, res) => {
    const { id } = req.params;
    // console.log(goods.length);
    // console.log(goods[2].id);
    for (let i = 0; i < goods.length; i++) {
        if ( goods[i].id == id) { 
            goods.splice(i, 1); 
            console.log(id);
        } 
    }
    res.json([...goods]);
});


// srv.get('/index.html', async (req, res) => {
//     const indexPage = await fs.readFile('./index.html');
//     res.send(indexPage.toString());
// })

// srv.get('/goods', async (req, res) => {
//     const goods = await fs.readFile('./goods.json');
//     res.send(goods.toString());
// })

srv.listen(10001, () => {
    console.log('Server online');
})
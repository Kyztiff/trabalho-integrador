// controllers/dashboardController.js

function listar(req, res) {
    res.status(200).json({
        totalUsuarios: 0,
        totalOrcamentos: 0,
        totalMoveis: 0,
        totalAmbientes: 0,
        totalCores: 0
    });
}
//dashboard retorna dados fixos, nao existe model a ser chamado e por isso vai de function direto para res.status
module.exports = { listar };
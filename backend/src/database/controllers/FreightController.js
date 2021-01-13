var request = require('request');
var xml2js = require('xml2js');
var method;

/*
código do serviço.
40010 SEDEX
41106 PAC
http://www.correios.com.br/webServices/PDF/SCPP_manual_implementacao_calculo_remoto_de_precos_e_prazos.pdf
*/
module.exports = {
    async create(req, res) {
        const {
            methodFreight,
            weight,
            lenght,
            width,
            height,
            zip_code
        } = req.body

        if (methodFreight == 'PAC') {
            method = 41106
        } else {
            method = 40010
        }
        var params = {
            // 21008922
            'nCdEmpresa': '',
            // 26570583
            'sDsSenha': '',
            'sCepOrigem': '79570000',
            'sCepDestino': zip_code,
            'nVlPeso': weight,
            'nCdFormato': '1',
            'nVlComprimento': lenght,
            'nVlAltura': height,
            'nVlLargura': width,
            'nVlDiametro': '0',
            'sCdMaoPropria': 'n',
            'nVlValorDeclarado': '0',
            'sCdAvisoRecebimento': 'n',
            'StrRetorno': 'xml',
            'nCdServico': method
        };

        var url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx';

        var options = {
            'uri': url,
            'method': 'GET',
            'qs': params
        };

        request(options, function(error, response, body) {

            if (error) {
                return console.log('Erro ', error);
            }
            var parser = new xml2js.Parser({ 'async': true, 'attrkey': '@', 'explicitArray': false });

            parser.parseString(body, function(err, xml) {
                if (err) {
                    return console.log('Erro ', err);
                }

                var row = xml.Servicos.cServico
                return res.json(row)


            });
        });
    }

}
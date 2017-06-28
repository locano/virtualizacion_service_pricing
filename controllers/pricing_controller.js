var mysql = require('mysql');

module.exports = {
    getPricing(req, res){
        var connection = mysql.createConnection({
            host: 'zyklusdb.ciohag68m4xh.us-east-2.rds.amazonaws.com',
            user: 'zykladmin',
            password: 'zyklus2017!',
            database: 'TST_advertising'
        });
        
        //Check if connection is OK
        connection.connect(function(error) {
            if (error) {
                connection.end();
                console.log('ERROR - Could not connect to the database: ' + error.message);
                res.status(500).send({message: error.message});
            }
        });
        
      /*  var query = "CALL get_active_campaigns(?)";
        var params = [
            req.params['campaign']
        ];*/


        var id_result = "SELECT id, commission FROM publisher_campaigns WHERE publisher_id = ?  limit 1";
        var params = [
            req.query['publisher_campaign']
        ];

        var advertiser_campaign = req.query["advertiser_campaigns"].split(',');
        var bids = req.query["advertiser_campaigns_bids"].split(',');
        var publisher_campaign = req.query["publisher_campaign"];

    connection.query(id_result, params, function(error, results, fields) {  
            //Close connection
            connection.end();

            console.log(id_result);
            console.log(params);
            console.log(bids);
            console.log(results);

            //Internal server error, return 500
            if (error) {
                console.log('ERROR - Problem with provided query: ' + error.message);
                res.status(500).send({message: error.message});
            }
            
            //No records, return 404
            if(results[0].length == 0){
                console.log('ERROR - No records found');
                res.status(400).send({message: 'ERROR - No records found'});
            }else{
            //Found records
           console.log(results);
                            var lista_objeto = [];
                            for (var i = 0; i < bids.length; i++) {
                                lista_objeto[i] = {
                                    'id': advertiser_campaign[i], 
                                    'prize': bids[i] * results[0].commission
                                };
                            }
                            res.status(200).send({result:list});
        }
        
        }); 
    }
};
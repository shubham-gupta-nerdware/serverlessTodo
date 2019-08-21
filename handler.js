const aws = require('aws-sdk');
const uuid = require('uuid-v4');

const dbClient = new aws.DynamoDB.DocumentClient();
const TableName = 'todoList-items';
const res = {
  statusCode: 200,
  headers: { 'Access-Control-Allow-Origin': '*' },
};

module.exports.create = async (event, context, callback) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const newItem = {
      TableName,
      Item:{
        id: uuid(),
        createdAt: new Date().toISOString(),
        description: body.description,
        title: body.title,
      }
    };

    const createItem = (newItem) => { 
      return new Promise((resolve,reject) => {
        dbClient.put(newItem, (err,data) => {
          if(err){
            res.statusCode = 404;
            res.message = 'Error in storing data';
            reject(res);
          }else{
            res.body= newItem.Item;
            resolve(res)
          }
        })
     });
    };

    const result =await createItem(newItem);
    callback(null, {
      statusCode: result.statusCode,
      body: JSON.stringify(result),
    });
  } catch (err) {
    res.statusCode = 404;
    res.body = err;
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(res),
    });
  }
}

module.exports.retrieve = async (event, context,callback) => {
  try{
    if(!event.pathParameters.id){
      throw new Error('Item id not provided')
    }
    
    const getItem = (getParams) => {
      return new Promise((resolve, reject) => {
          dbClient.get(getParams, (err, data) => {
            if (err) {
              res.statusCode = 404;
              res.message = 'Not Fount';
              res.body = {};
              reject(res);
            } else {
              res.body = data.Item ? data.Item : {};
              resolve(res);
            }
        });
      });
    };

    const getParams = {
      TableName,
      Key: {
        id: event.pathParameters.id,
      }
    };

    const result =await getItem(getParams);
    callback(null, {
      statusCode: result.statusCode,
      body: JSON.stringify(result),
    });
  }  
  catch(err){
    res.statusCode = 404;
    res.body = err;
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(res),
    });      
  }
}

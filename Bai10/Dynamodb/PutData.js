const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000'
});

let docClient = new AWS.DynamoDB.DocumentClient();
console.log('Start importing');
let allMagazines = JSON.parse(fs.readFileSync(__dirname + '/magazinedata.json', 'utf-8'));
allMagazines.forEach((magazine) => {
    let params = {
        TableName: "Magazine",
        Item: {
            "id": magazine.id,
            "author": {
                "authorTitle": magazine.author.authorTitle,
                "authorName": magazine.author.authorName,
                "authorAddress": magazine.author.authorAddress
            },
            "newsTitle": magazine.newsTitle,
            "publishDate": magazine.publishDate,
            "image": magazine.image,
            "content": magazine.content
        }
    };
    docClient.put(params, (err, data) => {
        if (err) {
            console.error(`Unable to add book ${magazine.newsTitle}, ${JSON.stringify(err, null, 2)}`);
        } else {
            console.log(`Book created ${magazine.newsTitle}`);
        }
    });
});
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
let request = require('request');
var crypto = require('crypto');

app.use(express.static(path.join(__dirname, 'build')));

app.use(express.static('src'));
app.use(bodyParser());


app.get('/v1/products/', function (req, res) {
    let result = [
        //{"id":96433,"productId":"74842","supplierProductName":"Clover Go","supplierName":"MAMA","productType":"Terminal","productName":"Clover Go","productShortDescription":"Clover Go makes it easier – and safer – to take your business to your customers. You can accept payments on the go, from your mobile device, wherever you have a WiFi or cellular connection. The Clover Go app is available for download in the","productLongDescription":"Clover Go makes it easier – and safer – to take your business to your customers. You can accept payments on the go, from your mobile device, wherever you have a WiFi or cellular connection. The Clover Go app is available for download in the Apple App Store and Google Play Store.","showoncart":true,"defaultPurchaseType":"P","status":"A","createdBy":"KESNERA","startDate":"2015-08-05T00:00:00Z","endDate":"2030-08-05T00:00:00Z","sponsor":{"sponsorId":1,"sponsorName":"First Data","createdBy":"SCeemarla","billingName":"Arash","billingEmail":"arash@gyft.com","addressLineOne":"6855 Pacific Street","addressLineTwo":null,"city":"Omaha","state":"NE","zip":"68154","country":"USA","phone":"(402) 222 3161"},"productWithOptions":false,"pinPad":false,"imageUrls":["https://s3-us-west-2.amazonaws.com/cdn-fd/resources/images/product/qa/large/74842/image_1536843880596.jpg","https://s3-us-west-2.amazonaws.com/cdn-fd/resources/images/product/qa/thumb/74842/image_1536843880596.jpg"],"offeringTypes":["POS","Clover Go","Non Debit Equipment","Solution","Integrated Check Reader"],"categoryIds":[],"tags":[]},
        //{"id":96861,"productId":"83622","supplierProductName":"Clover Go Contactless with Stand","supplierName":"MAMA","productType":"Terminal","productName":"Clover Go Contactless with Stand","productShortDescription":"Allow your Clover Go Contactless Reader to be fastened in place for commercial environments. The Clover Go Stand is made of a high durable material and is perfect for countertop processing.","productLongDescription":"Allow your Clover Go Contactless Reader to be fastened in place for commercial environments. The Clover Go Stand is made of a high durable material and is perfect for countertop processing.","showoncart":true,"defaultPurchaseType":"P","status":"A","createdBy":"GGIRIDHA","startDate":"2016-09-26T00:00:00Z","endDate":"2032-09-26T00:00:00Z","sponsor":{"sponsorId":1,"sponsorName":"First Data","createdBy":"SCeemarla","billingName":"Arash","billingEmail":"arash@gyft.com","addressLineOne":"6855 Pacific Street","addressLineTwo":null,"city":"Omaha","state":"NE","zip":"68154","country":"USA","phone":"(402) 222 3161"},"productWithOptions":false,"pinPad":false,"imageUrls":["https://s3-us-west-2.amazonaws.com/cdn-fd/resources/images/product/qa/large/83622/image_1.jpg","https://s3-us-west-2.amazonaws.com/cdn-fd/resources/images/product/qa/large/83622/image_2.jpg","https://s3-us-west-2.amazonaws.com/cdn-fd/resources/images/product/qa/large/83622/image_3.jpg","https://s3-us-west-2.amazonaws.com/cdn-fd/resources/images/product/qa/large/83622/image_4.jpg","https://s3-us-west-2.amazonaws.com/cdn-fd/resources/images/product/qa/thumb/83622/image_1.jpg","https://s3-us-west-2.amazonaws.com/cdn-fd/resources/images/product/qa/thumb/83622/image_2.jpg","https://s3-us-west-2.amazonaws.com/cdn-fd/resources/images/product/qa/thumb/83622/image_3.jpg","https://s3-us-west-2.amazonaws.com/cdn-fd/resources/images/product/qa/thumb/83622/image_4.jpg"],"offeringTypes":["POS","Clover Go","Non Debit Equipment","Solution","FirstDataPOS","Integrated Check Reader"],"categoryIds":[],"tags":["Clover","HOME"]},
        {"id":309270,"productId":"87942","supplierProductName":"Clover Go Contactless Reader","supplierName":"MAMA","productType":"Terminal","productName":"Clover Go Contactless Reader","productShortDescription":"Clover Go Contactless Reader","productLongDescription":"Clover Go Contactless Reader","showoncart":true,"defaultPurchaseType":"P","status":"A","createdBy":"SCeemarla","startDate":"2018-03-03T00:00:00Z","endDate":"2048-01-01T00:00:00Z","sponsor":{"sponsorId":1,"sponsorName":"First Data","createdBy":"SCeemarla","billingName":"Arash","billingEmail":"arash@gyft.com","addressLineOne":"6855 Pacific Street","addressLineTwo":null,"city":"Omaha","state":"NE","zip":"68154","country":"USA","phone":"(402) 222 3161"},"productWithOptions":false,"pinPad":false,"imageUrls":["https://s3-us-west-2.amazonaws.com/cdn-fd/resources/images/product/qa/large/87942/image_1548700274355.jpg","https://s3-us-west-2.amazonaws.com/cdn-fd/resources/images/product/qa/large/87942/image_1548700276923.jpg"],"offeringTypes":["POS","Clover Go","Non Debit Equipment","FirstDataPOS"],"categoryIds":[],"tags":[]}]
    res.send(result);
});

app.post('/v1/banks/validate', function(req, res) {
    if(req.body.routingNumber === '021000021') {
        let result = {
            "status": {
                "success": "true",
                "message": "000 OPERATION WAS SUCCESSFUL"
            },
            "data": {
                "bankName": "JPMORGAN CHASE BANK, NA",
                "bankCity": "COLUMBUS",
                "bankState": "OH",
                "bankZip": "43240"
            }
        };
        res.send(result);
    }
    else {
        res.status(400);
        res.send({"code":1038,"additional message":"0001 BANK-KEY is invalid","message":"Error Retrieving ABA Bank Details"});
    }
});

app.post('/v1/pfac/application/signup', function(req, res) {
    let result = {
        "orderId": "oWmmw"
    };
    res.send(result);
});

app.listen(process.env.PORT || 8080);
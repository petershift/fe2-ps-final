const mongoose = require('mongoose');
const Review = mongoose.model('Review');

 
exports.findAll = function (req, res) {
    Review.find({}, function (err, results) {
        return res.send(results);
    });
};

exports.findById = function (req, res) {
    const id = req.params.id;
    Review.findOne({ '_id': id }, function (err, result) {
        return res.send(result);
    });
};

exports.update = function (req, res) {
    const id = req.params.id;
    const updates = req.body;

    Review.update({ '_id': id }, updates,
        function (err) {
            if (err) return console.log(err);
            return res.sendStatus(202);
        });
};

exports.add = function (req, res) {
    Review.create(req.body, function (err, review) {
        if (err) return console.log(err);
        return res.send(review);
    });
};

exports.import = function (req, res) {
    // Recipe below refers to the mongoose schema. create() is a mongoose method
    Review.create(
            {
                "name": "NapaValley1",
                "title": "Napa Valley Harvest",
                "date": "2018-09-20",
                "description": "Experience the ultimate Napa Valley weekend: -Begin the trip with a luxurious dinner paired with Covert Estate Bordeaux-style Cabernets with owners Elan and Julien Fayard at their hillside winery. Winemaker Julien Fayard, reigns from France where he worked at first growth Bordeaux Chateau Lafitte Rothschild and Smith Haut Lafitte. -Delight in intimate lunches across Napa, including the beautiful Cardinale Estate with Christopher and Ariel Jackson and renowned winemaker Christopher Carpenter. The Jackson Family have been prominent American Vintners for more than 35 years while Chris Carpenter has just completed his 20th vintage for the family, producing 8 wines that have received perfect 100 point scores.  -Spend your evenings enjoying spectacular wine-paired dinners at stunning vineyards, such as the new Ashes & Diamonds, designed by one of Architectural Digest's top 100 architects of 2018, Barbara Bestor.",
                "image": "napaValleyHarvest.jpg"
            },
            {
               
                "name": "NapaValley1",
                "title": "Napa Valley Harvest",
                "date": "2018-09-20",
                "description": "Experience the ultimate Napa Valley weekend: -Begin the trip with a luxurious dinner paired with Covert Estate Bordeaux-style Cabernets with owners Elan and Julien Fayard at their hillside winery. Winemaker Julien Fayard, reigns from France where he worked at first growth Bordeaux Chateau Lafitte Rothschild and Smith Haut Lafitte. -Delight in intimate lunches across Napa, including the beautiful Cardinale Estate with Christopher and Ariel Jackson and renowned winemaker Christopher Carpenter. The Jackson Family have been prominent American Vintners for more than 35 years while Chris Carpenter has just completed his 20th vintage for the family, producing 8 wines that have received perfect 100 point scores.  -Spend your evenings enjoying spectacular wine-paired dinners at stunning vineyards, such as the new Ashes & Diamonds, designed by one of Architectural Digest's top 100 architects of 2018, Barbara Bestor.",
                "image": "napaValleyHarvest.jpg"
            },

            {
               
                "name": "NapaValley1",
                "title": "Napa Valley Harvest",
                "date": "2018-09-20",
                "description": "Experience the ultimate Napa Valley weekend: -Begin the trip with a luxurious dinner paired with Covert Estate Bordeaux-style Cabernets with owners Elan and Julien Fayard at their hillside winery. Winemaker Julien Fayard, reigns from France where he worked at first growth Bordeaux Chateau Lafitte Rothschild and Smith Haut Lafitte. -Delight in intimate lunches across Napa, including the beautiful Cardinale Estate with Christopher and Ariel Jackson and renowned winemaker Christopher Carpenter. The Jackson Family have been prominent American Vintners for more than 35 years while Chris Carpenter has just completed his 20th vintage for the family, producing 8 wines that have received perfect 100 point scores.  -Spend your evenings enjoying spectacular wine-paired dinners at stunning vineyards, such as the new Ashes & Diamonds, designed by one of Architectural Digest's top 100 architects of 2018, Barbara Bestor.",
                "image": "napaValleyHarvest.jpg"
            },

            {
                
                "name": "NapaValley1",
                "title": "Napa Valley Harvest",
                "date": "2018-09-20",
                "description": "Experience the ultimate Napa Valley weekend: -Begin the trip with a luxurious dinner paired with Covert Estate Bordeaux-style Cabernets with owners Elan and Julien Fayard at their hillside winery. Winemaker Julien Fayard, reigns from France where he worked at first growth Bordeaux Chateau Lafitte Rothschild and Smith Haut Lafitte. -Delight in intimate lunches across Napa, including the beautiful Cardinale Estate with Christopher and Ariel Jackson and renowned winemaker Christopher Carpenter. The Jackson Family have been prominent American Vintners for more than 35 years while Chris Carpenter has just completed his 20th vintage for the family, producing 8 wines that have received perfect 100 point scores.  -Spend your evenings enjoying spectacular wine-paired dinners at stunning vineyards, such as the new Ashes & Diamonds, designed by one of Architectural Digest's top 100 architects of 2018, Barbara Bestor.",
                "image": "napaValleyHarvest.jpg"
            }
        , function (err) {
            if (err) return console.log(err);
            return res.send(202);
        });
};
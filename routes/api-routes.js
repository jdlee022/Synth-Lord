var db = require("../models");

module.exports = function (app) {
    app.get("/api/preset/all", function (req, res) {
        //when page loads get presets from db and add them to html
        db.Preset.findAll({}).then(function (data) {
            res.json(data);
        });
    });

    // GET route for getting all of the todos
    app.get("/api/preset/:presetName", function (req, res) {
        // returns the preset based on the name
        db.Preset.findOne({ where: { name: req.params.presetName } }).then(function (preset) {
            res.json(preset);
        });
    });

    // POST route for saving a new todo
    app.post("/api/preset", function (req, res) {
        // create takes an argument of an object describing the item we want to
        // insert into our table. In this case we just we pass in an object with a text
        // and complete property (req.body)
        db.Preset.create({
            settings: req.body.settings,
            name: req.body.name,
            creator: req.body.creator
        }).then(function (preset) {
            // We have access to the new todo as an argument inside of the callback function
            res.json(preset);
        });
    });
};

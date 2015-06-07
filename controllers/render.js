module.exports = function(template, variables) {
    return function(req, res) {
        res.render(template, variables);
    };
};

// show admin-panel home

export const getAdminPanelController = (req, res) => {
    // const group = req.user ? req.user.group : req.userRole;
    // res.send(`yoo..its admin panel!\nrole: ${group}`);
    res.send(`yoo..its admin panel!\nfor ${req.user.group}s only`);
    // res.render('yoo..its admin panel!\n<emphasize>for '+req.user.group+'s only</emphasize>');
    // res.redirect('yoo..its admin panel!\n<emphasize>for '+req.user.group+'s only</emphasize>');
};


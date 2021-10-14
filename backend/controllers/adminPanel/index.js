// show admin-panel home

export const getAdminPanelController = (req, res) => {
    res.send(`hey..its admin panel!\nfor ${req.user.group}s only`);
};


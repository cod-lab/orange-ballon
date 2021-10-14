async function common(req, res) {
    res.status(200).render('index', { user_group: req.user ? req.user.group : 'guest' });
}

export const getAdminHomeController = common;

export const getUserHomeController = common;

export const getGuestHomeController = common;


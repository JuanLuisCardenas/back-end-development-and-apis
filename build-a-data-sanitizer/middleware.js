
export const inputCleaner = (req, res, next) => {
    const usr = req.body.username || '';
    const comment = req.body.comment || '';
    req.body.username = usr.replace(/<\/?[^>]+(>|$)/g, "").toLowerCase();
    req.body.comment = comment.replace(/<\/?[^>]+(>|$)/g, "");

    next()
};

export const inputValidator = (req, res, next) =>{
    const usr = req.body.username || '';
    //console.log(usr);
    if (usr.length < 3) {
        const errMsg = "Username must be at least 3 characters.";
        //console.log("error zone.");
        return res.redirect(`/form?error=${encodeURIComponent(errMsg)}`);
    }
    next();
};
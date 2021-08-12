class SiteController{

    home(req, res){
        const title = 'Trang chủ';
        res.render('home',{title});
    }

    logout(req, res){
        res.clearCookie('userID')
        res.redirect('/');
    }
     
}

module.exports = new SiteController();
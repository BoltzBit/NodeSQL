const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
    async show(req,res){
        //return res.json({ report: true });
        const users = await User.findAll({
            attributes: ['name','email'],
            where: {
                email: {
                    //para o sql é usado o [Op.like]
                    [Op.like]: '%@teste'
                }
            },
            include: [
                { association: 'addresses', where: { street: 'rua teste'}},
                { 
                    association: 'techs',
                    required:false,
                    where: {
                        name:{
                            [Op.like]:'react%'
                        }
                    }
                }
            ],
        });

        return res.json(users);
    }
};

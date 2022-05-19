const { user_meal } = require('../../models')
const { userAuth } = require('../users/auth')

module.exports = {
  get : async (req, res) => {
    try{
      const userInfo = await userAuth(req, res)
      if (!userInfo) { return res.status(200).json({ message: '유저정보 없음' })
      } else {
        delete userInfo.dataValues.password
  
        const userId = userInfo.dataValues.id
        
        const usermealInfo = await user_meal.findOne({
          where: { 
            user_id: userId
          }
        });
    
        if ( !usermealInfo ) {
          await user_meal.create({
            user_id: userId
          })
          res.status(200).send({ message: "유저 추가 완료" });
        } else {
          res.status(200).send({ data: usermealInfo, message: "정보 전달 완료" });
        }
      }
    } catch ( err ) {
      res.status(500).send({ message: "Sever Error" })
    }
  },
  post: async (req, res) => {
    try{
      const userInfo = await userAuth(req, res)
      if (!userInfo) { return res.status(200).json({ message: '유저정보 없음' })
      } else {
        delete userInfo.dataValues.password
  
        const userId = userInfo.dataValues.id
    
        const { kit_id, when } = req.body

          if (when === "breakfast") {
            await user_meal.update(
              { breakfast: kit_id },
              { where : { user_id : userId }}
            );
          }
          if (when === 'lunch') {
            await user_meal.update(
              { lunch: kit_id },
              { where : { user_id : userId }}
              );
          }
          if (when === 'dinner') {
            await user_meal.update(
              { dinner: kit_id },
              { where : { user_id : userId }}
            );
          }
          const postUsermealInfo = await user_meal.findOne({
            where : {
              user_id : userId
            }
          })
      
        if (!postUsermealInfo) {
          res.status(404).send({ message: '자료 없음' });
        } else {
          res.status(200).send({ data: postUsermealInfo, message: '식단 정보 입력 완료' });
        }
      }
    } catch ( err ) {
      res.status(500).send({ message : 'Sever Error' })
    }
  },
  delete: async (req, res) => {
    try {
      
      const userId = userInfo.dataValues.id

      const usermealInfo = await user_meal.findOne({
        where: {
          user_id: userId,
        },
      });
      console.log(usermealInfo)

      if (!usermealInfo) {
        res.status(200).send({ message: '자료 없음' });
      } else {
        if (user_meal.dataValues.breakfast) {
          user_meal.destroy({
            where: { breakfast: usermealInfo.dataValues.breakfast },
          });
        }
        if (user_meal.dataValues.lunch) {
          user_meal.destroy({
            where: { lunch: usermealInfo.dataValues.lunch },
          });
        }
        if (user_meal.dataValues.dinner) {
          user_meal.destroy({
            where: { dinner: usermealInfo.dataValues.dinner },
          });
        }
        res.status(200).send({ message: '오늘의 식단 삭제 성공' });
      }
    } catch (err) {
      res.status(500).send({ message: ' Sever Error ' });
    }
  },
};

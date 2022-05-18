
const { user } = require('../../models')
const { userAuth } = require('./auth')

module.exports = {
  get: async (req, res) => {
    try {
      const userInfo = await userAuth(req, res);
      if (!userInfo) { return res.status(200).json({ message: '유저정보 없음' })}

      delete userInfo.dataValues.password
        res.status(200).send({ data: { userInfo : userInfo }, message: "조회 성공" });
    } catch (err) {
    console.log(err);
  }
},
  patch : async (req,res) => {
    try {
      const userInfo = await userAuth(req, res)
      if (!userInfo) { return res.status(200).send({ message: '권한 없음' })

    } else {     
      
      const { nickname , password } = req.body

      await user.update(
            { 
              nickname : nickname,
              password : password 
            },
            { where : { id : userInfo.dataValues.id} }  
          )

      const newUserInfo = await user.findOne({ where : { id: userInfo.dataValues.id }})
      delete newUserInfo.dataValues.password

      res.status(200).send({ data : { userInfo : newUserInfo }, message : '변경 완료'})
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Server Error!' });
  }
}, 
  delete : async (req, res) => {
      try {
        /* 로그인 인증 검사 */
        const userInfo = await userAuth(req, res);
        if(!userInfo) return res.status(200).json({ message: 'Unauthorized userInfo!' });
  
        user.destroy({ where: { id: userInfo.id } });  // 유저 삭제
        res.cookie('accessToken', null, { maxAge: 0 });  // 쿠키 삭제
        res.status(200).json({ message: '회원탈퇴 완료' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error!' });
      }
    }

}
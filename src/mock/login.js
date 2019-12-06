export default {
  authenCheck: () => {
    return {
      code: 10000,
      msg: '登录成功',
      data: {
        authenCode:
          'EOEpauj9hBSQZeLle0rsalfaa6MPHs6jRx6nbLyUMQE4H1a2APbVpKbYOrqCProH6KTbIZuzpRv4F4FsYgeDnDzu6T1eWF/VdbgMP2y2aTJuvmWNAp8CPdDQlELjIHZEUWoNpmDTR2p+9U0d1UMDGnm3zqbU3+LYEA+T2X4e0+w=' // 用户id以及随机字符串
      }
    }
  },
  login: () => {
    return {
      code: 10000,
      msg: '操作成功!',
      data: {
        token: '7bc93107aa8d4d22a74a484b1f759a4c;::;1544409807892',
        menu: ['1', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
        roles: ['admin'],
        userInfo: {
          id: '7bc93107aa8d4d22a74a484b1f759a4c',
          name: 'admin',
          createDate: '2018-12-08T03:30:45.093+0000',
          updateDate: '2018-12-08T03:30:45.093+0000',
          remarks: null,
          loginName: 'admin',
          passWord: null,
          no: '00002',
          mobile: '18829207310',
          bankName: null,
          bankNo: null,
          isUseable: true,
          office: null,
          role: {
            id: 'sdfsdfdsfsdfsdfsdfd',
            name: '超管',
            createDate: '2018-12-10T02:43:27.956+0000',
            updateDate: '2018-12-10T02:43:27.956+0000',
            remarks: null,
            useable: false
          },
          useable: true
        }
      }
    }
  }
}

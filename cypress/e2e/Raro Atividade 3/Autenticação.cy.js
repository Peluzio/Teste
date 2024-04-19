describe ('busca por usuarios', ()=>{
    var token;
    var userId;
   
    before('criar usuario', () => {
      cy.request({
        method: 'POST',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
        body: {
          "name": "string",
          "email": "string@yahoo.com.br",
          "password": "string",
        }  
      }).then((response) => {
        userId = response.body.id
      })
    });//end of antes 
   
   
    before('Logar', () => {
      cy.request({
        method: 'POST',
        url:'/api/auth/login',
        body: {
          "email": "string@yahoo.com.br",
          "password": "string"
        }
      }).then((response)=>{
        token = response.body.accessToken})
        
  
    })//end of antes
  
    after('Inativar',() => {
      cy.request({
        method: 'PATCH',
        url: '/api/users/inactivate',
        headers: {
          Authorization: "Bearer " + token}
  
      })
  
    })//end of dps


    it('Login sem email', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                email: '',
                senha: '123456'
            }, failOnStatusCode: false

        }).then((resposta)=>  {
            expect(resposta.status).to.eq(400)
             })
        })//ok
    

    it('Não deve logar com email incompleto', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                email: 'pedrogmail.com',
                senha: '123456'
            },
            failOnStatusCode: false
        }).then( (resposta) => {
            expect(resposta.status).to.eq(400)
        })
        })//ok
    
    //BUG
    it('Não deve logar com email não cadastrado', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                email: 'monarcadastrevas345@gmail.com',
                senha: '123456'
            },
            failOnStatusCode: false
        }).then((resposta) => {
            expect(resposta.status).to.eq(401)
        })
    })

    it('Não logar com senha vazia', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                email: 'monarcadastrevas@gmail.com',
                senha: ''
            },
            failOnStatusCode: false
        }).then( (resposta) => {
            expect(resposta.status).to.eq(400)
        })
    })

    //bug
    it('Não deve logar com senha incorreta',() => {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                email: 'monarcadastrevas@gmail.com',
                senha: 'senhaincorreta'
            },
            failOnStatusCode: false
        }).then((resposta) => {
            expect(resposta.status).to.eq(401)
        })
    })

})
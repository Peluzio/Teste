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
  
    it ('Busca geral', ()=>{
    cy.request ({
      method:'GET',
      url:'/api/users',
      failOnStatusCode: false,
      headers: {
        Authorization: "Bearer " + token}
    }).then((response) => {
      expect(response.status).to.eq(403)
    })
  
  });//end da geral
  
  it('buscar via id',() =>{
    cy.request({
      method:'GET',
      url:'/api/users/1',
      failOnStatusCode: false,
      headers:{
        Authorization: "Bearer " + token}
  
    }).then((response) => {
      expect(response.status).to.eq(403)
    })
  
  })//end of id
  
  
  })
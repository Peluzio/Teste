describe ('Criação e busca por filmes ADM', ()=>{
    var token;
   
    before('criar usuario', () => {
      cy.request({
        method: 'POST',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
        body: {
          "name": "string",
          "email": "string@yahoo.com.br",
          "password": "string",
        }  
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
        token = response.body.accessToken 
        cy.request({
          method: 'PATCH',
          url: '/api/users/admin',
          headers: {
            Authorization: "Bearer " + token
        }
  
        })
      })
    })//end of antes
  
    after('Inativar',() => {
      cy.request({
        method: 'PATCH',
        url: '/api/users/inactivate',
        headers: {
          Authorization: "Bearer " + token}
  
      })
  
    })//end of dps

    it ('Criar um filme', ()=>{
    cy.request ({
      method:'POST',
      url:'/api/movies',
      body: {
        "title": "Alien",
        "genre": "Terror",
        "description": "Uma nave espacial, ao retornar para Terra, recebe estranhos sinais vindos de um asteroide. Enquanto a equipe investiga o local, um dos tripulantes é atacado por um misterioso ser. O que parecia ser um ataque isolado se transforma em um terror constante, pois o tripulante atacado levou para dentro da nave o embrião de um alienígena, que não para de crescer e tem como meta matar toda a tripulação.",
        "durationInMinutes": 117,
        "releaseYear": 1979},
      headers: {
        Authorization: "Bearer " + token}
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  });//end of creation
    
    it ('Atualizar um Filme', ()=>{
        cy.request ({
          method:'PUT',
          url:'/api/movies/1',
          body: {
            "title": "Alien",
            "genre": "Terror",
            "description": "Uma nave espacial, ao retornar para Terra, recebe estranhos sinais vindos de um asteroide. Enquanto a equipe investiga o local, um dos tripulantes é atacado por um misterioso ser. O que parecia ser um ataque isolado se transforma em um terror constante, pois o tripulante atacado levou para dentro da nave o embrião de um alienígena, que não para de crescer e tem como meta matar toda a tripulação.",
            "durationInMinutes": 117,
            "releaseYear": 1979},
          headers: {
            Authorization: "Bearer " + token}
        }).then((response) => {
          expect(response.status).to.eq(204)
        })
      
    });//end of att




})









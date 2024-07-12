import superagent from 'superagent'


describe("Test", ()=> {
    const BASE_URL = 'https://jsonplaceholder.typicode.com/'
    const postLink = `${BASE_URL}/posts`
    let response:Response

    it("получение всех постов", async ()=> {
        const response = await superagent.get(`${postLink}`)

        expect(response.body).not.toBeNull();
        expect(response.status).toBe(200);
    });

    it("Полуяение поста по userid", async ()=>{
        const response = await superagent.get(`${postLink}`).query({userId:1})
        
        response.body.forEach((item:{userId: any}) => {
            expect(item.userId).toBe(1)
        });
        expect(response.status).toBe(200);
    });

    it("Добавление новго поста", async ()=>{
       let response = await superagent.post(`${postLink}`).send({
    userId: 999,
    id: 99,
    title: "Test",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"})
    
        expect(response.status).toBe(201);

        response = await superagent.get(`${postLink}`).query({userId:999})

        expect(response.body.length).toBe(1)
        // response.body.forEach((item:{userId: any}) => {
        //     expect(item.userId).toBe(999)
        // });
        // expect(response.status).toBe(200);
    })
});